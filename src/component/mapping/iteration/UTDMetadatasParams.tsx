import { Flex, Grid, Heading } from "@chakra-ui/react"
import { MetadatasParamsRow } from "component/mapping/iteration/MetadatasParamsRow"
import { PossiblyEmptyParam } from "component/PossiblyEmptyParam"
import { FC } from "react"
import { UTDMetadatas } from "type/mapping/iterationMetadatas"

interface UTDMetadatasParamsProps {
  metadatas?: UTDMetadatas
}

export const UTDMetadatasParams: FC<UTDMetadatasParamsProps> = (props) => {
  const { metadatas } = props

  const utdEntity = metadatas?.entity

  return (
    <Flex w="full" direction="column" gap={5}>
      <Heading>
        <Flex w="full" direction="row" gap={3}>
          УПД №<PossiblyEmptyParam value={utdEntity?.idn_number} />
          от <PossiblyEmptyParam value={utdEntity?.idn_date} />
        </Flex>
      </Heading>

      {/* Parsed Params */}
      <Grid w="fit-content" templateColumns="repeat(2, auto)" rowGap={2} columnGap={5}>
        <MetadatasParamsRow name="ИНН поставщика" value={utdEntity?.supplier_inn} />
        {/* Place new params here */}
      </Grid>
    </Flex>
  )
}
