interface QueryModel {
  chat_id: number
  query: string
  tables?: string[]
  limit?: number
  file_id?: number
}

export default QueryModel
