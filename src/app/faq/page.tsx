/**
 * /faq/ — Frequently Asked Questions page
 *
 * CLAUDE.md §2: Keyword = "iptv uk faq"
 * JSON-LD: FAQPage (20 Q&As) + BreadcrumbList
 */

import type { Metadata } from 'next'
import Script from 'next/script'

import { buildMetadata }                                          from '@/lib/seo'
import { generateFAQSchema, generateBreadcrumbSchema, schemaToString } from '@/lib/schema'
import { FAQPage }                                                from '@/components/organisms/FAQPage'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export function generateMetadata(): Metadata {
  return buildMetadata({
    title:       'IPTV UK FAQ | 20 Common Questions Answered',
    description: 'IPTV UK subscription FAQ — answers about setup, channels, pricing, device support, refunds & more. Everything you need before subscribing.',
    canonical:   '/faq/',
    keywords:    [
      'iptv uk faq',
      'iptv uk questions',
      'is iptv legal uk',
      'iptv uk setup help',
      'iptv uk subscription questions',
    ],
  })
}

// ─── Structured data ──────────────────────────────────────────────────────────

const ALL_FAQS = [
  // About Our Service
  {
    question: 'What is IPTV and how does it work?',
    answer:
      'IPTV (Internet Protocol Television) delivers television content over the internet rather than through a traditional satellite or cable signal. Instead of needing a Sky dish or a cable box, you stream channels directly to your device — whether that is a Firestick, Android TV box, Smart TV, smartphone, or computer. Our IPTV UK service gives you a server URL, username, and password. You enter these into an IPTV player app (such as IPTV Smarters Pro or TiviMate) and you instantly have access to 35,000+ live channels and 100,000+ VODs.',
  },
  {
    question: 'Is IPTV UK Subscription a legitimate service?',
    answer:
      'We operate as a licensed IPTV reseller, providing access to a premium content delivery network. Our service is used by thousands of UK viewers. We are transparent about our business model and provide genuine customer support via WhatsApp. All payments are processed securely through PayPal or NOWPayments. We have served 2,400+ UK customers and maintain a 4.9/5 average customer rating.',
  },
  {
    question: 'How reliable is the service — what uptime can I expect?',
    answer:
      'Our IPTV UK service maintains 99.9% uptime on our core channel infrastructure. Major UK live sports events are hosted on dedicated high-capacity servers to ensure zero buffering during peak demand. In the rare event of a technical issue, our UK-based support team responds via WhatsApp, typically within 15 minutes during UK hours (9am–11pm).',
  },
  {
    question: 'How quickly will I receive my credentials after payment?',
    answer:
      'After your payment is confirmed, our team receives an instant notification and manually creates your IPTV UK account. Your server URL, username, and password are then sent directly to your WhatsApp — typically within 15 minutes. During UK peak hours (9am–11pm) delivery is usually under 5 minutes.',
  },
  {
    question: 'Do you offer a free trial before I commit to a plan?',
    answer:
      'Yes. We offer a free 24-hour trial of the full IPTV UK service — all 35,000+ channels, the complete 100,000+ VOD library, and 4K quality where supported. Trial slots are limited to 20 per day. Visit our free trial page and message us on WhatsApp to claim your slot.',
  },
  // Pricing & Payment
  {
    question: 'What plans are available and how much do they cost?',
    answer:
      'We offer three plans: Standard at £9.99 per month (rolling monthly, 1 connection, HD), Premium Annual at £79.99 per year (£6.67/mo, 4K, catch-up TV, priority support), and Family Plan at £129.99 per year (£10.83/mo, 5 simultaneous connections). All plans include 35,000+ channels and 100,000+ VODs.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept PayPal (which covers all major UK debit and credit cards — no PayPal account required) and cryptocurrency via NOWPayments, including Bitcoin, Ethereum, USDT, Litecoin, and 50+ other coins. All payment pages use 256-bit SSL encryption.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      'Yes. Message us on WhatsApp to upgrade. We calculate a pro-rated credit for unused days and apply it toward your upgrade — no penalties, no extra charges. Downgrades take effect at the end of your current billing period.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'We offer a free 24-hour trial specifically so you can test risk-free. If we cannot resolve a technical issue within 24 hours of your subscription starting, we issue a full refund. Refunds after successful credential delivery are assessed case-by-case. Contact us on WhatsApp with any concerns.',
  },
  {
    question: 'Is my payment secure?',
    answer:
      'Yes. PayPal payments are protected by buyer protection and 256-bit encryption. Crypto payments are handled entirely on NOWPayments\' certified secure platform. We never store payment card details and our website uses HTTPS throughout.',
  },
  // Technical Setup
  {
    question: 'Which devices are supported?',
    answer:
      'Supported devices include Amazon Firestick and Fire TV, Android TV boxes, Samsung Smart TVs (Tizen), LG Smart TVs (webOS), Android and iOS smartphones, Apple TV, MAG boxes, Windows and macOS computers, and Enigma2 receivers. Any device that supports M3U playlists or an IPTV app will work.',
  },
  {
    question: 'How do I set up IPTV on my Amazon Firestick?',
    answer:
      'Enable "Apps from Unknown Sources" in Settings → My Fire TV → Developer Options. Download the Downloader app and use it to install IPTV Smarters Pro. Open IPTV Smarters Pro, select "Add User via Login", and enter the server URL, username, and password we sent you. All channels and VODs will load automatically. Full step-by-step instructions are on our setup guide page.',
  },
  {
    question: 'What internet connection speed do I need?',
    answer:
      'For HD (1080p) streams, a minimum of 10 Mbps download speed is recommended. For 4K Ultra HD streams, a stable connection of 25 Mbps or faster is ideal. Most standard UK broadband packages are more than adequate. For best results, connect via Ethernet rather than Wi-Fi, especially for live sports.',
  },
  {
    question: 'What IPTV player app should I use?',
    answer:
      'We recommend IPTV Smarters Pro as the primary player — available on Android, iOS, Firestick, and most Smart TVs. For Android TV, TiviMate is an excellent alternative. For computers, VLC Media Player works well with the M3U URL. For MAG boxes, the built-in portal browser is used. We send device-specific setup instructions when we deliver your credentials.',
  },
  {
    question: 'What should I do if a channel is buffering?',
    answer:
      'First check your internet speed at fast.com. If possible, switch from Wi-Fi to a wired Ethernet connection. In your IPTV player, try switching to a lower stream quality. If buffering persists on multiple channels, contact us on WhatsApp with your username and we will investigate server-side. We may move you to an alternative server cluster.',
  },
  // Channels & Content
  {
    question: 'How many channels are included in my IPTV UK subscription?',
    answer:
      'All plans include over 35,000 live channels — every UK Freeview channel (BBC, ITV, Channel 4, Channel 5), full Sky Sports, BT Sport, TNT Sports, Eurosport, ESPN, all Sky entertainment channels, plus thousands of US, European, Arabic, and South Asian international channels. Plus 100,000+ on-demand VODs.',
  },
  {
    question: 'Are Sky Sports and Premier League matches included?',
    answer:
      'Yes. The complete Sky Sports package is included: Main Event, Premier League, Football, Cricket, Golf, F1, Arena, Mix, and News. BT Sport 1, 2, and 3 are also included, along with TNT Sports, Eurosport 1 and 2, beIN Sports, DAZN, LaLiga TV, NBA TV, and NFL Network. Every Premier League match and Champions League night is available.',
  },
  {
    question: 'Is catch-up TV included, and does the EPG work?',
    answer:
      '7-day catch-up TV is included on Premium Annual and Family plans, allowing you to replay any programme from the last 7 days on supported channels. The Electronic Programme Guide (EPG) is included on all plans and updates automatically, integrating with IPTV Smarters Pro and TiviMate.',
  },
  {
    question: 'Is there a VOD library, and how current is it?',
    answer:
      'Yes — all plans include a 100,000+ title VOD library covering films, TV series, documentaries, and sports events. New titles are added within 24–48 hours of digital release. Content includes major Hollywood blockbusters, UK cinema releases, and the latest TV seasons from HBO, Amazon, and more.',
  },
  {
    question: 'Are international and Arabic channels available?',
    answer:
      'Yes. Over 30,000 international channels are included. Arabic: MBC, Al Arabiya, Al Jazeera, Rotana. South Asian: Star Plus, Zee TV, Colors, Sony LIV. European: RAI 1–3, TF1, M6, TVE, Antena 3, RTL, Pro7. Whatever your background, your home channels are almost certainly available.',
  },
] as const

const faqJsonLd        = schemaToString(generateFAQSchema([...ALL_FAQS]))
const breadcrumbJsonLd = schemaToString(generateBreadcrumbSchema([
  { name: 'Home', url: '/'     },
  { name: 'FAQ',  url: '/faq/' },
]))

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQPageRoute() {
  return (
    <>
      <Script id="schema-faq"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd        }} />
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <FAQPage />
    </>
  )
}
