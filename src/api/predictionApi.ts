import axiosClient from "api/axiosClient"
import { MessageInModel } from "model/MessageModel"
import QueryModel from "model/QueryModel"

const getDatastepPrediction = (body: Omit<QueryModel, "chat_id">): Promise<MessageInModel> => {
  return axiosClient.post("/assistant/prediction", body).then((response) => response.data)
}

const getChatPdfPrediction = (body: Omit<QueryModel, "chat_id">): Promise<MessageInModel> => {
  return axiosClient.post("/chat_pdf/prediction", body).then((response) => response.data)
}

const getChatKnowledgeBasePrediction = (
  body: Omit<QueryModel, "chat_id">
): Promise<MessageInModel> => {
  return axiosClient.post("/chat_knowledge_base/prediction", body).then((response) => response.data)
}

export { getChatKnowledgeBasePrediction, getChatPdfPrediction, getDatastepPrediction }
