# CLAUDE.md — The Golden Rule File
# Project: iptvuksubscription.uk
# Role: Senior Full-Stack Engineer & SEO Specialist
# Last Updated: 2026-03-27

> This file is the single source of truth for every decision made on this project.
> Before writing a single line of code or content, consult this document.

---

## 1. PROJECT IDENTITY

| Field | Value |
|---|---|
| Domain | iptvuksubscription.uk |
| Market | United Kingdom |
| Framework | Next.js 14+ (App Router) |
| Deployment | GitHub → Vercel (Dashboard, not CLI) |
| OS/Shell | Windows PowerShell |
| Design Target | Awwwards Site of the Day |
| Lighthouse Target | 100 / 100 / 100 / 100 |

---

## 2. SEO BATTLE PLAN — THE MONEY MACHINE

### Primary Keyword Silos

| Silo | Primary KW | Supporting KWs |
|---|---|---|
| **Silo 1** | `iptv uk subscription` | best iptv uk subscription, iptv uk subscription 2025/2026, cheap iptv uk |
| **Silo 2** | `iptv uk` | iptv uk channels, iptv uk provider, iptv uk reddit |
| **Silo 3** | `iptv subscription uk` | iptv subscription uk reddit, best iptv subscription uk, iptv subscription uk review |

### Content Strategy Rules
- Every page MUST target **2,500+ words** of deep, semantically rich content.
- Use strict **H1 → H2 → H3 → H4** hierarchy. ONE H1 per page, always containing the primary keyword.
- Internal linking: Every page must link to at least 3 other silo pages using exact-match or partial-match anchor text.
- FAQPage JSON-LD schema on every content-heavy page (minimum 5 Q&As).
- Product JSON-LD schema on the pricing/plans page.
- BreadcrumbList JSON-LD on all inner pages.
- No orphan pages. Every URL must be reachable within 2 clicks from the homepage.

### Page Architecture (URL Structure)
```
/                          → Homepage (Silo Hub — "iptv uk")
/iptv-uk-subscription/    → Primary Money Page (Silo 1)
/iptv-subscription-uk/    → Supporting Money Page (Silo 3)
/plans/                    → Pricing / Conversion Page
/channels/                 → Channel List (long-tail SEO goldmine)
/setup-guide/             → Tutorial Hub (E-E-A-T builder)
/blog/                    → Content Cluster Hub
/faq/                      → FAQ Silo (FAQ schema)
/reviews/                  → Social Proof / Trust Page
```

### Meta Tag Rules
- Title: `{Primary KW} | {Benefit} — iptvuksubscription.uk` (max 60 chars)
- Description: Must contain primary keyword, a UK-specific hook, and a CTA. (max 155 chars)
- OG images: 1200×630px, branded, with keyword overlay.

---

## 3. VISUAL IDENTITY SYSTEM

### Design Philosophy: "Dark Signal"
A premium dark-themed aesthetic that feels like a command centre for UK TV.
Think: deep space + broadcast signal + British precision.

### Color Tokens
```css
/* Dark Mode (Default) */
--color-bg-base:      #08090D;   /* near-black — primary background */
--color-bg-surface:   #0F1117;   /* card/surface layer */
--color-bg-elevated:  #161820;   /* navbar, modals */
--color-accent-red:   #E5181E;   /* primary CTA, highlights — "signal red" */
--color-accent-red-glow: rgba(229,24,30,0.25);
--color-text-primary: #F0F2F7;   /* body copy */
--color-text-muted:   #6B7280;   /* secondary text */
--color-border:       rgba(255,255,255,0.08); /* glassmorphism borders */

/* Light Mode */
--color-bg-base:      #F4F6FB;
--color-bg-surface:   #FFFFFF;
--color-accent-blue:  #1A56DB;   /* primary CTA in light mode */
--color-accent-blue-glow: rgba(26,86,219,0.2);
--color-text-primary: #111827;
--color-border:       rgba(0,0,0,0.08);
```

### Typography Scale
```
Display: "Bebas Neue" or "DM Serif Display" — Headlines, Hero titles
Body: "Inter" — Only for body text where legibility > personality
Mono: "JetBrains Mono" — Prices, code snippets, channel counts
UI Labels: "Geist" or "Neue Haas Grotesk" — Nav, buttons, badges
```
> Rule: Display font must feel like a broadcast station identity, not a startup.

