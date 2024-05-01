import { Box, Button, Flex, Spacer, Text, useDisclosure } from "@chakra-ui/react"
import { getOrCreateChat } from "api/chatApi"
import queryClient from "api/queryClient"
import InputGroup from "component/InputGroup/InputGroup"
import { Message, createMessage } from "component/Message/Message"
import SkeletonMessage from "component/Message/SkeletonMessage"
import FilesHistory from "component/FilesHistory/FilesHistory"
import { ModeContext, ModeContextI } from "context/modeContext"
import { UserContext } from "context/userContext"
import { getLastN } from "misc/util"
import ChatModel from "model/ChatModel"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { useCreateMessage } from "service/messageService"
import { usePrediction } from "service/predictionService"
import { UserModel } from "model/UserModel"
import InputGroupContext from "component/InputGroup/context"
import { PDFViewer } from "component/PDFViewer"
import { FileModel } from "model/FileModel"
import { getAllFiles } from "api/fileApi"
import QueryModel from "model/QueryModel"
import LoadingMessage from "component/InputGroup/LoadingMessage"

function Chat() {
    const messageWindowRef = useRef<HTMLDivElement | null>(null)
    const chatRef = useRef<HTMLDivElement | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [table, setTable] = useState<string>("платежи")
    const [currentFileIndex, setCurrentFileIndex] = useState<number>(-1)
    const user = useContext<UserModel>(UserContext)
    const [similarQueries, setSimilarQueries] = useState<string[]>([])
    const {
        currentMode,
        isFilesEnabled,
        shownMessageCount,
        setShownMessageCount
    } = useContext<ModeContextI>(ModeContext)
    const {
        isOpen: isSourcesHistoryOpen,
        onOpen: openSourcesHistory,
        onClose: closeSourcesHistory
    } = useDisclosure()
    
    const messageCreateMutation = useCreateMessage()
    const predictionMutation = usePrediction()

    const isFilesMode = currentMode === "wiki"

    const { data: chat, status: chatQueryStatus } = useQuery<ChatModel>("chat", () => {
        return getOrCreateChat(user.id)
    })

    const { data: filesList } = useQuery<FileModel[]>(
        "filesList",
        () => getAllFiles(),
        { enabled: !!chat?.id }
    )

    const isLoading = predictionMutation.isLoading
        || messageCreateMutation.isLoading
        || chatQueryStatus === "loading"

    const errorMessage = predictionMutation.isError ? "Произошла ошибка. Попробуйте ещё раз" : undefined

    useEffect(() => {
        window.scroll({
            top: chatRef.current?.offsetHeight,
            behavior: "smooth",
        })
    }, [chat?.messages.length])

    const handleSubmit = async (finalQuery: string, limit: number) => {
        if (chat && finalQuery.trim() !== "") {
            const { id: queryMessageId } = await messageCreateMutation.mutateAsync({
                query: finalQuery,
                chat_id: chat.id
            })

            const body: Omit<QueryModel, "chat_id"> = {
                query: finalQuery,
                limit
            }

            if (isFilesMode && filesList) {
                body["filename"] = filesList[currentFileIndex].storage_filename
            } else {
                body["tables"] = [table]
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

    const handleShowMore = () => {
        setShownMessageCount((lastN) => lastN + 10)
    }

    return (
        <Flex
            position="relative"
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
            pt="100"
            pb="10"
            h="full"
        >
            {isFilesEnabled && filesList && currentFileIndex >= 0 && isFilesMode &&
                <>
                    <Box position="fixed" left="0" top="80px">
                        <PDFViewer fileUrl={filesList[currentFileIndex].file_path} page={currentPage} />
                    </Box>
                    <Spacer />
                </>
            }
            <Flex
                ref={chatRef}
                position="relative"
                direction="column"
                justifyContent="flex-end"
                p="10"
                h="full"
                w="768px"
                gap={10}
            >

                {isFilesEnabled && filesList && (
                    <FilesHistory
                        filesList={filesList}
                        currentFileIndex={currentFileIndex}
                        setCurrentFileIndex={setCurrentFileIndex}
                        isOpen={isSourcesHistoryOpen}
                        onClose={closeSourcesHistory}
                    />
                )}

                {chat && !!chat.messages.length && chat.messages.length > shownMessageCount
                && <Button colorScheme="blue" variant="link" onClick={handleShowMore}>Предыдущие сообщения</Button>}

                {chatQueryStatus !== "loading" ?
                    <Flex direction="column" gap="5" flexGrow="1" ref={messageWindowRef}>
                        {chat && !!chat.messages.length && getLastN(shownMessageCount, chat.messages.map((message, i) => createMessage(message, i)))}
                    </Flex> :
                    <Flex direction="column" gap="5" flexGrow="1" ref={messageWindowRef}>
                        <SkeletonMessage direction="outgoing" width="35%" height="60px" />
                        <SkeletonMessage direction="incoming" width="65%" height="95px" />
                        <SkeletonMessage direction="outgoing" width="30%" height="55px" />
                        <SkeletonMessage direction="incoming" width="68%" height="75px" />
                        <SkeletonMessage direction="outgoing" width="45%" height="65px" />
                        <SkeletonMessage direction="incoming" width="63%" height="105px" />
                    </Flex>
                }

                {chat && !chat.messages.length &&
                    <Message
                        direction='incoming'
                        messageId={-1}
                        src={"/image/avatar/bot.png"}
                        callback={false}
                    >
                        Какой у вас запрос?
                    </Message>}
                { isLoading &&
                    <Message
                        direction='incoming'
                        messageId={-1}
                        src={"/image/avatar/bot.png"}
                        callback={false}
                    >
                        <LoadingMessage />
                    </Message>}
                <InputGroupContext.Provider value={{ handleSubmit, similarQueries }}>
                    <InputGroup
                        setTable={setTable}
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        openSourcesHistory={openSourcesHistory}
                        currentFileIndex={currentFileIndex}
                    />
                </InputGroupContext.Provider>
                
                {isFilesEnabled && isFilesMode && (
                    isFilesMode ? filesList && currentFileIndex >= 0 ? (
                        <Text color="black">{filesList[currentFileIndex].original_filename}</Text>
                    ) : (
                        <Text color="gray" fontStyle="italic">Выберите файл через кнопку «Документы»</Text>
                    ) : filesList && currentFileIndex >= 0 && (
                        <Text color="gray">{filesList[currentFileIndex].original_filename}</Text>
                    )
                )}                
            </Flex>
            {/*<Flex position="absolute" right="50">*/}
            {/*    <FaqModal/>*/}
            {/*</Flex>*/}
        </Flex>
    )
}

export default Chat
