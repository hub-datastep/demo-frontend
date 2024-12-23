import axiosClient from "api/axiosClient"
import {
  MappingNomenclatureBody,
  MappingResult,
  MappingResultRequestBody,
  MappingResultUpdate,
  NomenclaturesMapping,
} from "model/ClassifierModel"
import { JobModel } from "model/JobModel"

export const startNomenclaturesMapping = (
  body: MappingNomenclatureBody
): Promise<JobModel> => {
  return axiosClient.post("/mapping", body).then((response) => response.data)
}

export const getNomenclaturesMappingResult = async (
  body: MappingResultRequestBody
): Promise<MappingResult[]> => {
  return axiosClient
    .get("/mapping/history", {
      params: {
        iteration_key: body.iteration_key,
      },
    })
    .then((response) => response.data)
}

export const getSimilarNomenclaturesByUserQuery = async (
  query: string
): Promise<string[]> => {
  return axiosClient
    .post("/mapping/similar_search", { query })
    .then((response) => response.data)
}

export const saveCorrectedNomenclature = async (body: MappingResultUpdate) => {
  return axiosClient.post("/mapping/history", body).then((response) => response.data)
}

export const getNomenclaturesMappings = async (
  jobId: string
): Promise<NomenclaturesMapping[]> => {
  return axiosClient.get(`/mapping/${jobId}`).then((response) => response.data)
}
