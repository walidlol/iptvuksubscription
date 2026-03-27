'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Lock, Zap, MessageCircle } from 'lucide-react'
import { clsx } from 'clsx'

import { staggerContainer, fadeUp, SPRING, defaultViewport } from '@/lib/animations'
import { Badge }  from '../atoms/Badge'
import { Button } from '../atoms/Button'

// ─── Plan data ────────────────────────────────────────────────────────────────

interface Plan {
  id:           string
  name:         string
  price:        string
  period:       string
  perMonth:     string | null
  badgeLabel:   string | null
  badgeVariant: 'popular' | 'hot' | null
  popular:      boolean
  features:     string[]
  cta:          string
}

const PLANS: Plan[] = [
  {
    id:           'standard',
    name:         'Standard',
    price:        '£9.99',
    period:       'per month',
    perMonth:     null,
    badgeLabel:   null,
    badgeVariant: null,
    popular:      false,
    features: [
      '1 simultaneous connection',
      'HD quality streams',
      '35,000+ live channels',
      '100,000+ VOD library',
      'UK & international content',
      'Email support',
    ],
    cta: 'Start Standard',
  },
  {
    id:           'premium',
    name:         'Premium Annual',
    price:        '£79.99',
    period:       'per year',
    perMonth:     'just £6.67/mo',
    badgeLabel:   'Most Popular',
    badgeVariant: 'popular',
    popular:      true,
    features: [
      'Everything in Standard',
      '4K Ultra HD quality',
      'EPG TV guide included',
      '7-day catch-up TV',
      'Priority customer support',
      'Free trial available',
    ],
    cta: 'Start Premium',
  },
  {
    id:           'family',
    name:         'Family Plan',
    price:        '£129.99',
    period:       'per year',
    perMonth:     'just £10.83/mo',
    badgeLabel:   'Best Value',
    badgeVariant: 'hot',
    popular:      false,
    features: [
      'Everything in Premium',
      '5 simultaneous connections',
      'Family-friendly content filter',
      'Multi-room setup guide',
      'Dedicated WhatsApp support',
    ],
    cta: 'Get Family Plan',
  },
]

// ─── Sub-component ─────────────────────────────────────────────────────────────

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    /* Outer wrapper carries the CSS scale for the popular card.
       Framer Motion on the inner div handles only the hover y-lift,
       so the two transforms never conflict. */
    <div className={clsx(plan.popular && 'md:scale-105 transition-transform duration-500')}>
      <motion.div
        className={clsx(
          'glass flex flex-col gap-6 p-8 h-full',
          plan.popular && [
            'border-[#EF4136]/40',
            'shadow-[0_0_60px_rgba(239,65,54,0.2)]',
          ],
        )}
        whileHover={{ y: -4 }}
        transition={SPRING}
      >
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs tracking-[0.25em] uppercase text-white/50 mb-2">
              {plan.name}
            </span>
            {plan.badgeLabel && (
              plan.popular ? (
                <span className="bg-[#EF4136] text-white text-xs font-bold tracking-wider px-3 py-1 rounded-full">
                  {plan.badgeLabel}
                </span>
              ) : plan.badgeVariant ? (
                <Badge variant={plan.badgeVariant}>{plan.badgeLabel}</Badge>
              ) : null
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-5xl md:text-6xl font-bold text-[var(--color-text-primary)]">
              {plan.price}
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">{plan.period}</span>
          </div>
          {plan.perMonth && (
            <p className="text-sm text-[var(--color-text-muted)] -mt-1">{plan.perMonth}</p>
          )}

          {/* Divider */}
          <div className="h-px bg-[var(--color-border)]" />
        </div>

        {/* Feature list */}
        <ul className="flex flex-col gap-3 flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                size={15}
                className="text-[#EF4136] mt-0.5 shrink-0"
                aria-hidden
              />
              <span className="text-sm text-white/70 leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/plans/" className="w-full mt-auto">
          <Button
            variant={plan.popular ? 'primary' : 'ghost'}
            className="w-full justify-center"
          >
            {plan.cta}
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-32"
      aria-labelledby="pricing-heading"
    >
      <div className="container-site">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-16 max-w-xl mx-auto"
        >
          <h2
            id="pricing-heading"
            className="text-4xl md:text-5xl font-display text-[var(--color-text-primary)] mb-4 leading-tight"
          >
            Simple,{' '}
            <span className="text-gradient">Honest Pricing</span>
          </h2>
          <p className="text-lg text-[var(--color-text-muted)]">
            No hidden fees. No contracts. Cancel anytime.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
        >
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <PricingCard plan={plan} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Reassurance bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-[var(--color-text-muted)]"
        >
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#EF4136]" aria-hidden /> Secure Payment via PayPal
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#EF4136]" aria-hidden /> Setup in 15 Minutes
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-[#EF4136]" aria-hidden /> UK Support via WhatsApp
          </span>
        </motion.div>

      </div>
    </section>
  )
}
