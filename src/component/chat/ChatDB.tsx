import { Flex } from "@chakra-ui/react"
import { getOrCreateChat } from "api/chatApi"
import queryClient from "api/queryClient"
import { LoadMoreMessagesBtn } from "component/chat/LoadMoreMessagesBtn"
import InputGroupDB from "component/inputGroup/InputGroupDB"
import InputGroupContext from "component/inputGroup/context"
import { DefaultMessage } from "component/message/DefaultMessage"
import { LoadingMessage } from "component/message/LoadingMessage"
import { createMessage } from "component/message/Message"
import { ModeContext, ModeContextI } from "context/modeContext"
import { UserContext } from "context/userContext"
import { getLastN } from "misc/util"
import ChatModel from "model/ChatModel"
import QueryModel from "model/QueryModel"
import { UserModel } from "model/UserModel"
import { useContext, useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { useCreateMessage } from "service/messageService"
import { useDBPrediction } from "service/predictionService"

function ChatDB() {
  const messageWindowRef = useRef<HTMLDivElement | null>(null)
  const chatRef = useRef<HTMLDivElement | null>(null)
  const [table, setTable] = useState<string>()
  const user = useContext<UserModel>(UserContext)
  const modeId = 2
  const [similarQueries, setSimilarQueries] = useState<string[]>([])
  const { shownMessageCount } = useContext<ModeContextI>(ModeContext)

  const messageCreateMutation = useCreateMessage()
  const predictionMutation = useDBPrediction()

  const { data: chat, status: chatQueryStatus } = useQuery<ChatModel>("chat", () => {
    return getOrCreateChat(user.id, modeId)
  })

  const isMessagesExistsInChat = chat && chat.messages.length !== 0
  const isMoreMessagesInChat = isMessagesExistsInChat && chat.messages.length > shownMessageCount

  const isLoading =
    predictionMutation.isLoading || messageCreateMutation.isLoading || chatQueryStatus === "loading"

  const errorMessage = predictionMutation.isError
    ? "Произошла ошибка. Попробуйте ещё раз"
    : undefined

  const handleSubmit = async (finalQuery: string, limit?: number) => {
    if (chat && finalQuery.trim() !== "") {
      const { id: queryMessageId } = await messageCreateMutation.mutateAsync({
        query: finalQuery,
        chat_id: chat.id,
      })

      const body: Omit<QueryModel, "chat_id"> = {
        query: finalQuery,
        limit,
      }

      if (table) {
        body["tables"] = [table]
      }

      const {
        answer,
        sql,
        table: markdownTable,
        similar_queries: similarQueries,
      } = await predictionMutation.mutateAsync(body)

      setSimilarQueries(similarQueries!)

      await messageCreateMutation.mutateAsync({
        chat_id: chat.id,
        answer: answer,
        sql: sql,
        table: markdownTable,
        connected_message_id: queryMessageId,
      })
      await queryClient.invalidateQueries("chat")
    }
  }

  useEffect(() => {
    const chatDiv = document.getElementById(`chat-${chat?.id}`)
    if (chatDiv) {
      chatDiv.scroll({
        top: messageWindowRef.current?.offsetHeight,
        behavior: "smooth",
      })
    }
  }, [chat?.messages.length, chat?.id])

  return (
    <Flex h="full" w="84%" direction="column" justifyContent="flex-start" alignItems="center">
      <Flex
        id={`chat-${chat?.id}`}
        h="full"
        w="full"
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        overflowX="hidden"
        overflowY="auto"
        flexGrow="1"
      >
        <Flex
          ref={chatRef}
          //! Do not set height, because padding-bottom will not work
          // h="full"
          w="60%"
          direction="column"
          justifyContent="flex-start"
          px={5}
          pt={2}
          pb={5}
          gap={5}
          flexGrow="1"
        >
          {isMoreMessagesInChat && <LoadMoreMessagesBtn isLoading={isLoading} />}

          <Flex ref={messageWindowRef} direction="column" gap="5">
            {isMessagesExistsInChat ? (
              // Show messages from chat history
              getLastN(
                shownMessageCount,
                chat.messages.map((message, i) => createMessage(message, i))
              )
            ) : (
              // Show default bot message
              <DefaultMessage />
            )}
          </Flex>

          {/* Loading message */}
          {isLoading && <LoadingMessage />}
        </Flex>
      </Flex>

      <Flex w="60%">
        <InputGroupContext.Provider value={{ handleSubmit, similarQueries }}>
          <InputGroupDB
            table={table}
            setTable={setTable}
            isLoading={isLoading}
            errorMessage={errorMessage}
            chatId={chat?.id}
          />
        </InputGroupContext.Provider>
      </Flex>
    </Flex>
  )
}

export default ChatDB
