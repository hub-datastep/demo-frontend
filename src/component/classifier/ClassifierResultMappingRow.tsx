import { Flex, Td, Text, Tr } from "@chakra-ui/react"
import { ClassifierCheckbox } from "component/classifier/ClassifierCheckbox"
import { MappingResult } from "model/ClassifierModel"
import { FC } from "react"

interface ClassifierResultTableProps {
  nomenclatureMappingResult: MappingResult
}

export const ClassifierResultMappingRow: FC<ClassifierResultTableProps> = (props) => {
  const { nomenclatureMappingResult } = props

  const mappedNomenclaturesList = nomenclatureMappingResult.mapping_result?.mappings
  const isMappingsExists = mappedNomenclaturesList !== null && mappedNomenclaturesList !== undefined

  const similarMappingList = nomenclatureMappingResult.mapping_result?.similar_mappings
  const isSimilarMappingsExists = similarMappingList !== null && similarMappingList !== undefined

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
      <Td>
        <Text>{nomenclatureMappingResult.mapping_nomenclature_corrected}</Text>
      </Td>
      {/* Mapping created date */}
      <Td>
        <Text>{nomenclatureMappingResult.created_at}</Text>
      </Td>
    </Tr>
  )
}
