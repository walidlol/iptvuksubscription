/**
 * seo.ts — Next.js Metadata builders
 *
 * CLAUDE.md §2 rules:
 *   Title:       "{Primary KW} | {Benefit} — iptvuksubscription.uk" (max 60 chars)
 *   Description: Primary KW + UK hook + CTA (max 155 chars)
 *   OG images:   1200×630px branded
 *   Canonical:   every page
 */

import type { Metadata } from 'next'

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_URL    = 'https://iptvuksubscription.uk'
const SITE_NAME   = 'IPTV UK Subscription'
const TITLE_SEP   = ' — iptvuksubscription.uk'
const DEFAULT_OG  = `${SITE_URL}/images/og/default.jpg`

// ─── buildMetadata ────────────────────────────────────────────────────────────

export interface MetadataConfig {
  /** Page title without the site suffix (≤ ~40 chars to stay under 60 total) */
  title:       string
  /** 120–155 chars. Must contain: primary KW + UK hook + CTA */
  description: string
  /** Relative path e.g. "/plans/" — will be prefixed with SITE_URL */
  canonical:   string
  /** Override the default OG image */
  ogImage?:    string
  /** Set true for thank-you, admin, etc. */
  noindex?:    boolean
  /** Optional keywords array */
  keywords?:   string[]
}

/**
 * buildMetadata — returns a complete Next.js Metadata object.
 *
 * Usage (server component or page):
 *   export const metadata = buildMetadata({ title: '...', description: '...', canonical: '/' })
 *
 * Usage (dynamic route):
 *   export async function generateMetadata() {
 *     return buildMetadata({ ... })
 *   }
 */
export function buildMetadata(config: MetadataConfig): Metadata {
  const {
    title, description, canonical,
    ogImage = DEFAULT_OG,
    noindex = false,
    keywords,
  } = config

  const fullTitle     = `${title}${TITLE_SEP}`
  const canonicalUrl  = `${SITE_URL}${canonical}`

  return {
    // ── Core ──────────────────────────────────────────────────────────
    title:        fullTitle,
    description,
    ...(keywords?.length ? { keywords } : {}),

    // ── Robots ────────────────────────────────────────────────────────
    robots: noindex
      ? { index: false, follow: false }
      : {
          index:               true,
          follow:              true,
          'max-snippet':       -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        },

    // ── Canonical ─────────────────────────────────────────────────────
    alternates: {
      canonical: canonicalUrl,
    },

    // ── Open Graph ────────────────────────────────────────────────────
    openGraph: {
      title,
      description,
      url:      canonicalUrl,
      siteName: SITE_NAME,
      type:    'website',
      locale:  'en_GB',
      images: [
        {
          url:    ogImage,
          width:  1200,
          height: 630,
          alt:    title,
        },
      ],
    },

    // ── Twitter card ──────────────────────────────────────────────────
    twitter: {
      card:        'summary_large_image',
      title:        fullTitle,
      description,
      images:      [ogImage],
    },

    // ── Geo / language meta ───────────────────────────────────────────
    other: {
      'geo.region':       'GB',
      'geo.placename':    'United Kingdom',
      'content-language': 'en-GB',
    },
  }
}

// ─── Pre-built page metadata ──────────────────────────────────────────────────
// Import and re-export these in each page to avoid duplication.

export const homepageMetadata = buildMetadata({
  title:       'IPTV UK | Best Streaming, 35,000+ Channels',
  description: "The UK's best IPTV subscription — 35,000+ channels, Sky Sports, Premier League & 4K quality. Plans from £9.99/month. Start watching today.",
  canonical:   '/',
  keywords:    ['iptv uk', 'iptv uk subscription', 'best iptv uk', 'iptv channels uk'],
})

export const iptvUkSubscriptionMetadata = buildMetadata({
  title:       'IPTV UK Subscription | Plans & Pricing 2026',
  description: "Best IPTV UK subscription 2026 — 35,000 channels, Sky, BT Sport, Premier League, 4K. From £9.99/mo. No contract. Instant setup.",
  canonical:   '/iptv-uk-subscription/',
  keywords:    ['iptv uk subscription', 'best iptv uk subscription', 'cheap iptv uk', 'iptv uk subscription 2026'],
})

export const iptvSubscriptionUkMetadata = buildMetadata({
  title:       'IPTV Subscription UK | Watch 35,000+ Channels',
  description: "IPTV subscription UK — 35,000+ channels including Sky, BT Sport & all UK Freeview. 100,000+ VODs. 4K quality. Get started now.",
  canonical:   '/iptv-subscription-uk/',
  keywords:    ['iptv subscription uk', 'best iptv subscription uk', 'iptv subscription uk review'],
})

