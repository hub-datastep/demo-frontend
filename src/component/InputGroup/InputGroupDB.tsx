import {
    Button,
    Flex,
    Grid,
    GridItem,
    HStack,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
    Textarea,
    VStack
} from "@chakra-ui/react"
import { getTenantTables } from "api/promptApi"
import AskQueryButton from "component/InputGroup/AskQueryButton"
import InputGroupContext from "component/InputGroup/context"
import { IInputGroupContext, IInputGroupDB } from "component/InputGroup/types"
import { FavoriteMessageContext, IFavoriteMessageContext } from "context/favoriteMessageContext"
import { UserContext } from "context/userContext"
import { ChangeEvent, FC, KeyboardEvent, useContext, useEffect, useState } from "react"
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

    const isSubmitBtnDisable = query.trim() === ""

    const handleTableSelectChange = (table: string) => {
        setTable(table)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
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
        <Flex direction="column" gap="5">
            {similarQueries.length > 0 && (
                <Grid
                    h='200px'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(2, 1fr)'
                    gap={4}
                >
                    {similarQueries.map((query: string) => (
                        <GridItem>
                            <AskQueryButton query={query} limit={limit} />
                        </GridItem>
                    ))}
                </Grid>
            )}

            <HStack alignItems="flex-start">
                <Textarea
                    colorScheme="purple"
                    height="full"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ваш вопрос.."
                    disabled={isTextAreaDisable}
                />
                <VStack alignItems="flex-start">
                    <Button
                        width="full"
                        colorScheme="purple"
                        onClick={handleSubmitClick}
                        isLoading={isSubmitButtonLoading}
                        isDisabled={isSubmitBtnDisable}
                    >
                        Отправить
                    </Button>
                    <Menu>
                        <MenuButton 
                            width="full"
                            isLoading={isTablesLoading} 
                            as={Button}
                            variant="outline"
                        >
                            <Text>
                                {table || "Выберите таблицу"}
                            </Text>
                        </MenuButton>
                        <MenuList>
                            <MenuGroup>
                                {tables?.map((table, key) => (
                                    <MenuItem
                                        key={key}
                                        onClick={() => handleTableSelectChange(table)}
                                    >
                                        {table}
                                    </MenuItem>
                                ))}
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </VStack>
            </HStack>
            {errorMessage && <Text color="red">{errorMessage}</Text>}

            <HStack gap="55">
                {/* <Button onClick={handleIgnoreNullButtonClick}>Не учитывать NULL</Button>
                <Box>
                    <Text>Максимальное количество строк в ответе</Text>
                    <Input name="limit" type="number" value={limit} onChange={handleLimitChange} />
                </Box> */}
            </HStack>
        </Flex>
    )
}

export default InputGroupDB