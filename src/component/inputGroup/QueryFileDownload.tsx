import { Button, Text, useDisclosure } from "@chakra-ui/react"
import FilesHistoryKnowledgeBase from "component/filesHistory/FilesHistoryKnowledgeBase"
import { FileModel } from "model/FileModel"
import { FC } from "react"

interface QueryFileDowloadProps {
  size?: "small" | "large"
  filesList: FileModel[]
  isLoading: boolean
}

export const QueryFileDowload: FC<QueryFileDowloadProps> = (props) => {
  const { size = "small", filesList, isLoading } = props

  const {
    isOpen: isSourcesHistoryOpen,
    onOpen: openSourcesHistory,
    onClose: closeSourcesHistory,
  } = useDisclosure()

  const isSmallBtn = size === "small"

  return (
    <>
      <Button
        aria-label="open files history"
        onClick={openSourcesHistory}
        variant={isSmallBtn ? "outline" : "solid"}
        colorScheme={isSmallBtn ? "gray" : "purple"}
        isDisabled={isLoading}
      >
        <Text fontSize={isSmallBtn ? "sm" : "lg"}>
          Загрузить документ
        </Text>
      </Button>

      {filesList && (
        <FilesHistoryKnowledgeBase
          filesList={filesList}
          isOpen={isSourcesHistoryOpen}
          onClose={closeSourcesHistory}
        />
      )}
    </>
  )
}
