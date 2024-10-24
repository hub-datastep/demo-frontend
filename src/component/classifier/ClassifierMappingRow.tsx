import { Flex, Td, Text, Tr } from "@chakra-ui/react"
import { ClassifierCheckbox } from "component/classifier/ClassifierCheckbox"
import { MappingResponse } from "model/ClassifierModel"
import { FC } from "react"

interface ClassifierTableProps {
  mappingResponse: MappingResponse
}

export const ClassifierMappingRow: FC<ClassifierTableProps> = (props) => {
  const { mappingResponse } = props

  const mappingsList = mappingResponse.mappings
  const isMappingsExists = mappingsList !== null && mappingsList !== undefined

  const similarMappingList = mappingResponse.similar_mappings
  const isSimilarMappingsExists = similarMappingList !== null && similarMappingList !== undefined

  const isWrongGroup =
    isMappingsExists && mappingsList.find((mapping) => mapping.similarity_score === -1)

  return (
    <Tr whiteSpace="break-spaces">
      {/* Name of initial nomenclature (input from user) */}
      <Td>{mappingResponse.nomenclature}</Td>

      {/* Mapped nomenclature */}
      <Td>
        <Flex direction="column">
          {/* Show mapped nomenclatures */}
          {isMappingsExists && !isWrongGroup && <ClassifierCheckbox mappingsList={mappingsList} />}

          {/* Show similar nomenclatures */}
          {!isMappingsExists && !isWrongGroup && isSimilarMappingsExists && (
            <>
              <Text>Не нашлось номенклатуры с такими параметрами, но возможно Вы имели ввиду:</Text>
              <ClassifierCheckbox mappingsList={similarMappingList} />
            </>
          )}
        </Flex>
      </Td>

      {/* Nomenclature group name */}
      <Td>
        {isWrongGroup ? (
          <Text>{mappingsList![0].nomenclature}</Text>
        ) : (
          <Text>{mappingResponse.group}</Text>
        )}
      </Td>

      {/* Nomenclature view name */}
      <Td>
        <Text>{mappingResponse.view}</Text>
      </Td>
    </Tr>
  )
}
