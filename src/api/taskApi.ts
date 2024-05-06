import axiosClient from "api/axiosClient"
import { FileUploadTaskModel } from "model/FileUploadTaskModel"

const interruptTaskById = async (taskId: number): Promise<FileUploadTaskModel[]> => {
    const { data: fileUploadTasks } = await axiosClient.delete(`/task/file_upload/${taskId}`)
    return fileUploadTasks
}

export {
    interruptTaskById
}
