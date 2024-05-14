import { signIn as signInReq } from "api/authApi"
import Auth from "component/Auth"
import { TokenModel } from "model/TokenModel"
import { FC, ReactNode, createContext, useState } from "react"
import Cookies from "universal-cookie"

interface IAuthContext {
  signIn: (email: string, password: string) => void
  signOut: () => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

interface AuthContextProviderProps {
  children: ReactNode
}

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const cookies = new Cookies()
  const [token, setToken] = useState<TokenModel | undefined>(cookies.get("token"))

  const signIn = async (email: string, password: string) => {
    const reqToken = await signInReq(email, password)
    cookies.set("token", reqToken)
    setToken(reqToken)
  }

  const signOut = () => {
    cookies.remove("token")
    setToken(undefined)
  }

  if (!token) {
    return <Auth signIn={signIn} />
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }

export type { IAuthContext }