### Z-Axis Layering System (Visual Depth)
```
z-0  → Mesh-noise background (static SVG or CSS grain)
z-10 → Parallax blob layer (Framer Motion scroll-linked)
z-20 → Page content (sections, grids)
z-30 → Glassmorphism cards (backdrop-blur-md, border-white/10)
z-40 → Sticky navbar
z-50 → Modals, tooltips, drawers
z-60 → Toast notifications
```

### Glassmorphism Card Spec
```tsx
// Every content card MUST use this base:
className="
  bg-white/5
  backdrop-blur-md
  border border-white/10
  rounded-2xl
  shadow-xl shadow-black/30
"
```

---

## 4. COMPONENT ARCHITECTURE (ATOMIC DESIGN)

### Atoms (Base Layer)
- `<Button />` — variants: primary (red CTA), ghost, outline, destructive
- `<Badge />` — variants: new, popular, hot, sale
- `<Input />` — with floating label, focus ring in accent color
- `<Icon />` — Lucide React, consistent 20px size
- `<Spinner />` — accent-colored loading state

### Molecules (Composed from Atoms)
- `<PricingCard />` — Glassmorphism, hover lift, CTA button
- `<ChannelTag />` — Inline badge showing channel category
- `<ReviewStar />` — Animated star rating with count
- `<FAQAccordion />` — Framer Motion collapse with schema markup
- `<StatCounter />` — Anime.js number count-up on scroll

### Organisms (Composed from Molecules)
- `<Navbar />` — Sticky, blur on scroll, dark/light toggle
- `<HeroSection />` — Full-viewport, parallax, Anime.js SVG path draw
- `<PricingTable />` — 3-column grid, popular plan highlighted
- `<ChannelGrid />` — Masonry or CSS grid, 500+ channel showcase
- `<TestimonialCarousel />` — Embla or Keen Slider, autoplay
- `<FAQSection />` — Accordion with JSON-LD injection
- `<Footer />` — Multi-column, internal links, schema sitelinks

---

## 5. ANIMATION RULES

### Framer Motion (Layout & Micro-interactions)
```tsx
// REQUIRED on every interactive element:
whileHover={{ scale: 1.02, y: -2 }}
whileTap={{ scale: 0.98 }}
transition={{ type: "spring", stiffness: 400, damping: 25 }}

// Section entrances:
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
```

### Anime.js (Complex SVG & Sequences)
- Hero: SVG signal/broadcast path draw animation on page load
- Stats: Number count-up (channels, uptime %, countries) triggered on scroll
- Logo: Subtle pulse/glow loop on the brand mark
- Background: Mesh gradient morph (slow, 8s loop)

### Performance Rules for Animation
- `will-change: transform` only on actively animating elements (remove after)
- Prefer `transform` and `opacity` — NEVER animate layout properties
- Reduce motion: `@media (prefers-reduced-motion: reduce)` must disable all non-essential animations
- No animation should block the main thread on initial load

---

## 6. TECHNICAL STANDARDS

### Next.js Rules
```tsx
// Images: ALWAYS use next/image with explicit width/height
<Image src={src} alt={descriptiveAlt} width={1200} height={630} priority />

// Fonts: ALWAYS use next/font with display:swap
import { DM_Serif_Display } from 'next/font/google'

// Metadata: Every page exports a generateMetadata() function
export async function generateMetadata(): Promise<Metadata> { ... }
```

### File Structure
```
src/
├── app/                    # App Router pages
│   ├── layout.tsx          # Root layout (JSON-LD globals, fonts)
│   ├── page.tsx            # Homepage
│   ├── iptv-uk-subscription/
│   ├── iptv-subscription-uk/
│   ├── plans/
│   ├── channels/
│   ├── setup-guide/
│   ├── blog/
│   ├── faq/
│   └── reviews/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── lib/
│   ├── schema.ts           # JSON-LD generators
│   ├── seo.ts              # Metadata builders
│   └── animations.ts      # Framer Motion variants
├── hooks/
├── styles/
│   └── globals.css         # Tailwind + CSS tokens
└── public/
    └── images/             # All static assets
```

### Performance Checklist (Pre-Deploy)
- [ ] `next/image` on every `<img>` element
- [ ] All Google Fonts loaded via `next/font`
- [ ] No layout shift (CLS < 0.1)
- [ ] First Contentful Paint < 1.5s
- [ ] All third-party scripts deferred or lazy-loaded
- [ ] `robots.txt` and `sitemap.xml` auto-generated
- [ ] Canonical tags on all pages
- [ ] Structured data validated via Google Rich Results Test

