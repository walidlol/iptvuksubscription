# CLAUDE.md — iptvuksubscription.uk
> Read this file completely at the start of every session before touching any code.
> Project started: March 2026 — Disney+ inspired redesign, fresh build.

---

## PROJECT IDENTITY

**Site:** iptvuksubscription.uk  
**Business:** Premium IPTV subscription service targeting the UK market  
**Goal:** Rank #1 on Google UK for EMD keywords + deliver a Disney+ quality streaming platform experience  
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lenis  
**Deployment:** GitHub → Vercel auto-deploy (NEVER Vercel CLI)  
**OS:** Windows — all terminal commands must use PowerShell syntax  
**Design Reference:** Disney+ (disneyplus.com/en-gb) — dark cinematic UI with category rows, hero banners, gated browse experience

---

## TARGET KEYWORDS (EMD Advantage)

| Keyword | Monthly Volume | Priority |
|---|---|---|
| iptv uk subscription | 12,000–22,000 | Primary |
| iptv uk | 40,000–60,000 | Primary |
| iptv subscription uk | 18,000–30,000 | Primary |

Domain **iptvuksubscription.uk** is an Exact Match Domain. Every page must protect and leverage this.

---

## DESIGN SYSTEM — DISNEY+ ADAPTATION

### Aesthetic Direction
Disney+ dark theme adapted for IPTV. Clean, cinematic, content-forward.  
NOT Netflix chaos. NOT generic SaaS. Think: Disney+ structure + premium IPTV branding.

### Brand Colours
```
--brand-red:        #E8392A     ← primary accent (logo red, replaces Disney+ blue)
--brand-red-hover:  #FF4436     ← hover states
--brand-red-glow:   rgba(232,57,42,0.3)
--bg-primary:       #0D0F18     ← main background (Disney+ deep navy-black)
--bg-surface:       #151929     ← card surfaces, rows
--bg-elevated:      #1A1F33     ← elevated cards, modals
--bg-hero:          #0A0C14     ← hero sections
--text-primary:     #F9F9F9     ← headings, primary text
--text-secondary:   #CACACA     ← body text, descriptions
--text-muted:       #7B7F8E     ← labels, timestamps
--border:           rgba(255,255,255,0.08) ← subtle dividers
```

### Typography
- **Headings:** Bebas Neue — all H1, H2, section titles. Letter-spacing: 0.04em, uppercase
- **Body/UI:** Inter — nav links, body text, buttons, labels. Weight 400/500/600
- **Hero H1:** clamp(42px, 8vw, 80px)
- **Section H2:** clamp(28px, 5vw, 48px)
- **Body:** 15–16px, line-height 1.6

### Logo
- File: `/public/icon.png` (red circle icon)
- Navbar: `<Image src="/icon.png" height={36} width={36} alt="IPTV UK Subscription" priority />`

---

## DISNEY+ LAYOUT PATTERNS TO REPLICATE

### 1. Navbar (all pages)
- Fixed top, transparent → blur backdrop on scroll (like Disney+)
- Logo left, nav links center, "Get IPTV UK" CTA button right (brand-red)
- Mobile: hamburger → slide-in drawer from right
- Links: Home, Plans, Channels*, Setup Guide*, FAQ, Blog
- (* = gated, only visible after WhatsApp auth)

### 2. Hero Section (homepage)
- Full-width backdrop image from TMDB (trending movie/show)
- Title overlay with gradient fade from bottom
- CTA buttons: "Get Started — £9.99/mo" + "Free Trial via WhatsApp"
- Trust line below: "30,000+ Channels · 4K Quality · 99.9% Uptime"

### 3. Content Rows (Disney+ style)
- Horizontal scroll rows with poster cards
- Row title left-aligned with "See All >" link
- Cards: 150×225px posters (TMDB w500), rounded-lg, hover scale 1.05 + shadow
- Scroll snap on mobile, overflow-x-auto, hide scrollbar
- Categories: UK Sports, UK Drama, Movies, Kids, International, News

### 4. "Choose Your Plan" Section
- 3 plan cards side by side (like Disney+ pricing toggle)
- Monthly £9.99 / Annual £59 / Family £129.99
- Popular card: elevated, red top border, slight scale
- Each card → WhatsApp CTA button

### 5. Device Compatibility Section
- "Available on your favourite devices" heading
- 4 device icons: TV, Computer, Mobile & Tablet, Streaming Devices
- Listed supported devices under each icon

### 6. FAQ Section
- Accordion style, clean borders
- FAQPage schema on every Q&A pair

### 7. Footer
- 4-column layout: Plans, IPTV UK, Support, Legal
- Logo top-left, social links bottom
- "© 2026 IPTV UK Subscription" bottom center

---

## GATED PAGES (WhatsApp OTP Auth)

### How auth works:
1. User clicks "Channels" or "Setup Guide" → redirected to `/login`
2. User enters UK phone number → we send OTP code via WhatsApp Business API
3. User enters 6-digit code → verified → session cookie set (7 days)
4. Gated pages now accessible: `/channels`, `/setup-guide`, `/plans/advanced`

