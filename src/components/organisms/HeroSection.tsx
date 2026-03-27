'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { Play, ArrowRight } from 'lucide-react'
import { createTimeline, stagger } from 'animejs'

import { Button }      from '../atoms/Button'
import { Badge }       from '../atoms/Badge'
import { StatCounter } from '../atoms/StatCounter'

// ─── Stream channel data ──────────────────────────────────────────────────────

const STREAM_CHANNELS = [
  { name: 'Sky Sports',       category: 'Sports'        },
  { name: 'BBC One',          category: 'Freeview'      },
  { name: 'Premier League',   category: 'Sports'        },
  { name: 'Netflix',          category: 'Streaming'     },
  { name: 'ITV',              category: 'Freeview'      },
  { name: 'Sky Atlantic',     category: 'Premium'       },
  { name: 'BT Sport',         category: 'Sports'        },
  { name: 'Channel 4',        category: 'Freeview'      },
  { name: 'Disney+',          category: 'Streaming'     },
  { name: 'BBC Two',          category: 'Freeview'      },
  { name: 'Sky Cinema',       category: 'Movies'        },
  { name: 'Amazon Prime',     category: 'Streaming'     },
  { name: 'Eurosport',        category: 'Sports'        },
  { name: 'E4',               category: 'Freeview'      },
  { name: 'HBO Max',          category: 'Premium'       },
  { name: 'Sky News',         category: 'News'          },
  { name: 'TalkSport',        category: 'Sports'        },
  { name: 'MTV',              category: 'Entertainment' },
  { name: 'Comedy Central',   category: 'Entertainment' },
  { name: 'National Geo',     category: 'Factual'       },
  { name: 'Discovery',        category: 'Factual'       },
  { name: 'Fox Sports',       category: 'Sports'        },
  { name: 'LaLiga TV',        category: 'Sports'        },
  { name: 'NBA TV',           category: 'Sports'        },
  { name: 'beIN Sports',      category: 'Sports'        },
  { name: 'Sky Arts',         category: 'Culture'       },
  { name: 'Dave',             category: 'Comedy'        },
  { name: 'Gold',             category: 'Entertainment' },
] as const

// ─── Stream card ──────────────────────────────────────────────────────────────

function ChannelCard({ name, category }: { name: string; category: string }) {
  return (
    <div
      className="shrink-0 mr-4 px-4 py-3 min-w-[10rem] rounded-xl border border-white/15 bg-white/[0.08] backdrop-blur-sm"
      aria-hidden
    >
      <p className="text-[0.6rem] font-ui uppercase tracking-widest text-[var(--color-text-muted)]">
        {category}
      </p>
      <p className="text-sm font-semibold tracking-widest uppercase text-[var(--color-text-primary)] mt-1 whitespace-nowrap">
        {name}
      </p>
    </div>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 35000,  suffix: '+', label: 'Channels'    },
  { value: 100000, suffix: '+', label: 'VOD Library' },
  { value: 99.9,   suffix: '%', label: 'Uptime'      },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const doubled = [...STREAM_CHANNELS, ...STREAM_CHANNELS]

  useEffect(() => {
    // Respect prefers-reduced-motion — reveal elements without animation
    if (prefersReducedMotion) {
      document
        .querySelectorAll('.hero-badge,.hero-title,.hero-subtitle,.hero-divider,.hero-stat,.hero-cta')
        .forEach((el) => { (el as HTMLElement).style.opacity = '1' })
      return
    }

    createTimeline({ ease: 'easeOutExpo' })
      .add('.hero-badge',    { translateY: [-20, 0], opacity: [0, 1], duration: 600 })
      .add('.hero-title',    { translateY: [60, 0],  opacity: [0, 1], duration: 800 }, '-=300')
      .add('.hero-subtitle', { translateY: [20, 0],  opacity: [0, 1], duration: 600 }, '-=400')
      .add('.hero-divider',  { scaleX: [0, 1],       opacity: [0, 1], duration: 500 }, '-=300')
      .add('.hero-stat',     { translateY: [20, 0],  opacity: [0, 1], duration: 500, delay: stagger(100) }, '-=200')
      .add('.hero-cta',      { translateY: [20, 0],  opacity: [0, 1], duration: 500, delay: stagger(80)  }, '-=200')
  }, [prefersReducedMotion])

  return (
    <section
      className="noise hero-grid relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero — IPTV UK Subscription"
    >

      {/* ── Blob layer (z-0) ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-[var(--color-accent-red)] blur-[120px] opacity-20" />
        <div className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full bg-[#1A56DB] blur-[120px] opacity-20" />
      </div>

      {/* ── Background stream layer (z-0) ────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 flex flex-col justify-center gap-6 opacity-35 pointer-events-none select-none"
        aria-hidden
      >
        <div className="overflow-hidden">
          <div className="stream-track">
            {doubled.map((ch, i) => (
              <ChannelCard key={`r1-${i}`} name={ch.name} category={ch.category} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex w-max"
            style={{ animation: prefersReducedMotion ? 'none' : 'stream 55s linear infinite reverse' }}
          >
            {doubled.map((ch, i) => (
              <ChannelCard key={`r2-${i}`} name={ch.name} category={ch.category} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Radial gradient overlay (z-10) ───────────────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(8,9,13,0.92) 0%, transparent 100%)',
        }}
        aria-hidden
      />

      {/* ── Content (z-20) ───────────────────────────────────────────────────── */}
      <div className="relative z-[20] container-site py-32 flex flex-col items-center text-center gap-8">

        {/* Eyebrow badge */}
        <div className="hero-badge" style={{ opacity: 0 }}>
          <Badge variant="neutral">
            🇬🇧 &nbsp;UK&apos;s #1 IPTV Service
          </Badge>
        </div>

        {/* H1 */}
        <h1
          className="hero-title max-w-4xl text-6xl md:text-7xl lg:text-8xl font-display leading-[1.05] tracking-tight text-[var(--color-text-primary)]"
          style={{ opacity: 0 }}
        >
          The UK&apos;s Best{' '}
          <span className="text-gradient">IPTV Subscription</span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle max-w-xl text-2xl md:text-3xl text-white/70 font-display italic leading-relaxed"
          style={{ opacity: 0 }}
        >
          Never Miss a Moment
        </p>

        {/* Red divider */}
        <div
          className="hero-divider w-16 h-px bg-[#EF4136]/50 mx-auto"
          style={{ opacity: 0 }}
          aria-hidden
        />

        {/* Stat counters */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
          {STATS.map((stat) => (
            <div key={stat.label} className="hero-stat" style={{ opacity: 0 }}>
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </div>
          ))}
        </div>

        {/* Thin divider */}
        <div
          className="hero-cta w-16 h-px bg-[var(--color-border)]"
          style={{ opacity: 0 }}
          aria-hidden
        />

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/plans/" className="hero-cta" style={{ opacity: 0 }}>
            <Button size="lg" icon={Play}>
              Start Watching — £9.99/mo
            </Button>
          </Link>
          <Link href="/free-trial/" className="hero-cta" style={{ opacity: 0 }}>
            <Button variant="ghost" size="lg" icon={ArrowRight} iconPosition="right">
              Get Free Trial
            </Button>
          </Link>
        </div>

        {/* Trust signals */}
        <p
          className="hero-cta text-sm text-[var(--color-text-muted)] font-ui"
          style={{ opacity: 0 }}
        >
          No contract &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; Instant setup &nbsp;·&nbsp; UK support
        </p>

      </div>
    </section>
  )
}
