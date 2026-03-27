'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { fadeUp, defaultViewport } from '@/lib/animations'

// ─── Link data ────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: 'Home',        href: '/'             },
  { label: 'Features',    href: '/#features'    },
  { label: 'Channels',    href: '/channels/'    },
  { label: 'Pricing',     href: '/plans/'       },
  { label: 'Setup Guide', href: '/setup-guide/' },
] as const

const SUPPORT_LINKS = [
  { label: 'Free Trial',       href: '/free-trial/' },
  { label: 'WhatsApp Support', href: '/contact/'    },
  { label: 'FAQ',              href: '/faq/'        },
  { label: 'Contact',          href: '/contact/'    },
] as const

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   href: '/privacy-policy/'   },
  { label: 'Terms of Service', href: '/terms-of-service/' },
  { label: 'Refund Policy',    href: '/refund-policy/'    },
] as const

// ─── Sub-components ───────────────────────────────────────────────────────────

function FooterLinkList({ links }: { links: readonly { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-3" role="list">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer
      className="relative bg-[var(--color-bg-base)] border-t border-white/10 pt-16 pb-8"
      aria-label="Site footer"
    >
      {/* Subtle top gradient line */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#EF4136]/30 to-transparent"
        aria-hidden
      />

      <div className="container-site">

        {/* ── 4-column grid ──────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        >

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3" aria-label="IPTV UK — home">
              <Image
                src="/logo.png"
                alt="IPTV UK logo"
                width={32}
                height={32}
                loading="lazy"
                className="rounded-lg"
              />
              <span className="font-display text-xl text-[var(--color-text-primary)] leading-none">
                IPTV UK
              </span>
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs">
              The UK&apos;s best IPTV subscription service. Stream more, pay less.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4 font-semibold font-ui">
              Quick Links
            </h3>
            <FooterLinkList links={QUICK_LINKS} />
          </div>

          {/* Column 3 — Support */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4 font-semibold font-ui">
              Support
            </h3>
            <FooterLinkList links={SUPPORT_LINKS} />
          </div>

          {/* Column 4 — Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4 font-semibold font-ui">
              Legal
            </h3>
            <FooterLinkList links={LEGAL_LINKS} />
          </div>

        </motion.div>

        {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-text-muted)] text-center sm:text-left">
            © 2026 iptvuksubscription.uk · All rights reserved · Serving the UK
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Built for UK viewers
          </p>
        </div>

      </div>
    </footer>
  )
}
