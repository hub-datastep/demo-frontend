export type SimilarNomenclatureSearch = {
  name: string
  group?: string
  is_group?: boolean
  limit?: number
  offset?: number
}

export type SimilarNomenclature = {
  name: string
  group?: string
  material_code: string
}
