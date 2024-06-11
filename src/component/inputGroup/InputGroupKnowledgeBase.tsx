import { Flex, HStack, IconButton, Text, Textarea, VStack } from "@chakra-ui/react"
import { ClearChatButton } from "component/chat/ClearChatButton"
import InputGroupContext from "component/inputGroup/context"
import { IInputGroupContext, IInputGroupKnowledgeBase } from "component/inputGroup/types"
import { ChangeEvent, FC, KeyboardEvent, useContext, useState } from "react"
import { IoMdArrowRoundUp } from "react-icons/io"
import { QueryFileDowload } from "component/inputGroup/QueryFileDownload"

const InputGroupKnowledgeBase: FC<IInputGroupKnowledgeBase> = (props) => {
  const { isLoading, errorMessage, chatId, filesList } = props

  const [query, setQuery] = useState<string>("")
  const { handleSubmit } = useContext<IInputGroupContext>(InputGroupContext)

  const isTextAreaDisabled = isLoading
  const isSubmitBtnDisabled = query.trim() === ""

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isSubmitBtnDisabled) {
      e.preventDefault()
      handleSubmit(query)
      setQuery("")
    }
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value)
  }

  const handleSubmitClick = () => {
    handleSubmit(query)
    setQuery("")
  }

  return (
    <Flex backgroundColor="white" w="full" direction="column" justifySelf="flex-end" gap={5} p={5}>
      <HStack alignItems="flex-start">
        <VStack width="full" alignItems="flex-start">
          <HStack>
            <ClearChatButton isLoading={isLoading} chatId={chatId} />
            <QueryFileDowload filesList={filesList} isLoading={isLoading} />
          </HStack>

          <Flex width="full" position="relative">
            <Textarea
              backgroundColor="gray.100"
              height="full"
              width="full"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Ваш вопрос.."
              isDisabled={isTextAreaDisabled || isLoading}
              variant="solid"
              resize="none"
              overflowY="hidden"
              pr={16}
            />
            <IconButton
              aria-label="Send query"
              icon={<IoMdArrowRoundUp size={20} />}
              colorScheme="purple"
              variant="solid"
              onClick={handleSubmitClick}
              isLoading={isLoading}
              isDisabled={isSubmitBtnDisabled}
              position="absolute"
              top={2}
              right={2}
              zIndex={100}
            />
          </Flex>
        </VStack>
      </HStack>

      {errorMessage && <Text color="red">{errorMessage}</Text>}
    </Flex>
  )
}

export default InputGroupKnowledgeBase
