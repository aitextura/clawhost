import type { FC, ReactNode } from 'react'
import type { ErrorResponse } from '@/ts/Interfaces'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { t } from '@openclaw/i18n'
import { brand } from '@openclaw/shared'
import { api, ROUTES } from '@/lib'
import { useUIStore } from '@/lib/store'
import { PageBackground, PageTitle } from '@/components'
import { Button, Input } from '@/components/ui'
import { CircleNotchIcon } from '@phosphor-icons/react'

const Waitlist: FC = (): ReactNode => {
    const navigate = useNavigate()
    const { showToast } = useUIStore()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [isPending, setIsPending] = useState(false)

    const primaryColor = brand.theme.primaryColor
    const accentColor = brand.theme.accentColor

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !email.trim() || !phone.trim()) return

        setIsPending(true)
        try {
            const result = await api.joinWaitlist({
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim()
            })
            if (result.alreadyJoined) {
                showToast(t('go.waitlistAlreadyJoinedToast'), 'info')
            }
            navigate(ROUTES.WAITLIST_THANKS)
        } catch (err) {
            const errMsg =
                (err as unknown as ErrorResponse)?.error ||
                t('go.waitlistFailedToast')
            showToast(errMsg, 'error')
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className='bg-background relative flex min-h-screen items-center justify-center px-4'>
            <PageTitle title={t('landing.waitlistTitle')} />
            <PageBackground />
            <div className='relative z-10 w-full max-w-md'>
                <div className='bg-card rounded-2xl border p-8 shadow-xl'>
                    <h1
                        className='font-clash mb-2 text-center text-3xl font-bold'
                        style={{ color: primaryColor }}
                    >
                        {t('landing.waitlistTitle')}
                    </h1>
                    <p className='text-muted-foreground mb-8 text-center text-sm'>
                        {t('landing.waitlistSubtitle')}
                    </p>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('landing.waitlistNamePlaceholder')}
                            required
                            autoComplete='name'
                        />
                        <Input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('go.waitlistEmailPlaceholder')}
                            required
                            autoComplete='email'
                        />
                        <Input
                            type='tel'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={t('landing.waitlistPhonePlaceholder')}
                            required
                            autoComplete='tel'
                        />
                        <Button
                            type='submit'
                            disabled={!name.trim() || !email.trim() || !phone.trim() || isPending}
                            className='w-full gap-2 border-0 text-white hover:opacity-90'
                            style={{
                                background: `linear-gradient(to right, ${primaryColor}, ${accentColor})`
                            }}
                        >
                            {isPending && (
                                <CircleNotchIcon className='h-4 w-4 animate-spin' />
                            )}
                            {t('go.joinWaitlist')}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Waitlist