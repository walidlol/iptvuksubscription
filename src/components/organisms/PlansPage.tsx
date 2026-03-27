'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Zap, MessageCircle, Check,
  CreditCard, Coins, Bell, Key,
  ChevronDown, Lock,
} from 'lucide-react'
import { clsx } from 'clsx'

import { fadeUp, SPRING, defaultViewport, staggerContainer } from '@/lib/animations'
import { Navbar }  from './Navbar'
import { Badge }   from '../atoms/Badge'
import { Button }  from '../atoms/Button'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem {
  question: string
  answer:   string
}

interface PlansPageProps {
  faqItems: readonly FaqItem[]
}

// ─── Plan data ────────────────────────────────────────────────────────────────

const PLANS = [
  {
    id:           'standard',
    anchor:       '#standard',
    name:         'Standard',
    tagline:      'Perfect for solo viewers',
    price:        '£9.99',
    period:       'per month',
    perMonth:     null,
    badgeLabel:   null,
    popular:      false,
    features: [
      '1 simultaneous connection',
      'Full HD quality streams',
      '35,000+ live channels worldwide',
      '5,000+ UK & US focused channels',
      '100,000+ on-demand VOD library',
      'Electronic Programme Guide (EPG)',
      'Works on all major devices',
      'UK & international content',
      'Email support',
    ],
    cta: 'Get Standard',
  },
  {
    id:           'premium',
    anchor:       '#premium',
    name:         'Premium Annual',
    tagline:      'Best value — save vs monthly',
    price:        '£79.99',
    period:       'per year',
    perMonth:     'just £6.67/mo',
    badgeLabel:   'Most Popular',
    popular:      true,
    features: [
      'Everything in Standard',
      '4K Ultra HD quality streams',
      '7-day catch-up TV included',
      'Full EPG programme guide',
      'Anti-freeze & buffer technology',
      'Priority customer support',
      'Free 24-hour trial available',
      'Instant activation on payment',
    ],
    cta: 'Get Premium Annual',
  },
  {
    id:           'family',
    anchor:       '#family',
    name:         'Family Plan',
    tagline:      'The whole household sorted',
    price:        '£129.99',
    period:       'per year',
    perMonth:     'just £10.83/mo',
    badgeLabel:   'Best Value',
    popular:      false,
    features: [
      'Everything in Premium',
      'Up to 5 simultaneous connections',
      'Family-friendly content filter',
      'Multi-room setup guide included',
      'Dedicated WhatsApp support line',
      'UK school holidays content calendar',
      'Priority account management',
    ],
    cta: 'Get Family Plan',
  },
] as const

// ─── Reassurance bar data ─────────────────────────────────────────────────────

const REASSURANCES = [
  { icon: Shield,        label: 'Secure PayPal Payment'   },
  { icon: Zap,           label: 'Active in 15 Minutes'    },
  { icon: MessageCircle, label: 'WhatsApp Support'        },
  { icon: Lock,          label: 'No Contract Required'    },
] as const

// ─── Process steps ────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    icon:        Zap,
    title:       'You Pay',
    description: 'Complete payment via PayPal or crypto',
  },
  {
    icon:        Bell,
    title:       "We're Notified",
    description: 'Instant payment notification to our team',
  },
  {
    icon:        Key,
    title:       'Credentials Created',
    description: 'Your IPTV account generated in our system',
  },
  {
    icon:        MessageCircle,
    title:       'You Receive',
    description: 'Login details sent to your WhatsApp within 15 minutes',
  },
] as const

// ─── Sub-components ───────────────────────────────────────────────────────────

