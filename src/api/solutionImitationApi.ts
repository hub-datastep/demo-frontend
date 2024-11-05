import axiosClient from "api/axiosClient"
import { SolutionImitationBody, SolutionImitationResponse } from "model/SolutionImitation"

export const imitateSolution = async (
  body: SolutionImitationBody
): Promise<SolutionImitationResponse> => {
  const { data: responseTable } = await axiosClient.postForm(
    `/solution_imitation/with_llm/${body.type}`,
    {
      file_object: body.file_object,
    }
  )
  return responseTable
}
