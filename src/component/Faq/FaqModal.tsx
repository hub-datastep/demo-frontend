import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react"
import { getInstruction } from "api/instructionApi"
import NotionPage from "component/Faq/NotionPage"
import { UserContext } from "context/userContext"
import { useContext } from "react"
import { FaQuestion } from "react-icons/fa6"
import { BlockMapType } from "react-notion"
import { useQuery } from "react-query"

export function FaqModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useContext(UserContext)

  const { data: blockMap } = useQuery<BlockMapType>("getInstruction", () =>
    getInstruction(user.tenant.id)
  )

  return (
    <>
      <IconButton
        aria-label="question-button"
        icon={<FaQuestion color="black" />}
        isRound={true}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>{blockMap ? <NotionPage blockMap={blockMap} /> : <Spinner />}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
