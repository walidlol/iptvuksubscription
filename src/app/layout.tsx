/**
 * layout.tsx — Root application layout
 *
 * CLAUDE.md §6 Technical Standards:
 *   ✓ next/font for all typefaces (zero layout shift)
 *   ✓ data-theme="dark" default on <html>
 *   ✓ generateMetadata() targeting "iptv uk"
 *   ✓ WebSite JSON-LD injected globally
 *   ✓ Children wrapped in .noise div
 *   ✓ Tawk.to placeholder (set env vars to activate)
 *
 * CLAUDE.md §5: All third-party scripts must be deferred or lazy-loaded.
 */

import type { Metadata, Viewport } from 'next'
import {
  DM_Serif_Display,
  Inter,
  JetBrains_Mono,
  Geist,
} from 'next/font/google'
import Script from 'next/script'

import './globals.css'
import { rootMetadata }                        from '@/lib/seo'
import { generateWebsiteSchema, schemaToString } from '@/lib/schema'

// ─── Font loading ─────────────────────────────────────────────────────────────

const dmSerifDisplay = DM_Serif_Display({
  weight:    ['400'],
  style:     ['normal', 'italic'],
  subsets:   ['latin'],
  variable:  '--font-dm-serif-display',   // consumed by @theme inline in globals.css
  display:   'swap',
  preload:   true,
})

const inter = Inter({
  subsets:   ['latin'],
  variable:  '--font-inter',
  display:   'swap',
  preload:   true,
  axes:      ['opsz'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets:   ['latin'],
  variable:  '--font-jetbrains-mono',
  display:   'swap',
  preload:   false,   // non-critical — deferred
})

const geist = Geist({
  subsets:   ['latin'],
  variable:  '--font-geist',
  display:   'swap',
  preload:   false,
})

// ─── Metadata — targets "iptv uk" (CLAUDE.md §2 SEO Build Order: homepage first)

export const metadata: Metadata = rootMetadata

// ─── Viewport (Next.js 14+ splits this from Metadata) ────────────────────────

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#08090D' },
    { media: '(prefers-color-scheme: light)', color: '#F4F6FB' },
  ],
  width:        'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme:  'dark light',
}

// ─── Global JSON-LD (generated once at build time) ───────────────────────────

const websiteJsonLd = schemaToString(generateWebsiteSchema())

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-GB"
      /**
       * data-theme="dark" — default theme per CLAUDE.md §3 "Dark Mode Default".
       *
       * To add a toggle: build a ThemeProvider client component (Phase 3 Navbar)
       * that reads localStorage('theme') on mount, falls back to
       * prefers-color-scheme, then sets document.documentElement.dataset.theme.
       * suppressHydrationWarning prevents React from complaining when the
       * client-side theme differs from the server render.
       */
      data-theme="dark"
      suppressHydrationWarning
      className={[
        dmSerifDisplay.variable,   // --font-dm-serif-display
        inter.variable,            // --font-inter
        jetbrainsMono.variable,    // --font-jetbrains-mono
        geist.variable,            // --font-geist
      ].join(' ')}
    >
      <head>
        {/* Preconnect to Google Fonts (CDN @import in globals.css) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* WebSite structured data — present on every page via root layout */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteJsonLd }}
        />
      </head>

      <body className="bg-[var(--color-bg-base)] text-[var(--color-text-primary)] antialiased">
        {/*
         * .noise wraps every page — provides the SVG fractal mesh texture
         * defined in globals.css (.noise::after pseudo-element).
         * Children sit above it via z-index (z-1 from .noise > * rule).
         * CLAUDE.md §3 Z-Axis: z-0 = noise layer.
         */}
        <div className="noise min-h-dvh flex flex-col">
          {children}
        </div>

        {/*
         * ── Tawk.to Live Chat ──────────────────────────────────────────
         * CLAUDE.md §11B: 100% free live chat, lazyOnload so it never
         * blocks FCP or LCP scores.
         *
         * To activate:
         *   1. Sign up at https://tawk.to
         *   2. Create a property and copy your Property ID + Widget ID
         *   3. Add to .env.local:
         *        NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
         *        NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
         *   4. Deploy — the script tag below auto-activates.
         */}
        {process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID &&
          process.env.NEXT_PUBLIC_TAWK_WIDGET_ID && (
            <Script id="tawk-to" strategy="lazyOnload">
              {`
                var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
                (function(){
                  var s1 = document.createElement("script"),
                      s0 = document.getElementsByTagName("script")[0];
                  s1.async = true;
                  s1.src = 'https://embed.tawk.to/${process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}/${process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}';
                  s1.charset = 'UTF-8';
                  s1.setAttribute('crossorigin', '*');
                  s0.parentNode.insertBefore(s1, s0);
                })();
              `}
            </Script>
          )}
      </body>
    </html>
  )
}
