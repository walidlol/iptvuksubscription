/**
 * schema.ts — JSON-LD structured data generators
 *
 * CLAUDE.md §2 requirements:
 *   • FAQPage on every content-heavy page (minimum 5 Q&As)
 *   • Product schema on /plans/ (3 separate schemas per tier)
 *   • BreadcrumbList on all inner pages
 *   • WebSite schema on homepage
 */

const SITE_URL  = 'https://iptvuksubscription.uk'
const SITE_NAME = 'IPTV UK Subscription'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string
  answer:   string
}

export interface BreadcrumbItem {
  name: string
  url:  string   // relative path (/plans/) or absolute URL
}

export type PlanTier = 'standard' | 'premium' | 'family'

// ─── Plan data ────────────────────────────────────────────────────────────────

const PLANS = {
  standard: {
    name:        'IPTV UK Standard',
    description: 'Monthly IPTV subscription with 35,000+ channels including 5,000+ UK/US channels, 100,000+ VODs, and Full HD streams. Cancel anytime.',
    price:       '9.99',
    url:         `${SITE_URL}/plans/#standard`,
    features: [
      '35,000+ worldwide channels',
      '5,000+ UK & US channels',
      '100,000+ VOD library',
      'Full HD & 4K streams',
      '99.9% uptime guarantee',
      'UK Electronic Programme Guide (EPG)',
      '1 simultaneous connection',
    ],
  },
  premium: {
    name:        'IPTV UK Premium Annual',
    description: 'Best-value annual IPTV subscription. Unlocks 4K Ultra HD, 7-day catch-up TV, and priority support. Save vs monthly.',
    price:       '79.99',
    url:         `${SITE_URL}/plans/#premium`,
    features: [
      '35,000+ worldwide channels',
      '5,000+ UK & US channels',
      '100,000+ VOD library',
      '4K Ultra HD streams',
      '7-day catch-up TV',
      'Full EPG programme guide',
      '99.9% uptime guarantee',
      '1 simultaneous connection',
      'Priority customer support',
    ],
  },
  family: {
    name:        'IPTV UK Family Plan',
    description: 'Annual family IPTV plan for the whole household. Up to 5 simultaneous connections, 4K quality, and family-friendly content filtering.',
    price:       '129.99',
    url:         `${SITE_URL}/plans/#family`,
    features: [
      '35,000+ worldwide channels',
      '5,000+ UK & US channels',
      '100,000+ VOD library',
      '4K Ultra HD streams',
      '7-day catch-up TV',
      'Full EPG programme guide',
      'Up to 5 simultaneous connections',
      'Family-friendly channel filter',
      '99.9% uptime guarantee',
      'Priority customer support',
    ],
  },
} as const

// ─── generateWebsiteSchema ────────────────────────────────────────────────────

export function generateWebsiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    name:        SITE_NAME,
    url:         SITE_URL,
    description: "The UK's best IPTV subscription — 35,000+ channels, 100,000+ VODs, 4K quality and 99.9% uptime. Plans from £9.99/month.",
    inLanguage:  'en-GB',
    potentialAction: {
      '@type':       'SearchAction',
      target: {
        '@type':       'EntryPoint',
        urlTemplate:   `${SITE_URL}/channels/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name:    SITE_NAME,
      url:     SITE_URL,
      logo: {
        '@type':  'ImageObject',
        url:       `${SITE_URL}/images/brand/logo.svg`,
        width:     '200',
        height:    '50',
      },
      areaServed: {
        '@type': 'Country',
        name:    'United Kingdom',
      },
      contactPoint: {
        '@type':            'ContactPoint',
        contactType:        'customer support',
        availableLanguage:  'English',
        areaServed:         'GB',
      },
    },
  }
}

// ─── generateProductSchema ────────────────────────────────────────────────────

export function generateProductSchema(tier: PlanTier): Record<string, unknown> {
  const plan = PLANS[tier]
  const yearAhead = new Date()
  yearAhead.setFullYear(yearAhead.getFullYear() + 1)

  return {
    '@context': 'https://schema.org',
    '@type':    'Product',
    name:        plan.name,
    description: plan.description,
    url:         plan.url,
    brand: {
      '@type': 'Brand',
      name:    SITE_NAME,
    },
    // Aggregate rating placeholder — replace with real data post-launch
    aggregateRating: {
      '@type':       'AggregateRating',
      ratingValue:   '4.8',
      reviewCount:   '127',
      bestRating:    '5',
      worstRating:   '1',
    },
    offers: {
      '@type':         'Offer',
      url:              plan.url,
      priceCurrency:   'GBP',
      price:            plan.price,
      priceValidUntil:  yearAhead.toISOString().split('T')[0],
      availability:    'https://schema.org/InStock',
      itemCondition:   'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name:    SITE_NAME,
        url:     SITE_URL,
      },
    },
    additionalProperty: plan.features.map((feature) => ({
      '@type': 'PropertyValue',
      name:    'Feature',
      value:   feature,
    })),
  }
}

// ─── generateFAQSchema ────────────────────────────────────────────────────────

export function generateFAQSchema(
  faqs: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    '@context':  'https://schema.org',
    '@type':     'FAQPage',
    mainEntity:   faqs.map((faq) => ({
      '@type':        'Question',
      name:            faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    faq.answer,
      },
    })),
  }
}

// ─── generateBreadcrumbSchema ─────────────────────────────────────────────────

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    '@context':      'https://schema.org',
    '@type':         'BreadcrumbList',
    itemListElement:  items.map((item, index) => ({
      '@type':   'ListItem',
      position:   index + 1,
      name:       item.name,
      item:       item.url.startsWith('http')
        ? item.url
        : `${SITE_URL}${item.url}`,
    })),
  }
}

// ─── generateArticleSchema ───────────────────────────────────────────────────

export function generateArticleSchema(article: {
  title:          string
  description:    string
  url:            string
  datePublished:  string
  dateModified:   string
  authorName:     string
  imageUrl?:      string
}): Record<string, unknown> {
  return {
    '@context':    'https://schema.org',
    '@type':       'Article',
    headline:       article.title,
    description:    article.description,
    url:            article.url.startsWith('http') ? article.url : `${SITE_URL}${article.url}`,
    datePublished:  article.datePublished,
    dateModified:   article.dateModified,
    inLanguage:    'en-GB',
    author: {
      '@type': 'Person',
      name:    article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name:    SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url:      `${SITE_URL}/images/brand/logo.svg`,
      },
    },
    ...(article.imageUrl
      ? {
          image: {
            '@type':  'ImageObject',
            url:       article.imageUrl,
            width:    '1200',
            height:   '630',
          },
        }
      : {}),
  }
}

// ─── Helper ───────────────────────────────────────────────────────────────────

/** Serialise a schema object for inline <script type="application/ld+json"> */
export function schemaToString(schema: Record<string, unknown>): string {
  return JSON.stringify(schema)
}
