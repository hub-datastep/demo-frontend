import { Flex } from "@chakra-ui/react"
import FileRow from "component/filesHistory/FileRow"
import { FileModel } from "model/FileModel"
import { Dispatch, FC, SetStateAction } from "react"

interface FilesListProps {
  filesList: FileModel[]
  currentFileIndex: number
  setCurrentFileIndex: Dispatch<SetStateAction<number>>
}

export const FilesList: FC<FilesListProps> = (props) => {
  const { filesList, currentFileIndex, setCurrentFileIndex } = props

  return (
    <Flex direction="column" h="full" width="full">
      {filesList.map((file, index) => (
        <FileRow
          key={index}
          fileIndex={index}
          file={file}
          currentFileIndex={currentFileIndex}
          setCurrentFileIndex={setCurrentFileIndex}
        />
      ))}
    </Flex>
  )
}
