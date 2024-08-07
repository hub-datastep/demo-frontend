import moment from "moment"
import "moment/locale/ru"
import { ReactNode, useMemo } from "react"
import { useLocation } from "react-router-dom"

const getBaseUrl = (): string => {
  const backend_url = process.env["REACT_APP_BACKEND_URL"]
  if (!backend_url) {
    throw Error("REACT_APP_BACKEND_URL must be passed in .env")
  }
  return backend_url
}

const getHostPath = (): string => {
  const host = process.env["REACT_APP_STATIC_URL"]
  if (!host) {
    throw Error("REACT_APP_STATIC_URL must be passed in .env")
  }
  return host
}

const getLastN = (n: number, arr: ReactNode[]) => {
  return arr.slice(Math.max(arr.length - n, 0))
}

const formatDate = (date: string): string => {
  return moment(date).locale("ru").calendar()
}

const sortDate = (dateA: string, dateB: string, descending: boolean) => {
  const result = +new Date(dateA) - +new Date(dateB)
  return descending ? -result : result
}

// Взял этот хук здесь https://v5.reactrouter.com/web/example/query-parameters
const useSearchQuery = () => {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const getShortFileName = (filename: string) => {
  if (filename?.length > 50)
    return filename.substring(0, 20) + "..." + filename.substring(filename.length - 15)
  return filename
}

export { formatDate, getBaseUrl, getHostPath, getLastN, getShortFileName, sortDate, useSearchQuery }
