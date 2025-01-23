import axiosClient from "api/axiosClient"
import { IterationWithResults } from "type/mapping/iteration"
import { WithStrId } from "type/withId"

export const getMappingIterationById = async (
  iterationId: string
): Promise<WithStrId<IterationWithResults>> => {
  const { data: iteration } = await axiosClient.get(
    `/mapping/result/iteration/${iterationId}`
  )
  return iteration
}
