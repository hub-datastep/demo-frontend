import { FC } from "react"
import "github-markdown-css"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { IMarkdown } from "component/Message/types"
import { Text } from "@chakra-ui/react"

const Markdown: FC<IMarkdown> = ({ children }) => {
    return (
        <Text className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
        </Text>
    )
}

export default Markdown