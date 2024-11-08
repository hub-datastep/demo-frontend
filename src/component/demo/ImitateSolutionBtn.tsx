import { Button } from "@chakra-ui/react"
import { FC } from "react"
import { FaRocket } from "react-icons/fa"

interface ImitateSolutionBtnProps {
  onClick: () => void
  isDisabled?: boolean
}

export const ImitateSolutionBtn: FC<ImitateSolutionBtnProps> = (props) => {
  const { onClick, isDisabled } = props

  return (
    <Button
      colorScheme="purple"
      leftIcon={<FaRocket />}
      onClick={onClick}
      isDisabled={isDisabled}
    >
      Запустить
    </Button>
  )
}
