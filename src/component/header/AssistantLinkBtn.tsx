import { Button } from "@chakra-ui/react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

interface AssistantLinkBtnProps {
  title: string
  url: string
}

export const AssistantLinkBtn: FC<AssistantLinkBtnProps> = (props) => {
  const { title, url } = props
  const navigateTo = useNavigate()

  const handleRedirectClick = () => {
    navigateTo(`/${url}`)
  }

  return (
    <Button
      variant="solid"
      colorScheme="purple"
      backgroundColor="whiteAlpha.300"
      display="flex"
      justifyContent="flex-start"
      onClick={handleRedirectClick}
      whiteSpace="break-spaces"
    >
      {title}
    </Button>
  )
}
