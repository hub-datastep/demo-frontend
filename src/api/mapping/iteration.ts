import axiosClient from "api/axiosClient"
import { IterationWithResults, MappingIteration } from "type/mapping/iteration"
import { WithStrId } from "type/withId"

export const getMappingIterations = async (
  iterationId?: string,
): Promise<WithStrId<MappingIteration>[]> => {
  const { data: iterationsList } = await axiosClient.get("/mapping/result/iteration", {
    params: {
      iteration_id: iterationId,
    },
  })
  return iterationsList
}

export const getMappingIterationById = async (
  iterationId: string,
): Promise<WithStrId<IterationWithResults>> => {
  const { data: iteration } = await axiosClient.get(
    `/mapping/result/iteration/${iterationId}`,
  )
  return iteration
}
