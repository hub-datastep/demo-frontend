import { Button, Flex, Input, Text } from "@chakra-ui/react"
import { uploadFile } from "api/fileApi"
import queryClient from "api/queryClient"
import { AxiosError } from "axios"
import { ChangeEvent, FC, useRef, useState } from "react"
import { useMutation } from "react-query"

export const UploadFileBtn: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const filesMutation = useMutation(uploadFile, {
    onError: (error: AxiosError) => {
      // @ts-ignore
      setErrorMessage(error.response.data.detail)
    },
  })

  const onUploadFiles = async (files: FileList) => {
    const file = files.item(0)
    await filesMutation.mutateAsync({
      file: file!,
    })
    await queryClient.invalidateQueries("filesList")
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      onUploadFiles(files)
    }
  }

  const isUploadFileBtnLoading = filesMutation.isLoading

  const handleUploadFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Flex direction="column" alignItems="center" py={5} gap={1}>
      <Button
        colorScheme="purple"
        onClick={handleUploadFileButtonClick}
        isLoading={isUploadFileBtnLoading}
        isDisabled={isUploadFileBtnLoading}
      >
        Загрузить файл
      </Button>
      {filesMutation.isError && <Text color="red">{errorMessage}</Text>}

      <Input
        hidden
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        multiple={false}
        onChange={handleFileInputChange}
      />
    </Flex>
  )
}
