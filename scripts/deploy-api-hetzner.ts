import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { homedir } from 'os'
import { config } from 'dotenv'

const envPath = resolve(import.meta.dirname ?? __dirname, '../apps/api/.env')
config({ path: envPath })

const HETZNER_API = 'https://api.hetzner.cloud/v1'
const HETZNER_TOKEN = process.env.HETZNER_API_TOKEN

if (!HETZNER_TOKEN) {
    console.error('HETZNER_API_TOKEN not found in apps/api/.env or environment!')
    process.exit(1)
}

const SERVER_NAME = 'clawds-api'
const SERVER_TYPE = 'cx23'
const LOCATION = 'nbg1'
const IMAGE = 'ubuntu-24.04'
const DOMAIN = 'api.clawds.io'

async function hetznerApi(path: string, method = 'GET', body?: unknown) {
    const res = await fetch(`${HETZNER_API}${path}`, {
        method,
        headers: {
            'Authorization': `Bearer ${HETZNER_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
    })
    const data = await res.json()
    if (!res.ok) {
        console.error('Hetzner API error:', JSON.stringify(data, null, 2))
        process.exit(1)
    }
    return data
}

function generateCloudInit(envContent: string): string {
    return `#cloud-config
package_update: true
package_upgrade: true

packages:
  - ufw
  - fail2ban
  - nginx
  - certbot
  - python3-certbot-nginx
  - unattended-upgrades
  - apt-listchanges
  - git
  - curl
  - jq

write_files:
  - path: /etc/fail2ban/jail.local
    content: |
      [DEFAULT]
      bantime = 3600
      findtime = 600
      maxretry = 5
      backend = systemd

      [sshd]
      enabled = true
      port = 22
      maxretry = 3
      bantime = 7200

      [nginx-limit-req]
      enabled = true
      port = http,https
      logpath = /var/log/nginx/error.log
      maxretry = 10

      [nginx-botsearch]
      enabled = true
      port = http,https
      logpath = /var/log/nginx/access.log
      maxretry = 5

  - path: /etc/ssh/sshd_config.d/hardened.conf
    content: |
      PermitRootLogin prohibit-password
      PasswordAuthentication no
      PubkeyAuthentication yes
      MaxAuthTries 3
      LoginGraceTime 30
      X11Forwarding no
      AllowTcpForwarding no
      ClientAliveInterval 300
      ClientAliveCountMax 2

  - path: /etc/nginx/sites-available/${DOMAIN}
    content: |
      server {
          listen 80;
          server_name ${DOMAIN};

          location / {
              proxy_pass http://127.0.0.1:2222;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection "upgrade";
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
              proxy_read_timeout 86400;
              proxy_send_timeout 86400;
              client_max_body_size 50M;
          }
      }

  - path: /etc/nginx/conf.d/security.conf
    content: |
      server_tokens off;
      add_header X-Content-Type-Options nosniff always;
      add_header X-Frame-Options DENY always;
      add_header X-XSS-Protection "1; mode=block" always;
      add_header Referrer-Policy "strict-origin-when-cross-origin" always;

  - path: /opt/clawds-api/.env
    permissions: '0600'
    content: |
${envContent.split('\n').map(l => `      ${l}`).join('\n')}

  - path: /etc/systemd/system/clawds-api.service
    content: |
      [Unit]
      Description=Clawds API
      After=network.target

      [Service]
      Type=simple
      User=clawds
      WorkingDirectory=/opt/clawds-api/clawhost
      ExecStart=/usr/local/bin/pnpm dev:api
      Restart=always
      RestartSec=5
      Environment=NODE_ENV=production
      EnvironmentFile=/opt/clawds-api/.env
      StandardOutput=journal
      StandardError=journal
      SyslogIdentifier=clawds-api

      [Install]
      WantedBy=multi-user.target

  - path: /opt/clawds-api/deploy.sh
    permissions: '0755'
    content: |
      #!/bin/bash
      set -e
      cd /opt/clawds-api/clawhost
      git pull origin main
      pnpm install --frozen-lockfile
      pnpm --filter api build 2>/dev/null || true
      sudo systemctl restart clawds-api
      echo "Deploy complete"

  - path: /etc/sysctl.d/99-security.conf
    content: |
      net.ipv4.tcp_syncookies = 1
      net.ipv4.conf.all.rp_filter = 1
      net.ipv4.conf.default.rp_filter = 1
      net.ipv4.conf.all.accept_redirects = 0
      net.ipv4.conf.default.accept_redirects = 0
      net.ipv4.conf.all.send_redirects = 0
      net.ipv4.conf.default.send_redirects = 0
      net.ipv4.icmp_echo_ignore_broadcasts = 1
      net.ipv4.conf.all.accept_source_route = 0
      net.ipv6.conf.all.accept_redirects = 0
      net.ipv6.conf.default.accept_redirects = 0

runcmd:
  - sysctl --system

  # Firewall
  - ufw default deny incoming
  - ufw default allow outgoing
  - ufw allow 22/tcp
  - ufw allow 80/tcp
  - ufw allow 443/tcp
  - ufw --force enable

  # fail2ban
  - systemctl enable fail2ban
  - systemctl restart fail2ban

  # Node.js 20 LTS (NOT 22 — v22 breaks tsx ESM resolution of workspace .ts packages)
  - curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  - apt-get install -y nodejs
  - npm install -g pnpm@10.29.3 tsx

  # Create user
  - useradd -r -m -s /bin/bash -d /opt/clawds-api clawds
  - chown -R clawds:clawds /opt/clawds-api

  # Clone repo
  - su - clawds -c "git clone https://github.com/AiTextura/openclaw-saas.git /opt/clawds-api/repo"
  - su - clawds -c "cp -r /opt/clawds-api/repo/clawhost /opt/clawds-api/clawhost"
  - su - clawds -c "cd /opt/clawds-api/clawhost && pnpm install --frozen-lockfile"

  # Swap (2GB)
  - fallocate -l 2G /swapfile
  - chmod 600 /swapfile
  - mkswap /swapfile
  - swapon /swapfile
  - echo '/swapfile none swap sw 0 0' >> /etc/fstab

  # Nginx
  - rm -f /etc/nginx/sites-enabled/default
  - ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/${DOMAIN}
  - nginx -t
  - systemctl reload nginx

  # Start API
  - systemctl enable clawds-api
  - systemctl start clawds-api

  # Auto-updates
  - dpkg-reconfigure -plow unattended-upgrades

  # SSL (wait for DNS, retry)
  - |
    for i in $(seq 1 30); do
      if host ${DOMAIN} > /dev/null 2>&1; then
        certbot --nginx -d ${DOMAIN} --non-interactive --agree-tos --email admin@clawds.io --redirect
        break
      fi
      echo "Waiting for DNS... attempt $i/30"
      sleep 30
    done
`
}

async function main() {
    const action = process.argv[2]

    if (action === 'create') {
        const envPath = process.argv[3]
        if (!envPath) {
            console.error('Usage: pnpm tsx scripts/deploy-api-hetzner.ts create <path-to-env-file>')
            console.error('')
            console.error('The .env file should contain all API environment variables:')
            console.error('  PORT=2222')
            console.error('  DATABASE_URL=postgresql://...')
            console.error('  FIREBASE_PROJECT_ID=...')
            console.error('  etc.')
            process.exit(1)
        }

        let envContent: string
        try {
            envContent = readFileSync(resolve(envPath), 'utf-8').trim()
        } catch {
            console.error(`Could not read env file: ${envPath}`)
            process.exit(1)
        }

        console.log('Creating Hetzner server for Clawds API...')
        console.log(`  Name: ${SERVER_NAME}`)
        console.log(`  Type: ${SERVER_TYPE} (2 vCPU, 4GB RAM, 40GB SSD)`)
        console.log(`  Location: ${LOCATION} (Nuremberg, DE)`)
        console.log(`  Image: ${IMAGE}`)
        console.log('')

        const existing = await hetznerApi('/servers?name=' + SERVER_NAME)
        if (existing.servers?.length > 0) {
            console.error(`Server "${SERVER_NAME}" already exists!`)
            console.error(`IP: ${existing.servers[0].public_net.ipv4.ip}`)
            console.error('Use "destroy" action first, or SSH in to redeploy.')
            process.exit(1)
        }

        let sshKeyId: number | undefined
        const pubKeyPath = resolve(homedir(), '.ssh/id_rsa.pub')
        if (existsSync(pubKeyPath)) {
            const pubKey = readFileSync(pubKeyPath, 'utf-8').trim()
            console.log('Found SSH key, uploading to Hetzner...')
            try {
                const { ssh_key } = await hetznerApi('/ssh_keys', 'POST', {
                    name: `clawds-deploy-${Date.now()}`,
                    public_key: pubKey
                })
                sshKeyId = ssh_key.id
                console.log(`  SSH key uploaded (ID: ${sshKeyId})`)
            } catch {
                const { ssh_keys } = await hetznerApi('/ssh_keys')
                const existing = ssh_keys.find((k: { public_key: string }) => k.public_key.trim() === pubKey)
                if (existing) {
                    sshKeyId = existing.id
                    console.log(`  SSH key already exists (ID: ${sshKeyId})`)
                }
            }
        } else {
            console.log('WARNING: No SSH key found at ~/.ssh/id_rsa.pub')
            console.log('Server will only be accessible via root password!')
        }
        console.log('')

        const cloudInit = generateCloudInit(envContent)

        const { server, root_password } = await hetznerApi('/servers', 'POST', {
            name: SERVER_NAME,
            server_type: SERVER_TYPE,
            location: LOCATION,
            image: IMAGE,
            user_data: cloudInit,
            ssh_keys: sshKeyId ? [sshKeyId] : [],
            start_after_create: true,
            labels: {
                app: 'clawds-api',
                env: 'production'
            }
        })

        const ip = server.public_net.ipv4.ip

        console.log('Server created!')
        console.log('')
        console.log(`  ID: ${server.id}`)
        console.log(`  IP: ${ip}`)
        console.log(`  Root password: ${root_password}`)
        console.log(`  Status: ${server.status}`)
        console.log('')
        console.log('Next steps:')
        console.log(`  1. Add DNS A record: ${DOMAIN} -> ${ip}`)
        console.log('  2. Wait ~5 min for cloud-init to complete')
        console.log(`  3. SSH in: ssh root@${ip}`)
        console.log('  4. Check status: systemctl status clawds-api')
        console.log('  5. Check logs: journalctl -u clawds-api -f')
        console.log('  6. SSL will auto-configure once DNS resolves')
        console.log('')
        console.log('To redeploy later:')
        console.log(`  ssh clawds@${ip} /opt/clawds-api/deploy.sh`)

    } else if (action === 'status') {
        const data = await hetznerApi('/servers?name=' + SERVER_NAME)
        if (data.servers?.length === 0) {
            console.log('No server found.')
            return
        }
        const s = data.servers[0]
        console.log(`Server: ${s.name}`)
        console.log(`  ID: ${s.id}`)
        console.log(`  IP: ${s.public_net.ipv4.ip}`)
        console.log(`  Status: ${s.status}`)
        console.log(`  Type: ${s.server_type.name}`)
        console.log(`  Location: ${s.datacenter.name}`)

    } else if (action === 'destroy') {
        const data = await hetznerApi('/servers?name=' + SERVER_NAME)
        if (data.servers?.length === 0) {
            console.log('No server found.')
            return
        }
        const s = data.servers[0]
        console.log(`Destroying server ${s.name} (${s.public_net.ipv4.ip})...`)
        await hetznerApi(`/servers/${s.id}`, 'DELETE')
        console.log('Server destroyed.')

    } else {
        console.log('Clawds API Hetzner Deploy Script')
        console.log('')
        console.log('Usage:')
        console.log('  pnpm tsx scripts/deploy-api-hetzner.ts create <path-to-env>')
        console.log('  pnpm tsx scripts/deploy-api-hetzner.ts status')
        console.log('  pnpm tsx scripts/deploy-api-hetzner.ts destroy')
    }
}

main().catch(console.error)