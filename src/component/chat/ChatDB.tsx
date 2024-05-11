import { Flex } from "@chakra-ui/react"
import { getOrCreateChat } from "api/chatApi"
import queryClient from "api/queryClient"
import InputGroupDB from "component/inputGroup/InputGroupDB"
import InputGroupContext from "component/inputGroup/context"
import { LoadMoreMessagesBtn } from "component/chat/LoadMoreMessagesBtn"
import { LoadingMessage } from "component/message/LoadingMessage"
import { Message, createMessage } from "component/message/Message"
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

      setSimilarQueries(similarQueries)

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
    window.scroll({
      top: chatRef.current?.offsetHeight,
      behavior: "smooth",
    })
  }, [chat?.messages.length])

  return (
    <Flex direction="row" justifyContent="center" alignItems="flex-start" pt="100" h="full">
      <Flex ref={chatRef} direction="column" justifyContent="flex-start" h="full" w="2xl" gap={10}>
        {chat && chat.messages.length > shownMessageCount && (
          <LoadMoreMessagesBtn isLoading={isLoading} />
        )}

        <Flex ref={messageWindowRef} direction="column" gap="5" flexGrow="1">
          {/* Messages from history */}
          {chat &&
            !!chat.messages.length &&
            getLastN(
              shownMessageCount,
              chat.messages.map((message, i) => createMessage(message, i))
            )}

          {/* Loading message */}
          {isLoading && (
            <Message
              direction="incoming"
              messageId={-1}
              src="/image/avatar/bot.svg"
              callback={false}
            >
              <LoadingMessage />
            </Message>
          )}

          {/* Assistant message if not messages */}
          {chat && chat.messages.length === 0 && (
            <Message
              direction="incoming"
              messageId={-1}
              src="/image/avatar/bot.svg"
              callback={false}
            >
              Какой у вас запрос?
            </Message>
          )}
        </Flex>

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
