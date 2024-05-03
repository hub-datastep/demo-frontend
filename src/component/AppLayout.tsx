import { Flex } from "@chakra-ui/react"
import Header from "component/Header"
import { FC } from "react"
import { Outlet } from "react-router-dom"

export const AppLayout: FC = () => {
    return (
        <Flex direction="column" flexGrow="1" h="100vh">
            <Header />

            <Outlet/>
        </Flex>
    )
}
