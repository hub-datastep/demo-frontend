import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react"
import { ISkeletonMessage } from "component/message/types"

const SkeletonMessage = ({ direction, width, height }: ISkeletonMessage) => {
    let justify, flexDirection

    if (direction === "incoming") {
        justify = "start" as const
        flexDirection = "row" as const
    }

    if (direction === "outgoing") {
        justify = "end" as const
        flexDirection = "row-reverse" as const
    }

    return (
        <Flex
            justify={justify}
            flexDirection={flexDirection}
            gap="10px"
        >
            <SkeletonCircle endColor="purple.100" size="10" />
            <Skeleton endColor="purple.100" height={height} width={width} />
        </Flex>
    )
}

export default SkeletonMessage