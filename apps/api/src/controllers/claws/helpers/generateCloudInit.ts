import applyToolsDefaults from '@/controllers/claws/helpers/applyToolsDefaults'
import OPENCLAW_VERSION from '@/controllers/claws/helpers/openclawVersion'

const generateCloudInit = (
    rootPassword: string,
    subdomain: string,
    domain: string,
    gatewayToken: string,
    litellmApiKey?: string,
    litellmBaseUrl?: string
): string => {
    const fullDomain = `${subdomain}.${domain}`

    const config: Record<string, unknown> = {
        gateway: {
            mode: 'local',
            auth: {
                mode: 'token',
                token: gatewayToken
            },
            remote: {
                token: gatewayToken
            },
            controlUi: {
                allowInsecureAuth: true,
                allowedOrigins: [`https://${fullDomain}`],
                dangerouslyDisableDeviceAuth: true
            },
            trustedProxies: ['127.0.0.1', '::1']
        },
        channels: {
            whatsapp: { dmPolicy: 'open', allowFrom: ['*'] },
            telegram: { dmPolicy: 'open', allowFrom: ['*'] },
            discord: {},
            slack: {},
            signal: { dmPolicy: 'open', allowFrom: ['*'] }
        },
        commands: {
            restart: true,
            bash: true
        },
        browser: {
            enabled: true,
            executablePath: '/usr/bin/google-chrome-stable',
            headless: true,
            noSandbox: true
        }
    }

    applyToolsDefaults(config)
    config.agents = { defaults: { sandbox: { mode: 'off' } } }

    const configJson = JSON.stringify(config, null, 2).replace(/\n/g, '\n    ')

    return `#cloud-config

ssh_pwauth: true

chpasswd:
  list: |
    root:${rootPassword}
  expire: false

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
  - echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" > /etc/apt/sources.list.d/nodesource.list
  - apt-get update -o Dir::Etc::sourcelist="sources.list.d/nodesource.list" -o Dir::Etc::sourceparts="-" -o APT::Get::List-Cleanup="0"
  - apt-get install -y nodejs

  - npm install -g openclaw@${OPENCLAW_VERSION}

  - useradd -r -m -d /home/openclaw -s /bin/bash openclaw
  - echo 'openclaw ALL=(ALL) NOPASSWD: /usr/bin/systemctl start openclaw-gateway, /usr/bin/systemctl stop openclaw-gateway, /usr/bin/systemctl restart openclaw-gateway, /usr/bin/systemctl status openclaw-gateway, /usr/bin/docker ps, /usr/bin/docker logs *' > /etc/sudoers.d/openclaw
  - chmod 440 /etc/sudoers.d/openclaw

  - wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O /tmp/google-chrome.deb
  - dpkg -i /tmp/google-chrome.deb || apt-get install -f -y
  - rm -f /tmp/google-chrome.deb

  - mkdir -p /home/openclaw/.openclaw
  - mkdir -p /home/openclaw/.openclaw/agents/main/agent

  - |
    cat > /home/openclaw/.openclaw/openclaw.json << 'OCCONFIG'
    ${configJson}
    OCCONFIG

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
    Environment=NODE_ENV=production${litellmApiKey ? `\n    Environment=LITELLM_BASE_URL=${litellmBaseUrl || 'https://llm.aitextura.com'}\n    Environment=LITELLM_API_KEY=${litellmApiKey}` : ''}
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

  - systemctl daemon-reload
  - systemctl enable openclaw-gateway
  - systemctl start openclaw-gateway

  - |
    for i in $(seq 1 30); do
      if curl -sf -o /dev/null http://127.0.0.1:18789; then
        break
      fi
      systemctl restart openclaw-gateway 2>/dev/null || true
      sleep 10
    done

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
  - |
    cat > /etc/apt/apt.conf.d/20auto-upgrades << 'AUTOUPGRADEEOF'
    APT::Periodic::Update-Package-Lists "1";
    APT::Periodic::Unattended-Upgrade "1";
    APT::Periodic::Download-Upgradeable-Packages "1";
    APT::Periodic::AutocleanInterval "7";
    AUTOUPGRADEEOF
  - systemctl enable unattended-upgrades
  - systemctl start unattended-upgrades

  - |
    cat > /etc/docker/daemon.json << 'DOCKERCFGEOF'
    {
      "icc": false,
      "no-new-privileges": true,
      "userland-proxy": false,
      "log-driver": "json-file",
      "log-opts": {
        "max-size": "10m",
        "max-file": "3"
      }
    }
    DOCKERCFGEOF
  - systemctl restart docker || true

  - |
    cat > /usr/local/bin/setup-docker-firewall.sh << 'DOCKERFWEOF'
    #!/bin/bash
    iptables -I DOCKER-USER -i docker0 -d 169.254.0.0/16 -j DROP
    iptables -I DOCKER-USER -i docker0 -d 10.0.0.0/8 -j DROP
    iptables -I DOCKER-USER -i docker0 -d 172.16.0.0/12 -j DROP
    iptables -I DOCKER-USER -i docker0 -d 192.168.0.0/16 -j DROP
    iptables -A DOCKER-USER -j RETURN
    DOCKERFWEOF
  - chmod 755 /usr/local/bin/setup-docker-firewall.sh
  - /usr/local/bin/setup-docker-firewall.sh

  - |
    cat > /etc/nginx/sites-available/openclaw << 'NGINXEOF'
    limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;

    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }

    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name _;
        return 444;
    }

    server {
        listen 80;
        listen [::]:80;
        server_name ${fullDomain};

        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
        add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' wss: https:; font-src 'self'; frame-ancestors 'self';" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;

        limit_req zone=api burst=50 nodelay;
        limit_req_status 429;

        location / {
            proxy_pass http://127.0.0.1:18789;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_buffering off;
            proxy_read_timeout 86400;
            proxy_send_timeout 86400;
        }
    }
    NGINXEOF

  - ln -sf /etc/nginx/sites-available/openclaw /etc/nginx/sites-enabled/
  - rm -f /etc/nginx/sites-enabled/default
  - mkdir -p /etc/systemd/system/nginx.service.d
  - |
    cat > /etc/systemd/system/nginx.service.d/override.conf <<'NGINXOVERRIDE'
    [Service]
    Restart=always
    RestartSec=5
    NGINXOVERRIDE
  - systemctl daemon-reload
  - nginx -t && systemctl reload nginx
  - systemctl enable nginx

  - |
    for i in $(seq 1 24); do
      if host ${fullDomain} 1.1.1.1 > /dev/null 2>&1; then
        sleep 15
        break
      fi
      sleep 5
    done
  - certbot --nginx -d ${fullDomain} --non-interactive --agree-tos --email ssl@${domain} --redirect

  - echo "0 0,12 * * * root certbot renew --quiet --deploy-hook 'systemctl reload nginx'" > /etc/cron.d/certbot-renew
  - chmod 644 /etc/cron.d/certbot-renew

  - |
    cat > /tmp/install-brew.sh << 'BREWSCRIPT'
    #!/bin/bash
    su - openclaw -c 'NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/openclaw/.bashrc
    BREWSCRIPT
    chmod +x /tmp/install-brew.sh
    nohup /tmp/install-brew.sh > /var/log/brew-install.log 2>&1 &

  - |
    cat > /usr/local/bin/security-audit.sh << 'AUDITEOF'
    #!/bin/bash
    REPORT_FILE="/tmp/security-audit-$(date +%Y%m%d).json"
    FAILED_LOGINS=$(journalctl -u sshd --since "7 days ago" 2>/dev/null | grep -c "Failed password" || echo 0)
    BANNED_IPS=$(fail2ban-client status sshd 2>/dev/null | grep -oP 'Currently banned:\\s+\\K\\d+' || echo 0)
    BLOCKED_REQUESTS=$(grep -c "limiting requests" /var/log/nginx/error.log 2>/dev/null || echo 0)
    DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
    UPTIME=$(uptime -s)
    OPENCLAW_STATUS=$(systemctl is-active openclaw-gateway)
    cat > "$REPORT_FILE" << EOF
    {
      "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
      "failedLogins": $FAILED_LOGINS,
      "bannedIps": $BANNED_IPS,
      "blockedRequests": $BLOCKED_REQUESTS,
      "diskUsagePercent": $DISK_USAGE,
      "upSince": "$UPTIME",
      "openclawStatus": "$OPENCLAW_STATUS"
    }
    EOF
    rm -f "$REPORT_FILE"
    AUDITEOF
  - chmod 755 /usr/local/bin/security-audit.sh
  - echo "0 3 * * 0 root /usr/local/bin/security-audit.sh" >> /etc/crontab

final_message: "OpenClaw instance ready! Access dashboard at https://${fullDomain}/"
`
}

export default generateCloudInit