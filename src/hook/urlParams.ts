import { useSearchQuery } from "misc/util"

export const useUrlParam = (
  paramName: string,
): [string | undefined, (newValue?: string) => void, string] => {
  const urlParams = useSearchQuery()

  const allParams = urlParams.toString()
  const paramValue = urlParams.get(paramName) || undefined

  const setUrlParam = (newValue: string = "") => {
    urlParams.set(paramName, newValue)
  }

  return [paramValue, setUrlParam, allParams]
}
