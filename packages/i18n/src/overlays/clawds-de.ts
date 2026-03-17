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
    emails: {
        otpSubject: 'Dein Clawds-Anmeldecode',
        otpPreview: 'Dein Clawds-Anmeldecode: {{code}}',
        changelogSubject: 'Neuigkeiten bei Clawds',
        changelogPreview: 'Entdecke die neuesten Updates von Clawds: {{title}}',
        changelogVisitButton: 'Clawds besuchen',
        changelogUnsubscribe:
            'Du erhältst diese E-Mail, weil du ein Clawds-Konto hast.',
        changelogFooter:
            'Du erhältst diese E-Mail, weil du ein Clawds-Konto hast.',
        featureFooter:
            'Du erhältst diese E-Mail, weil du ein Clawds-Konto hast.',
        otpBody:
            'Melde dich bei deinem Clawds-Konto an, um deine OpenClaw-Instanzen zu verwalten.',
        features: {
            terminal: {
                description:
                    'Greife direkt über deinen Browser auf deinen Server zu — mit unserem integrierten Terminal. Kein SSH-Client nötig — öffne einfach Clawds und tippe los.'
            },
            logs: {
                description:
                    'Überwache die Logs deines Servers in Echtzeit über das Clawds-Dashboard. Diagnostiziere Probleme, verfolge Deployments und debugge deine Anwendungen — alles im Browser.'
            },
            channels: {
                description:
                    'Verbinde deine KI-Agenten mit Discord, Slack, WhatsApp und mehr. Konfiguriere Kanäle und verknüpfe sie mit Agenten — alles über das Clawds-Dashboard.'
            },
            fileExplorer: {
                description:
                    'Durchsuche, lese und bearbeite die Dateien deines Servers direkt im Clawds-Dashboard. Syntax-Hervorhebung, Suche und sofortiges Speichern — ohne SSH.'
            },
            agentChat: {
                description:
                    'Chatte mit deinen KI-Agenten direkt im Clawds-Dashboard. Sende Nachrichten, hänge Bilder an und sieh den Verlauf — alles an einem Ort.'
            },
            envVars: {
                description:
                    'Füge Umgebungsvariablen direkt im Clawds-Dashboard hinzu, bearbeite und lösche sie. API-Schlüssel, Secrets und Konfiguration — ohne Terminal.'
            },
            sshKeys: {
                subject: 'Wusstest du schon? SSH-Schlüssel über Clawds verwalten',
                description:
                    'Generiere SSH-Schlüsselpaare, kopiere öffentliche Schlüssel und lade private Schlüssel herunter — alles im Clawds-Dashboard. Weise Schlüssel deinen Claws für sicheren Zugang zu.'
            },
            multiLanguage: {
                subject: 'Wusstest du schon? Clawds spricht deine Sprache',
                preview: 'Nutze Clawds auf Englisch, Französisch, Spanisch oder Deutsch',
                heading: 'Clawds in deiner Sprache',
                description:
                    'Stelle das gesamte Clawds-Dashboard auf Englisch, Französisch, Spanisch oder Deutsch um. Von Buttons bis Fehlermeldungen — alles übersetzt.'
            },
            darkMode: {
                subject: 'Wusstest du schon? Clawds hat einen Dark Mode',
                description:
                    'Wechsle zwischen hellem und dunklem Design im Clawds-Dashboard. Deine Einstellung wird gespeichert und bei jedem Besuch automatisch angewendet.'
            },
            skills: {
                subject: 'Wusstest du schon? Über 5.000 Skills auf Clawds Hub',
                description:
                    'Durchsuche über 5.000 fertige Skills auf Clawds Hub und installiere sie mit einem einzigen Klick. Websuche, Code-Ausführung, Bildgenerierung und vieles mehr.',
                cta: 'Clawds Hub durchsuchen'
            }
        }
    },
    auth: {
        emailPlaceholder: 'example@clawds.io',
    },
    settings: {
        accountDescription:
            'Verwalte deine Clawds-Kontoeinstellungen und Profilinformationen.',
    },
    api: {
        clawHubSearchSuccess: 'Clawds Hub-Suche abgeschlossen.',
        clawHubSearchFailed: 'Clawds Hub konnte nicht durchsucht werden!',
        clawHubFetched: 'Clawds Hub-Skills abgerufen.',
        clawHubFetchFailed: 'Clawds Hub-Skills konnten nicht abgerufen werden!',
        clawHubInstalled: 'Skill von Clawds Hub installiert.',
        clawHubInstallFailed:
            'Skill von Clawds Hub konnte nicht installiert werden!',
        clawHubRemoved: 'Clawds Hub-Skill entfernt.',
        clawHubRemoveFailed: 'Clawds Hub-Skill konnte nicht entfernt werden!',
        clawHubUpdateFailed: 'Clawds Hub-Skill konnte nicht aktualisiert werden!',
    },
    claws: {
        dnsSetupBanner:
            'Richte lokales DNS ein, um auf deine Claws über subdomain.clawds zuzugreifen.',
        loadingTip3:
            'Clawds ist das erste Projekt überhaupt, das Ein-Klick-OpenClaw-Hosting ermöglicht.',
        chatReadOnlyGoReply:
            'Dies ist eine Vorschau! Hol dir Clawds Desktop und führe OpenClaw lokal aus — dein Rechner, deine Daten, kein Cloud nötig.',
        tutorialVideoThumbnail: 'Clawds Tutorial-Video Vorschaubild',
        skillsClawHubTab: 'Clawds Hub',
        clawHubSearch: 'Clawds Hub-Skills suchen...',
        clawHubNoResults: 'Keine Skills auf Clawds Hub gefunden.',
        clawHubEmpty: 'Keine Clawds Hub-Skills installiert.',
        clawHubEmptyDescription:
            'Suche und installiere Skills vom Clawds Hub-Marktplatz.',
        clawHubInstalled: 'Skill von Clawds Hub installiert.',
        clawHubInstallFailed:
            'Skill von Clawds Hub konnte nicht installiert werden!',
        clawHubRemoved: 'Clawds Hub-Skill entfernt.',
        clawHubRemoveFailed: 'Clawds Hub-Skill konnte nicht entfernt werden!',
        clawHubUpdated: 'Skill von Clawds Hub aktualisiert.',
        clawHubUpdateFailed: 'Clawds Hub-Skill konnte nicht aktualisiert werden!',
        clawHubLoadFailed: 'Clawds Hub konnte nicht geladen werden!',
        clawHubLoadFailedDescription:
            'Verbindung zum Clawds Hub-Marktplatz konnte nicht hergestellt werden. Bitte versuche es erneut!',
    },
    nav: {
        deployClawds: 'Clawds bereitstellen',
    },
    tiers: {
        aiCredit: 'KI-Guthaben/Monat',
        aiCreditByok: 'Eigene API-Schlüssel verwenden — keine KI-Guthabengebühren',
        starter: {
            name: 'Starter',
            description: 'Perfekt für persönliche Projekte und Experimente.',
            useCase: 'Ideal für Hobbyisten, Studenten und persönliche KI-Assistenten.',
            aiCreditHint: '$3/Monat KI-Guthaben (~100K GPT-4o Tokens)',
        },
        pro: {
            name: 'Pro',
            description: 'Für Profis, die mehr Leistung und Flexibilität brauchen.',
            useCase: 'Ideal für Freelancer, kleine Teams und Produktionsworkloads.',
            aiCreditHint: '$15/Monat KI-Guthaben (~500K GPT-4o Tokens)',
        },
        business: {
            name: 'Business',
            description: 'Maximale Ressourcen für anspruchsvolle Anwendungsfälle.',
            useCase: 'Für Agenturen, Unternehmen und KI-Deployments mit hohem Traffic.',
            aiCreditHint: '$50/Monat KI-Guthaben (~2M GPT-4o Tokens)',
        },
    },
    license: {
        planName: 'Clawds Desktop Lizenz',
        gateDescription: 'Du benötigst eine Clawds Desktop Lizenz, um OpenClaw-Instanzen lokal bereitzustellen und zu verwalten.'
    },
    footer: {
        copyright: 'Clawds. Alle Rechte vorbehalten.',
        poweredBy: 'Betrieben von AI TEXTURA',
        brandDescription:
            'KI-Agenten in der Cloud mit einem Klick bereitstellen. Dedizierte Ressourcen, volle Privatsphäre, keine geteilte Infrastruktur.',
        productDescription:
            'KI-Agenten in der Cloud mit einem Klick bereitstellen — erstelle, verbinde und skaliere deine KI-Agenten schneller mit Clawds.',
    },
    landing: {
        title: 'KI-Agenten bereitstellen. Ein Klick. Fertig.',
        description:
            'KI-Agenten in der Cloud mit einem Klick bereitstellen. Dedizierte Server, voller Root-Zugriff und transparente Preise.',
        heroDescription:
            'KI-Agenten in der Cloud mit einem Klick bereitstellen — erstelle, verbinde und skaliere deine KI-Agenten schneller mit Clawds.',
        tutorialVideoThumbnail: 'Clawds Tutorial-Video Vorschaubild',
        whyClawHost: 'Alles-in-Einem Funktionen',
        openclawControlDescription:
            'Greife direkt von Clawds auf das native OpenClaw-Panel zu. Voller Bearbeitungszugriff auf alles, was OpenClaw bietet.',
        whyClawds: 'Warum Clawds?',
        clawHostControl: 'Clawds Steuerung',
        clawdsControl: 'Clawds Steuerung',
        clawdsControlDescription:
            'Verwalte Dateien, Updates, Kanäle, Variablen, Fähigkeiten und mehr direkt über die Plattform.',
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
        faq3Answer:
            'Anders als gehostete KI-Werkzeuge gibt dir Clawds einen echten Server mit installiertem OpenClaw. Du besitzt die Infrastruktur, kontrollierst alles und bist nicht durch eine geteilte Plattform oder ein Modell eingeschränkt.',
        step1Description:
            'Wähle deinen Tarif und wir starten einen dedizierten Server für dich in Sekunden.',
        pricingDescription:
            'Wähle einen Tarif, der zu deinen Anforderungen passt. Einfache, vorhersehbare Preise.',
        faq6Answer:
            'Die Preise richten sich nach dem gewählten Tarif. Wir bieten Starter-, Pro- und Business-Tarife mit klaren Spezifikationen — du wählst, was zu deinen Bedürfnissen und deinem Budget passt.',
    },
    compare: {
        description:
            'Erfahre, wie sich Clawds von anderen OpenClaw-Hosting-Plattformen unterscheidet.',
        competitorClawHost: 'Clawds',
        fiveThousandSkills: '5.000+ Skills (Clawds Hub)',
    },
    changelog: {
        title: 'Verfolge Updates, neue Funktionen und Verbesserungen von Clawds.',
        subtitle: 'Alle Updates, neuen Funktionen und Verbesserungen von Clawds.',
        upcomingReleaseFeature9:
            'Sprachmodus zur Interaktion mit den auf Clawds gehosteten OpenClaw-Agenten (Beta)',
        upcomingReleaseFeature11:
            'Landingpage für Clawds Desktop, lokales Hosting mit Clawds',
        release12Description:
            'Jahresabonnements mit 2 Monaten gratis, Sprachmodus, Instanz-Neuinstallation und eine erste Landingpage für Clawds Desktop.',
        release12Feature1: 'Landingpage für Clawds Desktop, lokales Hosting mit Clawds',
        release12Feature3:
            'Sprachmodus zur Interaktion mit den auf Clawds gehosteten OpenClaw-Agenten',
        release1Description:
            'Die erste offizielle Veröffentlichung von Clawds. Stelle OpenClaw mit einem Klick auf deinem eigenen VPS bereit.',
        release2Description:
            'Multi-Anbieter-Infrastruktur und eine neue Möglichkeit, über alles bei Clawds auf dem Laufenden zu bleiben.',
        release10Feature2:
            'Behebung von Skills, die manchmal nicht vom Clawds Hub-Marktplatz installiert werden konnten',
        release7Description:
            'Große Chat- und Playground-Verbesserungen mit Sprachinteraktion, Clawds Hub-Skills-Marktplatz und Dateianhängen für Agenten.',
        release7Feature3:
            'Clawds Hub-Skills-Integration mit über 5.000 verfügbaren Skills zum Installieren und Verwalten',
    },
    privacy: {
        description:
            'Erfahre, wie Clawds deine persönlichen Daten erhebt, nutzt und schützt.',
        introText:
            'Clawds („wir", „unser" oder „uns") ist dem Schutz deiner Privatsphäre verpflichtet. Diese Datenschutzerklärung erläutert, wie wir deine Informationen erheben, nutzen, offenlegen und schützen, wenn du unseren Dienst nutzt.',
        authText:
            'Clawds nutzt Google Firebase Authentication zur Kontoverwaltung. Du kannst dich per E-Mail, Google oder GitHub anmelden. Durch die Nutzung dieser Anmeldemethoden stimmst du den jeweiligen Nutzungsbedingungen und Datenschutzrichtlinien zu.',
        eligibilityText:
            'Unser Dienst steht jedem zur Verfügung. Es gibt keine Altersbeschränkungen für die Nutzung von Clawds.',
    },
    terms: {
        description:
            'Lies die Nutzungsbedingungen für die Clawds-Dienste.',
        acceptanceText:
            'Durch den Zugriff auf und die Nutzung von Clawds („Dienst") akzeptierst und erklärst du dich mit den Bestimmungen dieser Vereinbarung einverstanden. Wenn du diesen Bedingungen nicht zustimmst, nutze unseren Dienst bitte nicht.',
        serviceText:
            'Clawds bietet Ein-Klick-OpenClaw-Bereitstellung auf dedizierten Servern. Wir ermöglichen es Nutzern, vorkonfigurierte OpenClaw-Instanzen mit vollem Root-Zugriff und dedizierten Ressourcen bereitzustellen, zu verwalten und darauf zuzugreifen.',
        authText:
            'Clawds nutzt Google Firebase Authentication zur Anmeldung. Du kannst dich per E-Mail, Google oder GitHub authentifizieren. Durch die Nutzung dieser Methoden stimmst du den jeweiligen Nutzungsbedingungen und Datenschutzrichtlinien von Google und GitHub zu.',
        liabilityText:
            'Im größtmöglichen gesetzlich zulässigen Umfang haftet Clawds nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden oder den Verlust von Gewinnen oder Einnahmen.',
    },
    blog: {
        ctaTitle: 'Starte deinen KI-Agenten mit einem Klick',
        ctaDescription:
            'Bringe deinen eigenen dedizierten KI-Agenten in unter 60 Sekunden zum Laufen. Voller Root-Zugriff, alle KI-Modelle, transparente Preise.',
    },
    mobile: {
        emailPlaceholder: 'beispiel@clawds.io',
    },
    comparison: {
        metaDescription:
            'Vergleiche Clawds mit anderen OpenClaw-Hosting-Plattformen.',
        competitorClawHost: 'Clawds',
        emailPlaceholder: 'example@clawds.io',
    },
}

export default clawdsDe
