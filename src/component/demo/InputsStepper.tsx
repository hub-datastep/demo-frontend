import { Stepper, useSteps } from "@chakra-ui/react"
import { FileUploadBtn } from "component/demo/FileUploadBtn"
import { ImitateSolutionBtn } from "component/demo/ImitateSolutionBtn"
import { SolutionTypeSelect } from "component/demo/SolutionTypeSelect"
import { StepperItem } from "component/demo/StepperItem"
import { SolutionImitationInputStep } from "model/SolutionImitation"
import { FC, useEffect } from "react"

interface InputsStepperProps {
  solutionType?: string
  setSolutionType: (type: string) => void
  uploadedFile?: File
  setUploadedFile: (file?: File) => void
  onSubmit: () => void
  isLoading?: boolean
}

export const InputsStepper: FC<InputsStepperProps> = (props) => {
  const {
    solutionType,
    setSolutionType,
    uploadedFile,
    setUploadedFile,
    onSubmit,
    isLoading,
  } = props

  const isSolutionTypeSelected = !!solutionType
  const isFileUploaded = !!uploadedFile

  const { activeStep, setActiveStep } = useSteps()

  const STEPS: SolutionImitationInputStep[] = [
    // Select File Type
    {
      title: "Выберите тип файла",
      Component: (
        <SolutionTypeSelect
          solutionType={solutionType}
          setSolutionType={setSolutionType}
          isLoading={isLoading}
        />
      ),
    },
    // Upload File
    {
      title: "Загрузите файл",
      Component: (
        <FileUploadBtn
          solutionType={solutionType}
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          isDisabled={isLoading || activeStep < 1}
        />
      ),
    },
    // Run
    {
      title: "Запустите",
      Component: (
        <ImitateSolutionBtn onClick={onSubmit} isDisabled={isLoading || activeStep < 1} />
      ),
    },
  ]

  useEffect(() => {
    // Select Solution Type Step
    if (!isSolutionTypeSelected && !isFileUploaded) {
      setActiveStep(0)
    }
    // Upload File Step
    else if (isSolutionTypeSelected && !isFileUploaded) {
      setActiveStep(1)
    }
    // Upload File Step
    else if (isSolutionTypeSelected && isFileUploaded) {
      setActiveStep(2)
    }
  }, [setActiveStep, isSolutionTypeSelected, isFileUploaded])

  return (
    <Stepper
      height="full"
      orientation="vertical"
      colorScheme="purple"
      index={activeStep}
      gap={0}
    >
      {STEPS.map((step, index) => (
        <StepperItem
          key={index}
          index={index}
          step={step}
          activeStep={activeStep}
          isLoading={isLoading}
        />
      ))}
    </Stepper>
  )
}
