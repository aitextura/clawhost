import { getLiteLLMConfig } from '@/services/litellm/config'

const deleteKey = async (keyHash: string): Promise<void> => {
    const { apiUrl, masterKey } = getLiteLLMConfig()

    const response = await fetch(`${apiUrl}/key/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${masterKey}`
        },
        body: JSON.stringify({
            keys: [keyHash]
        })
    })

    if (!response.ok) {
        throw new Error(`LiteLLM deleteKey failed: ${response.status}`)
    }
}

export default deleteKey