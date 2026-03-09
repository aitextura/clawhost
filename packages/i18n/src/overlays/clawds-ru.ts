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
    footer: {
        copyright: 'Clawds. Все права защищены.',
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
    landing: {
        whyClawHost: 'Всё в одном',
        clawHostControl: 'Управление Clawds',
        faq1Question: 'Что такое Clawds?',
        faq1Answer:
            'Clawds — платформа, которая делает OpenClaw доступным для всех. Она позволяет как нетехническим пользователям, так и разработчикам запускать OpenClaw без управления инфраструктурой. Мы берём на себя серверы, аптайм, безопасность и обслуживание — вы просто используете OpenClaw.',
        faq2Answer:
            'В отличие от облачных AI-инструментов, Clawds даёт вам настоящий сервер с установленным OpenClaw. Вы владеете инфраструктурой, контролируете всё и не ограничены общей платформой.',
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
    comparison: {
        metaDescription:
            'Сравните Clawds с другими платформами хостинга OpenClaw.',
        competitorClawHost: 'Clawds',
        emailPlaceholder: 'example@clawds.io',
    },
}

export default clawdsRu