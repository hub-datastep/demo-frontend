import { Button } from "@chakra-ui/react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

interface AssistantLinkBtnProps {
  title: string
  assistant: "databases" | "documents" | "classifier"
}

export const AssistantLinkBtn: FC<AssistantLinkBtnProps> = (props) => {
  const { title, assistant } = props
  const navigateTo = useNavigate()

  const handleRedirectClick = () => {
    navigateTo(`/${assistant}`)
  }

  return (
    <Button
      variant="solid"
      colorScheme="purple"
      backgroundColor="whiteAlpha.300"
      display="flex"
      justifyContent="flex-start"
      onClick={handleRedirectClick}
    >
      {title}
    </Button>
  )
}
