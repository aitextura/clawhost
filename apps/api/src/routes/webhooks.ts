import { Hono } from 'hono'
import { handlePolarWebhook, handleStripeWebhook } from '@/controllers/webhooks'

const app = new Hono()

app.post('/polar', handlePolarWebhook)
app.post('/stripe', handleStripeWebhook)

export default app