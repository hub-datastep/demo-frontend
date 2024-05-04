import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { FC } from "react"

interface ClearChatModalProps {
    isOpen: boolean,
    onCancel: () => void,
    onConfirm: () => void,
}

export const ClearChatModal: FC<ClearChatModalProps> = (props) => {
    const { isOpen, onCancel, onConfirm } = props

    return (
        <Modal isCentered isOpen={isOpen} onClose={onCancel}>
            <ModalOverlay
                bg="blackAlpha.300"
                backdropFilter="blur(10px)"
            />

            <ModalContent>
                <ModalHeader>Очистка чата</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Text>Вы решили удалить все сообщения из чата?</Text>
                </ModalBody>

                <ModalFooter>
                    <Flex gap={5}>
                        <Button 
                            colorScheme="red"
                            variant="outline"
                            onClick={onConfirm}
                        >
                            Да
                        </Button>
                        
                        <Button
                            colorScheme="blue"
                            variant="outline"
                            onClick={onCancel}
                        >
                            Нет
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}