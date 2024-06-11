import { AxiosError } from "axios"
import axiosClient from "api/axiosClient"
import ChatModel from "model/ChatModel"

const getChat = async (userId: string, modeId: number): Promise<ChatModel> => {
  const { data: chatModel } = await axiosClient.get(`/chat/${userId}/${modeId}`)
  return chatModel
}

const createChat = async (body: Omit<ChatModel, "id" | "messages">): Promise<ChatModel> => {
  const { data: chatModel } = await axiosClient.post("/chat", body)
  return chatModel
}

const getOrCreateChat = async (userId: string, modeId: number): Promise<ChatModel> => {
  try {
    const chat = await getChat(userId, modeId)
    chat.messages.sort((messageA, messageB) => messageA.id - messageB.id)
    return chat
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 404) {
      return await createChat({ user_id: userId, mode_id: modeId })
    }

    throw e
  }
}

export { getChat, createChat, getOrCreateChat }