---

## 7. CONTENT STANDARDS

### Word Count Targets Per Page
| Page | Minimum Words |
|---|---|
| Homepage | 2,500 |
| /iptv-uk-subscription/ | 3,500 |
| /iptv-subscription-uk/ | 3,000 |
| /plans/ | 2,000 |
| /channels/ | 2,500 |
| /setup-guide/ | 3,000 |
| /faq/ | 2,000 |
| Blog posts | 1,800 min |

### E-E-A-T Signals (Every Page)
- Specific UK-market references (Freeview, BT Sport, Sky, Premier League, EastEnders)
- Author byline on blog/guide content
- Last-updated timestamps
- Statistical claims with inline citations or data sources
- Real testimonials with UK locations (London, Manchester, Birmingham, etc.)

### Content Showcase (2026 Film/TV References Available)
Used in channel showcase, blog content, and social proof sections.
> See: Content Showcase Master List (to be uploaded)

---

## 8. WORKFLOW RULES (POWERSHELL / WINDOWS)

- All scripts MUST be PowerShell-compatible
- Use `;` not `&&` for command chaining in PS
- No Unix-style path separators in scripts
- Deployment: Push to GitHub main branch → Vercel auto-deploys (never use `vercel` CLI)
- Environment variables: Set in Vercel Dashboard → Settings → Environment Variables

---

## 9. THE 10 COMMANDMENTS

1. **Never ship a component without Framer Motion `whileHover`.**
2. **Never write a page without `generateMetadata()` and JSON-LD.**
3. **Never use a raw `<img>` tag — always `next/image`.**
4. **Never create a page under 2,500 words of content.**
5. **Never use generic Inter-only typography — pair with a display font.**
6. **Never deploy without running Lighthouse — 100 is the floor.**
7. **Never orphan a page — every URL gets internal links.**
8. **Never animate layout properties — only `transform` and `opacity`.**
9. **Never break the Z-axis layering system.**
10. **Never guess at keyword targeting — every H1 is deliberate.**

---

## 10. BUSINESS MODEL INTELLIGENCE (READ THIS BEFORE TOUCHING ANYTHING)

### The Reseller Model — How the Money Works
```
Supplier:    8K Gold panel (my8k.su)
Cost:        1,700 MAD per 120 credits
Per credit:  ~14.17 MAD (~£1.18) = 1 month of IPTV for 1 user
Revenue target: 10,000 MAD/day minimum → scale from there
Operator location: Morocco (targeting UK audience)
Legal entity: LLC registered in New Mexico, USA
```

### Pricing Math (Private — Never Expose Cost)
```
Our cost per month:  ~£1.18
UK market rate:      £8–£15/month is normal
Our sweet spot:      £9.99/month (Standard) / £79.99/year (Premium Annual)
                     £129.99/year (Family — 5 connections)
Margin at £9.99/mo:  ~88% gross margin
Break-even daily:    Need ~13 monthly sales OR 2-3 annual sales per day to hit 10k MAD
Scale target:        50+ annual subs/day is realistic with good SEO + conversion
```

### Admin Panel
- Platform: **8K Gold** (my8k.su)
- Current level: Bronze (27 credits remaining as of build date)
- Panel provides: user creation, credential generation, trial management, reseller tracking
- Max trials available: **20 per day** (scales with credit purchase volume)
- The panel is the backend — our website is purely the front-end sales layer

---

## 11. THE THREE CRITICAL INTEGRATIONS

### A) FREE TRIAL — The Qualification Funnel (NOT a Self-Serve Form)

**The Problem:** 20 trials/day max. Giving them to unqualified leads = wasted inventory.
**The Solution:** The trial page must LOOK like a premium offer, feel exclusive, and route serious buyers through a WhatsApp qualification flow — not an instant form submission.

**Trial Page Strategy:**
- Headline: "Premium 24-Hour Trial — Limited Availability" (scarcity is real and true)
- Show the value first: 35,000 channels, 100,000 VODs, 4K quality
- Require the user to click a WhatsApp CTA: "Claim Your Trial via WhatsApp"
- The WhatsApp link opens with a pre-filled message template (free, no API needed):

