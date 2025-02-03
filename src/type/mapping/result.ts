import { MappingResponse } from "model/ClassifierModel"
import { SimilarNomenclature } from "type/mapping/similarNomenclature"
import { WithId } from "type/withId"

export type MappingResult = {
  iteration_id: string
  user_id?: number
  result?: MappingResponse
  corrected_nomenclature?: WithId<SimilarNomenclature>
}

export type CorrectedResult = {
  result_id: number
  nomenclature?: WithId<SimilarNomenclature>
}

export type MappingResultUpdate = {
  iteration_id: string
  corrected_results_list: CorrectedResult[]
}

export type MappingResultsUpload = {
  iteration_id: string
}
