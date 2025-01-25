import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react"
import { getNomenclaturesMappingResult } from "api/mappingApi"
import { IterationsTable } from "component/mapping/iteration/IterationsTable"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { ChangeEvent, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useQuery } from "react-query"
import { MappingIteration } from "type/mapping/iteration"
import { WithStrId } from "type/withId"

export const MappingIterations = () => {
  const [iterationKey, setIterationKey] = useState<string>()
  const isIterationKeyExists = !!iterationKey

  const {
    data: mappingIterationsList,
    isLoading: isMappingIterationsListLoading,
    isRefetching: isMappingIterationsListRefetching,
    refetch,
  } = useQuery<WithStrId<MappingIteration>[]>("mappingIterationsList", () =>
    getNomenclaturesMappingResult(iterationKey),
  )
  const isMappingIterationsListExist =
    !!mappingIterationsList && mappingIterationsList.length > 0

  const isLoading = isMappingIterationsListLoading || isMappingIterationsListRefetching

  const handleIterationKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const value = e.target.value.trim()
    setIterationKey(value)
  }

  const handleRefetch = () => {
    // Set 'iteration_key' url param value
    // setIterationKey(mappingIterationKey)
    // window.history.replaceState({}, "", `?${allParams}`)

    // Refetch iterations list
    refetch()
  }

  return (
    <Page>
      <PageHeading>Итерации Маппинга</PageHeading>

      {/* Iteration ID Seach */}
      <Flex w="full" direction="row" justifyContent="flex-start" alignItems="center">
        <Flex>
          <InputGroup>
            <Input
              placeholder="Введите ID итерации"
              value={iterationKey}
              onChange={handleIterationKeyChange}
              isDisabled={isLoading}
            />

            <InputRightElement>
              <IconButton
                aria-label="mapping-iterations-search"
                icon={<FaSearch color="gray" />}
                variant="ghost"
                onClick={handleRefetch}
                isLoading={isLoading}
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Flex>

      {isLoading && <LoadingPage />}

      {/* Placeholder if no iterations */}
      {!isLoading && !isMappingIterationsListExist && (
        <Flex h="full" w="full" justifyContent="center" alignItems="center">
          <Text>Не нашлось итераций с таким ID</Text>
        </Flex>
      )}

      {/* Iterations Table */}
      {!isLoading && isMappingIterationsListExist && (
        <IterationsTable iterations={mappingIterationsList} />
      )}
    </Page>
  )
}
