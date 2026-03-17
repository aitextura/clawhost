import type { FC, ReactNode } from 'react'
import type { HeroButtonsProps } from '@/ts/Interfaces'

import { Link } from 'react-router-dom'
import { brand } from '@openclaw/shared'
import { Button } from '@/components/ui'
import { SelfHostButton } from '@/components'
import { useAuth } from '@/lib/auth'
import { ROUTES } from '@/lib'
import { LightningIcon } from '@phosphor-icons/react'

const HeroButtons: FC<HeroButtonsProps> = ({
    deployLabel,
    githubLabel,
    showStars,
    large
}): ReactNode => {
    const { user } = useAuth()

    return (
        <>
            <Button
                size='lg'
                className={`gap-2 border-0 bg-gradient-to-r from-[#ef5350] to-[#c62828] font-semibold text-white hover:opacity-90 ${large ? 'px-8 py-6 text-lg' : 'px-6'}`}
                asChild
            >
                <Link
                    to={
                        import.meta.env.VITE_WAITLIST_MODE === 'true'
                            ? ROUTES.WAITLIST
                            : user
                                ? `${ROUTES.CLAWS}?deploy=true`
                                : `${ROUTES.LOGIN}?deploy=true`
                    }
                >
                    <LightningIcon className='h-5 w-5' weight='fill' />
                    {deployLabel}
                </Link>
            </Button>
            {brand.features.showSelfHosting && (
                <SelfHostButton
                    label={githubLabel}
                    showStars={showStars}
                    large={large}
                />
            )}
        </>
    )
}

export default HeroButtons