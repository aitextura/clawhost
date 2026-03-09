/**
 * Clawds French overlay — remplace les clés spécifiques à la marque.
 * La structure reflète les traductions de base fr.ts, ne contient que les clés différentes.
 */
const clawdsFr = {
    common: {
        brandName: 'Clawds',
        legalEmail: 'legal@clawds.io',
    },
    setup: {
        welcomeTitle: 'Bienvenue sur Clawds',
    },
    footer: {
        copyright: 'Clawds. Tous droits réservés.',
    },
    emails: {
        otpSubject: 'Votre code de connexion Clawds',
        otpPreview: 'Votre code de connexion Clawds : {{code}}',
        changelogSubject: 'Les nouveautés de Clawds',
        changelogPreview:
            'Découvrez les dernières mises à jour de Clawds : {{title}}',
        changelogVisitButton: 'Visiter Clawds',
        changelogUnsubscribe:
            'Vous recevez cet email car vous avez un compte Clawds.',
        otpBody:
            'Connectez-vous à votre compte Clawds pour gérer vos instances OpenClaw.',
    },
    auth: {
        emailPlaceholder: 'example@clawds.io',
    },
    settings: {
        accountDescription:
            'Gérez les paramètres de votre compte Clawds et les informations de votre profil.',
    },
    claws: {
        tutorialVideoThumbnail: 'Miniature de la vidéo tutoriel Clawds',
    },
    nav: {
        deployClawds: 'Déployer Clawds',
    },
    tiers: {
        tokensPerDay: 'tokens/jour',
    },
    landing: {
        whyClawHost: 'Fonctionnalités Tout-en-Un',
        whyClawds: 'Pourquoi Clawds ?',
        clawHostControl: 'Contrôle Clawds',
        clawdsControl: 'Contrôle Clawds',
        deployClawdsNow: 'Déployer Clawds maintenant',
        heroStatSeconds: 'Secondes pour déployer',
        heroStatFirstAgent: 'Votre premier agent IA',
        heroStatAllInclusive: 'Tout inclus',
        heroStatModels: 'Modèles IA disponibles',
        heroStatSkills: 'Compétences intégrées',
        templatesTitle: "Cas d'utilisation",
        templatesHeading: 'Modèles prêts à l\'emploi',
        templatesDescription: 'Commencez avec un modèle préconfiguré et soyez productif en quelques minutes.',
        templateDeploy: 'Déployer',
        templateRecommendedTier: 'Niveau recommandé',
        templateSupport: 'Support client IA',
        templateSupportDesc: 'Un agent IA qui gère les demandes clients 24h/24 avec des réponses contextuelles.',
        templateResearch: 'Assistant de recherche',
        templateResearchDesc: 'Un assistant IA pour l\'analyse de documents, la synthèse et la génération de rapports.',
        templateDevOps: 'Automatisation DevOps',
        templateDevOpsDesc: 'Automatisez votre pipeline CI/CD avec un agent IA pour le monitoring, le déploiement et le diagnostic.',
        faq1Question: "Qu'est-ce que Clawds ?",
        faq1Answer:
            "Clawds est une plateforme conçue pour rendre OpenClaw accessible à tous. Elle permet aux utilisateurs non techniques comme aux développeurs d'exécuter OpenClaw sans gérer d'infrastructure. Nous gérons les serveurs, la disponibilité, la sécurité et la maintenance — vous utilisez simplement OpenClaw.",
        faq2Answer:
            "Contrairement aux outils d'IA hébergés, Clawds vous donne un vrai serveur avec OpenClaw installé. Vous possédez l'infrastructure, contrôlez tout et n'êtes pas limité par une plateforme partagée.",
    },
    changelog: {
        title: 'Suivez les mises à jour, nouvelles fonctionnalités et améliorations de Clawds.',
        subtitle: 'Toutes les mises à jour, nouvelles fonctionnalités et améliorations de Clawds.',
    },
    privacy: {
        metaDescription:
            'Découvrez comment Clawds collecte, utilise et protège vos données personnelles.',
        intro:
            'Clawds (« nous », « notre » ou « nos ») s\'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre Service.',
        collectAuth:
            'Clawds utilise Google Firebase Authentication pour gérer les comptes utilisateurs. Vous pouvez vous connecter avec un email, Google ou GitHub. En utilisant ces méthodes de connexion, vous acceptez leurs conditions et politiques de confidentialité respectives.',
        eligibility:
            "Notre Service est accessible à tous. Il n'y a pas de restriction d'âge pour utiliser Clawds.",
    },
    terms: {
        metaDescription:
            "Lisez les conditions d'utilisation des services Clawds.",
        intro:
            "En accédant et en utilisant Clawds (« Service »), vous acceptez et vous engagez à respecter les termes et dispositions de cet accord. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre Service.",
        serviceDescription:
            "Clawds fournit un déploiement OpenClaw en un clic sur des serveurs dédiés. Nous permettons aux utilisateurs de déployer, gérer et accéder à des instances OpenClaw préconfigurées avec un accès root complet et des ressources dédiées.",
        authDescription:
            "Clawds utilise Google Firebase Authentication pour gérer la connexion. Vous pouvez vous authentifier avec un email, Google ou GitHub. En utilisant ces méthodes, vous acceptez les conditions et politiques de confidentialité respectives de Google et GitHub.",
        liability:
            'Dans la mesure maximale autorisée par la loi, Clawds ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, ni de toute perte de bénéfices ou de revenus.',
    },
    comparison: {
        metaDescription:
            "Découvrez comment Clawds se compare aux autres plateformes d'hébergement OpenClaw.",
        competitorClawHost: 'Clawds',
        emailPlaceholder: 'example@clawds.io',
    },
}

export default clawdsFr
