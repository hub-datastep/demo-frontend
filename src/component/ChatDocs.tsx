import { Box, Flex, Spacer, useDisclosure } from "@chakra-ui/react"
import { getOrCreateChat } from "api/chatApi"
import { getAllFiles } from "api/fileApi"
import queryClient from "api/queryClient"
import FilesHistory from "component/FilesHistory/FilesHistory"
import InputGroupDocs from "component/InputGroup/InputGroupDocs"
import InputGroupContext from "component/InputGroup/context"
import { PDFViewer } from "component/PDFViewer"
import { UserContext } from "context/userContext"
import ChatModel from "model/ChatModel"
import { FileModel } from "model/FileModel"
import QueryModel from "model/QueryModel"
import { UserModel } from "model/UserModel"
import { useContext, useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { useCreateMessage } from "service/messageService"
import { useDocsPrediction } from "service/predictionService"

function ChatDocs() {
    const chatRef = useRef<HTMLDivElement | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [currentFileIndex, setCurrentFileIndex] = useState<number>(0)
    const user = useContext<UserModel>(UserContext)
    const [similarQueries, setSimilarQueries] = useState<string[]>([])
    const {
        isOpen: isSourcesHistoryOpen,
        onOpen: openSourcesHistory,
        onClose: closeSourcesHistory
    } = useDisclosure()
    
    const messageCreateMutation = useCreateMessage()
    const predictionMutation = useDocsPrediction()

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

    return (
        <Flex
            position="relative"
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            pt="100"
            pb="10"
            h="full"
        >
            <Flex
                ref={chatRef}
                position="relative"
                direction="column"
                justifyContent="flex-start"
                p="10"
                h="full"
                w="768px"
                gap={10}
            >
                {filesList && currentFileIndex >= 0 && (
                    <>
                        <Box position="fixed" left="0" top="80px">
                            <PDFViewer fileUrl={filesList[currentFileIndex].file_path} page={currentPage} />
                        </Box>
                        <Spacer />
                    </>
                )}

                {filesList && (
                    <FilesHistory
                        filesList={filesList}
                        currentFileIndex={currentFileIndex}
                        setCurrentFileIndex={setCurrentFileIndex}
                        isOpen={isSourcesHistoryOpen}
                        onClose={closeSourcesHistory}
                    />
                )}

                {/* {filesList && currentFileIndex >= 0 ? (
                    <Text color="black">{filesList[currentFileIndex].original_filename}</Text>
                ) : (
                    <Text color="gray" fontStyle="italic">
                        Выберите файл через кнопку «Документы»
                    </Text>
                )} */}

                <InputGroupContext.Provider value={{ handleSubmit, similarQueries }}>
                    <InputGroupDocs
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        openSourcesHistory={openSourcesHistory}
                        currentFileIndex={currentFileIndex}
                    />
                </InputGroupContext.Provider>
            </Flex>
        </Flex>
    )
}

export default ChatDocs
