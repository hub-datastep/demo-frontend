import { Flex, Text } from "@chakra-ui/react"
import { getSimilarNomenclatures } from "api/mapping/result/similarNomenclatures"
import {
  ActionMeta,
  AsyncSelect,
  ChakraStylesConfig,
  GroupBase,
  OptionsOrGroups,
  SingleValue,
} from "chakra-react-select"
import { Dispatch, FC, SetStateAction } from "react"
import { SimilarNomenclature } from "type/mapping/similarNomenclature"
import { WithId } from "type/withId"

type SelectOption = WithId<SimilarNomenclature>

interface NomenclatureSelectProps {
  selectedNomenclature?: SelectOption
  onSelect: (selectedNomenclature: SelectOption) => void
  isDisabled?: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const styles: ChakraStylesConfig<SelectOption, false, GroupBase<SelectOption>> = {
  container: (provided) => ({
    ...provided,
    width: "full",
  }),
}

export const NomenclatureSelect: FC<NomenclatureSelectProps> = (props) => {
  const { selectedNomenclature, onSelect, isDisabled, setIsVisible } = props

  const isSelectedValueInvalid = !selectedNomenclature

  const handleLoadOptions = async (
    inputValue: string,
    _: (options: OptionsOrGroups<SelectOption, GroupBase<SelectOption>>) => void,
  ) => {
    const similarNoms = await getSimilarNomenclatures({
      name: inputValue,
    })

    return similarNoms
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
      chakraStyles={styles}
      placeholder="Введите номенклатуру"
      loadOptions={handleLoadOptions}
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
    />
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