```
https://wa.me/[YOUR_WHATSAPP_NUMBER]?text=Hi%2C+I%27d+like+to+request+a+free+24-hour+IPTV+trial.+%0A%0AName%3A+%0ADevice+%28Firestick%2FAndroid%2FSmart+TV%29%3A+%0ALocation%20(UK+city)%3A
```

- This auto-populates the message with a form template — user fills in name, device, city, sends it
- YOU qualify on WhatsApp and manually create the trial in 8K Gold panel
- The page should also have a secondary path: "Prefer email? Contact us" → mailto link
- No Telegram bot needed — WhatsApp is higher conversion with UK audience

**Trial Page Design Rules:**
- Make it look so premium that 40% of visitors skip the trial and buy directly
- Show a countdown timer: "Today's trial slots: [X] remaining" (can be static or JS random between 3-8)
- Add a "Skip trial — Buy now" CTA below the trial button, same visual weight

**Implementation:** Pure HTML link — zero backend required. Free forever.

---

### B) LIVE CHAT / SUPPORT — Free Solution

**Recommended:** [Tawk.to](https://tawk.to) — 100% free, no limits, no branding fees
- Install: one `<Script>` tag in `layout.tsx`
- Features: live chat widget, offline message capture, mobile app for you to reply from Morocco
- WhatsApp integration: Tawk.to can route to WhatsApp when offline
- Alternatively: WhatsApp Business chat bubble (simpler, less features)

**Implementation in layout.tsx:**
```tsx
// Add after closing </body> tag via Next.js Script component
<Script id="tawk" strategy="lazyOnload">
  {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;s1.src='https://embed.tawk.to/[YOUR_PROPERTY_ID]/[WIDGET_ID]';
  s1.charset='UTF-8';s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);})();`}
</Script>
```

---

### C) PAYMENTS — The Full Stack

**The UK customer must never feel unsafe paying.**

#### Payment Method 1: PayPal
- Works with LLC (New Mexico entity)
- PayPal Checkout button — no backend needed for simple redirects
- Use PayPal's hosted payment page (simplest) or PayPal JS SDK
- UK customers recognise and trust PayPal — high conversion

#### Payment Method 2: Crypto
- **Recommended processor:** [NOWPayments](https://nowpayments.io) — free to integrate, accepts BTC/ETH/USDT/LTC/100+ coins
- OR [Coinbase Commerce](https://commerce.coinbase.com) — also free, clean API
- Both provide hosted payment pages — no backend server needed
- Add a "Pay with Crypto" button on the /plans/ page alongside PayPal

#### Payment Method 3: Card (Future)
- When volume grows: [Stripe](https://stripe.com) with the LLC — standard card processing
- For now, PayPal covers card payments too (customers don't need a PayPal account)

#### Payment Flow Architecture:
```
/plans/ page
  ├── [Buy Standard] → PayPal Checkout → Success → /thank-you?plan=standard
  ├── [Buy Premium Annual] → PayPal Checkout → Success → /thank-you?plan=premium
  ├── [Buy Family Plan] → PayPal Checkout → Success → /thank-you?plan=family
  └── [Pay with Crypto] → NOWPayments hosted page → Success → /thank-you?plan=X

/thank-you/ page
  ├── Confirmation message
  ├── WhatsApp CTA: "Message us now to receive your credentials"
  └── Expected delivery time: "Within 15 minutes during UK business hours"
