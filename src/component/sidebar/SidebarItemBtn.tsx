import { Button } from "@chakra-ui/react"
import { Route } from "configuration"
import { UserContext } from "context/userContext"
import { UserModel } from "model/UserModel"
import { FC, useContext } from "react"
import { useNavigate } from "react-router-dom"

interface SidebarItemBtnProps {
  route: Route
}

export const SidebarItemBtn: FC<SidebarItemBtnProps> = (props) => {
  const { route } = props

  const user = useContext<UserModel>(UserContext)

  const routeMode = route.mode?.toUpperCase()
  const isRouteRequireMode = !!routeMode
  const userModesNames = user.tenant.modes.map((mode) => mode.name.toUpperCase())

  const navigateTo = useNavigate()

  const isUrlExists = !!route.url
  const isUserHasRequiredMode = !isRouteRequireMode || userModesNames.includes(routeMode)
  const isRouteUnavailable = route.isDisabled || !isUrlExists || !isUserHasRequiredMode

  const handleRedirectClick = () => {
    if (isRouteUnavailable) {
      return
    }

    navigateTo(`/${route.url}`)
  }

  return (
    <Button
      w="full"
      bgColor="purple.300"
      variant="solid"
      colorScheme="purple"
      display="flex"
      justifyContent="flex-start"
      whiteSpace="break-spaces"
      mb={2}
      onClick={handleRedirectClick}
      isDisabled={isRouteUnavailable}
    >
      {route.title}
    </Button>
  )
}
