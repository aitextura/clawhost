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
        otpBody:
            'Войдите в аккаунт Clawds для управления вашими инстансами OpenClaw.',
    },
    auth: {
        emailPlaceholder: 'example@clawds.io',
    },
    settings: {
        accountDescription:
            'Управляйте настройками аккаунта Clawds и профилем.',
    },
    claws: {
        tutorialVideoThumbnail: 'Превью обучающего видео Clawds',
    },
    nav: {
        deployClawds: 'Развернуть Clawds',
    },
    tiers: {
        tokensPerDay: 'токенов/день',
        starter: {
            name: 'Starter',
            description: 'Для личных проектов и экспериментов.',
            useCase: 'Идеально для хобби, студентов и персональных AI-ассистентов.',
        },
        pro: {
            name: 'Pro',
            description: 'Для профессионалов, которым нужно больше мощности.',
            useCase: 'Подходит фрилансерам, небольшим командам и продакшн-задачам.',
        },
        business: {
            name: 'Business',
            description: 'Максимум ресурсов для требовательных задач.',
            useCase: 'Для агентств, предприятий и высоконагруженных AI-деплоев.',
        },
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
        whyClawHost: 'Всё в одном',
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
        step1Description:
            'Выберите тариф, и мы запустим выделенный сервер для вас за считанные секунды.',
        pricingDescription:
            'Выберите тариф под ваши потребности. Простые и понятные цены.',
        faq6Answer:
            'Цена зависит от выбранного тарифа. Мы предлагаем уровни Starter, Pro и Business с чёткими характеристиками — выбирайте то, что подходит под ваши задачи и бюджет.',
    },
    changelog: {
        title: 'Следите за обновлениями, новыми функциями и улучшениями Clawds.',
        subtitle: 'Все обновления, новые функции и улучшения Clawds.',
    },
    privacy: {
        metaDescription:
            'Узнайте, как Clawds собирает, использует и защищает ваши данные.',
        intro:
            'Clawds («мы», «наш» или «нас») заботится о защите вашей конфиденциальности. Эта Политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию при использовании нашего Сервиса.',
        collectAuth:
            'Clawds использует Google Firebase Authentication для управления аккаунтами. Вы можете войти через email, Google или GitHub. Используя эти методы, вы соглашаетесь с их условиями и политиками конфиденциальности.',
        eligibility:
            'Наш Сервис доступен для всех. Возрастных ограничений для использования Clawds нет.',
    },
    terms: {
        metaDescription:
            'Ознакомьтесь с условиями использования сервисов Clawds.',
        intro:
            'Используя Clawds («Сервис»), вы принимаете и соглашаетесь соблюдать условия данного соглашения. Если вы не согласны с этими условиями, пожалуйста, не используйте наш Сервис.',
        serviceDescription:
            'Clawds предоставляет развёртывание OpenClaw на выделенных серверах в один клик. Мы позволяем пользователям разворачивать, управлять и использовать предварительно настроенные инстансы OpenClaw с полным root-доступом.',
        authDescription:
            'Clawds использует Google Firebase Authentication для авторизации. Вы можете войти через email, Google или GitHub.',
        liability:
            'В максимальной степени, допустимой законом, Clawds не несёт ответственности за косвенные, случайные, специальные, последующие или штрафные убытки.',
    },
    blog: {
        ctaTitle: 'Разверните AI-агента в один клик',
        ctaDescription:
            'Запустите выделенного AI-агента менее чем за 60 секунд. Полный root-доступ, все AI-модели, прозрачные цены.',
    },
    comparison: {
        metaDescription:
            'Сравните Clawds с другими платформами хостинга OpenClaw.',
        competitorClawHost: 'Clawds',
        emailPlaceholder: 'example@clawds.io',
    },
}

export default clawdsRu