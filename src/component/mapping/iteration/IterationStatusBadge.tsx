import { TypographyProps } from "@chakra-ui/react"
import { CustomBadge } from "component/CustomBadge"
import { FC } from "react"
import {
  getIterationStatusColor,
  getIterationStatusText,
} from "util/formatting/iterationStatus"

interface IterationStatusBadgeProps {
  size?: TypographyProps["fontSize"]
  status?: string
}

export const IterationStatusBadge: FC<IterationStatusBadgeProps> = (props) => {
  const { size, status } = props

  const text = getIterationStatusText(status)
  const colorScheme = getIterationStatusColor(status)

  if (!status || !text) {
    return <></>
  }

  return (
    <CustomBadge size={size} colorScheme={colorScheme}>
      {text}
    </CustomBadge>
  )
}
