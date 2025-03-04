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
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { SimilarNomenclature } from "type/mapping/similarNomenclature"
import { WithStrId } from "type/withId"

type SelectOption = WithStrId<SimilarNomenclature>

interface NSIGroupSelectProps {
  prevGroup?: SelectOption
  selectedGroup?: SelectOption
  onSelect: Dispatch<SetStateAction<SelectOption | undefined>>
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

export const NSIGroupSelect: FC<NSIGroupSelectProps> = (props) => {
  const { prevGroup, selectedGroup, onSelect } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<
    OptionsOrGroups<SelectOption, GroupBase<SelectOption>>
  >([])

  const predictedGroupOptionsGroup = {
    label: "Предложенные ИИ",
    options: prevGroup ? [prevGroup] : [],
  }

  const isSelectedValueInvalid = !selectedGroup

  const handleOptionsLoad = async (
    inputValue: string,
    _: (options: OptionsOrGroups<SelectOption, GroupBase<SelectOption>>) => void,
  ) => {
    setIsLoading(true)

    const similarGroups = await getSimilarNomenclatures({
      name: inputValue,
      is_group: true,
    })

    const groupedOptions = [
      predictedGroupOptionsGroup,
      {
        label: "Группы из НСИ",
        options: similarGroups,
      },
    ]
    setOptions(groupedOptions)
    setIsLoading(false)

    return groupedOptions
  }

  const handleSelect = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const selectedNomenclature = newValue as SelectOption
    onSelect(selectedNomenclature)
  }

  // Set predicted group if not selected (as default selected)
  useEffect(() => {
    if (!!prevGroup && !selectedGroup) {
      onSelect(prevGroup)
    }
  }, [onSelect, prevGroup, selectedGroup])

  // First fetch all groups
  useEffect(
    () => {
      handleOptionsLoad("", (loadedOptions) => setOptions(loadedOptions))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <AsyncSelect<SelectOption, false, GroupBase<SelectOption>>
      chakraStyles={selectStyles}
      placeholder="Введите группу"
      defaultOptions={options}
      loadOptions={handleOptionsLoad}
      getOptionLabel={(option) => option.name}
      value={selectedGroup || null}
      onChange={handleSelect}
      isSearchable
      isClearable
      noOptionsMessage={noOptionsMessage}
      isInvalid={isSelectedValueInvalid}
      isLoading={isLoading}
      formatGroupLabel={groupHeader}
      isOptionSelected={(option) =>
        selectedGroup ? option.id === selectedGroup.id : false
      }
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
        Такой группы не нашлось
      </Text>
    </Flex>
  )
}
