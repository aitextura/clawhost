import { writeFileSync } from 'fs'
import { resolve } from 'path'

const assetsDir = resolve(import.meta.dirname ?? __dirname, '../apps/web/public/assets')

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 60" width="280" height="60">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4ecdc4"/>
      <stop offset="100%" style="stop-color:#2c3e50"/>
    </linearGradient>
  </defs>
  <text x="40" y="45" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="800" fill="url(#g)" letter-spacing="-1">Clawds</text>
  <path d="M8 18 Q12 8, 18 16 Q14 12, 10 20Z" fill="#4ecdc4" opacity="0.9"/>
  <path d="M16 14 Q20 4, 26 12 Q22 8, 18 16Z" fill="#3dbdb5" opacity="0.9"/>
  <path d="M24 18 Q28 8, 34 16 Q30 12, 26 20Z" fill="#2c3e50" opacity="0.9"/>
</svg>`

const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 60" width="280" height="60">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4ecdc4"/>
      <stop offset="100%" style="stop-color:#a8d8d4"/>
    </linearGradient>
  </defs>
  <text x="40" y="45" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="800" fill="url(#g)" letter-spacing="-1">Clawds</text>
  <path d="M8 18 Q12 8, 18 16 Q14 12, 10 20Z" fill="#4ecdc4" opacity="0.9"/>
  <path d="M16 14 Q20 4, 26 12 Q22 8, 18 16Z" fill="#6ee0d8" opacity="0.9"/>
  <path d="M24 18 Q28 8, 34 16 Q30 12, 26 20Z" fill="#a8d8d4" opacity="0.9"/>
</svg>`

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="6" fill="#2c3e50"/>
  <text x="16" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#4ecdc4" text-anchor="middle">C</text>
</svg>`

writeFileSync(resolve(assetsDir, 'clawds-logo.svg'), logoSvg)
writeFileSync(resolve(assetsDir, 'clawds-logo-dark.svg'), logoDarkSvg)
writeFileSync(resolve(assetsDir, 'clawds-logo-light.svg'), logoSvg)
writeFileSync(resolve(assetsDir, 'favicon.svg'), faviconSvg)

console.log('SVG logos created in apps/web/public/assets/')
console.log('')
console.log('Files:')
console.log('  clawds-logo.svg (light background)')
console.log('  clawds-logo-dark.svg (dark background)')
console.log('  clawds-logo-light.svg (same as light)')
console.log('  favicon.svg')
console.log('')
console.log('NOTE: For email PNG logos, convert these SVGs to PNG:')
console.log('  brew install librsvg')
console.log('  rsvg-convert -w 280 clawds-logo.svg > clawds-logo.png')
console.log('  rsvg-convert -w 280 clawds-logo-dark.svg > clawds-logo-dark.png')
console.log('')
console.log('Or use https://svgtopng.com to convert online')