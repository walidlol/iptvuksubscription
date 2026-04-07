# CLAUDE.md — iptvuksubscription.uk
> April 2026 — Liquid Glass design, fresh build.

---

## PROJECT IDENTITY

**Site:** iptvuksubscription.uk
**Business:** Premium IPTV subscription service targeting the UK market
**Goal:** Rank #1 on Google UK for EMD keywords. Deliver a liquid glass, fast, professional experience.
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lenis
**Deployment:** GitHub → Vercel auto-deploy (NEVER Vercel CLI)
**OS:** Windows — PowerShell syntax only
**Design:** Liquid Glass — frosted translucent surfaces, neutral tones, Apple-tier polish. NOT Netflix. NOT generic dark streaming.

---

## TARGET KEYWORDS (EMD)

| Keyword | Volume | Priority |
|---|---|---|
| iptv uk subscription | 12,000–22,000 | Primary |
| iptv uk | 40,000–60,000 | Primary |
| iptv subscription uk | 18,000–30,000 | Primary |

---

## DESIGN SYSTEM — LIQUID GLASS

### Aesthetic
Apple Liquid Glass (iOS 26 style). Frosted translucent cards over cinematic backdrops. Clean, minimal, professional, FAST. No neon, no heavy gradients, no childish icons.

### Colours (Neutral + Glass)
```
--bg-deep:             #08090C
--bg-primary:          #0C0D12
--bg-surface:          #12141A
--bg-glass:            rgba(255,255,255,0.06)
--bg-glass-hover:      rgba(255,255,255,0.10)
--border-glass:        rgba(255,255,255,0.12)
--border-glass-strong: rgba(255,255,255,0.20)
--text-primary:        #F2F2F7
--text-secondary:      #B8B8C0
--text-muted:          #6E6E7A
--accent:              #FFFFFF
--glass-shadow:        0 8px 32px rgba(0,0,0,0.3)
--glass-blur:          blur(20px)
--glass-inner:         inset 0 1px 0 0 rgba(255,255,255,0.15)
```

### NO red as primary. Red only for:
- Live sports badges (small red dot + "LIVE")
- Error states
- Logo icon accent (subtle)

### Glass CSS Pattern
```css
.glass {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.15);
  border-radius: 16px;
}
```

### LiquidGlass Component
Wrapper with SVG distortion filter. Use on: Navbar, pricing cards, CTA buttons, login form, feature cards. Use SPARINGLY — not on every element.

### Typography
- Headings: Bebas Neue — uppercase, letter-spacing 0.04em
- Body/UI: Inter — weight 400/500/600
- Hero H1: clamp(42px, 8vw, 80px)
- Section H2: clamp(28px, 5vw, 48px)
- Body: 15px, line-height 1.6

### Icons
- lucide-react ONLY — Monitor, Laptop, Smartphone, Tv, Wifi, Shield, Zap, Globe, etc.
- NO childish/cartoon icons ever

### Animations (Framer Motion)
- Page load: staggered fade-up (0.1s intervals)
- Scroll: whileInView fade-up on sections
- Cards: hover scale 1.03 + translateY(-4px) + glass brighten
- Buttons: hover scale 1.02 + glow increase
- Hero H1: NO delay — LCP element
- Respect prefers-reduced-motion

### Cursor
- Default system cursor — no custom cursor (performance)

---

## CONTENT — THREE EQUAL PILLARS

### 1. LIVE SPORTS (HIGH PRIORITY)
- Premier League fixtures via football-data.org
- Match cards: team crests, scores, kickoff times, "LIVE" red dot
- Channel list: Sky Sports, TNT Sports, BT Sport, BBC Sport
- Env: `FOOTBALL_DATA_API_KEY`

### 2. UK & WORLD NEWS
- Trending headlines via NewsAPI
- Cards: thumbnail, headline, source, time
- Channels: BBC News, Sky News, ITV News, CNN, Al Jazeera
- Env: `NEWS_API_KEY`

### 3. MOVIES & TV
- TMDB trending posters/backdrops
- Rows: Movies, UK Drama, Kids, International
- Env: `TMDB_API_KEY`, `TMDB_READ_ACCESS_TOKEN`

---

## NAVBAR — ALWAYS GLASS

