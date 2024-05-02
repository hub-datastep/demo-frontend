import { getChatPdfPrediction, getDatastepPrediction } from "api/predictionApi"
import { useMutation } from "react-query"

const useDBPrediction = () => {
    return useMutation(getDatastepPrediction)
}

const useDocsPrediction = () => {
    return useMutation(getChatPdfPrediction)
}

export {
    useDBPrediction,
    useDocsPrediction
}
