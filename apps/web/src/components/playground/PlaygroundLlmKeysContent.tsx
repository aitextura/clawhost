import type { FC, ReactNode } from 'react'

import { Skeleton } from '@/components/ui'

interface PlaygroundLlmKeysContentProps {
    clawId: string
}

const PlaygroundLlmKeysContent: FC<PlaygroundLlmKeysContentProps> = ({
    clawId: _clawId
}): ReactNode => {
    // TODO: Wire to API when LLM key management endpoints are integrated into api client
    const isLoading = false

    if (isLoading) {
        return (
            <div className='space-y-4 p-4'>
                <Skeleton className='h-6 w-40' />
                <Skeleton className='h-20 w-full' />
            </div>
        )
    }

    return (
        <div className='space-y-6 p-4'>
            <div>
                <h3 className='font-clash text-sm font-semibold'>
                    LLM API Keys
                </h3>
                <p className='text-muted-foreground mt-2 text-sm'>
                    Manage your own LLM API keys for this claw. Bring your own
                    keys from OpenAI, Anthropic, or other providers.
                </p>
            </div>
        </div>
    )
}

export default PlaygroundLlmKeysContent