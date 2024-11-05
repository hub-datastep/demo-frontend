import {
  Button,
  CloseButton,
  Flex,
  Heading,
  Input,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { SOLUTION_TYPES_LIST } from "constant/solutionTypes"
import { getShortFileName } from "misc/util"
import { SolutionImitationBody, SolutionImitationResponse } from "model/SolutionImitation"
import { ChangeEvent, FC, useRef, useState } from "react"
import { FaUpload } from "react-icons/fa"
import { useSolutionImitationMutation } from "service/demoSolutionService"

const COLUMNS_NAME = ["ID", "Входной элемент", "Результат", "Комментарий"]

export const DemoSolution: FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [solutionType, setSolutionType] = useState<string>()
  const [uploadedFile, setUploadedFile] = useState<File>()

  const [solutionResponse, setSolutionResponse] = useState<SolutionImitationResponse>()

  const isSolutionTypeSelected = !!solutionType
  const isFileUploaded = !!uploadedFile

  const solutionTable = solutionResponse?.table
  const isSolutionTableExists = !!solutionTable

  const solutionImitationMutation = useSolutionImitationMutation()

  const isError = solutionImitationMutation.isError
  const isLoading = solutionImitationMutation.isLoading

  const isUploadFileBtnDisabled = isLoading || !isSolutionTypeSelected

  const handleTypeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value
    setSolutionType(selectedType)
  }

  const handleUploadFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleResetFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setUploadedFile(undefined)
  }

  const handleImitateSolution = async (file: File) => {
    if (!isSolutionTypeSelected) {
      return
    }

    const body: SolutionImitationBody = {
      type: solutionType,
      file_object: file,
    }

    const responseData = await solutionImitationMutation.mutateAsync(body)

    setSolutionResponse(responseData)
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)

    if (file) {
      setUploadedFile(file)
      handleImitateSolution(file)
    }
  }

  return (
    <Flex
      h="full"
      w="full"
      direction="column"
      px={10}
      py={16}
      gap={10}
      overflowX="hidden"
      overflowY="auto"
    >
      <Flex w="full" direction="column" alignItems="center" gap={3}>
        {/* Inputs */}
        <Flex
          w="full"
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={3}
        >
          {/* Solution Type Select */}
          <Select
            w="fit-content"
            variant="filled"
            placeholder="Select type"
            value={solutionType}
            onChange={handleTypeSelect}
            isInvalid={!isSolutionTypeSelected}
            isDisabled={isLoading}
          >
            {SOLUTION_TYPES_LIST.map((type, index) => (
              <option key={index} value={type}>
                {type.toUpperCase()}
              </option>
            ))}
          </Select>

          {/* File Upload Btn */}
          <>
            <Button
              w="fit-content"
              colorScheme="purple"
              onClick={handleUploadFileButtonClick}
              leftIcon={<FaUpload />}
              isDisabled={isUploadFileBtnDisabled}
            >
              Загрузить файл
            </Button>

            {/* Reset File */}
            <CloseButton onClick={handleResetFile} isDisabled={isUploadFileBtnDisabled} />

            <Input
              hidden
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,.ifc"
              multiple={false}
              onChange={handleFileInputChange}
            />
          </>
        </Flex>

        {/* Uploaded File Data */}
        {isFileUploaded && (
          <Text color="gray">{getShortFileName(uploadedFile.name)}</Text>
        )}
      </Flex>

      {/* Results Table */}
      {!isLoading && isSolutionTableExists ? (
        <Table w="full" variant="striped">
          <Thead>
            <Tr>
              {COLUMNS_NAME.map((column, index) => (
                <Th key={index}>{column}</Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {solutionTable.map((row, index) => (
              <Tr key={index}>
                <Td>{row.id}</Td>
                <Td>{row.input_item}</Td>
                <Td>{row.output_item}</Td>
                <Td>{row.additional_info}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        // Guides Texts
        <Flex
          h="full"
          w="full"
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          {!isSolutionTypeSelected && (
            <Text fontSize="xl">Выбери тип файла, который нужно обработать</Text>
          )}

          {!isFileUploaded && <Text fontSize="xl">Загрузи файл</Text>}

          {isLoading && (
            <Flex alignItems="center" gap={3}>
              <Spinner size="md" color="purple" />

              <Text fontSize="xl">Обрабатываем файл</Text>
            </Flex>
          )}

          {isError && (
            <Flex direction="column" alignItems="center" gap={2} color="red.400">
              <Heading fontSize="xl">Что-то пошло не так..</Heading>

              <Text fontSize="lg">
                Попробуйте ещё раз позже или лучше сообщите нам об ошибке
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  )
}
