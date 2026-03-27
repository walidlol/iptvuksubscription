'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'

import { fadeDown, SPRING } from '@/lib/animations'

// ─── Nav link data ────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Features',    href: '/#features'    },
  { label: 'Channels',    href: '/channels/'    },
  { label: 'Pricing',     href: '/#pricing'     },
  { label: 'Setup Guide', href: '/setup-guide/' },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { scrollY } = useScroll()

  // ── Scroll detection (50px threshold) ────────────────────────────────────
  useMotionValueEvent(scrollY, 'change', (y) => {
    setIsScrolled(y > 50)
  })

  // ── Close mobile menu on viewport resize ────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      {/* ── Main navbar bar ──────────────────────────────────────────────────── */}
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-[40] transition-all duration-300',
          isScrolled
            ? 'backdrop-blur-md bg-black/60 border-b border-white/10'
            : 'bg-transparent border-b border-transparent',
        )}
        aria-label="Main navigation"
      >
        <div className="container-site flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="IPTV UK Subscription Logo"
              width={36}
              height={36}
              priority
              className="rounded-sm"
            />
            <span style={{ fontFamily: 'var(--font-display)' }} className="text-white text-xl font-normal">
              IPTV UK
            </span>
          </Link>

          {/* ── Desktop nav links ─────────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Free Trial — red outlined pill */}
            <li>
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={SPRING}
              >
                <Link
                  href="/free-trial/"
                  className={clsx(
                    'inline-flex items-center px-4 py-1.5 rounded-full',
                    'text-xs font-semibold text-[var(--color-accent-red)]',
                    'border border-[var(--color-accent-red)]',
                    'transition-all duration-200',
                    'hover:bg-[var(--color-accent-red)]/10',
                  )}
                >
                  Free Trial
                </Link>
              </motion.div>
            </li>
          </ul>

          {/* ── Mobile: hamburger only ────────────────────────────────────── */}
          <div className="flex md:hidden">
            <motion.button
              onClick={() => setMobileOpen((o) => !o)}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-[var(--color-text-primary)]"
              whileTap={{ scale: 0.95 }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={20} aria-hidden />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={20} aria-hidden />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ── Mobile slide-down drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-16 left-0 right-0 z-[39] backdrop-blur-md bg-black/80 border-b border-white/10"
          >
            <nav className="container-site py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-base font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04] rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Free Trial — full-width red pill on mobile */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link
                  href="/free-trial/"
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'flex items-center justify-center w-full px-6 py-3 rounded-full',
                    'text-base font-semibold text-[var(--color-accent-red)]',
                    'border border-[var(--color-accent-red)]',
                  )}
                >
                  Get Free Trial
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
