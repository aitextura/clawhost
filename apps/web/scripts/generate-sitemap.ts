import type { BlogPostFrontmatter, SitemapRoute } from '@/ts/Interfaces'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import PATHS from '@/lib/paths'
import { brand } from '@openclaw/shared'

const DIST = path.resolve(import.meta.dirname, '../dist')
const CONTENT = path.resolve(import.meta.dirname, '../content/posts')
const SITE_URL = `https://${brand.domain}`

const staticRoutes: SitemapRoute[] = [
    { path: PATHS.HOME, priority: '1.0', changefreq: 'weekly' },
    { path: `/${PATHS.TERMS}`, priority: '0.3', changefreq: 'yearly' },
    { path: `/${PATHS.PRIVACY}`, priority: '0.3', changefreq: 'yearly' },
    ...(brand.features.showBlog
        ? [{ path: `/${PATHS.BLOG}`, priority: '0.8', changefreq: 'weekly' } as SitemapRoute]
        : []),
    { path: `/${PATHS.CHANGELOG}`, priority: '0.6', changefreq: 'weekly' },
    ...(brand.features.showComparison
        ? [{ path: `/${PATHS.COMPARE}`, priority: '0.7', changefreq: 'monthly' } as SitemapRoute]
        : [])
]

const mdxFiles = fs.readdirSync(CONTENT).filter((f) => f.endsWith('.mdx'))

const postSlugs = mdxFiles.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT, file), 'utf-8')
    const { data } = matter(raw)
    return (data as BlogPostFrontmatter).slug
})

const today = new Date().toISOString().split('T')[0]

const blogUrls = brand.features.showBlog
    ? postSlugs.map((slug) => {
        const raw = fs.readFileSync(
            path.join(
                CONTENT,
                mdxFiles.find((f) => {
                    const { data } = matter(
                        fs.readFileSync(path.join(CONTENT, f), 'utf-8')
                    )
                    return (data as BlogPostFrontmatter).slug === slug
                })!
            ),
            'utf-8'
        )
        const { data } = matter(raw)
        return {
            loc: `${SITE_URL}/${PATHS.BLOG}/${slug}`,
            lastmod:
                (data as BlogPostFrontmatter).updatedAt
                    ?? (data as BlogPostFrontmatter).publishedAt,
            priority: '0.6',
            changefreq: 'monthly'
        }
    })
    : []

const urls = [
    ...staticRoutes.map((route) => ({
        loc: `${SITE_URL}${route.path}`,
        lastmod: today,
        priority: route.priority,
        changefreq: route.changefreq
    })),
    ...blogUrls
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
        (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap)
console.log(`Generated sitemap.xml with ${urls.length} URLs.`)

const robotsTxt = `User-agent: *
Allow: /
Disallow: /claws
Disallow: /ssh-keys
Disallow: /account
Disallow: /billing
Disallow: /login
Sitemap: ${SITE_URL}/sitemap.xml`

fs.writeFileSync(path.join(DIST, 'robots.txt'), robotsTxt)
console.log(`Generated robots.txt for ${brand.domain}.`)