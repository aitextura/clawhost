import type { FC, ReactNode } from 'react'
import type { ProvisioningTimerProps } from '@/ts/Interfaces'

import { useState, useEffect } from 'react'

const formatElapsed = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
}

const ProvisioningTimer: FC<ProvisioningTimerProps> = ({ createdAt }): ReactNode => {
    const [elapsed, setElapsed] = useState(() =>
        Math.max(0, Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000))
    )

    useEffect(() => {
        const start = new Date(createdAt).getTime()
        const update = () => setElapsed(Math.max(0, Math.floor((Date.now() - start) / 1000)))
        update()
        const id = setInterval(update, 1000)
        return () => clearInterval(id)
    }, [createdAt])

    return (
        <span className='text-muted-foreground tabular-nums'>
            {formatElapsed(elapsed)}
        </span>
    )
}

export default ProvisioningTimer