import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { IterationRow } from "component/mapping/iteration/IterationRow"
import { FC } from "react"
import { MappingIteration } from "type/mapping/iteration"
import { WithStrId } from "type/withId"

interface IterationsTableProps {
  iterations: WithStrId<MappingIteration>[]
}

const COLUMNS_NAME = ["ID Итерации", "Тип Итерации", "Статус", "Дата Создания", ""]

export const IterationsTable: FC<IterationsTableProps> = (props) => {
  const { iterations } = props

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
        {iterations.map((iteration, index) => (
          <IterationRow key={index} iteration={iteration} />
        ))}
      </Tbody>
    </Table>
  )
}
