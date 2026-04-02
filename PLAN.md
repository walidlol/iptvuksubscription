# PLAN.md — Liquid Glass Homepage Architecture

> Full architecture plan for iptvuksubscription.uk.
> Design: Apple Liquid Glass (iOS 26) — frosted translucent surfaces, neutral tones, white accent.
> Read CLAUDE.md for constraints. Do NOT write code until this plan is approved.

---

## 1. Component Tree (13 components + 3 UI primitives)

```
app/layout.tsx
├── SmoothScroll (client)
├── Navbar (client)
├── {children}
│   └── app/page.tsx (server)
│       ├── Hero (server) → HeroClient (client)
│       ├── StatsBar (client)
│       ├── LiveSports (server) → LiveSportsClient (client)
│       ├── ContentRow x4 (client, inside Suspense)
│       ├── NewsSection (server) → NewsSectionClient (client)
│       ├── PricingCards (client)
│       ├── DeviceSection (server)
│       ├── FAQSection (client)
│       └── FinalCTA (server)
└── Footer (server)

UI Primitives (used across all sections):
├── LiquidGlass (client) — SVG distortion filter wrapper
├── GlassButton (client) — frosted CTA button
└── GlassCard (client) — frosted card surface
```

---

## 2. Props Interfaces

### 2a. UI Primitives

```typescript
// src/components/ui/LiquidGlass.tsx
interface LiquidGlassProps {
  readonly children: React.ReactNode
  readonly className?: string
  readonly as?: React.ElementType        // default: 'div'
  readonly intensity?: 'subtle' | 'medium' | 'strong'  // blur + distortion level
  readonly hover?: boolean               // enable hover brighten effect
  readonly disableFilter?: boolean       // skip SVG distortion, glass CSS only
}

// src/components/ui/GlassButton.tsx
interface GlassButtonProps {
  readonly children: React.ReactNode
  readonly href?: string                 // renders <a> if provided, <button> if not
  readonly onClick?: () => void
  readonly variant?: 'primary' | 'secondary' | 'ghost'
  readonly size?: 'sm' | 'md' | 'lg'
  readonly className?: string
  readonly disabled?: boolean
}

// src/components/ui/GlassCard.tsx
interface GlassCardProps {
  readonly children: React.ReactNode
  readonly className?: string
  readonly hover?: boolean               // scale 1.03 + translateY(-4px) on hover
  readonly padding?: 'sm' | 'md' | 'lg' // 16px / 24px / 32px
}

// src/components/ui/PosterCard.tsx
interface PosterCardProps {
  readonly item: MediaItem
  readonly priority?: boolean
  readonly index: number                 // stagger delay
}

// src/components/ui/WhatsAppButton.tsx
interface WhatsAppButtonProps {
  readonly message: string
  readonly children: React.ReactNode
  readonly variant?: 'primary' | 'secondary'
  readonly size?: 'sm' | 'md' | 'lg'
  readonly className?: string
}

// src/components/ui/Skeleton.tsx
interface SkeletonProps {
  readonly className?: string
}
```

### 2b. Layout Components

```typescript
// src/components/layout/Navbar.tsx — ALWAYS glass, never transparent
// No props — reads nav links from internal constant
// State: mobileOpen (boolean), scrolled (boolean — only for shadow change, NOT for bg)

// src/components/layout/MobileMenu.tsx
interface MobileMenuProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

// src/components/layout/Footer.tsx — No props, static data
interface FooterColumn {
  readonly title: string
  readonly links: readonly { readonly label: string; readonly href: string }[]
}
```

### 2c. Homepage Sections

