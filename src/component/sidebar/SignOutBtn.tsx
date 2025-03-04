import { Flex, Text } from "@chakra-ui/react"
import { AuthContext, IAuthContext } from "context/authContext"
import { FC, useContext } from "react"
import { FaSignOutAlt } from "react-icons/fa"
import { useQueryClient } from "react-query"

export const SignOutBtn: FC = () => {
  const queryClient = useQueryClient()

  const { signOut } = useContext<IAuthContext>(AuthContext)

  const handleSignOut = () => {
    signOut()
    queryClient.clear()
  }

  return (
    <Flex w="full" direction="row" alignItems="center" gap={2} onClick={handleSignOut}>
      <FaSignOutAlt />

      <Text fontWeight="medium">Выйти</Text>
    </Flex>
  )
}
