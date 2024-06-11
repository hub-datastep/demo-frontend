import { Flex, Text } from "@chakra-ui/react"
import { IFileRowKnowledgeBase } from "component/filesHistory/types"
import { getShortFileName } from "misc/util"
import { FC } from "react"
import { RowButtonsKnowledgeBase } from "component/filesHistory/RowButtonsKnowledgeBase"

const FileRowKnowledgeBase: FC<IFileRowKnowledgeBase> = (props) => {
  const { file } = props

  const shortFileName = getShortFileName(file.original_filename)

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="transparent"
      width="full"
      px={2}
      py={1}
      borderRadius={10}
    >
      <Text px={2}>{shortFileName}</Text>

      <RowButtonsKnowledgeBase file={file} />
    </Flex>
  )
}

export default FileRowKnowledgeBase
