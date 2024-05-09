import { Box, Button, Text, Textarea } from "@chakra-ui/react"
import { getActivePrompt } from "api/promptApi"
import queryClient from "api/queryClient"
import { PromptModel } from "model/PromptModel"
import { ChangeEvent } from "react"
import { useQuery } from "react-query"
import { usePrompt } from "service/promptService"

const updatePrompt = (promptModel: PromptModel, newPrompt: string) => {
    promptModel.prompt = newPrompt
    return promptModel
}

const EditPromptForm = () => {
    const { data: prompt, status: queryPromptStatus } = useQuery<PromptModel>("prompt", getActivePrompt)
    const promptService = usePrompt()

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (prompt?.prompt) {
            queryClient.setQueryData("prompt", updatePrompt(prompt, event.target.value))
        }
    }

    const handleButtonClick = () => {
        if (prompt?.prompt) {
            promptService.mutate({
                prompt_id: prompt.id,
                body: prompt
            })
        }
    }

    const isLoading = promptService.isLoading || queryPromptStatus === "loading"
    const isError = promptService.isError || queryPromptStatus === "error"

    return (
        <Box p="10">
            <Textarea
                value={prompt?.prompt}
                onChange={handleTextareaChange}
                isDisabled={isLoading}
                rows={20}
            />

            <Button
                onClick={handleButtonClick}
                isLoading={isLoading}
                mt="5"
            >
                Сохранить
            </Button>

            {isError && (
                <Text color="red">Произошла ошибка</Text>
            )}
        </Box>
    )
}

export default EditPromptForm