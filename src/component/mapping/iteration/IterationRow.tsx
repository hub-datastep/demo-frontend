import { Button, Td, Text, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import { useNavigate } from "react-router"
import { MappingIteration } from "type/mapping/iteration"
import { WithStrId } from "type/withId"

interface IterationRowProps {
  iteration: WithStrId<MappingIteration>
}

export const IterationRow: FC<IterationRowProps> = (props) => {
  const { iteration } = props

  const navigate = useNavigate()

  const iteraionId = iteration.id
  const iterationType = iteration.type
  // TODO: convert string to Date
  const createdAt = iteration.created_at

  const handleRedirect = () => {
    navigate(`/mapping/result/iteration/${iteraionId}`)
  }

  return (
    <Tr>
      {/* ID */}
      <Td>
        <Text>{iteraionId}</Text>
      </Td>

      {/* Type */}
      <Td>
        <Text>{iterationType}</Text>
      </Td>

      {/* Created At */}
      <Td>
        <Text>{createdAt}</Text>
      </Td>

      {/* Redirect Btn */}
      <Td>
        <Button
          variant="ghost"
          onClick={handleRedirect}
          rightIcon={<FaExternalLinkAlt />}
        >
          Посмотреть результаты
        </Button>
      </Td>
    </Tr>
  )
}
