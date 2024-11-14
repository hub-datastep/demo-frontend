import { Button, CloseButton, Flex, Input, Text } from "@chakra-ui/react"
import { getAcceptableFileTypesBySolutionType } from "misc/solutionTypeAcceptableFiles"
import { getShortFileName } from "misc/util"
import { ChangeEvent, FC, useRef } from "react"
import { FaUpload } from "react-icons/fa"

interface FileUploadBtnProps {
  solutionType?: string
  uploadedFile?: File
  setUploadedFile: (file?: File) => void
  isDisabled?: boolean
}

export const FileUploadBtn: FC<FileUploadBtnProps> = (props) => {
  const { solutionType, uploadedFile, setUploadedFile, isDisabled } = props

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const isFileUploaded = !!uploadedFile

  const acceptableFileTypes = getAcceptableFileTypesBySolutionType(solutionType)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)

    if (file) {
      setUploadedFile(file)
    }
  }

  const handleResetFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setUploadedFile(undefined)
  }

  return (
    <Flex direction="column" gap={3}>
      {/* Upload File Btn */}
      <>
        <Button
          w="fit-content"
          colorScheme="purple"
          onClick={handleClick}
          leftIcon={<FaUpload />}
          isDisabled={isDisabled}
        >
          Загрузить файл
        </Button>

        {/* Hidden file input */}
        <Input
          hidden
          ref={fileInputRef}
          type="file"
          accept={acceptableFileTypes}
          multiple={false}
          onChange={handleFileInputChange}
        />
      </>

      {/* Uploaded File Name */}
      {isFileUploaded && (
        <Flex direction="row" alignItems="center" gap={1}>
          {/* Reset File */}
          <CloseButton size="sm" onClick={handleResetFile} isDisabled={isDisabled} />

          {/* File Name */}
          <Text color="gray">{getShortFileName(uploadedFile.name)}</Text>
        </Flex>
      )}
    </Flex>
  )
}
