import { Button, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { FC } from "react"

interface QueryTableSelectProps {
  tables?: string[]
  table?: string
  isTablesLoading: boolean
  handleTableSelectChange: (table: string) => void
}

export const QueryTableSelect: FC<QueryTableSelectProps> = (props) => {
  const { tables, table, isTablesLoading, handleTableSelectChange } = props

  return (
    <Menu>
      <MenuButton isLoading={isTablesLoading} as={Button} variant="outline" colorScheme="gray">
        <Text fontSize="sm">{table ? `Таблица: ${table}` : "Выбрать таблицу"}</Text>
      </MenuButton>

      <MenuList>
        <MenuGroup>
          {tables?.map((table, key) => (
            <MenuItem key={key} onClick={() => handleTableSelectChange(table)}>
              {table}
            </MenuItem>
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
