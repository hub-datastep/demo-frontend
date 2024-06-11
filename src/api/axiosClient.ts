import axios, { AxiosError, AxiosInstance } from "axios"
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
    if (error.response?.status === 401) {
      clearUserToken()
      return
    }

    throw error
  }
)

export default axiosClient
