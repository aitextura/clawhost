import { readFileSync } from 'fs'
import { resolve } from 'path'
import { neon } from '@neondatabase/serverless'

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
} catch {}

const sql = neon(process.env.DATABASE_URL!)

async function reset() {
    await sql`DROP SCHEMA public CASCADE`
    await sql`CREATE SCHEMA public`
    console.log('DB reset OK — all tables dropped')
}

reset().catch((err) => {
    console.error('Error:', err)
    process.exit(1)
})