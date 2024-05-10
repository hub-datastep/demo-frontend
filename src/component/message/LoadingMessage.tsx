import { Flex, Spinner } from "@chakra-ui/react"
import { FC } from "react"

export const LoadingMessage: FC = () => {
  return (
    // <Message direction="incoming" messageId={-1} src="/image/avatar/bot.svg" callback={false}>
    //   <HStack px={20}>
    //     <Spinner color="purple" />
    //   </HStack>
    // </Message>
    <Flex alignSelf="center" justifySelf="center">
      <Spinner color="purple" />
    </Flex>
  )
}
