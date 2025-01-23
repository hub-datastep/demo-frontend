import axiosClient from "api/axiosClient"
import {
  MappingResult,
  MappingResultsUpload,
  MappingResultUpdate,
} from "type/mapping/result"
import { WithId } from "type/withId"

export const updateMappingResultsList = async (
  body: MappingResultUpdate,
): Promise<WithId<MappingResult>[]> => {
  const { data: iteration } = await axiosClient.put(
    "/mapping/result/correct_nomenclature",
    body,
  )
  return iteration
}

export const uploadMappingResultsToKafka = async (body: MappingResultsUpload) => {
  await axiosClient.put("/mapping/result/upload/kafka", body)
}
