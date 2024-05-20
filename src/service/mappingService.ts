import { startNomenclaturesMapping } from "api/mappingApi"
import { useMutation } from "react-query"

export const useNomenclaturesMapping = () => {
  return useMutation(startNomenclaturesMapping)
}
