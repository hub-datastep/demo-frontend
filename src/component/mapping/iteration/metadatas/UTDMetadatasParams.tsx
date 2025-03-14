import { Flex, Grid } from "@chakra-ui/react"
import { IterationStatusBadge } from "component/mapping/iteration/IterationStatusBadge"
import { MetadatasParamsRow } from "component/mapping/iteration/metadatas/MetadatasParamsRow"
import { UTDDocumentLink } from "component/mapping/iteration/UTDDocumentLink"
import { PageHeading } from "component/page/PageHeading"
import { PossiblyEmptyParam } from "component/PossiblyEmptyParam"
import { FC } from "react"
import { UTDMetadatas } from "type/mapping/iterationMetadatas"
import { dateAsStringToDate, formatDate } from "util/formatting/date"

interface UTDMetadatasParamsProps {
  status?: string
  metadatas?: UTDMetadatas
}

export const UTDMetadatasParams: FC<UTDMetadatasParamsProps> = (props) => {
  const { status, metadatas } = props

  const utdEntity = metadatas?.entity
  const idnDate = dateAsStringToDate(utdEntity?.idn_date)
  const correctionDate = dateAsStringToDate(utdEntity?.correction_idn_date)
  const contractDate = dateAsStringToDate(utdEntity?.contract_date)

  const inputMessage = metadatas?.input_message
  const creditSlipData = inputMessage?.credit_slip_data
  const documents = inputMessage?.documents

  return (
    <Flex w="full" direction="column" gap={5}>
      <PageHeading>
        <Flex w="full" direction="row" alignItems="center" gap={5}>
          {/* Number & Date */}
          <Flex w="full" direction="row" alignItems="center" gap={3}>
            УПД №<PossiblyEmptyParam value={utdEntity?.idn_number} />
            от <PossiblyEmptyParam value={formatDate(idnDate, true)} />
          </Flex>

          {/* UTD Status */}
          <IterationStatusBadge size="xl" status={status} />
        </Flex>
      </PageHeading>

      {/* Parsed Params */}
      <Grid
        w="fit-content"
        templateColumns="repeat(2, auto)"
        rowGap={3}
        columnGap={5}
        px={2}
      >
        {/* Building Name */}
        <MetadatasParamsRow name="Объект" value={creditSlipData?.building_name} />

        {/* Organization INN */}
        <MetadatasParamsRow name="ИНН организации" value={utdEntity?.organization_inn} />

        {/* Supplier INN */}
        <MetadatasParamsRow name="ИНН поставщика" value={utdEntity?.supplier_inn} />

        {/* Correction UTD Number */}
        <MetadatasParamsRow
          name="Номер исправления УПД"
          value={utdEntity?.correction_idn_number}
        />

        {/* Correction Date */}
        <MetadatasParamsRow
          name="Дата исправления УПД"
          value={formatDate(correctionDate, true)}
        />

        {/* Contract Number */}
        <MetadatasParamsRow
          name="Наименование договора поставки"
          value={utdEntity?.contract_name}
        />

        {/* Contract Number */}
        <MetadatasParamsRow
          name="Номер договора поставки"
          value={utdEntity?.contract_number}
        />

        {/* Contract Date */}
        <MetadatasParamsRow
          name="Дата договора поставки"
          value={formatDate(contractDate, true)}
        />

        {/* UTD Documents */}
        <MetadatasParamsRow
          name="УПД файлы"
          value={
            <Flex w="full" direction="row" alignItems="center" flexWrap="wrap" gap={1}>
              {documents?.map((doc, index) => (
                <UTDDocumentLink key={index} document={doc} />
              ))}
            </Flex>
          }
        />
      </Grid>
    </Flex>
  )
}
