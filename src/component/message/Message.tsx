import { Button, Card, CardBody, Flex, Text } from "@chakra-ui/react"
import { PDFViewerKnowledgeBase } from "component/PDFViewerKnowledgeBase"
import AnswerTabs from "component/message/AnswerTabs"
import { Avatar } from "component/message/Avatar"
import Code from "component/message/Code"
import Markdown from "component/message/Markdown"
import { ResultTable } from "component/message/ResultTable"
import { IMessage } from "component/message/types"
import { isMarkdownTable } from "misc/markdown-table"
import { MessageModel } from "model/MessageModel"
import { FC, ReactNode } from "react"

export const Message: FC<IMessage> = (props) => {
  const { src, direction, children } = props

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

export const createMessage = (
  messageModel: MessageModel,
  key: number,
  isPdfViewerOpen?: boolean,
  togglePdfViewer?: () => void
): ReactNode => {
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
    titles.push("Результат")
    panels.push(
      <Flex direction="column" gap={5}>
        <Text>
          <Markdown>{messageModel.answer}</Markdown>
        </Text>

        {messageModel.table ? (
          <Text>
            <ResultTable markdownTable={messageModel.table} />
            {/* <Markdown>{messageModel.table}</Markdown> */}
          </Text>
        ) : (
          <Text mt="5">В таблице нет информации для данных фильтров</Text>
        )}
      </Flex>
    )
  }

  if (messageModel.sql) {
    titles.push("SQL запрос")
    panels.push(<Code>{messageModel.sql}</Code>)
  }

  // titles.push("Ответ из таблицы")
  // if (messageModel.table) {
  //   panels.push()
  // } else {
  //   panels.push()
  // }

  const isOnlyAnswerFromAssistant =
    messageModel.answer?.trim() !== "" &&
    !messageModel.sql &&
    !messageModel.table &&
    !messageModel.query

  if (isOnlyAnswerFromAssistant) {
    messageContent = messageModel.answer!
  }

  const messageIsTable = isMarkdownTable(messageContent)
  const isKnowledgeBaseMessage = !!messageModel.filename && !!messageModel.file_path


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
      {messageIsTable ? (
        <ResultTable markdownTable={messageContent} />
      ) : (
        <Markdown>{messageContent}</Markdown>
      )}
      {/* <Markdown>{messageContent}</Markdown> */}
      {/* {messageContent} */}

      {messageModel.sql && <AnswerTabs titles={titles} panels={panels} />}
      {isKnowledgeBaseMessage && (
        <>
          <Button onClick={togglePdfViewer}>{messageModel.filename}</Button>
          {isPdfViewerOpen && <PDFViewerKnowledgeBase fileUrl={messageModel.file_path!} page={0} />}
        </>
      )}
    </Message>
  )
}
