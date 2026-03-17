import type { LiteLLMSpendResponse } from '@/ts/Interfaces'

import { getLiteLLMConfig } from '@/services/litellm/config'

const getSpend = async (userId: string): Promise<LiteLLMSpendResponse> => {
    const { apiUrl, masterKey } = getLiteLLMConfig()

    const response = await fetch(
        `${apiUrl}/user/info?user_id=${encodeURIComponent(userId)}`,
        {
            headers: {
                'Authorization': `Bearer ${masterKey}`
            }
        }
    )

    if (!response.ok) {
        throw new Error(`LiteLLM getSpend failed: ${response.status}`)
    }

    return response.json() as Promise<LiteLLMSpendResponse>
}

export default getSpend