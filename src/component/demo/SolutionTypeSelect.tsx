import { Select } from "@chakra-ui/react"
import { SOLUTION_TYPES_LIST } from "constant/solutionTypes"
import { ChangeEvent, FC } from "react"

interface SolutionTypeSelectProps {
  solutionType?: string
  setSolutionType: (type: string) => void
  isLoading?: boolean
}

export const SolutionTypeSelect: FC<SolutionTypeSelectProps> = (props) => {
  const { solutionType, setSolutionType, isLoading } = props

  // const isSelected = !!solutionType

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value
    setSolutionType(selectedType)
  }

  return (
    <Select
      w="fit-content"
      variant="filled"
      placeholder="Select type"
      value={solutionType}
      onChange={handleSelect}
      // isInvalid={!isSelected}
      isDisabled={isLoading}
    >
      {SOLUTION_TYPES_LIST.map((type, index) => (
        <option key={index} value={type}>
          {type.toUpperCase()}
        </option>
      ))}
    </Select>
  )
}
