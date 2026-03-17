import { getLiteLLMConfig } from '@/services/litellm/config'

const updateUserBudget = async (
    userId: string,
    maxBudget: number
): Promise<void> => {
    const { apiUrl, masterKey } = getLiteLLMConfig()

    const response = await fetch(`${apiUrl}/user/update`, {
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
        throw new Error(`LiteLLM updateUserBudget failed: ${response.status}`)
    }
}

export default updateUserBudget