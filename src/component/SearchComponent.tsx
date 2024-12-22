import { CloseButton, InputGroup, InputRightElement } from "@chakra-ui/react"
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete"
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { useSimilarNomenclatures } from "service/mappingService"

interface SearchComponentProps {
  onSelect: (item: string) => void
  isDisabled: boolean
  setIsSearchVisible: Dispatch<SetStateAction<boolean>>
}

const SearchComponent: FC<SearchComponentProps> = ({
  onSelect,
  isDisabled,
  setIsSearchVisible,
}) => {
  const [similarNomenclatures, setSimilarNomenclatures] = useState<string[]>([])
  const [query, setQuery] = useState<string>("")

  const similarNomenclaturesMutation = useSimilarNomenclatures()

  useEffect(
    () => {
      const timeoutId = setTimeout(() => {
        const handleSearch = async () => {
          if (query.length === 0) {
            setSimilarNomenclatures([])
            return
          }

          const similarNomenclatures = await similarNomenclaturesMutation.mutateAsync(
            query
          )
          setSimilarNomenclatures(similarNomenclatures)
        }

        handleSearch()
      }, 500)

      return () => clearTimeout(timeoutId)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  )

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <AutoComplete openOnFocus isLoading={similarNomenclaturesMutation.isLoading}>
      <InputGroup>
        <AutoCompleteInput
          w="full"
          bgColor="white"
          variant="outline"
          placeholder="Введите корректную номенклатуру"
          value={query}
          onChange={handleOnSearch}
          isDisabled={isDisabled}
        />
        <InputRightElement>
          <CloseButton onClick={() => setIsSearchVisible(false)} />
        </InputRightElement>
      </InputGroup>

      <AutoCompleteList>
        {similarNomenclatures.map((nomenclature, index) => (
          <AutoCompleteItem
            key={index}
            value={nomenclature}
            onClick={() => onSelect(nomenclature)}
          >
            {nomenclature}
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  )
}

export default SearchComponent
