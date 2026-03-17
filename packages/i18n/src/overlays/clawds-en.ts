/**
 * Clawds English overlay — overrides brand-specific keys only.
 * Structure mirrors the base en.ts but contains only keys that differ.
 */
const clawdsEn = {
    common: {
        brandName: 'Clawds',
        legalEmail: 'legal@clawds.io',
    },
    setup: {
        welcomeTitle: 'Welcome to Clawds',
    },
    footer: {
        copyright: 'Clawds. All rights reserved.',
        poweredBy: 'Powered by AI TEXTURA',
        brandDescription:
            'Deploy AI agents in the cloud with one click. Dedicated resources, full privacy, no shared infrastructure.',
        productDescription:
            'Deploy AI agents in the cloud with one click — build, connect, and scale your AI agents faster with Clawds.',
    },
    go: {
        pageTitle: 'Clawds Desktop',
        pricingCta: 'Get Clawds Desktop',
        faqDescription: 'Everything you need to know about Clawds Desktop.',
        faq1Question: 'What is Clawds Desktop?',
        faq1Answer: 'Clawds Desktop is a lightweight desktop application that lets you run OpenClaw locally on your own machine. No cloud servers needed — install, launch, and start using OpenClaw in seconds.',
        faq2Question: 'How is Desktop different from Clawds Cloud?',
        faq2Answer: 'Clawds Cloud deploys OpenClaw on dedicated remote servers with 24/7 uptime and global access. Clawds Desktop runs everything locally on your device — great for privacy, offline use, and simple setups.',
        faq3Answer: 'Clawds Desktop works offline for local usage. An internet connection is only needed for initial setup, updates, and any features that require external API calls.',
        faq4Answer: 'Yes. You pay once and get lifetime access to Clawds Desktop, including all future updates. No subscriptions, no recurring fees.',
        faq5Answer: 'Clawds Desktop supports Windows and macOS. Both platforms get the same features and receive updates simultaneously.',
        faq6Answer: 'Absolutely. You can export your OpenClaw configuration from Desktop and deploy it on Clawds Cloud anytime. Both platforms are fully compatible.',
    },
    emails: {
        otpSubject: 'Your Clawds sign-in code',
        otpPreview: 'Your Clawds sign-in code: {{code}}',
        changelogSubject: "What's New at Clawds",
        changelogPreview: 'Check out the latest updates to Clawds: {{title}}',
        changelogVisitButton: 'Visit Clawds',
        changelogUnsubscribe:
            "You're receiving this because you have a Clawds account.",
        changelogFooter:
            "You're receiving this because you have a Clawds account.",
        featureFooter:
            "You're receiving this because you have a Clawds account.",
        otpBody:
            'Sign in to your Clawds account to manage your OpenClaw instances.',
        features: {
            terminal: {
                description:
                    'Access your server directly from your browser with our built-in terminal. No SSH client needed — just open Clawds and start typing commands.'
            },
            logs: {
                description:
                    'Monitor your server logs in real time from the Clawds dashboard. Diagnose issues, track deployments, and debug your applications without leaving the browser.'
            },
            channels: {
                description:
                    'Connect your AI agents to Discord, Slack, WhatsApp, and more. Configure channels and bind them to agents — all from the Clawds dashboard.'
            },
            fileExplorer: {
                description:
                    'Browse, read, and edit files on your server directly from the Clawds dashboard. Syntax highlighting, search, and instant saves — no SSH needed.'
            },
            agentChat: {
                description:
                    'Chat with your AI agents directly from the Clawds dashboard. Send messages, attach images, and see conversation history — all in one place.'
            },
            envVars: {
                description:
                    'Add, edit, and remove environment variables directly from the Clawds dashboard. Set API keys, secrets, and configuration — no terminal required.'
            },
            sshKeys: {
                subject: 'Did you know? Manage SSH keys from Clawds',
                description:
                    'Generate SSH key pairs, copy public keys, and download private keys — all from the Clawds dashboard. Assign keys to claws for secure access.'
            },
            multiLanguage: {
                subject: 'Did you know? Clawds speaks your language',
                preview: 'Use Clawds in English, French, Spanish, or German',
                heading: 'Clawds in your language',
                description:
                    'Switch the entire Clawds dashboard to English, French, Spanish, or German. Everything from buttons to error messages — fully translated.'
            },
            darkMode: {
                subject: 'Did you know? Clawds has dark mode',
                description:
                    'Toggle between light and dark themes in the Clawds dashboard. Your preference is saved and applied automatically on every visit.'
            },
            skills: {
                subject: 'Did you know? 5,000+ skills on Clawds Hub',
                description:
                    'Browse over 5,000 ready-made skills on Clawds Hub and install them with a single click. Web search, code execution, image generation, and much more.',
                cta: 'Browse Clawds Hub'
            }
        }
    },
    auth: {
        emailPlaceholder: 'example@clawds.io',
    },
    settings: {
        accountDescription:
            'Manage your Clawds account settings and profile information.',
    },
    api: {
        clawHubSearchSuccess: 'Clawds Hub search completed.',
        clawHubSearchFailed: 'Could not search Clawds Hub!',
        clawHubFetched: 'Clawds Hub skills fetched.',
        clawHubFetchFailed: 'Could not fetch Clawds Hub skills!',
        clawHubInstalled: 'Skill installed from Clawds Hub.',
        clawHubInstallFailed: 'Could not install skill from Clawds Hub!',
        clawHubRemoved: 'Clawds Hub skill removed.',
        clawHubRemoveFailed: 'Could not remove Clawds Hub skill!',
        clawHubUpdateFailed: 'Could not update Clawds Hub skill!',
    },
    claws: {
        dnsSetupBanner:
            'Set up local DNS to access your claws via subdomain.clawds.',
        loadingTip3:
            'Clawds is the first ever project to allow one-click OpenClaw hosting.',
        chatReadOnlyGoReply:
            'This is a preview! Get Clawds Desktop and run OpenClaw locally — your machine, your data, no cloud needed.',
        tutorialVideoThumbnail: 'Clawds tutorial video thumbnail',
        skillsClawHubTab: 'Clawds Hub',
        clawHubSearch: 'Search Clawds Hub skills...',
        clawHubNoResults: 'No skills found on Clawds Hub.',
        clawHubEmpty: 'No Clawds Hub skills installed.',
        clawHubEmptyDescription:
            'Search and install skills from the Clawds Hub marketplace.',
        clawHubInstalled: 'Skill installed from Clawds Hub.',
        clawHubInstallFailed: 'Failed to install skill from Clawds Hub!',
        clawHubRemoved: 'Clawds Hub skill removed.',
        clawHubRemoveFailed: 'Failed to remove Clawds Hub skill!',
        clawHubUpdated: 'Skill updated from Clawds Hub.',
        clawHubUpdateFailed: 'Failed to update Clawds Hub skill!',
        clawHubLoadFailed: 'Failed to load Clawds Hub.',
        clawHubLoadFailedDescription:
            'Could not connect to Clawds Hub marketplace. Please try again.',
    },
    nav: {
        deployClawds: 'Deploy Clawds',
    },
    tiers: {
        aiCredit: 'AI credit/mo',
        aiCreditByok: 'Bring your own API keys — no AI credit charges',
        starter: {
            name: 'Starter',
            description: 'Perfect for personal projects and experimentation.',
            useCase: 'Ideal for hobbyists, students, and personal AI assistants.',
            aiCreditHint: '$3/mo AI credit (~100K GPT-4o tokens)',
        },
        pro: {
            name: 'Pro',
            description: 'For professionals who need more power and flexibility.',
            useCase: 'Great for freelancers, small teams, and production workloads.',
            aiCreditHint: '$15/mo AI credit (~500K GPT-4o tokens)',
        },
        business: {
            name: 'Business',
            description: 'Maximum resources for demanding enterprise use cases.',
            useCase: 'Built for agencies, enterprises, and high-traffic AI deployments.',
            aiCreditHint: '$50/mo AI credit (~2M GPT-4o tokens)',
        },
    },
    license: {
        planName: 'Clawds Desktop License',
        gateDescription: 'You need a Clawds Desktop License to deploy and manage OpenClaw instances locally.'
    },
    landing: {
        title: 'Deploy AI Agents. One Click. Done.',
        description:
            'Deploy AI agents in the cloud with one click. Dedicated servers, full root access, and transparent pricing.',
        heroDescription:
            'Deploy AI agents in the cloud with one click — build, connect, and scale your AI agents faster with Clawds.',
        tutorialVideoThumbnail: 'Clawds tutorial video thumbnail',
        whyClawHost: 'All-in-One Features',
        openclawControlDescription:
            'Access the native OpenClaw panel directly from Clawds. Full editing access to everything OpenClaw offers.',
        whyClawds: 'Why Clawds?',
        clawHostControl: 'Clawds Control',
        clawdsControl: 'Clawds Control',
        clawdsControlDescription:
            'Manage files, updates, channels, variables, skills, and more configuration options directly from the platform.',
        deployClawdsNow: 'Deploy Clawds Now',
        heroStatSeconds: 'Seconds to deploy',
        heroStatFirstAgent: 'Your first AI agent',
        heroStatAllInclusive: 'All-inclusive pricing',
        heroStatModels: 'AI models available',
        heroStatSkills: 'Built-in skills',
        templatesTitle: 'Use Cases',
        templatesHeading: 'Ready-to-Use Templates',
        templatesDescription: 'Start with a pre-configured template and get productive in minutes.',
        templateDeploy: 'Deploy',
        templateRecommendedTier: 'Recommended tier',
        templateSupport: 'Customer Support AI',
        templateSupportDesc: 'Deploy an AI agent that handles customer inquiries 24/7 with context-aware responses.',
        templateResearch: 'Research Assistant',
        templateResearchDesc: 'An AI-powered research assistant that analyzes documents, summarizes findings, and generates reports.',
        templateDevOps: 'DevOps Automation',
        templateDevOpsDesc: 'Automate your CI/CD pipeline with an AI agent that monitors, deploys, and troubleshoots.',
        step1Description:
            'Choose your plan and we spin up a dedicated server just for you in seconds.',
        pricingDescription:
            'Choose a plan that fits your needs. Simple, predictable pricing.',
        faq1Question: 'What is Clawds?',
        faq1Answer:
            'Clawds is a platform built to make OpenClaw accessible to everyone. It lets both non-technical users and developers run OpenClaw without managing infrastructure. We handle servers, uptime, security, and maintenance — you just use OpenClaw.',
        faq2Answer:
            'Unlike hosted AI tools, Clawds gives you a real server with OpenClaw installed. You own the infrastructure, control everything, and aren\'t limited by a shared platform or model.',
        faq3Answer:
            'Unlike hosted AI tools, Clawds gives you a real server with OpenClaw installed. You own the infrastructure, control everything, and aren\'t limited by a shared platform or model.',
        faq6Answer:
            'Pricing is based on the plan you select. We offer Starter, Pro, and Business tiers with clear specs — you choose what fits your needs and budget.',
    },
    compare: {
        description:
            'See how Clawds compares to other OpenClaw hosting platforms.',
        competitorClawHost: 'Clawds',
        fiveThousandSkills: '5,000+ skills (Clawds Hub)',
    },
    changelog: {
        title: 'Track updates, new features, and improvements to Clawds.',
        subtitle: 'All updates, new features, and improvements to Clawds.',
        upcomingReleaseFeature9:
            'Voice Mode to interact with the OpenClaw agents hosted on Clawds (Beta)',
        upcomingReleaseFeature11:
            'Landing page for Clawds Desktop, local hosting with Clawds',
        release12Description:
            'Yearly subscriptions with 2 months free, voice mode, instance reinstall, and an initial landing page for Clawds Desktop.',
        release12Feature1: 'Landing page for Clawds Desktop, local hosting with Clawds',
        release12Feature3:
            'Voice Mode to interact with the OpenClaw agents hosted on Clawds',
        release1Description:
            'The first official release of Clawds. Deploy OpenClaw on your own VPS with one click.',
        release2Description:
            'Multi-provider infrastructure and a new way to stay updated on everything Clawds.',
        release10Feature2:
            'Fixed skills sometimes failing to install from Clawds Hub marketplace',
        release7Description:
            'Major chat and playground improvements with voice interaction, Clawds Hub skills marketplace, and file attachments for agents.',
        release7Feature3:
            'Clawds Hub skills integration with 5,000+ skills available to install and manage',
    },
    privacy: {
        description:
            'Learn how Clawds collects, uses, and protects your personal data.',
        introText:
            'Clawds ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.',
        authText:
            'Clawds uses Google Firebase Authentication to manage user accounts. You may sign in with email, Google, or GitHub. By using these sign-in methods, you agree to their respective terms and privacy policies. These providers may collect basic data such as your email address, name, and device information. We only store your email address and display name.',
        eligibilityText:
            'Our Service is available to anyone. There are no age restrictions for using Clawds.',
    },
    terms: {
        description:
            'Read the terms and conditions for using Clawds services.',
        acceptanceText:
            'By accessing and using Clawds ("Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our Service.',
        serviceText:
            'Clawds provides one-click OpenClaw deployment on dedicated servers. We enable users to deploy, manage, and access pre-configured OpenClaw instances with full root access and dedicated resources.',
        authText:
            'Clawds uses Google Firebase Authentication to manage sign-in. You may authenticate with email, Google, or GitHub. By using these methods, you agree to the respective terms and privacy policies of Google and GitHub. These providers may collect basic information such as your email address, name, and device data.',
        liabilityText:
            'To the maximum extent permitted by law, Clawds shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.',
    },
    blog: {
        ctaTitle: 'Deploy Your AI Agent with One Click',
        ctaDescription:
            'Get your own dedicated AI agent running in under 60 seconds. Full root access, all AI models, transparent pricing.',
    },
    mobile: {
        emailPlaceholder: 'example@clawds.io',
    },
    comparison: {
        metaDescription:
            'See how Clawds compares to other OpenClaw hosting platforms.',
        competitorClawHost: 'Clawds',
        emailPlaceholder: 'example@clawds.io',
    },
}

export default clawdsEn