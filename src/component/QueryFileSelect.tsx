import { Button, Text, useDisclosure } from "@chakra-ui/react"
import FilesHistory from "component/FilesHistory/FilesHistory"
import { getShortFileName } from "misc/util"
import { FileModel } from "model/FileModel"
import { Dispatch, FC, SetStateAction } from "react"

interface QueryFileSelectProps {
    size?: "small" | "large"
    filesList: FileModel[]
    currentFileIndex: number
    setCurrentFileIndex: Dispatch<SetStateAction<number>>
}

export const QueryFileSelect: FC<QueryFileSelectProps> = (props) => {
    const { size = "small", filesList, currentFileIndex, setCurrentFileIndex } = props

    const {
        isOpen: isSourcesHistoryOpen,
        onOpen: openSourcesHistory,
        onClose: closeSourcesHistory
    } = useDisclosure()

    const isSmallBtn = size === "small"
    const fileName = getShortFileName(filesList[currentFileIndex]?.original_filename)

    return (
        <>
            <Button
                aria-label="open files history"
                onClick={openSourcesHistory}
                variant={isSmallBtn ? "outline" : "solid"}
                colorScheme={isSmallBtn ? "gray" : "purple"}
            >
                <Text fontSize={isSmallBtn ? "sm" : "lg"}>
                    {currentFileIndex < 0 ? "Выбрать документ" : `Документ: ${fileName}`}
                </Text>
            </Button>

            {filesList && (
                <FilesHistory
                    filesList={filesList}
                    currentFileIndex={currentFileIndex}
                    setCurrentFileIndex={setCurrentFileIndex}
                    isOpen={isSourcesHistoryOpen}
                    onClose={closeSourcesHistory}
                />
            )}
        </>
    )
}