export const plansMetadata = buildMetadata({
  title:       'IPTV UK Plans | Standard, Premium & Family',
  description: "Choose your IPTV UK plan: Standard £9.99/mo, Premium Annual £79.99, Family Plan £129.99. 35,000+ channels. Cancel anytime.",
  canonical:   '/plans/',
  keywords:    ['iptv uk plans', 'iptv subscription price uk', 'cheap iptv uk'],
})

export const channelsMetadata = buildMetadata({
  title:       'IPTV UK Channels | 35,000+ Live Channels',
  description: "Full IPTV UK channel list — Sky Sports, BT Sport, BBC, ITV, Channel 4, Premier League & 35,000+ more. 4K & HD streams.",
  canonical:   '/channels/',
  keywords:    ['iptv uk channels', 'iptv channel list uk', 'sky sports iptv uk'],
})

export const setupGuideMetadata = buildMetadata({
  title:       'IPTV UK Setup Guide | Firestick, Android TV',
  description: "How to set up IPTV UK on Firestick, Android TV, Smart TV & more. Step-by-step guide for UK viewers. Start in minutes.",
  canonical:   '/setup-guide/',
  keywords:    ['iptv uk setup', 'iptv firestick uk', 'how to set up iptv uk'],
})

export const faqMetadata = buildMetadata({
  title:       'IPTV UK FAQ | Common Questions Answered',
  description: "Got questions about IPTV UK? Answers about setup, channels, device compatibility, billing and more. UK-focused IPTV FAQ.",
  canonical:   '/faq/',
  keywords:    ['iptv uk faq', 'is iptv legal uk', 'iptv questions uk'],
})

// ─── Root metadata (for layout.tsx) ──────────────────────────────────────────

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:  `${SITE_NAME} | Best IPTV UK${TITLE_SEP}`,
    template: `%s${TITLE_SEP}`,
  },
  description:
    "The UK's best IPTV subscription — 35,000+ channels, 100,000+ VODs, 4K quality and 99.9% uptime. Plans from £9.99/month.",

  applicationName: SITE_NAME,
  referrer:        'origin-when-cross-origin',
  authors:         [{ name: SITE_NAME, url: SITE_URL }],
  creator:          SITE_NAME,
  publisher:        SITE_NAME,

  formatDetection: {
    email:     false,
    address:   false,
    telephone: false,
  },

  openGraph: {
    type:     'website',
    locale:   'en_GB',
    siteName:  SITE_NAME,
    url:       SITE_URL,
    images: [
      { url: DEFAULT_OG, width: 1200, height: 630, alt: SITE_NAME },
    ],
  },

  twitter: {
    card:    'summary_large_image',
    site:    '@iptvuk',
    creator: '@iptvuk',
  },

  icons: {
    icon: [
      { url: '/images/brand/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  manifest: '/site.webmanifest',

  robots: {
    index:               true,
    follow:              true,
    'max-snippet':       -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: {
      index:  true,
      follow: true,
    },
  },
}

// ─── buildArticleMetadata ─────────────────────────────────────────────────────

export function buildArticleMetadata(article: {
  title:         string
  description:   string
  slug:          string
  publishedAt:   string
  modifiedAt:    string
  author?:       string
  imageUrl?:     string
  tags?:         string[]
}): Metadata {
  const canonicalUrl = `${SITE_URL}/blog/${article.slug}/`
  const ogImage      = article.imageUrl ?? DEFAULT_OG

  return {
    title:        `${article.title}${TITLE_SEP}`,
    description:   article.description,
    ...(article.tags?.length ? { keywords: article.tags } : {}),

    robots: {
      index:               true,
      follow:              true,
      'max-snippet':       -1,
      'max-image-preview': 'large',
    },

    alternates: { canonical: canonicalUrl },

    openGraph: {
      title:         article.title,
      description:   article.description,
      url:            canonicalUrl,
      siteName:       SITE_NAME,
      type:          'article',
      locale:        'en_GB',
      publishedTime:  article.publishedAt,
      modifiedTime:   article.modifiedAt,
      authors:        article.author ? [article.author] : undefined,
      tags:           article.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
    },

    twitter: {
      card:        'summary_large_image',
      title:        article.title,
      description:  article.description,
      images:      [ogImage],
    },
  }
}
