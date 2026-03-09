/**
 * Clawds German overlay — überschreibt markenspezifische Schlüssel.
 * Struktur spiegelt die Basis de.ts wider, enthält nur abweichende Schlüssel.
 */
const clawdsDe = {
    common: {
        brandName: 'Clawds',
        legalEmail: 'legal@clawds.io',
    },
    setup: {
        welcomeTitle: 'Willkommen bei Clawds',
    },
    footer: {
        copyright: 'Clawds. Alle Rechte vorbehalten.',
    },
    emails: {
        otpSubject: 'Dein Clawds-Anmeldecode',
        otpPreview: 'Dein Clawds-Anmeldecode: {{code}}',
        changelogSubject: 'Neuigkeiten bei Clawds',
        changelogPreview: 'Entdecke die neuesten Updates von Clawds: {{title}}',
        changelogVisitButton: 'Clawds besuchen',
        changelogUnsubscribe:
            'Du erhältst diese E-Mail, weil du ein Clawds-Konto hast.',
        otpBody:
            'Melde dich bei deinem Clawds-Konto an, um deine OpenClaw-Instanzen zu verwalten.',
    },
    auth: {
        emailPlaceholder: 'example@clawds.io',
    },
    settings: {
        accountDescription:
            'Verwalte deine Clawds-Kontoeinstellungen und Profilinformationen.',
    },
    claws: {
        tutorialVideoThumbnail: 'Clawds Tutorial-Video Vorschaubild',
    },
    nav: {
        deployClawds: 'Clawds bereitstellen',
    },
    tiers: {
        tokensPerDay: 'Tokens/Tag',
    },
    landing: {
        whyClawHost: 'Alles-in-Einem Funktionen',
        whyClawds: 'Warum Clawds?',
        clawHostControl: 'Clawds Steuerung',
        clawdsControl: 'Clawds Steuerung',
        deployClawdsNow: 'Clawds jetzt bereitstellen',
        heroStatSeconds: 'Sekunden bis zum Deploy',
        heroStatFirstAgent: 'Dein erster KI-Agent',
        heroStatAllInclusive: 'Alles inklusive',
        heroStatModels: 'KI-Modelle verfügbar',
        heroStatSkills: 'Eingebaute Fähigkeiten',
        templatesTitle: 'Anwendungsfälle',
        templatesHeading: 'Fertige Vorlagen',
        templatesDescription: 'Starte mit einer vorkonfigurierten Vorlage und werde in Minuten produktiv.',
        templateDeploy: 'Bereitstellen',
        templateRecommendedTier: 'Empfohlener Tarif',
        templateSupport: 'KI-Kundensupport',
        templateSupportDesc: 'Ein KI-Agent für Kundenanfragen rund um die Uhr mit kontextbezogenen Antworten.',
        templateResearch: 'Forschungsassistent',
        templateResearchDesc: 'Ein KI-gestützter Assistent für Dokumentenanalyse, Zusammenfassungen und Berichte.',
        templateDevOps: 'DevOps-Automatisierung',
        templateDevOpsDesc: 'Automatisiere deine CI/CD-Pipeline mit einem KI-Agenten für Monitoring, Deployment und Fehlersuche.',
        faq1Question: 'Was ist Clawds?',
        faq1Answer:
            'Clawds ist eine Plattform, die OpenClaw für alle zugänglich macht. Sie ermöglicht es sowohl nicht-technischen Nutzern als auch Entwicklern, OpenClaw ohne eigene Infrastruktur zu betreiben. Wir kümmern uns um Server, Verfügbarkeit, Sicherheit und Wartung – du nutzt einfach OpenClaw.',
        faq2Answer:
            'Im Gegensatz zu gehosteten KI-Tools gibt dir Clawds einen echten Server mit installiertem OpenClaw. Du besitzt die Infrastruktur, kontrollierst alles und bist nicht durch eine gemeinsame Plattform eingeschränkt.',
    },
    changelog: {
        title: 'Verfolge Updates, neue Funktionen und Verbesserungen von Clawds.',
        subtitle: 'Alle Updates, neuen Funktionen und Verbesserungen von Clawds.',
    },
    privacy: {
        metaDescription:
            'Erfahre, wie Clawds deine persönlichen Daten erhebt, nutzt und schützt.',
        intro:
            'Clawds („wir", „unser" oder „uns") ist dem Schutz deiner Privatsphäre verpflichtet. Diese Datenschutzerklärung erläutert, wie wir deine Informationen erheben, nutzen, offenlegen und schützen, wenn du unseren Dienst nutzt.',
        collectAuth:
            'Clawds nutzt Google Firebase Authentication zur Kontoverwaltung. Du kannst dich per E-Mail, Google oder GitHub anmelden. Durch die Nutzung dieser Anmeldemethoden stimmst du den jeweiligen Nutzungsbedingungen und Datenschutzrichtlinien zu.',
        eligibility:
            'Unser Dienst steht jedem zur Verfügung. Es gibt keine Altersbeschränkungen für die Nutzung von Clawds.',
    },
    terms: {
        metaDescription:
            'Lies die Nutzungsbedingungen für die Clawds-Dienste.',
        intro:
            'Durch den Zugriff auf und die Nutzung von Clawds („Dienst") akzeptierst und erklärst du dich mit den Bestimmungen dieser Vereinbarung einverstanden. Wenn du diesen Bedingungen nicht zustimmst, nutze unseren Dienst bitte nicht.',
        serviceDescription:
            'Clawds bietet Ein-Klick-OpenClaw-Bereitstellung auf dedizierten Servern. Wir ermöglichen es Nutzern, vorkonfigurierte OpenClaw-Instanzen mit vollem Root-Zugriff und dedizierten Ressourcen bereitzustellen, zu verwalten und darauf zuzugreifen.',
        authDescription:
            'Clawds nutzt Google Firebase Authentication zur Anmeldung. Du kannst dich per E-Mail, Google oder GitHub authentifizieren. Durch die Nutzung dieser Methoden stimmst du den jeweiligen Nutzungsbedingungen und Datenschutzrichtlinien von Google und GitHub zu.',
        liability:
            'Im größtmöglichen gesetzlich zulässigen Umfang haftet Clawds nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden oder den Verlust von Gewinnen oder Einnahmen.',
    },
    comparison: {
        metaDescription:
            'Vergleiche Clawds mit anderen OpenClaw-Hosting-Plattformen.',
        competitorClawHost: 'Clawds',
        emailPlaceholder: 'example@clawds.io',
    },
}

export default clawdsDe
