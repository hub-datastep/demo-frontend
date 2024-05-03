import { Button, Flex, Text, UseToastOptions, useToast } from "@chakra-ui/react"
import { ModeContext, ModeContextI } from "context/modeContext"
import ChatModel from "model/ChatModel"
import { useContext, useEffect, useRef, useState } from "react"
import { useQueryClient } from "react-query"
import { useClearMessages } from "service/messageService"

export const ClearChatButton = () => {
    const queryClient = useQueryClient()
    const { chatID } = useContext<ModeContextI>(ModeContext)
    const clearMessagesMutation = useClearMessages()
  
    const toast = useToast()
    const toastIdRef = useRef<string | number | undefined>()
    const [isTimerActive, setTimerActive] = useState<boolean>(false)
    const [warningToastCountdown, setWarningToastCountdown] = useState<number>(5)

    const handleChatClear = () => {
        setTimerActive(true)
        decreaseCountdownInToast()
        const previousChat = queryClient.getQueryData<ChatModel>("chat")
        if (previousChat) {
            previousChat.messages = []
            queryClient.setQueriesData<ChatModel>("chat", previousChat)
        }
    }

    const handleCancel = () => {
        clearIntervalAndToast()
        queryClient.invalidateQueries("chat")
    }

    const warningToastOptions: UseToastOptions = {
        title: "Очистка чата",
        status: "warning",
        position: "bottom-right",
        isClosable: false,
        duration: 8000,
        description: (
            <Flex direction="column">
              Вы решили удалить все сообщения из чата
                <Button
                    onClick={handleCancel}
                    alignSelf="flex-end"
                    style={{
                        marginLeft: 150
                    }}
                    type="button"
                    variant="link"
                    colorScheme="black"
                >
                    {warningToastCountdown} Отменить
                </Button>
            </Flex>
        )
    }

    const showSuccefullToast = () => {
        toast({
            title: "Чат успешно очищен",
            description: "Все сообщения из чата удалены",
            status: "success",
            position: "bottom-right",
            isClosable: true
        })
    }

    const showWarningToast = () => {
        if (toastIdRef.current) {
            toast.update(toastIdRef.current, warningToastOptions)
        }
        else toastIdRef.current = toast(warningToastOptions)
    }

    const clearIntervalAndToast = () => {
        setTimerActive(false)
        toast.close(toastIdRef.current!)
        toastIdRef.current = undefined
        setWarningToastCountdown(5)
    }

    const decreaseCountdownInToast = () => {
        setWarningToastCountdown((countdown) => countdown - 1)
        showWarningToast()
    }

    useEffect(() => {
        if (isTimerActive)
            if (warningToastCountdown < 0) {
                clearIntervalAndToast()
                showSuccefullToast()
                clearMessagesMutation.mutate(chatID!)
            } else {
                const interval = setInterval(decreaseCountdownInToast, 1000)
                return () => clearInterval(interval)
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [warningToastCountdown, isTimerActive])

    return (
        <Button
            // variant="solid"
            variant="outline"
            colorScheme="red"
            onClick={handleChatClear}
        >
            <Text fontSize="sm">
                Очистить чат
            </Text>
        </Button>
    ) 
}