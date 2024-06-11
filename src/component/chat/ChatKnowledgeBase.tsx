import { Flex } from "@chakra-ui/react"
import { getOrCreateChat } from "api/chatApi"
import { getAllFiles } from "api/fileApi"
import queryClient from "api/queryClient"
import { LoadMoreMessagesBtn } from "component/chat/LoadMoreMessagesBtn"
import InputGroupKnowledgeBase from "component/inputGroup/InputGroupKnowledgeBase"
import InputGroupContext from "component/inputGroup/context"
import { DefaultMessage } from "component/message/DefaultMessage"
import { LoadingMessage } from "component/message/LoadingMessage"
import { createMessage } from "component/message/Message"
import { ModeContext, ModeContextI } from "context/modeContext"
import { UserContext } from "context/userContext"
import { getLastN } from "misc/util"
import ChatModel from "model/ChatModel"
import { FileModel } from "model/FileModel"
import QueryModel from "model/QueryModel"
import { UserModel } from "model/UserModel"
import { useContext, useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { useCreateMessage } from "service/messageService"
import { useKnowledgeBasePrediction } from "service/predictionService"

export const ChatKnowledgeBase = () => {
  const messageWindowRef = useRef<HTMLDivElement | null>(null)
  const chatRef = useRef<HTMLDivElement | null>(null)
  const user = useContext<UserModel>(UserContext)
  const modeId = 1
  const [similarQueries, setSimilarQueries] = useState<string[]>([])

  const { shownMessageCount } = useContext<ModeContextI>(ModeContext)

  const messageCreateMutation = useCreateMessage()
  const predictionMutation = useKnowledgeBasePrediction()

  const { data: chat, status: chatQueryStatus } = useQuery<ChatModel>("chat", () => {
    return getOrCreateChat(user.id, modeId)
  })
  const isMessagesExistsInChat = chat && chat.messages.length !== 0
  const isMoreMessagesInChat = isMessagesExistsInChat && chat.messages.length > shownMessageCount

  const { data: filesList = [], status: filesListQueryStatus } = useQuery<FileModel[]>(
    "filesList",
    getAllFiles,
    {
      enabled: !!chat?.id,
    }
  )

  const isLoading =
    predictionMutation.isLoading ||
    messageCreateMutation.isLoading ||
    chatQueryStatus === "loading" ||
    filesListQueryStatus === "loading"

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

      const { answer } = await predictionMutation.mutateAsync(body)

      setSimilarQueries(similarQueries)

      await messageCreateMutation.mutateAsync({
        chat_id: chat.id,
        answer: answer,
        connected_message_id: queryMessageId,
      })
      await queryClient.invalidateQueries("chat")
    }
  }

  useEffect(() => {
    if (chat?.id) {
      const chatDiv = document.getElementById(`chat-${chat?.id}`)
      if (chatDiv) {
        chatDiv.scroll({
          top: messageWindowRef.current?.offsetHeight,
          behavior: "smooth",
        })
      }
    }
  }, [chat?.id])

  return (
    <Flex h="full" w="84%" direction="row" alignItems="flex-start">
      <Flex h="full" w="100%" direction="column" justifyContent="space-between">
        <Flex
          id={`chat-${chat?.id}`}
          ref={chatRef}
          h="full"
          w="full"
          direction="column"
          justifyContent="flex-start"
          px={5}
          pt={2}
          pb={5}
          gap={5}
          overflowX="hidden"
          overflowY="auto"
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

        <InputGroupContext.Provider value={{ handleSubmit, similarQueries }}>
          <InputGroupKnowledgeBase
            filesList={filesList}
            isLoading={isLoading}
            errorMessage={errorMessage}
            chatId={chat?.id}
          />
        </InputGroupContext.Provider>
      </Flex>
    </Flex>
  )
}
