import { Flex } from "@chakra-ui/react"
import Logo from "component/Logo"
import { SignOutBtn } from "component/header/SignOutBtn"

const Header = () => {
  return (
    <Flex
      backgroundColor="purple.300"
      direction="column"
      justify="space-between"
      h="100vh"
      w="16%"
      px={2}
      py={5}
    >
      <Logo />

      <SignOutBtn />
    </Flex>
  )
}

export default Header
