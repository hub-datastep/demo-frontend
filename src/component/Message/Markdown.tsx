import { IMarkdown } from "component/Message/types"
import { FC } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

// У сообщений бота на вкладке с результатами, у таблицы нет границ
// Эти стили решают проблему, края добавляются :3
import "component/Message/markdown.css"

const Markdown: FC<IMarkdown> = ({ children }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
        >
            {children}
        </ReactMarkdown>
    )
}

export default Markdown
