'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'

import { fadeUp, SPRING, defaultViewport, staggerContainer } from '@/lib/animations'
import { Navbar }  from './Navbar'
import { Button }  from '../atoms/Button'

// ─── Types ────────────────────────────────────────────────────────────────────

type DeviceId = 'firestick' | 'android' | 'smarttv' | 'iphone' | 'mag'

interface Step {
  title:       string
  description: string
}

interface Device {
  id:    DeviceId
  label: string
  steps: Step[]
}

interface TroubleshootItem {
  question: string
  answer:   string
}

// ─── Device data ──────────────────────────────────────────────────────────────

const DEVICES: Device[] = [
  {
    id:    'firestick',
    label: 'Firestick',
    steps: [
      {
        title:       'Download IPTV Smarters Pro',
        description: 'Open the Amazon App Store on your Firestick. Search for "IPTV Smarters Pro" and install it. If it doesn\'t appear, use the Downloader app to sideload the APK — go to Settings → My Fire TV → Developer Options and enable "Apps from Unknown Sources" first.',
      },
      {
        title:       'Open the App & Add User',
        description: 'Launch IPTV Smarters Pro. On the home screen, tap "Add User" then select "Login with Xtream Codes API". You\'ll see fields for a name, server URL, username, and password.',
      },
      {
        title:       'Enter Your Credentials',
        description: 'Enter the server URL, username, and password exactly as we sent them to your WhatsApp. The profile name can be anything — for example "IPTV UK". Tap "Add User" to save and load your subscription.',
      },
      {
        title:       'Browse Your Content',
        description: 'Once loaded, you\'ll see your full channel list, VOD library, and series catalogue. Use the EPG (programme guide) to see what\'s on. UK channels are clearly labelled — navigate to Sports for Sky Sports, Premier League and BT Sport.',
      },
      {
        title:       'Start Streaming',
        description: 'Select any channel to begin streaming instantly. 35,000+ channels load in HD or 4K Ultra HD depending on your plan. For sports events, go to Sports → UK Sports → Sky Sports Premier League for the best picture quality.',
      },
    ],
  },
  {
    id:    'android',
    label: 'Android',
    steps: [
      {
        title:       'Download IPTV Smarters or TiviMate',
        description: 'Open the Google Play Store on your Android device or TV box. Search for "IPTV Smarters Pro" (available free) or "TiviMate" (recommended for Android TV boxes — has a premium 4-screen EPG view). Install your preferred app.',
      },
      {
        title:       'Open the App & Add a Playlist',
        description: 'For IPTV Smarters: tap "Add User" → "Login with Xtream Codes API". For TiviMate: tap the menu icon → "Add Playlist" → "Xtream Codes". Both apps use the same credentials format.',
      },
      {
        title:       'Enter Your Credentials',
        description: 'Enter the server URL, username, and password we sent to your WhatsApp. In TiviMate, also give the playlist a name (e.g., "IPTV UK"). Tap "Add" or "Login" — the channel list will load automatically, typically within 30 seconds.',
      },
      {
        title:       'Browse Channels & VODs',
        description: 'Your full 35,000+ channel list and 100,000+ VOD library will appear. TiviMate users can access the EPG guide by pressing the menu button during playback. Set your preferred player (VLC or built-in) in Settings for best performance.',
      },
      {
        title:       'Start Streaming',
        description: 'Tap any channel to begin. For 4K content on Android TV boxes, ensure your box is connected via HDMI to a 4K TV and your internet is at least 25 Mbps. Ethernet connection is strongly recommended for live sports in 4K.',
      },
    ],
  },
  {
    id:    'smarttv',
    label: 'Smart TV',
    steps: [
      {
        title:       'Open Your Smart TV App Store',
        description: 'Samsung Smart TVs: press the Home button and open Samsung Apps. LG Smart TVs: press the Home button and open the LG Content Store. Both stores carry IPTV player apps compatible with your subscription credentials.',
      },
      {
        title:       'Search for an IPTV Player App',
        description: 'On Samsung, search for "IPTV Smarters" or "Smart IPTV (SIPTV)". On LG, search for "SS IPTV" or "IPTV Smarters". Install your chosen app — Smart IPTV and SS IPTV are popular choices for Smart TVs as they are optimised for large screen navigation.',
      },
      {
        title:       'Enter Your Credentials',
        description: 'Open the installed app and navigate to Settings or "Add Playlist". Select "Xtream Codes" login type and enter your server URL, username, and password exactly as sent to your WhatsApp. Save and allow the channel list to load.',
      },
      {
        title:       'Navigate the Channel List',
        description: 'Your 35,000+ channels will appear organised by category. Use the arrow keys on your remote to browse. The EPG programme guide is available via the Info button during playback. UK channels, sports, and international content are clearly categorised.',
      },
      {
        title:       'Start Streaming',
        description: 'Select any channel and it will begin playing immediately. Smart TVs connected via Ethernet will experience the most stable streams. For 4K channels, ensure your TV is set to HDMI 2.0 or 2.1 mode and your broadband is at least 25 Mbps download.',
      },
    ],
  },
  {
    id:    'iphone',
    label: 'iPhone / iPad',
    steps: [
      {
        title:       'Download GSE Smart IPTV',
        description: 'Open the App Store on your iPhone or iPad. Search for "GSE Smart IPTV" and install it — it\'s free to download. Alternatively, "IPTV Smarters Pro" is also available on the App Store and works with the same credentials.',
      },
      {
        title:       'Open the App & Go to Settings',
        description: 'Launch GSE Smart IPTV. Tap the menu icon (top left) and select "Xtream Codes API". Alternatively, in IPTV Smarters Pro, tap "Add User" on the home screen. Both apps support the Xtream Codes login format.',
      },
      {
        title:       'Enter Your Credentials',
        description: 'Tap "Add" in GSE Smart IPTV\'s Xtream Codes section and enter your server URL, username, and password as sent to your WhatsApp. Give the profile a name (e.g., "IPTV UK") and tap "Add" to save. Your full channel list will load within seconds.',
      },
      {
        title:       'Browse & Organise Your Channels',
        description: 'Navigate to "Live TV" to see your full channel list, "Movies" for the VOD library, and "Series" for TV box sets. The EPG guide shows the current and upcoming schedule. Use the search function to quickly find a specific channel or show.',
      },
      {
        title:       'Start Streaming',
        description: 'Tap any channel to begin streaming. iPhone and iPad support HD and Full HD quality streams. For best performance on iPhone, close background apps and use Wi-Fi (5GHz band is recommended). AirPlay to Apple TV is also supported for TV-screen viewing.',
      },
    ],
  },
  {
    id:    'mag',
    label: 'MAG Box',
    steps: [
      {
        title:       'Power On Your MAG Box',
        description: 'Connect your MAG box (254, 256, 322, 324, 420, or any compatible model) to your TV via HDMI and to your router via Ethernet. Power on and wait for the interface to load — Ethernet is strongly recommended over Wi-Fi for MAG boxes.',
      },
      {
        title:       'Go to Settings → Servers',
        description: 'From the MAG interface home screen, navigate to Settings (the gear icon). Select "System Settings" followed by "Servers". You will see a field labelled "Portal URL" — this is where your credentials are entered.',
      },
      {
        title:       'Enter Your Portal URL',
        description: 'In the Portal URL field, enter the server URL exactly as we sent it to your WhatsApp. For MAG boxes, we provide a dedicated portal URL format. The username and password are embedded in the portal — you only need the single URL for MAG setup.',
      },
      {
        title:       'Reboot & Load Channels',
        description: 'After entering the portal URL, go back and select "Reboot" from the Settings menu. The MAG box will restart and automatically load your IPTV UK portal with the full channel list, EPG guide, and VOD library.',
      },
      {
        title:       'Navigate & Stream',
        description: 'Use your MAG remote to navigate: OK button to select, Exit to go back. Press the EPG button on your remote to open the programme guide. Channel categories are shown in the left menu — press left to expand. Enjoy 35,000+ channels in HD quality.',
      },
    ],
  },
]

