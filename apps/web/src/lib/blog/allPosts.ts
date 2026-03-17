import type { BlogPostMeta, BlogPostModule } from '@/ts/Interfaces'

import { brand, isClawds } from '@openclaw/shared'
import moduleEntries from '@/lib/blog/data'

const UPSTREAM_ONLY_SLUGS: string[] = [
    'peter-steinberger-the-man-behind-the-lobster',
    'openclaw-founder-peter-steinberger-joins-openai',
    'the-founder-joins-openai-what-it-means-for-openclaw-s-future',
    'the-origin-story-how-a-vacation-side-project-became-the-fastest-growing-ai-agent',
    'from-clawdbot-to-moltbot-to-openclaw-a-naming-saga-driven-by-trademark-drama',
    'the-naming-history-of-openclaw',
    'the-lobster-mascot-how-a-crustacean-became-the-symbol-of-ai-s-future',
    'the-moltmatch-controversy-when-your-ai-agent-creates-a-dating-profile',
    'the-viral-growth-story-from-9-000-to-140-000-github-stars',
    'openclaw-s-impact-on-open-source-a-case-study-in-viral-growth',
    'the-openclaw-foundation-open-source-governance-for-the-future',
    'the-openclaw-community-discord-github-and-beyond'
]

const estimateReadingTime = (description: string): number => {
    const descWords = description.split(/\s+/).length
    const estimatedTotal = Math.round(descWords * 20)
    return Math.max(1, Math.round(estimatedTotal / 200))
}

const brandReplace = (text: string): string =>
    isClawds() ? text.replace(/ClawHost/g, brand.name) : text

const buildPostMeta = (mod: BlogPostModule): BlogPostMeta => ({
    ...mod.frontmatter,
    title: brandReplace(mod.frontmatter.title),
    description: brandReplace(mod.frontmatter.description),
    author: mod.frontmatter.author === 'ClawHost' ? brand.name : mod.frontmatter.author,
    readingTime: estimateReadingTime(mod.frontmatter.description)
})

const allPosts: BlogPostMeta[] = moduleEntries
    .map(([, mod]) => buildPostMeta(mod))
    .filter((post) => !isClawds() || !UPSTREAM_ONLY_SLUGS.includes(post.slug))
    .sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
    )

export default allPosts