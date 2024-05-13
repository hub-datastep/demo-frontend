import { Flex } from "@chakra-ui/react"
import Header from "component/header/Header"
import { FC } from "react"
import { Outlet } from "react-router-dom"

export const AppLayout: FC = () => {
  return (
    <Flex direction="row" h="full">
      <Header />

      <Outlet />
    </Flex>
  )
}
