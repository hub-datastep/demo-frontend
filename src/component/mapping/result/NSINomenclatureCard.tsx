import { Button, Flex, Text } from "@chakra-ui/react"
import { PossiblyEmptyParam } from "component/PossiblyEmptyParam"
import { FC } from "react"
import { SimilarNomenclature } from "type/mapping/similarNomenclature"
import { WithStrId } from "type/withId"

interface NSINomenclatureCardProps {
  nomenclature: WithStrId<SimilarNomenclature>
  onClick: (selectedNomenclature: WithStrId<SimilarNomenclature>) => void
  onClose: () => void
  isLoading?: boolean
}

export const NSINomenclatureCard: FC<NSINomenclatureCardProps> = (props) => {
  const { nomenclature, onClick, onClose, isLoading } = props

  const name = nomenclature.name
  const group = nomenclature.group

  const handleClick = () => {
    onClick(nomenclature)
    onClose()
  }

  return (
    <Flex
      bgColor="purple.50"
      w="full"
      direction="row"
      alignItems="center"
      px={4}
      py={2}
      borderRadius={10}
      gap={5}
    >
      {/* Nomenclature Data */}
      <Flex w="full" direction="column" gap={1}>
        {/* Name */}
        <Text fontWeight="medium">
          <PossiblyEmptyParam value={name} />
        </Text>

        {/* Group */}
        {!!group && <Text color="gray.400">{group}</Text>}
      </Flex>

      {/* Select Btn */}
      <Button
        size="sm"
        colorScheme="purple"
        variant="ghost"
        onClick={handleClick}
        isLoading={isLoading}
      >
        Выбрать
      </Button>
    </Flex>
  )
}
