import { Card, Flex, Spinner } from "@chakra-ui/react"
import { ClassifierMappingsTable } from "component/classifier/ClassifierMappingsTable"
import { MappingResponse } from "model/ClassifierModel"
import { FC } from "react"

interface ClassifierAnswerProps {
  mappingResponseList?: MappingResponse[]
  isLoading: boolean
}

export const ClassifierAnswer: FC<ClassifierAnswerProps> = (props) => {
  const { mappingResponseList, isLoading } = props

  if (!mappingResponseList || isLoading) {
    return (
      <Card h="full" w="full" p={10}>
        {isLoading ? (
          <Spinner color="purple" />
        ) : (
          <Flex h="full" w="full">
            Напишите список номенклатур для сопоставления и здесь появятся результаты
          </Flex>
        )}
      </Card>
    )
  }

  return (
    <Card width="full">
      <ClassifierMappingsTable mappingResponseList={mappingResponseList} />
    </Card>
  )
}
