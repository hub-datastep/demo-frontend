import { getMappingIterationById } from "api/mapping/result/mappingIteration"
import { UTDMetadatasParams } from "component/mapping/iteration/UTDMetadatasParams"
import { MappingResultsTable } from "component/mapping/result/MappingResultsTable"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { FC } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router"
import { IterationType, IterationWithResults } from "type/mapping/iteration"
import { UTDMetadatas } from "type/mapping/iterationMetadatas"
import { WithStrId } from "type/withId"
import { useUrlParam } from "util/urlParams"

type Params = {
  id: string
}

export const MappingIterationResults: FC = () => {
  const { id: iterationId } = useParams<Params>()

  const iterationType = useUrlParam("type")
  const isUTDIteration = iterationType?.toLowerCase() === IterationType.UTD.toLowerCase()

  const { data: mappingIteration, isLoading } = useQuery<WithStrId<IterationWithResults>>(
    ["mappingIteration", iterationId],
    () => getMappingIterationById(iterationId!),
    {
      enabled: !!iterationId,
    }
  )
  const isIterationExists = !!mappingIteration
  const metadatas = mappingIteration?.metadatas
  const results = mappingIteration?.results

  return (
    <Page>
      {isLoading && <LoadingPage />}

      {/* Iteration Metadatas */}
      {/* TODO: show params from metadatas */}
      {isIterationExists && isUTDIteration && (
        <UTDMetadatasParams metadatas={metadatas as UTDMetadatas | undefined} />
      )}

      {/* Mapping Results */}
      {isIterationExists && <MappingResultsTable results={results!} />}
    </Page>
  )
}
