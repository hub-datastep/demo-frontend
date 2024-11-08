import { Button, Flex } from "@chakra-ui/react"
import { InputsStepper } from "component/demo/InputsStepper"
import { LoaderWithTexts } from "component/demo/LoaderWithTexts"
import { ResultsTable } from "component/demo/ResultsTable"
import { SolutionImitationBody, SolutionImitationResponse } from "model/SolutionImitation"
import { FC, useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
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

  const handleClearResults = () => {
    setSolutionResponse(undefined)
  }

  return (
    <Flex
      h="full"
      w="full"
      direction="column"
      px={10}
      pt={10}
      pb={24}
      gap={10}
      overflowX="hidden"
      overflowY="auto"
    >
      <Flex
        h="full"
        w="full"
        direction="column"
        gap={10}
        //^ Test animation when table with resulst is shown
        // animation={isSolutionTableExists ? "slideInFromRight 0.5s ease-in-out" : "none"}
        // css={{
        //   "@keyframes slideInFromRight": {
        //     "0%": {
        //       transform: "translateX(100%)",
        //       opacity: 0,
        //     },
        //     "100%": {
        //       transform: "translateX(0)",
        //       opacity: 1,
        //     },
        //   },
        // }}
      >
        {isSolutionTableExists ? (
          <>
            {/* Clear Results Btn */}
            <Button
              w="fit-content"
              leftIcon={<FaArrowLeft />}
              onClick={handleClearResults}
            >
              Назад
            </Button>

            {/* Results Table */}
            <ResultsTable solutionType={solutionType} solutionTable={solutionTable} />
          </>
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
      </Flex>

      {isLoading && <LoaderWithTexts />}
    </Flex>
  )
}
