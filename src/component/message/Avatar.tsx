import { Avatar as ChakraAvatar } from "@chakra-ui/react"
import { IAvatar } from "component/message/types"
import { FC } from "react"

export const Avatar: FC<IAvatar> = ({ name, src }) => {
  return <ChakraAvatar size="md" name={name} src={src} />
}
