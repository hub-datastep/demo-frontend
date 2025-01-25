import { Flex, Heading } from "@chakra-ui/react"
import { FCC } from "type/fcc"

interface PageHeadingProps {
  // isSearchHidden?: boolean
  // isSearchDisabled?: boolean
}

export const PageHeading: FCC<PageHeadingProps> = (props) => {
  const {
    children,
    // isSearchHidden,
    // isSearchDisabled,
  } = props

  return (
    <Flex w="full" justifyContent="space-between" pb={5}>
      {/* Page Title */}
      <Flex direction="column">
        <Heading>{children}</Heading>
      </Flex>
    </Flex>
  )
}
