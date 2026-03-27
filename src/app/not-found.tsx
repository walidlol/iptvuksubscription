/**
 * 404 Not Found page
 * Rendered automatically by Next.js App Router for unmatched routes.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

import { Navbar } from '@/components/organisms/Navbar'

export const metadata: Metadata = {
  title:  '404 — Page Not Found | IPTV UK Subscription',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#08090D] flex flex-col items-center justify-center px-6 text-center">

        {/* Large 404 */}
        <span
          className="font-mono text-[10rem] font-bold leading-none text-white/5 select-none pointer-events-none"
          aria-hidden
        >
          404
        </span>

        <div className="-mt-10">
          <h1 className="text-4xl md:text-5xl font-display text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-[#EF4136] text-white font-semibold text-[0.9375rem] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_32px_8px_rgba(239,65,54,0.35)]"
            >
              Back to Homepage
            </Link>
            <Link
              href="/plans/"
              className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-transparent text-white font-medium border border-white/25 text-[0.9375rem] transition-all duration-300 hover:border-white/60 hover:bg-white/[0.06]"
            >
              View Plans
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}
