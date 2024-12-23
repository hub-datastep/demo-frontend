import { Flex, IconButton, Td, Text, Tr } from "@chakra-ui/react"
import SearchComponent from "component/SearchComponent"
import { ClassifierCheckbox } from "component/classifier/ClassifierCheckbox"
import { MappingResult, MappingResultUpdate } from "model/ClassifierModel"
import { FC, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { useCorrectedNomenclature } from "service/mappingService"

interface ClassifierResultTableProps {
  nomenclatureMappingResult: MappingResult
}

export const ClassifierResultMappingRow: FC<ClassifierResultTableProps> = (props) => {
  const { nomenclatureMappingResult } = props

  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const correctedNomenclatureMutation = useCorrectedNomenclature()

  const mappedNomenclaturesList = nomenclatureMappingResult.mapping_result?.mappings
  const isMappingsExists =
    mappedNomenclaturesList !== null && mappedNomenclaturesList !== undefined

  const similarMappingList = nomenclatureMappingResult.mapping_result?.similar_mappings
  const isSimilarMappingsExists =
    similarMappingList !== null && similarMappingList !== undefined

  const handleIncorrectMapping = () => {
    setIsSearchVisible(true)
  }

  const handleSelect = async (selectedSimilarNomecnlature: string) => {
    const updatedNomenclature: MappingResultUpdate = {
      id: nomenclatureMappingResult.id,
      mapping_nomenclature_corrected: selectedSimilarNomecnlature,
    }
    await correctedNomenclatureMutation.mutateAsync(updatedNomenclature)
    setIsSearchVisible(false)
  }

  return (
    <Tr whiteSpace="break-spaces">
      {/* Initial nomenclature */}
      <Td>{nomenclatureMappingResult.mapping_result?.nomenclature}</Td>

      {/* Mapped Nomenclature */}
      <Td>
        <Flex direction="column">
          {/* Mapped nomenclatures */}
          {isMappingsExists && <Text>{mappedNomenclaturesList[0].nomenclature}</Text>}

          {/* Similar nomenclatures */}
          {!isMappingsExists && isSimilarMappingsExists && (
            <>
              <Text>
                Не нашлось номенклатуры с такими параметрами, но возможно Вы имели ввиду:
              </Text>
              <ClassifierCheckbox mappingsList={similarMappingList} />
            </>
          )}
        </Flex>
      </Td>

      {/* Nomenclature Group */}
      <Td>
        <Text>{nomenclatureMappingResult.mapping_result?.group}</Text>
      </Td>

      {/* Corrected Nomenclature */}
      <Td p={0}>
        {isSearchVisible ? (
          <SearchComponent
            onSelect={handleSelect}
            isDisabled={correctedNomenclatureMutation.isLoading}
            setIsSearchVisible={setIsSearchVisible}
          />
        ) : (
          <Flex w="full" direction="row" justifyContent="center" gap={2}>
            <Text>{nomenclatureMappingResult.mapping_nomenclature_corrected}</Text>
            <IconButton
              aria-label="edit-corrected-nomenclature"
              variant="ghost"
              icon={<FaEdit />}
              onClick={handleIncorrectMapping}
            />
          </Flex>
        )}
      </Td>

      {/* Сreated At */}
      <Td>
        <Text>{nomenclatureMappingResult.created_at}</Text>
      </Td>

      {/* Iteration Key */}
      <Td>
        <Text>{nomenclatureMappingResult.iteration_key}</Text>
      </Td>
    </Tr>
  )
}