### Tech implementation:
- Session: HTTP-only cookie with signed JWT (no external auth service)
- Middleware: `middleware.ts` checks cookie on gated routes
- WhatsApp OTP: API route sends message via WhatsApp Business API (or manual fallback: user messages the number, receives code)
- Fallback if no WhatsApp API: simple code displayed on screen → "Send this code to our WhatsApp to verify"

### Gated pages:
- `/channels` — Disney+ Marvel-page style: hero + category rows with real channel logos
- `/setup-guide` — tabbed device setup (Firestick, Smart TV, Android, iOS, MAG)
- `/plans/advanced` — detailed plan comparison + crypto checkout

### Public pages (indexed by Google):
- `/` — Homepage
- `/pricing` — Basic pricing overview
- `/faq` — Full FAQ
- `/blog` + `/blog/[slug]` — SEO content
- `/contact` — WhatsApp + email
- `/login` — Auth page

---

## PAYMENTS

### Primary: WhatsApp
All plan cards have "Subscribe via WhatsApp" CTA → opens wa.me with pre-filled message.  
WhatsApp number: `447451296412` (env var: `NEXT_PUBLIC_WHATSAPP_NUMBER`)

### Secondary: Crypto (on-site)
NOWPayments integration for Bitcoin/USDT/ETH checkout.
- Modal triggered by "Pay with Crypto" button on pricing cards
- API route: `/api/payment/create` → calls NOWPayments API
- Webhook: `/api/payment/webhook` → confirms payment
- Env var: `NOWPAYMENTS_API_KEY`

---

## IMAGES — AUTOMATIC RULES

### TMDB API (primary — movie/TV posters and backdrops)
- Env vars: `TMDB_API_KEY`, `TMDB_READ_ACCESS_TOKEN`
- Poster URL: `https://image.tmdb.org/t/p/w500{poster_path}`
- Backdrop URL: `https://image.tmdb.org/t/p/original{backdrop_path}`
- Always fetch server-side with `next: { revalidate: 3600 }`
- Always use `<Image>` component, never `<img>`

### Fallback
CSS gradient placeholder matching brand colours. Never broken images or empty space.

---

## ENVIRONMENT VARIABLES (.env.local)

```
TMDB_API_KEY=
TMDB_READ_ACCESS_TOKEN=
NOWPAYMENTS_API_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=447451296412
NEXT_PUBLIC_SITE_URL=https://iptvuksubscription.uk
```

Copy values from old project: `C:\Users\hp\Desktop\iptvuksubscription\.env.local`  
Mirror all vars in Vercel dashboard → Settings → Environment Variables.

---

## SEO — GOOGLE TOP 200 FACTORS APPLIED

### Domain Factors (1–9)
- ✅ EMD: "iptvuksubscription" = exact match for "iptv uk subscription"
- ✅ Keyword as first word in domain
- ✅ .uk TLD for UK geo-targeting
- Register domain for 2+ years (legitimacy signal)

### Page-Level Factors (10–60)
- Every page: keyword in title tag (front-loaded), H1, meta description, first 100 words
- Content length: homepage 2,500+ words, FAQ 2,500+, blog posts 1,500+
- Pricing page: 600–800 words MAX (conversion focus)
- LSI keywords naturally: "live TV", "streaming", "UK channels", "Sky Sports", "Premier League"
- Image optimization: descriptive filenames, keyword alt text, WebP/AVIF, explicit dimensions
- Page speed: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Canonical tags on every page
- Short, keyword-rich URLs

### Site-Level Factors (61–78)
- Contact page with real business info matching WHOIS
- SSL certificate (Vercel provides)
- Breadcrumb navigation on all pages
- Sitemap.xml auto-generated
- Mobile-first responsive design
- Privacy Policy, Terms, Refund Policy pages
- Regular content updates (blog)

### Schema Markup (every page)
- All pages: WebSite, Organization, BreadcrumbList
- Homepage: WebPage, Service, AggregateRating
- Pricing: Offer + PriceSpecification per plan
- FAQ: FAQPage schema
- Blog: Article, BlogPosting, Person
- Setup Guide: HowTo + HowToStep

### Internal Linking Silo
```
HOMEPAGE (hub)
├── /pricing → anchor: "iptv subscription uk plans"
├── /channels → anchor: "iptv uk channels" (gated)
├── /setup-guide → anchor: "iptv uk subscription setup"
├── /faq → anchor: "iptv uk faq"
└── /blog/[posts] → each links to 2+ money pages
```
Never use "click here". Always keyword-rich anchors.

### Backlink Strategy Notes
- Build .co.uk backlinks for country-specific trust
- Guest posts on UK tech/streaming blogs
- Natural link profile: mix of dofollow/nofollow
- Brand mentions count as signals even without links

---

## SKILLS TO USE (in Claude Code)

