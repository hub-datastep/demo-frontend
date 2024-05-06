import { Card, CardBody, Flex, Text } from "@chakra-ui/react"
import Accordion from "component/Accordion"
import Code from "component/Code"
import Avatar from "component/Message/Avatar"
import Markdown from "component/Message/Markdown"
import { IMessage } from "component/Message/types"
import { MessageModel } from "model/MessageModel"
import { FC, ReactNode } from "react"

export const Message: FC<IMessage> = ({
    messageId,
    src,
    direction,
    children,
    reviewModels,
    markModel,
    callback = true,
    query
}) => {
    let justify, flexDirection, name = ""

    if (direction === "incoming") {
        justify = "start" as const
        flexDirection = "row" as const
        name = "bot"
    }

    if (direction === "outgoing") {
        justify = "end" as const
        flexDirection = "row-reverse" as const
        name = "user"
    }

    return (
        <Flex
            justify={justify}
            flexDirection={flexDirection}
            gap="10px"
        >
            <Avatar name={name} src={src as string} />
            <Card shadow="lg">
                <CardBody>
                    {children}
                </CardBody>
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
        panels.push(<Text><Markdown>{messageModel.answer}</Markdown></Text>)
    }

    if (messageModel.sql) {
        titles.push("SQL запрос")
        panels.push(<Code>{messageModel.sql}</Code>)
    }

    titles.push("Ответ из таблицы")
    if (messageModel.table) {
        panels.push(<Text mt="5"><Markdown>{messageModel.table}</Markdown></Text>)
    } else {
        panels.push(<Text mt="5">В таблице нет информации для данных фильтров</Text>)
    }

    return (
        <Message
            key={key}
            reviewModels={messageModel.reviews}
            markModel={messageModel.mark && (messageModel.mark.length === 0 ? undefined : messageModel.mark[0])}
            src={src}
            messageId={messageModel.id}
            direction={!messageModel.answer ? "outgoing" : "incoming"}
            query={messageModel.query}
        >
            <Markdown>{messageContent}</Markdown>
            {messageModel.sql && (
                <Accordion
                    titles={titles}
                    panels={panels}
                />
            )}
        </Message>
    )
}