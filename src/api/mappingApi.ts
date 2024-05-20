import axiosClient from "api/axiosClient"
import { MappingNomenclatureBody, NomenclaturesMapping } from "model/ClassifierModel"
import { JobModel } from "model/JobModel"

export const startNomenclaturesMapping = (body: MappingNomenclatureBody): Promise<JobModel> => {
  return axiosClient
    .post(`/nomenclature/mapping?model_id=${body.modelId}`, body.body)
    .then((response) => response.data)
}

export const getNomenclaturesMappings = async (jobId: string): Promise<NomenclaturesMapping[]> => {
  return axiosClient.get(`/nomenclature/${jobId}`).then((response) => response.data)
}
