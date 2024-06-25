interface FileModel {
  id: number
  tenant_id: number
  original_filename: string
  storage_filename: string
  file_path: string
}

interface DataExtractModel {
    nomenclature: string,
    file_metadata?: {[key: string]: string} | null
}

interface FileUploadModel {
  file_object: File
  is_knowledge_base: boolean
}

export type { FileModel, FileUploadModel, DataExtractModel }
