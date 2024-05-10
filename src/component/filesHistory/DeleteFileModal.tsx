import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react"
import { IDeleteFileModal } from "component/filesHistory/types"
import { FC } from "react"

const DeleteFileModal: FC<IDeleteFileModal> = (props) => {
    const { isOpenModal, onCloseModal, onConfirm } = props

    return (
        <Modal isCentered isOpen={isOpenModal} onClose={onCloseModal}>
            <ModalOverlay
                bg="blackAlpha.300"
                backdropFilter="blur(10px)"
            />
        
            <ModalContent>
                <ModalHeader>Удаление документа</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    Вы решили удалить этот документ?
                </ModalBody>

                <ModalFooter>
                    <Flex gap={5}>
                        <Button
                            variant="outline"
                            colorScheme="red"
                            onClick={onConfirm}
                        >
                            Да
                        </Button>

                        <Button
                            variant="outline"
                            colorScheme="blue"
                            onClick={onCloseModal}
                        >
                            Нет
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteFileModal