import { INITIAL_MESSAGE_COUNT } from "constant/chatMessages"
import { UserContext } from "context/userContext"
import { ModeT } from "model/UserModel"
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react"

interface ModeContextI {
  currentMode: ModeT
  setMode: Dispatch<SetStateAction<ModeT>>
  shownMessageCount: number
  setShownMessageCount: Dispatch<SetStateAction<number>>
  // chatID: number | undefined
  isFilesEnabled: boolean
  isDatabaseEnabled: boolean
}

const ModeContext = createContext<ModeContextI>({} as ModeContextI)

interface ModeContextProviderProps {
  children: ReactNode
}

const ModeContextProvider: FC<ModeContextProviderProps> = ({ children }) => {
  const user = useContext(UserContext)

  const tenantModes = user.tenant.modes

  const is_docs_mode =
    tenantModes.find((mode) => mode.name.toLowerCase() === ("DOCS" as ModeT)) !== undefined
  const is_databases_mode =
    tenantModes.find((mode) => mode.name.toLowerCase() === ("DB" as ModeT)) !== undefined

  const defaultMode = is_databases_mode ? "DB" : "DOCS"

  const [mode, setMode] = useState<ModeT>(defaultMode)
  const [shownMessageCount, setShownMessageCount] = useState<number>(INITIAL_MESSAGE_COUNT)
  // const { data: chat } = useQuery<ChatModel>("chat", () => {
  //     return getOrCreateChat(user.id)
  // })
  // const chatID = chat?.id

  const isFilesEnabled = is_docs_mode
  const isDatabaseEnabled = is_databases_mode

  return (
    <ModeContext.Provider
      value={{
        currentMode: mode,
        setMode,
        shownMessageCount,
        setShownMessageCount,
        // chatID,
        isFilesEnabled,
        isDatabaseEnabled,
      }}
    >
      {children}
    </ModeContext.Provider>
  )
}

export { ModeContext, ModeContextProvider }

export type { ModeContextI, ModeT }
