import { Dispatch, SetStateAction } from "react"

interface IInputGroupDB {
    table?: string,
    setTable: Dispatch<SetStateAction<string | undefined>>
    isLoading: boolean
    errorMessage: string | undefined
}

interface IInputGroupDocs {
    isLoading: boolean
    errorMessage: string | undefined
    openSourcesHistory: () => void
    currentFileIndex: number
}

interface IInputGroupContext {
    handleSubmit: (query: string, limit?: number) => void
    similarQueries: string[]
}

export type {
    IInputGroupDB,
    IInputGroupDocs,
    IInputGroupContext,
}
