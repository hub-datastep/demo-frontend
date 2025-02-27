import { Button, Flex, Td, Text, Textarea, Tr } from "@chakra-ui/react"
import { NomenclatureSelect } from "component/select/NomenclatureSelect"
import { ChangeEvent, FC, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { useCorrectedNomenclature } from "service/mapping/mappingService"
import { CorrectedResult, MappingResult } from "type/mapping/result"
import { SimilarNomenclature } from "type/mapping/similarNomenclature"
import { WithId } from "type/withId"

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

  const mappingsList = result?.mappings
  const isMappingsExists = !!mappingsList && mappingsList.length > 0

  const similarMappingsList = result?.similar_mappings
  const isSimilarMappingsExists = !!similarMappingsList && similarMappingsList.length > 0

  const handleSelectVisible = () => {
    setIsSearchVisible(true)
  }

  const handleSelect = (selectedNomenclature: WithId<SimilarNomenclature>) => {
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

  return (
    <Tr whiteSpace="break-spaces">
      {/* Initial nomenclature */}
      <Td>
        <Text>{result?.nomenclature}</Text>
      </Td>

      {/* Mapped Nomenclature */}
      <Td>
        {/* Mappings */}
        {isMappingsExists && <Text>{mappingsList[0].nomenclature}</Text>}

        {/* Similar Mappings */}
        {!isMappingsExists && isSimilarMappingsExists && (
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
        <Flex w="full">
          {/* TODO: set corrected nomenclature */}

          {isSearchVisible ? (
            <NomenclatureSelect
              prevResult={result}
              selectedNomenclature={selectedNomenclature}
              onSelect={handleSelect}
              isDisabled={isLoading}
              setIsVisible={setIsSearchVisible}
            />
          ) : (
            <Flex w="full" direction="row" alignItems="center" gap={1}>
              <Button
                variant="ghost"
                fontWeight="normal"
                rightIcon={<FaEdit />}
                onClick={handleSelectVisible}
              >
                {isCorrectedResultExists ? (
                  <Text textAlign="left" whiteSpace="normal">
                    {correctedResult?.nomenclature?.name}
                  </Text>
                ) : (
                  <Text color="gray">Изменить</Text>
                )}
              </Button>
            </Flex>
          )}
        </Flex>
      </Td>

      {/* Feedback */}
      <Td p={0}>
        <Textarea
          value={correctedResult?.feedback}
          onChange={handleFeedbackChange}
          placeholder="Подскажите, а почему мы неправильно сопоставили?"
        />
      </Td>
    </Tr>
  )
}
