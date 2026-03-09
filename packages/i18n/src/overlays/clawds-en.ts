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
    landing: {
        whyClawHost: 'All-in-One Features',
        clawHostControl: 'Clawds Control',
        faq1Question: 'What is Clawds?',
        faq1Answer:
            'Clawds is a platform built to make OpenClaw accessible to everyone. It lets both non-technical users and developers run OpenClaw without managing infrastructure. We handle servers, uptime, security, and maintenance — you just use OpenClaw.',
        faq2Answer:
            'Unlike hosted AI tools, Clawds gives you a real server with OpenClaw installed. You own the infrastructure, control everything, and aren\'t limited by a shared platform or model.',
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
    comparison: {
        metaDescription:
            'See how Clawds compares to other OpenClaw hosting platforms.',
        competitorClawHost: 'Clawds',
        emailPlaceholder: 'example@clawds.io',
    },
}

export default clawdsEn