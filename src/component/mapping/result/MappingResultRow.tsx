import { Flex, Td, Text, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { MappingResult } from "type/mapping/result"

interface MappingResultRowProps {
  mappingResult: MappingResult
}

export const MappingResultRow: FC<MappingResultRowProps> = (props) => {
  const { mappingResult } = props

  // const [isSearchVisible, setIsSearchVisible] = useState(false)

  // const correctedNomenclatureMutation = useCorrectedNomenclature()

  const mappingsList = mappingResult.result?.mappings
  const isMappingsExists = !!mappingsList && mappingsList.length > 0

  const similarMappingsList = mappingResult.result?.similar_mappings
  const isSimilarMappingsExists = !!similarMappingsList && similarMappingsList.length > 0

  // const handleIncorrectMapping = () => {
  //   setIsSearchVisible(true)
  // }

  // const handleSelect = async (selectedSimilarNomecnlature: string) => {
  //   const updatedNomenclature: MappingResultUpdate = {
  //     id: nomenclatureMappingResult.id,
  //     mapping_nomenclature_corrected: selectedSimilarNomecnlature,
  //   }
  //   await correctedNomenclatureMutation.mutateAsync(updatedNomenclature)
  //   setIsSearchVisible(false)
  // }

  return (
    <Tr whiteSpace="break-spaces">
      {/* Initial nomenclature */}
      <Td>
        <Text>{mappingResult.result?.nomenclature}</Text>
      </Td>

      {/* Mapped Nomenclature */}
      <Td>
        {/* Mappings */}
        {isMappingsExists && <Text>{mappingsList[0].nomenclature}</Text>}

        {/* Similar Mappings */}
        {!isMappingsExists && isSimilarMappingsExists && (
          <Flex direction="column" gap={2}>
            <Text>
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
        <Text>{mappingResult.result?.group}</Text>
      </Td>

      {/* Corrected Nomenclature */}
      <Td p={0}>
        {/* TODO: set corrected nomenclature */}

        {/* {isSearchVisible ? (
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
        )} */}
      </Td>
    </Tr>
  )
}
