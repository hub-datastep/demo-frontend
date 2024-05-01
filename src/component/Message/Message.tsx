import { Box, Button, Card, CardBody, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { createMark } from "api/markApi"
import Code from "component/Code"
import Avatar from "component/Message/Avatar"
import Callback from "component/Message/Callback"
import Markdown from "component/Message/Markdown"
import { UserContext } from "context/userContext"
import { formatDate } from "misc/util"
import ChatModel from "model/ChatModel"
import MarkModel from "model/MarkModel"
import { UserModel } from "model/UserModel"
import { FC, ReactNode, useContext, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useMutation, useQueryClient } from "react-query"
import Accordion from "component/Accordion"
import { MessageModel } from "model/MessageModel"
import { IMessage } from "component/Message/types"
import { useFavoriteMessage } from "service/messageService"
import { ModeContext, ModeContextI } from "context/modeContext"
import { FavoriteMessageContext, IFavoriteMessageContext } from "context/favoriteMessageContext"

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
    const [isCommenting, setIsCommenting] = useState<boolean>(false)
    const queryClient = useQueryClient()
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

    const updateMarkInChat = (oldChat: ChatModel, messageId: number, newMark: MarkModel) => {
        oldChat.messages.forEach((message) => {
            if (message.id === messageId) {
                message.mark = [newMark]
            }
        })
        return oldChat
    }

    const createMarkMutation = useMutation(createMark, {
        onMutate: async (newMark: MarkModel) => {
            await queryClient.cancelQueries("chat")
            const previousChat = queryClient.getQueryData<ChatModel>("chat")
            if (previousChat) {
                queryClient.setQueriesData<ChatModel>("chat", updateMarkInChat(previousChat, messageId, newMark))
            }
            return {
                previousChat,
            }
        },
        onError: (_error, _currentMark, context) => {
            queryClient.setQueriesData("chat", context?.previousChat)
        },
        onSettled: () => {
            queryClient.invalidateQueries("chat")
        },
    })

    const handleMarkButton = (mark: number) => {
        createMarkMutation.mutate({
            mark,
            created_by: user.id,
            message_id: messageId,
        } as MarkModel)
    }
    
    const handleFavoriteButton = () => {
        favoriteMutation.mutate({
            query: query!,
            user_id: user.id,
            mode: currentMode
        })
    }

    const LikeDislike = () => {
        return (
            <HStack gap="3">
                <Button
                    size="sm"
                    colorScheme="blue"
                    variant={markModel && markModel.mark === 1 ? "solid" : "outline"}
                    onClick={() => handleMarkButton(1)}
                >
                    👍
                </Button>
                <Button
                    size="sm"
                    colorScheme="blue"
                    variant={markModel && markModel.mark === 0 ? "solid" : "outline"}
                    onClick={() => handleMarkButton(0)}
                >
                    👎
                </Button>
            </HStack>
        )
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

    function handleClick() {
        if (isCommenting) {
            setIsCommenting(false)
        }
        else setIsCommenting(true)
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

                    {direction === "incoming" && callback &&
                        <>
                            <HStack mt="0">

                                <Button
                                    aria-label=""
                                    colorScheme="blue"
                                    size="sm"
                                    mt={3}
                                    onClick={() => handleClick()}
                                >
                                    {!isCommenting ? "Открыть комментарии" : "Закрыть комментарии"}
                                </Button>
                                <Box alignSelf="end">
                                    <LikeDislike />
                                </Box>

                            </HStack>
                            {isCommenting && (
                                <Callback messageId={messageId} />
                            )}
                            <VStack align="start">
                                {reviewModels && reviewModels.length !== 0 && isCommenting &&
                                    <>
                                        <Text fontWeight="bold" mt="5">Комментарии</Text>
                                        {reviewModels.map(({ commentary, id, created_at }, index) => (
                                            <VStack align="left" mt={index === 0 ? 0 : 4} spacing={0} key={id}>
                                                <Text color="gray.500" fontSize="15">{formatDate(created_at)}</Text>
                                                <ReactMarkdown>{commentary}</ReactMarkdown>
                                            </VStack>
                                        ))}
                                    </>
                                }
                            </VStack>
                        </>
                    }
                    {isFavoriteListEnabled && direction === "outgoing" &&
                        <>
                            <Box alignSelf="end">
                                <Favorites/>
                            </Box>
                        </>
                    }
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
        src = "/image/avatar/bot.png"
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

    return <Message
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
}