// ─── Troubleshooting FAQ ──────────────────────────────────────────────────────

const TROUBLESHOOT: TroubleshootItem[] = [
  {
    question: "The app won't load or crashes on startup",
    answer:
      'First, force-close the app and reopen it. If it still won\'t load, check your internet connection — visit fast.com to confirm you have at least 10 Mbps. On Firestick, go to Settings → Applications → Manage Installed Applications → IPTV Smarters Pro → Clear Cache and Clear Data, then reopen. If the issue persists, uninstall and reinstall the app. Contact us on WhatsApp if you need device-specific help.',
  },
  {
    question: 'Channels are buffering or freezing',
    answer:
      'Buffering is almost always caused by the local network, not our servers. Switch from Wi-Fi to a wired Ethernet connection — this resolves 90% of buffering issues. Check your speed at fast.com: HD needs 10 Mbps, 4K needs 25 Mbps. In your IPTV player settings, try switching from 4K to HD quality. Restarting your router can also help. If all channels buffer simultaneously, contact us on WhatsApp with your username.',
  },
  {
    question: 'Channels are not showing or the list is empty',
    answer:
      'If your channel list is empty after login, wait 60 seconds for the full list to load — large libraries can take time on first load. Try pulling down to refresh in the channel list. Double-check your credentials are entered correctly — even one wrong character will prevent loading. Passwords are case-sensitive. If the issue persists after 5 minutes, message us on WhatsApp with your username and we will verify your account status.',
  },
  {
    question: "I can't find my credentials — where are they?",
    answer:
      'Your server URL, username, and password were sent to your WhatsApp immediately after your payment was confirmed. Search your WhatsApp messages for our number (+44 7451 296412). If the messages have been deleted, or if you paid by crypto and provided an email address, check your email inbox and spam folder. Still can\'t find them? Message us on WhatsApp and we\'ll resend your credentials instantly.',
  },
  {
    question: 'I need help setting up on my specific device',
    answer:
      'Our UK support team is available on WhatsApp every day from 9am to 11pm. Send us a message on +44 7451 296412 and tell us your device model. We provide personalised step-by-step setup support and can walk you through the process in real time. Most customers are up and running within 10 minutes of contacting us.',
  },
]

