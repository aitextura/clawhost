import type { FC, ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'
import { t } from '@openclaw/i18n'
import { brand } from '@openclaw/shared'
import { ROUTES } from '@/lib'
import { PageBackground, PageTitle } from '@/components'
import { Button } from '@/components/ui'
import { CheckCircleIcon } from '@phosphor-icons/react'

const WaitlistThanks: FC = (): ReactNode => {
    const navigate = useNavigate()
    const primaryColor = brand.theme.primaryColor
    const accentColor = brand.theme.accentColor

    return (
        <div className='bg-background relative flex min-h-screen items-center justify-center px-4'>
            <PageTitle title={t('landing.waitlistThanksTitle')} />
            <PageBackground />
            <div className='relative z-10 w-full max-w-md text-center'>
                <div className='bg-card rounded-2xl border p-8 shadow-xl'>
                    <CheckCircleIcon
                        className='mx-auto mb-4 h-16 w-16'
                        weight='fill'
                        style={{ color: primaryColor }}
                    />
                    <h1
                        className='font-clash mb-2 text-3xl font-bold'
                        style={{ color: primaryColor }}
                    >
                        {t('landing.waitlistThanksTitle')}
                    </h1>
                    <p className='text-muted-foreground mb-8 text-sm'>
                        {t('landing.waitlistThanksSubtitle')}
                    </p>
                    <Button
                        onClick={() => navigate(ROUTES.HOME)}
                        className='gap-2 border-0 px-8 text-white hover:opacity-90'
                        style={{
                            background: `linear-gradient(to right, ${primaryColor}, ${accentColor})`
                        }}
                    >
                        {t('landing.waitlistThanksBack')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WaitlistThanks