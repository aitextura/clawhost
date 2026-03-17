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
    emails: {
        otpSubject: 'Tu código de inicio de sesión de Clawds',
        otpPreview: 'Tu código de inicio de sesión de Clawds: {{code}}',
        changelogSubject: 'Novedades en Clawds',
        changelogPreview:
            'Descubre las últimas actualizaciones de Clawds: {{title}}',
        changelogVisitButton: 'Visitar Clawds',
        changelogUnsubscribe:
            'Recibes este correo porque tienes una cuenta en Clawds.',
        changelogFooter:
            'Recibes este correo porque tienes una cuenta en Clawds.',
        featureFooter:
            'Recibes este correo porque tienes una cuenta en Clawds.',
        otpBody:
            'Inicia sesión en tu cuenta de Clawds para gestionar tus instancias de OpenClaw.',
        features: {
            terminal: {
                description:
                    'Accede a tu servidor directamente desde tu navegador con nuestro terminal integrado. No necesitas un cliente SSH — abre Clawds y empieza a escribir comandos.'
            },
            logs: {
                description:
                    'Monitoriza los logs de tu servidor en tiempo real desde el panel de Clawds. Diagnostica problemas, rastrea despliegues y depura tus aplicaciones sin salir del navegador.'
            },
            channels: {
                description:
                    'Conecta tus agentes de IA a Discord, Slack, WhatsApp y más. Configura canales y vincúlalos a tus agentes — todo desde el panel de Clawds.'
            },
            fileExplorer: {
                description:
                    'Explora, lee y edita los archivos de tu servidor directamente desde el panel de Clawds. Resaltado de sintaxis, búsqueda y guardado instantáneo — sin SSH.'
            },
            agentChat: {
                description:
                    'Chatea con tus agentes de IA directamente desde el panel de Clawds. Envía mensajes, adjunta imágenes y consulta el historial — todo en un solo lugar.'
            },
            envVars: {
                description:
                    'Añade, edita y elimina variables de entorno directamente desde el panel de Clawds. Claves API, secretos y configuración — sin terminal.'
            },
            sshKeys: {
                subject: '¿Lo sabías? Gestiona claves SSH desde Clawds',
                description:
                    'Genera pares de claves SSH, copia claves públicas y descarga claves privadas — todo desde el panel de Clawds. Asigna claves a tus claws para acceso seguro.'
            },
            multiLanguage: {
                subject: '¿Lo sabías? Clawds habla tu idioma',
                preview: 'Usa Clawds en inglés, francés, español o alemán',
                heading: 'Clawds en tu idioma',
                description:
                    'Cambia todo el panel de Clawds a inglés, francés, español o alemán. Desde botones hasta mensajes de error — todo traducido.'
            },
            darkMode: {
                subject: '¿Lo sabías? Clawds tiene modo oscuro',
                description:
                    'Alterna entre los temas claro y oscuro en el panel de Clawds. Tu preferencia se guarda y aplica automáticamente en cada visita.'
            },
            skills: {
                subject: '¿Lo sabías? Más de 5.000 skills en Clawds Hub',
                description:
                    'Explora más de 5.000 skills listos para usar en Clawds Hub e instálalos con un solo clic. Búsqueda web, ejecución de código, generación de imágenes y mucho más.',
                cta: 'Explorar Clawds Hub'
            }
        }
    },
    auth: {
        emailPlaceholder: 'example@clawds.io',
    },
    settings: {
        accountDescription:
            'Gestiona la configuración de tu cuenta Clawds y la información de tu perfil.',
    },
    api: {
        clawHubSearchSuccess: 'Búsqueda en Clawds Hub completada.',
        clawHubSearchFailed: 'No se pudo buscar en Clawds Hub!',
        clawHubFetched: 'Habilidades de Clawds Hub obtenidas.',
        clawHubFetchFailed:
            'No se pudieron obtener las habilidades de Clawds Hub!',
        clawHubInstalled: 'Habilidad instalada desde Clawds Hub.',
        clawHubInstallFailed: 'No se pudo instalar la habilidad desde Clawds Hub!',
        clawHubRemoved: 'Habilidad de Clawds Hub eliminada.',
        clawHubRemoveFailed: 'No se pudo eliminar la habilidad de Clawds Hub!',
        clawHubUpdateFailed: 'No se pudo actualizar la habilidad de Clawds Hub!',
    },
    claws: {
        dnsSetupBanner:
            'Configura el DNS local para acceder a tus claws vía subdominio.clawds.',
        loadingTip3:
            'Clawds es el primer proyecto en permitir hospedaje de OpenClaw con un solo clic.',
        chatReadOnlyGoReply:
            '¡Esto es una vista previa! Obtén Clawds Desktop y ejecuta OpenClaw localmente — tu máquina, tus datos, sin necesidad de cloud.',
        tutorialVideoThumbnail: 'Miniatura del video tutorial de Clawds',
        skillsClawHubTab: 'Clawds Hub',
        clawHubSearch: 'Buscar habilidades en Clawds Hub...',
        clawHubNoResults: 'No se encontraron habilidades en Clawds Hub.',
        clawHubEmpty: 'No hay habilidades de Clawds Hub instaladas.',
        clawHubEmptyDescription:
            'Busca e instala habilidades desde el mercado de Clawds Hub.',
        clawHubInstalled: 'Habilidad instalada desde Clawds Hub.',
        clawHubInstallFailed: 'Error al instalar la habilidad desde Clawds Hub!',
        clawHubRemoved: 'Habilidad de Clawds Hub eliminada.',
        clawHubRemoveFailed: 'Error al eliminar la habilidad de Clawds Hub!',
        clawHubUpdated: 'Habilidad actualizada desde Clawds Hub.',
        clawHubUpdateFailed: 'Error al actualizar la habilidad de Clawds Hub!',
        clawHubLoadFailed: 'Error al cargar Clawds Hub!',
        clawHubLoadFailedDescription:
            'No se pudo conectar al mercado de Clawds Hub. Por favor, intenta de nuevo.',
    },
    nav: {
        deployClawds: 'Desplegar Clawds',
    },
    tiers: {
        aiCredit: 'crédito IA/mes',
        aiCreditByok: 'Usa tus propias claves API — sin cargos de crédito IA',
        starter: {
            name: 'Starter',
            description: 'Perfecto para proyectos personales y experimentación.',
            useCase: 'Ideal para aficionados, estudiantes y asistentes IA personales.',
            aiCreditHint: '$3/mes crédito IA (~100K tokens GPT-4o)',
        },
        pro: {
            name: 'Pro',
            description: 'Para profesionales que necesitan más potencia y flexibilidad.',
            useCase: 'Ideal para freelancers, equipos pequeños y cargas de producción.',
            aiCreditHint: '$15/mes crédito IA (~500K tokens GPT-4o)',
        },
        business: {
            name: 'Business',
            description: 'Recursos máximos para casos de uso exigentes.',
            useCase: 'Diseñado para agencias, empresas y despliegues IA de alto tráfico.',
            aiCreditHint: '$50/mes crédito IA (~2M tokens GPT-4o)',
        },
    },
    license: {
        planName: 'Licencia Clawds Desktop',
        gateDescription: 'Necesitas una licencia Clawds Desktop para desplegar y gestionar instancias de OpenClaw localmente.'
    },
    footer: {
        copyright: 'Clawds. Todos los derechos reservados.',
        poweredBy: 'Desarrollado por AI TEXTURA',
        brandDescription:
            'Despliega agentes IA en la nube con un solo clic. Recursos dedicados, privacidad total, sin infraestructura compartida.',
        productDescription:
            'Despliega agentes IA en la nube con un solo clic — crea, conecta y escala tus agentes IA más rápido con Clawds.',
    },
    landing: {
        title: 'Despliega agentes IA. Un clic. Listo.',
        description:
            'Despliega agentes IA en la nube con un solo clic. Servidores dedicados, acceso root completo y precios transparentes.',
        heroDescription:
            'Despliega agentes IA en la nube con un solo clic — crea, conecta y escala tus agentes IA más rápido con Clawds.',
        tutorialVideoThumbnail: 'Miniatura del video tutorial de Clawds',
        whyClawHost: 'Funciones Todo-en-Uno',
        openclawControlDescription:
            'Accede al panel nativo de OpenClaw directamente desde Clawds. Acceso completo de edición a todo lo que OpenClaw ofrece.',
        whyClawds: '¿Por qué Clawds?',
        clawHostControl: 'Control de Clawds',
        clawdsControl: 'Control de Clawds',
        clawdsControlDescription:
            'Gestiona archivos, actualizaciones, canales, variables, habilidades y más directamente desde la plataforma.',
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
        faq3Answer:
            'A diferencia de las herramientas de IA hospedadas, Clawds te da un servidor real con OpenClaw instalado. Tú eres dueño de la infraestructura, controlas todo y no estás limitado por una plataforma compartida o un modelo.',
        step1Description:
            'Elige tu plan y ponemos en marcha un servidor dedicado para ti en segundos.',
        pricingDescription:
            'Elige un plan que se adapte a tus necesidades. Precios simples y predecibles.',
        faq6Answer:
            'Los precios dependen del plan que elijas. Ofrecemos niveles Starter, Pro y Business con especificaciones claras — tú eliges lo que se adapta a tus necesidades y presupuesto.',
    },
    compare: {
        description:
            'Descubre cómo Clawds se compara con otras plataformas de alojamiento OpenClaw.',
        competitorClawHost: 'Clawds',
        fiveThousandSkills: '5.000+ habilidades (Clawds Hub)',
    },
    changelog: {
        title: 'Sigue las actualizaciones, nuevas funciones y mejoras de Clawds.',
        subtitle: 'Todas las actualizaciones, nuevas funciones y mejoras de Clawds.',
        upcomingReleaseFeature9:
            'Modo de voz para interactuar con los agentes de OpenClaw alojados en Clawds (Beta)',
        upcomingReleaseFeature11:
            'Página de presentación de Clawds Desktop, alojamiento local con Clawds',
        release12Description:
            'Suscripciones anuales con 2 meses gratis, modo de voz, reinstalación de instancia y una página de presentación inicial para Clawds Desktop.',
        release12Feature1: 'Página de presentación de Clawds Desktop, alojamiento local con Clawds',
        release12Feature3:
            'Modo de voz para interactuar con los agentes de OpenClaw alojados en Clawds',
        release1Description:
            'El primer lanzamiento oficial de Clawds. Despliega OpenClaw en tu propio VPS con un solo clic.',
        release2Description:
            'Infraestructura multi-proveedor y una nueva forma de mantenerte al día con todo en Clawds.',
        release10Feature2:
            'Corrección de habilidades que a veces no se instalaban desde el marketplace de Clawds Hub',
        release7Description:
            'Grandes mejoras en el chat y playground con interacción por voz, mercado de habilidades Clawds Hub y archivos adjuntos para agentes.',
        release7Feature3:
            'Integración de habilidades de Clawds Hub con más de 5,000 habilidades disponibles para instalar y administrar',
    },
    privacy: {
        description:
            'Descubre cómo Clawds recopila, utiliza y protege tus datos personales.',
        introText:
            'Clawds ("nosotros", "nuestro" o "nos") está comprometido con la protección de tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información cuando utilizas nuestro Servicio.',
        authText:
            'Clawds utiliza Google Firebase Authentication para gestionar cuentas de usuario. Puedes iniciar sesión con email, Google o GitHub. Al usar estos métodos de inicio de sesión, aceptas sus respectivos términos y políticas de privacidad.',
        eligibilityText:
            'Nuestro Servicio está disponible para todos. No hay restricciones de edad para usar Clawds.',
    },
    terms: {
        description:
            'Lee los términos y condiciones de uso de los servicios de Clawds.',
        acceptanceText:
            'Al acceder y usar Clawds ("Servicio"), aceptas y te comprometes a cumplir los términos y disposiciones de este acuerdo. Si no estás de acuerdo con estos términos, por favor no uses nuestro Servicio.',
        serviceText:
            'Clawds ofrece despliegue de OpenClaw con un solo clic en servidores dedicados. Permitimos a los usuarios desplegar, gestionar y acceder a instancias preconfiguradas de OpenClaw con acceso root completo y recursos dedicados.',
        authText:
            'Clawds utiliza Google Firebase Authentication para gestionar el inicio de sesión. Puedes autenticarte con email, Google o GitHub. Al usar estos métodos, aceptas los respectivos términos y políticas de privacidad de Google y GitHub.',
        liabilityText:
            'En la máxima medida permitida por la ley, Clawds no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni de la pérdida de beneficios o ingresos.',
    },
    blog: {
        ctaTitle: 'Despliega tu agente IA con un solo clic',
        ctaDescription:
            'Pon en marcha tu propio agente IA dedicado en menos de 60 segundos. Acceso root completo, todos los modelos de IA, precios transparentes.',
    },
    mobile: {
        emailPlaceholder: 'ejemplo@clawds.io',
    },
    comparison: {
        metaDescription:
            'Compara Clawds con otras plataformas de alojamiento de OpenClaw.',
        competitorClawHost: 'Clawds',
        emailPlaceholder: 'example@clawds.io',
    },
}

export default clawdsEs