// ─── Step component ───────────────────────────────────────────────────────────

function StepItem({ step, index, isLast }: { step: Step; index: number; isLast: boolean }) {
  return (
    <div className="flex gap-6">
      {/* Left: number + connector */}
      <div className="flex flex-col items-center shrink-0">
        <span className="font-mono text-5xl font-bold text-[#EF4136] leading-none w-12 text-center tabular-nums">
          {index + 1}
        </span>
        {!isLast && (
          <div
            className="w-px flex-1 mt-3 mb-1"
            style={{
              borderLeft: '2px dashed rgba(239,65,54,0.25)',
              minHeight: '48px',
            }}
            aria-hidden
          />
        )}
      </div>

      {/* Right: content */}
      <div className={isLast ? 'pb-0' : 'pb-10'}>
        <h3 className="text-xl font-semibold text-white mb-2 leading-snug">
          {step.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  )
}

// ─── Accordion item ───────────────────────────────────────────────────────────

function TroubleshootItem({
  item, isOpen, onToggle, index,
}: {
  item:     TroubleshootItem
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

// ─── Main component ───────────────────────────────────────────────────────────

export function SetupGuidePage() {
  const [activeDevice, setActiveDevice] = useState<DeviceId>('firestick')
  const [openItem, setOpenItem]         = useState<number | null>(null)

  const currentDevice = DEVICES.find((d) => d.id === activeDevice)!

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#08090D] pt-32 pb-20 px-6">
        <div className="container-site">

          {/* ── Hero ───────────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center mb-14"
          >
            <h1 className="text-5xl md:text-6xl font-display text-white leading-tight mb-4">
              How to Set Up Your{' '}
              <span className="text-gradient">IPTV UK Subscription</span>
            </h1>
            <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
              Step-by-step setup guides for every device. Get streaming in under 10 minutes.
            </p>
          </motion.div>

          {/* ── Device selector tabs ───────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-2 mb-14"
          >
            {DEVICES.map((device) => {
              const isActive = activeDevice === device.id
              return (
                <button
                  key={device.id}
                  onClick={() => { setActiveDevice(device.id); setOpenItem(null) }}
                  className={[
                    'px-5 py-2.5 rounded-full text-sm font-ui font-medium',
                    'border transition-all duration-200 cursor-pointer',
                    isActive
                      ? 'bg-[#EF4136] border-[#EF4136] text-white'
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-[#EF4136]/20 hover:border-[#EF4136]/40 hover:text-white',
                  ].join(' ')}
                >
                  {device.label}
                </button>
              )
            })}
          </motion.div>

          {/* ── Steps ──────────────────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDevice}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl mx-auto mb-20"
            >
              <div className="glass p-8 md:p-10">
                <p className="text-xs tracking-[0.2em] uppercase text-[#EF4136] font-ui font-semibold mb-8">
                  {currentDevice.label} Setup Guide
                </p>
                {currentDevice.steps.map((step, i) => (
                  <StepItem
                    key={i}
                    step={step}
                    index={i}
                    isLast={i === currentDevice.steps.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Troubleshooting ────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="max-w-2xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">
              Common{' '}
              <span className="text-gradient">Setup Issues</span>
            </h2>

            <div>
              {TROUBLESHOOT.map((item, i) => (
                <TroubleshootItem
                  key={i}
                  item={item}
                  index={i}
                  isOpen={openItem === i}
                  onToggle={() => setOpenItem((prev) => (prev === i ? null : i))}
                />
              ))}
            </div>
          </motion.div>

          {/* ── SEO content block ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">
              Setting Up IPTV in the UK —{' '}
              <span className="text-gradient">Everything You Need to Know</span>
            </h2>

            <div className="space-y-5 text-white/60 text-base leading-relaxed">

              <p>
                Setting up an IPTV UK subscription has never been simpler, but choosing the right
                device and app makes a significant difference to your viewing experience. This guide
                covers everything UK viewers need to know — from device compatibility and app
                recommendations to network requirements and whether to use a VPN.
              </p>

              <h3 className="text-xl font-display text-white mt-8 mb-2">
                Device Compatibility
              </h3>
              <p>
                Our IPTV UK subscription works on virtually every internet-connected device sold in
                the UK. Amazon Firestick (including the Firestick 4K, Firestick 4K Max, and Fire TV
                Cube) is the most popular choice among our customers — it is inexpensive, widely
                available from Amazon UK, and supports every major IPTV app. Android TV boxes such
                as the Nvidia Shield Pro, Formuler Z11 Pro Max, and Buzz TV XRS 4900 offer premium
                performance for 4K streaming with the TiviMate app. Samsung Smart TVs (2017 and
                later Tizen models) and LG Smart TVs (2018 and later webOS models) both support
                IPTV apps directly from their respective app stores. For Apple users, the Apple TV
                4th generation and later, iPhone, and iPad are all supported via the App Store.
              </p>

              <h3 className="text-xl font-display text-white mt-8 mb-2">
                Recommended Apps by Device
              </h3>
              <p>
                The best IPTV player app depends on your device. For Firestick and Android TV boxes,
                IPTV Smarters Pro offers the best balance of features and ease of use — it is free
                to download and supports Xtream Codes login, EPG guide, catch-up TV, and VOD. For
                Android TV power users, TiviMate provides a superior electronic programme guide
                experience with multi-screen EPG, parental controls, and a polished TV interface.
                For iPhone and iPad, GSE Smart IPTV is the most reliable option and supports
                Xtream Codes, M3U playlists, and Airplay to Apple TV. For Samsung Smart TVs, Smart
                IPTV (SIPTV) is the most widely used app with excellent remote navigation support.
                For MAG boxes, no additional app is required — the built-in portal browser handles
                everything via the portal URL.
              </p>

              <h3 className="text-xl font-display text-white mt-8 mb-2">
                Network Requirements for UK Viewers
              </h3>
              <p>
                A stable internet connection is more important than raw speed. For HD (1080p)
                streaming, 10 Mbps is sufficient — any standard UK broadband package from BT, Sky,
                Virgin Media, TalkTalk, or Plusnet will comfortably exceed this. For 4K Ultra HD
                streaming (available on Premium Annual and Family plans), aim for 25 Mbps or more.
                More importantly, minimise network congestion: connect your streaming device directly
                to your router via an Ethernet cable whenever possible. A wired Gigabit Ethernet
                connection eliminates Wi-Fi interference and packet loss — the most common causes of
                buffering during live sports events. If Ethernet is not practical, use the 5GHz
                Wi-Fi band rather than 2.4GHz, and position your router as close to your device as
                possible.
              </p>

              <h3 className="text-xl font-display text-white mt-8 mb-2">
                VPN Advice for UK IPTV Users
              </h3>
              <p>
                Many UK IPTV users ask whether they should use a VPN with their subscription. Our
                service works without a VPN and is accessible from any UK internet connection.
                However, some users prefer to use a VPN for privacy reasons. If you choose to use
                a VPN, select a server in the United Kingdom — this ensures the lowest latency to
                our UK-based server infrastructure. Avoid connecting to overseas VPN servers as this
                can increase buffering on live sports streams. Premium VPN providers such as
                ExpressVPN, NordVPN, and Surfshark all work well with IPTV when configured
                correctly. If you experience issues with a VPN enabled, always test without the VPN
                first to confirm the issue is VPN-related before contacting support.
              </p>

            </div>
          </motion.div>

          {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="text-center glass p-10 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-display text-white mb-3">
              Need Help Getting Set Up?
            </h2>
            <p className="text-white/50 text-sm mb-8">
              Our UK support team is on WhatsApp every day, 9am–11pm.
              We can walk you through setup on any device in real time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/447451296412?text=Hi%2C+I+need+help+setting+up+my+IPTV+UK+subscription."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] text-white font-bold px-7 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] text-[0.9375rem]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden />
                Get Help on WhatsApp
              </a>
              <Link href="/plans/">
                <Button variant="primary">
                  Ready to Subscribe? View Plans
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
