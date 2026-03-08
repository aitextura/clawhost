import type { HonoEnv } from '@/ts/Types'

import { Hono } from 'hono'
import { purchaseTokens } from '@/controllers/tokens'

const app = new Hono<HonoEnv>()

app.post('/purchase', purchaseTokens)

export default app