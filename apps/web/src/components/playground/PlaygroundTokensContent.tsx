import type { FC, ReactNode } from 'react'

import { Skeleton } from '@/components/ui'

interface PlaygroundTokensContentProps {
    clawId: string
}

const PlaygroundTokensContent: FC<PlaygroundTokensContentProps> = ({
    clawId: _clawId
}): ReactNode => {
    // TODO: Wire to API when token usage endpoints are integrated into api client
    const isLoading = false

    if (isLoading) {
        return (
            <div className='space-y-4 p-4'>
                <Skeleton className='h-6 w-40' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-32 w-full' />
            </div>
        )
    }

    return (
        <div className='space-y-6 p-4'>
            <div>
                <h3 className='font-clash text-sm font-semibold'>
                    Token Usage
                </h3>
                <p className='text-muted-foreground mt-2 text-sm'>
                    Token usage tracking will be available once your claw is
                    configured with LLM API keys.
                </p>
            </div>
        </div>
    )
}

export default PlaygroundTokensContent