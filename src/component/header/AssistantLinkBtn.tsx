import { Button } from "@chakra-ui/react"
import { FC } from "react"
import { Link } from "react-router-dom"

interface AssistantLinkBtnProps {
  title: string
  assistant: "databases" | "documents"
}

export const AssistantLinkBtn: FC<AssistantLinkBtnProps> = (props) => {
  const { title, assistant } = props

  return (
    <Button
      as={Link}
      to={`/${assistant}`}
      variant="solid"
      colorScheme="purple"
      backgroundColor="whiteAlpha.300"
      display="flex"
      justifyContent="flex-start"
    >
      {title}
    </Button>
  )
}
