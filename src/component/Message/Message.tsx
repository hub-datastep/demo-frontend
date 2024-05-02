import { Box, Button, Card, CardBody, Flex, HStack, Text } from "@chakra-ui/react"
import Accordion from "component/Accordion"
import Code from "component/Code"
import Avatar from "component/Message/Avatar"
import Markdown from "component/Message/Markdown"
import { IMessage } from "component/Message/types"
import { FavoriteMessageContext, IFavoriteMessageContext } from "context/favoriteMessageContext"
import { ModeContext, ModeContextI } from "context/modeContext"
import { UserContext } from "context/userContext"
import { MessageModel } from "model/MessageModel"
import { UserModel } from "model/UserModel"
import { FC, ReactNode, useContext } from "react"
import { useFavoriteMessage } from "service/messageService"

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
    const user = useContext<UserModel>(UserContext)
    const { currentMode } = useContext<ModeContextI>(ModeContext)
    const favoriteMutation = useFavoriteMessage()
    const { isFavoriteListEnabled } = useContext<IFavoriteMessageContext>(FavoriteMessageContext)

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
    
    const handleFavoriteButton = () => {
        favoriteMutation.mutate({
            query: query!,
            user_id: user.id,
            mode: currentMode
        })
    }
    
    const Favorites = () => {
        return (
            <HStack>
                <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    onClick={handleFavoriteButton}
                >
                    ⭐️
                </Button>
            </HStack>
        )
    }

    return (
        <Flex
            justify={justify}
            flexDirection={flexDirection}
            gap="10px"
        >
            <Avatar name={name} src={src as string} />
            <Card>
                <CardBody>
                    {children}
                    
                    {isFavoriteListEnabled && direction === "outgoing" && (
                        <Box alignSelf="end">
                            <Favorites/>
                        </Box>
                    )}
                </CardBody>
            </Card>
        </Flex>
    )
}

export const createMessage = (messageModel: MessageModel, key: number): ReactNode => {
    let messageContent = ""
    let src = ""

    if (messageModel.query) {
        messageContent += messageModel.query
        src = "/image/avatar/user.png"
    }

    if (messageModel.answer || messageModel.sql || messageModel.table) {
        messageContent = messageModel.answer ?? ""
        src = "/image/avatar/bot.svg"
    }

    const titles = []
    const panels = []

    if (messageModel.sql) {
        titles.push("Как получился результат")
        panels.push(<Code>{messageModel.sql}</Code>)
    }

    titles.push("Результат")

    if (messageModel.table) {
        panels.push(<Text mt="5"><Markdown>{messageModel.table}</Markdown></Text>)
    } else {
        panels.push(<Text mt="5">В таблице нет информации для данных фильтров</Text>)
    }

    return (
        <Message
            reviewModels={messageModel.reviews}
            markModel={messageModel.mark && (messageModel.mark.length === 0 ? undefined : messageModel.mark[0])}
            src={src}
            messageId={messageModel.id}
            // != не заменять на !==, иначе все аватарки будут по левую сторону
            // eslint-disable-next-line
            direction={messageModel.answer !== "" ? "incoming" : "outgoing"}
            key={key}
            query={messageModel.query}
        >
            <Markdown>{messageContent}</Markdown>
            <Box mt="5">
                {messageModel.sql &&
                <Accordion
                    titles={titles}
                    panels={panels}
                    defaultIndex={1}
                />
                }
            </Box>
        </Message>
    )
}