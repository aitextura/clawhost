/**
 * Clawds Russian overlay — переопределяет брендовые ключи.
 * Структура повторяет базовые переводы, содержит только отличающиеся ключи.
 */
const clawdsRu = {
    common: {
        brandName: 'Clawds',
        legalEmail: 'legal@clawds.io',
    },
    setup: {
        welcomeTitle: 'Добро пожаловать в Clawds',
    },
    emails: {
        otpSubject: 'Ваш код входа в Clawds',
        otpPreview: 'Ваш код входа в Clawds: {{code}}',
        changelogSubject: 'Что нового в Clawds',
        changelogPreview: 'Посмотрите последние обновления Clawds: {{title}}',
        changelogVisitButton: 'Перейти в Clawds',
        changelogUnsubscribe:
            'Вы получили это письмо, потому что у вас есть аккаунт Clawds.',
        changelogFooter:
            'Вы получили это письмо, потому что у вас есть аккаунт Clawds.',
        featureFooter:
            'Вы получили это письмо, потому что у вас есть аккаунт Clawds.',
        otpBody:
            'Войдите в аккаунт Clawds для управления вашими инстансами OpenClaw.',
        features: {
            terminal: {
                description:
                    'Получите доступ к серверу прямо из браузера с помощью встроенного терминала. Не нужен SSH-клиент — просто откройте Clawds и начните вводить команды.'
            },
            logs: {
                description:
                    'Отслеживайте логи сервера в реальном времени из панели Clawds. Диагностируйте проблемы, отслеживайте деплои и отлаживайте приложения, не покидая браузер.'
            },
            channels: {
                description:
                    'Подключайте AI-агентов к Discord, Slack, WhatsApp и другим платформам. Настраивайте каналы и привязывайте их к агентам — всё из панели Clawds.'
            },
            fileExplorer: {
                description:
                    'Просматривайте, читайте и редактируйте файлы сервера прямо из панели Clawds. Подсветка синтаксиса, поиск и мгновенное сохранение — без SSH.'
            },
            agentChat: {
                description:
                    'Общайтесь с AI-агентами прямо из панели Clawds. Отправляйте сообщения, прикрепляйте изображения и просматривайте историю — всё в одном месте.'
            },
            envVars: {
                description:
                    'Добавляйте, редактируйте и удаляйте переменные окружения прямо из панели Clawds. API-ключи, секреты и конфигурация — без терминала.'
            },
            sshKeys: {
                subject: 'Знаете ли вы? Управляйте SSH-ключами из Clawds',
                description:
                    'Генерируйте пары SSH-ключей, копируйте публичные ключи и скачивайте приватные — всё из панели Clawds. Назначайте ключи claws для безопасного доступа.'
            },
            multiLanguage: {
                subject: 'Знаете ли вы? Clawds говорит на вашем языке',
                preview: 'Используйте Clawds на английском, французском, испанском или немецком',
                heading: 'Clawds на вашем языке',
                description:
                    'Переключите панель Clawds на английский, французский, испанский или немецкий. От кнопок до сообщений об ошибках — всё переведено.'
            },
            darkMode: {
                subject: 'Знаете ли вы? В Clawds есть тёмная тема',
                description:
                    'Переключайтесь между светлой и тёмной темами в панели Clawds. Ваш выбор сохраняется и применяется автоматически при каждом посещении.'
            },
            skills: {
                subject: 'Знаете ли вы? Более 5 000 навыков в Clawds Hub',
                description:
                    'Просматривайте более 5 000 готовых навыков в Clawds Hub и устанавливайте их в один клик. Веб-поиск, выполнение кода, генерация изображений и многое другое.',
                cta: 'Открыть Clawds Hub'
            }
        }
    },
    auth: {
        emailPlaceholder: 'example@clawds.io',
    },
    settings: {
        accountDescription:
            'Управляйте настройками аккаунта Clawds и профилем.',
    },
    api: {
        clawHubSearchSuccess: 'Поиск в Clawds Hub завершён.',
        clawHubSearchFailed: 'Не удалось выполнить поиск в Clawds Hub!',
        clawHubFetched: 'Навыки Clawds Hub получены.',
        clawHubFetchFailed: 'Не удалось получить навыки Clawds Hub!',
        clawHubInstalled: 'Навык установлен из Clawds Hub.',
        clawHubInstallFailed: 'Не удалось установить навык из Clawds Hub!',
        clawHubRemoved: 'Навык Clawds Hub удалён.',
        clawHubRemoveFailed: 'Не удалось удалить навык Clawds Hub!',
        clawHubUpdateFailed: 'Не удалось обновить навык Clawds Hub!',
    },
    claws: {
        dnsSetupBanner:
            'Настройте локальный DNS для доступа к claws через субдомен.clawds.',
        loadingTip3:
            'Clawds — первый в мире проект, позволяющий развернуть OpenClaw в один клик.',
        chatReadOnlyGoReply:
            'Это предпросмотр! Получите Clawds Desktop и запустите OpenClaw локально — ваш компьютер, ваши данные, без облака.',
        tutorialVideoThumbnail: 'Превью обучающего видео Clawds',
        skillsClawHubTab: 'Clawds Hub',
        clawHubSearch: 'Поиск навыков в Clawds Hub...',
        clawHubNoResults: 'Навыки в Clawds Hub не найдены.',
        clawHubEmpty: 'Нет установленных навыков Clawds Hub.',
        clawHubEmptyDescription:
            'Ищите и устанавливайте навыки из маркетплейса Clawds Hub.',
        clawHubInstalled: 'Навык установлен из Clawds Hub.',
        clawHubInstallFailed: 'Не удалось установить навык из Clawds Hub!',
        clawHubRemoved: 'Навык Clawds Hub удалён.',
        clawHubRemoveFailed: 'Не удалось удалить навык Clawds Hub!',
        clawHubUpdated: 'Навык обновлён из Clawds Hub.',
        clawHubUpdateFailed: 'Не удалось обновить навык Clawds Hub!',
        clawHubLoadFailed: 'Не удалось загрузить Clawds Hub.',
        clawHubLoadFailedDescription:
            'Не удалось подключиться к маркетплейсу Clawds Hub. Попробуйте ещё раз.',
    },
    nav: {
        deployClawds: 'Развернуть Clawds',
    },
    tiers: {
        aiCredit: 'AI-кредит/мес',
        aiCreditByok: 'Используйте свои API-ключи — без оплаты AI-кредитов',
        starter: {
            name: 'Starter',
            description: 'Для личных проектов и экспериментов.',
            useCase: 'Идеально для хобби, студентов и персональных AI-ассистентов.',
            aiCreditHint: '$3/мес AI-кредит (~100K токенов GPT-4o)',
        },
        pro: {
            name: 'Pro',
            description: 'Для профессионалов, которым нужно больше мощности.',
            useCase: 'Подходит фрилансерам, небольшим командам и продакшн-задачам.',
            aiCreditHint: '$15/мес AI-кредит (~500K токенов GPT-4o)',
        },
        business: {
            name: 'Business',
            description: 'Максимум ресурсов для требовательных задач.',
            useCase: 'Для агентств, предприятий и высоконагруженных AI-деплоев.',
            aiCreditHint: '$50/мес AI-кредит (~2M токенов GPT-4o)',
        },
    },
    license: {
        planName: 'Лицензия Clawds Desktop',
        gateDescription: 'Для локального развёртывания и управления инстансами OpenClaw необходима лицензия Clawds Desktop.'
    },
    footer: {
        copyright: 'Clawds. Все права защищены.',
        poweredBy: 'Работает на AI TEXTURA',
        brandDescription:
            'Разверните AI-агентов в облаке в один клик. Выделенные ресурсы, полная конфиденциальность, без общей инфраструктуры.',
        productDescription:
            'Разверните AI-агентов в облаке в один клик — создавайте, подключайте и масштабируйте своих AI-агентов быстрее с Clawds.',
    },
    landing: {
        title: 'Разверните AI-агентов. Один клик. Готово.',
        description:
            'Разверните AI-агентов в облаке в один клик. Выделенные серверы, полный root-доступ и прозрачные цены.',
        heroDescription:
            'Разверните AI-агентов в облаке в один клик — создавайте, подключайте и масштабируйте своих AI-агентов быстрее с Clawds.',
        tutorialVideoThumbnail: 'Превью обучающего видео Clawds',
        whyClawHost: 'Всё в одном',
        openclawControlDescription:
            'Получите доступ к нативной панели OpenClaw прямо из Clawds. Полный доступ к редактированию всего, что предлагает OpenClaw.',
        whyClawds: 'Почему Clawds?',
        clawHostControl: 'Управление Clawds',
        clawdsControl: 'Управление Clawds',
        clawdsControlDescription:
            'Управляйте файлами, обновлениями, каналами, переменными, навыками и другими настройками прямо из платформы.',
        deployClawdsNow: 'Развернуть Clawds сейчас',
        heroStatSeconds: 'Секунд до деплоя',
        heroStatFirstAgent: 'Ваш первый AI-агент',
        heroStatAllInclusive: 'Всё включено',
        heroStatModels: 'AI-моделей доступно',
        heroStatSkills: 'Встроенных навыков',
        templatesTitle: 'Варианты использования',
        templatesHeading: 'Готовые шаблоны',
        templatesDescription: 'Начните с готового шаблона и приступайте к работе за минуты.',
        templateDeploy: 'Развернуть',
        templateRecommendedTier: 'Рекомендуемый тариф',
        templateSupport: 'AI-поддержка клиентов',
        templateSupportDesc: 'AI-агент для обработки клиентских обращений 24/7 с контекстными ответами.',
        templateResearch: 'Исследовательский ассистент',
        templateResearchDesc: 'AI-ассистент для анализа документов, обобщения и генерации отчётов.',
        templateDevOps: 'DevOps-автоматизация',
        templateDevOpsDesc: 'Автоматизируйте CI/CD с AI-агентом для мониторинга, деплоя и диагностики.',
        faq1Question: 'Что такое Clawds?',
        faq1Answer:
            'Clawds — платформа, которая делает OpenClaw доступным для всех. Она позволяет как нетехническим пользователям, так и разработчикам запускать OpenClaw без управления инфраструктурой. Мы берём на себя серверы, аптайм, безопасность и обслуживание — вы просто используете OpenClaw.',
        faq2Answer:
            'В отличие от облачных AI-инструментов, Clawds даёт вам настоящий сервер с установленным OpenClaw. Вы владеете инфраструктурой, контролируете всё и не ограничены общей платформой.',
        faq3Answer:
            'В отличие от облачных AI-инструментов, Clawds даёт вам настоящий сервер с установленным OpenClaw. Вы владеете инфраструктурой, контролируете всё и не ограничены общей платформой или моделью.',
        step1Description:
            'Выберите тариф, и мы запустим выделенный сервер для вас за считанные секунды.',
        pricingDescription:
            'Выберите тариф под ваши потребности. Простые и понятные цены.',
        faq6Answer:
            'Цена зависит от выбранного тарифа. Мы предлагаем уровни Starter, Pro и Business с чёткими характеристиками — выбирайте то, что подходит под ваши задачи и бюджет.',
    },
    compare: {
        description:
            'Сравните Clawds с другими платформами хостинга OpenClaw.',
        competitorClawHost: 'Clawds',
        fiveThousandSkills: '5 000+ навыков (Clawds Hub)',
    },
    changelog: {
        title: 'Следите за обновлениями, новыми функциями и улучшениями Clawds.',
        subtitle: 'Все обновления, новые функции и улучшения Clawds.',
        upcomingReleaseFeature9:
            'Голосовой режим для взаимодействия с агентами OpenClaw, размещёнными на Clawds (Бета)',
        upcomingReleaseFeature11:
            'Страница Clawds Desktop, локальный хостинг с Clawds',
        release12Description:
            'Годовые подписки с 2 месяцами бесплатно, голосовой режим, переустановка инстанса и начальная страница для Clawds Desktop.',
        release12Feature1: 'Страница Clawds Desktop, локальный хостинг с Clawds',
        release12Feature3:
            'Голосовой режим для взаимодействия с агентами OpenClaw, размещёнными на Clawds',
        release1Description:
            'Первый официальный релиз Clawds. Разверните OpenClaw на собственном VPS в один клик.',
        release2Description:
            'Мульти-провайдерная инфраструктура и новый способ быть в курсе всего о Clawds.',
        release10Feature2:
            'Исправление навыков, которые иногда не устанавливались из маркетплейса Clawds Hub',
        release7Description:
            'Крупные улучшения чата и playground с голосовым взаимодействием, маркетплейс навыков Clawds Hub и вложения для агентов.',
        release7Feature3:
            'Интеграция навыков Clawds Hub с более чем 5 000 навыков для установки и управления',
    },
    privacy: {
        description:
            'Узнайте, как Clawds собирает, использует и защищает ваши данные.',
        introText:
            'Clawds («мы», «наш» или «нас») заботится о защите вашей конфиденциальности. Эта Политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию при использовании нашего Сервиса.',
        authText:
            'Clawds использует Google Firebase Authentication для управления аккаунтами. Вы можете войти через email, Google или GitHub. Используя эти методы, вы соглашаетесь с их условиями и политиками конфиденциальности.',
        eligibilityText:
            'Наш Сервис доступен для всех. Возрастных ограничений для использования Clawds нет.',
    },
    terms: {
        description:
            'Ознакомьтесь с условиями использования сервисов Clawds.',
        acceptanceText:
            'Используя Clawds («Сервис»), вы принимаете и соглашаетесь соблюдать условия данного соглашения. Если вы не согласны с этими условиями, пожалуйста, не используйте наш Сервис.',
        serviceText:
            'Clawds предоставляет развёртывание OpenClaw на выделенных серверах в один клик. Мы позволяем пользователям разворачивать, управлять и использовать предварительно настроенные инстансы OpenClaw с полным root-доступом.',
        authText:
            'Clawds использует Google Firebase Authentication для авторизации. Вы можете войти через email, Google или GitHub.',
        liabilityText:
            'В максимальной степени, допустимой законом, Clawds не несёт ответственности за косвенные, случайные, специальные, последующие или штрафные убытки.',
    },
    blog: {
        ctaTitle: 'Разверните AI-агента в один клик',
        ctaDescription:
            'Запустите выделенного AI-агента менее чем за 60 секунд. Полный root-доступ, все AI-модели, прозрачные цены.',
    },
    mobile: {
        emailPlaceholder: 'example@clawds.io',
    },
    comparison: {
        metaDescription:
            'Сравните Clawds с другими платформами хостинга OpenClaw.',
        competitorClawHost: 'Clawds',
        emailPlaceholder: 'example@clawds.io',
    },
}

export default clawdsRu