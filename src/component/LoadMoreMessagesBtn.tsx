import { IconButton } from "@chakra-ui/react"
import { ModeContext, ModeContextI } from "context/modeContext"
import { FC, useContext } from "react"
import { TbSquareRoundedArrowUpFilled } from "react-icons/tb"

interface LoadMoreMessagesBtnProps {
  isLoading: boolean
}

export const LoadMoreMessagesBtn: FC<LoadMoreMessagesBtnProps> = (props) => {
    const { isLoading }  = props

    const { setShownMessageCount } = useContext<ModeContextI>(ModeContext)

    const handleShowMore = () => {
        if (!isLoading) {
            setShownMessageCount((lastN) => lastN + 10)
        }
    }

    return (
        <IconButton
            aria-label="Load more messages"
            icon={<TbSquareRoundedArrowUpFilled size={36} />}
            title="Прошлые сообщения"
            variant="ghost"
            color="purple.400"
            onClick={handleShowMore}
        />
    )
}
