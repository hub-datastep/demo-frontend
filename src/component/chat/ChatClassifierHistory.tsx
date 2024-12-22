import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react"
import { getNomenclaturesMappingResult } from "api/mappingApi"
import { ClassifierResultMappingsTable } from "component/classifier/ClassifierResultMappingsTable"
import { useSearchQuery } from "misc/util"
import { MappingResult } from "model/ClassifierModel"
import { ChangeEvent, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useQuery } from "react-query"

export const ChatClassifierHistory = () => {
  const urlParams = useSearchQuery()
  // Get Iteration Key from url params
  const iterationKeyInParams = urlParams.get("iteration_key") || undefined
  const [mappingIterationKey, setMappingIterationKey] = useState<string | undefined>(
    iterationKeyInParams
  )
  const isMappingIterationKeyExists = !!mappingIterationKey

  const {
    data: nomenclatureMappingResults,
    isLoading: isClassifierHistoryLoading,
    isRefetching: isClassifierHistoryRefetching,
    refetch,
  } = useQuery<MappingResult[]>(
    "nomenclatureMappingResults",
    async () =>
      await getNomenclaturesMappingResult({
        iteration_key: mappingIterationKey,
      })
  )
  const isMappingResultsExist =
    nomenclatureMappingResults !== undefined && nomenclatureMappingResults.length !== 0

  const isLoading = isClassifierHistoryLoading || isClassifierHistoryRefetching

  const handleMappingIterationKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const value = e.target.value.trim()
    setMappingIterationKey(value)
  }

  const handleMappingResultsRefetch = () => {
    // Set 'iteration_key' url param value
    urlParams.set("iteration_key", mappingIterationKey || "")
    window.history.replaceState({}, "", `?${urlParams.toString()}`)

    // Refetch mapping results
    refetch()
  }

  return (
    <Flex w="full" direction="column" py={4} gap={5}>
      <Flex w="full" direction="row" justifyContent="flex-end" px={5}>
        <Flex>
          <InputGroup>
            <Input
              placeholder="Введите ID итерации"
              value={mappingIterationKey}
              onChange={handleMappingIterationKeyChange}
              isDisabled={isLoading}
            />

            <InputRightElement>
              <IconButton
                aria-label="mapping-result-search"
                icon={<FaSearch />}
                variant="ghost"
                onClick={handleMappingResultsRefetch}
                isLoading={isLoading}
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Flex>

      {isLoading && (
        <Flex h="full" w="full" justifyContent="center" alignItems="center">
          <Spinner color="purple" />
        </Flex>
      )}

      {!isLoading && !isMappingResultsExist && (
        <Flex h="full" w="full" justifyContent="center" alignItems="center">
          <Text>
            {isMappingIterationKeyExists
              ? `Не нашлось результатов с ID итерации '${mappingIterationKey}'`
              : "Выполните сопоставление в Классификаторе и здесь начнёт сохраняться история Ваших сопоставлений."}
          </Text>
        </Flex>
      )}

      {!isLoading && isMappingResultsExist && (
        <ClassifierResultMappingsTable
          nomenclatureMappingResults={nomenclatureMappingResults}
        />
      )}
    </Flex>
  )
}
