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
    emails: {
        otpSubject: 'Your Clawds sign-in code',
        otpPreview: 'Your Clawds sign-in code: {{code}}',
        changelogSubject: "What's New at Clawds",
        changelogPreview: 'Check out the latest updates to Clawds: {{title}}',
        changelogVisitButton: 'Visit Clawds',
        changelogUnsubscribe:
            "You're receiving this because you have a Clawds account.",
        otpBody:
            'Sign in to your Clawds account to manage your OpenClaw instances.',
    },
    auth: {
        emailPlaceholder: 'example@clawds.io',
    },
    settings: {
        accountDescription:
            'Manage your Clawds account settings and profile information.',
    },
    claws: {
        tutorialVideoThumbnail: 'Clawds tutorial video thumbnail',
    },
    nav: {
        deployClawds: 'Deploy Clawds',
    },
    tiers: {
        tokensPerDay: 'tokens/day',
        starter: {
            name: 'Starter',
            description: 'Perfect for personal projects and experimentation.',
            useCase: 'Ideal for hobbyists, students, and personal AI assistants.',
        },
        pro: {
            name: 'Pro',
            description: 'For professionals who need more power and flexibility.',
            useCase: 'Great for freelancers, small teams, and production workloads.',
        },
        business: {
            name: 'Business',
            description: 'Maximum resources for demanding enterprise use cases.',
            useCase: 'Built for agencies, enterprises, and high-traffic AI deployments.',
        },
    },
    landing: {
        title: 'Deploy AI Agents. One Click. Done.',
        description:
            'Deploy AI agents in the cloud with one click. Dedicated servers, full root access, and transparent pricing.',
        heroDescription:
            'Deploy AI agents in the cloud with one click — build, connect, and scale your AI agents faster with Clawds.',
        whyClawHost: 'All-in-One Features',
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
        faq6Answer:
            'Pricing is based on the plan you select. We offer Starter, Pro, and Business tiers with clear specs — you choose what fits your needs and budget.',
    },
    changelog: {
        title: 'Track updates, new features, and improvements to Clawds.',
        subtitle: 'All updates, new features, and improvements to Clawds.',
    },
    privacy: {
        metaDescription:
            'Learn how Clawds collects, uses, and protects your personal data.',
        intro:
            'Clawds ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.',
        collectAuth:
            'Clawds uses Google Firebase Authentication to manage user accounts. You may sign in with email, Google, or GitHub. By using these sign-in methods, you agree to their respective terms and privacy policies. These providers may collect basic data such as your email address, name, and device information. We only store your email address and display name.',
        eligibility:
            'Our Service is available to anyone. There are no age restrictions for using Clawds.',
    },
    terms: {
        metaDescription:
            'Read the terms and conditions for using Clawds services.',
        intro:
            'By accessing and using Clawds ("Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our Service.',
        serviceDescription:
            'Clawds provides one-click OpenClaw deployment on dedicated servers. We enable users to deploy, manage, and access pre-configured OpenClaw instances with full root access and dedicated resources.',
        authDescription:
            'Clawds uses Google Firebase Authentication to manage sign-in. You may authenticate with email, Google, or GitHub. By using these methods, you agree to the respective terms and privacy policies of Google and GitHub. These providers may collect basic information such as your email address, name, and device data.',
        liability:
            'To the maximum extent permitted by law, Clawds shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.',
    },
    blog: {
        ctaTitle: 'Deploy Your AI Agent with One Click',
        ctaDescription:
            'Get your own dedicated AI agent running in under 60 seconds. Full root access, all AI models, transparent pricing.',
    },
    comparison: {
        metaDescription:
            'See how Clawds compares to other OpenClaw hosting platforms.',
        competitorClawHost: 'Clawds',
        emailPlaceholder: 'example@clawds.io',
    },
}

export default clawdsEn