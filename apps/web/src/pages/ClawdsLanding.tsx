// @ts-nocheck — Clawds overlay keys are not in upstream TranslationKey type
import type { FC, ReactNode } from 'react'
import type { ClawWithAgents, Faq, Testimonial } from '@/ts/Interfaces'
import type { DashboardTab } from '@/ts/Types'

import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { t } from '@openclaw/i18n'
import { TIERS, TIER_IDS } from '@openclaw/shared'
import {
    Button,
    Badge
} from '@/components/ui'
import {
    PageTitle,
    Header,
    LandingFooter,
    HeroButtons,
    JsonLd,
    Logo
} from '@/components'
import { demoPlaygroundData } from '@/data'
import {
    PlaygroundCanvas,
    PlaygroundDetailPanel,
    PlaygroundAgentDetailPanel,
    AgentChat
} from '@/components/playground'
import { ChatSidebar, ChatEmptyState } from '@/components/chat'
import { useAuth } from '@/lib/auth'
import { ROUTES, DASHBOARD_TABS, getBaseDomain } from '@/lib'
import {
    TWITTER_URL,
    FACEBOOK_URL,
    INSTAGRAM_URL,
    YOUTUBE_URL,
    TIKTOK_URL
} from '@/lib/links'
import { GITHUB_REPO_URL } from '@/hooks'
import { useUIStore } from '@/lib/store'
import { TUTORIAL_URL } from '@/lib/links'
import { useBrand } from '@/components/clawds'
import {
    ShieldCheckIcon,
    ClockIcon,
    TerminalIcon,
    LockIcon,
    GaugeIcon,
    HardDrivesIcon,
    CheckIcon,
    SparkleIcon,
    CaretDownIcon,
    QuotesIcon,
    CreditCardIcon,
    LinkIcon,
    XIcon,
    PlayCircleIcon,
    ArrowRightIcon,
    ChatCircleDotsIcon,
    GraphIcon,
    SlidersHorizontalIcon,
    GearSixIcon,
    PuzzlePieceIcon,
    UsersThreeIcon,
    StackIcon,
    GitBranchIcon
} from '@phosphor-icons/react'

const getTestimonials = (): Testimonial[] => [
    {
        quote: t('landing.testimonial1Quote'),
        author: t('landing.testimonial1Author'),
        role: t('landing.testimonial1Role'),
        avatar: 'AC'
    },
    {
        quote: t('landing.testimonial2Quote'),
        author: t('landing.testimonial2Author'),
        role: t('landing.testimonial2Role'),
        avatar: 'MS'
    },
    {
        quote: t('landing.testimonial3Quote'),
        author: t('landing.testimonial3Author'),
        role: t('landing.testimonial3Role'),
        avatar: 'JW'
    },
    {
        quote: t('landing.testimonial4Quote'),
        author: t('landing.testimonial4Author'),
        role: t('landing.testimonial4Role'),
        avatar: 'SK'
    }
]

const getFaqs = (): Faq[] => [
    {
        question: t('landing.faq1Question'),
        answer: t('landing.faq1Answer')
    },
    {
        question: t('landing.faq2Question'),
        answer: t('landing.faq2Answer')
    },
    {
        question: t('landing.faq3Question'),
        answer: t('landing.faq3Answer')
    },
    {
        question: t('landing.faq4Question'),
        answer: t('landing.faq4Answer')
    },
    {
        question: t('landing.faq6Question'),
        answer: t('landing.faq6Answer')
    },
    {
        question: t('landing.faq7Question'),
        answer: t('landing.faq7Answer')
    }
]

