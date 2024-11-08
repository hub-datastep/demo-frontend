import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Text,
} from "@chakra-ui/react"
import { SidebarItemBtn } from "component/sidebar/SidebarItemBtn"
import { Route } from "configuration"
import { FC } from "react"

interface SidebarItemProps {
  route: Route
}

export const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { route } = props

  const isHasSubRoutes = !!route.subRoutes && route.subRoutes.length > 0

  if (!isHasSubRoutes) {
    return <SidebarItemBtn route={route} />
  }

  return (
    <AccordionItem border="none" mb={2}>
      <AccordionButton
        as={Button}
        bgColor="whiteAlpha.300"
        variant="solid"
        colorScheme="purple"
        display="flex"
        justifyContent="space-between"
        whiteSpace="break-spaces"
      >
        <Text>{route.title}</Text>

        <AccordionIcon />
      </AccordionButton>

      {/* Sub Routes */}
      <AccordionPanel>
        {route.subRoutes?.map((subRoute, index) => (
          <SidebarItemBtn key={index} route={subRoute} />
        ))}
      </AccordionPanel>
    </AccordionItem>
  )
}
