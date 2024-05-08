import {
    Flex,
    HStack,
    IconButton,
    Text,
    Textarea,
    VStack
} from "@chakra-ui/react"
import { ClearChatButton } from "component/ClearChatButton"
import InputGroupContext from "component/InputGroup/context"
import { IInputGroupContext, IInputGroupDocs } from "component/InputGroup/types"
import { QueryFileSelect } from "component/QueryFileSelect"
import { ChangeEvent, FC, KeyboardEvent, useContext, useState } from "react"
import { IoMdArrowRoundUp } from "react-icons/io"

const InputGroupDocs: FC<IInputGroupDocs> = (props) => {
    const {
        filesList,
        isLoading,
        errorMessage,
        currentFileIndex,
        setCurrentFileIndex,
    } = props

    const [query, setQuery] = useState<string>("")
    const { handleSubmit } = useContext<IInputGroupContext>(InputGroupContext)

    const isTextAreaDisabled = currentFileIndex < 0
    const isSubmitButtonLoading = isLoading
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
        <Flex direction="column" gap="5" justifySelf="flex-end" pb={10}>
            {/* {similarQueries.length > 0 && (
                <Grid
                    templateRows="repeat(2, 1fr)"
                    templateColumns="repeat(2, 1fr)"
                    gap={2}
                >
                    {similarQueries.map((query: string) => (
                        <GridItem>
                            <AskQueryButton query={query} setQuery={setQuery} />
                        </GridItem>
                    ))}
                </Grid>
            )} */}

            <HStack alignItems="flex-start">
                <VStack width="full" alignItems="flex-start">
                    <HStack>
                        <ClearChatButton />

                        <QueryFileSelect
                            filesList={filesList}
                            currentFileIndex={currentFileIndex}
                            setCurrentFileIndex={setCurrentFileIndex}
                        />
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
                            disabled={isTextAreaDisabled}
                            variant="solid"
                            resize="none"
                            overflowY="hidden"
                        />
                        <IconButton
                            aria-label="Send query"
                            icon={<IoMdArrowRoundUp size={20} />}
                            colorScheme="purple"
                            variant="solid"
                            onClick={handleSubmitClick}
                            isLoading={isSubmitButtonLoading}
                            isDisabled={isSubmitBtnDisabled}
                            position="absolute"
                            top={2}
                            right={2}
                            zIndex={100}
                        />
                    </Flex>
                </VStack>
            </HStack>

            {errorMessage && (
                <Text color="red">{errorMessage}</Text>
            )}
        </Flex>
    )
}

export default InputGroupDocs
