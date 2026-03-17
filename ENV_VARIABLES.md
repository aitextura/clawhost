# Environment Variables Reference

All variables needed to run Clawds.io in production.

## API (`apps/api/.env`)

### Core
```
PORT=2222
CLIENT=clawds.io
DATABASE_URL=postgresql://...
CRON_SECRET=<random-string>
```

### Firebase Auth
```
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```

### Cloud Providers

#### Hetzner (primary)
```
HETZNER_API_TOKEN=
HETZNER_SNAPSHOT_ID=          # Optional, enables fast deploy (~2 min vs ~10 min)
```

#### Contabo (fallback, used when Hetzner limit reached)
```
CONTABO_CLIENT_ID=
CONTABO_CLIENT_SECRET=
CONTABO_API_USER=
CONTABO_API_PASSWORD=
CONTABO_IMAGE_ID=             # Optional, default: Ubuntu 22.04 image UUID
CONTABO_DEFAULT_REGION=EU     # Optional, default: EU
```

#### DigitalOcean / Vultr (optional)
```
DIGITALOCEAN_API_TOKEN=
VULTR_API_TOKEN=
```

### DNS
```
CLOUDFLARE_API_TOKEN=         # Needs DNS edit permission for zone
CLOUDFLARE_ZONE_ID=           # Zone ID for clawds.io
```

### Payments (Stripe)
```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_TIER_STARTER=    # Price ID from create-stripe-products script
STRIPE_PRICE_TIER_PRO=
STRIPE_PRICE_TIER_BUSINESS=
STRIPE_PRICE_TOKEN_5=         # AI credit top-up $5
STRIPE_PRICE_TOKEN_15=        # AI credit top-up $15
STRIPE_PRICE_TOKEN_50=        # AI credit top-up $50
```

### Email
```
RESEND_API_KEY=
FROM_EMAIL=Clawds <noreply@clawds.io>
```

### LiteLLM (AI credit management)
```
LITELLM_API_URL=https://llm.aitextura.com
LITELLM_MASTER_KEY=
```

### Admin
```
ADMIN_USER_IDS=<firebase-uid>  # Comma-separated, bootstrap admin
```

---

## Web (`apps/web/.env`)

```
VITE_API_URL=/api
VITE_BRAND=clawds

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## How to get each key

| Variable | Where to get it |
|----------|----------------|
| `DATABASE_URL` | neon.tech > Project > Connection Details |
| `FIREBASE_*` | Firebase Console > Project Settings > Service Accounts |
| `VITE_FIREBASE_*` | Firebase Console > Project Settings > General > Web App |
| `HETZNER_API_TOKEN` | Hetzner Cloud Console > Security > API Tokens |
| `CONTABO_*` | Contabo Customer Panel > Account > API |
| `CLOUDFLARE_API_TOKEN` | Cloudflare > My Profile > API Tokens > Create Token (DNS edit) |
| `CLOUDFLARE_ZONE_ID` | Cloudflare > clawds.io > Overview (right sidebar) |
| `STRIPE_SECRET_KEY` | Stripe Dashboard > Developers > API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard > Developers > Webhooks > Signing secret |
| `STRIPE_PRICE_*` | Run `pnpm tsx scripts/create-stripe-products.ts hetzner` |
| `RESEND_API_KEY` | Resend > API Keys |
| `LITELLM_MASTER_KEY` | Your LiteLLM instance config |
| `ADMIN_USER_IDS` | Firebase Console > Authentication > Users > UID |