```typescript
// --- Hero ---
// src/components/home/Hero.tsx (server)
interface HeroProps {
  readonly backdrop: MediaItem
}

// src/components/home/HeroClient.tsx (client)
interface HeroClientProps {
  readonly backdropUrl: string
  readonly title: string
}

// --- Stats Bar ---
interface StatItem {
  readonly label: string
  readonly value: number
  readonly prefix?: string
  readonly suffix?: string
}
// StatsBar uses internal STATS constant, no props

// --- Live Sports ---
// src/components/home/LiveSports.tsx (server)
interface LiveSportsProps {
  readonly matches: readonly Match[]
}

// src/components/home/LiveSportsClient.tsx (client)
interface LiveSportsClientProps {
  readonly matches: readonly Match[]
}

interface Match {
  readonly id: number
  readonly homeTeam: { readonly name: string; readonly crest: string }
  readonly awayTeam: { readonly name: string; readonly crest: string }
  readonly utcDate: string
  readonly status: 'SCHEDULED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED'
  readonly score: {
    readonly fullTime: { readonly home: number | null; readonly away: number | null }
  }
  readonly matchday: number
  readonly competition: { readonly name: string }
}

// --- Content Rows ---
// src/components/home/ContentRow.tsx (client)
interface ContentRowProps {
  readonly title: string
  readonly items: readonly MediaItem[]
  readonly seeAllHref?: string
  readonly priority?: boolean            // first 2 rows load images eagerly
}

// src/components/home/ContentRowServer.tsx (server) — fetches + maps data
// No external props — fetches internally, renders ContentRow instances

// --- News Section ---
// src/components/home/NewsSection.tsx (server)
interface NewsSectionProps {
  readonly articles: readonly NewsArticle[]
}

interface NewsArticle {
  readonly title: string
  readonly description: string | null
  readonly url: string
  readonly urlToImage: string | null
  readonly source: { readonly name: string }
  readonly publishedAt: string
}

// src/components/home/NewsSectionClient.tsx (client)
interface NewsSectionClientProps {
  readonly articles: readonly NewsArticle[]
}

// --- Pricing Cards ---
type PlanInterval = 'monthly' | 'annual' | 'family'

interface PlanFeature {
  readonly text: string
  readonly included: boolean
}

interface Plan {
  readonly id: PlanInterval
  readonly name: string
  readonly price: number
  readonly currency: string
  readonly displayPrice: string
  readonly period: string
  readonly popular: boolean
  readonly features: readonly PlanFeature[]
  readonly whatsappMessage: string
}
// PricingCards uses internal PLANS constant, no props

// --- Device Section ---
interface DeviceCategory {
  readonly icon: 'Tv' | 'Monitor' | 'Smartphone' | 'Wifi'  // lucide-react icon names
  readonly title: string
  readonly devices: readonly string[]
}
// DeviceSection uses internal DEVICE_CATEGORIES constant, no props

// --- FAQ Section ---
interface FAQItem {
  readonly question: string
  readonly answer: string
}
// FAQSection uses internal FAQ_ITEMS constant, no props

// --- Final CTA ---
// No props — static glass CTA block
```

### 2d. Shared Types (`src/lib/types.ts`)

```typescript
// TMDB normalized shape used by all components
interface MediaItem {
  readonly id: number
  readonly title: string
  readonly posterUrl: string | null
  readonly backdropUrl: string | null
  readonly overview: string
  readonly rating: number
  readonly year: string
  readonly mediaType: 'movie' | 'tv'
}
```

---

## 3. Server vs Client Component Map

