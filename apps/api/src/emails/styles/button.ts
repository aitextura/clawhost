import { brand } from '@openclaw/shared'

const button = {
    background: `linear-gradient(to right, ${brand.theme.primaryColor}, ${brand.theme.accentColor})`,
    backgroundColor: brand.theme.primaryColor,
    borderRadius: '9999px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    padding: '14px 32px',
    width: 'auto',
    marginBottom: '20px'
}

export default button