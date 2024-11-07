import { imitateSolution } from "api/solutionImitationApi"
import { notify } from "misc/notifications"
import { useMutation } from "react-query"

export const useSolutionImitationMutation = () => {
  return useMutation(imitateSolution, {
    onError: () => {
      notify("Что-то пошло не так, попробуйте позже или сообщите нам об ошибке", "error")
    },
  })
}
