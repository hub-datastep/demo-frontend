import { Flex } from "@chakra-ui/react"
import { FCC } from "type/fcc"

interface PageProps {}

export const Page: FCC<PageProps> = (props) => {
  const { children } = props

  return (
    <Flex
      h="full"
      w="full"
      direction="column"
      py={5}
      px={5}
      pb={10}
      overflowY="auto"
      overflowX="hidden"
      gap={10}
    >
      {children}
    </Flex>
  )
}
