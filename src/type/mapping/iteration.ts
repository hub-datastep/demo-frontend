import { MappingResult } from "type/mapping/result"
import { WithId } from "type/withId"

export enum IterationType {
  UTD = "UTD",
}

export type MappingIteration = {
  metadatas?: Record<string, any>
  type?: string
  created_at?: string
}

export type IterationWithResults = MappingIteration & {
  results: WithId<MappingResult>[]
}
