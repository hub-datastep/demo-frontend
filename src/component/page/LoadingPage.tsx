import { Flex, Spinner } from "@chakra-ui/react"
import { FC } from "react"

export const LoadingPage: FC = () => {
  return (
    <Flex h="full" w="full" justifyContent="center" alignItems="center">
      <Spinner color="purple.400" size="lg" />
    </Flex>
  )
}
