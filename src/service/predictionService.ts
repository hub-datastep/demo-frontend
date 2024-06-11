import { getChatKnowledgeBasePrediction, getChatPdfPrediction, getDatastepPrediction } from "api/predictionApi"
import { useMutation } from "react-query"

const useDBPrediction = () => {
  return useMutation(getDatastepPrediction)
}

const useDocsPrediction = () => {
  return useMutation(getChatPdfPrediction)
}

const useKnowledgeBasePrediction = () => {
  return useMutation(getChatKnowledgeBasePrediction)
}

export { useDBPrediction, useDocsPrediction, useKnowledgeBasePrediction }
