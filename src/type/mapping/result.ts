import { MappingResponse } from "model/ClassifierModel"

export type MappingResult = {
  iteration_id: string
  user_id?: number
  result?: MappingResponse
  corrected_nomenclature: object
}
