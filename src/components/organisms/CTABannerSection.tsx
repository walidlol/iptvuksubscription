'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { Play, ArrowRight, Zap } from 'lucide-react'
import { animate } from 'animejs'

import { Button } from '../atoms/Button'

// ─── Component ────────────────────────────────────────────────────────────────

export function CTABannerSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(section)
            const content = section.querySelector('.cta-content')
            if (content) {
              animate(content, {
                translateY: [40, 0],
                opacity:    [0, 1],
                duration:   900,
                ease:       'easeOutExpo',
              })
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/10 py-24"
      style={{
        background:
          'linear-gradient(to right, rgba(239,65,54,0.20) 0%, transparent 50%, rgba(239,65,54,0.10) 100%)',
      }}
      aria-labelledby="cta-heading"
    >
      {/* Top-left blob */}
      <div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#EF4136]/15 blur-[100px] pointer-events-none"
        aria-hidden
      />
      {/* Bottom-right blob */}
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[#EF4136]/15 blur-[100px] pointer-events-none"
        aria-hidden
      />

      <div className="relative container-site">
        <div
          className="cta-content flex flex-col items-center text-center gap-6"
          style={{ opacity: 0 }}
        >
          {/* Heading */}
          <h2
            id="cta-heading"
            className="text-5xl md:text-6xl font-display text-[var(--color-text-primary)] leading-tight max-w-3xl"
          >
            Ready to Watch{' '}
            <span className="text-gradient">Everything?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-[var(--color-text-muted)] max-w-xl">
            Join thousands of UK viewers already streaming with us.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link href="/plans/">
              <Button size="lg" icon={Play}>
                Start Watching — £9.99/mo
              </Button>
            </Link>
            <Link href="/free-trial/">
              <Button variant="ghost" size="lg" icon={ArrowRight} iconPosition="right">
                Claim Free Trial
              </Button>
            </Link>
          </div>

          {/* Scarcity line */}
          <p className="text-sm text-[var(--color-text-muted)] font-ui flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-[#EF4136] shrink-0" aria-hidden />
            Limited free trial slots available daily — claim yours before they run out.
          </p>
        </div>
      </div>
    </section>
  )
}
