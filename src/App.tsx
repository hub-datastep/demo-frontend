import { Box, ChakraProvider } from "@chakra-ui/react"
import queryClient from "api/queryClient"
import { AppLayout } from "component/AppLayout"
import Chat from "component/Chat"
import EditPromptForm from "component/EditPromptForm"
import { AuthContextProvider } from "context/authContext"
import { FavoriteMessageContextProvider } from "context/favoriteMessageContext"
import { ModeContextProvider } from "context/modeContext"
import { UserContextProvider } from "context/userContext"
import { QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider>
                <AuthContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <UserContextProvider>
                            <ModeContextProvider>
                                <FavoriteMessageContextProvider>
                                    <Routes>
                                        <Route element={<AppLayout />}>
                                            <Route path="/admin" element={
                                                <Box mt={40}>
                                                    <EditPromptForm />
                                                </Box>
                                            } />
                                            <Route index element={<Chat />} />
                                        </Route>
                                    </Routes>
                                </FavoriteMessageContextProvider>
                            </ModeContextProvider>
                        </UserContextProvider>
                    </QueryClientProvider>
                </AuthContextProvider>
            </ChakraProvider>
        </BrowserRouter>
    )
}

export default App
