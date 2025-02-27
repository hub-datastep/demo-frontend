import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { MappingResultRow } from "component/mapping/result/MappingResultRow"
import { FC } from "react"
import { CorrectedResult, MappingResult } from "type/mapping/result"
import { WithId } from "type/withId"

interface MappingResultsTableProps {
  results: WithId<MappingResult>[]
  correctedResults: CorrectedResult[]
  onCorrectNomenclatureSelect: (result: CorrectedResult) => void
}

const COLUMNS_NAME = [
  "Номенклатура Поставщика",
  "Сопоставленная Номенклатура из НСИ",
  "Сопоставленная Группа из НСИ",
  "Корректная Номенклатура",
  "Объяснение почему неверно сопоставили",
]

export const MappingResultsTable: FC<MappingResultsTableProps> = (props) => {
  const { results, correctedResults, onCorrectNomenclatureSelect } = props

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
        {results.map((result, index) => (
          <MappingResultRow
            key={index}
            mappingResult={result}
            correctedResults={correctedResults}
            onCorrectNomenclatureSelect={onCorrectNomenclatureSelect}
          />
        ))}
      </Tbody>
    </Table>
  )
}
