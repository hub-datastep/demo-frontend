import { Button, Flex } from "@chakra-ui/react"
import { getMappingIterationById } from "api/mapping/iteration"
import { UTDMetadatasParams } from "component/mapping/iteration/metadatas/UTDMetadatasParams"
import { MappingResultsTable } from "component/mapping/result/MappingResultsTable"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { IterationStatus } from "constant/iterationStatus"
import { IterationType } from "constant/iterationType"
import { FC, useEffect, useMemo, useState } from "react"
import { FaCheckSquare } from "react-icons/fa"
import { useQuery } from "react-query"
import { useParams } from "react-router"
import {
  useMappingResultsUpdateMutation,
  useMappingResultsUploadToKafkaMutation,
} from "service/mapping/resultService"
import { IterationWithResults } from "type/mapping/iteration"
import { UTDMetadatas } from "type/mapping/iterationMetadatas"
import {
  CorrectedResult,
  MappingResult,
  MappingResultsUpload,
  MappingResultUpdate,
} from "type/mapping/result"
import { WithId, WithStrId } from "type/withId"
import {
  getMappedNomenclature,
  isMappedNomenclatureValid,
} from "util/validation/mappedNomenclature"

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

  const isUTDIteration = mappingIteration?.type
    ?.toLowerCase()
    .includes(IterationType.UTD.toLowerCase())

  const status = mappingIteration?.status
  const isIterationApproved = status === IterationStatus.APPROVED

  const results = mappingIteration?.results as WithId<MappingResult>[] | undefined
  const isResultsExist = !!results
  const isAllResultsExist = results?.every(isMappedNomenclatureValid)

  const prevCorrectedResults: CorrectedResult[] = useMemo(
    () =>
      results?.map(
        (result) =>
          ({
            result_id: result.corrected_nomenclature?.result_id || result.id,
            nomenclature: result.corrected_nomenclature?.nomenclature,
            feedback: result.corrected_nomenclature?.feedback,
          } as CorrectedResult),
      ) || [],
    [results],
  )

  const [correctedResults, setCorrectedResults] =
    useState<CorrectedResult[]>(prevCorrectedResults)

  const isAllResultsCorrected = correctedResults.every((result) => !!result.nomenclature)
  const isSendBtnDisabled = !isAllResultsCorrected

  const handleCorrectNomenclatureSelect = async (result: CorrectedResult) => {
    setCorrectedResults((prevResultsList) => {
      const prevResult = prevResultsList.find(
        (prevResult) => prevResult.result_id === result.result_id,
      )

      // Save any feedback
      if (!!prevResult) {
        result.feedback = result.feedback || prevResult.feedback
      }

      const filteredResultsList = prevResultsList.filter(
        (prevResult) => prevResult.result_id !== result.result_id,
      )

      return [...filteredResultsList, result]
    })
  }

  const handleMarkAllAsCorrect = () => {
    if (!isResultsExist) {
      return
    }

    results.forEach((mappingResult) => {
      const resultId = mappingResult.id

      if (!isMappedNomenclatureValid(mappingResult)) {
        return
      }

      const mappedNomenclature = getMappedNomenclature(mappingResult)!

      handleCorrectNomenclatureSelect({
        result_id: resultId,
        nomenclature: {
          id: mappedNomenclature.nomenclature_guid,
          name: mappedNomenclature.nomenclature,
          material_code: mappedNomenclature.material_code,
        },
      })
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
      {!isLoading && isIterationExists && isUTDIteration && (
        <UTDMetadatasParams
          status={status}
          metadatas={metadatas as UTDMetadatas | undefined}
        />
      )}

      {/* Mapping Results Table */}
      {!isLoading && isIterationExists && isResultsExist && (
        <MappingResultsTable
          results={results}
          correctedResults={correctedResults}
          onCorrectNomenclatureSelect={handleCorrectNomenclatureSelect}
          isIterationApproved={isIterationApproved}
          isLoading={isMutationsLoading}
        />
      )}

      {/* Action Btns */}
      {!isLoading && isIterationExists && isResultsExist && !isIterationApproved && (
        <Flex
          w="full"
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          gap={3}
        >
          {/* All Results Correct */}
          <Button
            colorScheme="gray"
            onClick={handleMarkAllAsCorrect}
            rightIcon={<FaCheckSquare color="green" />}
            isLoading={isLoading}
            isDisabled={!isAllResultsExist || isAllResultsCorrected || isMutationsLoading}
          >
            Отменить все позиции правильными
          </Button>

          {/* Send Corrected Results Btn */}
          <Button
            colorScheme="purple"
            onClick={handleSubmit}
            isLoading={isMutationsLoading}
            isDisabled={isSendBtnDisabled}
          >
            Отправить
          </Button>
        </Flex>
      )}
    </Page>
  )
}
