import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { settings } from '@/db/schema'

const getSetting = async (key: string): Promise<string | null> => {
    const result = await db
        .select()
        .from(settings)
        .where(eq(settings.key, key))
        .limit(1)

    return result[0]?.value || null
}

export default getSetting