function PricingCard({ plan }: { plan: typeof PLANS[number] }) {
  return (
    <div
      id={plan.id}
      className={clsx(plan.popular && 'md:scale-[1.03] transition-transform duration-500')}
    >
      <motion.div
        className={clsx(
          'glass flex flex-col gap-6 p-8 h-full',
          plan.popular
            ? 'border-[#EF4136]/40 shadow-[0_0_60px_rgba(239,65,54,0.2)]'
            : '',
        )}
        whileHover={{ y: -4 }}
        transition={SPRING}
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs tracking-[0.25em] uppercase text-white/50">
              {plan.name}
            </span>
            {plan.badgeLabel && (
              plan.popular ? (
                <span className="bg-[#EF4136] text-white text-xs font-bold tracking-wider px-3 py-1 rounded-full">
                  {plan.badgeLabel}
                </span>
              ) : (
                <Badge variant="hot">{plan.badgeLabel}</Badge>
              )
            )}
          </div>
          <p className="text-xs text-white/40 font-ui">{plan.tagline}</p>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-5xl md:text-6xl font-bold text-white">
              {plan.price}
            </span>
            <span className="text-sm text-white/40">{plan.period}</span>
          </div>
          {plan.perMonth && (
            <p className="text-sm text-[#EF4136] font-mono mt-1">{plan.perMonth}</p>
          )}
        </div>

        <div className="h-px bg-white/10" />

        {/* Feature list */}
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-xs tracking-[0.15em] uppercase text-white/30 font-ui mb-1">
            What&apos;s included
          </p>
          <ul className="flex flex-col gap-2.5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check size={14} className="text-[#EF4136] mt-0.5 shrink-0" aria-hidden />
                <span className="text-sm text-white/70 leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Link href="/free-trial/" className="w-full mt-auto">
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

// ─── Payment card ─────────────────────────────────────────────────────────────

interface PaymentCardProps {
  icon:        React.ReactNode
  title:       string
  description: string
  steps:       readonly string[]
  ctaLabel:    string
  ctaHref:     string
  ctaExternal: boolean
  accentClass: string
}

function PaymentCard({
  icon, title, description, steps, ctaLabel, ctaHref, ctaExternal, accentClass,
}: PaymentCardProps) {
  return (
    <motion.div
      className="glass flex flex-col gap-6 p-8 h-full"
      variants={fadeUp}
    >
      {/* Icon + title */}
      <div className="flex items-center gap-4">
        <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center', accentClass)}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-display text-white">{title}</h3>
        </div>
      </div>

      <p className="text-sm text-white/50 leading-relaxed">{description}</p>

      {/* Steps */}
      <ol className="flex flex-col gap-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[10px] font-mono font-bold text-white/60">{i + 1}</span>
            </span>
            <span className="text-sm text-white/60 leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-auto">
        {ctaExternal ? (
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="ghost" className="w-full justify-center">
              {ctaLabel}
            </Button>
          </a>
        ) : (
          <Link href={ctaHref}>
            <Button variant="ghost" className="w-full justify-center">
              {ctaLabel}
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  )
}

// ─── FAQ accordion item ───────────────────────────────────────────────────────

function FAQItem({ item, isOpen, onToggle }: {
  item:     FaqItem
  isOpen:   boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-white/80 group-hover:text-white transition-colors duration-200 leading-snug">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-white/40" aria-hidden />
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
            <p className="text-sm text-white/50 leading-relaxed pb-5 pr-8">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export function PlansPage({ faqItems }: PlansPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#08090D] pt-32 pb-20">
        <div className="container-site">

          {/* ── Page header ─────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-display text-white leading-tight mb-4">
              IPTV UK{' '}
              <span className="text-gradient">Subscription Plans</span>
            </h1>
            <p className="text-white/60 text-lg mt-4 max-w-xl mx-auto">
              No contracts. No hidden fees. Instant activation. Cancel anytime.
            </p>

            {/* Reassurance bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              {REASSURANCES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-2 text-sm text-white/50"
                >
                  <Icon className="w-4 h-4 text-[#EF4136]" aria-hidden />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Pricing cards ────────────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <PricingCard plan={plan} />
              </motion.div>
            ))}
          </motion.div>

          {/* ── Payment section ──────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="mt-20"
          >
            <h2 className="text-3xl font-display text-white text-center mb-12">
              How to Complete Your{' '}
              <span className="text-gradient">Purchase</span>
            </h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <PaymentCard
                icon={<CreditCard className="w-6 h-6 text-[#EF4136]" aria-hidden />}
                accentClass="bg-[#EF4136]/10 border border-[#EF4136]/25"
                title="Pay with PayPal"
                description="Secure payment via PayPal. Credit and debit cards accepted — no PayPal account needed."
                steps={[
                  'Choose your plan above',
                  'Click the plan CTA button',
                  'Complete payment on PayPal\'s secure page',
                  'Message us on WhatsApp with your payment confirmation',
                ]}
                ctaLabel="Pay via PayPal"
                ctaHref="https://paypal.me/iptvuk"
                ctaExternal={true}
              />
              <PaymentCard
                icon={<Coins className="w-6 h-6 text-[#F7931A]" aria-hidden />}
                accentClass="bg-[#F7931A]/10 border border-[#F7931A]/25"
                title="Pay with Crypto"
                description="Bitcoin, Ethereum, USDT, Litecoin and 50+ coins accepted via NOWPayments."
                steps={[
                  'Choose your plan above',
                  'Click the plan CTA button',
                  'Complete crypto payment on NOWPayments',
                  'Message us on WhatsApp with your transaction ID',
                ]}
                ctaLabel="Pay with Crypto"
                ctaHref="#"
                ctaExternal={false}
              />
            </motion.div>
          </motion.div>

          {/* ── Process timeline ─────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="mt-20"
          >
            <h2 className="text-3xl font-display text-white text-center mb-12">
              What Happens{' '}
              <span className="text-gradient">After Payment</span>
            </h2>

            {/* Steps */}
            <div className="relative">
              {/* Connecting dotted line — desktop only */}
              <div
                className="hidden md:block absolute top-8 h-px border-t-2 border-dashed border-white/10 pointer-events-none"
                style={{ left: '12.5%', right: '12.5%' }}
                aria-hidden
              />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {PROCESS_STEPS.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={step.title}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={defaultViewport}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col items-center text-center gap-3"
                    >
                      <span className="font-mono text-4xl font-bold text-[#EF4136] leading-none z-10 bg-[#08090D] px-2">
                        {i + 1}
                      </span>
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#EF4136]" aria-hidden />
                      </div>
                      <h3 className="text-base font-semibold text-white">{step.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* ── FAQ accordion ────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="mt-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-display text-white text-center mb-10">
              Frequently Asked{' '}
              <span className="text-gradient">Questions</span>
            </h2>

            <div className="flex flex-col">
              {faqItems.map((item, i) => (
                <FAQItem
                  key={i}
                  item={item}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>

            {/* CTA below FAQ */}
            <div className="text-center mt-10 text-white/30 text-sm">
              Still have questions?{' '}
              <Link
                href="/free-trial/"
                className="text-[#EF4136] hover:text-[#EF4136]/80 transition-colors duration-200"
              >
                Grab a free trial first →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
