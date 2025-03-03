import { Button, Flex, Td, Text, Textarea, Tr } from "@chakra-ui/react"
import { NomenclatureSelect } from "component/select/NomenclatureSelect"
import { ChangeEvent, FC, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { useCorrectedNomenclature } from "service/mapping/mappingService"
import { CorrectedResult, MappingResult } from "type/mapping/result"
import { SimilarNomenclature } from "type/mapping/similarNomenclature"
import { WithId, WithStrId } from "type/withId"
import {
  getMappedNomenclature,
  isMappedNomenclatureValid,
} from "util/validation/mappedNomenclature"

interface MappingResultRowProps {
  mappingResult: WithId<MappingResult>
  correctedResults: CorrectedResult[]
  onCorrectNomenclatureSelect: (result: CorrectedResult) => void
}

export const MappingResultRow: FC<MappingResultRowProps> = (props) => {
  const { mappingResult, correctedResults, onCorrectNomenclatureSelect } = props

  const resultId = mappingResult.id
  const result = mappingResult.result

  const correctedResult = correctedResults.find((result) => result.result_id === resultId)
  const selectedNomenclature = correctedResult?.nomenclature
  const isCorrectedResultExists = !!selectedNomenclature

  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)

  const correctedNomenclatureMutation = useCorrectedNomenclature()

  const isLoading = correctedNomenclatureMutation.isLoading

  const mappedNomenclature = getMappedNomenclature(mappingResult)
  const isMappedNomenclatureExists = isMappedNomenclatureValid(mappingResult)

  const correctedNomenclatureName = correctedResult?.nomenclature?.name
  const isAlreadyMarkedAsCorrect =
    correctedNomenclatureName === mappedNomenclature?.nomenclature
  const isMarkAsCorrectBtnDisabled =
    !isMappedNomenclatureExists || isAlreadyMarkedAsCorrect

  const similarMappingsList = result?.similar_mappings
  const isSimilarMappingsExists = !!similarMappingsList && similarMappingsList.length > 0

  const handleSelectVisible = () => {
    setIsSearchVisible(true)
  }

  const handleSelect = (selectedNomenclature: WithStrId<SimilarNomenclature>) => {
    const result: CorrectedResult = {
      ...(correctedResult || ({} as CorrectedResult)),
      nomenclature: selectedNomenclature,
    }
    onCorrectNomenclatureSelect(result)

    setIsSearchVisible(false)
  }

  const handleFeedbackChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()

    const feedback = e.target.value
    const result: CorrectedResult = {
      ...(correctedResult || ({} as CorrectedResult)),
      feedback: feedback,
    }

    onCorrectNomenclatureSelect(result)
  }

  const handleMarkAsCorrect = () => {
    if (!isMappedNomenclatureExists || !mappedNomenclature) {
      return
    }

    handleSelect({
      id: mappedNomenclature.nomenclature_guid,
      name: mappedNomenclature.nomenclature,
      material_code: mappedNomenclature.material_code,
    })
  }

  return (
    <Tr whiteSpace="break-spaces">
      {/* Initial nomenclature */}
      <Td>
        <Text>{result?.nomenclature}</Text>
      </Td>

      {/* Mapped Nomenclature */}
      <Td>
        {/* Mappings */}
        {isMappedNomenclatureExists && mappedNomenclature && (
          <Flex w="full" direction="column" gap={2}>
            <Text>{mappedNomenclature.nomenclature}</Text>

            {/* Mark As Correct Btn */}
            <Flex w="full">
              <Button
                size="xs"
                variant="outline"
                colorScheme="teal"
                onClick={handleMarkAsCorrect}
                isDisabled={isMarkAsCorrectBtnDisabled}
              >
                Правильно
              </Button>
            </Flex>
          </Flex>
        )}

        {/* Similar Mappings */}
        {!isMappedNomenclatureExists && isSimilarMappingsExists && (
          <Flex direction="column" gap={2}>
            <Text fontWeight="light">
              Не нашлось номенклатуры с такими параметрами, но возможно Вы имели ввиду:
            </Text>

            {/* Nomenclatures List */}
            <Flex direction="column" gap={1}>
              {similarMappingsList.map((mapping, index) => (
                <Text key={index}>{mapping.nomenclature}</Text>
              ))}
            </Flex>
          </Flex>
        )}
      </Td>

      {/* Nomenclature Group */}
      <Td>
        <Text>{result?.group}</Text>
      </Td>

      {/* Corrected Nomenclature */}
      <Td px={2} py={1}>
        <Flex w="full" direction="column" justifyContent="center">
          {isSearchVisible ? (
            <NomenclatureSelect
              prevResult={result}
              selectedNomenclature={selectedNomenclature}
              onSelect={handleSelect}
              isDisabled={isLoading}
              setIsVisible={setIsSearchVisible}
            />
          ) : (
            <Flex w="full" direction="column" justifyContent="center" gap={1}>
              {isCorrectedResultExists ? (
                <Button
                  h="fit-content"
                  w="fit-content"
                  variant="ghost"
                  colorScheme="gray"
                  py={1}
                  fontWeight="normal"
                  textAlign="left"
                  rightIcon={<FaEdit />}
                  onClick={handleSelectVisible}
                >
                  <Text w="fit-content" whiteSpace="normal">
                    {correctedNomenclatureName}
                  </Text>
                </Button>
              ) : (
                <Button
                  h="fit-content"
                  w="fit-content"
                  variant="outline"
                  colorScheme="blue"
                  size="sm"
                  py={1}
                  fontWeight="medium"
                  textAlign="left"
                  rightIcon={<FaEdit />}
                  onClick={handleSelectVisible}
                >
                  <Text>Изменить</Text>
                </Button>
              )}
            </Flex>
          )}
        </Flex>
      </Td>

      {/* Feedback */}
      <Td p={0}>
        <Textarea
          h="full"
          w="full"
          placeholder="Подскажите, а почему мы неправильно сопоставили?"
          value={correctedResult?.feedback}
          onChange={handleFeedbackChange}
        />
      </Td>
    </Tr>
  )
}
