import { Button } from "@chakra-ui/react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

interface SidebarItemBtnProps {
  title: string
  url?: string
  isDisabled?: boolean
}

export const SidebarItemBtn: FC<SidebarItemBtnProps> = (props) => {
  const { title, url, isDisabled } = props

  const navigateTo = useNavigate()

  const isUrlExists = !!url
  const isRouteUnavailable = isDisabled || !isUrlExists

  const handleRedirectClick = () => {
    if (isRouteUnavailable) {
      return
    }

    navigateTo(`/${url}`)
  }

  return (
    <Button
      w="full"
      bgColor="whiteAlpha.300"
      variant="solid"
      colorScheme="purple"
      display="flex"
      justifyContent="flex-start"
      whiteSpace="break-spaces"
      mb={2}
      onClick={handleRedirectClick}
      isDisabled={isRouteUnavailable}
    >
      {title}
    </Button>
  )
}
