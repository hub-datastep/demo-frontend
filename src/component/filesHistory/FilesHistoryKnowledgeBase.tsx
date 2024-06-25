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
import { UploadFileBtn } from "component/filesHistory/UploadFileBtn"
import { FileModel } from "model/FileModel"
import { FC } from "react"
import { FilesListKnowledgeBase } from "component/filesHistory/FilesListKnowledgeBase"

interface IFilesHistoryKnowledgeBaseProps {
  filesList: FileModel[]
  isOpen: boolean
  onClose: () => void
}

const FilesHistoryKnowledgeBase: FC<IFilesHistoryKnowledgeBaseProps> = (props) => {
  const { filesList, isOpen, onClose } = props

  const isFilesExists = filesList.length > 0

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Документы</DrawerHeader>

        <DrawerBody display="flex" flexDirection="column" flexGrow="1">
          {isFilesExists ? (
            <FilesListKnowledgeBase filesList={filesList} />
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
          <UploadFileBtn isKnowledgeBase />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default FilesHistoryKnowledgeBase
