import type {
    CloudProvider,
    ContaboInstance,
    ContaboInstancesResponse,
    ContaboSecretsResponse,
    ContaboTokenResponse,
    ServerStatus,
    CreateServerResult,
    ServerTypeInfo,
    LocationInfo,
    CreateSSHKeyResult,
    VolumeInfo,
    VolumeDetails,
    VolumePricingResult,
    RawServerType,
    DatacenterAvailability
} from '@/ts/Interfaces'

import crypto from 'crypto'
import { clawStatus } from '@openclaw/shared'

const TOKEN_URL = 'https://auth.contabo.com/auth/realms/contabo/protocol/openid-connect/token'
const API_BASE = 'https://api.contabo.com/v1'

let cachedToken: { token: string; expiresAt: number } | null = null

const getAccessToken = async (): Promise<string> => {
    if (cachedToken && Date.now() < cachedToken.expiresAt) {
        return cachedToken.token
    }

    const clientId = process.env.CONTABO_CLIENT_ID
    const clientSecret = process.env.CONTABO_CLIENT_SECRET
    const apiUser = process.env.CONTABO_API_USER
    const apiPassword = process.env.CONTABO_API_PASSWORD

    if (!clientId || !clientSecret || !apiUser || !apiPassword) {
        throw new Error('Contabo API credentials are not configured')
    }

    const response = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            username: apiUser,
            password: apiPassword,
            grant_type: 'password'
        })
    })

    if (!response.ok) {
        throw new Error(`Contabo auth failed: ${response.status}`)
    }

    const data = await response.json() as ContaboTokenResponse

    cachedToken = {
        token: data.access_token,
        expiresAt: Date.now() + (data.expires_in - 60) * 1000
    }

    return cachedToken.token
}

const apiRequest = async <T>(
    method: string,
    path: string,
    body?: Record<string, unknown>
): Promise<T> => {
    const token = await getAccessToken()
    const requestId = crypto.randomUUID()

    const options: RequestInit = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-request-id': requestId,
            'Content-Type': 'application/json'
        }
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    const response = await fetch(`${API_BASE}${path}`, options)

    if (!response.ok) {
        const errorText = await response.text().catch(() => '')
        throw new Error(`Contabo API ${method} ${path} failed: ${response.status} ${errorText}`)
    }

    if (response.status === 204) {
        return undefined as T
    }

    return response.json() as Promise<T>
}

const mapStatus = (contaboStatus: string): string => {
    const statusMap: Record<string, string> = {
        provisioning: clawStatus.creating,
        installing: clawStatus.initializing,
        running: 'running',
        stopped: clawStatus.stopped,
        error: clawStatus.stopped
    }
    return statusMap[contaboStatus] || contaboStatus
}

const extractIp = (instance: ContaboInstance): string => {
    return instance.ipConfig?.v4?.ip || ''
}

const UBUNTU_IMAGE_ID = process.env.CONTABO_IMAGE_ID || 'afecbb85-e2fc-46f0-9684-b46b1faf00bb'

