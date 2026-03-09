import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import { useBrand } from '@/components/clawds/BrandProvider'
import { TIERS, type TierId } from '@openclaw/shared'
import { Button, Input } from '@/components/ui'

interface SimplifiedCreateClawProps {
    onClose: () => void
}

const SimplifiedCreateClaw: FC<SimplifiedCreateClawProps> = ({
    onClose
}): ReactNode => {
    const b = useBrand()
    const [name, setName] = useState('')
    const [selectedTier, setSelectedTier] = useState<TierId>('starter')
    const [loading, setLoading] = useState(false)

    const handleCreate = async () => {
        if (!name.trim()) return
        setLoading(true)
        try {
            // Simplified flow: uses brand defaults for provider & location
            // TODO: wire to actual purchase API (initiateClawPurchase with Stripe)
            console.log('Creating claw:', {
                name: name.trim(),
                tier: selectedTier,
                provider: b.payment.defaultProvider,
                location: b.payment.defaultLocation
            })
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='space-y-6 p-6'>
            <h2 className='font-clash text-lg font-semibold'>
                Create your Claw
            </h2>

            <Input
                placeholder='Claw name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <div className='grid grid-cols-3 gap-3'>
                {Object.values(TIERS).map((tier) => (
                    <button
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id)}
                        className={`rounded-lg border p-4 text-center transition-all ${
                            selectedTier === tier.id
                                ? 'border-[var(--brand-primary,#4ecdc4)] bg-[var(--brand-primary,#4ecdc4)]/10'
                                : 'hover:border-gray-400'
                        }`}
                    >
                        <div className='font-bold'>{tier.name}</div>
                        <div className='text-2xl font-bold'>
                            ${tier.priceMonthly / 100}
                        </div>
                        <div className='text-muted-foreground text-sm'>
                            /month
                        </div>
                        <div className='mt-2 text-xs'>
                            {tier.vcpu} vCPU · {tier.ramGb}GB RAM
                        </div>
                    </button>
                ))}
            </div>

            <div className='flex gap-3'>
                <Button
                    variant='outline'
                    onClick={onClose}
                    className='flex-1'
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleCreate}
                    disabled={!name.trim() || loading}
                    className='flex-1'
                >
                    {loading ? 'Creating...' : 'Create & Pay'}
                </Button>
            </div>
        </div>
    )
}

export default SimplifiedCreateClaw