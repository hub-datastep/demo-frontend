import {
  Flex,
  Step,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
} from "@chakra-ui/react"
import { SolutionImitationInputStep } from "model/SolutionImitation"
import { FC } from "react"
import { FaCheck } from "react-icons/fa"

interface StepperItemProps {
  index: number
  step: SolutionImitationInputStep
  activeStep: number
  isLoading?: boolean
}

export const StepperItem: FC<StepperItemProps> = (props) => {
  const { index, step, activeStep, isLoading } = props
  const { title, Component } = step

  const isDisabled = isLoading || activeStep < index

  return (
    <Step>
      <StepIndicator fontWeight="bold" textColor={isDisabled ? "gray" : ""}>
        <StepStatus
          complete={<FaCheck />}
          incomplete={<StepNumber />}
          active={<StepNumber />}
        />
      </StepIndicator>

      <Flex
        direction="column"
        justifyContent="flex-start"
        gap={3}
        textColor={isDisabled ? "gray" : ""}
      >
        <StepTitle>{title}</StepTitle>

        {Component}
      </Flex>

      <StepSeparator />
    </Step>
  )
}
