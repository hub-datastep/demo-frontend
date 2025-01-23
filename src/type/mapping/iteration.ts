import { MappingResult } from "type/mapping/result"
import { WithId } from "type/withId"

export enum IterationType {
  UTD = "UTD",
}

export type MappingIteration = {
  metadatas?: Record<string, any>
  created_at?: Date
}

export type IterationWithResults = MappingIteration & {
  results: WithId<MappingResult>[]
}
