import type { FC, ReactNode } from 'react'

import { Link } from 'react-router-dom'
import { t } from '@openclaw/i18n'
import { isClawds } from '@openclaw/shared'
import { ROUTES } from '@/lib'
import { SUPPORT_EMAIL } from '@/lib/links'

const Footer: FC = (): ReactNode => {
    return (
        <footer className='border-border relative mt-auto border-t'>
            <div className='mx-auto max-w-6xl px-6 py-6'>
                <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-muted-foreground text-sm'>
                            &copy; {new Date().getFullYear()}{' '}
                            {t('footer.copyright')}
                        </p>
                        {isClawds() && (
                            <p className='text-muted-foreground text-sm'>
                                <a
                                    href='https://aitextura.com'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='hover:text-foreground transition'
                                >
                                    {t('footer.poweredBy')}
                                </a>
                            </p>
                        )}
                    </div>
                    <nav aria-label={t('nav.footerNavigation')}>
                        <div className='flex items-center gap-6'>
                            <Link
                                to={ROUTES.TERMS}
                                className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                            >
                                {t('footer.termsOfService')}
                            </Link>
                            <Link
                                to={ROUTES.PRIVACY}
                                className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                            >
                                {t('footer.privacyPolicy')}
                            </Link>
                            <Link
                                to={ROUTES.CHANGELOG}
                                className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                            >
                                {t('footer.changelog')}
                            </Link>
                            <a
                                href={SUPPORT_EMAIL}
                                className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                            >
                                {t('footer.getInTouch')}
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer