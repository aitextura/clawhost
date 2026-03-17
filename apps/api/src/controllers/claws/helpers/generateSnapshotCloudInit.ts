import applyToolsDefaults from '@/controllers/claws/helpers/applyToolsDefaults'

const generateSnapshotCloudInit = (
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

    const litellmEnv = litellmApiKey
        ? `\n    Environment=LITELLM_BASE_URL=${litellmBaseUrl || 'https://llm.aitextura.com'}\n    Environment=LITELLM_API_KEY=${litellmApiKey}`
        : ''

    return `#cloud-config

ssh_pwauth: true

chpasswd:
  list: |
    root:${rootPassword}
  expire: false

runcmd:
  - ssh-keygen -A
  - systemctl restart sshd

  - |
    cat > /home/openclaw/.openclaw/openclaw.json << 'OCCONFIG'
    ${configJson}
    OCCONFIG
  - chown -R openclaw:openclaw /home/openclaw

  - |
    cat > /etc/systemd/system/openclaw-gateway.service.d/override.conf <<'ENVOVERRIDE'
    [Service]${litellmEnv}
    ENVOVERRIDE
  - systemctl daemon-reload
  - systemctl restart openclaw-gateway

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
  - nginx -t && systemctl reload nginx

  - |
    for i in $(seq 1 24); do
      if host ${fullDomain} 1.1.1.1 > /dev/null 2>&1; then
        sleep 15
        break
      fi
      sleep 5
    done
  - certbot --nginx -d ${fullDomain} --non-interactive --agree-tos --email ssl@${domain} --redirect

final_message: "OpenClaw instance ready! Access dashboard at https://${fullDomain}/"
`
}

export default generateSnapshotCloudInit