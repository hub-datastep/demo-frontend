import moment from "moment"
import "moment/locale/ru"
import { ReactNode, useMemo } from "react"
import { useLocation } from "react-router-dom"

export const getBaseUrl = (): string => {
  const backendUrl = process.env["REACT_APP_BACKEND_URL"]
  if (!backendUrl) {
    throw Error("REACT_APP_BACKEND_URL must be passed in .env")
  }
  return backendUrl
}

export const getHostPath = (): string => {
  const host = process.env["REACT_APP_STATIC_URL"]
  if (!host) {
    throw Error("REACT_APP_STATIC_URL must be passed in .env")
  }
  return host
}

export const getLastN = (n: number, arr: ReactNode[]) => {
  return arr.slice(Math.max(arr.length - n, 0))
}

export const formatDate = (date: string): string => {
  return moment(date).locale("ru").calendar()
}

export const sortDate = (dateA: string, dateB: string, descending: boolean) => {
  const result = +new Date(dateA) - +new Date(dateB)
  return descending ? -result : result
}

// Взял этот хук здесь https://v5.reactrouter.com/web/example/query-parameters
export const useSearchQuery = () => {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

export const getShortFileName = (filename: string) => {
  if (filename?.length > 50)
    return filename.substring(0, 20) + "..." + filename.substring(filename.length - 15)
  return filename
}
