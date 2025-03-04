import { MappingResult } from "type/mapping/result"
import { WithId } from "type/withId"

export type MappingIteration = {
  metadatas?: Record<string, any>
  type?: string
  status?: string
  created_at?: string
}

export type IterationWithResults = MappingIteration & {
  results: WithId<MappingResult>[]
}
