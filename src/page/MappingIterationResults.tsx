import { Button, Flex } from "@chakra-ui/react"
import { getMappingIterationById } from "api/mapping/iteration"
import { UTDMetadatasParams } from "component/mapping/iteration/metadatas/UTDMetadatasParams"
import { MappingResultsTable } from "component/mapping/result/MappingResultsTable"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { FC, useEffect, useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router"
import {
  useMappingResultsUpdateMutation,
  useMappingResultsUploadToKafkaMutation,
} from "service/mapping/resultService"
import { IterationType, IterationWithResults } from "type/mapping/iteration"
import { UTDMetadatas } from "type/mapping/iterationMetadatas"
import {
  CorrectedResult,
  MappingResultsUpload,
  MappingResultUpdate,
} from "type/mapping/result"
import { WithStrId } from "type/withId"

type Params = {
  id: string
}

export const MappingIterationResults: FC = () => {
  const { id: iterationId } = useParams<Params>()

  const updateMutation = useMappingResultsUpdateMutation()
  const uploadToKafkaMutation = useMappingResultsUploadToKafkaMutation()

  const isMutationsLoading = updateMutation.isLoading || uploadToKafkaMutation.isLoading

  const { data: mappingIteration, isLoading } = useQuery<WithStrId<IterationWithResults>>(
    ["mappingIteration", iterationId],
    () => getMappingIterationById(iterationId!),
    {
      enabled: !!iterationId,
    },
  )
  const isIterationExists = !!mappingIteration
  const metadatas = mappingIteration?.metadatas
  const isUTDIteration =
    mappingIteration?.type?.toLowerCase() === IterationType.UTD.toLowerCase()
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

  const isAllResultsCorrected = correctedResults.every((result) => !!result.nomenclature)
  const isSendBtnDisabled = !isAllResultsCorrected

  const handleCorrectNomenclatureSelect = async (result: CorrectedResult) => {
    setCorrectedResults((prevResultsList) => {
      const filteredResultsList = prevResultsList.filter(
        (prevResult) => prevResult.result_id !== result.result_id,
      )

      return [...filteredResultsList, result]
    })
  }

  const handleResultsUpdate = async () => {
    const body: MappingResultUpdate = {
      iteration_id: iterationId!,
      corrected_results_list: correctedResults,
    }
    await updateMutation.mutateAsync(body)
  }

  const handleResultsUploadToKafka = async () => {
    const body: MappingResultsUpload = {
      iteration_id: iterationId!,
    }
    await uploadToKafkaMutation.mutateAsync(body)
  }

  const handleSubmit = async () => {
    await handleResultsUpdate()
    await handleResultsUploadToKafka()
  }

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
        <Button
          colorScheme="purple"
          onClick={handleSubmit}
          isDisabled={isSendBtnDisabled}
          isLoading={isMutationsLoading}
        >
          Отправить
        </Button>
      </Flex>
    </Page>
  )
}
