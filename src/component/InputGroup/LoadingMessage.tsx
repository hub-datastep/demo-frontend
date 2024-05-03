import { HStack, Spinner } from "@chakra-ui/react"

const LoadingMessage = () => {

    return (
        <HStack px={20}>
            <Spinner color="purple" />
        </HStack>

    )
}

export default LoadingMessage
