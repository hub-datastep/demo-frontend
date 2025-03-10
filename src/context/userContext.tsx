import { Flex, Spinner } from "@chakra-ui/react"
import { clearUserToken } from "api/axiosClient"
import { getCurrentUser } from "api/userApi"
import { UserModel } from "model/UserModel"
import { FC, ReactNode, createContext } from "react"
import { useQuery } from "react-query"

const UserContext = createContext<UserModel>({} as UserModel)

interface UserContextProviderProps {
  children: ReactNode
}

const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const { data: user, isSuccess } = useQuery<UserModel>("user", getCurrentUser, {
    onError: (error) => {
      clearUserToken()
      // @ts-ignore
      if (error.response?.status === 404) {
        throw Error("User is not found or user is not under any tenant.")
      }
    },
    cacheTime: 0,
    retry: false,
  })

  if (!user || !isSuccess) {
    return (
      <Flex h="full" w="full" justifyContent="center" alignItems="center">
        <Spinner color="purple" />
      </Flex>
    )
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export { UserContext, UserContextProvider }
