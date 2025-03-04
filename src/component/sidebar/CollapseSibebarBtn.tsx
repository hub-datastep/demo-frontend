import { Button, Flex, IconButton } from "@chakra-ui/react"
import { useSidebarContext } from "context/sidebarContext"
import { FC } from "react"
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"

export const CollapseSibebarBtn: FC = () => {
  const { isCollapsed, toggleCollapsed } = useSidebarContext()

  if (isCollapsed) {
    return (
      <Flex w="full" direction="column">
        <IconButton
          aria-label="collapsed-sidebar-btn"
          bgColor="purple.300"
          w="full"
          variant="solid"
          colorScheme="purple"
          borderRadius={0}
          icon={<FaAngleDoubleRight />}
          onClick={toggleCollapsed}
        />
      </Flex>
    )
  }

  return (
    <Flex w="full" direction="column">
      <Button
        bgColor="purple.300"
        w="full"
        variant="solid"
        colorScheme="purple"
        borderRadius={0}
        leftIcon={<FaAngleDoubleLeft />}
        onClick={toggleCollapsed}
      >
        Скрыть панель
      </Button>
    </Flex>
  )
}
