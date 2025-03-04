import { Avatar, Flex, Text } from "@chakra-ui/react"
import { useSidebarContext } from "context/sidebarContext"
import { UserContext } from "context/userContext"
import { FC, useContext } from "react"

interface UserBtnProps {
  onClick: () => void
}

export const UserBtn: FC<UserBtnProps> = (props) => {
  const { onClick } = props

  const { isCollapsed } = useSidebarContext()

  const { username } = useContext(UserContext)

  return (
    <Flex
      bgColor="purple.500"
      w="full"
      direction="row"
      alignItems="center"
      px={2}
      py={4}
      color="white"
      fontSize="lg"
      fontWeight="medium"
      gap={3}
      onClick={onClick}
    >
      <Avatar size="sm" />

      {!isCollapsed && <Text>{username}</Text>}
    </Flex>
  )
}
