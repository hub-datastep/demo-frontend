import { Flex } from "@chakra-ui/react"
import { FileModel } from "model/FileModel"
import { FC } from "react"
import FileRowKnowledgeBase from "component/filesHistory/FileRowKnowledgeBase"

interface FilesListKnowledgeBaseProps {
  filesList: FileModel[]
}

export const FilesListKnowledgeBase: FC<FilesListKnowledgeBaseProps> = (props) => {
  const { filesList } = props

  return (
    <Flex direction="column" h="full" width="full">
      {filesList.map((file, index) => (
        <FileRowKnowledgeBase key={index} file={file} />
      ))}
    </Flex>
  )
}
