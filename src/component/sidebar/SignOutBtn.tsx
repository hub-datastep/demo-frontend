import { Button } from "@chakra-ui/react"
import { AuthContext, IAuthContext } from "context/authContext"
import { FC, useContext } from "react"
import { useQueryClient } from "react-query"

export const SignOutBtn: FC = () => {
  const queryClient = useQueryClient()
  const { signOut } = useContext<IAuthContext>(AuthContext)

  const handleSignOut = () => {
    signOut()
    queryClient.clear()
  }

  return (
    <Button variant="solid" colorScheme="purple" onClick={handleSignOut}>
      Выйти
    </Button>
  )
}
