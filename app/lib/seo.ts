import type { MetaDescriptor, MetaFunction } from 'react-router'

/**
 * Site-wide SEO defaults.
 * After forking, change these values once and every page picks them up.
 */
export const siteConfig = {
  name: 'Starter MyGo React Router',
  shortName: 'MyGo Starter',
  description: 'Desktop app starter built with MyGo, React Router v8, and coss UI',
  url: 'https://example.com',
  ogImage: '/icon.png',
  twitterHandle: '@yourhandle',
  locale: 'en_US',
  themeColor: '#f5f9fb',
  backgroundColor: '#f5f9fb',
} as const

/**
 * Builds the page title in the form "Page — Site".
 */
export function generateTitle(pageTitle?: string): string {
  if (!pageTitle)
    return siteConfig.name
  return `${pageTitle} — ${siteConfig.name}`
}

export interface SEOMetaInput {
  /** Page title without the site-name suffix. */
  title?: string
  /** Page description. Defaults to the site description. */
  description?: string
  /** Canonical path for this page, such as `/about`. */
  canonical?: string
  /** Open Graph image. Defaults to the site image. */
  ogImage?: string
  /** Ask search engines not to index the page. */
  noIndex?: boolean
  /** JSON-LD structured data. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Builds a standard set of SEO meta descriptors.
 *
 * Designed for the `meta` export of a React Router v8 route.
 *
 * @example
 * ```ts
 * export const meta: Route.MetaFunction = () =>
 *   generateSEOMeta({ title: 'About', description: 'Learn more' })
 * ```
 */
export function generateSEOMeta(input: SEOMetaInput = {}): MetaDescriptor[] {
  const {
    title,
    description = siteConfig.description,
    canonical,
    ogImage = siteConfig.ogImage,
    noIndex = false,
    jsonLd,
  } = input

  const pageTitle = generateTitle(title)
  const pageUrl = canonical
    ? `${siteConfig.url}${canonical}`
    : siteConfig.url
  const imageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${siteConfig.url}${ogImage}`

  const meta: MetaDescriptor[] = [
    // Base tags
    { title: pageTitle },
    { name: 'description', content: description },

    // Open Graph
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: description },
    {
      property: 'og:type',
      content: canonical ? 'article' : 'website',
    },
    { property: 'og:url', content: pageUrl },
    { property: 'og:image', content: imageUrl },
    { property: 'og:site_name', content: siteConfig.name },
    { property: 'og:locale', content: siteConfig.locale },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:creator', content: siteConfig.twitterHandle },

    // Robots
    {
      name: 'robots',
      content: noIndex ? 'noindex, nofollow' : 'index, follow',
    },
  ]

  // Canonical URL
  if (canonical) {
    meta.push({ tagName: 'link', rel: 'canonical', href: pageUrl } satisfies MetaDescriptor)
  }

  // JSON-LD structured data
  if (jsonLd) {
    meta.push({ 'script:ld+json': jsonLd } satisfies MetaDescriptor)
  }

  return meta
}

/**
 * Meta merge helper for React Router v8.
 * A child route's meta overrides tags with the same key from its parent.
 *
 * @example
 * ```ts
 * // In a parent route
 * export const meta = mergeMeta<typeof loader>(({ data }) =>
 *   generateSEOMeta({ title: data?.title })
 * )
 * ```
 */
export function mergeMeta<Loader extends (...args: any[]) => unknown>(
  fn: MetaFunction<Loader>,
): MetaFunction<Loader> {
  return fn
}
