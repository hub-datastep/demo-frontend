import { Flex, Text } from "@chakra-ui/react"
import { getSimilarNomenclatures } from "api/mapping/similarNomenclatures"
import {
  ActionMeta,
  AsyncSelect,
  ChakraStylesConfig,
  GroupBase,
  OptionsOrGroups,
  SingleValue,
} from "chakra-react-select"
import { MappingResponse } from "model/ClassifierModel"
import { Dispatch, FC, SetStateAction } from "react"
import { SimilarNomenclature } from "type/mapping/similarNomenclature"
import { WithStrId } from "type/withId"

type SelectOption = WithStrId<SimilarNomenclature>

interface NomenclatureSelectProps {
  prevResult?: MappingResponse
  selectedNomenclature?: SelectOption
  onSelect: (selectedNomenclature: SelectOption) => void
  isDisabled?: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const selectStyles: ChakraStylesConfig<SelectOption, false, GroupBase<SelectOption>> = {
  container: (provided) => ({
    ...provided,
    width: "full",
  }),
  groupHeading: (provided) => ({
    ...provided,
    width: "full",
    padding: 0,
    margin: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    whiteSpace: "normal",
  }),
}

const NOMENCLATURE_NOT_FOUND_VARIANT: SelectOption = {
  id: "-1",
  name: "В НСИ нет подходящего варианта",
  material_code: null,
}

const filterEmptyNomenclatures = (nomenclaturesList: SelectOption[]): SelectOption[] => {
  const filteredNomenclaturesList = nomenclaturesList.filter((nom) => !!nom.name)
  return filteredNomenclaturesList
}

const getPrevNomenclatures = (prevResult?: MappingResponse): SelectOption[] => {
  // If mappings exists
  if (!!prevResult?.mappings) {
    const nomenclaturesList = prevResult.mappings.map((mapping) => ({
      id: mapping.nomenclature_guid,
      name: mapping.nomenclature,
      material_code: mapping.material_code,
    }))
    return filterEmptyNomenclatures(nomenclaturesList)
  }

  // If similar mappings exists
  if (!!prevResult?.similar_mappings) {
    const nomenclaturesList = prevResult.similar_mappings.map((mapping) => ({
      id: mapping.nomenclature_guid,
      name: mapping.nomenclature,
      material_code: mapping.material_code,
    }))
    return filterEmptyNomenclatures(nomenclaturesList)
  }

  return []
}

export const NomenclatureSelect: FC<NomenclatureSelectProps> = (props) => {
  const { prevResult, selectedNomenclature, onSelect, isDisabled, setIsVisible } = props

  const prevNomenclatures = getPrevNomenclatures(prevResult)

  const predictedNomenclaturesOptionsGroup = {
    label: "Предложенные ИИ",
    options: prevNomenclatures,
  }

  const isSelectedValueInvalid = !selectedNomenclature

  const handleOptionsLoad = async (
    inputValue: string,
    _: (options: OptionsOrGroups<SelectOption, GroupBase<SelectOption>>) => void,
  ) => {
    const similarNoms = await getSimilarNomenclatures({
      name: inputValue,
    })

    const groupedOptions = [
      predictedNomenclaturesOptionsGroup,
      {
        label: "Номенклатуры из НСИ",
        options: [NOMENCLATURE_NOT_FOUND_VARIANT, ...similarNoms],
      },
    ]

    return groupedOptions
  }

  const handleSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const selectedNomenclature = newValue as SelectOption
    onSelect(selectedNomenclature)
  }

  const handleBlur = () => {
    setIsVisible(false)
  }

  return (
    <AsyncSelect<SelectOption, false, GroupBase<SelectOption>>
      chakraStyles={selectStyles}
      placeholder="Введите номенклатуру"
      defaultOptions={[predictedNomenclaturesOptionsGroup]}
      loadOptions={handleOptionsLoad}
      getOptionLabel={(option) => option.name}
      value={selectedNomenclature || null}
      onChange={handleSelect}
      onBlur={handleBlur}
      autoFocus
      isSearchable
      isClearable
      noOptionsMessage={noOptionsMessage}
      isInvalid={isSelectedValueInvalid}
      isDisabled={isDisabled}
      formatGroupLabel={groupHeader}
    />
  )
}

const groupHeader = (group: GroupBase<SelectOption>) => {
  return (
    <Flex
      bgColor="gray.200"
      w="full"
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      px={2}
      py={2}
    >
      <Text fontSize="sm" fontWeight="bold" textAlign="left">
        {group.label}
      </Text>
    </Flex>
  )
}

const noOptionsMessage = () => {
  return (
    <Flex w="full" justifyContent="center" px={3}>
      <Text color="gray" textAlign="center">
        Начните вводить номенклатуру
      </Text>
    </Flex>
  )
}
