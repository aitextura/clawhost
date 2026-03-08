import type {
    CloudProvider,
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

import { exec } from 'child_process'
import { promisify } from 'util'

const run = promisify(exec)

let nextServerId = 90000
let nextSshKeyId = 80000
let nextVolumeId = 70000
let nextPort = 18789

const DOCKER_IMAGE = 'clawds-gateway'

interface MockServer {
    containerId: string
    port: number
    status: string
    ip: string
}

const servers = new Map<string, MockServer>()

let dockerMode: boolean | null = null

const checkDockerImage = async (): Promise<boolean> => {
    if (dockerMode !== null) return dockerMode
    try {
        const { stdout } = await run(`docker images -q ${DOCKER_IMAGE} 2>/dev/null`)
        dockerMode = !!stdout.trim()
        if (!dockerMode) {
            console.log(`[mock] Docker image ${DOCKER_IMAGE} not found. Run: bash scripts/mock-setup.sh`)
            console.log('[mock] Using plain mock (no real gateway)')
        }
    } catch {
        dockerMode = false
        console.log('[mock] Docker not available, using plain mock')
    }
    return dockerMode
}

// ---------------------------------------------------------------------------
// Server type data — includes all tier plan names
// ---------------------------------------------------------------------------

const hetznerServerTypes: ServerTypeInfo[] = [
    { name: 'cx22',  description: 'CX22 — 2 vCPU, 4 GB RAM, 40 GB disk',    cores: 2,  memory: 4,   disk: 40,  architecture: 'x86', priceHourly: 0.006, priceMonthly: 3.99  },
    { name: 'cx23',  description: 'CX23 — 2 vCPU, 4 GB RAM, 40 GB disk',    cores: 2,  memory: 4,   disk: 40,  architecture: 'x86', priceHourly: 0.007, priceMonthly: 4.59  },
    { name: 'cx32',  description: 'CX32 — 4 vCPU, 8 GB RAM, 80 GB disk',    cores: 4,  memory: 8,   disk: 80,  architecture: 'x86', priceHourly: 0.013, priceMonthly: 8.49  },
    { name: 'cx33',  description: 'CX33 — 2 vCPU, 8 GB RAM, 80 GB disk',    cores: 2,  memory: 8,   disk: 80,  architecture: 'x86', priceHourly: 0.014, priceMonthly: 8.98  },
    { name: 'cx42',  description: 'CX42 — 8 vCPU, 16 GB RAM, 160 GB disk',  cores: 8,  memory: 16,  disk: 160, architecture: 'x86', priceHourly: 0.026, priceMonthly: 16.99 },
    { name: 'cx43',  description: 'CX43 — 4 vCPU, 16 GB RAM, 160 GB disk',  cores: 4,  memory: 16,  disk: 160, architecture: 'x86', priceHourly: 0.027, priceMonthly: 17.68 },
    { name: 'cx53',  description: 'CX53 — 8 vCPU, 32 GB RAM, 240 GB disk',  cores: 8,  memory: 32,  disk: 240, architecture: 'x86', priceHourly: 0.053, priceMonthly: 34.49 }
]

const digitaloceanServerTypes: ServerTypeInfo[] = [
    { name: 's-2vcpu-4gb',  description: 'Basic — 2 vCPU, 4 GB RAM',  cores: 2, memory: 4,  disk: 80,  architecture: 'x86', priceHourly: 0.036, priceMonthly: 24 },
    { name: 's-4vcpu-8gb',  description: 'Basic — 4 vCPU, 8 GB RAM',  cores: 4, memory: 8,  disk: 160, architecture: 'x86', priceHourly: 0.071, priceMonthly: 48 },
    { name: 's-8vcpu-16gb', description: 'Basic — 8 vCPU, 16 GB RAM', cores: 8, memory: 16, disk: 320, architecture: 'x86', priceHourly: 0.143, priceMonthly: 96 }
]

const vultrServerTypes: ServerTypeInfo[] = [
    { name: 'vc2-2c-4gb',  description: 'VC2 — 2 vCPU, 4 GB RAM',  cores: 2, memory: 4,  disk: 80,  architecture: 'x86', priceHourly: 0.030, priceMonthly: 20 },
    { name: 'vc2-4c-8gb',  description: 'VC2 — 4 vCPU, 8 GB RAM',  cores: 4, memory: 8,  disk: 160, architecture: 'x86', priceHourly: 0.060, priceMonthly: 40 },
    { name: 'vc2-8c-16gb', description: 'VC2 — 8 vCPU, 16 GB RAM', cores: 8, memory: 16, disk: 320, architecture: 'x86', priceHourly: 0.119, priceMonthly: 80 }
]

const allServerTypes = [
    ...hetznerServerTypes,
    ...digitaloceanServerTypes,
    ...vultrServerTypes
]

const allRawServerTypes: RawServerType[] = allServerTypes.map((st, i) => ({
    id: 9001 + i,
    name: st.name
}))

const hetznerLocations: LocationInfo[] = [
    { id: 'fsn1', name: 'Falkenstein', city: 'Falkenstein', country: 'DE', disabled: false },
    { id: 'nbg1', name: 'Nuremberg',   city: 'Nuremberg',   country: 'DE', disabled: false }
]

const digitaloceanLocations: LocationInfo[] = [
    { id: 'nyc1', name: 'New York 1', city: 'New York', country: 'US', disabled: false }
]

const vultrLocations: LocationInfo[] = [
    { id: 'ewr', name: 'New Jersey', city: 'New Jersey', country: 'US', disabled: false }
]

const allLocations = [
    ...hetznerLocations,
    ...digitaloceanLocations,
    ...vultrLocations
]

const allServerTypeIds = allRawServerTypes.map((st) => st.id)

// ---------------------------------------------------------------------------
// Mock provider — uses Docker if image pre-built, otherwise plain mock
// ---------------------------------------------------------------------------

const mock: CloudProvider = {
    async createServer(
        name: string,
        _serverType: string,
        _location: string,
        rootPassword?: string,
        _sshKeyIds?: number[],
        _snapshotId?: string,
        _userData?: string
    ): Promise<CreateServerResult> {
        const serverId = nextServerId++
        const port = nextPort++
        const sshPort = port + 10000
        const password = rootPassword || 'mock-root-password'

        const hasDocker = await checkDockerImage()

        if (hasDocker) {
            try {
                const { stdout } = await run(
                    `docker run -d --name clawds-${serverId}` +
                    ` -p ${port}:18789 -p ${sshPort}:22` +
                    ` -e ROOT_PASSWORD=${password}` +
                    ` ${DOCKER_IMAGE}`
                )
                const containerId = stdout.trim()

                servers.set(String(serverId), { containerId, port, status: 'running', ip: '127.0.0.1' })
                console.log(`[mock-docker] Started container clawds-${serverId} gateway=${port} ssh=${sshPort}`)
                return { serverId, ip: `127.0.0.1:${sshPort}`, rootPassword: password }
            } catch (err) {
                console.error(`[mock-docker] Failed to start container:`, err)
            }
        }

        // Fallback: plain mock (no SSH)
        servers.set(String(serverId), { containerId: '', port, status: 'running', ip: '127.0.0.1' })
        console.log(`[mock] Created virtual server ${serverId} (${name}) — no Docker`)
        return { serverId, ip: '127.0.0.1', rootPassword: password }
    },

    async getServer(serverId: string): Promise<ServerStatus> {
        const server = servers.get(serverId)
        return server
            ? { status: server.status, ip: server.ip }
            : { status: 'running', ip: '127.0.0.1' }
    },

    async getServers(): Promise<Map<string, ServerStatus>> {
        const result = new Map<string, ServerStatus>()
        for (const [id, server] of servers) {
            result.set(id, { status: server.status, ip: server.ip })
        }
        return result
    },

    async startServer(serverId: string): Promise<void> {
        const server = servers.get(serverId)
        if (!server) return
        if (server.containerId) {
            await run(`docker start clawds-${serverId}`).catch(() => {})
        }
        server.status = 'running'
        console.log(`[mock] Started server ${serverId}`)
    },

    async stopServer(serverId: string): Promise<void> {
        const server = servers.get(serverId)
        if (!server) return
        if (server.containerId) {
            await run(`docker stop clawds-${serverId}`).catch(() => {})
        }
        server.status = 'off'
        console.log(`[mock] Stopped server ${serverId}`)
    },

    async restartServer(serverId: string): Promise<void> {
        const server = servers.get(serverId)
        if (server?.containerId) {
            await run(`docker restart clawds-${serverId}`).catch(() => {})
        }
        console.log(`[mock] Restarted server ${serverId}`)
    },

    async deleteServer(serverId: string): Promise<void> {
        const server = servers.get(serverId)
        if (server?.containerId) {
            await run(`docker rm -f clawds-${serverId}`).catch(() => {})
        }
        servers.delete(serverId)
        console.log(`[mock] Deleted server ${serverId}`)
    },

    async getServerTypes(): Promise<ServerTypeInfo[]> {
        return allServerTypes
    },

    async getLocations(): Promise<LocationInfo[]> {
        return allLocations
    },

    async getRawServerTypes(): Promise<RawServerType[]> {
        return allRawServerTypes
    },

    async getDatacenters(): Promise<DatacenterAvailability[]> {
        return allLocations.map((loc) => ({
            name: `${loc.id}-dc1`,
            locationName: loc.id,
            availableServerTypeIds: allServerTypeIds
        }))
    },

    async createSSHKey(
        name: string,
        _publicKey: string
    ): Promise<CreateSSHKeyResult> {
        const id = nextSshKeyId++
        console.log(`[mock] Created SSH key ${id} (${name})`)
        return {
            id,
            name,
            fingerprint: 'aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77:88:99'
        }
    },

    async deleteSSHKey(keyId: number): Promise<void> {
        console.log(`[mock] Deleted SSH key ${keyId}`)
    },

    async getVolumePricing(): Promise<VolumePricingResult> {
        return { pricePerGbMonthly: 0.044 }
    },

    async createVolume(
        name: string,
        size: number,
        location: string,
        _serverId?: number
    ): Promise<VolumeInfo> {
        const id = nextVolumeId++
        console.log(`[mock] Created volume ${id} (${name}, ${size}GB)`)
        return { id, size, location }
    },

    async attachVolume(volumeId: number, serverId: number): Promise<void> {
        console.log(`[mock] Attached volume ${volumeId} to server ${serverId}`)
    },

    async detachVolume(volumeId: number): Promise<void> {
        console.log(`[mock] Detached volume ${volumeId}`)
    },

    async deleteVolume(volumeId: number): Promise<void> {
        console.log(`[mock] Deleted volume ${volumeId}`)
    },

    async getVolume(volumeId: number): Promise<VolumeDetails> {
        return {
            id: volumeId,
            size: 10,
            status: 'available',
            serverId: null
        }
    }
}

export default mock