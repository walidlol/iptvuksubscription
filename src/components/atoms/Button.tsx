'use client'

import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import type { LucideIcon } from 'lucide-react'
import { SPRING } from '@/lib/animations'

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'ghost' | 'outline'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?:      ButtonVariant
  size?:         ButtonSize
  /** Lucide icon component rendered beside the label */
  icon?:         LucideIcon
  iconPosition?: 'left' | 'right'
  children:      React.ReactNode
  className?:    string
  onClick?:      React.MouseEventHandler<HTMLButtonElement>
  disabled?:     boolean
  type?:         'button' | 'submit' | 'reset'
  'aria-label'?: string
}

// ─── Style maps ───────────────────────────────────────────────────────────────

const SIZE: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5 rounded-md',
  md: 'px-7 py-3 text-[0.9375rem] gap-2 rounded-lg',
  lg: 'px-8 py-4 text-base gap-2.5 rounded-lg',
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--color-accent-red)] text-white font-semibold',
    'border-0',
    'transition-all duration-300',
    'hover:brightness-110',
  ].join(' '),
  ghost: [
    'bg-transparent text-[var(--color-text-primary)] font-medium',
    'border border-white/25',
    'transition-all duration-300',
    'hover:border-white/60 hover:bg-white/[0.06]',
  ].join(' '),
  outline: [
    'bg-transparent text-[var(--color-accent-red)] font-medium',
    'border border-[var(--color-accent-red)]',
    'transition-all duration-300',
    'hover:bg-[var(--color-accent-red)]/10',
  ].join(' '),
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Button({
  variant       = 'primary',
  size          = 'md',
  icon: Icon,
  iconPosition  = 'left',
  children,
  className,
  onClick,
  disabled      = false,
  type          = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center cursor-pointer',
        VARIANT[variant],
        SIZE[size],
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className,
      )}
      whileHover={
        disabled
          ? undefined
          : variant === 'primary'
          ? { scale: 1.02, y: -2, boxShadow: '0 0 32px 8px rgba(239,65,54,0.4)' }
          : { scale: 1.02, y: -2 }
      }
      whileTap={disabled ? undefined : { scale: 0.98 }}
      initial={{ boxShadow: '0 0 0 0 rgba(239,65,54,0)' }}
      transition={SPRING}
    >
      {Icon && iconPosition === 'left'  && <Icon size={18} aria-hidden />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} aria-hidden />}
    </motion.button>
  )
}
