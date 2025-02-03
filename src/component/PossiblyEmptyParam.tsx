import { Text } from "@chakra-ui/react"
import { FC } from "react"

interface PossiblyEmptyParamProps {
  value?: any
}

const UNDEFINED_PARAM_PLACEHOLDER = "..."

export const PossiblyEmptyParam: FC<PossiblyEmptyParamProps> = (props) => {
  const { value } = props

  return <Text>{value || UNDEFINED_PARAM_PLACEHOLDER}</Text>
}
