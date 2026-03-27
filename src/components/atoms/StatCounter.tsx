'use client'

import { useRef, useEffect } from 'react'
import { animate } from 'animejs'
import { clsx } from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCounterProps {
  value:      number
  suffix?:    string
  label:      string
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StatCounter({
  value,
  suffix   = '',
  label,
  className,
}: StatCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRef   = useRef<HTMLSpanElement>(null)
  const hasAnimated  = useRef(false)
  const isDecimal    = !Number.isInteger(value)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            observer.unobserve(container)

            if (!counterRef.current) return

            animate(counterRef.current, {
              innerHTML: [0, value],
              duration:  2000,
              ease:      'easeOutExpo',
              onUpdate:  () => {
                if (counterRef.current) {
                  const raw = parseFloat(counterRef.current.innerHTML)
                  if (!isNaN(raw)) {
                    counterRef.current.innerHTML = isDecimal
                      ? raw.toFixed(1)
                      : Math.round(raw).toLocaleString('en-GB')
                  }
                }
              },
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [value, isDecimal])

  return (
    <div
      ref={containerRef}
      className={clsx('flex flex-col items-center text-center', className)}
    >
      <p className="flex items-baseline gap-0.5">
        <span
          ref={counterRef}
          className="font-mono text-5xl font-bold tabular-nums text-white"
        >
          0
        </span>
        {suffix && (
          <span className="font-mono text-3xl font-bold text-[#EF4136]">
            {suffix}
          </span>
        )}
      </p>
      <p className="text-xs tracking-[0.2em] uppercase text-white/50 mt-1 font-ui">
        {label}
      </p>
    </div>
  )
}
