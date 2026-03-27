/**
 * /channels/ — IPTV UK Channels List page
 *
 * CLAUDE.md §2: Keyword = "iptv uk channels list"
 * JSON-LD: FAQPage (5 Q&As) + BreadcrumbList
 */

import type { Metadata } from 'next'
import Script from 'next/script'

import { buildMetadata }                        from '@/lib/seo'
import { generateFAQSchema, generateBreadcrumbSchema, schemaToString } from '@/lib/schema'
import { ChannelsPage }                         from '@/components/organisms/ChannelsPage'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export function generateMetadata(): Metadata {
  return buildMetadata({
    title:       'IPTV UK Channels | 35,000+ Live Channel List',
    description: 'Full IPTV UK channels list — Sky Sports, BT Sport, BBC, ITV, Premier League & 35,000+ worldwide. Browse by category. HD & 4K streams.',
    canonical:   '/channels/',
    keywords:    [
      'iptv uk channels',
      'iptv uk channels list',
      'iptv channel list uk',
      'sky sports iptv uk',
      'uk iptv channel list 2026',
    ],
  })
}

// ─── Structured data ──────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: 'How many channels are included in the IPTV UK subscription?',
    answer:
      'Our IPTV UK subscription includes over 35,000 live channels in total. This covers 5,000+ UK and US focused channels — including every BBC, ITV, Channel 4, Channel 5 and Sky channel — plus thousands of international channels spanning Europe, the Middle East, Asia, and beyond. The full VOD library adds 100,000+ on-demand titles.',
  },
  {
    question: 'Are Sky Sports and BT Sport included?',
    answer:
      'Yes. Sky Sports channels — including Sky Sports Main Event, Sky Sports Premier League, Sky Sports Football, and Sky Sports Cricket — are all included. BT Sport 1, BT Sport 2, and BT Sport 3 are also available, as well as TNT Sports, Eurosport 1, Eurosport 2, ESPN, and beIN Sports. Every major UK sports package is covered.',
  },
  {
    question: 'Do you include UK Freeview channels?',
    answer:
      'Every UK Freeview channel is included: BBC One, BBC Two, BBC Three, BBC Four, ITV, ITV2, ITV3, ITV4, Channel 4, Channel 4+1, Channel 5, E4, Film4, More4, Dave, 5Star, 5USA, and many more. You also get the corresponding HD versions where available, plus full EPG programme guide data.',
  },
  {
    question: 'Are international channels available?',
    answer:
      'Yes — over 30,000 international channels are included covering Arabic, French, Spanish, Italian, German, Turkish, Indian, Pakistani, and many more languages and regions. Popular international channels include MBC, Al Arabiya, RAI 1, RAI 2, TVE, TF1, RTL, and hundreds of South Asian channels including Star Plus, Zee TV, Sony LIV, and Colors.',
  },
  {
    question: 'Can I watch adult (18+) channels on IPTV UK?',
    answer:
      'Adult 18+ channels are available on all subscription plans. These channels are grouped separately in the Adult category and require your IPTV player to navigate to them directly. The Family Plan includes a family-friendly content filter option that can restrict access to adult content for household setups with children.',
  },
] as const

const faqJsonLd        = schemaToString(generateFAQSchema([...FAQ_ITEMS]))
const breadcrumbJsonLd = schemaToString(generateBreadcrumbSchema([
  { name: 'Home',     url: '/'          },
  { name: 'Channels', url: '/channels/' },
]))

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChannelsPageRoute() {
  return (
    <>
      <Script id="schema-faq-channels"  type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd        }} />
      <Script id="schema-breadcrumb"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <ChannelsPage />
    </>
  )
}
