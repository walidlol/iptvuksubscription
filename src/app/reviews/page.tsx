/**
 * /reviews/ — Customer Reviews page
 *
 * CLAUDE.md §2: Keyword = "iptv uk subscription reviews"
 * JSON-LD: AggregateRating (via Product) + BreadcrumbList
 */

import type { Metadata } from 'next'
import Script from 'next/script'

import { buildMetadata }                                          from '@/lib/seo'
import { generateBreadcrumbSchema, schemaToString }               from '@/lib/schema'
import { ReviewsPage }                                            from '@/components/organisms/ReviewsPage'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export function generateMetadata(): Metadata {
  return buildMetadata({
    title:       'IPTV UK Reviews | 4.9/5 from 2,400+ Customers',
    description: 'Read real IPTV UK subscription reviews from UK customers. 4.9/5 average rating. Honest feedback on channels, quality, setup and support.',
    canonical:   '/reviews/',
    keywords:    [
      'iptv uk subscription reviews',
      'iptv uk review',
      'iptv uk subscription review',
      'best iptv uk reddit',
      'iptv uk customer reviews',
    ],
  })
}

// ─── Structured data ──────────────────────────────────────────────────────────

const aggregateRatingJsonLd = schemaToString({
  '@context': 'https://schema.org',
  '@type':    'Product',
  name:        'IPTV UK Subscription',
  description: "The UK's best IPTV subscription — 35,000+ channels, 100,000+ VODs, 4K quality. Plans from £9.99/month.",
  brand: {
    '@type': 'Brand',
    name:    'IPTV UK Subscription',
  },
  aggregateRating: {
    '@type':       'AggregateRating',
    ratingValue:   '4.9',
    reviewCount:   '2400',
    bestRating:    '5',
    worstRating:   '1',
  },
  offers: {
    '@type':       'AggregateOffer',
    priceCurrency: 'GBP',
    lowPrice:      '9.99',
    highPrice:     '129.99',
    offerCount:    '3',
  },
})

const breadcrumbJsonLd = schemaToString(generateBreadcrumbSchema([
  { name: 'Home',    url: '/'         },
  { name: 'Reviews', url: '/reviews/' },
]))

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReviewsPageRoute() {
  return (
    <>
      <Script id="schema-aggregate-rating" type="application/ld+json" dangerouslySetInnerHTML={{ __html: aggregateRatingJsonLd }} />
      <Script id="schema-breadcrumb"       type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd       }} />
      <ReviewsPage />
    </>
  )
}
