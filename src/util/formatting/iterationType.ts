import { ThemeTypings } from "@chakra-ui/react"
import { IterationType } from "constant/iterationType"

export const getIterationTypeText = (type?: string): string | undefined => {
  switch (type) {
    case IterationType.UTD:
      return "УПД"
  }
}

export const getIterationTypeColor = (
  type?: string,
): ThemeTypings["colorSchemes"] | undefined => {
  switch (type) {
    case IterationType.UTD:
      return "purple"
  }
}
