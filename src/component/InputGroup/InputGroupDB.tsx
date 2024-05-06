import {
    Flex,
    Grid,
    GridItem,
    HStack,
    IconButton,
    Text,
    Textarea,
    VStack
} from "@chakra-ui/react"
import { getTenantTables } from "api/promptApi"
import { ClearChatButton } from "component/ClearChatButton"
import AskQueryButton from "component/InputGroup/AskQueryButton"
import InputGroupContext from "component/InputGroup/context"
import { IInputGroupContext, IInputGroupDB } from "component/InputGroup/types"
import { QueryTableSelect } from "component/QueryTableSelect"
import { FavoriteMessageContext, IFavoriteMessageContext } from "context/favoriteMessageContext"
import { UserContext } from "context/userContext"
import { ChangeEvent, FC, KeyboardEvent, useContext, useEffect, useState } from "react"
import { IoMdArrowRoundUp } from "react-icons/io"
import { useQuery } from "react-query"

const InputGroupDB: FC<IInputGroupDB> = ({
    table,
    setTable,
    isLoading,
    errorMessage,
}) => {
    const [limit, setLimit] = useState<number>(100)
    const [query, setQuery] = useState<string>("")
    const { handleSubmit, similarQueries } = useContext<IInputGroupContext>(InputGroupContext)
    const { selectedFavoriteQuery } = useContext<IFavoriteMessageContext>(FavoriteMessageContext)
    const user = useContext(UserContext)
    const { data: tables, status: queryTablesStatus } = useQuery<string[]>(
        "tables", 
        () => getTenantTables(user.tenants[0].id)
    )

    const isTablesLoading = queryTablesStatus !== "success"

    const isTextAreaDisable = isLoading
    const isSubmitButtonLoading = isLoading
    const isSubmitBtnDisabled = query.trim() === "" || !table

    const handleTableSelectChange = (table: string) => {
        setTable(table)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !isSubmitBtnDisabled) {
            handleSubmit(query, limit)
            setQuery("")
        }
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setQuery(event.target.value)
    }

    const handleSubmitClick = () => {
        handleSubmit(query, limit)
        setQuery("")
    }

    useEffect(() => {
        setQuery(selectedFavoriteQuery)
    },[selectedFavoriteQuery])

    return (
        <Flex direction="column" gap="5" justifySelf="flex-end" pb={10}>
            {similarQueries.length > 0 && (
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
            )}

            <HStack alignItems="flex-start">
                <VStack width="full" alignItems="flex-start">
                    <HStack>
                        <ClearChatButton />

                        <QueryTableSelect
                            tables={tables}
                            table={table}
                            isTablesLoading={isTablesLoading}
                            handleTableSelectChange={handleTableSelectChange}
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
                            disabled={isTextAreaDisable}
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

            {/* <HStack gap="55">
                <Button onClick={handleIgnoreNullButtonClick}>Не учитывать NULL</Button>
                <Box>
                    <Text>Максимальное количество строк в ответе</Text>
                    <Input name="limit" type="number" value={limit} onChange={handleLimitChange} />
                </Box>
            </HStack> */}
        </Flex>
    )
}

export default InputGroupDB