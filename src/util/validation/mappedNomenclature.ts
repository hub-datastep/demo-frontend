import { MappingResponseItem } from "model/ClassifierModel"
import { MappingResult } from "type/mapping/result"
import { WithId } from "type/withId"

export const getMappedNomenclature = (
  mapping: WithId<MappingResult>,
): MappingResponseItem | undefined => {
  const result = mapping.result

  const mappingsList = result?.mappings
  if (mappingsList && mappingsList.length > 0) {
    return mappingsList[0]
  }

  return undefined
}

export const isMappedNomenclatureValid = (mapping: WithId<MappingResult>): boolean => {
  const mappedNomenclature = getMappedNomenclature(mapping)
  const isMappedNomenclatureExists = !!mappedNomenclature

  return isMappedNomenclatureExists
}
