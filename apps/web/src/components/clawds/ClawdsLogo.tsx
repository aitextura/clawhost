import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { useBrand } from '@/components/clawds/BrandProvider'
import { ROUTES } from '@/lib'

const ClawdsLogo: FC<{ className?: string }> = ({ className }) => {
    const b = useBrand()
    return (
        <Link
            to={ROUTES.HOME}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`font-clash text-xl font-bold ${className || ''}`}
        >
            {b.name}
        </Link>
    )
}

export default ClawdsLogo