Not transparent-then-blur. Glass from the start. Always visible over hero.
```
Position: fixed top
Background: rgba(12,13,18,0.7) + backdrop-filter blur(20px)
Border-bottom: 1px solid rgba(255,255,255,0.08)
Logo left · nav links center (Inter 14px 500) · glass CTA right
Mobile: hamburger → slide-in glass drawer
Links: Home, Plans, Channels*, Setup*, FAQ, Blog (* gated)
```

---

## LOGIN PAGE — VIDEO BACKGROUND

- Full-screen looping video (compressed WebM, max 1.5MB)
- Source: user's MP4 at `C:\Users\hp\Desktop\top-movies-and-tv-shows-2026-oscars.mp4`
- Compress: `ffmpeg -i input.mp4 -vcodec libvpx-vp9 -b:v 500k -vf "scale=1280:-1" -an -t 15 -r 24 public/login-bg.webm`
- Fallback: copy MP4 directly, lazy-load with preload="none"
- Dark overlay rgba(0,0,0,0.6) over video
- Centered LiquidGlass card: logo, tagline, phone input, OTP input, glass submit button
- Video: autoplay, muted, loop, playsInline

---

## DEVICE SECTION

"Watch on Any Device, Anywhere" heading.
4 glass cards with lucide-react icons:
- Smart TV (Tv icon): Samsung, LG, Sony, Android TV
- Computer (Monitor icon): Windows, macOS, Chrome
- Mobile & Tablet (Smartphone icon): iOS, Android, Fire Tablet
- Streaming Devices (Wifi icon): Firestick, Roku, Apple TV, MAG Box, Chromecast

---

## HOMEPAGE SECTIONS (exact order)

1. **HERO** — TMDB backdrop, gradient, H1, glass CTAs, trust line
2. **STATS BAR** — 30,000+ Channels · 100,000+ Subs · 99.9% Uptime · 4K
3. **LIVE SPORTS** — Premier League fixtures, glass match cards
4. **CONTENT ROWS** — 4 TMDB rows: Movies, UK Drama, Kids, International
5. **UK NEWS** — NewsAPI cards, thumbnail + headline
6. **PRICING** — 3 glass cards: £9.99/mo · £59/yr · £129.99/yr family
7. **DEVICES** — 4 glass device cards with lucide icons
8. **FAQ** — 6 questions, glass accordion, FAQPage schema
9. **FINAL CTA** — glass button, "Start Watching Today"
10. **FOOTER** — 4-column, glass top border

---

## GATED PAGES (WhatsApp Auth)

1. User clicks gated link → `/login`
2. Video bg + glass form: phone input → OTP
3. MVP: code shown on screen, user sends to WhatsApp to verify
4. JWT cookie (7 days, httpOnly, secure)
5. middleware.ts checks on: /channels, /setup-guide, /plans/advanced

---

## PAYMENTS

Primary: WhatsApp glass CTA → wa.me pre-filled message
Secondary: NOWPayments crypto (BTC/USDT/ETH) in glass modal
Env: `NOWPAYMENTS_API_KEY`

---

## ENVIRONMENT VARIABLES (.env.local)

```
TMDB_API_KEY=
TMDB_READ_ACCESS_TOKEN=
FOOTBALL_DATA_API_KEY=
NEWS_API_KEY=
NOWPAYMENTS_API_KEY=
NOWPAYMENTS_IPN_SECRET=
AUTH_SECRET=
NEXT_PUBLIC_WHATSAPP_NUMBER=212762151824
NEXT_PUBLIC_SITE_URL=https://iptvuksubscription.uk
WHATSAPP_BUSINESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
```

Generate AUTH_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## SEO — TOP 200 FACTORS

### Domain: EMD exact match, keyword first, .uk TLD
### Page-Level: keyword in title (front-loaded), H1, meta desc, first 100 words. Content: homepage 2500+, FAQ 2500+, blog 1500+, pricing 600-800 MAX. LSI: "live TV", "UK channels", "Sky Sports", "Premier League", "streaming". Images: descriptive alt, WebP/AVIF, explicit dimensions. CWV: LCP <2.5s, CLS <0.1, INP <200ms.
### Site-Level: contact page, SSL, breadcrumbs, sitemap, mobile-first, legal pages
### Schema: WebSite, Organization, BreadcrumbList (all pages). Service, AggregateRating (home). Offer (pricing). FAQPage (faq). Article (blog). HowTo (setup).
### Internal links: keyword-rich anchors, never "click here"

---

## FILE STRUCTURE

