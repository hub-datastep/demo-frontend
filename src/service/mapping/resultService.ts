import {
  updateMappingResultsList,
  uploadMappingResultsToKafka,
} from "api/mapping/result"
import queryClient from "api/queryClient"
import { AxiosError } from "axios"
import { notify } from "misc/notifications"
import { useMutation } from "react-query"

export const useMappingResultsUpdateMutation = () => {
  return useMutation(updateMappingResultsList, {
    onSuccess: (_, body) => {
      const iterationId = body.iteration_id
      queryClient.invalidateQueries(["mappingIteration", iterationId])

      notify("Корректные номенклатуры успешно сохранены", "success")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}

export const useMappingResultsUploadToKafkaMutation = () => {
  return useMutation(uploadMappingResultsToKafka, {
    onSuccess: () => {
      notify("Скорректированные результаты успешно отправлены", "success")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}
