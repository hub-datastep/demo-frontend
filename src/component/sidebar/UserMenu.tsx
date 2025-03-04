import { Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react"
import { SignOutBtn } from "component/sidebar/SignOutBtn"
import { UserBtn } from "component/sidebar/UserBtn"
import { FC } from "react"

export const UserMenu: FC = () => {
  const { onOpen: onMenuOpen } = useDisclosure()

  return (
    <Menu>
      <MenuButton>
        <UserBtn onClick={onMenuOpen} />
      </MenuButton>

      <MenuList>
        {/* Sign Out Btn */}
        <MenuItem color="red">
          <SignOutBtn />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
