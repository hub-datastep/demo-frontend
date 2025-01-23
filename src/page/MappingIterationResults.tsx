import { Button, Flex } from "@chakra-ui/react"
import { getMappingIterationById } from "api/mapping/mappingIteration"
import { UTDMetadatasParams } from "component/mapping/iteration/UTDMetadatasParams"
import { MappingResultsTable } from "component/mapping/result/MappingResultsTable"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { FC, useEffect, useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router"
import { IterationType, IterationWithResults } from "type/mapping/iteration"
import { UTDMetadatas } from "type/mapping/iterationMetadatas"
import { CorrectedResult } from "type/mapping/result"
import { WithStrId } from "type/withId"
import { useUrlParam } from "util/urlParams"

type Params = {
  id: string
}

export const MappingIterationResults: FC = () => {
  const { id: iterationId } = useParams<Params>()

  const iterationType = useUrlParam("type")
  const isUTDIteration = iterationType?.toLowerCase() === IterationType.UTD.toLowerCase()

  const { data: mappingIteration, isLoading } = useQuery<WithStrId<IterationWithResults>>(
    ["mappingIteration", iterationId],
    () => getMappingIterationById(iterationId!),
    {
      enabled: !!iterationId,
    },
  )
  const isIterationExists = !!mappingIteration
  const metadatas = mappingIteration?.metadatas
  const results = mappingIteration?.results

  const prevCorrectedResults: CorrectedResult[] = useMemo(
    () =>
      results?.map((result) => ({
        result_id: result.id,
        nomenclature: result.corrected_nomenclature,
      })) || [],
    [results],
  )

  const [correctedResults, setCorrectedResults] =
    useState<CorrectedResult[]>(prevCorrectedResults)

  const handleCorrectNomenclatureSelect = async (result: CorrectedResult) => {
    setCorrectedResults((prevResultsList) => {
      const filteredResultsList = prevResultsList.filter(
        (prevResult) => prevResult.result_id !== result.result_id,
      )

      return [...filteredResultsList, result]
    })
  }

  const handleCorrectedResultsUpload = () => {}

  useEffect(() => {
    setCorrectedResults(prevCorrectedResults)
  }, [prevCorrectedResults])

  return (
    <Page>
      {isLoading && <LoadingPage />}

      {/* Iteration Metadatas */}
      {isIterationExists && isUTDIteration && (
        <UTDMetadatasParams metadatas={metadatas as UTDMetadatas | undefined} />
      )}

      {/* Mapping Results */}
      {isIterationExists && (
        <MappingResultsTable
          results={results!}
          correctedResults={correctedResults}
          onCorrectNomenclatureSelect={handleCorrectNomenclatureSelect}
        />
      )}

      {/* Action Btns */}
      <Flex
        w="full"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        gap={2}
      >
        {/* Send Corrected Results Btn */}
        <Button colorScheme="purple" onClick={handleCorrectedResultsUpload}>
          Отправить
        </Button>
      </Flex>
    </Page>
  )
}
