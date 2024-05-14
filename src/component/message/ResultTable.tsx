import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { parseMarkdownTable } from "misc/markdown-table"
import { FC, useEffect, useState } from "react"

interface ResultTableProps {
  markdownTable: string
}

const INITIAL_TABLE_ROWS_COUNT = 3

export const ResultTable: FC<ResultTableProps> = (props) => {
  const { markdownTable } = props

  const [visibleRowsNumber, setVisibleRowsNumber] = useState<number>(INITIAL_TABLE_ROWS_COUNT)
  const [columnsNames, setColumnsName] = useState<string[]>([])
  const [tableRows, setTableRows] = useState<string[][]>([])

  const isTableFullVisible = visibleRowsNumber === tableRows.length

  const showOrHideRows = () => {
    if (isTableFullVisible) {
      setVisibleRowsNumber(INITIAL_TABLE_ROWS_COUNT)
    } else {
      setVisibleRowsNumber(tableRows.length)
    }
  }

  useEffect(() => {
    const { columns, rows } = parseMarkdownTable(markdownTable)
    setColumnsName(columns)
    setTableRows(rows)
  }, [markdownTable])

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            {columnsNames.map((column, index) => (
              <Th key={index}>{column.trim()}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableRows.slice(0, visibleRowsNumber).map((row, index) => (
            <Tr key={index}>
              {row.map((data, index) => (
                <Td key={index}>{data.trim()}</Td>
              ))}
            </Tr>
          ))}
          <Tr>
            <Td colSpan={columnsNames.length} p={0}>
              <Button w="full" variant="ghost" onClick={showOrHideRows}>
                {isTableFullVisible ? "Скрыть" : "Показать больше"}
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