| Component | Type | Reason |
|---|---|---|
| `page.tsx` | **Server** | Orchestrates data fetching, passes to children |
| `Hero.tsx` | **Server** | Renders `<Image>` with priority for LCP |
| `HeroClient.tsx` | **Client** | CTA button animations |
| `StatsBar.tsx` | **Client** | Count-up animation with whileInView |
| `LiveSports.tsx` | **Server** | Fetches football-data.org, wraps client |
| `LiveSportsClient.tsx` | **Client** | Match card animations, live dot pulse |
| `ContentRow.tsx` | **Client** | Horizontal drag scroll, stagger animations |
| `ContentRowServer.tsx` | **Server** | Fetches TMDB, renders multiple ContentRow |
| `NewsSection.tsx` | **Server** | Fetches NewsAPI, wraps client |
| `NewsSectionClient.tsx` | **Client** | Card hover animations |
| `PricingCards.tsx` | **Client** | Hover lift, glass effects |
| `DeviceSection.tsx` | **Server** | Static glass cards, no JS needed |
| `FAQSection.tsx` | **Client** | Accordion open/close state |
| `FinalCTA.tsx` | **Server** | Static glass CTA |
| `Navbar.tsx` | **Client** | Scroll listener, mobile menu toggle |
| `MobileMenu.tsx` | **Client** | AnimatePresence slide-in |
| `Footer.tsx` | **Server** | Static links |
| `SmoothScroll.tsx` | **Client** | Lenis init/destroy lifecycle |
| `LiquidGlass.tsx` | **Client** | SVG filter requires DOM ref |
| `GlassButton.tsx` | **Client** | Hover animation |
| `GlassCard.tsx` | **Client** | Hover animation |
| `PosterCard.tsx` | **Client** | Hover scale animation |

---

## 4. Data Fetching Strategy

### 4a. TMDB API (`src/lib/tmdb.ts`)

**Base config:**
```
URL: https://api.themoviedb.org/3
Auth: Bearer ${TMDB_READ_ACCESS_TOKEN}
Cache: next: { revalidate: 3600 }
```

| Function | Endpoint | Query Params |
|---|---|---|
| `fetchHeroBackdrop()` | `GET /trending/all/day` | `language=en-GB&page=1` — pick first with backdrop |
| `fetchTrendingMovies()` | `GET /trending/movie/week` | `language=en-GB&page=1` |
| `fetchUKDrama()` | `GET /discover/tv` | `with_genres=18&with_origin_country=GB&language=en-GB&sort_by=popularity.desc` |
| `fetchKidsContent()` | `GET /discover/movie` | `with_genres=16&certification_country=GB&certification.lte=PG&language=en-GB&sort_by=popularity.desc` |
| `fetchInternational()` | `GET /trending/tv/week` | `language=en-GB&page=1` |

All return `Promise<readonly MediaItem[]>`. Internal normalizer maps TMDB response to `MediaItem`.

**Image URL builders:**
```
posterUrl(path) → https://image.tmdb.org/t/p/w500{path} | null
backdropUrl(path) → https://image.tmdb.org/t/p/original{path} | null
```

### 4b. Football Data API (`src/lib/football.ts`)

**Base config:**
```
URL: https://api.football-data.org/v4
Auth: X-Auth-Token: ${FOOTBALL_DATA_API_KEY}
Cache: next: { revalidate: 300 } (5 min — matches change frequently)
```

| Function | Endpoint | Notes |
|---|---|---|
| `fetchPremierLeagueMatches()` | `GET /competitions/PL/matches` | `status=SCHEDULED,LIVE,IN_PLAY&limit=6` |
| `fetchLiveMatches()` | `GET /competitions/PL/matches` | `status=LIVE,IN_PLAY` |

Returns `Promise<readonly Match[]>`. Team crests from `team.crest` URL (SVG from football-data.org CDN).

**Free tier limits:** 10 requests/minute. 5-min revalidation is safe.

### 4c. NewsAPI (`src/lib/news.ts`)

**Base config:**
```
URL: https://newsapi.org/v2
Auth: apiKey query param: ${NEWS_API_KEY}
Cache: next: { revalidate: 1800 } (30 min)
```

| Function | Endpoint | Query Params |
|---|---|---|
| `fetchUKHeadlines()` | `GET /top-headlines` | `country=gb&category=general&pageSize=8` |

Returns `Promise<readonly NewsArticle[]>`.

**Note:** NewsAPI images are external URLs — use raw `<img>` with lazy loading (per CLAUDE.md exception). Cannot use `<Image>` because domains are unpredictable.

### 4d. Homepage Data Orchestration (`page.tsx`)

```typescript
// All fetches in parallel
const [hero, movies, ukDrama, kids, international, matches, articles] = await Promise.all([
  fetchHeroBackdrop(),
  fetchTrendingMovies(),
  fetchUKDrama(),
  fetchKidsContent(),
  fetchInternational(),
  fetchPremierLeagueMatches(),
  fetchUKHeadlines(),
])
```

