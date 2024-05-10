import { Message } from "component/message/Message"
import { FC } from "react"

export const DefaultMessage: FC = () => {
  return (
    <Message direction="incoming" messageId={-1} src="/image/avatar/bot.svg" callback={false}>
      Какой у вас запрос?
    </Message>
  )
}
