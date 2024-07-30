import { Flex, Spinner, Text } from "@chakra-ui/react"
import { getNomenclaturesMappingResult } from "api/mappingApi"
import { ClassifierResultMappingsTable } from "component/classifier/ClassifierResultMappingsTable"
import { MappingResult } from "model/ClassifierModel"
import { useQuery } from "react-query"

export const ChatClassifierHistory = () => {
  const { data: nomenclatureMappingResults, status: nomenclatureMappingResultsQueryStatus } =
    useQuery<MappingResult[]>("nomenclatureMappingResults", async () => {
      const data = await getNomenclaturesMappingResult()
      return data.sort((a, b) => b.id - a.id)
    })

  const isClassifierHistoryLoading = nomenclatureMappingResultsQueryStatus === "loading"
  const isMappingResultsExist =
    nomenclatureMappingResults !== undefined && nomenclatureMappingResults.length !== 0

  if (isClassifierHistoryLoading) {
    return (
      <Flex h="full" w="full" justifyContent="center" alignItems="center">
        <Spinner color="purple" />
      </Flex>
    )
  }

  if (!isMappingResultsExist) {
    return (
      <Flex h="full" w="full" justifyContent="center" alignItems="center">
        <Text>
          Выполните сопоставление в Классификаторе и здесь начнёт сохраняться история Ваших
          сопоставлений.
        </Text>
      </Flex>
    )
  }

  return <ClassifierResultMappingsTable nomenclatureMappingResults={nomenclatureMappingResults} />
}
