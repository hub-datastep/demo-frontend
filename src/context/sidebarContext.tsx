import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"
import { FCC } from "type/fcc"

interface SidebarContextProps {
  isCollapsed: boolean
  setIsCollapsed: Dispatch<SetStateAction<boolean>>
  toggleCollapsed: () => void
}

const LOCAL_STORAGE_KEY = "isSidebarCollapsed"

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const SidebarContextProvider: FCC = (props) => {
  const { children } = props

  const prevIsCollapsed = localStorage.getItem(LOCAL_STORAGE_KEY) === "true"

  const [isCollapsed, setIsCollapsed] = useState<boolean>(prevIsCollapsed || false)

  const toggleCollapsed = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed)
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, String(isCollapsed))
  }, [isCollapsed])

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        toggleCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebarContext must be used in SidebarContextProvider")
  }

  return context
}
