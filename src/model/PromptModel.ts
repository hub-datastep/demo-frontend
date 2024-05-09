interface PromptEditModel {
    prompt: string
    table: string
    scheme?: string
    is_active?: boolean
}

interface PromptModel extends PromptEditModel {
    id: number
    tenant_id: number
    created_at: string
    updated_at: string
}

export type {
    PromptEditModel, PromptModel
}
