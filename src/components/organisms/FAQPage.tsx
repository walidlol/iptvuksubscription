'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'

import { fadeUp, SPRING, defaultViewport, staggerContainer } from '@/lib/animations'
import { Navbar }  from './Navbar'
import { Button }  from '../atoms/Button'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem {
  question: string
  answer:   string
}

interface FaqSection {
  id:       string
  heading:  string
  items:    FaqItem[]
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ_SECTIONS: FaqSection[] = [
  {
    id:      'about',
    heading: 'About Our Service',
    items: [
      {
        question: 'What is IPTV and how does it work?',
        answer:
          'IPTV (Internet Protocol Television) delivers television content over the internet rather than through a traditional satellite or cable signal. Instead of needing a Sky dish or a cable box, you stream channels directly to your device — whether that is a Firestick, Android TV box, Smart TV, smartphone, or computer. Our IPTV UK service gives you a server URL, username, and password. You enter these into an IPTV player app (such as IPTV Smarters Pro or TiviMate) and you instantly have access to 35,000+ live channels and 100,000+ VODs. The quality of your stream depends on your internet connection — we recommend at least 10 Mbps for HD and 25 Mbps for 4K.',
      },
      {
        question: 'Is IPTV UK Subscription a legitimate service?',
        answer:
          'We operate as a licensed IPTV reseller, providing access to a premium content delivery network. Our service is used by thousands of UK viewers to access live channels and on-demand content at a fraction of the cost of traditional pay-TV providers like Sky or Virgin Media. We are transparent about our business model and provide genuine customer support via WhatsApp. All payments are processed securely through PayPal or NOWPayments. We have served 2,400+ UK customers and maintain a 4.9/5 average customer rating.',
      },
      {
        question: 'How reliable is the service — what uptime can I expect?',
        answer:
          'Our IPTV UK service maintains 99.9% uptime on our core channel infrastructure. This means fewer than 8.7 hours of total downtime per year across all channels. Major UK live sports events — such as Premier League matches and boxing — are hosted on dedicated high-capacity servers to ensure zero buffering during peak demand. In the rare event of a technical issue, our UK-based support team responds via WhatsApp, typically within 15 minutes during UK hours (9am–11pm).',
      },
      {
        question: 'How quickly will I receive my credentials after payment?',
        answer:
          'After your payment is confirmed, our team receives an instant notification and manually creates your IPTV UK account in our panel. Your server URL, username, and password are then sent directly to your WhatsApp — typically within 15 minutes. During UK peak hours (9am–11pm) delivery is usually under 5 minutes. Outside of those hours, the absolute maximum wait time is 2 hours, though in practice it is almost always faster. You will also receive setup instructions for your chosen device.',
      },
      {
        question: 'Do you offer a free trial before I commit to a plan?',
        answer:
          'Yes. We offer a free 24-hour trial of the full IPTV UK service — all 35,000+ channels, the complete 100,000+ VOD library, and 4K quality where supported. To claim your trial, visit our free trial page and send us a WhatsApp message with your name, device type, and UK city. We manually verify trial requests to ensure quality for every user. Trial slots are limited to 20 per day, so we recommend requesting early. Most trial users upgrade to a paid plan within 24 hours.',
      },
    ],
  },
  {
    id:      'pricing',
    heading: 'Pricing & Payment',
    items: [
      {
        question: 'What plans are available and how much do they cost?',
        answer:
          'We offer three IPTV UK subscription plans. The Standard plan is £9.99 per month — a rolling monthly subscription with 1 connection, HD quality, and full access to all channels and VODs. The Premium Annual plan is £79.99 per year (just £6.67 per month) and unlocks 4K Ultra HD quality, 7-day catch-up TV, and priority support. The Family Plan is £129.99 per year (£10.83 per month) and provides up to 5 simultaneous connections, making it ideal for households where multiple people watch at the same time. All plans include the same 35,000+ channels and 100,000+ VOD library.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept two payment methods. PayPal covers all major UK debit and credit cards — you do not need a PayPal account to pay. Just select "Pay by card" on the PayPal checkout page. For customers who prefer privacy, we also accept cryptocurrency via NOWPayments, including Bitcoin (BTC), Ethereum (ETH), Tether (USDT), Litecoin (LTC), and 50+ other coins. All payment pages use 256-bit SSL encryption. We never store payment card details.',
      },
      {
        question: 'Can I upgrade or downgrade my plan?',
        answer:
          'Yes, absolutely. If you are on the Standard monthly plan and want to upgrade to Premium Annual or Family Plan, simply message us on WhatsApp. We will calculate a pro-rated credit for any unused days on your current plan and apply it toward your upgrade. There are no penalties and no extra charges — you only pay the difference. Downgrades from an annual plan to a monthly plan take effect at the end of your current billing period. We handle all plan changes manually to ensure accuracy.',
      },
      {
        question: 'Do you offer refunds?',
        answer:
          'We offer a free 24-hour trial specifically so you can test the service risk-free before purchasing. If you experience a technical issue we cannot resolve within 24 hours of your subscription starting, we will issue a full refund. Because login credentials are delivered digitally and immediately, refunds after successful delivery are assessed on a case-by-case basis. If you are unhappy with the service for any genuine reason, please contact us on WhatsApp and we will do our best to find a fair resolution. We value long-term customers over one-time revenue.',
      },
      {
        question: 'Is my payment secure?',
        answer:
          'Yes. PayPal payments are protected by PayPal buyer protection and processed on PayPal\'s own encrypted checkout — we never see your card details. Cryptocurrency payments via NOWPayments are handled entirely on their certified secure platform — we never receive wallet information. We do not store any payment data on our servers. Our website uses HTTPS with a valid SSL certificate, and all communications are encrypted end-to-end.',
      },
    ],
  },
  {
    id:      'technical',
    heading: 'Technical Setup',
    items: [
      {
        question: 'Which devices are supported?',
        answer:
          'Our IPTV UK service works on virtually any internet-connected device. Fully supported devices include: Amazon Firestick (all generations), Fire TV Cube, Android TV boxes (Nvidia Shield, Formuler, Buzz TV), Samsung Smart TVs (Tizen OS), LG Smart TVs (webOS), Android smartphones and tablets, Apple iPhone and iPad (via VLC or IPTV Smarters), Apple TV (4th gen and later), MAG boxes (254, 256, 322, 324, 420), Windows and macOS computers via VLC or Kodi, and Enigma2/Dreambox satellite receivers. If your device runs an app store or supports M3U playlists, it will work.',
      },
      {
        question: 'How do I set up IPTV on my Amazon Firestick?',
        answer:
          'Setting up on Firestick takes under 10 minutes. First, enable "Apps from Unknown Sources" in Settings → My Fire TV → Developer Options. Then download the Downloader app from the Amazon App Store and use it to install IPTV Smarters Pro (the APK is available from the developer\'s site). Open IPTV Smarters Pro, select "Add User via Login", and enter the server URL, username, and password we sent you via WhatsApp. All your channels and VODs will load automatically. Our full step-by-step Firestick setup guide is available on our setup guide page.',
      },
      {
        question: 'What internet connection speed do I need?',
        answer:
          'For standard HD (720p) streams, a minimum of 5 Mbps download speed is recommended. For Full HD (1080p) streams, we recommend 10 Mbps or more. For 4K Ultra HD streams (available on Premium Annual and Family plans), a stable connection of 25 Mbps or faster is ideal. Most modern UK broadband connections — including standard BT, Sky, Virgin Media, and TalkTalk packages — are more than adequate. For the best experience, we recommend connecting your device via Ethernet cable rather than Wi-Fi, particularly for live sports in 4K.',
      },
      {
        question: 'What IPTV player app should I use?',
        answer:
          'We recommend IPTV Smarters Pro as the primary player — it is available on Android, iOS, Firestick, and most Smart TVs. It offers a clean interface, VOD support, EPG guide, and catch-up TV. For Android TV and Nvidia Shield users, TiviMate is an excellent alternative with a premium TV-style interface and advanced EPG features. For MAG boxes, the built-in portal browser is used directly. For Apple TV, GSE Smart IPTV or Flex IPTV work well. For computers, we recommend VLC Media Player with the M3U playlist URL. We send setup instructions for your specific device when we deliver your credentials.',
      },
      {
        question: 'What should I do if a channel is buffering?',
        answer:
          'Buffering is usually caused by local internet speed or Wi-Fi signal rather than our server infrastructure. First, check your internet speed at fast.com and ensure it meets the minimum requirements. If possible, switch from Wi-Fi to a wired Ethernet connection — this alone resolves most buffering issues. In your IPTV player, try switching to a lower stream quality (e.g., HD instead of 4K). If buffering persists on multiple channels simultaneously, contact us on WhatsApp with your username and we will investigate server-side issues. We may move you to an alternative server cluster for your region.',
      },
    ],
  },
  {
    id:      'channels',
    heading: 'Channels & Content',
    items: [
      {
        question: 'How many channels are included in my IPTV UK subscription?',
        answer:
          'All plans include over 35,000 live channels. This covers every UK Freeview channel (BBC, ITV, Channel 4, Channel 5 and all sub-channels), the full Sky Sports package, BT Sport, TNT Sports, Eurosport, ESPN, DAZN, all Sky entertainment channels (Atlantic, Max, Cinema), and thousands of US, European, Middle Eastern, South Asian, and international channels. Additionally, you get access to a 100,000+ on-demand VOD library including the latest films and TV series. Our channels page has a full browsable list organised by category.',
      },
      {
        question: 'Are Sky Sports and Premier League matches included?',
        answer:
          'Yes — the complete Sky Sports package is included on all plans: Sky Sports Main Event, Sky Sports Premier League, Sky Sports Football, Sky Sports Cricket, Sky Sports Golf, Sky Sports F1, Sky Sports Arena, Sky Sports Mix, and Sky Sports News. BT Sport 1, 2, and 3 are also included, as well as TNT Sports, Eurosport 1 and 2, beIN Sports, DAZN, LaLiga TV, NBA TV, and NFL Network. Every Premier League match, Champions League night, international cricket Test, Formula 1 race, and boxing event is available.',
      },
      {
        question: 'Is catch-up TV included, and does the EPG work?',
        answer:
          'Catch-up TV (7-day replay) is included on the Premium Annual and Family plans. This means you can watch any programme that aired in the last 7 days on supported channels — including BBC, ITV, Channel 4, and Sky — without needing to set a recording. The Electronic Programme Guide (EPG) is included on all plans and updates automatically, showing you the current and upcoming schedule for all channels. The EPG integrates directly with IPTV Smarters Pro and TiviMate, so you can browse by show name or time slot just like a traditional TV guide.',
      },
      {
        question: 'Is there a VOD library, and how current is it?',
        answer:
          'Yes. All plans include access to a 100,000+ title VOD library covering films, TV series, documentaries, and sports events. The library includes major Hollywood blockbusters, UK cinema releases, classic films, and the latest TV seasons from HBO, Netflix originals (available via VOD after broadcast), Amazon Prime series, and Disney+ content. New titles are added regularly — typically within 24–48 hours of a film\'s digital release. Content is organised by genre, year, and quality (HD/4K), and is fully searchable within your IPTV player.',
      },
      {
        question: 'Are international and Arabic channels available?',
        answer:
          'Yes. Our IPTV UK subscription includes over 30,000 international channels covering virtually every region and language. Arabic speakers can access MBC 1, MBC 2, MBC Drama, Al Arabiya, Al Jazeera, rotana, and hundreds more. South Asian viewers can watch Star Plus, Zee TV, Colors, Sony LIV, Sun TV, and dozens of regional language channels. European channels include RAI 1, RAI 2, RAI 3 (Italy), TF1, M6, France 2 (France), TVE 1, Antena 3 (Spain), RTL, Pro7 (Germany), and more. Wherever you are originally from, your home channels are almost certainly in our library.',
      },
    ],
  },
]

// ─── Accordion item ───────────────────────────────────────────────────────────

function AccordionItem({
  item, isOpen, onToggle, index,
}: {
  item:     FaqItem
  isOpen:   boolean
  onToggle: () => void
  index:    number
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between py-5 text-left gap-4 group"
        aria-expanded={isOpen}
      >
        <span className="flex items-start gap-3">
          <span className="font-mono text-xs text-[#EF4136] shrink-0 mt-1 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-base font-medium text-white/80 group-hover:text-white transition-colors duration-200 leading-snug">
            {item.question}
          </span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown className="w-5 h-5 text-white/30" aria-hidden />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/50 leading-relaxed pb-5 pl-7 pr-8">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  function toggle(key: string) {
    setOpenItem((prev) => (prev === key ? null : key))
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#08090D] pt-32 pb-20">
        <div className="container-site">

          {/* ── Hero ───────────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display text-white leading-tight mb-4">
              IPTV UK Subscription —{' '}
              <span className="text-gradient">Frequently Asked Questions</span>
            </h1>
            <p className="text-white/60 text-lg mt-4">
              Everything you need to know before subscribing. Can&apos;t find your answer?{' '}
              <a
                href="https://wa.me/447451296412"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EF4136] hover:text-[#EF4136]/80 transition-colors duration-200"
              >
                Message us on WhatsApp
              </a>
              .
            </p>
          </motion.div>

          {/* ── Section nav pills ──────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-2 mb-16"
          >
            {FAQ_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-4 py-2 rounded-full text-sm font-ui bg-white/5 border border-white/10 text-white/60 hover:bg-[#EF4136]/20 hover:border-[#EF4136]/40 hover:text-white transition-all duration-200"
              >
                {section.heading}
              </a>
            ))}
          </motion.div>

          {/* ── FAQ Sections ───────────────────────────────────────────────── */}
          <div className="max-w-3xl mx-auto space-y-16">
            {FAQ_SECTIONS.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
              >
                <h2 className="text-2xl md:text-3xl font-display text-white mb-6 pb-3 border-b border-white/10">
                  <span className="text-[#EF4136]">/</span> {section.heading}
                </h2>

                <div>
                  {section.items.map((item, i) => {
                    const key = `${section.id}-${i}`
                    return (
                      <AccordionItem
                        key={key}
                        item={item}
                        index={i}
                        isOpen={openItem === key}
                        onToggle={() => toggle(key)}
                      />
                    )
                  })}
                </div>
              </motion.section>
            ))}
          </div>

          {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="text-center mt-20 glass p-10 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-display text-white mb-3">
              Still have a question?
            </h2>
            <p className="text-white/50 text-sm mb-6">
              Our UK support team is available on WhatsApp every day from 9am to 11pm.
              Average response time: under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/447451296412?text=Hi%2C+I+have+a+question+about+IPTV+UK+Subscription."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" aria-hidden />
                  Ask on WhatsApp
                </Button>
              </a>
              <Link href="/plans/">
                <Button variant="ghost">View Plans &amp; Pricing</Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
