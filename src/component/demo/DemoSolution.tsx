import { Flex } from "@chakra-ui/react"
import { InputsStepper } from "component/demo/InputsStepper"
import { LoaderWithTexts } from "component/demo/LoaderWithTexts"
import { ResultsTable } from "component/demo/ResultsTable"
import { SolutionImitationBody, SolutionImitationResponse } from "model/SolutionImitation"
import { FC, useState } from "react"
import { useSolutionImitationMutation } from "service/demoSolutionService"

export const DemoSolution: FC = () => {
  const [solutionType, setSolutionType] = useState<string>()
  const [uploadedFile, setUploadedFile] = useState<File>()

  const isSolutionTypeSelected = !!solutionType
  const isFileUploaded = !!uploadedFile

  const [solutionResponse, setSolutionResponse] = useState<SolutionImitationResponse>()

  const solutionTable = solutionResponse?.table
  const isSolutionTableExists = !!solutionTable

  const solutionImitationMutation = useSolutionImitationMutation()

  const isLoading = solutionImitationMutation.isLoading

  const handleImitateSolution = async () => {
    if (!isSolutionTypeSelected || !isFileUploaded) {
      return
    }

    const body: SolutionImitationBody = {
      type: solutionType,
      file_object: uploadedFile,
    }

    const responseData = await solutionImitationMutation.mutateAsync(body)

    setSolutionResponse(responseData)
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
      {isSolutionTableExists ? (
        <ResultsTable solutionType={solutionType} solutionTable={solutionTable} />
      ) : (
        <InputsStepper
          solutionType={solutionType}
          setSolutionType={setSolutionType}
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          onSubmit={handleImitateSolution}
          isLoading={isLoading}
        />
      )}

      {isLoading && <LoaderWithTexts />}
    </Flex>
  )
}
