import { readFileSync } from 'fs'
import { resolve } from 'path'

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

const HETZNER_API_TOKEN = process.env.HETZNER_API_TOKEN

if (!HETZNER_API_TOKEN) {
    console.error('Missing HETZNER_API_TOKEN in apps/api/.env')
    process.exit(1)
}

const API = 'https://api.hetzner.cloud/v1'

const headers = {
    'Authorization': `Bearer ${HETZNER_API_TOKEN}`,
    'Content-Type': 'application/json'
}

const hetznerFetch = async (path: string, options?: RequestInit) => {
    const response = await fetch(`${API}${path}`, { ...options, headers })
    if (!response.ok) {
        const body = await response.text()
        throw new Error(`Hetzner API error ${response.status}: ${body}`)
    }
    return response.json()
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const CLOUD_INIT = `#cloud-config

package_update: true

packages:
  - curl
  - nginx
  - certbot
  - python3-certbot-nginx
  - ufw
  - ca-certificates
  - gnupg
  - git
  - dnsutils
  - fail2ban
  - unattended-upgrades
  - apt-listchanges
  - jq

runcmd:
  - fallocate -l 2G /swapfile
  - chmod 600 /swapfile
  - mkswap /swapfile
  - swapon /swapfile
  - echo '/swapfile none swap sw 0 0' >> /etc/fstab

  - mkdir -p /etc/apt/keyrings
  - curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  - echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" > /etc/apt/sources.list.d/nodesource.list
  - apt-get update -o Dir::Etc::sourcelist="sources.list.d/nodesource.list" -o Dir::Etc::sourceparts="-" -o APT::Get::List-Cleanup="0"
  - apt-get install -y nodejs

  - npm install -g openclaw@latest

  - useradd -r -m -d /home/openclaw -s /bin/bash openclaw
  - echo 'openclaw ALL=(ALL) NOPASSWD: /usr/bin/systemctl start openclaw-gateway, /usr/bin/systemctl stop openclaw-gateway, /usr/bin/systemctl restart openclaw-gateway, /usr/bin/systemctl status openclaw-gateway, /usr/bin/docker ps, /usr/bin/docker logs *' > /etc/sudoers.d/openclaw
  - chmod 440 /etc/sudoers.d/openclaw

  - wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O /tmp/google-chrome.deb
  - dpkg -i /tmp/google-chrome.deb || apt-get install -f -y
  - rm -f /tmp/google-chrome.deb

  - mkdir -p /home/openclaw/.openclaw
  - mkdir -p /home/openclaw/.openclaw/agents/main/agent
  - chown -R openclaw:openclaw /home/openclaw

  - |
    cat > /etc/systemd/system/openclaw-gateway.service <<'SYSTEMD'
    [Unit]
    Description=OpenClaw Gateway
    After=network.target

    [Service]
    Type=simple
    User=openclaw
    Group=openclaw
    WorkingDirectory=/home/openclaw
    Environment=HOME=/home/openclaw
    Environment=NODE_ENV=production
    ExecStart=/usr/bin/openclaw gateway --port 18789 --bind loopback
    Restart=always
    RestartSec=10
    StartLimitIntervalSec=0
    StandardOutput=append:/var/log/openclaw-gateway.log
    StandardError=append:/var/log/openclaw-gateway.log
    NoNewPrivileges=true
    ProtectSystem=strict
    ProtectHome=read-only
    PrivateTmp=true
    ProtectKernelTunables=true
    ProtectKernelModules=true
    ProtectControlGroups=true
    RestrictSUIDSGID=true
    ReadWritePaths=/home/openclaw/.openclaw /var/log/openclaw-gateway.log /tmp

    [Install]
    WantedBy=multi-user.target
    SYSTEMD
  - mkdir -p /etc/systemd/system/openclaw-gateway.service.d
  - systemctl daemon-reload
  - systemctl enable openclaw-gateway

  - ufw default deny incoming
  - ufw default allow outgoing
  - ufw allow 22/tcp
  - ufw allow 80/tcp
  - ufw allow 443/tcp
  - ufw --force enable

  - |
    cat > /etc/fail2ban/jail.local << 'FAIL2BANEOF'
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
    filter = nginx-limit-req
    logpath = /var/log/nginx/error.log
    maxretry = 10
    bantime = 600
    FAIL2BANEOF
  - systemctl enable fail2ban
  - systemctl start fail2ban

  - |
    cat > /etc/apt/apt.conf.d/50unattended-upgrades << 'UNATTENDEDEOF'
    Unattended-Upgrade::Allowed-Origins {
      "\${distro_id}:\${distro_codename}-security";
      "\${distro_id}ESMApps:\${distro_codename}-apps-security";
    };
    Unattended-Upgrade::AutoFixInterruptedDpkg "true";
    Unattended-Upgrade::Remove-Unused-Dependencies "true";
    Unattended-Upgrade::Automatic-Reboot "false";
    UNATTENDEDEOF
  - systemctl enable unattended-upgrades

  - systemctl enable nginx

  - |
    cat > /tmp/install-brew.sh << 'BREWSCRIPT'
    #!/bin/bash
    su - openclaw -c 'NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/openclaw/.bashrc
    BREWSCRIPT
    chmod +x /tmp/install-brew.sh
    nohup /tmp/install-brew.sh > /var/log/brew-install.log 2>&1 &

  - |
    for i in $(seq 1 60); do
      if systemctl is-active --quiet openclaw-gateway; then break; fi
      sleep 5
    done

  - rm -f /etc/ssh/ssh_host_*
  - truncate -s 0 /var/log/*.log
  - history -c
  - touch /var/lib/cloud/.snapshot-ready

final_message: "Snapshot base image ready"
`

async function createSnapshot() {
    console.log('Creating Hetzner snapshot base image...\n')

    console.log('1. Creating cx22 server with Ubuntu 24.04...')
    const createResult = await hetznerFetch('/servers', {
        method: 'POST',
        body: JSON.stringify({
            name: 'clawds-snapshot-builder',
            server_type: 'cx23',
            image: 'ubuntu-24.04',
            location: 'nbg1',
            user_data: CLOUD_INIT,
            start_after_create: true
        })
    })

    const serverId = createResult.server.id
    console.log(`   Server created: ${serverId}`)

    console.log('2. Waiting for cloud-init to complete (~12 min)...')
    for (let i = 0; i < 50; i++) {
        await sleep(15000)
        const elapsed = Math.floor((i + 1) * 15 / 60)
        const secs = ((i + 1) * 15) % 60
        process.stdout.write(`   [${elapsed}m ${secs}s] Waiting...   \r`)
    }
    console.log('\n   12+ minutes elapsed, cloud-init should be done.')

    console.log('3. Stopping server before snapshot...')
    await hetznerFetch(`/servers/${serverId}/actions/shutdown`, {
        method: 'POST'
    })

    for (let i = 0; i < 30; i++) {
        await sleep(5000)
        const status = await hetznerFetch(`/servers/${serverId}`)
        if (status.server.status === 'off') break
    }

    console.log('4. Creating snapshot...')
    const snapshotResult = await hetznerFetch(
        `/servers/${serverId}/actions/create_image`,
        {
            method: 'POST',
            body: JSON.stringify({
                description: `clawds-base-${new Date().toISOString().slice(0, 10)}`,
                type: 'snapshot'
            })
        }
    )

    const imageId = snapshotResult.image.id
    console.log(`   Snapshot ID: ${imageId}`)

    console.log('5. Waiting for snapshot to complete...')
    for (let i = 0; i < 60; i++) {
        await sleep(10000)
        const imageStatus = await hetznerFetch(`/images/${imageId}`)
        if (imageStatus.image.status === 'available') {
            console.log('   Snapshot ready!')
            break
        }
    }

    console.log('6. Deleting builder server...')
    await hetznerFetch(`/servers/${serverId}`, { method: 'DELETE' })

    console.log('\n--- Add this to apps/api/.env ---\n')
    console.log(`HETZNER_SNAPSHOT_ID=${imageId}`)
    console.log()
}

createSnapshot().catch((err) => {
    console.error('Error:', err)
    process.exit(1)
})