**Error handling:** Each fetch wrapped in try/catch, returns empty array on failure. Hero fallback: CSS gradient. Sections with empty data render nothing (no broken UI).

---

## 5. Tailwind Theme — Glass Colour System

### 5a. CSS Variables (`globals.css`)

```css
:root {
  /* Backgrounds */
  --bg-deep:             #08090C;
  --bg-primary:          #0C0D12;
  --bg-surface:          #12141A;

  /* Glass */
  --bg-glass:            rgba(255,255,255,0.06);
  --bg-glass-hover:      rgba(255,255,255,0.10);
  --border-glass:        rgba(255,255,255,0.12);
  --border-glass-strong: rgba(255,255,255,0.20);

  /* Text */
  --text-primary:        #F2F2F7;
  --text-secondary:      #B8B8C0;
  --text-muted:          #6E6E7A;

  /* Accent */
  --accent:              #FFFFFF;

  /* Shadows */
  --glass-shadow:        0 8px 32px rgba(0,0,0,0.3);
  --glass-inner:         inset 0 1px 0 0 rgba(255,255,255,0.15);
}
```

### 5b. `tailwind.config.ts` Extensions

```typescript
theme: {
  extend: {
    colors: {
      bg: {
        deep: 'var(--bg-deep)',
        primary: 'var(--bg-primary)',
        surface: 'var(--bg-surface)',
        glass: 'var(--bg-glass)',
        'glass-hover': 'var(--bg-glass-hover)',
      },
      border: {
        glass: 'var(--border-glass)',
        'glass-strong': 'var(--border-glass-strong)',
      },
      text: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
      },
      accent: 'var(--accent)',
    },
    fontFamily: {
      heading: ['var(--font-bebas-neue)', 'sans-serif'],
      body: ['var(--font-inter)', 'sans-serif'],
    },
    fontSize: {
      'hero-h1': ['clamp(42px, 8vw, 80px)', { lineHeight: '1.05', letterSpacing: '0.04em' }],
      'section-h2': ['clamp(28px, 5vw, 48px)', { lineHeight: '1.1', letterSpacing: '0.04em' }],
    },
    backdropBlur: {
      glass: '20px',
    },
    boxShadow: {
      glass: 'var(--glass-shadow)',
      'glass-inner': 'var(--glass-inner)',
      'glass-combined': '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.15)',
    },
    backgroundImage: {
      'hero-gradient': 'linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)',
      'hero-gradient-left': 'linear-gradient(to right, var(--bg-primary) 0%, transparent 40%)',
    },
    borderRadius: {
      glass: '16px',
    },
  },
}
```

---

## 6. LiquidGlass SVG Filter Component

### 6a. How It Works

The LiquidGlass effect uses an inline SVG `<filter>` with `feTurbulence` + `feDisplacementMap` to create a subtle glass distortion over the frosted backdrop. This replicates iOS 26's liquid glass refraction effect.

### 6b. SVG Filter Definition

```xml
<svg style="position:absolute;width:0;height:0">
  <defs>
    <filter id="liquid-glass" x="-10%" y="-10%" width="120%" height="120%">
      <!-- Subtle noise for organic distortion -->
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.015"
        numOctaves="3"
        seed="1"
        result="noise"
      />
      <!-- Displace the background through the noise -->
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="3"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </defs>
</svg>
```

### 6c. Intensity Variants

| Intensity | baseFrequency | scale | Use Case |
|---|---|---|---|
| `subtle` | 0.01 | 2 | Navbar, small cards |
| `medium` | 0.015 | 3 | Pricing cards, CTA buttons |
| `strong` | 0.02 | 5 | Login form, hero overlay |

### 6d. Component Architecture

```
LiquidGlass
├── Renders SVG <filter> once (portal to document body or inline)
├── Applies CSS classes: glass bg, backdrop-blur, border, shadows
├── Conditionally applies filter: url(#liquid-glass-{intensity})
├── Wraps children in the styled container
└── Uses useId() for unique filter IDs when multiple instances exist
```

