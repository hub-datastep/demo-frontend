import { ThemeTypings } from "@chakra-ui/react"
import { IterationStatus } from "constant/iterationStatus"

export const getIterationStatusText = (status?: string): string | undefined => {
  switch (status) {
    case IterationStatus.NEED_APPROVE:
      return "Нужно Проверить"

    case IterationStatus.APPROVED:
      return "Проверено"
  }
}

export const getIterationStatusColor = (
  status?: string,
): ThemeTypings["colorSchemes"] | undefined => {
  switch (status) {
    case IterationStatus.NEED_APPROVE:
      return "yellow"

    case IterationStatus.APPROVED:
      return "green"
  }
}
