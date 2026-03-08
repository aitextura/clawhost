import { readFileSync } from 'fs'
import { resolve } from 'path'
import Stripe from 'stripe'

const envPath = resolve(import.meta.dirname ?? __dirname, '../apps/api/.env')
try {
    const envContent = readFileSync(envPath, 'utf-8')
    for (const line of envContent.split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eqIndex = trimmed.indexOf('=')
        if (eqIndex === -1) continue
        const key = trimmed.slice(0, eqIndex).trim()
        const value = trimmed
            .slice(eqIndex + 1)
            .trim()
            .replace(/^["']|["']$/g, '')
        if (!process.env[key]) process.env[key] = value
    }
} catch {
    // .env file may not exist yet
}

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

if (!STRIPE_SECRET_KEY) {
    console.error('Missing STRIPE_SECRET_KEY in apps/api/.env')
    process.exit(1)
}

const stripe = new Stripe(STRIPE_SECRET_KEY)

async function createProducts() {
    console.log('Creating Stripe products for EazyClaw 3-tier system + token packs\n')

    const envVars: string[] = []

    // --- Subscription tiers ---
    const tiers = [
        { envKey: 'STRIPE_PRICE_TIER_STARTER', name: 'EazyClaw Starter', price: 1500, desc: '2 vCPU, 4 GB RAM, 40 GB disk, 100K tokens/day' },
        { envKey: 'STRIPE_PRICE_TIER_PRO', name: 'EazyClaw Pro', price: 4900, desc: '4 vCPU, 8 GB RAM, 80 GB disk, 500K tokens/day, SSH' },
        { envKey: 'STRIPE_PRICE_TIER_BUSINESS', name: 'EazyClaw Business', price: 14900, desc: '8 vCPU, 16 GB RAM, 160 GB disk, 2M tokens/day, SSH, priority' }
    ]

    console.log('--- Subscription Tiers ---')
    for (const t of tiers) {
        try {
            const product = await stripe.products.create({
                name: t.name,
                description: t.desc,
                metadata: { type: 'tier' }
            })
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: t.price,
                currency: 'usd',
                recurring: { interval: 'month' }
            })
            envVars.push(`${t.envKey}=${price.id}`)
            console.log(`  [OK] ${t.name} -> ${price.id} ($${t.price / 100}/mo)`)
        } catch (err) {
            console.error(`  [FAIL] ${t.name}: ${err}`)
        }
    }

    // --- Token packs (one-time) ---
    const packs = [
        { envKey: 'STRIPE_PRICE_TOKEN_50K', name: 'EazyClaw 50K Token Pack', price: 500 },
        { envKey: 'STRIPE_PRICE_TOKEN_200K', name: 'EazyClaw 200K Token Pack', price: 1500 },
        { envKey: 'STRIPE_PRICE_TOKEN_1M', name: 'EazyClaw 1M Token Pack', price: 5000 }
    ]

    console.log('\n--- Token Packs ---')
    for (const p of packs) {
        try {
            const product = await stripe.products.create({
                name: p.name,
                metadata: { type: 'token_pack' }
            })
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: p.price,
                currency: 'usd'
            })
            envVars.push(`${p.envKey}=${price.id}`)
            console.log(`  [OK] ${p.name} -> ${price.id} ($${p.price / 100})`)
        } catch (err) {
            console.error(`  [FAIL] ${p.name}: ${err}`)
        }
    }

    console.log('\n--- Add these to apps/api/.env ---\n')
    for (const v of envVars) {
        console.log(v)
    }
    console.log()
}

createProducts().catch((err) => {
    console.error('Error:', err)
    process.exit(1)
})
