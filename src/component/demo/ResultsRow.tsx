import { Td, Text, Tr } from "@chakra-ui/react"
import { SolutionType } from "constant/solutionTypes"
import { SolutionImitationResponseItem } from "model/SolutionImitation"
import { FC } from "react"

interface ResultsRowProps {
  solutionType?: string
  row: SolutionImitationResponseItem
}

export const ResultsRow: FC<ResultsRowProps> = (props) => {
  const { solutionType, row } = props

  const isIFCType = solutionType === SolutionType.IFC

  const inputParams = row.input_item.split(";")

  return (
    <Tr>
      {/* ID */}
      <Td>{row.id}</Td>

      {/* Input */}
      <Td>
        {isIFCType ? (
          <>
            {/* CIM Model */}
            <Text>
              <b>Название CIM модели:</b> {inputParams[0]}
            </Text>

            {/* Type */}
            <Text>
              <b>Тип:</b> {inputParams[1]}
            </Text>

            {/* Material */}
            <Text>
              <b>Материал:</b> {inputParams[2]}
            </Text>
          </>
        ) : (
          <Text>{row.input_item}</Text>
        )}
      </Td>

      {/* Output */}
      <Td>
        {isIFCType ? (
          <Text>
            <b>Работа:</b> {row.output_item}
          </Text>
        ) : (
          <Text>{row.output_item}</Text>
        )}
      </Td>

      {/* Comment & Additional info */}
      <Td>{row.additional_info}</Td>
    </Tr>
  )
}
