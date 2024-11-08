import { Flex } from "@chakra-ui/react"
import Logo from "component/Logo"
import { SidebarItemsList } from "component/sidebar/SidebarItemsList"
import { SignOutBtn } from "component/sidebar/SignOutBtn"

export const Sidebar = () => {
  return (
    <Flex
      h="full"
      minW="max-content"
      bgColor="purple.300"
      direction="column"
      justifyContent="space-between"
      px={2}
      py={5}
    >
      <Flex direction="column" gap={5}>
        <Logo />

        {/* Sidebar Items Routes */}
        <SidebarItemsList />
      </Flex>

      <SignOutBtn />
    </Flex>
  )
}
