import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core"
import { searchPlugin } from "@react-pdf-viewer/search"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation"
import { FC, useEffect } from "react"

// Import styles
import { Flex, Spinner, VStack } from "@chakra-ui/react"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import "@react-pdf-viewer/search/lib/styles/index.css"
import { getHostPath } from "misc/util"

interface IPDFViewer {
  fileUrl: string
  page: number
  isLoading?: boolean
}

const getFullFilePath = (fileUrl: string): string => {
  const host = getHostPath()
  return `${host}/${fileUrl}`
}

export const PDFViewerKnowledgeBase: FC<IPDFViewer> = ({ page, fileUrl, isLoading }) => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const pageNavigationPluginInstance = pageNavigationPlugin()
  const searchPluginInstance = searchPlugin()
  const { jumpToPage } = pageNavigationPluginInstance
  const fullFileUrl = getFullFilePath(fileUrl)

  useEffect(() => {
    jumpToPage(page)
  }, [page, jumpToPage])

  return (
    <Flex h="full" w="100%" backgroundColor="gray.300" justifyContent="center" alignItems="center">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <VStack width="full" height="full">
          {isLoading ? (
            <Spinner />
          ) : (
            <Viewer
              fileUrl={fullFileUrl}
              plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance, searchPluginInstance]}
              defaultScale={SpecialZoomLevel.PageFit}
            />
          )}
        </VStack>
      </Worker>
    </Flex>
  )
}
