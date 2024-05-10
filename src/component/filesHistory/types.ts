import { FileModel } from "model/FileModel"
import { FileUploadTaskModel } from "model/FileUploadTaskModel"
import { Dispatch, SetStateAction } from "react"

interface IDeleteFileModal {
    isOpenModal: boolean
    onCloseModal: () => void
    onConfirm: () => void
}

interface IFileRow {
    fileIndex: number
    file: FileModel
    currentFileIndex: number
    setCurrentFileIndex: Dispatch<SetStateAction<number>>
}

interface IFileUploadingProgress {
    task: FileUploadTaskModel
}

export type {
    IDeleteFileModal,
    IFileRow,
    IFileUploadingProgress
}
