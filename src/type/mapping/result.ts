import { MappingResponse } from "model/ClassifierModel"
import { SimilarNomenclature } from "type/mapping/similarNomenclature"

export type MappingResult = {
  iteration_id: string
  user_id?: number
  result?: MappingResponse
  corrected_nomenclature: object
}

export type CorrectedResult = {
  result_id: number
  nomenclature: SimilarNomenclature
}

export type MappingResultUpdate = {
  iteration_id: string
  corrected_results_list: CorrectedResult[]
}
