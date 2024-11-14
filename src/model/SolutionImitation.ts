export interface SolutionImitationBody {
  type: string
  file_object: File
}

export interface SolutionImitationResponseItem {
  id: string
  input_item: string
  output_item: string
  additional_info: string
}

export interface SolutionImitationResponse {
  table: SolutionImitationResponseItem[]
}

export interface SolutionImitationInputStep {
  title: string
  Component: JSX.Element
}