```
src/
├── app/
│   ├── layout.tsx · page.tsx
│   ├── pricing/ · faq/ · blog/ · blog/[slug]/ · contact/
│   ├── login/                  ← video bg + glass form
│   ├── channels/               ← GATED
│   ├── setup-guide/            ← GATED
│   ├── plans/advanced/         ← GATED
│   ├── privacy-policy/ · terms/ · refund-policy/
│   └── api/auth/ · api/payment/
├── components/
│   ├── layout/ (Navbar, Footer, MobileMenu)
│   ├── home/ (Hero, ContentRow, LiveSports, NewsSection, PricingCards, DeviceSection, FAQSection, StatsBar)
│   ├── ui/ (LiquidGlass, GlassButton, GlassCard, WhatsAppButton, PosterCard, Skeleton)
│   ├── auth/ (LoginForm)
│   └── SmoothScroll.tsx
├── lib/ (tmdb.ts, football.ts, news.ts, wa.ts, auth.ts, schema.ts)
├── middleware.ts
└── styles/globals.css
```

---

## SKILLS

| Skill | When |
|---|---|
| frontend-patterns | Components |
| seo, seo-audit, seo-schema, seo-content, seo-technical, seo-sitemap | SEO work |

### MCP: context7 (docs), superpowers (planning), playwright (screenshots), github (push)
### Tool Usage: On-Demand Only. No Auto-Push. No Auto-Screenshot.

---

## DO NOT

- Use red as primary accent — white/glass only
- Use childish icons — lucide-react only
- Use custom cursor
- Make navbar transparent at top — always glass
- Use anime.js — Framer Motion only
- Use `<img>` (except NewsAPI)
- Delay hero H1 — LCP element
- Keyword stuff
- Commit .env.local
- Use Vercel CLI
- Stack same-bg sections adjacent
- Exceed 800 words on pricing page

---

## LEARNED — CODE

- `bg-bg-elevated`, `bg-bg-elevated/50`, `border-border`, `bg-border`, `shadow-brand-glow`, `border-brand-red` — none exist in tailwind.config.ts. Use inline rgba values instead.
- Opacity modifiers (`/50`) don't work with CSS variable colors in Tailwind — always use inline `rgba()`.
- FAQPage schema must live in a server component (`@graph` in `buildHomepageSchema`), not a "use client" component.
- Blog post content stored as `BlogSection[]` arrays (not raw HTML) → safe server-side render without `dangerouslySetInnerHTML`.
- `generateStaticParams` in `blog/[slug]/page.tsx` pulls slugs from `BLOG_POSTS` in `src/data/blogPosts.ts`.
- Auth accepts UK phone numbers (+44) for subscribers. Business WhatsApp is Moroccan (+212 762 151 824). These are separate concerns.
- `CinematicShapes` has a `subtle` prop (scales opacity to 55%) — use `subtle` on inner pages, omit on homepage hero.
- `normalizeUKPhone` in `api/auth/verify/route.ts` handles: `+44XXXXXXXXXX`, `07XXXXXXXXX`, `7XXXXXXXXX` formats.
- `whileInView` animations require `viewport={{ once: true }}` to fire only once on scroll.
- `BLOG_POSTS` imported in `sitemap.ts` to dynamically include all blog post URLs.
- `"use client"` pages CANNOT export `metadata`. Split into server page.tsx (metadata) + client FAQContent.tsx (accordion). Applied to FAQ page.
- `crests.football-data.org` images must use `unoptimized` on Next.js `<Image>` — CDN blocks server-side image proxy.
- NewsAPI free tier blocks server-side requests from production (only allows localhost) — always falls back to `FALLBACK_ARTICLES` in prod.
- `ScrollProgress` uses `useScroll` + `useSpring` from framer-motion — 2px white/40 bar fixed at top z-[100].
- `@vercel/analytics` added as `<Analytics />` in layout.tsx body — tracks page views automatically on Vercel.
- NOWPayments crypto integration: `POST /api/payment/create` creates invoice via NOWPayments API, returns `invoiceUrl`. `POST /api/payment/webhook` receives IPN callbacks with HMAC-SHA512 verification.
- `CryptoPayButtons` client component in `src/components/pricing/` — 3 plan buttons that call `/api/payment/create` and redirect to NOWPayments hosted checkout.
- Auth route (`api/auth/verify`) supports dual-mode OTP: if `WHATSAPP_BUSINESS_TOKEN` + `WHATSAPP_PHONE_NUMBER_ID` are set, sends OTP via WhatsApp Business Cloud API; otherwise falls back to MVP (code shown on screen).
- `LoginForm` handles `whatsapp_sent` flag — shows "Code sent to your WhatsApp" when API mode active, shows code on screen in MVP fallback.
- `.env.local` requires `NOWPAYMENTS_IPN_SECRET` for webhook signature verification (from NOWPayments dashboard → Settings → IPN).