### 6e. Glass CSS (applied by LiquidGlass)

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

### 6f. Performance Notes

- SVG filter is GPU-accelerated in modern browsers
- `will-change: transform` on glass elements for compositor layer promotion
- Use `disableFilter` prop on mobile if performance degrades (check via `matchMedia`)
- Limit to ~8 simultaneous glass elements visible in viewport
- The filter is cosmetic — if unsupported, fallback to backdrop-blur only (progressive enhancement)

---

## 7. Login Page — Video Background

### 7a. Source & Compression

```
Source: C:\Users\hp\Desktop\top-movies-and-tv-shows-2026-oscars.mp4
Output: public/login-bg.webm (max 1.5MB)

FFmpeg command:
ffmpeg -i input.mp4 -vcodec libvpx-vp9 -b:v 500k -vf "scale=1280:-1" -an -t 15 -r 24 public/login-bg.webm
```

Also copy MP4 as fallback: `public/login-bg.mp4` (lazy-loaded, preload="none").

### 7b. Page Structure

```
/login page
├── <video> — fullscreen, autoplay, muted, loop, playsInline
│   ├── <source src="/login-bg.webm" type="video/webm" />
│   └── <source src="/login-bg.mp4" type="video/mp4" />
├── Dark overlay — absolute, rgba(0,0,0,0.6)
└── Centered LiquidGlass card (intensity="strong")
    ├── Logo (icon.png)
    ├── Tagline: "Sign in to access premium channels"
    ├── Phone input (UK format, +44 prefix)
    ├── OTP input (6 digits, auto-advance)
    └── Glass submit button
```

### 7c. Video Performance

- `preload="metadata"` on the video element (not "auto" — save bandwidth)
- `poster` attribute with a static frame (extract via ffmpeg: `ffmpeg -i login-bg.webm -ss 2 -frames:v 1 public/login-poster.jpg`)
- Video loads after page paint — NOT blocking LCP
- On slow connections: poster image shows, video loads progressively
- `playsinline` for iOS (prevents fullscreen hijack)

### 7d. Auth Flow

```
1. User enters phone → POST /api/auth/verify { phone, step: 'request' }
2. Server generates 6-digit OTP, stores in memory/cookie (MVP)
3. OTP displayed on screen: "Send this code to our WhatsApp"
4. User sends code to WhatsApp number → manual verification (MVP)
5. User enters OTP on site → POST /api/auth/verify { phone, otp, step: 'verify' }
6. Server verifies → sets httpOnly JWT cookie (7 days)
7. Redirect to originally requested gated page
```

---

## 8. Section Background Alternation

Never stack two same-background sections adjacent.

