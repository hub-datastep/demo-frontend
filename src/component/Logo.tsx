import { Image } from "@chakra-ui/react"
import { FC } from "react"

import logoDark from "assets/logo/datastep-logo-dark.svg"
import logoIcon from "assets/logo/datastep-logo-icon.svg"
import logoLight from "assets/logo/datastep-logo-light.svg"

interface LogoProps {
  imageSize?: string
  isDark?: boolean
  isIconOnly?: boolean
}

export const Logo: FC<LogoProps> = (props) => {
  const { imageSize, isDark, isIconOnly } = props

  let logoPath
  if (isIconOnly) {
    logoPath = logoIcon
  } else if (isDark) {
    logoPath = logoDark
  } else {
    logoPath = logoLight
  }

  return <Image w={imageSize} src={logoPath} alt="Datastep Logo" />
}
