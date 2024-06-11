import { Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react"
import DeleteFileModal from "component/filesHistory/DeleteFileModal"
import { FileModel } from "model/FileModel"
import { FC } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { useQueryClient } from "react-query"
import { Bounce, ToastOptions, toast } from "react-toastify"
import { useDeleteFileMutation } from "service/fileService"

interface RowButtonsKnowledgeBaseProps {
  file: FileModel
}

export const RowButtonsKnowledgeBase: FC<RowButtonsKnowledgeBaseProps> = (props) => {
  const { file } = props

  const queryClient = useQueryClient()
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()

  const deleteFileMutation = useDeleteFileMutation()

  const clearChatSuccessToastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    transition: Bounce,
    closeButton: true,
  }

  const showSuccefullToast = () => {
    toast.success(<Text fontSize="md">Документ успешно удалён</Text>, clearChatSuccessToastOptions)
  }

  const handleDeleteFile = async () => {
    onCloseModal()
    await deleteFileMutation.mutateAsync(file.id)
    await queryClient.invalidateQueries("filesList")
    showSuccefullToast()
  }

  return (
    <Flex alignItems="center" gap={2}>

      {/* Delete file button */}
      <IconButton
        aria-label="delete file"
        variant="ghost"
        colorScheme="red"
        icon={<FaTrashAlt color="red" />}
        isLoading={deleteFileMutation.isLoading}
        onClick={onOpenModal}
      />

      <DeleteFileModal
        isOpenModal={isOpenModal}
        onCloseModal={onCloseModal}
        onConfirm={handleDeleteFile}
      />
    </Flex>
  )
}
