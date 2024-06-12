export interface MappingResponse {
  row_number: number
  nomenclature: string
  group: string
  nomenclature_params: object[]
  mappings?: MappingResponseItem[] | null
  similar_mappings?: MappingResponseItem[] | null
}

export interface MappingResponseItem {
  nomenclature_guid: string
  nomenclature: string
  similarity_score: number
}

export interface MappingModel {
  nomenclatures: MappingNomenclatureItem[]
  most_similar_count: number
  job_size: number
  chroma_collection_name: string
}

export interface MappingNomenclatureItem {
  row_number: number
  nomenclature: string
}

export interface MappingNomenclatureBody {
  chroma_collection_name: string
  model_id: string
  most_similar_count: number
  chunk_size: number
  nomenclatures: MappingNomenclatureItem[]
}

export interface NomenclaturesMapping {
  job_id: string
  ready_count: number
  total_count: number
  general_status: string
  nomenclatures: MappingResponse[] | null
}
