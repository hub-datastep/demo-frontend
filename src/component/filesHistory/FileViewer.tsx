import { Flex } from "@chakra-ui/react"
import { PDFViewer } from "component/PDFViewer"
import { QueryFileSelect } from "component/inputGroup/QueryFileSelect"
import { FileModel } from "model/FileModel"
import { Dispatch, FC, SetStateAction } from "react"

interface FileViewerProps {
  filesList: FileModel[]
  currentFileIndex: number
  currentPage: number
  setCurrentFileIndex: Dispatch<SetStateAction<number>>
}

export const FileViewer: FC<FileViewerProps> = (props) => {
  const { filesList, currentFileIndex, currentPage, setCurrentFileIndex } = props

  const isFileSelected = filesList.length > 0 && currentFileIndex >= 0

  return (
    <Flex h="100vh" w="50%" backgroundColor="gray.300" justifyContent="center" alignItems="center">
      {isFileSelected ? (
        <PDFViewer fileUrl={filesList[currentFileIndex].file_path} page={currentPage} />
      ) : (
        <QueryFileSelect
          size="large"
          filesList={filesList}
          currentFileIndex={currentFileIndex}
          setCurrentFileIndex={setCurrentFileIndex}
        />
      )}
    </Flex>
  )
}
