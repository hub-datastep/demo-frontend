import { TypographyProps } from "@chakra-ui/react"
import { CustomBadge } from "component/CustomBadge"
import { FC } from "react"
import {
  getIterationTypeColor,
  getIterationTypeText,
} from "util/formatting/iterationType"

interface IterationTypeBadgeProps {
  size?: TypographyProps["fontSize"]
  type?: string
}

export const IterationTypeBadge: FC<IterationTypeBadgeProps> = (props) => {
  const { size, type } = props

  const text = getIterationTypeText(type)
  const colorScheme = getIterationTypeColor(type)

  if (!type || !text) {
    return <></>
  }

  return (
    <CustomBadge size={size} colorScheme={colorScheme}>
      {text}
    </CustomBadge>
  )
}