const contabo: CloudProvider = {
    async createServer(
        name: string,
        serverType: string,
        location: string,
        _rootPassword?: string,
        sshKeyIds?: number[],
        _snapshotId?: string,
        userData?: string
    ): Promise<CreateServerResult> {
        const body: Record<string, unknown> = {
            productId: serverType,
            region: location,
            imageId: UBUNTU_IMAGE_ID,
            period: 1,
            displayName: name
        }

        if (sshKeyIds?.length) {
            body.sshKeys = sshKeyIds
        }

        if (userData) {
            body.userData = Buffer.from(userData).toString('base64')
        }

        const data = await apiRequest<ContaboInstancesResponse>(
            'POST',
            '/compute/instances',
            body
        )

        const instance = data.data[0]

        return {
            serverId: instance.instanceId,
            ip: extractIp(instance),
            rootPassword: ''
        }
    },

    async getServer(serverId: string): Promise<ServerStatus> {
        const data = await apiRequest<ContaboInstancesResponse>(
            'GET',
            `/compute/instances/${serverId}`
        )
        const instance = data.data[0]
        return {
            status: mapStatus(instance.status),
            ip: extractIp(instance)
        }
    },

    async getServers(): Promise<Map<string, ServerStatus>> {
        const result = new Map<string, ServerStatus>()
        const data = await apiRequest<ContaboInstancesResponse>(
            'GET',
            '/compute/instances?size=100&page=1'
        )

        for (const instance of data.data) {
            result.set(String(instance.instanceId), {
                status: mapStatus(instance.status),
                ip: extractIp(instance)
            })
        }

        return result
    },

    async startServer(serverId: string): Promise<void> {
        await apiRequest('POST', `/compute/instances/${serverId}/actions/start`)
    },

    async stopServer(serverId: string): Promise<void> {
        await apiRequest('POST', `/compute/instances/${serverId}/actions/stop`)
    },

    async restartServer(serverId: string): Promise<void> {
        await apiRequest('POST', `/compute/instances/${serverId}/actions/restart`)
    },

    async deleteServer(serverId: string): Promise<void> {
        await apiRequest('DELETE', `/compute/instances/${serverId}`)
    },

    async getServerTypes(): Promise<ServerTypeInfo[]> {
        return [
            {
                name: 'V45',
                description: 'Cloud VPS 10',
                cores: 3,
                memory: 8,
                disk: 75,
                architecture: 'x86',
                priceHourly: 0.007,
                priceMonthly: 4.95
            },
            {
                name: 'V47',
                description: 'Cloud VPS 20',
                cores: 4,
                memory: 12,
                disk: 150,
                architecture: 'x86',
                priceHourly: 0.013,
                priceMonthly: 8.95
            },
            {
                name: 'V49',
                description: 'Cloud VPS 30',
                cores: 6,
                memory: 16,
                disk: 200,
                architecture: 'x86',
                priceHourly: 0.021,
                priceMonthly: 14.95
            }
        ]
    },

    async getLocations(): Promise<LocationInfo[]> {
        return [
            { id: 'EU', name: 'Europe', city: 'Nuremberg', country: 'DE', disabled: false },
            { id: 'US-central', name: 'US Central', city: 'St. Louis', country: 'US', disabled: false },
            { id: 'US-east', name: 'US East', city: 'New York', country: 'US', disabled: false },
            { id: 'US-west', name: 'US West', city: 'Seattle', country: 'US', disabled: false },
            { id: 'SIN', name: 'Singapore', city: 'Singapore', country: 'SG', disabled: false },
            { id: 'UK', name: 'United Kingdom', city: 'London', country: 'GB', disabled: false },
            { id: 'AUS', name: 'Australia', city: 'Sydney', country: 'AU', disabled: false },
            { id: 'JPN', name: 'Japan', city: 'Tokyo', country: 'JP', disabled: false }
        ]
    },

    async getRawServerTypes(): Promise<RawServerType[]> {
        return [
            { id: 45, name: 'V45' },
            { id: 47, name: 'V47' },
            { id: 49, name: 'V49' }
        ]
    },

    async getDatacenters(): Promise<DatacenterAvailability[]> {
        return [
            { name: 'EU1', locationName: 'EU', availableServerTypeIds: [45, 47, 49] },
            { name: 'US1', locationName: 'US-central', availableServerTypeIds: [45, 47, 49] },
            { name: 'US2', locationName: 'US-east', availableServerTypeIds: [45, 47, 49] }
        ]
    },

    async createSSHKey(
        name: string,
        publicKey: string
    ): Promise<CreateSSHKeyResult> {
        const data = await apiRequest<ContaboSecretsResponse>(
            'POST',
            '/secrets',
            {
                name,
                value: publicKey,
                type: 'ssh'
            }
        )

        const secret = data.data[0]
        const fingerprint = name

        return {
            id: secret.secretId,
            name: secret.name,
            fingerprint
        }
    },

    async deleteSSHKey(keyId: number): Promise<void> {
        await apiRequest('DELETE', `/secrets/${keyId}`)
    },

    async getVolumePricing(): Promise<VolumePricingResult> {
        return { pricePerGbMonthly: 0 }
    },

    async createVolume(
        _name: string,
        _size: number,
        _location: string,
        _serverId?: number
    ): Promise<VolumeInfo> {
        throw new Error('Volumes not supported on Contabo')
    },

    async attachVolume(_volumeId: number, _serverId: number): Promise<void> {
        throw new Error('Volumes not supported on Contabo')
    },

    async detachVolume(_volumeId: number): Promise<void> {
        throw new Error('Volumes not supported on Contabo')
    },

    async deleteVolume(_volumeId: number): Promise<void> {
        throw new Error('Volumes not supported on Contabo')
    },

    async getVolume(_volumeId: number): Promise<VolumeDetails> {
        throw new Error('Volumes not supported on Contabo')
    }
}

export default contabo