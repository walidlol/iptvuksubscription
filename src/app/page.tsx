/**
 * Homepage — /
 *
 * CLAUDE.md §2: Primary keyword = "iptv uk"
 * CLAUDE.md §7: 2,500+ word content target
 * JSON-LD: FAQPage (5+ Q&As) + WebSite (already in layout.tsx)
 */

import type { Metadata } from 'next'
import Script from 'next/script'

import { homepageMetadata }                           from '@/lib/seo'
import { generateFAQSchema, schemaToString }          from '@/lib/schema'
import { Navbar }                                     from '@/components/organisms/Navbar'
import { HeroSection }                                from '@/components/organisms/HeroSection'
import { FeaturesSection }                            from '@/components/organisms/FeaturesSection'
import { PricingSection }                             from '@/components/organisms/PricingSection'
import { TestimonialsSection }                        from '@/components/organisms/TestimonialsSection'
import { CTABannerSection }                           from '@/components/organisms/CTABannerSection'
import { Footer }                                     from '@/components/organisms/Footer'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = homepageMetadata

// ─── FAQPage JSON-LD ──────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: 'What is IPTV and how does it work in the UK?',
    answer:
      'IPTV (Internet Protocol Television) delivers live TV channels and on-demand content over your internet connection instead of a traditional aerial or satellite dish. In the UK, you connect a compatible device — such as an Amazon Firestick, Android TV box, Smart TV, or smartphone — to our IPTV UK service. Once connected, you get instant access to 35,000+ channels including Sky Sports, BBC, ITV, BT Sport, and Premier League coverage, all streamed in Full HD or 4K quality.',
  },
  {
    question: 'Is IPTV legal in the United Kingdom?',
    answer:
      'Receiving IPTV content is legal in the UK when you use licensed providers. Our IPTV UK subscription service operates within applicable guidelines. We strongly recommend that UK viewers only use licensed IPTV services. Accessing unlicensed streams of copyrighted content without authorisation may violate UK copyright law. If you have any doubts, consult a legal professional for advice specific to your situation.',
  },
  {
    question: 'What devices can I use with an IPTV UK subscription?',
    answer:
      'Our IPTV UK subscription works on a wide range of devices popular in British households. These include Amazon Firestick and Fire TV Cube, Android TV boxes, Samsung and LG Smart TVs (via dedicated apps), Android smartphones and tablets, iPhones and iPads, Apple TV, MAG boxes, Formuler boxes, and Windows or Mac computers. Our setup guide walks you through installation on every supported device in under 10 minutes.',
  },
  {
    question: 'How many UK channels are included in the IPTV UK subscription?',
    answer:
      'Our IPTV subscription includes 35,000+ channels worldwide, with over 5,000 UK and US-focused channels. UK highlights include all BBC channels (BBC One, Two, Three, Four, News, Parliament), ITV1 through ITVBe, all Channel 4 and Channel 5 family channels, Sky Sports (all 9 channels), BT Sport, Sky Atlantic, Sky Cinema, Sky Arts, TNT Sports, Eurosport, and all major Freeview channels. You also get 7-day catch-up TV on our Premium and Family plans so you never miss EastEnders, Coronation Street, or Premier League action.',
  },
  {
    question: 'How do I get started with a free IPTV UK trial?',
    answer:
      'Getting a free 24-hour trial is simple. Click the "Get Free Trial" button on our homepage or visit our Free Trial page. Due to high demand, we limit trials to 20 per day to ensure quality for every tester. Click the WhatsApp button, send us your name, device type, and UK city — and we will personally set up your trial account within minutes. Most UK customers are watching live TV within 15 minutes of requesting their trial.',
  },
  {
    question: 'What internet speed do I need for IPTV streaming in the UK?',
    answer:
      'For smooth IPTV streaming in the UK we recommend a minimum of 10 Mbps download speed for Full HD streams, and 25 Mbps or faster for 4K Ultra HD. Most UK broadband packages — including BT, Sky, Virgin Media, and TalkTalk — comfortably exceed these requirements. A wired Ethernet connection to your router always gives the most stable stream, but strong Wi-Fi (Wi-Fi 5 or Wi-Fi 6) also works reliably in most UK homes.',
  },
] as const

const faqJsonLd = schemaToString(generateFAQSchema([...FAQ_ITEMS]))

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* FAQPage structured data */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />

      <Navbar />

      <main id="main" aria-label="Homepage content">
        <HeroSection />
        <div id="features" className="scroll-mt-20">
          <FeaturesSection />
        </div>
        <div id="pricing" className="scroll-mt-20">
          <PricingSection />
        </div>
        <TestimonialsSection />
        <CTABannerSection />
      </main>

      <Footer />
    </>
  )
}
