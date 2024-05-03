import { Image } from "@chakra-ui/react"
import { FC } from "react"

interface LogoProps {
    isDark?: boolean
}

const Logo: FC<LogoProps> = ({ isDark }) => {
    if (isDark) {
        return (
            <Image src="/image/logo/datastep-logo-dark.svg" alt="logo" />
        )
    }

    return (
        <Image src="/image/logo/datastep-logo-light.svg" alt="logo" />
    )
}

export default Logo