| Skill | Location | When |
|---|---|---|
| frontend-patterns | ~/.claude/skills/frontend-patterns | Component architecture |
| seo | ~/.claude/skills/seo | Meta, schema, sitemap |
| seo-audit | ~/.claude/skills/seo-audit | After completing any page |
| seo-schema | ~/.claude/skills/seo-schema | Structured data |
| seo-content | ~/.claude/skills/seo-content | Blog posts, page copy |
| seo-technical | ~/.claude/skills/seo-technical | Core Web Vitals, speed |
| seo-sitemap | ~/.claude/skills/seo-sitemap | Sitemap generation |

### MCP Servers Available
| Server | Use |
|---|---|
| context7 | "use context7" for live Next.js/Tailwind/Framer Motion docs |
| superpowers | Brainstorming, planning, systematic debugging |
| playwright | Screenshot localhost:3000, test interactions |
| github | Push commits, manage repo |

### Tool Usage Protocol
- On-Demand Only: Do NOT use tools unless explicitly asked
- No Auto-Push: Never use github MCP to commit/push unless "Proceed to push" command given
- No Auto-Screenshot: Only use playwright if asked for visual check

---

## TECHNICAL RULES

- Framer Motion for animations (not anime.js) — simpler, no dynamic import headaches
- Lenis for smooth scroll — destroy on unmount
- Always use Next.js `<Image>` — never raw `<img>`
- TMDB fetches: `next: { revalidate: 3600 }` — cache 1 hour
- Async server components wrapped in `<Suspense>` with skeleton fallbacks
- Never commit `.env.local`
- Never use Vercel CLI — always GitHub push
- Never use blue as accent colour
- Never use `#000000` or `#FFFFFF` — use design system values
- Never delay hero H1 animation — it is the LCP element
- Never keyword stuff — natural language only
- PowerShell syntax for all terminal commands

---

## FILE STRUCTURE

```
src/
├── app/
│   ├── layout.tsx              ← root layout, fonts, metadata
│   ├── page.tsx                ← homepage
│   ├── pricing/page.tsx        ← public pricing
│   ├── faq/page.tsx            ← public FAQ
│   ├── blog/page.tsx           ← blog index
│   ├── blog/[slug]/page.tsx    ← blog posts
│   ├── contact/page.tsx        ← contact
│   ├── login/page.tsx          ← WhatsApp OTP auth
│   ├── channels/page.tsx       ← GATED: channel browse
│   ├── setup-guide/page.tsx    ← GATED: device setup
│   ├── plans/advanced/page.tsx ← GATED: detailed plans + crypto
│   ├── privacy-policy/page.tsx
│   ├── terms/page.tsx
│   ├── refund-policy/page.tsx
│   └── api/
│       ├── auth/verify/route.ts
│       ├── payment/create/route.ts
│       └── payment/webhook/route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ContentRow.tsx
│   │   ├── PricingCards.tsx
│   │   ├── DeviceSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── StatsBar.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── WhatsAppButton.tsx
│   │   ├── PosterCard.tsx
│   │   └── Skeleton.tsx
│   ├── auth/
│   │   └── OTPForm.tsx
│   └── SmoothScroll.tsx
├── lib/
│   ├── tmdb.ts                 ← TMDB API helpers
│   ├── wa.ts                   ← WhatsApp link builder
│   ├── auth.ts                 ← JWT sign/verify helpers
│   └── schema.ts               ← JSON-LD schema builders
├── middleware.ts                ← auth check on gated routes
└── styles/
    └── globals.css
```

---

## HOMEPAGE SECTIONS (exact order)

1. **HERO** — Full-width TMDB backdrop, gradient overlay, H1 "THE UK'S #1 IPTV SUBSCRIPTION", CTA buttons, trust badges
2. **STATS BAR** — 30,000+ Channels · 100,000+ Subscribers · 99.9% Uptime · 4K Quality
3. **CONTENT ROWS** — 6 Disney+ style horizontal poster rows from TMDB
4. **PRICING** — 3 plan cards, Disney+ pricing layout
5. **DEVICES** — "Available on your favourite devices" with 4 categories
6. **FAQ PREVIEW** — 6 questions, accordion, FAQPage schema
7. **FINAL CTA** — "Start Watching Today" full-width red section
8. **FOOTER** — 4-column mega footer

---

## WHAT NOT TO DO

- Never use placeholder images — always TMDB or CSS gradient fallback
- Never ask the user to provide images manually
- Never keyword stuff
- Never use `--no-verify` on git commits
- Never modify eslint/tailwind config to hide warnings — fix the code
- Never use Vercel CLI
- Never use blue as accent
- Never delay hero H1 — it is the LCP element
- Never use raw `<img>` tags
- Never commit .env.local
- Never stack two same-background sections adjacent
- Never make pricing page over 800 words

---

## LEARNED — CODE
(Claude adds discoveries here each session)

## LEARNED — SEO
(Claude adds discoveries here each session)

## LEARNED — DESIGN
(Claude adds discoveries here each session)

## LEARNED — AVOID
(Claude adds discoveries here each session)