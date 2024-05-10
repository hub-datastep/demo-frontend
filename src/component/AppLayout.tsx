import { Flex } from "@chakra-ui/react"
import Header from "component/header/Header"
import { FC } from "react"
import { Outlet } from "react-router-dom"

export const AppLayout: FC = () => {
  return (
    <Flex direction="row" maxH="100vh" maxW="100vw">
      <Header />

      <Outlet />
    </Flex>
  )
}
