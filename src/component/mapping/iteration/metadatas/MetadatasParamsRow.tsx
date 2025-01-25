import { GridItem, Text } from "@chakra-ui/react"
import { PossiblyEmptyParam } from "component/PossiblyEmptyParam"
import { FC } from "react"

interface MetadatasParamsRowProps {
  name: string
  value?: string | number | JSX.Element
}

export const MetadatasParamsRow: FC<MetadatasParamsRowProps> = (props) => {
  const { name, value } = props

  return (
    <>
      {/* Property Name */}
      <GridItem w="fit-content">
        <Text w="fit-content" fontWeight="light" color="gray">
          {name}
        </Text>
      </GridItem>

      {/* Value */}
      <GridItem w="fit-content">
        <PossiblyEmptyParam value={value} />
      </GridItem>
    </>
  )
}
