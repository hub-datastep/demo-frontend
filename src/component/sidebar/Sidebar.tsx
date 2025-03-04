import { Flex } from "@chakra-ui/react"
import { Logo } from "component/Logo"
import { CollapseSibebarBtn } from "component/sidebar/CollapseSibebarBtn"
import { SidebarItemsList } from "component/sidebar/SidebarItemsList"
import { UserMenu } from "component/sidebar/UserMenu"
import { useSidebarContext } from "context/sidebarContext"

export const Sidebar = () => {
  const { isCollapsed } = useSidebarContext()

  if (isCollapsed) {
    return (
      <Flex
        h="full"
        w="3%"
        bgColor="purple.400"
        direction="column"
        justifyContent="space-between"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          px={2}
          py={3}
        >
          <Logo isIconOnly />
        </Flex>

        <Flex direction="column" gap={5}>
          <CollapseSibebarBtn />

          <UserMenu />
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex
      h="full"
      w="20%"
      bgColor="purple.400"
      direction="column"
      justifyContent="space-between"
    >
      <Flex w="full" direction="column" gap={5} px={3} py={5}>
        <Logo />

        {/* Sidebar Items Routes */}
        <SidebarItemsList />
      </Flex>

      <Flex w="full" direction="column" gap={5}>
        <CollapseSibebarBtn />

        <UserMenu />
      </Flex>
    </Flex>
  )
}
