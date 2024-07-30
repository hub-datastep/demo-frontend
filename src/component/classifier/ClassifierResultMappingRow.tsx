import { Button, Flex, Td, Text, Tr } from "@chakra-ui/react"
import SearchComponent from "component/SearchComponent"
import { ClassifierCheckbox } from "component/classifier/ClassifierCheckbox"
import { MappingResult, MappingResultUpdate } from "model/ClassifierModel"
import { FC, useState } from "react"
import { useCorrectedNomenclature } from "service/mappingService"

interface ClassifierResultTableProps {
  nomenclatureMappingResult: MappingResult
}

export const ClassifierResultMappingRow: FC<ClassifierResultTableProps> = (props) => {
  const { nomenclatureMappingResult } = props

  const [searchVisible, setSearchVisible] = useState(false)

  const correctedNomenclatureMutation = useCorrectedNomenclature()

  const mappedNomenclaturesList = nomenclatureMappingResult.mapping_result?.mappings
  const isMappingsExists = mappedNomenclaturesList !== null && mappedNomenclaturesList !== undefined

  const similarMappingList = nomenclatureMappingResult.mapping_result?.similar_mappings
  const isSimilarMappingsExists = similarMappingList !== null && similarMappingList !== undefined

  const handleIncorrectMapping = () => {
    setSearchVisible(true)
  }

  const handleSelect = async (selectedSimilarNomecnlature: string) => {
    const updatedNomenclature: MappingResultUpdate = {
      id: nomenclatureMappingResult.id,
      mapping_nomenclature_corrected: selectedSimilarNomecnlature,
    }
    await correctedNomenclatureMutation.mutateAsync(updatedNomenclature)
    setSearchVisible(false)
  }

  return (
    <Tr whiteSpace="break-spaces">
      {/* Name of initial nomenclature (input from user) */}
      <Td>{nomenclatureMappingResult.mapping_result?.nomenclature}</Td>

      {/* Mapped nomenclature */}
      <Td>
        <Flex direction="column">
          {/* Show mapped nomenclatures */}
          {isMappingsExists && <Text>{mappedNomenclaturesList[0].nomenclature}</Text>}

          {/* Show similar nomenclatures */}
          {!isMappingsExists && isSimilarMappingsExists && (
            <>
              <Text>Не нашлось номенклатуры с такими параметрами, но возможно Вы имели ввиду:</Text>
              <ClassifierCheckbox mappingsList={similarMappingList} />
            </>
          )}
        </Flex>
      </Td>

      {/* Nomenclature group name */}
      <Td>
        <Text>{nomenclatureMappingResult.mapping_result?.group}</Text>
      </Td>
      {/* Corrected nomenclature */}
      <Td p={0}>
        {searchVisible ? (
          <SearchComponent
            onSelect={handleSelect}
            isDisabled={correctedNomenclatureMutation.isLoading}
            setSearchVisible={setSearchVisible}
          />
        ) : (
          <Text>{nomenclatureMappingResult.mapping_nomenclature_corrected}</Text>
        )}
      </Td>
      {/* Mapping created date */}
      <Td>
        <Text>{nomenclatureMappingResult.created_at}</Text>
      </Td>
      <Td>
        <Button
          isLoading={correctedNomenclatureMutation.isLoading}
          colorScheme="red"
          whiteSpace="break-spaces"
          onClick={handleIncorrectMapping}
          isDisabled={correctedNomenclatureMutation.isLoading}
        >
          Неправильное сопоставление
        </Button>
      </Td>
    </Tr>
  )
}
