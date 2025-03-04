import { Badge, Flex, ThemingProps, TypographyProps } from "@chakra-ui/react"
import { FCC } from "type/fcc"

export interface CustomBadgeProps {
  size?: TypographyProps["fontSize"]
  colorScheme?: ThemingProps["colorScheme"]
}

export const CustomBadge: FCC<CustomBadgeProps> = (props) => {
  const { size, colorScheme, children } = props

  return (
    <Flex w="fit-content" direction="column">
      <Badge fontSize={size} colorScheme={colorScheme} px={2} py={1} borderRadius={5}>
        {children}
      </Badge>
    </Flex>
  )
}
