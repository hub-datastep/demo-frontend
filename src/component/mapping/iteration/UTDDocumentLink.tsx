import { Button } from "@chakra-ui/react"
import { FC } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { UTDDocument } from "type/mapping/iterationMetadatas"

interface UTDDocumentLinkProps {
  document: UTDDocument
}

export const UTDDocumentLink: FC<UTDDocumentLinkProps> = (props) => {
  const { document } = props

  const name = document.idn_file_name
  const url = document.idn_link

  return (
    <Link to={url} target="_blank" rel="noopener noreferrer">
      <Button size="sm" rightIcon={<FaExternalLinkAlt color="gray" />} gap={1}>
        {name}
      </Button>
    </Link>
  )
}
