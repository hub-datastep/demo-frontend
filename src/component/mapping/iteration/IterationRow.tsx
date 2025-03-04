import { Button, Td, Text, Tr } from "@chakra-ui/react"
import { IterationStatusBadge } from "component/mapping/iteration/IterationStatusBadge"
import { IterationTypeBadge } from "component/mapping/iteration/IterationTypeBadge"
import { FC } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { MappingIteration } from "type/mapping/iteration"
import { WithStrId } from "type/withId"
import { dateAsStringToDate, formatDateTime } from "util/formatting/date"

interface IterationRowProps {
  iteration: WithStrId<MappingIteration>
}

export const IterationRow: FC<IterationRowProps> = (props) => {
  const { iteration } = props

  const iteraionId = iteration.id
  const iterationType = iteration.type
  const iterationStatus = iteration.status
  const createdAt = dateAsStringToDate(iteration.created_at)

  const resultsUrl = `/mapping/result/iteration/${iteraionId}`

  return (
    <Tr>
      {/* ID */}
      <Td>
        <Text>{iteraionId}</Text>
      </Td>

      {/* Type */}
      <Td>
        <IterationTypeBadge size="sm" type={iterationType} />
      </Td>

      {/* Status */}
      <Td>
        <IterationStatusBadge size="sm" status={iterationStatus} />
      </Td>

      {/* Created At */}
      <Td>
        <Text>{formatDateTime(createdAt)}</Text>
      </Td>

      {/* Redirect Btn */}
      <Td>
        <Link to={resultsUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" rightIcon={<FaExternalLinkAlt />} gap={1}>
            Посмотреть результаты
          </Button>
        </Link>
      </Td>
    </Tr>
  )
}
