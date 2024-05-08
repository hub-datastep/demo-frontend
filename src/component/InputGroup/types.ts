import { FileModel } from "model/FileModel"
import { Dispatch, SetStateAction } from "react"

interface IInputGroupDB {
    table?: string,
    setTable: Dispatch<SetStateAction<string | undefined>>
    isLoading: boolean
    errorMessage: string | undefined
}

interface IInputGroupDocs {
    filesList: FileModel[]
    isLoading: boolean
    errorMessage: string | undefined
    currentFileIndex: number
    setCurrentFileIndex: Dispatch<SetStateAction<number>>
}

interface IInputGroupContext {
    handleSubmit: (query: string, limit?: number) => void
    similarQueries: string[]
}

export type {
    IInputGroupContext, IInputGroupDB,
    IInputGroupDocs
}
