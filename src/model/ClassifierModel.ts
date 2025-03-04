export interface MappingResponse {
  row_number: number
  nomenclature: string
  group: string
  group_code: string
  nomenclature_params: object[]
  mappings?: MappingResponseItem[]
  similar_mappings?: MappingResponseItem[]
}

export interface MappingResponseItem {
  nomenclature_guid: string
  nomenclature: string
  similarity_score: number
  material_code: string
  group: string
  group_code: string
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
  nomenclatures: MappingNomenclatureItem[]
  most_similar_count?: number
  chunk_size?: number
}

export interface NomenclaturesMapping {
  job_id: string
  ready_count: number
  total_count: number
  general_status: string
  nomenclatures: MappingResponse[] | null
}

export interface MappingResult {
  id: number
  user_id: number
  mapping_result: MappingResponse | null
  mapping_nomenclature_corrected: string | null
  iteration_key?: string
  created_at?: string
}

export interface MappingResultUpdate {
  id: number
  mapping_nomenclature_corrected: string
}

export interface FormattedNomenclature {
  id: number
  name: string
}
