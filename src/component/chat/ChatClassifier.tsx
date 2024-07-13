import { Button, Flex, Text, Textarea } from "@chakra-ui/react"
import { getNomenclaturesMappings } from "api/mappingApi"
import queryClient from "api/queryClient"
import { ClassifierAnswer } from "component/classifier/ClassifierAnswer"
import { ClassifierUploadBtn } from "component/classifier/ClassifierUploadBtn"
import { JobStatus } from "constant/jobStatus"
import { useSearchQuery } from "misc/util"
import {
  MappingNomenclatureBody,
  MappingNomenclatureItem,
  NomenclaturesMapping,
} from "model/ClassifierModel"
import { DataExtractModel } from "model/FileModel"
import { JobModel } from "model/JobModel"
import { ChangeEvent, useState } from "react"
import { useQuery } from "react-query"
import { useNomenclaturesMapping } from "service/mappingService"

export const ChatClassifier = () => {
  const urlParams = useSearchQuery()
  const parserMode = urlParams.get("mode")
  const [queryNomenclaturesList, setQueryNomenclaturesList] = useState<string>("")
  const [currentJob, setCurrentJob] = useState<JobModel>()
  const [isError, setIsError] = useState<boolean>(false)

  const nomenclaturesMappingMutation = useNomenclaturesMapping()
  const { data: nomenclaturesMappingList, status: mappingQueryStatus } = useQuery<
    NomenclaturesMapping[]
  >("nomenclaturesMapping", () => getNomenclaturesMappings(currentJob!.job_id), {
    enabled: !!currentJob?.job_id,

    refetchInterval: (data) => {
      // If any of jobs is failed, stop refetching
      const isAnyJobFailed = data?.some((mapping) => mapping.general_status === JobStatus.FAILED)

      if (isAnyJobFailed) {
        setCurrentJob(undefined)
        setIsError(true)
        return false
      }

      const isAllMappingJobsFinished = data?.every(
        (mapping) => mapping.general_status === JobStatus.FINISHED
      )

      // If all jobs are finished, stop refetching
      if (isAllMappingJobsFinished) {
        setCurrentJob(undefined)
        return false
      }

      return 5000
    },
    refetchIntervalInBackground: true,
    onError: () => {
      setCurrentJob(undefined)
      setIsError(true)
    },
  })

  const mappedNomenclatures = nomenclaturesMappingList?.flatMap(
    (jobResult) => jobResult.nomenclatures || []
  )

  const isTextAreaDisabled = !!currentJob || mappingQueryStatus === "loading"
  const isStartMappingBtnDisabled = isTextAreaDisabled || queryNomenclaturesList.trim() === ""
  const isExportBtnsDisabled = isTextAreaDisabled || !mappedNomenclatures

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQueryNomenclaturesList(event.target.value)
  }

  const handleStartNomenclaturesMapping = async () => {
    if (!queryNomenclaturesList.trim()) return

    const nomenclatures: MappingNomenclatureItem[] = queryNomenclaturesList
      .trim()
      .split("\n")
      .map((nomenclature, index) => ({
        row_number: index,
        nomenclature: nomenclature,
      }))

    const body: MappingNomenclatureBody = {
      nomenclatures: nomenclatures,
    }

    queryClient.clear()
    const job = await nomenclaturesMappingMutation.mutateAsync(body)
    setCurrentJob(job)
  }

  const onSuccessDataExtraction = (parsedData: DataExtractModel[]) => {
    const nomenclaturesList = parsedData.map((nomenclatureObject) =>
      nomenclatureObject.nomenclature.replace("\n", " ")
    )
    setQueryNomenclaturesList(nomenclaturesList.join("\n"))
  }

  return (
    <Flex
      h="full"
      w="84%"
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      overflowX="hidden"
      overflowY="auto"
    >
      <Flex
        w="full"
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        py={10}
        px={5}
        gap={10}
      >
        <Flex w="full" direction="column" gap={5}>
          <Textarea
            backgroundColor="gray.100"
            minHeight={200}
            width="full"
            value={queryNomenclaturesList}
            onChange={handleChange}
            placeholder="Напишите список номенклатур.."
            isDisabled={isTextAreaDisabled}
            variant="solid"
            resize="none"
            overflowY="scroll"
            py={2}
          />

          {isError && <Text color="red">Что-то пошло не так. Попробуйте позже</Text>}

          {/* TODO: move last 2 btns under table */}
          <Flex direction="row" justifyContent="flex-start" alignItems="flex-start" gap={5}>
            <Button
              variant="outline"
              colorScheme="purple"
              isDisabled={isStartMappingBtnDisabled}
              onClick={handleStartNomenclaturesMapping}
              whiteSpace="break-spaces"
            >
              Сопоставить
            </Button>

            <Button
              variant="outline"
              colorScheme="green"
              isDisabled={isExportBtnsDisabled}
              whiteSpace="break-spaces"
            >
              Экспортировать в Excel
            </Button>

            <Button
              variant="outline"
              colorScheme="yellow"
              isDisabled={isExportBtnsDisabled}
              whiteSpace="break-spaces"
            >
              Отправить в 1С
            </Button>
          </Flex>
        </Flex>

        {(parserMode === "INVOICE" || parserMode === "KP") && (
          <ClassifierUploadBtn onSuccess={onSuccessDataExtraction} parserMode={parserMode} />
        )}

        <ClassifierAnswer
          mappingResponseList={mappedNomenclatures}
          isLoading={isTextAreaDisabled}
        />
      </Flex>
    </Flex>
  )
}
