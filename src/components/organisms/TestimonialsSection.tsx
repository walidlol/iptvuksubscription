'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { animate, stagger } from 'animejs'

import { fadeUp, SPRING, defaultViewport } from '@/lib/animations'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Testimonial {
  quote:  string
  name:   string
  city:   string
  device: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:  'Switched from Sky and saved over £800 a year. Picture quality is unreal.',
    name:   'James T.',
    city:   'Manchester',
    device: 'Firestick',
  },
  {
    quote:  'Set up in 10 minutes on my Samsung TV. Every Premier League game, sorted.',
    name:   'Sarah K.',
    city:   'London',
    device: 'Smart TV',
  },
  {
    quote:  'The VOD library is massive. My whole family watches something different every night.',
    name:   'Mohammed A.',
    city:   'Birmingham',
    device: 'Android Box',
  },
  {
    quote:  '99.9% uptime is no joke. Not a single buffer in 6 months.',
    name:   'David R.',
    city:   'Leeds',
    device: 'MAG Box',
  },
  {
    quote:  'Customer support on WhatsApp is brilliant. Got help within minutes.',
    name:   'Emma W.',
    city:   'Glasgow',
    device: 'iPhone',
  },
  {
    quote:  "Best IPTV UK subscription I've tried. And I've tried a few.",
    name:   'Chris B.',
    city:   'Bristol',
    device: 'Firestick',
  },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          className="text-[#EF4136]"
          fill="currentColor"
          aria-hidden
        />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.article
      className="testimonial-card glass relative flex flex-col gap-4 p-6 h-full overflow-hidden"
      style={{ opacity: 0 }}
      whileHover={{ y: -4 }}
      transition={SPRING}
    >
      {/* Decorative quotation mark */}
      <span
        className="absolute top-2 left-4 text-6xl text-[#EF4136]/10 font-serif leading-none select-none pointer-events-none"
        aria-hidden
      >
        &ldquo;
      </span>

      <Stars />

      <blockquote className="flex-1 relative">
        <p className="text-sm text-white/80 leading-relaxed italic mb-4">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      <footer className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-white">
          {testimonial.name}
        </span>
        <span className="text-xs text-white/40">
          {testimonial.city} &nbsp;·&nbsp; {testimonial.device}
        </span>
      </footer>
    </motion.article>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(section)
            const cards = section.querySelectorAll('.testimonial-card')
            animate(cards, {
              translateY: [30, 0],
              opacity:    [0, 1],
              duration:   700,
              delay:      stagger(80),
              ease:       'easeOutExpo',
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-bg-surface)] py-32"
      aria-labelledby="testimonials-heading"
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
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-display text-[var(--color-text-primary)] mb-4 leading-tight"
          >
            Trusted by Thousands{' '}
            <span className="text-gradient">Across the UK</span>
          </h2>
        </motion.div>

        {/* Cards grid — Anime.js handles card entrances */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.name}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
