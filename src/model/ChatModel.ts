import { MessageModel } from "model/MessageModel"

interface ChatModel {
    id: number
    user_id: string
    mode_id: number
    messages: MessageModel[]
}

export default ChatModel