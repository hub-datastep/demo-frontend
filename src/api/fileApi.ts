import axiosClient from "api/axiosClient"
import { DataExtractModel, FileModel, FileUploadModel } from "model/FileModel"

const getAllFiles = (): Promise<FileModel[]> => {
  return axiosClient.get("/file").then((response) => response.data)
}

const uploadFile = (body: FileUploadModel): Promise<FileModel> => {
  return axiosClient
    .postForm(
      "/file",
      { file_object: body.file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => response.data)
}

const extractDataFromInvoice = (body: FileUploadModel): Promise<DataExtractModel[]> => {
  return axiosClient
    .postForm("/file/extract_data", { file_object: body.file })
    .then((response) => response.data)
}

const removeFile = (file_id: number) => {
  return axiosClient.delete(`/file/${file_id}`)
}

export { getAllFiles, removeFile, uploadFile, extractDataFromInvoice }
