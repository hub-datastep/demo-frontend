import { Button, Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react"
import DeleteFileModal from "component/filesHistory/DeleteFileModal"
import { FileModel } from "model/FileModel"
import { Dispatch, FC, SetStateAction } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { useQueryClient } from "react-query"
import { Bounce, ToastOptions, toast } from "react-toastify"
import { useDeleteFileMutation } from "service/fileService"

interface RowButtonsProps {
    fileIndex: number
    file: FileModel
    isSelected: boolean
    setCurrentFileIndex: Dispatch<SetStateAction<number>>
}

export const RowButtons: FC<RowButtonsProps> = (props) => {
    const { fileIndex, file, isSelected, setCurrentFileIndex } = props

    const queryClient = useQueryClient()
    const {
        isOpen: isOpenModal,
        onOpen: onOpenModal,
        onClose: onCloseModal,
    } = useDisclosure()

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

    const handleSelectButtonClick = () => {
        setCurrentFileIndex(fileIndex)
    }

    const showSuccefullToast = () => {
        toast.success((
            <Text fontSize="md">Документ успешно удалён</Text>
        ), clearChatSuccessToastOptions)
    }
    
    const handleDeleteFile = async () => {
        onCloseModal()
        await deleteFileMutation.mutateAsync(file.id)
        await queryClient.invalidateQueries("filesList")
        setCurrentFileIndex(-1)
        showSuccefullToast()
    }
  
    return (
        <Flex alignItems="center" gap={2}>
            <Button
                colorScheme="purple"
                variant={isSelected ? "solid" : "outline"}
                size="sm"
                onClick={handleSelectButtonClick}
                isDisabled={isSelected}
            >
                {isSelected ? "Выбрано" : "Выбрать"}
            </Button>

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