## LEARNED — SEO

- Sitemap now includes: homepage (1.0), pricing (0.9), faq (0.85), blog index (0.8), contact (0.7), blog posts (0.75 each), legal pages (0.3).
- `generateMetadata` in `blog/[slug]/page.tsx` sets `openGraph.type: "article"` and `publishedTime` for blog posts.
- Legal pages (privacy-policy, terms, refund-policy) have `robots: { index: false, follow: false }` — correct, should not be indexed.
- Setup guide and channels pages also noindex (gated content).
- `llms.txt` at `/public/llms.txt` provides AI crawler context — updated with 100,000+ VODs and Moroccan business number.
- FAQPage JSON-LD in `buildHomepageSchema()` @graph covers homepage FAQ (6 questions). Separate FAQPage schema in `faq/page.tsx` for the full 18-question FAQ page.
- OG image auto-generated at `/opengraph-image` via `src/app/opengraph-image.tsx` using Next.js ImageResponse (1200×630).
- Every public page must have: metadata (title, description), canonical, OG (title, description, url, images), Twitter card. Verify after every new page.
- FAQ page required server/client split to export metadata — `"use client"` pages cannot have `export const metadata`.
- All public pages now have JSON-LD schema: homepage (@graph with WebSite, Org, Service, FAQ), pricing (BreadcrumbList + 3 Offers), FAQ (BreadcrumbList + FAQPage), blog index (BreadcrumbList), blog/[slug] (BreadcrumbList + BlogPosting), setup-guide (BreadcrumbList + HowTo), contact (BreadcrumbList).
- `robots.ts` allows GPTBot, ClaudeBot, Google-Extended; blocks `/api/` and `/login`.

## LEARNED — DESIGN

- Glass CSS pattern: `rgba(255,255,255,0.06)` bg + `backdrop-filter: blur(20px)` + `rgba(255,255,255,0.12)` border + `0 8px 32px rgba(0,0,0,0.3)` shadow + `inset 0 1px 0 0 rgba(255,255,255,0.15)` sheen.
- Cinematic gradient: `linear-gradient(to top left, #183949 0%, #040405 65%)` — Tailwind class `bg-cinematic`.
- `CinematicShapes` component: 3 blur orbs + 3 rotating rings + 2 diagonal hairlines. Uses `useReducedMotion()`.
- Logo: `public/logo.svg` (full horizontal) + `public/logo-icon.svg` (icon mark). Broadcast signal icon + Bebas Neue wordmark.
- Red accent (#E8392A) = LIVE badges, logo red dot, error states ONLY. Never as primary accent/background.
- "Annual" plan card uses `border-live` (not `border-brand-red`) + `shadow-glass-hover` + `bg-[rgba(255,255,255,0.08)]`.
- Section background alternation: `bg-cinematic` → `bg-bg-primary` → `bg-bg-surface` → repeat. Never stack same bg.
- News fallback cards use deterministic gradients per source name (e.g., BBC Sport → `from-[#1a2636] to-[#0d1520]`) + Newspaper icon.
- `ScrollProgress` component: 2px white/40 bar at top of viewport, spring-animated — adds polish without distraction.

## LEARNED — AVOID

- `variant="white"` on WhatsAppButton/GlassButton — only accepts "primary"|"secondary"|"ghost".
- `bg-brand-red` as section background — design violation. Red only for small accents.
- `SearchAction` in WebSite schema — site has no search implementation, remove it.
- `/plans` URL — route is `/pricing`. This was a pervasive bug in Navbar (2), Footer (4), PricingCards (1), middleware (1). Always grep `/plans` after changes.
- `/plans/advanced` — this route was never built. Removed from middleware and all links.
- `anime.js` — use Framer Motion only.
- Raw `<img>` tags — use Next.js `<Image>` (exception: NewsAPI thumbnails).
- Custom cursor — not in this design system.
- Vercel CLI — GitHub push only.
- Hardcoded phone number in source — always via `NEXT_PUBLIC_WHATSAPP_NUMBER` env var or `src/lib/wa.ts`.
- `"use client"` on page.tsx that needs metadata — split into server page + client component instead.