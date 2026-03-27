'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  Zap, Clock, Check, AlertCircle,
  Smartphone, Tv, MapPin, MessageCircle,
} from 'lucide-react'
import { createTimeline, stagger } from 'animejs'

import { Navbar } from './Navbar'
import { Badge }  from '../atoms/Badge'

// ─── Constants ────────────────────────────────────────────────────────────────

const WHATSAPP_HREF =
  'https://wa.me/447451296412?text=Hi%2C+I%27d+like+to+request+a+free+24-hour+IPTV+trial.%0A%0AName%3A+%0ADevice%3A+%0AUK+City%3A'

const TRIAL_SLOTS = 5

// ─── Data ─────────────────────────────────────────────────────────────────────

const BENEFITS = [
  '35,000+ Live Channels including every UK broadcaster',
  '100,000+ Movies, Series & Sports Events on demand',
  '4K Ultra HD quality on Firestick, Android, Smart TV & more',
] as const

const INFO_ITEMS = [
  { icon: Smartphone,    label: 'Your Name'                                           },
  { icon: Tv,            label: 'Your Device (Firestick / Android / Smart TV / MAG)' },
  { icon: MapPin,        label: 'Your UK City'                                        },
  { icon: MessageCircle, label: 'Preferred contact: WhatsApp'                        },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function FreeTrial() {
  useEffect(() => {
    createTimeline({ ease: 'easeOutExpo' })
      .add('.ft-badge',    { translateY: [-20, 0], opacity: [0, 1], duration: 500 })
      .add('.ft-title',    { translateY: [40, 0],  opacity: [0, 1], duration: 700 }, '-=250')
      .add('.ft-subtitle', { translateY: [20, 0],  opacity: [0, 1], duration: 500 }, '-=350')
      .add('.ft-scarcity', { translateY: [16, 0],  opacity: [0, 1], duration: 500 }, '-=300')
      .add('.ft-col',      { translateY: [30, 0],  opacity: [0, 1], duration: 600, delay: stagger(150) }, '-=200')
  }, [])

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#08090D] pt-32 pb-20 px-6">
        <div className="container-site">

          {/* ── Hero ──────────────────────────────────────────────────────────── */}
          <div className="text-center mb-16">

            {/* Badge */}
            <div className="ft-badge inline-block mb-6" style={{ opacity: 0 }}>
              <Badge variant="popular">
                <Zap className="w-3 h-3" aria-hidden />
                Limited Slots Available
              </Badge>
            </div>

            {/* H1 */}
            <h1
              className="ft-title text-5xl md:text-6xl font-display text-white leading-tight mb-4"
              style={{ opacity: 0 }}
            >
              Claim Your Free{' '}
              <span className="text-gradient">24-Hour IPTV Trial</span>
            </h1>

            {/* Subtitle */}
            <p
              className="ft-subtitle text-white/60 text-lg max-w-2xl mx-auto mt-4"
              style={{ opacity: 0 }}
            >
              Experience 35,000+ channels and 100,000+ VODs completely free for 24 hours.
              Limited slots available daily.
            </p>

            {/* Scarcity bar */}
            <div
              className="ft-scarcity inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-2 mt-6"
              style={{ opacity: 0 }}
            >
              <Clock className="w-4 h-4 text-[#EF4136] shrink-0" aria-hidden />
              <span className="text-sm text-white/70">Today&apos;s remaining trial slots:</span>
              <span className="font-mono font-bold text-[#EF4136]">{TRIAL_SLOTS}</span>
              <span className="text-xs text-white/40 hidden sm:inline">
                — slots reset daily at midnight UK time
              </span>
            </div>
          </div>

          {/* ── Two-column layout ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">

            {/* ── Left column — value proposition ──────────────────────────────── */}
            <div className="ft-col flex flex-col gap-8" style={{ opacity: 0 }}>

              {/* Benefits */}
              <div className="flex flex-col gap-4">
                {BENEFITS.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#EF4136]/15 border border-[#EF4136]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#EF4136]" aria-hidden />
                    </div>
                    <p className="text-white/80 text-base leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>

              {/* Warning / info box */}
              <div className="bg-[#EF4136]/10 border border-[#EF4136]/30 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#EF4136] shrink-0 mt-0.5" aria-hidden />
                <p className="text-sm text-white/70 leading-relaxed">
                  Our trials are manually verified and sent within 15 minutes. This ensures
                  quality for genuine UK viewers only.
                </p>
              </div>

            </div>

            {/* ── Right column — action card ────────────────────────────────────── */}
            <div className="ft-col" style={{ opacity: 0 }}>
              <div className="glass p-8 flex flex-col">

                {/* Card header */}
                <h2 className="text-2xl font-display text-white">
                  Get Your Trial via WhatsApp
                </h2>
                <p className="text-white/50 text-sm mt-2 mb-6">
                  We&apos;ll send your credentials directly to your WhatsApp within 15 minutes.
                </p>

                {/* Info items */}
                <div className="bg-white/5 rounded-xl p-4 mb-6 flex flex-col gap-3">
                  {INFO_ITEMS.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#EF4136] shrink-0" aria-hidden />
                      <span className="text-sm text-white/60">{label}</span>
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    'w-full flex items-center justify-center gap-3',
                    'bg-[#25D366] hover:bg-[#20BD5C] text-white font-bold',
                    'py-4 rounded-xl text-lg',
                    'transition-all duration-300',
                    'hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]',
                  ].join(' ')}
                >
                  <MessageCircle className="w-5 h-5" aria-hidden />
                  Claim Trial via WhatsApp
                </a>

                {/* Email fallback */}
                <p className="text-white/30 text-sm text-center mt-3">
                  Prefer email?{' '}
                  <a
                    href="mailto:support@iptvuksubscription.uk"
                    className="underline hover:text-white/60 transition-colors duration-200"
                  >
                    Contact us
                  </a>
                </p>

              </div>
            </div>

          </div>

          {/* ── Skip trial — already convinced ───────────────────────────────── */}
          <div className="text-center mt-16 text-white/30 text-sm">
            Already convinced?{' '}
            <Link
              href="/plans/"
              className="text-[#EF4136] hover:text-[#EF4136]/80 transition-colors duration-200"
            >
              View our plans and buy directly →
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
