import { Button, Text } from "@chakra-ui/react"
import { MouseEvent } from "react"

interface IAskQueryButton {
    query: string
    setQuery: (query: string) => void
}

const AskQueryButton = ({ query, setQuery }: IAskQueryButton) => {
    const handleClick = (_: MouseEvent<HTMLButtonElement>) => {
        setQuery(query)
    }

    return (
        <Button
            w="full"
            h="full"
            py={2}
            justifyContent="flex-start"
            alignItems="flex-start"
            textAlign="left"
            whiteSpace="initial"
            onClick={handleClick}
        >
            <Text fontSize="sm">
                {query}
            </Text>
        </Button>
    )
}

export default AskQueryButton