const ClawdsLanding: FC = (): ReactNode => {
    const brand = useBrand()
    const { hash } = useLocation()
    const { user } = useAuth()
    const { phBannerVisible } = useUIStore()
    const showTutorialBadge = true
    const [videoOpen, setVideoOpen] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [activeSection, setActiveSection] = useState('')

    const githubUrl = brand.socialLinks.github || GITHUB_REPO_URL

    const previewRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress: previewProgress } = useScroll({
        target: previewRef,
        offset: ['start end', 'end start']
    })
    const previewScale = useTransform(
        previewProgress,
        [0, 0.4, 0.6, 1],
        [0.92, 1.02, 1.02, 0.92]
    )

    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' && window.innerWidth < 768
    )

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (!hash) return
        const id = hash.replace('#', '')
        const el = document.getElementById(id)
        if (el) {
            setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
        }
    }, [hash])

    const mobileDemoData = useMemo(() => {
        if (!isMobile) return demoPlaygroundData
        const keepAgentId = 'agent-1a'
        const nodes = demoPlaygroundData.nodes
            .filter((n) => {
                if (n.type !== 'agentNode') return true
                const data = n.data as Record<string, unknown>
                const agent = data.agent as Record<string, unknown>
                return agent?.id === keepAgentId
            })
            .map((n) => {
                if (n.type === 'clawNode') {
                    return {
                        ...n,
                        data: { ...n.data, agentCount: 1 },
                        position: { x: 0, y: 0 }
                    }
                }
                return { ...n, position: { x: 20, y: 170 } }
            })
        const nodeIds = new Set(nodes.map((n) => n.id))
        const edges = demoPlaygroundData.edges.filter(
            (e) => nodeIds.has(e.source) && nodeIds.has(e.target)
        )
        const agentsByClawId: Record<
            string,
            (typeof demoPlaygroundData.agentsByClawId)[string]
        > = {}
        for (const [clawId, agents] of Object.entries(
            demoPlaygroundData.agentsByClawId
        )) {
            agentsByClawId[clawId] = agents.filter((a) => a.id === keepAgentId)
        }
        return { ...demoPlaygroundData, nodes, edges, agentsByClawId }
    }, [isMobile])

    const [demoPreviewTab, setDemoPreviewTab] = useState<DashboardTab>(
        DASHBOARD_TABS.CHAT
    )
    const [demoClawId, setDemoClawId] = useState<string | null>(null)
    const [demoAgentId, setDemoAgentId] = useState<string | null>(null)
    const [demoAgentClawId, setDemoAgentClawId] = useState<string | null>(null)
    const [demoChatAgentId, setDemoChatAgentId] = useState<string | null>(
        'agent-1a'
    )
    const [demoChatSettingsClawId, setDemoChatSettingsClawId] = useState<
        string | null
    >(null)
    const [demoChatConfigAgentId, setDemoChatConfigAgentId] = useState<
        string | null
    >(null)
    const [demoChatConfigClawId, setDemoChatConfigClawId] = useState<
        string | null
    >(null)

    const demoClaw = demoClawId
        ? mobileDemoData.claws.find((c) => c.id === demoClawId) || null
        : null

    const demoAgentClaw = demoAgentClawId
        ? mobileDemoData.claws.find((c) => c.id === demoAgentClawId) || null
        : null

    const demoAgentList = demoAgentClaw
        ? mobileDemoData.agentsByClawId[demoAgentClaw.id] || []
        : []

    const demoAgent = demoAgentId
        ? demoAgentList.find((a) => a.id === demoAgentId) || null
        : null

    const demoChatClaw = mobileDemoData.claws[0]
    const demoChatAgents = demoChatClaw
        ? mobileDemoData.agentsByClawId[demoChatClaw.id] || []
        : []
    const demoChatAgent = demoChatAgentId
        ? demoChatAgents.find((a) => a.id === demoChatAgentId) || null
        : null

    const demoChatClawsWithAgents = useMemo((): ClawWithAgents[] => {
        return mobileDemoData.claws.map((claw) => ({
            claw,
            agents: mobileDemoData.agentsByClawId[claw.id] || [],
            isLoading: false,
            isReachable: true
        }))
    }, [mobileDemoData])

    const demoChatSettingsClaw = demoChatSettingsClawId
        ? mobileDemoData.claws.find((c) => c.id === demoChatSettingsClawId) ||
          null
        : null
    const demoChatConfigClaw = demoChatConfigClawId
        ? mobileDemoData.claws.find((c) => c.id === demoChatConfigClawId) ||
          null
        : null
    const demoChatConfigAgentList = demoChatConfigClaw
        ? mobileDemoData.agentsByClawId[demoChatConfigClaw.id] || []
        : []
    const demoChatConfigAgent = demoChatConfigAgentId
        ? demoChatConfigAgentList.find((a) => a.id === demoChatConfigAgentId) ||
          null
        : null

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                'how-it-works',
                'features',
                'testimonials',
                'pricing',
                'comparison',
                'faq'
            ]
            for (const section of sections.reverse()) {
                const el = document.getElementById(section)
                if (el && window.scrollY >= el.offsetTop - 100) {
                    setActiveSection(section)
                    break
                }
            }
            if (window.scrollY < 200) setActiveSection('')
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        {
            label: t('landing.howItWorks'),
            href: '#how-it-works',
            id: 'how-it-works'
        },
        { label: t('landing.features'), href: '#features', id: 'features' },
        {
            label: t('landing.testimonials'),
            href: '#testimonials',
            id: 'testimonials'
        },
        { label: t('landing.pricing'), href: '#pricing', id: 'pricing' },
        {
            label: t('landing.comparison'),
            href: '#comparison',
            id: 'comparison'
        },
        { label: t('landing.faqTitle'), href: '#faq', id: 'faq' }
    ]

    return (
        <div className='font-satoshi bg-background text-foreground min-h-screen'>
            <PageTitle
                title={t('landing.title')}
                description={t('landing.description')}
                url={`https://${getBaseDomain()}`}
            />
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: brand.name,
                    url: `https://${getBaseDomain()}`,
                    logo: `https://${brand.domain}/logo.svg`,
                    sameAs: [
                        brand.socialLinks.twitter || TWITTER_URL,
                        FACEBOOK_URL,
                        INSTAGRAM_URL,
                        YOUTUBE_URL,
                        TIKTOK_URL,
                        githubUrl
                    ]
                }}
            />
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    name: brand.name,
                    url: `https://${getBaseDomain()}`
                }}
            />
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: getFaqs().map((faq) => ({
                        '@type': 'Question',
                        name: faq.question,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: faq.answer
                        }
                    }))
                }}
            />

            <div className='landing-gradient pointer-events-none fixed inset-0' />

            <Header
                showNavLinks={true}
                navLinks={navLinks}
                activeSection={activeSection}
            />

            <section
                className={`relative overflow-hidden px-6 pb-16 ${phBannerVisible ? 'pt-44' : 'pt-32'}`}
            >
                <div className='landing-grid pointer-events-none' />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='relative mx-auto max-w-6xl'
                >
                    <div className='flex flex-col items-center text-center'>
                        <div className='mb-8 flex flex-wrap items-center justify-center gap-3'>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className='glow-border border-border bg-foreground/5 inline-flex items-center gap-2 rounded-full border px-4 py-2'
                            >
                                <SparkleIcon
                                    className='h-4 w-4 text-[#4ecdc4]'
                                    weight='fill'
                                />
                                <span className='text-foreground/80 text-sm'>
                                    {t('landing.badge')}
                                </span>
                            </motion.div>
                            {showTutorialBadge && (
                                <motion.button
                                    onClick={() => setVideoOpen(true)}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className='glow-border border-border bg-foreground/5 hover:bg-foreground/10 inline-flex cursor-pointer items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 transition-colors'
                                >
                                    <div className='relative h-7 w-10 flex-shrink-0 overflow-hidden rounded-full'>
                                        <img
                                            src='https://img.youtube.com/vi/clawds-demo/mqdefault.jpg'
                                            alt=''
                                            className='h-full w-full object-cover'
                                        />
                                        <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                                            <PlayCircleIcon className='h-3.5 w-3.5 text-white' />
                                        </div>
                                    </div>
                                    <span className='text-foreground/80 text-sm'>
                                        {t('landing.tutorialBadge')}
                                    </span>
                                </motion.button>
                            )}
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className='font-clash mb-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl'
                        >
                            <span className='from-foreground via-foreground to-muted-foreground bg-gradient-to-b bg-clip-text text-transparent'>
                                {t('landing.heroTitle1')}
                            </span>
                            <br />
                            <span className='animate-gradient bg-gradient-to-r from-[#4ecdc4] via-[#4ecdc4] to-[#9be8e2] bg-clip-text text-transparent'>
                                {t('landing.heroTitle2')}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className='text-muted-foreground mb-10 max-w-2xl text-lg leading-relaxed md:text-xl'
                        >
                            {t('landing.heroDescription')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className='mb-16 flex flex-col gap-4 sm:flex-row'
                        >
                            <HeroButtons
                                deployLabel={t('nav.deployClawds')}
                                githubLabel={t('landing.selfHostInstead')}
                                showStars={true}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className='grid grid-cols-2 gap-6 text-center md:flex md:items-center md:gap-16'
                        >
                            <div>
                                <div className='font-clash text-foreground text-3xl font-bold md:text-4xl'>
                                    90{t('landing.heroStatSeconds')}
                                </div>
                                <div className='text-muted-foreground text-sm'>
                                    {t('landing.heroStatFirstAgent')}
                                </div>
                            </div>
                            <div className='bg-foreground/10 hidden h-12 w-px md:block' />
                            <div>
                                <div className='font-clash text-foreground text-3xl font-bold md:text-4xl'>
                                    $15{t('landing.perMonth')}
                                </div>
                                <div className='text-muted-foreground text-sm'>
                                    {t('landing.heroStatAllInclusive')}
                                </div>
                            </div>
                            <div className='bg-foreground/10 hidden h-12 w-px md:block' />
                            <div>
                                <div className='font-clash text-foreground text-3xl font-bold md:text-4xl'>
                                    5,000+
                                </div>
                                <div className='text-muted-foreground text-sm'>
                                    {t('landing.heroStatSkills')}
                                </div>
                            </div>
                            <div className='bg-foreground/10 hidden h-12 w-px md:block' />
                            <div>
                                <div className='font-clash text-foreground text-3xl font-bold md:text-4xl'>
                                    3
                                </div>
                                <div className='text-muted-foreground text-sm'>
                                    {t('landing.heroStatModels')}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <div ref={previewRef} className='mx-auto mb-32 max-w-6xl px-6'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ scale: previewScale }}
                    className='border-border bg-background flex h-[80vh] flex-col overflow-hidden rounded-2xl border'
                >
                    <div className='border-border from-muted to-muted/80 pointer-events-none flex items-center gap-3 border-b bg-gradient-to-b px-5 py-3'>
                        <div className='flex items-center gap-2'>
                            <div className='h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)]' />
                            <div className='h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)]' />
                            <div className='h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)]' />
                        </div>
                        <div className='flex flex-1 justify-center'>
                            <div className='text-muted-foreground bg-foreground/10 flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs'>
                                <LockIcon
                                    className='h-3 w-3 text-green-500/70'
                                    weight='fill'
                                />
                                <span>{getBaseDomain()}/claws</span>
                            </div>
                        </div>
                        <div className='w-[56px]' />
                    </div>

                    <div className='border-border bg-background/80 flex items-center justify-between border-b px-4 py-2'>
                        <div className='flex items-center gap-2'>
                            <div className='-mr-4 origin-left scale-[0.85]'>
                                <Logo />
                            </div>
                            <div className='border-border flex items-center rounded-lg border p-0.5'>
                                <button
                                    onClick={() =>
                                        setDemoPreviewTab(DASHBOARD_TABS.CHAT)
                                    }
                                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${demoPreviewTab === DASHBOARD_TABS.CHAT ? 'bg-foreground/10 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    <ChatCircleDotsIcon
                                        className='h-3.5 w-3.5'
                                        weight={
                                            demoPreviewTab ===
                                            DASHBOARD_TABS.CHAT
                                                ? 'fill'
                                                : 'regular'
                                        }
                                    />
                                    <span className='hidden sm:inline'>
                                        {t('dashboard.chatTab')}
                                    </span>
                                </button>
                                <button
                                    onClick={() =>
                                        setDemoPreviewTab(
                                            DASHBOARD_TABS.PLAYGROUND
                                        )
                                    }
                                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${demoPreviewTab === DASHBOARD_TABS.PLAYGROUND ? 'bg-foreground/10 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    <GraphIcon
                                        className='h-3.5 w-3.5'
                                        weight={
                                            demoPreviewTab ===
                                            DASHBOARD_TABS.PLAYGROUND
                                                ? 'fill'
                                                : 'regular'
                                        }
                                    />
                                    <span className='hidden sm:inline'>
                                        {t('dashboard.playgroundTab')}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-1 overflow-hidden'>
                        {demoPreviewTab === DASHBOARD_TABS.PLAYGROUND ? (
                            <div className='relative flex min-w-0 flex-1 overflow-hidden'>
                                <div className='relative min-w-0 flex-1'>
                                    <div className='playground-grid h-full'>
                                        <PlaygroundCanvas
                                            initialNodes={mobileDemoData.nodes}
                                            initialEdges={mobileDemoData.edges}
                                            initialZoom={1.25}
                                            allowPageScroll
                                            onNodeClick={(clawId) => {
                                                setDemoAgentId(null)
                                                setDemoAgentClawId(null)
                                                setDemoClawId(
                                                    demoClawId === clawId
                                                        ? null
                                                        : clawId
                                                )
                                            }}
                                            onAgentClick={(agentId, clawId) => {
                                                setDemoClawId(null)
                                                setDemoAgentId(
                                                    demoAgentId === agentId
                                                        ? null
                                                        : agentId
                                                )
                                                setDemoAgentClawId(clawId)
                                            }}
                                            onPaneClick={() => {
                                                setDemoClawId(null)
                                                setDemoAgentId(null)
                                                setDemoAgentClawId(null)
                                            }}
                                            panelOpen={
                                                !!demoClaw || !!demoAgent
                                            }
                                            selectedClawId={demoClawId}
                                            selectedAgentId={demoAgentId}
                                        />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {demoClaw && (
                                        <PlaygroundDetailPanel
                                            key='detail-panel'
                                            claw={demoClaw}
                                            plans={[]}
                                            sshKeys={[]}
                                            onClose={() => setDemoClawId(null)}
                                            readOnly
                                        />
                                    )}

                                    {demoAgent && demoAgentClaw && (
                                        <PlaygroundAgentDetailPanel
                                            key='agent-panel'
                                            agent={demoAgent}
                                            clawId={demoAgentClaw.id}
                                            clawName={demoAgentClaw.name}
                                            isOnlyAgent={
                                                demoAgentList.length <= 1
                                            }
                                            onClose={() => {
                                                setDemoAgentId(null)
                                                setDemoAgentClawId(null)
                                            }}
                                            readOnly
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className='relative flex min-w-0 flex-1 overflow-hidden'>
                                <div className='playground-grid pointer-events-none absolute inset-0 opacity-50' />
                                <ChatSidebar
                                    clawsWithAgents={demoChatClawsWithAgents}
                                    selectedAgent={
                                        demoChatAgentId && demoChatClaw
                                            ? {
                                                  agentId: demoChatAgentId,
                                                  clawId: demoChatClaw.id
                                              }
                                            : null
                                    }
                                    configAgent={null}
                                    selectedClawId={demoChatSettingsClawId}
                                    readOnly
                                    onAgentSelect={(selection) => {
                                        setDemoChatAgentId(
                                            demoChatAgentId ===
                                                selection.agentId
                                                ? null
                                                : selection.agentId
                                        )
                                        setDemoChatSettingsClawId(null)
                                        setDemoChatConfigAgentId(null)
                                        setDemoChatConfigClawId(null)
                                    }}
                                    onConfigureAgent={(agentId, clawId) => {
                                        setDemoChatConfigAgentId(agentId)
                                        setDemoChatConfigClawId(clawId)
                                        setDemoChatSettingsClawId(null)
                                    }}
                                    onCreateAgent={() => {}}
                                    onOpenClawSettings={(clawId) => {
                                        setDemoChatSettingsClawId(
                                            demoChatSettingsClawId === clawId
                                                ? null
                                                : clawId
                                        )
                                        setDemoChatAgentId(null)
                                        setDemoChatConfigAgentId(null)
                                        setDemoChatConfigClawId(null)
                                    }}
                                />
                                <div className='relative flex min-h-0 min-w-0 flex-1 translate-x-0 overflow-hidden'>
                                    <div className='min-w-0 flex-1'>
                                        {demoChatSettingsClaw &&
                                        !demoChatAgentId ? (
                                            <PlaygroundDetailPanel
                                                key={`chat-settings-${demoChatSettingsClaw.id}`}
                                                claw={demoChatSettingsClaw}
                                                plans={[]}
                                                sshKeys={[]}
                                                onClose={() =>
                                                    setDemoChatSettingsClawId(
                                                        null
                                                    )
                                                }
                                                readOnly
                                                fullScreen
                                            />
                                        ) : demoChatAgent ? (
                                            <AgentChat
                                                key={demoChatAgent.id}
                                                agentId={demoChatAgent.id}
                                                agentName={demoChatAgent.name}
                                                clawId={demoChatClaw.id}
                                                subdomain={null}
                                                gatewayToken={null}
                                                agentModel={demoChatAgent.model}
                                                readOnly
                                            />
                                        ) : (
                                            <ChatEmptyState />
                                        )}
                                    </div>
                                    <AnimatePresence>
                                        {demoChatConfigAgent &&
                                            demoChatConfigClaw && (
                                                <PlaygroundAgentDetailPanel
                                                    key={`chat-config-${demoChatConfigAgent.id}`}
                                                    agent={demoChatConfigAgent}
                                                    clawId={
                                                        demoChatConfigClaw.id
                                                    }
                                                    clawName={
                                                        demoChatConfigClaw.name
                                                    }
                                                    isOnlyAgent={
                                                        demoChatConfigAgentList.length <=
                                                        1
                                                    }
                                                    onClose={() => {
                                                        setDemoChatConfigAgentId(
                                                            null
                                                        )
                                                        setDemoChatConfigClawId(
                                                            null
                                                        )
                                                    }}
                                                    readOnly
                                                    hideChatTab
                                                    initialTab='configuration'
                                                />
                                            )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            <section
                id='how-it-works'
                className='border-border relative scroll-mt-20 border-t px-6 py-24'
            >
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-16 text-center'>
                        <Badge
                            variant='outline'
                            className='border-border bg-foreground/5 text-foreground/80 mb-4'
                        >
                            {t('landing.howItWorks')}
                        </Badge>
                        <h2 className='font-clash from-foreground to-muted-foreground mb-4 bg-gradient-to-b bg-clip-text text-4xl font-bold text-transparent md:text-5xl'>
                            {t('landing.threeStepsToPrivacy')}
                        </h2>
                        <p className='text-muted-foreground mx-auto max-w-xl text-lg'>
                            {t('landing.howItWorksDescription')}
                        </p>
                    </div>

                    <div className='grid gap-6 md:grid-cols-3'>
                        {[
                            {
                                step: '01',
                                icon: HardDrivesIcon,
                                title: t('landing.step1Title'),
                                description: t('landing.step1Description')
                            },
                            {
                                step: '02',
                                icon: ShieldCheckIcon,
                                title: t('landing.step2Title'),
                                description: t('landing.step2Description')
                            },
                            {
                                step: '03',
                                icon: TerminalIcon,
                                title: t('landing.step3Title'),
                                description: t('landing.step3Description')
                            }
                        ].map((item) => (
                            <div
                                key={item.step}
                                className='border-border bg-foreground/[0.02] relative rounded-xl border p-6'
                            >
                                <div className='font-clash text-foreground/5 absolute -left-1 -top-3 text-6xl font-bold'>
                                    {item.step}
                                </div>
                                <div className='relative pt-6'>
                                    <div className='border-border mb-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-gradient-to-br from-[#4ecdc4]/20 to-[#3ab5ad]/20'>
                                        <item.icon className='h-6 w-6 text-[#4ecdc4]' />
                                    </div>
                                    <h3 className='font-clash text-foreground mb-2 text-xl font-semibold'>
                                        {item.title}
                                    </h3>
                                    <p className='text-muted-foreground leading-relaxed'>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id='features'
                className='border-border relative scroll-mt-20 border-t px-6 py-24'
            >
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-16 text-center'>
                        <Badge
                            variant='outline'
                            className='border-border bg-foreground/5 text-foreground/80 mb-4'
                        >
                            {t('landing.features')}
                        </Badge>
                        <h2 className='font-clash from-foreground to-muted-foreground mb-4 bg-gradient-to-b bg-clip-text text-4xl font-bold text-transparent md:text-5xl'>
                            {t('landing.whyClawds')}
                        </h2>
                        <p className='text-muted-foreground mx-auto max-w-xl text-lg'>
                            {t('landing.featuresDescription')}
                        </p>
                    </div>

                    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {[
                            {
                                icon: ClockIcon,
                                title: t('landing.zeroConfig'),
                                description: t('landing.zeroConfigDescription')
                            },
                            {
                                icon: LockIcon,
                                title: t('landing.ownedData'),
                                description: t('landing.ownedDataDescription')
                            },
                            {
                                icon: GaugeIcon,
                                title: t('landing.fullSpeed'),
                                description: t('landing.fullSpeedDescription')
                            },
                            {
                                icon: TerminalIcon,
                                title: t('landing.fullSshAccess'),
                                description: t(
                                    'landing.fullSshAccessDescription'
                                )
                            },
                            {
                                icon: CreditCardIcon,
                                title: t('landing.payAsYouGo'),
                                description: t('landing.payAsYouGoDescription')
                            },
                            {
                                icon: LinkIcon,
                                title: t('landing.customSubdomains'),
                                description: t(
                                    'landing.customSubdomainsDescription'
                                )
                            },
                            {
                                icon: ShieldCheckIcon,
                                title: t('landing.secure'),
                                description: t('landing.secureDescription')
                            },
                            {
                                icon: GitBranchIcon,
                                title: t('landing.autoUpdates'),
                                description: t('landing.autoUpdatesDescription')
                            },
                            {
                                icon: SlidersHorizontalIcon,
                                title: t('landing.clawdsControl'),
                                description: t(
                                    'landing.clawdsControlDescription'
                                )
                            },
                            {
                                icon: GearSixIcon,
                                title: t('landing.clawHostControl'),
                                description: t(
                                    'landing.clawHostControlDescription'
                                )
                            },
                            {
                                icon: PuzzlePieceIcon,
                                title: t('landing.skillsMarketplace'),
                                description: t(
                                    'landing.skillsMarketplaceDescription'
                                )
                            },
                            {
                                icon: ChatCircleDotsIcon,
                                title: t('landing.directChat'),
                                description: t('landing.directChatDescription')
                            },
                            {
                                icon: UsersThreeIcon,
                                title: t('landing.multipleAgents'),
                                description: t(
                                    'landing.multipleAgentsDescription'
                                )
                            },
                            {
                                icon: StackIcon,
                                title: t('landing.multipleClaws'),
                                description: t(
                                    'landing.multipleClawsDescription'
                                )
                            }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className='border-border bg-foreground/[0.02] rounded-xl border p-6'
                            >
                                <feature.icon className='mb-4 h-8 w-8 text-[#4ecdc4]' />
                                <h3 className='font-clash text-foreground mb-2 text-lg font-semibold'>
                                    {feature.title}
                                </h3>
                                <p className='text-muted-foreground text-sm leading-relaxed'>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id='testimonials'
                className='border-border relative scroll-mt-20 border-t px-6 py-24'
            >
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-16 text-center'>
                        <Badge
                            variant='outline'
                            className='border-border bg-foreground/5 text-foreground/80 mb-4'
                        >
                            {t('landing.testimonials')}
                        </Badge>
                        <h2 className='font-clash from-foreground to-muted-foreground mb-4 bg-gradient-to-b bg-clip-text text-4xl font-bold text-transparent md:text-5xl'>
                            {t('landing.whatPeopleSay')}
                        </h2>
                        <p className='text-muted-foreground mx-auto max-w-xl text-lg'>
                            {t('landing.testimonialsDescription')}
                        </p>
                    </div>

                    <div className='grid gap-6 md:grid-cols-2'>
                        {getTestimonials().map((testimonial, i) => (
                            <div
                                key={i}
                                className='border-border bg-foreground/[0.02] rounded-xl border p-6'
                            >
                                <QuotesIcon
                                    className='mb-4 h-8 w-8 text-[#4ecdc4]/40'
                                    weight='fill'
                                />
                                <p className='text-foreground/80 mb-6 leading-relaxed'>
                                    "{testimonial.quote}"
                                </p>
                                <div className='flex items-center gap-3'>
                                    <div className='bg-gradient-to-br from-[#4ecdc4] to-[#3ab5ad] flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white'>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className='text-foreground font-medium'>
                                            {testimonial.author}
                                        </p>
                                        <p className='text-muted-foreground text-sm'>
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='border-border relative scroll-mt-20 border-t px-6 py-24'>
                <div className='mx-auto max-w-5xl'>
                    <div className='mb-16 text-center'>
                        <Badge
                            variant='outline'
                            className='border-border bg-foreground/5 text-foreground/80 mb-4'
                        >
                            {t('landing.templatesTitle')}
                        </Badge>
                        <h2 className='font-clash from-foreground to-muted-foreground mb-4 bg-gradient-to-b bg-clip-text text-4xl font-bold text-transparent md:text-5xl'>
                            {t('landing.templatesHeading')}
                        </h2>
                        <p className='text-muted-foreground mx-auto max-w-xl text-lg'>
                            {t('landing.templatesDescription')}
                        </p>
                    </div>
                    <div className='grid gap-6 md:grid-cols-3'>
                        {[
                            {
                                icon: ChatCircleDotsIcon,
                                title: t('landing.templateSupport'),
                                description: t('landing.templateSupportDesc'),
                                tier: 'Starter'
                            },
                            {
                                icon: GraphIcon,
                                title: t('landing.templateResearch'),
                                description: t('landing.templateResearchDesc'),
                                tier: 'Pro'
                            },
                            {
                                icon: GearSixIcon,
                                title: t('landing.templateDevOps'),
                                description: t('landing.templateDevOpsDesc'),
                                tier: 'Business'
                            }
                        ].map((tmpl, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className='border-border bg-foreground/[0.02] group rounded-xl border p-6 transition-colors hover:border-[#4ecdc4]/40'
                            >
                                <tmpl.icon className='mb-4 h-8 w-8 text-[#4ecdc4]' />
                                <h3 className='font-clash text-foreground mb-2 text-lg font-semibold'>
                                    {tmpl.title}
                                </h3>
                                <p className='text-muted-foreground mb-4 text-sm leading-relaxed'>
                                    {tmpl.description}
                                </p>
                                <div className='flex items-center justify-between'>
                                    <span className='text-muted-foreground text-xs'>
                                        {t('landing.templateRecommendedTier')}: {tmpl.tier}
                                    </span>
                                    <Button
                                        size='sm'
                                        className='border-0 bg-gradient-to-r from-[#4ecdc4] to-[#3ab5ad] text-xs text-white hover:opacity-90'
                                        asChild
                                    >
                                        <Link to={user ? `${ROUTES.CLAWS}?deploy=1` : `${ROUTES.LOGIN}?deploy=1`}>
                                            {t('landing.templateDeploy')}
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id='pricing'
                className='border-border relative scroll-mt-20 border-t px-6 py-24'
            >
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-16 text-center'>
                        <Badge
                            variant='outline'
                            className='border-border bg-foreground/5 text-foreground/80 mb-4'
                        >
                            {t('landing.pricing')}
                        </Badge>
                        <h2 className='font-clash from-foreground to-muted-foreground mb-4 bg-gradient-to-b bg-clip-text text-4xl font-bold text-transparent md:text-5xl'>
                            {t('landing.simpleTransparentPricing')}
                        </h2>
                        <p className='text-muted-foreground mx-auto max-w-xl text-lg'>
                            {t('landing.pricingDescription')}
                        </p>

                    </div>

                    <div className='mx-auto grid max-w-5xl gap-8 md:grid-cols-3'>
                        {TIER_IDS.map((tierId) => {
                            const tier = TIERS[tierId]
                            const isPro = tierId === 'pro'
                            return (
                                <div
                                    key={tierId}
                                    className={`relative rounded-2xl border-2 p-8 transition-all hover:shadow-xl ${
                                        isPro
                                            ? 'border-[var(--brand-primary,#4ecdc4)] bg-[#4ecdc4]/5 shadow-lg'
                                            : 'border-border'
                                    }`}
                                >
                                    {isPro && (
                                        <Badge className='absolute -top-3 left-1/2 -translate-x-1/2 border-0 bg-gradient-to-r from-[#4ecdc4] to-[#3ab5ad] text-xs text-white'>
                                            {t('landing.recommended')}
                                        </Badge>
                                    )}
                                    <h3 className='font-clash text-2xl font-bold'>
                                        {t(`tiers.${tierId}.name` as Parameters<typeof t>[0])}
                                    </h3>
                                    <p className='text-muted-foreground mt-1 text-sm'>
                                        {t(`tiers.${tierId}.description` as Parameters<typeof t>[0])}
                                    </p>
                                    <div className='mt-4'>
                                        <span className='font-clash text-4xl font-bold'>
                                            ${tier.priceMonthly / 100}
                                        </span>
                                        <span className='text-muted-foreground'>
                                            {t('landing.perMonth')}
                                        </span>
                                    </div>
                                    <ul className='mt-6 space-y-3 text-sm'>
                                        <li className='flex items-center gap-2'>
                                            <CheckIcon className='h-4 w-4 text-[#4ecdc4]' />
                                            {tier.vcpu} vCPU
                                        </li>
                                        <li className='flex items-center gap-2'>
                                            <CheckIcon className='h-4 w-4 text-[#4ecdc4]' />
                                            {tier.ramGb} GB RAM
                                        </li>
                                        <li className='flex items-center gap-2'>
                                            <CheckIcon className='h-4 w-4 text-[#4ecdc4]' />
                                            {tier.diskGb} GB Disk
                                        </li>
                                        <li className='flex items-center gap-2'>
                                            <CheckIcon className='h-4 w-4 text-[#4ecdc4]' />
                                            {(tier.tokenLimitDaily / 1000).toFixed(0)}K {t('tiers.tokensPerDay')}
                                        </li>
                                        {tier.sshAccess && (
                                            <li className='flex items-center gap-2'>
                                                <CheckIcon className='h-4 w-4 text-[#4ecdc4]' />
                                                SSH Access
                                            </li>
                                        )}
                                    </ul>
                                    <p className='text-muted-foreground mt-4 text-xs leading-relaxed italic'>
                                        {t(`tiers.${tierId}.useCase` as Parameters<typeof t>[0])}
                                    </p>
                                    <div className='mt-8'>
                                        <Button
                                            className={`w-full gap-2 ${
                                                isPro
                                                    ? 'border-0 bg-gradient-to-r from-[#4ecdc4] to-[#3ab5ad] text-white hover:opacity-90'
                                                    : 'bg-foreground/10 text-foreground hover:bg-foreground/20 border-0'
                                            }`}
                                            asChild
                                        >
                                            <Link
                                                to={
                                                    user
                                                        ? `${ROUTES.CLAWS}?deploy=1`
                                                        : `${ROUTES.LOGIN}?deploy=1`
                                                }
                                            >
                                                {user
                                                    ? t('landing.deploy')
                                                    : t('landing.select')}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className='mt-16 mx-auto max-w-4xl'>
                        <h3 className='font-clash text-foreground mb-8 text-center text-2xl font-bold'>
                            {t('landing.planColumn')}
                        </h3>
                        <div className='overflow-x-auto'>
                            <table className='w-full border-collapse'>
                                <thead>
                                    <tr className='border-border border-b'>
                                        <th className='font-clash text-foreground px-4 py-4 text-left font-semibold'></th>
                                        <th className='font-clash text-foreground px-4 py-4 text-center font-semibold'>Starter</th>
                                        <th className='font-clash text-foreground px-4 py-4 text-center font-semibold'>Pro</th>
                                        <th className='font-clash text-foreground px-4 py-4 text-center font-semibold'>Business</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { label: t('landing.vCpuColumn'), values: ['2', '4', '8'] },
                                        { label: t('landing.ramColumn'), values: ['4 GB', '8 GB', '16 GB'] },
                                        { label: t('landing.storageColumn'), values: ['40 GB', '80 GB', '160 GB'] },
                                        { label: t('tiers.tokensPerDay'), values: ['100K', '500K', '2M'] },
                                        { label: 'SSH Access', values: ['\u2014', '\u2713', '\u2713'] },
                                    ].map((row) => (
                                        <tr key={row.label} className='border-border border-b'>
                                            <td className='text-foreground px-4 py-3 font-medium'>{row.label}</td>
                                            {row.values.map((val, i) => (
                                                <td key={i} className='text-foreground/80 px-4 py-3 text-center'>{val}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='border-border bg-foreground/[0.02] mt-8 rounded-xl border p-4'>
                        <div className='text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm'>
                            <div className='flex items-center gap-2'>
                                <CheckIcon className='h-4 w-4 text-green-600 dark:text-green-400' />
                                <span>
                                    {t('landing.openClawPreinstalled')}
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CheckIcon className='h-4 w-4 text-green-600 dark:text-green-400' />
                                <span>
                                    {t('landing.unlimitedBandwidth')}
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CheckIcon className='h-4 w-4 text-green-600 dark:text-green-400' />
                                <span>
                                    {t('landing.rootSshAccess')}
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CheckIcon className='h-4 w-4 text-green-600 dark:text-green-400' />
                                <span>{t('landing.onlineAllDay')}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CheckIcon className='h-4 w-4 text-green-600 dark:text-green-400' />
                                <span>
                                    {t('landing.highQualityInternet')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id='comparison'
                className='border-border relative scroll-mt-20 border-t px-6 py-24'
            >
                <div className='mx-auto max-w-3xl'>
                    <div className='mb-16 text-center'>
                        <Badge
                            variant='outline'
                            className='border-border bg-foreground/5 text-foreground/80 mb-4'
                        >
                            {t('landing.comparison')}
                        </Badge>
                        <h2 className='font-clash from-foreground to-muted-foreground mb-4 bg-gradient-to-b bg-clip-text text-4xl font-bold text-transparent md:text-5xl'>
                            {t('landing.comparisonTitle')}
                        </h2>
                        <p className='text-muted-foreground mx-auto max-w-xl text-lg'>
                            {t('landing.comparisonDescription')}
                        </p>
                    </div>

                    <div className='border-border overflow-hidden rounded-xl border'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-border bg-foreground/[0.02] border-b'>
                                    <th className='px-6 py-4'>
                                        <div className='flex items-center justify-center'>
                                            <span className='font-clash text-lg font-bold'>
                                                <span className='text-[#4ecdc4]'>Claw</span>
                                                <span className='text-[#3BBEB5]'>ds</span>
                                            </span>
                                        </div>
                                    </th>
                                    <th className='px-6 py-4 text-center'>
                                        <span className='text-muted-foreground font-medium'>
                                            {t('landing.others')}
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-border divide-y'>
                                <tr>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400' />
                                            <span className='text-foreground'>
                                                {t(
                                                    'landing.comparisonClawdsUs'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <XIcon className='h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400' />
                                            <span className='text-muted-foreground'>
                                                {t(
                                                    'landing.comparisonClawdsOthers'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-foreground/[0.01]'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400' />
                                            <span className='text-foreground'>
                                                {t(
                                                    'landing.comparisonPricingUs'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <XIcon className='h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400' />
                                            <span className='text-muted-foreground'>
                                                {t(
                                                    'landing.comparisonPricingOthers'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400' />
                                            <span className='text-foreground'>
                                                {t(
                                                    'landing.comparisonOwnershipUs'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <XIcon className='h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400' />
                                            <span className='text-muted-foreground'>
                                                {t(
                                                    'landing.comparisonOwnershipOthers'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-foreground/[0.01]'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400' />
                                            <span className='text-foreground'>
                                                {t(
                                                    'landing.comparisonSubdomainUs'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <XIcon className='h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400' />
                                            <span className='text-muted-foreground'>
                                                {t(
                                                    'landing.comparisonSubdomainOthers'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400' />
                                            <span className='text-foreground'>
                                                {t('landing.comparisonInfraUs')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <XIcon className='h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400' />
                                            <span className='text-muted-foreground'>
                                                {t(
                                                    'landing.comparisonInfraOthers'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-foreground/[0.01]'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400' />
                                            <span className='text-foreground'>
                                                {t('landing.comparisonDataUs')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <XIcon className='h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400' />
                                            <span className='text-muted-foreground'>
                                                {t(
                                                    'landing.comparisonDataOthers'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400' />
                                            <span className='text-foreground'>
                                                {t(
                                                    'landing.comparisonMultipleUs'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <XIcon className='h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400' />
                                            <span className='text-muted-foreground'>
                                                {t(
                                                    'landing.comparisonMultipleOthers'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-foreground/[0.01]'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400' />
                                            <span className='text-foreground'>
                                                {t(
                                                    'landing.comparisonAgentsUs'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <XIcon className='h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400' />
                                            <span className='text-muted-foreground'>
                                                {t(
                                                    'landing.comparisonAgentsOthers'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400' />
                                            <span className='text-foreground'>
                                                {t(
                                                    'landing.comparisonExportUs'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <XIcon className='h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400' />
                                            <span className='text-muted-foreground'>
                                                {t(
                                                    'landing.comparisonExportOthers'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400' />
                                            <span className='text-foreground'>
                                                {t('landing.comparisonChatUs')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <XIcon className='h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400' />
                                            <span className='text-muted-foreground'>
                                                {t(
                                                    'landing.comparisonChatOthers'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400' />
                                            <span className='text-foreground'>
                                                {t(
                                                    'landing.comparisonVersionUs'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <XIcon className='h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400' />
                                            <span className='text-muted-foreground'>
                                                {t(
                                                    'landing.comparisonVersionOthers'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-foreground/[0.01]'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400' />
                                            <span className='text-foreground'>
                                                {t(
                                                    'landing.comparisonTerminalUs'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <XIcon className='h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400' />
                                            <span className='text-muted-foreground'>
                                                {t(
                                                    'landing.comparisonTerminalOthers'
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {brand.features.showComparison && (
                        <Link
                            to={ROUTES.COMPARE}
                            className='border-border hover:border-foreground/20 bg-foreground/[0.02] mt-6 flex items-center justify-between rounded-xl border px-6 py-5 transition'
                        >
                            <div>
                                <p className='text-foreground font-semibold'>
                                    {t('landing.seeFullComparison')}
                                </p>
                                <p className='text-muted-foreground mt-1 text-sm'>
                                    {t('landing.comparisonCtaText')}
                                </p>
                            </div>
                            <ArrowRightIcon className='text-foreground h-5 w-5 flex-shrink-0' />
                        </Link>
                    )}
                </div>
            </section>

            <section
                id='faq'
                className='border-border relative scroll-mt-20 border-t px-6 py-24'
            >
                <div className='mx-auto max-w-3xl'>
                    <div className='mb-16 text-center'>
                        <Badge
                            variant='outline'
                            className='border-border bg-foreground/5 text-foreground/80 mb-4'
                        >
                            {t('landing.faqTitle')}
                        </Badge>
                        <h2 className='font-clash from-foreground to-muted-foreground mb-4 bg-gradient-to-b bg-clip-text text-4xl font-bold text-transparent md:text-5xl'>
                            {t('landing.frequentlyAskedQuestions')}
                        </h2>
                        <p className='text-muted-foreground mx-auto max-w-xl text-lg'>
                            {t('landing.faqDescription')}
                        </p>
                    </div>

                    <div className='space-y-3'>
                        {getFaqs().map((faq, i) => (
                            <div
                                key={i}
                                className='border-border bg-foreground/[0.02] overflow-hidden rounded-xl border'
                            >
                                <button
                                    onClick={() =>
                                        setOpenFaq(openFaq === i ? null : i)
                                    }
                                    className='hover:bg-foreground/[0.02] flex w-full items-center justify-between p-5 text-left transition-colors'
                                >
                                    <span className='text-foreground pr-4 font-medium'>
                                        {faq.question}
                                    </span>
                                    <CaretDownIcon
                                        className={`text-muted-foreground h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
                                            openFaq === i ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: 'auto',
                                                opacity: 1
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className='overflow-hidden'
                                        >
                                            <div className='px-5 pb-5'>
                                                <p className='text-muted-foreground leading-relaxed'>
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='border-border relative border-t px-6 py-32'>
                <div className='mx-auto max-w-4xl text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className='font-clash mb-6 text-4xl font-bold md:text-6xl'>
                            <span className='from-foreground to-foreground/80 bg-gradient-to-b bg-clip-text text-transparent'>
                                {t('landing.readyToOwnYourPrivacy')}
                            </span>
                        </h2>
                        <p className='text-muted-foreground mx-auto mb-10 max-w-2xl text-xl'>
                            {t('landing.ctaDescription')}
                        </p>

                        <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
                            <HeroButtons
                                deployLabel={t('landing.deployClawdsNow')}
                                githubLabel={t('landing.selfHostInstead')}
                                showStars={true}
                                large
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            <LandingFooter />

            <AnimatePresence>
                {videoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'
                        onClick={() => setVideoOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className='relative w-full max-w-4xl px-6'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setVideoOpen(false)}
                                className='absolute -top-10 right-6 cursor-pointer text-white/60 transition-colors hover:text-white'
                            >
                                <XIcon className='h-6 w-6' />
                            </button>
                            <div className='aspect-video w-full overflow-hidden rounded-xl'>
                                <iframe
                                    src={
                                        TUTORIAL_URL.replace(
                                            'watch?v=',
                                            'embed/'
                                        ) + '?autoplay=1&rel=0'
                                    }
                                    className='h-full w-full'
                                    allow='autoplay; encrypted-media'
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ClawdsLanding