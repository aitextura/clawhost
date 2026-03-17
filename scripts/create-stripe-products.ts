import { readFileSync } from 'fs'
import { resolve } from 'path'
import Stripe from 'stripe'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { eq } from 'drizzle-orm'

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
const DATABASE_URL = process.env.DATABASE_URL

if (!STRIPE_SECRET_KEY) {
    console.error('Missing STRIPE_SECRET_KEY in apps/api/.env')
    process.exit(1)
}

if (!DATABASE_URL) {
    console.error('Missing DATABASE_URL in apps/api/.env')
    process.exit(1)
}

const stripe = new Stripe(STRIPE_SECRET_KEY)
const sql = neon(DATABASE_URL)
const db = drizzle(sql)

const settings = pgTable('settings', {
    key: text('key').primaryKey(),
    value: text('value').notNull()
})

async function saveSetting(key: string, value: string) {
    await db
        .insert(settings)
        .values({ key, value })
        .onConflictDoUpdate({ target: settings.key, set: { value } })
}

async function createProducts() {
    console.log('Creating Stripe products for Clawds + saving to DB\n')

    const tiers = [
        { dbKey: 'stripe_price_tier_starter', name: 'Clawds Starter', price: 1500, desc: '2 vCPU, 4 GB RAM, 40 GB disk, $3/mo AI credit' },
        { dbKey: 'stripe_price_tier_pro', name: 'Clawds Pro', price: 4900, desc: '4 vCPU, 8 GB RAM, 80 GB disk, $15/mo AI credit, SSH' },
        { dbKey: 'stripe_price_tier_business', name: 'Clawds Business', price: 14900, desc: '8 vCPU, 16 GB RAM, 160 GB disk, $50/mo AI credit, SSH, priority' }
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
            await saveSetting(t.dbKey, price.id)
            console.log(`  [OK] ${t.name} -> ${price.id} ($${t.price / 100}/mo) -> DB: ${t.dbKey}`)
        } catch (err) {
            console.error(`  [FAIL] ${t.name}: ${err}`)
        }
    }

    const packs = [
        { dbKey: 'stripe_price_token_500', name: 'Clawds $5 AI Credit Top-up', price: 500 },
        { dbKey: 'stripe_price_token_1500', name: 'Clawds $15 AI Credit Top-up', price: 1500 },
        { dbKey: 'stripe_price_token_5000', name: 'Clawds $50 AI Credit Top-up', price: 5000 }
    ]

    console.log('\n--- AI Credit Top-ups ---')
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
            await saveSetting(p.dbKey, price.id)
            console.log(`  [OK] ${p.name} -> ${price.id} ($${p.price / 100}) -> DB: ${p.dbKey}`)
        } catch (err) {
            console.error(`  [FAIL] ${p.name}: ${err}`)
        }
    }

    console.log('\nAll prices saved to settings table in DB.')
    console.log('No env vars needed for Stripe prices!')
}

createProducts().catch((err) => {
    console.error('Error:', err)
    process.exit(1)
})