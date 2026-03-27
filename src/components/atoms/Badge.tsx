'use client'

import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { fadeUp } from '@/lib/animations'

// ─── Types ────────────────────────────────────────────────────────────────────

type BadgeVariant = 'neutral' | 'popular' | 'hot' | 'sale'

interface BadgeProps {
  variant?:   BadgeVariant
  children:   React.ReactNode
  className?: string
}

// ─── Style map ────────────────────────────────────────────────────────────────

const STYLES: Record<BadgeVariant, string> = {
  neutral: [
    'bg-white/10 text-white',
    'border border-white/20',
  ].join(' '),
  popular: [
    'bg-[var(--color-accent-red-glow)] text-[var(--color-accent-red)]',
    'border border-[var(--color-accent-red)]/40',
    'animate-[pulse-glow_3s_ease-in-out_infinite]',
  ].join(' '),
  hot: [
    'bg-orange-500/15 text-orange-400',
    'border border-orange-500/30',
  ].join(' '),
  sale: [
    'bg-blue-500/15 text-blue-400',
    'border border-blue-500/30',
  ].join(' '),
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Badge({
  variant   = 'neutral',
  children,
  className,
}: BadgeProps) {
  return (
    <motion.span
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={clsx(
        // Base pill shape
        'inline-flex items-center gap-1 px-2.5 py-0.5',
        'rounded-full text-xs font-semibold tracking-wide uppercase',
        'font-ui select-none',
        STYLES[variant],
        className,
      )}
    >
      {children}
    </motion.span>
  )
}
