import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { ClassifierResultMappingRow } from "component/classifier/ClassifierResultMappingRow"
import { MappingResult } from "model/ClassifierModel"
import { FC, useState } from "react"

interface ClassifierResultMappingsTableProps {
  nomenclatureMappingResults: MappingResult[]
}

const INITIAL_TABLE_ROWS_COUNT = 5
const COLUMNS_NAME = [
  "Номенклатура поставщика",
  "Номенклатура",
  "Группа",
  "Корректная номенклатура",
  "Дата создания",
  "",
]

export const ClassifierResultMappingsTable: FC<ClassifierResultMappingsTableProps> = (props) => {
  const { nomenclatureMappingResults } = props
  const [visibleRowsNumber, setVisibleRowsNumber] = useState<number>(INITIAL_TABLE_ROWS_COUNT)

  const isTableFullVisible = visibleRowsNumber === nomenclatureMappingResults.length
  const needShowOrHideBtn = nomenclatureMappingResults.length > visibleRowsNumber

  const showOrHideRows = () => {
    if (isTableFullVisible) {
      setVisibleRowsNumber(INITIAL_TABLE_ROWS_COUNT)
    } else {
      setVisibleRowsNumber(nomenclatureMappingResults.length)
    }
  }

  return (
    <TableContainer whiteSpace="pre-wrap" overflowY="auto">
      <Table variant="striped" w="full">
        <Thead>
          <Tr>
            {COLUMNS_NAME.map((column, index) => (
              <Th key={index}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {nomenclatureMappingResults.slice(0, visibleRowsNumber).map((row, index) => (
            <ClassifierResultMappingRow key={index} nomenclatureMappingResult={row} />
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
