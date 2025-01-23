import { saveCorrectedNomenclature, startNomenclaturesMapping } from "api/mappingApi"
import queryClient from "api/queryClient"
import { useMutation } from "react-query"

export const useNomenclaturesMapping = () => {
  return useMutation(startNomenclaturesMapping)
}

export const useCorrectedNomenclature = () => {
  return useMutation(saveCorrectedNomenclature, {
    onSuccess: () => {
      queryClient.invalidateQueries("nomenclatureMappingResults")
    },
  })
}
