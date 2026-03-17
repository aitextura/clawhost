import type { LiteLLMConfig } from '@/ts/Interfaces'

const getLiteLLMConfig = (): LiteLLMConfig => {
    const apiUrl = process.env.LITELLM_API_URL
    const masterKey = process.env.LITELLM_MASTER_KEY

    if (!apiUrl || !masterKey) {
        throw new Error('LITELLM_API_URL and LITELLM_MASTER_KEY must be set')
    }

    return { apiUrl, masterKey }
}

export { getLiteLLMConfig }