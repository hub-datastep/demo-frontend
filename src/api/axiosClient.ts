import axios, { AxiosError, AxiosInstance } from "axios"
import { notify } from "misc/notifications"
import { getBaseUrl } from "misc/util"
import Cookies from "universal-cookie"

const axiosClient: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
})

export const clearUserToken = () => {
  const cookies = new Cookies()
  cookies.remove("token")
}

axiosClient.interceptors.request.use(async (config) => {
  const cookies = new Cookies()
  const token = cookies.get("token")

  if (token) {
    config.headers["Authorization"] = `Bearer ${token.access_token}`
  }

  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const statusCode = error.response?.status
    if (error.response?.status === 401) {
      clearUserToken()
      return
    }
    // Show notification if Internal Service Error
    if (statusCode === 500) {
      notify("Сервис сейчас недоступен, попробуйте позже или сообщите нам", "error")
      return
    }

    throw error
  },
)

export default axiosClient
