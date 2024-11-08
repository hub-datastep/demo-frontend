import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { ResultsRow } from "component/demo/ResultsRow"
import { SolutionImitationResponseItem } from "model/SolutionImitation"
import { FC } from "react"

interface ResultsTableProps {
  solutionType?: string
  solutionTable: SolutionImitationResponseItem[]
}

const COLUMNS_NAME = ["ID", "Входной элемент", "Результат", "Комментарий"]

export const ResultsTable: FC<ResultsTableProps> = (props) => {
  const { solutionType, solutionTable } = props

  return (
    <Table w="full" variant="striped">
      <Thead>
        <Tr>
          {COLUMNS_NAME.map((column, index) => (
            <Th key={index}>{column}</Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {solutionTable.map((row, index) => (
          <ResultsRow key={index} solutionType={solutionType} row={row} />
        ))}
      </Tbody>
    </Table>
  )
}
