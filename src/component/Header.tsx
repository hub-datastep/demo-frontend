import {
    Button,
    HStack
} from "@chakra-ui/react"
import Logo from "component/Logo"
import { AuthContext, IAuthContext } from "context/authContext"
import { useContext } from "react"
import { useQueryClient } from "react-query"

const Header = () => {
    const queryClient = useQueryClient()
    const { signOut } = useContext<IAuthContext>(AuthContext)

    const handleSignOut = () => {
        signOut()
        queryClient.clear()
    }

    return (
        <HStack 
            backgroundColor="purple.300"
            w="100%"
            justify="space-around"
            p={2}
            position="fixed"
            zIndex={100}
        >
            <Logo />

            <Button
                variant="solid"
                colorScheme="purple"
                onClick={handleSignOut}
            >
                    Выйти
            </Button>
        </HStack>
    )
}

export default Header
