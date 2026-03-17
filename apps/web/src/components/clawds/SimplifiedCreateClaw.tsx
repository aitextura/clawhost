import type { FC, ReactNode } from 'react'
import type { ErrorResponse } from '@/ts/Interfaces'
import type { TierId, TierConfig } from '@openclaw/shared'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { t } from '@openclaw/i18n'
import { TIERS, TIER_IDS } from '@openclaw/shared'
import { useUIStore } from '@/lib/store'
import { usePurchaseClaw } from '@/hooks'
import { useBrand } from '@/components/clawds/BrandProvider'
import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui'
import { CircleNotchIcon, CheckIcon } from '@phosphor-icons/react'
import { cn } from '@/lib'

interface SimplifiedCreateClawProps {
    onClose: () => void
}

function TierCard({
    tier,
    selected,
    onClick,
    primaryColor
}: {
    tier: TierConfig
    selected: boolean
    onClick: () => void
    primaryColor: string
}): ReactNode {
    return (
        <div
            onClick={onClick}
            className={cn(
                'relative cursor-pointer rounded-xl border-2 p-6 transition-all hover:shadow-lg',
                selected
                    ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/5 shadow-lg'
                    : 'border-border hover:border-[var(--brand-primary)]/50'
            )}
        >
            {tier.id === 'pro' && (
                <span
                    className='absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold text-white'
                    style={{ backgroundColor: primaryColor }}
                >
                    {t('landing.recommended')}
                </span>
            )}
            <h3 className='font-clash text-xl font-bold'>{tier.name}</h3>
            <p className='text-muted-foreground mt-1 text-sm'>
                {tier.vcpu} vCPU &middot; {tier.ramGb} GB RAM
            </p>
            <div className='mt-3'>
                <span className='text-3xl font-bold'>
                    ${tier.priceMonthly / 100}
                </span>
                <span className='text-muted-foreground'>
                    {t('landing.perMonth')}
                </span>
            </div>
            <ul className='mt-4 space-y-2 text-sm'>
                <li className='flex items-center gap-2'>
                    <CheckIcon
                        className='h-4 w-4'
                        style={{ color: primaryColor }}
                    />
                    {tier.vcpu} vCPU
                </li>
                <li className='flex items-center gap-2'>
                    <CheckIcon
                        className='h-4 w-4'
                        style={{ color: primaryColor }}
                    />
                    {tier.ramGb} GB RAM
                </li>
                <li className='flex items-center gap-2'>
                    <CheckIcon
                        className='h-4 w-4'
                        style={{ color: primaryColor }}
                    />
                    {tier.diskGb} GB Disk
                </li>
                {tier.sshAccess && (
                    <li className='flex items-center gap-2'>
                        <CheckIcon
                            className='h-4 w-4'
                            style={{ color: primaryColor }}
                        />
                        SSH Access
                    </li>
                )}
            </ul>
        </div>
    )
}

const SimplifiedCreateClaw: FC<SimplifiedCreateClawProps> = ({
    onClose
}): ReactNode => {
    const brand = useBrand()
    const [selected, setSelected] = useState<TierId | null>(null)
    const { showToast } = useUIStore()
    const { mutate: purchaseClaw, isPending } = usePurchaseClaw()
    const queryClient = useQueryClient()

    const primaryColor = brand.theme.primaryColor

    const promoCode =
        new URLSearchParams(window.location.search).get('promo') || undefined

    const handleDeploy = () => {
        if (!selected) return

        const tier = TIERS[selected]
        const provider = brand.payment.defaultProvider
        const planId = tier.providerPlans[provider]
        const location = brand.payment.defaultLocation

        purchaseClaw(
            {
                name: `${brand.name}-${selected}`,
                provider: provider as 'hetzner' | 'digitalocean' | 'vultr',
                planId,
                location,
                priceMonthly: tier.priceMonthly,
                promoCode
            },
            {
                onSuccess: (data) => {
                    if (data?.checkoutUrl) {
                        window.location.href = data.checkoutUrl
                        return
                    }
                    showToast(t('createClaw.clawCreated'), 'success')
                    queryClient.invalidateQueries({ queryKey: ['claws'] })
                    onClose()
                },
                onError: (error) => {
                    const errMsg =
                        (error as unknown as ErrorResponse)?.error ||
                        'Failed to start checkout'
                    showToast(errMsg, 'error')
                }
            }
        )
    }

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent className='flex max-h-[90dvh] max-w-2xl flex-col overflow-hidden'>
                <DialogHeader>
                    <DialogTitle className='font-clash'>
                        {t('createClaw.title')}
                    </DialogTitle>
                </DialogHeader>
                <div className='grid flex-1 gap-4 overflow-y-auto sm:grid-cols-3'>
                    {TIER_IDS.map((tierId) => (
                        <TierCard
                            key={tierId}
                            tier={TIERS[tierId]}
                            selected={selected === tierId}
                            onClick={() => setSelected(tierId)}
                            primaryColor={primaryColor}
                        />
                    ))}
                </div>
                <div className='flex justify-end border-t pt-4'>
                    <Button
                        onClick={handleDeploy}
                        disabled={!selected || isPending}
                        className='gap-2 border-0 px-6 text-white hover:opacity-90'
                        style={{
                            background: `linear-gradient(to right, ${primaryColor}, ${brand.theme.accentColor})`
                        }}
                    >
                        {isPending && (
                            <CircleNotchIcon className='h-4 w-4 animate-spin' />
                        )}
                        {t('landing.deploy')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SimplifiedCreateClaw