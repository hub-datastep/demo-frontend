import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react"
import { FilesList } from "component/filesHistory/FilesList"
import { UploadFileBtn } from "component/filesHistory/UploadFileBtn"
import { FileModel } from "model/FileModel"
import { Dispatch, FC, SetStateAction } from "react"

interface IFilesHistory {
  filesList: FileModel[]
  currentFileIndex: number
  setCurrentFileIndex: Dispatch<SetStateAction<number>>
  isOpen: boolean
  onClose: () => void
}

const FilesHistory: FC<IFilesHistory> = (props) => {
  const { filesList, currentFileIndex, setCurrentFileIndex, isOpen, onClose } = props

  const isFilesExists = filesList.length > 0

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Документы</DrawerHeader>

        <DrawerBody display="flex" flexDirection="column" flexGrow="1">
          {isFilesExists ? (
            <FilesList
              filesList={filesList}
              currentFileIndex={currentFileIndex}
              setCurrentFileIndex={setCurrentFileIndex}
            />
          ) : (
            <Flex
              h="full"
              w="30%"
              justifyContent="center"
              alignItems="center"
              alignSelf="center"
              textAlign="center"
            >
              <Text color="gray">Загрузите документ и он отобразится здесь</Text>
            </Flex>
          )}
        </DrawerBody>

        <DrawerFooter w="full" justifyContent="center">
          <UploadFileBtn isKnowledgeBase={false} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default FilesHistory
