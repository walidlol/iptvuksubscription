/**
 * /setup-guide/ — IPTV UK Setup Guide page
 *
 * CLAUDE.md §2: Keyword = "how to set up iptv uk firestick"
 * JSON-LD: FAQPage (5 troubleshooting Q&As) + BreadcrumbList
 */

import type { Metadata } from 'next'
import Script from 'next/script'

import { buildMetadata }                                          from '@/lib/seo'
import { generateFAQSchema, generateBreadcrumbSchema, schemaToString } from '@/lib/schema'
import { SetupGuidePage }                                         from '@/components/organisms/SetupGuidePage'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export function generateMetadata(): Metadata {
  return buildMetadata({
    title:       'IPTV UK Setup Guide | Firestick, Android, Smart TV',
    description: 'How to set up IPTV UK on Firestick, Android TV, Samsung Smart TV, iPhone & MAG Box. Step-by-step guide. Get streaming in under 10 minutes.',
    canonical:   '/setup-guide/',
    keywords:    [
      'how to set up iptv uk firestick',
      'iptv uk setup guide',
      'iptv firestick uk setup',
      'iptv uk android tv setup',
      'iptv smarters pro uk',
    ],
  })
}

// ─── Structured data ──────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "The IPTV app won't load or crashes on startup",
    answer:
      'Force-close the app and reopen it. Check your internet connection at fast.com — you need at least 10 Mbps. On Firestick, go to Settings → Applications → Manage Installed Applications → IPTV Smarters Pro → Clear Cache and Clear Data, then reopen. If the issue persists, uninstall and reinstall the app. Contact us on WhatsApp (+44 7451 296412) if you need device-specific assistance.',
  },
  {
    question: 'Channels are buffering or freezing — how do I fix it?',
    answer:
      'Buffering is almost always caused by the local network. Switch from Wi-Fi to a wired Ethernet connection — this resolves the majority of buffering issues. Check your speed at fast.com: HD needs 10 Mbps, 4K needs 25 Mbps. In your IPTV player settings, try switching from 4K to HD quality. Restarting your router can also help. If all channels buffer simultaneously, contact us on WhatsApp with your username.',
  },
  {
    question: 'Channels are not showing or the channel list is empty',
    answer:
      'Wait 60 seconds for the full channel list to load on first use. Try pulling down to refresh the channel list. Double-check your credentials are entered correctly — passwords are case-sensitive. If the issue persists after 5 minutes, message us on WhatsApp with your username and we will verify your account status.',
  },
  {
    question: "I can't find my credentials — where are they?",
    answer:
      'Your credentials were sent to your WhatsApp immediately after payment confirmation. Search your WhatsApp messages for +44 7451 296412. If messages were deleted, check your email inbox and spam folder. Still cannot find them? Message us on WhatsApp and we will resend your credentials instantly.',
  },
  {
    question: 'I need help setting up on my specific device',
    answer:
      'Our UK support team is available on WhatsApp (+44 7451 296412) every day from 9am to 11pm. Send us your device model and we will provide personalised step-by-step setup support. Most customers are streaming within 10 minutes of contacting us.',
  },
] as const

const faqJsonLd        = schemaToString(generateFAQSchema([...FAQ_ITEMS]))
const breadcrumbJsonLd = schemaToString(generateBreadcrumbSchema([
  { name: 'Home',        url: '/'            },
  { name: 'Setup Guide', url: '/setup-guide/' },
]))

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SetupGuidePageRoute() {
  return (
    <>
      <Script id="schema-faq-setup"  type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd        }} />
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <SetupGuidePage />
    </>
  )
}
