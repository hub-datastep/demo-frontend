import {
    Button,
    Flex,
    Grid,
    HStack,
    Text,
    Textarea,
    VStack
} from "@chakra-ui/react"
import InputGroupContext from "component/InputGroup/context"
import { IInputGroupContext, IInputGroupDocs } from "component/InputGroup/types"
import { FavoriteMessageContext, IFavoriteMessageContext } from "context/favoriteMessageContext"
import { ChangeEvent, FC, KeyboardEvent, useContext, useEffect, useState } from "react"

const InputGroupDocs: FC<IInputGroupDocs> = ({
    isLoading,
    errorMessage,
    openSourcesHistory,
    currentFileIndex
}) => {
    const [query, setQuery] = useState<string>("")
    const { handleSubmit } = useContext<IInputGroupContext>(InputGroupContext)
    const { selectedFavoriteQuery } = useContext<IFavoriteMessageContext>(FavoriteMessageContext)

    const isTextAreaDisable = () => {
        if (currentFileIndex < 0) {
            return true
        }
    }

    const isSubmitBtnDisable = () => {
        return query.trim() === ""
    }

    const isSubmitButtonLoading = () => {
        return isLoading
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
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

    useEffect(() => {
        setQuery(selectedFavoriteQuery)
    },[selectedFavoriteQuery])

    return (
        <Flex direction="column" gap="5">
            <Grid
                h='200px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(2, 1fr)'
                gap={4}
            >
                {/* {similarQueries && similarQueries.map((query: string) => (
                    <GridItem>
                        <AskQueryButton query={query} limit={limit} />
                    </GridItem>
                ))} */}
            </Grid>

            <HStack alignItems="flex-start">
                <Textarea
                    height="full"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ваш вопрос.."
                    disabled={isTextAreaDisable()}
                />
                <VStack alignItems="flex-start">
                    <Button
                        width="full"
                        colorScheme="blue"
                        onClick={handleSubmitClick}
                        isLoading={isSubmitButtonLoading()}
                        isDisabled={isSubmitBtnDisable()}
                    >
                        Отправить
                    </Button>

                    <Button
                        aria-label="open files history"
                        onClick={openSourcesHistory}
                        children="Документы"
                    />
                </VStack>
            </HStack>
            {errorMessage && <Text color="red">{errorMessage}</Text>}
        </Flex>
    )
}

export default InputGroupDocs