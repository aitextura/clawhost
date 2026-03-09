/**
 * Clawds Spanish overlay — sobrescribe claves específicas de marca.
 * La estructura refleja las traducciones base es.ts, contiene solo claves diferentes.
 */
const clawdsEs = {
    common: {
        brandName: 'Clawds',
        legalEmail: 'legal@clawds.io',
    },
    setup: {
        welcomeTitle: 'Bienvenido a Clawds',
    },
    footer: {
        copyright: 'Clawds. Todos los derechos reservados.',
    },
    emails: {
        otpSubject: 'Tu código de inicio de sesión de Clawds',
        otpPreview: 'Tu código de inicio de sesión de Clawds: {{code}}',
        changelogSubject: 'Novedades en Clawds',
        changelogPreview:
            'Descubre las últimas actualizaciones de Clawds: {{title}}',
        changelogVisitButton: 'Visitar Clawds',
        changelogUnsubscribe:
            'Recibes este correo porque tienes una cuenta en Clawds.',
        otpBody:
            'Inicia sesión en tu cuenta de Clawds para gestionar tus instancias de OpenClaw.',
    },
    auth: {
        emailPlaceholder: 'example@clawds.io',
    },
    settings: {
        accountDescription:
            'Gestiona la configuración de tu cuenta Clawds y la información de tu perfil.',
    },
    claws: {
        tutorialVideoThumbnail: 'Miniatura del video tutorial de Clawds',
    },
    nav: {
        deployClawds: 'Desplegar Clawds',
    },
    tiers: {
        tokensPerDay: 'tokens/día',
    },
    landing: {
        whyClawHost: 'Funciones Todo-en-Uno',
        whyClawds: '¿Por qué Clawds?',
        clawHostControl: 'Control de Clawds',
        clawdsControl: 'Control de Clawds',
        deployClawdsNow: 'Desplegar Clawds ahora',
        heroStatSeconds: 'Segundos para desplegar',
        heroStatFirstAgent: 'Tu primer agente IA',
        heroStatAllInclusive: 'Todo incluido',
        heroStatModels: 'Modelos de IA disponibles',
        heroStatSkills: 'Habilidades integradas',
        templatesTitle: 'Casos de uso',
        templatesHeading: 'Plantillas listas para usar',
        templatesDescription: 'Empieza con una plantilla preconfigurada y sé productivo en minutos.',
        templateDeploy: 'Desplegar',
        templateRecommendedTier: 'Nivel recomendado',
        templateSupport: 'Soporte al cliente con IA',
        templateSupportDesc: 'Un agente IA que gestiona consultas de clientes 24/7 con respuestas contextuales.',
        templateResearch: 'Asistente de investigación',
        templateResearchDesc: 'Un asistente IA para análisis de documentos, resúmenes y generación de informes.',
        templateDevOps: 'Automatización DevOps',
        templateDevOpsDesc: 'Automatiza tu pipeline CI/CD con un agente IA para monitoreo, despliegue y diagnóstico.',
        faq1Question: '¿Qué es Clawds?',
        faq1Answer:
            'Clawds es una plataforma creada para hacer OpenClaw accesible para todos. Permite tanto a usuarios no técnicos como a desarrolladores ejecutar OpenClaw sin gestionar infraestructura. Nosotros nos encargamos de los servidores, el tiempo de actividad, la seguridad y el mantenimiento — tú solo usas OpenClaw.',
        faq2Answer:
            'A diferencia de las herramientas de IA alojadas, Clawds te da un servidor real con OpenClaw instalado. Eres dueño de la infraestructura, controlas todo y no estás limitado por una plataforma compartida.',
    },
    changelog: {
        title: 'Sigue las actualizaciones, nuevas funciones y mejoras de Clawds.',
        subtitle: 'Todas las actualizaciones, nuevas funciones y mejoras de Clawds.',
    },
    privacy: {
        metaDescription:
            'Descubre cómo Clawds recopila, utiliza y protege tus datos personales.',
        intro:
            'Clawds ("nosotros", "nuestro" o "nos") está comprometido con la protección de tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información cuando utilizas nuestro Servicio.',
        collectAuth:
            'Clawds utiliza Google Firebase Authentication para gestionar cuentas de usuario. Puedes iniciar sesión con email, Google o GitHub. Al usar estos métodos de inicio de sesión, aceptas sus respectivos términos y políticas de privacidad.',
        eligibility:
            'Nuestro Servicio está disponible para todos. No hay restricciones de edad para usar Clawds.',
    },
    terms: {
        metaDescription:
            'Lee los términos y condiciones de uso de los servicios de Clawds.',
        intro:
            'Al acceder y usar Clawds ("Servicio"), aceptas y te comprometes a cumplir los términos y disposiciones de este acuerdo. Si no estás de acuerdo con estos términos, por favor no uses nuestro Servicio.',
        serviceDescription:
            'Clawds ofrece despliegue de OpenClaw con un solo clic en servidores dedicados. Permitimos a los usuarios desplegar, gestionar y acceder a instancias preconfiguradas de OpenClaw con acceso root completo y recursos dedicados.',
        authDescription:
            'Clawds utiliza Google Firebase Authentication para gestionar el inicio de sesión. Puedes autenticarte con email, Google o GitHub. Al usar estos métodos, aceptas los respectivos términos y políticas de privacidad de Google y GitHub.',
        liability:
            'En la máxima medida permitida por la ley, Clawds no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni de la pérdida de beneficios o ingresos.',
    },
    comparison: {
        metaDescription:
            'Compara Clawds con otras plataformas de alojamiento de OpenClaw.',
        competitorClawHost: 'Clawds',
        emailPlaceholder: 'example@clawds.io',
    },
}

export default clawdsEs
