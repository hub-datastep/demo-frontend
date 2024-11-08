import { SolutionType } from "constant/solutionTypes"

export const getAcceptableFileTypesBySolutionType = (solutionType?: string) => {
  const acceplableFileTypes = []

  // UTDs
  if (solutionType === SolutionType.UTD) {
    acceplableFileTypes.push(".pdf")
  }
  // UTDs
  if (solutionType === SolutionType.SPEC) {
    acceplableFileTypes.push(".pdf")
  }
  // UTDs
  if (solutionType === SolutionType.IFC) {
    acceplableFileTypes.push(".ifc")
    acceplableFileTypes.push(".txt")
  }

  return acceplableFileTypes.join(",")
}