| # | Section | Background | Notes |
|---|---|---|---|
| 1 | Hero | `bg-deep` (#08090C) | TMDB backdrop with gradient |
| 2 | Stats Bar | `bg-surface` (#12141A) | Glass stat cards |
| 3 | Live Sports | `bg-primary` (#0C0D12) | Glass match cards |
| 4 | Content Rows | `bg-surface` (#12141A) | Poster cards on dark surface |
| 5 | UK News | `bg-primary` (#0C0D12) | Glass news cards |
| 6 | Pricing | `bg-deep` (#08090C) | Glass pricing cards |
| 7 | Devices | `bg-surface` (#12141A) | Glass device cards |
| 8 | FAQ | `bg-primary` (#0C0D12) | Glass accordion items |
| 9 | Final CTA | `bg-deep` (#08090C) | Glass button, subtle glow |
| 10 | Footer | `bg-surface` (#12141A) | Glass top border |

---

## 9. Static Data Constants

### Plans

```typescript
const PLANS: readonly Plan[] = [
  {
    id: 'monthly', name: 'Monthly', price: 9.99,
    displayPrice: '£9.99', period: '/mo', popular: false,
    features: [
      { text: '30,000+ Live Channels', included: true },
      { text: 'Full HD & 4K Quality', included: true },
      { text: '1 Device Connection', included: true },
      { text: 'UK & International Content', included: true },
      { text: '7-Day Catch Up', included: true },
      { text: 'Premium Sports Channels', included: false },
    ],
    whatsappMessage: 'Hi, I want to subscribe to the Monthly plan (£9.99/mo)',
  },
  {
    id: 'annual', name: 'Annual', price: 59,
    displayPrice: '£59', period: '/yr', popular: true,
    features: [
      { text: '30,000+ Live Channels', included: true },
      { text: 'Full HD & 4K Quality', included: true },
      { text: '2 Device Connections', included: true },
      { text: 'UK & International Content', included: true },
      { text: '14-Day Catch Up', included: true },
      { text: 'Premium Sports Channels', included: true },
    ],
    whatsappMessage: 'Hi, I want to subscribe to the Annual plan (£59/yr)',
  },
  {
    id: 'family', name: 'Family', price: 129.99,
    displayPrice: '£129.99', period: '/yr', popular: false,
    features: [
      { text: '30,000+ Live Channels', included: true },
      { text: 'Full HD & 4K Quality', included: true },
      { text: '4 Device Connections', included: true },
      { text: 'UK & International Content', included: true },
      { text: '30-Day Catch Up', included: true },
      { text: 'Premium Sports Channels', included: true },
    ],
    whatsappMessage: 'Hi, I want to subscribe to the Family plan (£129.99/yr)',
  },
]
```

### Device Categories

```typescript
const DEVICE_CATEGORIES: readonly DeviceCategory[] = [
  { icon: 'Tv', title: 'Smart TV', devices: ['Samsung', 'LG', 'Sony', 'Android TV'] },
  { icon: 'Monitor', title: 'Computer', devices: ['Windows', 'macOS', 'Chrome'] },
  { icon: 'Smartphone', title: 'Mobile & Tablet', devices: ['iOS', 'Android', 'Fire Tablet'] },
  { icon: 'Wifi', title: 'Streaming Devices', devices: ['Firestick', 'Roku', 'Apple TV', 'MAG Box', 'Chromecast'] },
]
```

### FAQ Items

```
1. What is IPTV UK Subscription?
2. How many channels do you offer?
3. What devices are compatible?
4. Do you offer a free trial?
5. What internet speed do I need?
6. How do I subscribe?
```

### Stats

```typescript
const STATS: readonly StatItem[] = [
  { label: 'Channels', value: 30000, suffix: '+' },
  { label: 'Subscribers', value: 100000, suffix: '+' },
  { label: 'Uptime', value: 99.9, suffix: '%' },
  { label: 'Quality', value: 4, suffix: 'K' },
]
```

---

## 10. Animation Strategy (Framer Motion)

### Hero (LCP Protection)
- H1 rendered server-side, NO opacity:0, NO delay — visible on first paint
- CTA buttons: `initial={{ opacity: 0, y: 20 }}` → animate in after 0.3s
- Trust badges: staggered fade-up after 0.5s

### Stats Bar
- `whileInView` trigger, `viewport={{ once: true }}`
- Custom `useCountUp` hook: 0 → target over 2s via requestAnimationFrame

### Content Rows
- Container: `whileInView="visible"` with `staggerChildren: 0.05`
- Cards: `hidden → visible` (opacity + y), spring animation
- Hover: `scale: 1.03, y: -4` + glass hover brighten

### Live Sports Cards
- Glass cards with `whileInView` fade-up
- Live dot: CSS `@keyframes pulse` (red dot for LIVE status)

### News Cards
- `whileInView` stagger, same as content rows
- Hover: glass brighten + subtle translateY

### Pricing Cards
- `whileHover={{ y: -8 }}`
- Popular card: permanent subtle glow via `glass-inner` shadow

### FAQ Accordion
- `AnimatePresence mode="wait"`
- `height: 0 → auto`, `opacity: 0 → 1`
- Chevron: `rotate(0deg → 180deg)` on open

### Navbar
- Always glass — NO transparent → blur transition
- Shadow intensifies on scroll (`scrollY > 50`)
- Mobile menu: `AnimatePresence` slide from right

### Global
- All animations respect `prefers-reduced-motion: reduce`
- Check via `useReducedMotion()` hook from Framer Motion

---

## 11. File Structure (complete)

```
src/
├── app/
│   ├── layout.tsx              ← fonts, metadata, Navbar/Footer/SmoothScroll
│   ├── page.tsx                ← homepage: parallel fetches, compose sections, JSON-LD
│   ├── login/page.tsx          ← video bg + glass OTP form
│   ├── pricing/page.tsx
│   ├── faq/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── contact/page.tsx
│   ├── channels/page.tsx       ← GATED
│   ├── setup-guide/page.tsx    ← GATED
│   ├── plans/advanced/page.tsx ← GATED
│   ├── privacy-policy/page.tsx
│   ├── terms/page.tsx
│   ├── refund-policy/page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── api/
│       ├── auth/verify/route.ts
│       ├── payment/create/route.ts
│       └── payment/webhook/route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← always-glass, fixed top
│   │   ├── MobileMenu.tsx      ← glass slide-in drawer
│   │   └── Footer.tsx          ← 4-column, glass top border
│   ├── home/
│   │   ├── Hero.tsx            ← server: TMDB backdrop, gradient, H1
│   │   ├── HeroClient.tsx      ← client: CTA animations
│   │   ├── StatsBar.tsx        ← client: count-up on scroll
│   │   ├── LiveSports.tsx      ← server: football-data.org fetch
│   │   ├── LiveSportsClient.tsx ← client: glass match cards
│   │   ├── ContentRow.tsx      ← client: horizontal scroll + stagger
│   │   ├── ContentRowServer.tsx ← server: TMDB fetch, renders ContentRows
│   │   ├── NewsSection.tsx     ← server: NewsAPI fetch
│   │   ├── NewsSectionClient.tsx ← client: glass news cards
│   │   ├── PricingCards.tsx    ← client: 3 glass plans
│   │   ├── DeviceSection.tsx   ← server: 4 glass device cards
│   │   ├── FAQSection.tsx      ← client: glass accordion
│   │   └── FinalCTA.tsx        ← server: glass CTA block
│   ├── ui/
│   │   ├── LiquidGlass.tsx     ← SVG distortion filter wrapper
│   │   ├── GlassButton.tsx     ← frosted button
│   │   ├── GlassCard.tsx       ← frosted card surface
│   │   ├── PosterCard.tsx      ← TMDB poster + hover
│   │   ├── WhatsAppButton.tsx  ← wa.me link wrapper
│   │   └── Skeleton.tsx        ← loading pulse
│   ├── auth/
│   │   └── LoginForm.tsx       ← phone + OTP inputs, glass card
│   └── SmoothScroll.tsx        ← Lenis wrapper
├── lib/
│   ├── tmdb.ts                 ← TMDB types, fetch, normalize, image URLs
│   ├── football.ts             ← football-data.org types + fetch
│   ├── news.ts                 ← NewsAPI types + fetch
│   ├── wa.ts                   ← WhatsApp link builder
│   ├── auth.ts                 ← JWT sign/verify (jose)
│   └── schema.ts               ← JSON-LD schema builders
├── middleware.ts                ← auth check on gated routes
└── styles/
    └── globals.css             ← CSS variables, glass utilities, scrollbar hide
```

---

## 12. Implementation Phases

### Phase 1: Foundation
- `tailwind.config.ts` — glass colour system, fonts, shadows
- `globals.css` — CSS variables, glass utility class, scrollbar hide
- `next.config.mjs` — image domains (TMDB, football-data.org)
- `layout.tsx` — Bebas Neue + Inter fonts, metadata, structure

### Phase 2: UI Primitives
- `LiquidGlass.tsx` — SVG filter + glass CSS wrapper
- `GlassButton.tsx` — frosted button with hover
- `GlassCard.tsx` — frosted card with optional hover
- `Skeleton.tsx` — loading placeholders

### Phase 3: Layout Shell
- `Navbar.tsx` — always-glass, logo, nav links, glass CTA, mobile toggle
- `MobileMenu.tsx` — glass slide-in drawer
- `Footer.tsx` — 4-column glass footer
- `SmoothScroll.tsx` — Lenis wrapper

### Phase 4: Data Layer
- `tmdb.ts` — all TMDB fetch functions + normalizer
- `football.ts` — Premier League matches fetch
- `news.ts` — UK headlines fetch
- `wa.ts` — WhatsApp link builder
- `schema.ts` — JSON-LD builders

### Phase 5: Homepage Sections
- Hero (server + client)
- StatsBar
- LiveSports (server + client)
- ContentRowServer + ContentRow
- NewsSection (server + client)
- PricingCards
- DeviceSection
- FAQSection
- FinalCTA

### Phase 6: Page Assembly
- `page.tsx` — parallel fetches, compose sections, inject JSON-LD

### Phase 7: Auth + Login
- `auth.ts` — JWT helpers
- `api/auth/verify/route.ts` — OTP endpoint
- `LoginForm.tsx` — glass form component
- `login/page.tsx` — video background + glass form
- `middleware.ts` — gated route protection

---

## 13. `next.config.mjs`

```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org', pathname: '/t/p/**' },
      { protocol: 'https', hostname: 'crests.football-data.org', pathname: '/**' },
    ],
  },
}
```

---

## 14. Risks and Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| TMDB rate limit (40 req/10s) | Low | All fetches in parallel on ISR (1/hr). Well within limits. |
| Football-data.org free tier (10 req/min) | Medium | 5-min revalidation. Fallback: show "Fixtures loading..." glass card. |
| NewsAPI free tier (100 req/day) | Medium | 30-min revalidation = ~48 req/day. Fallback: hide section gracefully. |
| SVG filter perf on low-end devices | Medium | `disableFilter` prop. Check `matchMedia('(prefers-reduced-motion)')`. Fallback to backdrop-blur only. |
| Video bg on login page (mobile data) | Low | `preload="metadata"`, poster image, video only plays when loaded. |
| No backdrop_path for hero | Low | Loop trending results. Final fallback: CSS gradient on bg-deep. |
| LCP from hero image | High | `priority` on Image, preconnect to image.tmdb.org, H1 server-rendered with no delay. |
| NewsAPI images — unknown domains | Low | Use `<img>` with lazy loading (CLAUDE.md exception). CSS gradient fallback for missing images. |

---

## 15. Success Criteria

- [ ] All 10 sections render in correct order with alternating backgrounds
- [ ] LiquidGlass effect visible on Navbar, pricing cards, CTA buttons, login form, device cards
- [ ] SVG distortion filter works (or degrades to blur-only gracefully)
- [ ] TMDB images via `<Image>`, football crests via `<Image>`, news images via `<img>`
- [ ] H1 visible on first paint — LCP < 2.5s
- [ ] Live Sports shows real Premier League fixtures with team crests
- [ ] News section shows real UK headlines
- [ ] Content rows scroll horizontally on mobile and desktop
- [ ] FAQ glass accordion opens/closes with animation
- [ ] WhatsApp CTAs open correct wa.me links
- [ ] Login page: video plays, glass OTP form works
- [ ] No red as primary accent — white/glass only (red only on LIVE dots + errors)
- [ ] No adjacent sections share same background
- [ ] JSON-LD validates (WebSite, Organization, FAQPage, Service, Offer)
- [ ] Tailwind uses design system tokens — no hardcoded hex
- [ ] Mobile responsive: 375px, 768px, 1024px, 1440px
- [ ] Lighthouse Performance 90+ desktop
- [ ] Zero TypeScript errors, zero ESLint errors
- [ ] lucide-react icons only — no emoji, no cartoon icons
- [ ] prefers-reduced-motion respected
