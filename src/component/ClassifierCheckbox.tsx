import { Checkbox, CheckboxGroup } from "@chakra-ui/react"
import { MappingResponseItem } from "model/ClassifierModel"
import { FC, useState } from "react"

interface ClassifierCheckboxProps {
  mappingsList: MappingResponseItem[]
}

export const ClassifierCheckbox: FC<ClassifierCheckboxProps> = (props) => {
  const { mappingsList } = props

  const [checkedIndex, setCheckedIndex] = useState<number>(0)

  return (
    <CheckboxGroup>
      {mappingsList.map((mapping, index) => (
        <Checkbox
          key={index}
          isChecked={checkedIndex === index}
          onChange={() => {
            setCheckedIndex(index)
          }}
        >
          {mapping.nomenclature}
        </Checkbox>
      ))}
    </CheckboxGroup>
  )
}
