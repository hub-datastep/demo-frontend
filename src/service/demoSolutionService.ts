import { imitateSolution } from "api/solutionImitationApi"
import { useMutation } from "react-query"

export const useSolutionImitationMutation = () => {
  return useMutation(imitateSolution)
}
