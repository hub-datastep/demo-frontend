import axiosClient from "api/axiosClient"
import { DataExtractModel, FileModel, FileUploadModel } from "model/FileModel"

const getAllFiles = (): Promise<FileModel[]> => {
  return axiosClient.get("/file").then((response) => response.data)
}

const uploadFile = (body: FileUploadModel): Promise<FileModel> => {
  return axiosClient
    .postForm(`/file?is_knowledge_base=${body.is_knowledge_base}`, {
      file_object: body.file_object,
    })
    .then((response) => response.data)
}

const extractDataFromInvoice = (
  body: Omit<FileUploadModel, "is_knowledge_base">
): Promise<DataExtractModel[]> => {
  return axiosClient.postForm("/file/extract_data", body).then((response) => response.data)
}

const removeFile = (file_id: number) => {
  return axiosClient.delete(`/file/${file_id}`)
}

export { getAllFiles, removeFile, uploadFile, extractDataFromInvoice }
