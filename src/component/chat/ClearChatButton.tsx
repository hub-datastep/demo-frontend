import { Button, Text } from "@chakra-ui/react"
import { ClearChatModal } from "component/chat/ClearChatModal"
import ChatModel from "model/ChatModel"
import { FC, useState } from "react"
import { useQueryClient } from "react-query"
import { Bounce, ToastOptions, toast } from "react-toastify"
import { useClearMessages } from "service/messageService"

interface ClearChatButtonProps {
  isLoading: boolean
  chatId?: number
}

export const ClearChatButton: FC<ClearChatButtonProps> = (props) => {
  const { isLoading, chatId } = props

  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const clearMessagesMutation = useClearMessages()

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

  const handleClearChatCancel = () => {
    queryClient.invalidateQueries("chat")
    setIsModalOpen(false)
  }

  const showSuccefullToast = () => {
    toast.success(<Text fontSize="md">Чат успешно очищен</Text>, clearChatSuccessToastOptions)
  }

  const handleClearChatConfirm = () => {
    showSuccefullToast()
    setIsModalOpen(false)
    if (chatId) {
      clearMessagesMutation.mutate(chatId)
    }
  }

  const handleClearChat = () => {
    setIsModalOpen(true)

    // Hide previous messages
    const previousChat = queryClient.getQueryData<ChatModel>("chat")
    if (previousChat) {
      previousChat.messages = []
      queryClient.setQueriesData<ChatModel>("chat", previousChat)
    }
  }

  return (
    <>
      <Button variant="outline" colorScheme="red" onClick={handleClearChat} isDisabled={isLoading}>
        <Text fontSize="sm">Очистить чат</Text>
      </Button>

      <ClearChatModal
        isOpen={isModalOpen}
        onCancel={handleClearChatCancel}
        onConfirm={handleClearChatConfirm}
      />
    </>
  )
}
