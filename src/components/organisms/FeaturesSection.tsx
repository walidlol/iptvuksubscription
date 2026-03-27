'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Tv, Film, Zap, Wifi, Monitor, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { animate, stagger } from 'animejs'

import { fadeUp, SPRING, defaultViewport } from '@/lib/animations'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Feature {
  icon:        LucideIcon
  title:       string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon:        Tv,
    title:       '35,000+ Live Channels',
    description: 'Every UK, US, and international channel in one place.',
  },
  {
    icon:        Film,
    title:       '100,000+ VOD Library',
    description: 'Movies, series, documentaries, and sports events on demand.',
  },
  {
    icon:        Zap,
    title:       '4K Ultra HD Quality',
    description: 'Crystal clear picture on any screen, any device.',
  },
  {
    icon:        Wifi,
    title:       '99.9% Uptime Guaranteed',
    description: 'Redundant servers mean you never miss kick-off.',
  },
  {
    icon:        Monitor,
    title:       'All Devices Supported',
    description: 'Firestick, Android, Smart TV, iPhone, MAG box.',
  },
  {
    icon:        Clock,
    title:       'Instant Activation',
    description: 'Credentials delivered within 15 minutes of payment.',
  },
]

// ─── Sub-component ─────────────────────────────────────────────────────────────

function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <motion.div
      className={[
        'feature-card group glass h-full flex flex-col gap-5 p-6 cursor-default',
        'transition-[border-color] duration-300',
        'hover:border-[rgba(239,65,54,0.35)]',
      ].join(' ')}
      style={{ opacity: 0 }}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(239,65,54,0.15)' }}
      transition={SPRING}
    >
      {/* Icon */}
      <div
        className={[
          'w-12 h-12 rounded-xl shrink-0',
          'flex items-center justify-center',
          'bg-[#EF4136]/10 border border-[rgba(239,65,54,0.25)]',
          'shadow-[0_0_16px_rgba(239,65,54,0.2)]',
          'group-hover:bg-[#EF4136]/20 transition-colors duration-300',
        ].join(' ')}
      >
        <Icon size={20} className="text-[#EF4136]" aria-hidden />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold text-white leading-snug mb-2">
          {title}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(section)
            const cards = section.querySelectorAll('.feature-card')
            animate(cards, {
              translateY: [40, 0],
              opacity:    [0, 1],
              duration:   800,
              delay:      stagger(100),
              ease:       'easeOutExpo',
            })
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="features"
      className="bg-[var(--color-bg-surface)] py-32"
      aria-labelledby="features-heading"
    >
      <div className="container-site">

        {/* Header — Framer Motion fadeUp */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2
            id="features-heading"
            className="text-4xl md:text-5xl font-display text-[var(--color-text-primary)] mb-4 leading-tight"
          >
            Everything You Need,{' '}
            <span className="text-gradient">Nothing You Don&apos;t</span>
          </h2>
          <p className="text-lg text-[var(--color-text-muted)]">
            Premium IPTV built for UK viewers — from Premier League to box sets.
          </p>
        </motion.div>

        {/* Cards grid — Anime.js handles card entrances */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
