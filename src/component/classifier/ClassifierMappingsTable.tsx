import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { ClassifierMappingRow } from "component/classifier/ClassifierMappingRow"
import { MappingResponse } from "model/ClassifierModel"
import { FC, useState } from "react"

interface ClassifierMappingsTableProps {
  mappingResponseList: MappingResponse[]
}

const INITIAL_TABLE_ROWS_COUNT = 3
const COLUMNS_NAME = ["Номенклатура поставщика", "Номенклатура", "Группа"]

export const ClassifierMappingsTable: FC<ClassifierMappingsTableProps> = (props) => {
  const { mappingResponseList } = props

  const [visibleRowsNumber, setVisibleRowsNumber] = useState<number>(INITIAL_TABLE_ROWS_COUNT)

  const isTableFullVisible = visibleRowsNumber === mappingResponseList.length
  const needShowOrHideBtn = mappingResponseList.length > visibleRowsNumber

  const showOrHideRows = () => {
    if (isTableFullVisible) {
      setVisibleRowsNumber(INITIAL_TABLE_ROWS_COUNT)
    } else {
      setVisibleRowsNumber(mappingResponseList.length)
    }
  }

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            {COLUMNS_NAME.map((column, index) => (
              <Th key={index}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {mappingResponseList.slice(0, visibleRowsNumber).map((row, index) => (
            <ClassifierMappingRow key={index} mappingResponse={row} />
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
