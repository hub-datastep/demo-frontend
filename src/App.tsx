import { Box, ChakraProvider } from "@chakra-ui/react"
import queryClient from "api/queryClient"
import { AppLayout } from "component/AppLayout"
import EditPromptForm from "component/EditPromptForm"
import { ChatClassifier } from "component/chat/ChatClassifier"
import ChatDB from "component/chat/ChatDB"
import { ChatDocs } from "component/chat/ChatDocs"
import { ChatKnowledgeBase } from "component/chat/ChatKnowledgeBase"
import { ChatQAOrdersAssistant } from "component/chat/ChatQAOrdersAssistant"
import { DemoSolution } from "component/demo/DemoSolution"
import { AuthContextProvider } from "context/authContext"
import { FavoriteMessageContextProvider } from "context/favoriteMessageContext"
import { ModeContextProvider } from "context/modeContext"
import { SidebarContextProvider } from "context/sidebarContext"
import { UserContextProvider } from "context/userContext"
import { MappingIterationResults } from "page/MappingIterationResults"
import { MappingIterations } from "page/MappingIterations"
import { QAOrdersKnowledgeBase } from "page/QAOrdersKnowledgeBase"
import { QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <UserContextProvider>
              <ModeContextProvider>
                <FavoriteMessageContextProvider>
                  <SidebarContextProvider>
                    <Routes>
                      <Route element={<AppLayout />}>
                        <Route
                          path="/admin"
                          element={
                            <Box mt={40}>
                              <EditPromptForm />
                            </Box>
                          }
                        />
                        <Route path="/databases" element={<ChatDB />} />
                        <Route path="/documents" element={<ChatDocs />} />
                        <Route path="/knowledge_base" element={<ChatKnowledgeBase />} />
                        <Route path="/orders_qa" element={<ChatQAOrdersAssistant />} />
                        <Route
                          path="/qa-orders-knowledge-base"
                          element={<QAOrdersKnowledgeBase />}
                        />
                        <Route path="/mapping">
                          <Route path="" element={<ChatClassifier />} />
                          <Route
                            path="result/iterations"
                            element={<MappingIterations />}
                          />
                          <Route
                            path="result/iteration/:id"
                            element={<MappingIterationResults />}
                          />
                        </Route>
                        <Route path="/demo" element={<DemoSolution />} />
                      </Route>
                    </Routes>
                  </SidebarContextProvider>
                  <ToastContainer />
                </FavoriteMessageContextProvider>
              </ModeContextProvider>
            </UserContextProvider>
          </QueryClientProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}
