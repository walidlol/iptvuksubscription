/**
 * /plans/ — Pricing & Plans page
 *
 * CLAUDE.md §2: Keyword = "iptv uk subscription plans pricing"
 * JSON-LD: Product (×3) + FAQPage + BreadcrumbList
 */

import type { Metadata } from 'next'
import Script from 'next/script'

import { buildMetadata }                                      from '@/lib/seo'
import {
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  schemaToString,
}                                                             from '@/lib/schema'
import { PlansPage }                                          from '@/components/organisms/PlansPage'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export function generateMetadata(): Metadata {
  return buildMetadata({
    title:       'IPTV UK Plans | Pricing from £9.99/month',
    description: 'Choose your IPTV UK subscription plan. Standard £9.99/mo, Premium Annual £79.99, Family Plan £129.99. 35,000+ channels, 4K quality, instant activation.',
    canonical:   '/plans/',
    keywords:    [
      'iptv uk subscription plans',
      'iptv uk pricing',
      'iptv uk subscription price',
      'cheap iptv uk',
      'iptv uk plans 2026',
    ],
  })
}

// ─── Structured data ──────────────────────────────────────────────────────────

const standardJsonLd  = schemaToString(generateProductSchema('standard'))
const premiumJsonLd   = schemaToString(generateProductSchema('premium'))
const familyJsonLd    = schemaToString(generateProductSchema('family'))

const FAQ_ITEMS = [
  {
    question: 'How quickly will I receive my credentials?',
    answer:
      'After completing your payment, our team will create your IPTV UK account and send your login credentials via WhatsApp within 15 minutes. During UK peak hours (9am–11pm) delivery is typically under 5 minutes. You will receive a server URL, username, and password ready to enter into your preferred IPTV player.',
  },
  {
    question: 'Which payment methods do you accept?',
    answer:
      'We accept PayPal (which also covers all major debit and credit cards — no PayPal account required) and cryptocurrency via NOWPayments, including Bitcoin, Ethereum, USDT, Litecoin, and 50+ other coins. All payments are processed on secure, encrypted pages.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer:
      'Yes. If you start on our Standard monthly plan and want to upgrade to Premium Annual or Family Plan, simply message us on WhatsApp. We will calculate a pro-rated credit for any unused days and apply it to your upgrade. No hassle, no extra charges.',
  },
  {
    question: 'How many devices can I use simultaneously?',
    answer:
      'The Standard plan allows 1 simultaneous connection. The Premium Annual plan also allows 1 connection but unlocks 4K quality and catch-up TV. The Family Plan allows up to 5 simultaneous connections — perfect for households with multiple viewers on different devices.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'We offer a 24-hour free trial so you can test the service before purchasing. If you experience a technical issue we cannot resolve within 24 hours of your purchase, we will offer a full refund. As digital credentials are delivered instantly, refunds after successful delivery are assessed on a case-by-case basis. Please contact us on WhatsApp with any issues.',
  },
  {
    question: 'Is my payment secure?',
    answer:
      'Yes. PayPal payments use 256-bit SSL encryption and PayPal buyer protection. Crypto payments via NOWPayments are processed on their certified secure platform — we never see your wallet details. We do not store any payment card information.',
  },
] as const

const faqJsonLd        = schemaToString(generateFAQSchema([...FAQ_ITEMS]))
const breadcrumbJsonLd = schemaToString(generateBreadcrumbSchema([
  { name: 'Home',  url: '/'       },
  { name: 'Plans', url: '/plans/' },
]))

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlansPageRoute() {
  return (
    <>
      <Script id="schema-standard"   type="application/ld+json" dangerouslySetInnerHTML={{ __html: standardJsonLd  }} />
      <Script id="schema-premium"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: premiumJsonLd   }} />
      <Script id="schema-family"     type="application/ld+json" dangerouslySetInnerHTML={{ __html: familyJsonLd    }} />
      <Script id="schema-faq-plans"  type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd       }} />
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <PlansPage faqItems={[...FAQ_ITEMS]} />
    </>
  )
}
