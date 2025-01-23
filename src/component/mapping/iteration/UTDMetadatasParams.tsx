import { Flex } from "@chakra-ui/react"
import { FC } from "react"
import { UTDMetadatas } from "type/mapping/iterationMetadatas"

interface UTDMetadatasParamsProps {
  metadatas?: UTDMetadatas
}

export const UTDMetadatasParams: FC<UTDMetadatasParamsProps> = (props) => {
  const { metadatas } = props

  return (
    <Flex w="full" direction="column" gap={3}>
      {/* TODO: show all metadatas params */}
      {/* <Heading>УПД #{metadatas}</Heading> */}
    </Flex>
  )
}
