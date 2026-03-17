import type { LiteLLMUserResponse } from '@/ts/Interfaces'

import { getLiteLLMConfig } from '@/services/litellm/config'

const createUser = async (
    userId: string,
    userEmail: string,
    maxBudget: number
): Promise<LiteLLMUserResponse> => {
    const { apiUrl, masterKey } = getLiteLLMConfig()

    const response = await fetch(`${apiUrl}/user/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${masterKey}`
        },
        body: JSON.stringify({
            user_id: userId,
            user_email: userEmail,
            max_budget: maxBudget,
            auto_create_key: false
        })
    })

    if (!response.ok) {
        throw new Error(`LiteLLM createUser failed: ${response.status}`)
    }

    return response.json() as Promise<LiteLLMUserResponse>
}

export default createUser