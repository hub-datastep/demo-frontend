import { Flex } from "@chakra-ui/react"
import Logo from "component/Logo"
import { AssistantLinkBtn } from "component/header/AssistantLinkBtn"
import { SignOutBtn } from "component/header/SignOutBtn"

const Header = () => {
  return (
    <Flex
      backgroundColor="purple.300"
      direction="column"
      justify="space-between"
      h="full"
      w="16%"
      px={2}
      py={5}
    >
      <Flex direction="column" gap={5}>
        <Logo />

        <AssistantLinkBtn title="Базы Данных" assistant="databases" />
        <AssistantLinkBtn title="Документы" assistant="documents" />
      </Flex>

      <SignOutBtn />
    </Flex>
  )
}

export default Header
