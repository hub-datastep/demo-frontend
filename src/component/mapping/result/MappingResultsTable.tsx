import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { MappingResultRow } from "component/mapping/result/MappingResultRow"
import { FC, useState } from "react"
import { CorrectedResult, MappingResult } from "type/mapping/result"
import { WithId } from "type/withId"

interface MappingResultsTableProps {
  results: WithId<MappingResult>[]
  correctedResults: CorrectedResult[]
  onCorrectNomenclatureSelect: (result: CorrectedResult) => void
}

const INITIAL_TABLE_ROWS_COUNT = 5

const COLUMNS_NAME = [
  "Номенклатура Поставщика",
  "Сопоставленная Номенклатура из НСИ",
  "Сопоставленная Группа из НСИ",
  "Корректная Номенклатура",
]

export const MappingResultsTable: FC<MappingResultsTableProps> = (props) => {
  const { results, correctedResults, onCorrectNomenclatureSelect } = props

  const [visibleRowsNumber, setVisibleRowsNumber] = useState<number>(
    INITIAL_TABLE_ROWS_COUNT,
  )

  const isTableFullVisible = visibleRowsNumber === results.length
  const needShowOrHideBtn = results.length > visibleRowsNumber

  const showOrHideRows = () => {
    if (isTableFullVisible) {
      setVisibleRowsNumber(INITIAL_TABLE_ROWS_COUNT)
    } else {
      setVisibleRowsNumber(results.length)
    }
  }

  return (
    <TableContainer>
      <Table w="full" variant="striped">
        <Thead>
          <Tr>
            {COLUMNS_NAME.map((column, index) => (
              <Th
                key={index}
                //  whiteSpace="break-spaces"
              >
                {column}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {results.slice(0, visibleRowsNumber).map((result, index) => (
            <MappingResultRow
              key={index}
              mappingResult={result}
              correctedResults={correctedResults}
              onCorrectNomenclatureSelect={onCorrectNomenclatureSelect}
            />
          ))}

          {needShowOrHideBtn && (
            <Tr>
              <Td colSpan={COLUMNS_NAME.length} p={0}>
                <Button w="full" variant="ghost" onClick={showOrHideRows}>
                  {isTableFullVisible ? "Скрыть" : "Показать больше"}
                </Button>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
