import { Button, Checkbox, Flex, Td, Text, Textarea, Tr } from "@chakra-ui/react"
import { NSIViewer, useNSIViewerDisclosure } from "component/mapping/result/NSIViewer"
import { ChangeEvent, FC } from "react"
import { FaEdit } from "react-icons/fa"
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
  isIterationApproved?: boolean
  isLoading?: boolean
}

export const MappingResultRow: FC<MappingResultRowProps> = (props) => {
  const {
    mappingResult,
    correctedResults,
    onCorrectNomenclatureSelect,
    isIterationApproved,
    isLoading,
  } = props

  const resultId = mappingResult.id
  const result = mappingResult.result

  const correctedResult = correctedResults.find((result) => result.result_id === resultId)
  const selectedNomenclature = correctedResult?.nomenclature
  const isCorrectedResultExists = !!selectedNomenclature

  const mappedNomenclature = getMappedNomenclature(mappingResult)
  const isMappedNomenclatureExists =
    mappedNomenclature && isMappedNomenclatureValid(mappingResult)

  const correctedNomenclatureName = correctedResult?.nomenclature?.name
  const isMarkedAsCorrect = correctedNomenclatureName === mappedNomenclature?.nomenclature
  const isMarkAsCorrectBtnDisabled =
    !isMappedNomenclatureExists ||
    isIterationApproved ||
    isLoading ||
    !mappedNomenclature.nomenclature.trim()

  const similarMappingsList = result?.similar_mappings
  const isSimilarMappingsExists = !!similarMappingsList && similarMappingsList.length > 0

  const mappedGroup: WithStrId<SimilarNomenclature> | undefined =
    isMappedNomenclatureExists
      ? {
          id: mappedNomenclature.nomenclature_guid,
          name: mappedNomenclature.group,
          material_code: mappedNomenclature.group_code,
        }
      : undefined

  const handleSelect = (selectedNomenclature?: WithStrId<SimilarNomenclature>) => {
    const result: CorrectedResult = {
      ...(correctedResult || ({} as CorrectedResult)),
      nomenclature: selectedNomenclature,
    }
    onCorrectNomenclatureSelect(result)
  }

  const handleFeedbackChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()

    const feedback = e.target.value
    const result: CorrectedResult = {
      ...(correctedResult || ({} as CorrectedResult)),
      feedback: !!feedback.trim() ? feedback : undefined,
    }

    onCorrectNomenclatureSelect(result)
  }

  const handleMarkAsCorrect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isMappedNomenclatureExists) {
      return
    }

    const isChecked = e.target.checked
    if (isChecked) {
      handleSelect({
        id: mappedNomenclature.nomenclature_guid,
        name: mappedNomenclature.nomenclature,
        material_code: mappedNomenclature.material_code,
      })
    } else {
      handleSelect(undefined)
    }
  }

  const { isNSIViewerOpen, onNSIViewerOpen, onNSIViewerClose } = useNSIViewerDisclosure()

  return (
    <>
      <Tr whiteSpace="break-spaces">
        {/* Initial nomenclature */}
        <Td>
          <Text>{result?.nomenclature}</Text>
        </Td>

        {/* Mapped Nomenclature */}
        <Td>
          {/* Mappings */}
          {isMappedNomenclatureExists && (
            <Flex w="full" direction="column" gap={2}>
              <Text>{mappedNomenclature.nomenclature}</Text>
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

        {/* Is Correct Checkbox */}
        <Td>
          <Flex w="full" direction="column" justifyContent="center" alignItems="center">
            <Checkbox
              borderColor="gray"
              colorScheme="blue"
              isChecked={isMarkedAsCorrect}
              onChange={handleMarkAsCorrect}
              isDisabled={isMarkAsCorrectBtnDisabled}
            />
          </Flex>
        </Td>

        {/* Corrected Nomenclature */}
        <Td>
          <Flex w="full" direction="column" gap={2}>
            {isCorrectedResultExists && (
              <Flex w="full" direction="column" gap={2}>
                <Text w="fit-content" whiteSpace="normal">
                  {correctedNomenclatureName}
                </Text>
              </Flex>
            )}

            <Flex w="full" direction="column" gap={2}>
              {/* <Button
              h="fit-content"
              w="fit-content"
              // variant="outline"
              colorScheme="teal"
              size="sm"
              py={1}
              onClick={handleMarkAsCorrect}
              rightIcon={<FaCheckCircle />}
              isDisabled={isMarkAsCorrectBtnDisabled}
            >
              Отметить корректной
            </Button> */}

              {/* NSI Viewer Btn */}
              {!isIterationApproved && (
                <Button
                  h="fit-content"
                  w="fit-content"
                  // variant="outline"
                  colorScheme="blue"
                  size="sm"
                  py={1}
                  fontWeight="medium"
                  textAlign="left"
                  rightIcon={<FaEdit />}
                  onClick={onNSIViewerOpen}
                  isDisabled={isLoading}
                >
                  <Text>Выбрать из НСИ</Text>
                </Button>
              )}
            </Flex>
          </Flex>
        </Td>

        {/* Feedback */}
        <Td p={0}>
          <Textarea
            h="full"
            w="full"
            placeholder="Подскажите, а почему мы неправильно сопоставили?"
            value={correctedResult?.feedback || undefined}
            onChange={handleFeedbackChange}
          />
        </Td>
      </Tr>

      {/* NSI Viewer */}
      <NSIViewer
        prevGroup={mappedGroup}
        onNomenclatureSelect={handleSelect}
        isOpen={isNSIViewerOpen}
        onClose={onNSIViewerClose}
      />
    </>
  )
}
