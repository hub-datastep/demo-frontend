import { Flex } from "@chakra-ui/react"
import { getOrCreateChat } from "api/chatApi"
import { getAllFiles } from "api/fileApi"
import queryClient from "api/queryClient"
import { FileViewer } from "component/FilesHistory/FileViewer"
import InputGroupDocs from "component/InputGroup/InputGroupDocs"
import LoadingMessage from "component/InputGroup/LoadingMessage"
import InputGroupContext from "component/InputGroup/context"
import { LoadMoreMessagesBtn } from "component/LoadMoreMessagesBtn"
import { Message, createMessage } from "component/Message/Message"
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
import { useDocsPrediction } from "service/predictionService"

function ChatDocs() {
    const messageWindowRef = useRef<HTMLDivElement | null>(null)
    const chatRef = useRef<HTMLDivElement | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [currentFileIndex, setCurrentFileIndex] = useState<number>(-1)
    const user = useContext<UserModel>(UserContext)
    const [similarQueries, setSimilarQueries] = useState<string[]>([])

    const { shownMessageCount } = useContext<ModeContextI>(ModeContext)
    
    const messageCreateMutation = useCreateMessage()
    const predictionMutation = useDocsPrediction()

    const { data: chat, status: chatQueryStatus } = useQuery<ChatModel>("chat", () => {
        return getOrCreateChat(user.id)
    })

    const { data: filesList = [] } = useQuery<FileModel[]>(
        "filesList",
        getAllFiles,
        { enabled: !!chat?.id }
    )

    const isLoading = predictionMutation.isLoading
        || messageCreateMutation.isLoading
        || chatQueryStatus === "loading"

    const errorMessage = predictionMutation.isError ? "Произошла ошибка. Попробуйте ещё раз" : undefined
    
    const handleSubmit = async (finalQuery: string, limit?: number) => {
        if (chat && finalQuery.trim() !== "") {
            const { id: queryMessageId } = await messageCreateMutation.mutateAsync({
                query: finalQuery,
                chat_id: chat.id
            })

            const body: Omit<QueryModel, "chat_id"> = {
                query: finalQuery,
                limit
            }

            if (filesList) {
                body["filename"] = filesList[currentFileIndex].storage_filename
            }

            const { answer, sql, table: markdownTable, similar_queries: similarQueries, page }
                = await predictionMutation.mutateAsync(body)

            setCurrentPage(page)

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
        <Flex
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            alignSelf="flex-end"
            pt="100"
            // pb="10"
            h="full"
            w="50%"
        >
            <Flex
                ref={chatRef}
                direction="column"
                justifyContent="flex-start"
                px="10"
                h="full"
                w="full"
                gap={10}
            >
                <FileViewer
                    filesList={filesList}
                    currentFileIndex={currentFileIndex}
                    currentPage={currentPage}
                    setCurrentFileIndex={setCurrentFileIndex}
                />

                {chat && chat.messages.length > shownMessageCount && (
                    <LoadMoreMessagesBtn isLoading={isLoading} />
                )}

                <Flex
                    ref={messageWindowRef}
                    direction="column"
                    gap="5"
                    flexGrow="1"
                >
                    {/* Messages from history */}
                    {chat && !!chat.messages.length && (
                        getLastN(
                            shownMessageCount,
                            chat.messages.map((message, i) => createMessage(message, i))
                        )
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
                    <InputGroupDocs
                        filesList={filesList}
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        currentFileIndex={currentFileIndex}
                        setCurrentFileIndex={setCurrentFileIndex}
                    />
                </InputGroupContext.Provider>
            </Flex>
        </Flex>
    )
}

export default ChatDocs
