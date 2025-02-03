import axiosClient from "api/axiosClient"
import {
  SimilarNomenclature,
  SimilarNomenclatureSearch,
} from "type/mapping/similarNomenclature"
import { WithId } from "type/withId"

export const getSimilarNomenclatures = async (
  body: SimilarNomenclatureSearch,
): Promise<WithId<SimilarNomenclature>[]> => {
  const { data: similarNomenclatures } = await axiosClient.post(
    "/mapping/result/similar_nomenclatures",
    body,
  )
  return similarNomenclatures
}
