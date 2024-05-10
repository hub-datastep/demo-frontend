import { Flex, Text } from "@chakra-ui/react"
import { RowButtons } from "component/filesHistory/RowButtons"
import { IFileRow } from "component/filesHistory/types"
import { getShortFileName } from "misc/util"
import { FC } from "react"

const FileRow: FC<IFileRow> = (props) => {
    const {
        fileIndex,
        file,
        currentFileIndex,
        setCurrentFileIndex
    } = props

    const isSelected = currentFileIndex === fileIndex

    const shortFileName = getShortFileName(file.original_filename)

    const backgroundColor = isSelected ? "gray.100" : "transparent"

    return (
        <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            backgroundColor={backgroundColor}
            width="full"
            px={2}
            py={1}
            borderRadius={10}
        >
            <Text px={2}>{shortFileName}</Text>

            <RowButtons
                fileIndex={fileIndex}
                file={file}
                isSelected={isSelected}
                setCurrentFileIndex={setCurrentFileIndex}
            />
        </Flex>
    )
}

export default FileRow
