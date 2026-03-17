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
    emails: {
        otpSubject: 'Votre code de connexion Clawds',
        otpPreview: 'Votre code de connexion Clawds : {{code}}',
        changelogSubject: 'Les nouveautés de Clawds',
        changelogPreview:
            'Découvrez les dernières mises à jour de Clawds : {{title}}',
        changelogVisitButton: 'Visiter Clawds',
        changelogUnsubscribe:
            'Vous recevez cet email car vous avez un compte Clawds.',
        changelogFooter:
            'Vous recevez cet email car vous avez un compte Clawds.',
        featureFooter:
            'Vous recevez cet email car vous avez un compte Clawds.',
        otpBody:
            'Connectez-vous à votre compte Clawds pour gérer vos instances OpenClaw.',
        features: {
            terminal: {
                description:
                    'Accédez à votre serveur directement depuis votre navigateur avec notre terminal intégré. Pas besoin de client SSH — ouvrez Clawds et commencez à taper vos commandes.'
            },
            logs: {
                description:
                    'Surveillez les logs de votre serveur en temps réel depuis le tableau de bord Clawds. Diagnostiquez les problèmes, suivez les déploiements et déboguez vos applications sans quitter le navigateur.'
            },
            channels: {
                description:
                    'Connectez vos agents IA à Discord, Slack, WhatsApp et plus encore. Configurez les canaux et liez-les à vos agents — le tout depuis le tableau de bord Clawds.'
            },
            fileExplorer: {
                description:
                    'Parcourez, lisez et éditez les fichiers de votre serveur directement depuis le tableau de bord Clawds. Coloration syntaxique, recherche et sauvegarde instantanée — sans SSH.'
            },
            agentChat: {
                description:
                    'Chattez avec vos agents IA directement depuis le tableau de bord Clawds. Envoyez des messages, joignez des images et consultez l\'historique — tout en un seul endroit.'
            },
            envVars: {
                description:
                    'Ajoutez, modifiez et supprimez des variables d\'environnement directement depuis le tableau de bord Clawds. Clés API, secrets et configuration — sans terminal.'
            },
            sshKeys: {
                subject: 'Le saviez-vous ? Gérez les clés SSH depuis Clawds',
                description:
                    'Générez des paires de clés SSH, copiez les clés publiques et téléchargez les clés privées — le tout depuis le tableau de bord Clawds. Assignez des clés à vos claws pour un accès sécurisé.'
            },
            multiLanguage: {
                subject: 'Le saviez-vous ? Clawds parle votre langue',
                preview: 'Utilisez Clawds en anglais, français, espagnol ou allemand',
                heading: 'Clawds dans votre langue',
                description:
                    'Passez l\'intégralité du tableau de bord Clawds en anglais, français, espagnol ou allemand. Des boutons aux messages d\'erreur — tout est traduit.'
            },
            darkMode: {
                subject: 'Le saviez-vous ? Clawds a un mode sombre',
                description:
                    'Basculez entre les thèmes clair et sombre dans le tableau de bord Clawds. Votre préférence est sauvegardée et appliquée automatiquement à chaque visite.'
            },
            skills: {
                subject: 'Le saviez-vous ? Plus de 5 000 skills sur Clawds Hub',
                description:
                    'Parcourez plus de 5 000 skills prêts à l\'emploi sur Clawds Hub et installez-les en un seul clic. Recherche web, exécution de code, génération d\'images et bien plus.',
                cta: 'Parcourir Clawds Hub'
            }
        }
    },
    auth: {
        emailPlaceholder: 'example@clawds.io',
    },
    settings: {
        accountDescription:
            'Gérez les paramètres de votre compte Clawds et les informations de votre profil.',
    },
    api: {
        clawHubSearchSuccess: 'Recherche Clawds Hub terminée.',
        clawHubSearchFailed: 'Impossible de rechercher sur Clawds Hub !',
        clawHubFetched: 'Compétences Clawds Hub récupérées.',
        clawHubFetchFailed: 'Impossible de récupérer les compétences Clawds Hub !',
        clawHubInstalled: 'Compétence installée depuis Clawds Hub.',
        clawHubInstallFailed:
            "Impossible d'installer la compétence depuis Clawds Hub !",
        clawHubRemoved: 'Compétence Clawds Hub supprimée.',
        clawHubRemoveFailed: 'Impossible de supprimer la compétence Clawds Hub !',
        clawHubUpdateFailed:
            'Impossible de mettre à jour la compétence Clawds Hub !',
    },
    claws: {
        dnsSetupBanner:
            'Configurez le DNS local pour accéder à vos claws via sous-domaine.clawds.',
        loadingTip3:
            'Clawds est le tout premier projet permettant l\'hébergement d\'OpenClaw en un clic.',
        chatReadOnlyGoReply:
            'Ceci est un aperçu ! Obtenez Clawds Desktop et exécutez OpenClaw localement — votre machine, vos données, pas de cloud nécessaire.',
        tutorialVideoThumbnail: 'Miniature de la vidéo tutoriel Clawds',
        skillsClawHubTab: 'Clawds Hub',
        clawHubSearch: 'Rechercher des compétences Clawds Hub...',
        clawHubNoResults: 'Aucune compétence trouvée sur Clawds Hub.',
        clawHubEmpty: 'Aucune compétence Clawds Hub installée.',
        clawHubEmptyDescription:
            'Recherchez et installez des compétences depuis la marketplace Clawds Hub.',
        clawHubInstalled: 'Compétence installée depuis Clawds Hub.',
        clawHubInstallFailed:
            "Échec de l'installation de la compétence depuis Clawds Hub !",
        clawHubRemoved: 'Compétence Clawds Hub supprimée.',
        clawHubRemoveFailed:
            'Échec de la suppression de la compétence Clawds Hub !',
        clawHubUpdated: 'Compétence mise à jour depuis Clawds Hub.',
        clawHubUpdateFailed:
            'Échec de la mise à jour de la compétence Clawds Hub !',
        clawHubLoadFailed: 'Échec du chargement de Clawds Hub !',
        clawHubLoadFailedDescription:
            'Impossible de se connecter à la marketplace Clawds Hub. Veuillez réessayer !',
    },
    nav: {
        deployClawds: 'Déployer Clawds',
    },
    tiers: {
        aiCredit: 'crédit IA/mois',
        aiCreditByok: 'Utilisez vos propres clés API — sans frais de crédit IA',
        starter: {
            name: 'Starter',
            description: 'Parfait pour les projets personnels et l\'expérimentation.',
            useCase: 'Idéal pour les passionnés, étudiants et assistants IA personnels.',
            aiCreditHint: '3 $/mois crédit IA (~100K tokens GPT-4o)',
        },
        pro: {
            name: 'Pro',
            description: 'Pour les professionnels qui ont besoin de plus de puissance.',
            useCase: 'Parfait pour les freelances, petites équipes et charges de production.',
            aiCreditHint: '15 $/mois crédit IA (~500K tokens GPT-4o)',
        },
        business: {
            name: 'Business',
            description: 'Ressources maximales pour les cas d\'utilisation exigeants.',
            useCase: 'Conçu pour les agences, entreprises et déploiements IA à fort trafic.',
            aiCreditHint: '50 $/mois crédit IA (~2M tokens GPT-4o)',
        },
    },
    license: {
        planName: 'Licence Clawds Desktop',
        gateDescription: 'Vous avez besoin d\'une licence Clawds Desktop pour déployer et gérer des instances OpenClaw localement.'
    },
    footer: {
        copyright: 'Clawds. Tous droits réservés.',
        poweredBy: 'Propulsé par AI TEXTURA',
        brandDescription:
            'Déployez des agents IA dans le cloud en un clic. Ressources dédiées, confidentialité totale, sans infrastructure partagée.',
        productDescription:
            'Déployez des agents IA dans le cloud en un clic — créez, connectez et faites évoluer vos agents IA plus rapidement avec Clawds.',
    },
    landing: {
        title: 'Déployez des agents IA. Un clic. Terminé.',
        description:
            'Déployez des agents IA dans le cloud en un clic. Serveurs dédiés, accès root complet et tarification transparente.',
        heroDescription:
            'Déployez des agents IA dans le cloud en un clic — créez, connectez et faites évoluer vos agents IA plus rapidement avec Clawds.',
        tutorialVideoThumbnail: 'Miniature de la vidéo tutoriel Clawds',
        whyClawHost: 'Fonctionnalités Tout-en-Un',
        openclawControlDescription:
            'Accédez au panneau natif d\'OpenClaw directement depuis Clawds. Accès complet en édition à tout ce qu\'OpenClaw offre.',
        whyClawds: 'Pourquoi Clawds ?',
        clawHostControl: 'Contrôle Clawds',
        clawdsControl: 'Contrôle Clawds',
        clawdsControlDescription:
            'Gérez fichiers, mises à jour, canaux, variables, compétences et plus directement depuis la plateforme.',
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
        faq3Answer:
            "Contrairement aux outils d'IA hébergés, Clawds vous offre un vrai serveur avec OpenClaw installé. Vous possédez l'infrastructure, contrôlez tout et n'êtes pas limité par une plateforme partagée ou un modèle.",
        step1Description:
            'Choisissez votre forfait et nous démarrons un serveur dédié pour vous en quelques secondes.',
        pricingDescription:
            'Choisissez un forfait adapté à vos besoins. Tarification simple et prévisible.',
        faq6Answer:
            'La tarification dépend du forfait que vous choisissez. Nous proposons des niveaux Starter, Pro et Business avec des spécifications claires — vous choisissez ce qui correspond à vos besoins et votre budget.',
    },
    compare: {
        description:
            'Découvrez comment Clawds se compare aux autres plateformes d\'hébergement OpenClaw.',
        competitorClawHost: 'Clawds',
        fiveThousandSkills: '5 000+ compétences (Clawds Hub)',
    },
    changelog: {
        title: 'Suivez les mises à jour, nouvelles fonctionnalités et améliorations de Clawds.',
        subtitle: 'Toutes les mises à jour, nouvelles fonctionnalités et améliorations de Clawds.',
        upcomingReleaseFeature9:
            'Mode vocal pour interagir avec les agents OpenClaw hébergés sur Clawds (Bêta)',
        upcomingReleaseFeature11:
            'Page de présentation de Clawds Desktop, hébergement local avec Clawds',
        release12Description:
            'Abonnements annuels avec 2 mois offerts, mode vocal, réinstallation d\'instance et une page de présentation initiale pour Clawds Desktop.',
        release12Feature1: 'Page de présentation de Clawds Desktop, hébergement local avec Clawds',
        release12Feature3:
            'Mode vocal pour interagir avec les agents OpenClaw hébergés sur Clawds',
        release1Description:
            'La première version officielle de Clawds. Déployez OpenClaw sur votre propre VPS en un clic.',
        release2Description:
            'Infrastructure multi-fournisseur et une nouvelle façon de rester informé sur Clawds.',
        release10Feature2:
            "Correction des compétences échouant parfois à s'installer depuis le marketplace Clawds Hub",
        release7Description:
            'Améliorations majeures du chat et du playground avec interaction vocale, marketplace de compétences Clawds Hub et pièces jointes pour les agents.',
        release7Feature3:
            'Intégration de compétences Clawds Hub avec plus de 5 000 compétences disponibles à installer et gérer',
    },
    privacy: {
        description:
            'Découvrez comment Clawds collecte, utilise et protège vos données personnelles.',
        introText:
            'Clawds (« nous », « notre » ou « nos ») s\'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre Service.',
        authText:
            'Clawds utilise Google Firebase Authentication pour gérer les comptes utilisateurs. Vous pouvez vous connecter avec un email, Google ou GitHub. En utilisant ces méthodes de connexion, vous acceptez leurs conditions et politiques de confidentialité respectives.',
        eligibilityText:
            "Notre Service est accessible à tous. Il n'y a pas de restriction d'âge pour utiliser Clawds.",
    },
    terms: {
        description:
            "Lisez les conditions d'utilisation des services Clawds.",
        acceptanceText:
            "En accédant et en utilisant Clawds (« Service »), vous acceptez et vous engagez à respecter les termes et dispositions de cet accord. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre Service.",
        serviceText:
            "Clawds fournit un déploiement OpenClaw en un clic sur des serveurs dédiés. Nous permettons aux utilisateurs de déployer, gérer et accéder à des instances OpenClaw préconfigurées avec un accès root complet et des ressources dédiées.",
        authText:
            "Clawds utilise Google Firebase Authentication pour gérer la connexion. Vous pouvez vous authentifier avec un email, Google ou GitHub. En utilisant ces méthodes, vous acceptez les conditions et politiques de confidentialité respectives de Google et GitHub.",
        liabilityText:
            'Dans la mesure maximale autorisée par la loi, Clawds ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, ni de toute perte de bénéfices ou de revenus.',
    },
    blog: {
        ctaTitle: 'Déployez votre agent IA en un clic',
        ctaDescription:
            'Lancez votre propre agent IA dédié en moins de 60 secondes. Accès root complet, tous les modèles IA, tarification transparente.',
    },
    mobile: {
        emailPlaceholder: 'exemple@clawds.io',
    },
    comparison: {
        metaDescription:
            "Découvrez comment Clawds se compare aux autres plateformes d'hébergement OpenClaw.",
        competitorClawHost: 'Clawds',
        emailPlaceholder: 'example@clawds.io',
    },
}

export default clawdsFr
