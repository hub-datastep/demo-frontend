import { Accordion } from "@chakra-ui/react"
import { SidebarItem } from "component/sidebar/SidebarItem"
import { configuration } from "configuration"
import { FC } from "react"

const routes = configuration.sidebar.routes

export const SidebarItemsList: FC = () => {
  return (
    <Accordion allowMultiple>
      {routes.map((route, index) => (
        <SidebarItem key={index} route={route} />
      ))}
    </Accordion>
  )
}
