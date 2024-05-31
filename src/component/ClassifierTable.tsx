import { Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { ClassifierCheckbox } from "component/ClassifierCheckbox"
import { MappingResponse } from "model/ClassifierModel"
import { FC, useState } from "react"

interface ClassifierTableProps {
  mappingResponseList: MappingResponse[]
}
const INITIAL_TABLE_ROWS_COUNT = 3
const COLUMNS_NAME = ["Номенклатура поставщика", "Номенклатура", "Группа"]

export const ClassifierTable: FC<ClassifierTableProps> = (props) => {
  const { mappingResponseList } = props

  const [visibleRowsNumber, setVisibleRowsNumber] = useState<number>(INITIAL_TABLE_ROWS_COUNT)

  const isTableFullVisible = visibleRowsNumber === mappingResponseList.length

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
          {mappingResponseList.slice(0, visibleRowsNumber).map((row, index) => {
            const isWrongGroup = row.mappings?.find((mapping) => mapping.similarity_score === -1)

            return (
              <Tr key={index}>
                <Td whiteSpace="pre-wrap">{row.nomenclature}</Td>
                <Td whiteSpace="pre-wrap">
                  {isWrongGroup ? (
                    <Text>{row.mappings![0].nomenclature}</Text>
                  ) : (
                    <>
                      {row.mappings ? <ClassifierCheckbox mappingsList={row.mappings} /> : "Не найдено"}
                    </>
                  )}
                </Td>
                <Td whiteSpace="pre-wrap">{isWrongGroup ? "" : row.group_name}</Td>
              </Tr>
            )
          })}
          <Tr>
            <Td colSpan={COLUMNS_NAME.length} p={0}>
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
