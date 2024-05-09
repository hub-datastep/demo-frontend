import axiosClient from "api/axiosClient"
import { PromptEditModel, PromptModel } from "model/PromptModel"

const getActivePrompt = (): Promise<PromptModel> => {
    return axiosClient.get("/prompt/active").then(response => response.data)
}

const editActivePrompt = (prompt_id: number, body: PromptEditModel): Promise<PromptModel> => {
    return axiosClient.put(`/prompt/${prompt_id}`, body).then(response => response.data)
}

const getTenantTables = (): Promise<string[]> => {
    return axiosClient.get("/prompt/tables").then(response => response.data)
}

export {
    editActivePrompt, getActivePrompt, getTenantTables
}
