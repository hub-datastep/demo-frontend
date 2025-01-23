import { useSearchQuery } from "misc/util"

export const useUrlParam = (paramName: string) => {
  const urlParams = useSearchQuery()
  const paramValue = urlParams.get(paramName) || undefined
  return paramValue
}
