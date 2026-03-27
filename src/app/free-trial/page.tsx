/**
 * /free-trial/ — Free Trial page
 *
 * CLAUDE.md §2: Keyword = "free iptv trial uk"
 * JSON-LD: FAQPage (5 Q&As) + BreadcrumbList
 */

import type { Metadata } from 'next'
import Script from 'next/script'

import { buildMetadata }                        from '@/lib/seo'
import { generateFAQSchema, schemaToString }    from '@/lib/schema'
import { FreeTrial }                            from '@/components/organisms/FreeTrial'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export function generateMetadata(): Metadata {
  return buildMetadata({
    title:       'Free IPTV Trial UK | 24-Hour Premium Trial',
    description: 'Claim your free 24-hour IPTV UK trial — 35,000+ channels, Sky Sports, Premier League & 4K quality. Limited slots daily. Request via WhatsApp in seconds.',
    canonical:   '/free-trial/',
    keywords:    ['free iptv trial uk', 'iptv free trial uk', 'iptv uk trial', 'try iptv uk free'],
  })
}

// ─── FAQPage JSON-LD ──────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: 'How long does the free trial last?',
    answer:
      'Our free IPTV UK trial lasts 24 hours from the moment your credentials are activated. This gives you a full day to test all 35,000+ channels, the 100,000+ VOD library, and 4K Ultra HD quality across your chosen device.',
  },
  {
    question: 'How will I receive my trial credentials?',
    answer:
      'Once you send your request via WhatsApp, our UK support team will manually verify your request and send your login credentials — typically within 15 minutes. You will receive a server URL, username, and password directly in WhatsApp.',
  },
  {
    question: 'Which devices are supported for the free trial?',
    answer:
      'The free trial works on all major devices: Amazon Firestick and Fire TV, Android TV boxes, Samsung and LG Smart TVs, Android and iOS smartphones, Apple TV, MAG boxes, and Windows or Mac computers. Our setup guide covers every device.',
  },
  {
    question: 'Is there a limit on trial requests?',
    answer:
      'Yes — we limit free IPTV UK trials to 20 per day. This ensures every trial user receives a quality experience with dedicated bandwidth. Trial slots reset daily at midnight UK time. We recommend requesting early in the day to secure your slot.',
  },
  {
    question: 'What happens after the trial ends?',
    answer:
      'After your 24-hour trial, access to the service will stop. If you enjoyed the service — and most users do — you can upgrade to a paid plan starting from £9.99 per month or £79.99 per year for our Premium Annual plan. Message us on WhatsApp or visit our plans page to continue watching.',
  },
] as const

const faqJsonLd = schemaToString(generateFAQSchema([...FAQ_ITEMS]))

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FreeTrialPage() {
  return (
    <>
      <Script
        id="free-trial-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
      <FreeTrial />
    </>
  )
}
