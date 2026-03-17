import type { LiteLLMKeyResponse } from '@/ts/Interfaces'

import { getLiteLLMConfig } from '@/services/litellm/config'

const generateKey = async (
    userId: string,
    maxBudget: number
): Promise<LiteLLMKeyResponse> => {
    const { apiUrl, masterKey } = getLiteLLMConfig()

    const response = await fetch(`${apiUrl}/key/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${masterKey}`
        },
        body: JSON.stringify({
            user_id: userId,
            max_budget: maxBudget
        })
    })

    if (!response.ok) {
        throw new Error(`LiteLLM generateKey failed: ${response.status}`)
    }

    return response.json() as Promise<LiteLLMKeyResponse>
}

export default generateKey