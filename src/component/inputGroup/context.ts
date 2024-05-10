import { createContext } from "react"
import { IInputGroupContext } from "component/inputGroup/types"

const InputGroupContext =
    createContext<IInputGroupContext>({} as IInputGroupContext)

export default InputGroupContext