```

**The post-payment credential delivery is manual for now** — customer pays → you get PayPal notification → you create user in 8K Gold panel → send credentials via WhatsApp/email.

> Future automation: Webhook from PayPal → API call to 8K Gold panel → auto-credential email. Build this in Phase 6 when volume demands it.

---

## 12. COMPETITOR INTELLIGENCE

**qwiq.tv trial page (Image 3) — what they do:**
- Instant self-serve trial form (WhatsApp OR Email option)
- Collects: Name, WhatsApp number, device type, country
- Connected to Telegram bot (Image 1) for operator notifications
- 4-step process display: Confirmation → Credentials → Stream → Upgrade

**Our differentiation:**
- No instant self-serve (we qualify leads, trial is genuinely scarce)
- WhatsApp-first (higher trust signal in UK than Telegram)
- The website itself is so premium that trial feels like a bonus, not the entry point
- Family Plan — no competitor in this niche offers a proper family-oriented tier

---

## 13. LOCKED DECISIONS (2026-03-27 STRATEGY SESSION)

These are final. Do not re-debate them.

### Hero Concept: "Infinite Stream"
- Emotional hook: **'Never miss a moment'**
- Anime.js SVG concept: A horizontal infinite river of content tiles (channels, films, sports) flowing continuously in the background behind the hero text. On scroll, the river slows and cards "crystallise" into the features section.
- Hero H1 target: "The UK's Best IPTV Subscription — Never Miss a Moment"
- Supporting visual: 35,000+ channels counter + 100,000+ VODs counter animated on load

### SEO Build Order
1. **Homepage /** — Rank 'iptv uk', funnel everything here first
2. **/iptv-uk-subscription/** — Primary money page, built immediately after homepage
3. **/iptv-subscription-uk/** — Supporting silo
4. **/plans/** — Conversion page
5. All other pages follow

### Pricing Architecture (DIFFERENTIATED — Not Like Everyone Else)

```
Tier 1: STANDARD (Monthly rolling)
  └── 1-month plan — entry point, low commitment

Tier 2: PREMIUM ANNUAL (12-month — the hero plan)
  └── Best value, heavily promoted, "Most Popular" badge
  └── Price positioned as "per day" to minimise perceived cost
  └── Unlocks: 4K streams, EPG guide, catch-up TV

Tier 3: FAMILY PLAN (Annual — the differentiator)
  └── Up to 5 simultaneous connections
  └── Dedicated family-friendly channel filter
  └── UK school holidays content calendar integration (future)
  └── "The one plan your whole household needs"
```

> Positioning logic: Most providers dump 4 date-based tiers. We give 2 clean plans + a Family upsell.
> This makes the decision binary (Standard vs Premium) then layers in Family as an emotional upgrade.
> Product JSON-LD: 3 separate Product schemas (Standard, Premium Annual, Family).

### Trust Signal Assets (CONFIRMED)

| Asset | Value | Usage |
|---|---|---|
| Total channels | 35,000+ worldwide | Hero counter, meta descriptions |
| UK/US channels | 5,000+ | Homepage body copy, channel page |
| VOD library | 100,000+ | Hero counter, plans page feature list |
| Uptime | 99.9% | Trust bar, pricing page |
| Reviews | Placeholder → real (post-launch) | Testimonial carousel |

> Content rule: Never say "35,000 UK channels" — we have 35,000 worldwide, ~5,000 UK/US focused. Be precise or stay vague ("thousands of channels").

---

## 11. BUILD ORDER & FIRST DELIVERABLE

**Engineering-correct build sequence:**

```
Phase 1 — FOUNDATION (Do this first, everything depends on it)
  └── root layout.tsx
  └── globals.css (all CSS tokens, Tailwind config)
  └── tailwind.config.ts (custom colors, fonts, animations)
  └── lib/animations.ts (Framer Motion variant library)
  └── lib/schema.ts (JSON-LD generators)
  └── lib/seo.ts (metadata builders)

Phase 2 — ATOMS
  └── Button, Badge, Input, Icon, Spinner

Phase 3 — ORGANISMS (Homepage first)
  └── Navbar
  └── HeroSection (Infinite Stream concept)
  └── StatCounterBar (35k channels / 100k VODs / 99.9% uptime)
  └── PricingTable (3-tier: Standard / Premium / Family)
  └── TestimonialCarousel
  └── FAQSection
  └── Footer

Phase 4 — HOMEPAGE CONTENT (2,500+ words, JSON-LD, full SEO)

Phase 5 — MONEY PAGES (/iptv-uk-subscription/, etc.)
```

**FIRST Claude Code task:** Phase 1 Foundation — `layout.tsx`, `globals.css`, `tailwind.config.ts`, `animations.ts`, `schema.ts`, `seo.ts`

> Reason: Every single component built afterward inherits the token system. Building components before the foundation = guaranteed refactor debt.

---

## 12. FUTURE INTEGRATIONS (QUEUED)

- [ ] Kling 3.0 scroll animation videos (post-redesign stabilisation)
- [ ] Dark/Light mode toggle (red accent dark ↔ blue accent light)
- [ ] A/B test on Hero CTA copy ("Get IPTV UK" vs "Start Watching Today")
- [ ] Blog auto-generation pipeline
- [ ] Heatmap integration (Hotjar or Microsoft Clarity)

---

*This document is the law. When in doubt, return here.*