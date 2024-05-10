import { Card, CardBody, Flex, Text } from "@chakra-ui/react"
import AnswerTabs from "component/message/AnswerTabs"
import { Avatar } from "component/message/Avatar"
import Code from "component/message/Code"
import Markdown from "component/message/Markdown"
import { IMessage } from "component/message/types"
import { MessageModel } from "model/MessageModel"
import { FC, ReactNode } from "react"

export const Message: FC<IMessage> = (props) => {
  const {
    messageId,
    src,
    direction,
    children,
    reviewModels,
    markModel,
    callback = true,
    query,
  } = props

  const isMessageFromUser = direction === "outgoing"
  const avatarName = isMessageFromUser ? "user" : "bot"

  return (
    <Flex gap={2}>
      <Avatar name={avatarName} src={src as string} />

      <Card shadow="lg" mr={10}>
        <CardBody>{children}</CardBody>
      </Card>
    </Flex>
  )
}

export const createMessage = (messageModel: MessageModel, key: number): ReactNode => {
  let messageContent = ""
  let src = ""

  // If message from user
  if (messageModel.query) {
    messageContent = messageModel.query
    src = "/image/avatar/user.svg"
  }

  // If message from assistant
  if (messageModel.answer || messageModel.sql || messageModel.table) {
    src = "/image/avatar/bot.svg"
  }

  const titles = []
  const panels = []

  if (messageModel.answer) {
    titles.push("Как получился результат")
    panels.push(
      <Text>
        <Markdown>{messageModel.answer}</Markdown>
      </Text>
    )
  }

  if (messageModel.sql) {
    titles.push("SQL запрос")
    panels.push(<Code>{messageModel.sql}</Code>)
  }

  titles.push("Ответ из таблицы")
  if (messageModel.table) {
    panels.push(
      <Text mt="5">
        <Markdown>{messageModel.table}</Markdown>
      </Text>
    )
  } else {
    panels.push(<Text mt="5">В таблице нет информации для данных фильтров</Text>)
  }

  const isOnlyAnswerFromAssistant =
    messageModel.answer?.trim() !== "" &&
    !messageModel.sql &&
    !messageModel.table &&
    !messageModel.query

  if (isOnlyAnswerFromAssistant) {
    messageContent = messageModel.answer!
  }

  return (
    <Message
      key={key}
      reviewModels={messageModel.reviews}
      markModel={
        messageModel.mark && (messageModel.mark.length === 0 ? undefined : messageModel.mark[0])
      }
      src={src}
      messageId={messageModel.id}
      direction={!messageModel.answer ? "outgoing" : "incoming"}
      query={messageModel.query}
    >
      <Markdown>{messageContent}</Markdown>

      {messageModel.sql && <AnswerTabs titles={titles} panels={panels} />}
    </Message>
  )
}
