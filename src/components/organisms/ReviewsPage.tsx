'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

import { fadeUp, SPRING, defaultViewport, staggerContainer } from '@/lib/animations'
import { Navbar }  from './Navbar'
import { Button }  from '../atoms/Button'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Review {
  quote:    string
  name:     string
  city:     string
  device:   string
  plan:     string
  rating:   5 | 4
}

const REVIEWS: Review[] = [
  {
    quote:  'Switched from Sky and saved over £800 a year. Picture quality is absolutely unreal — 4K on the Premier League is stunning.',
    name:   'James T.',
    city:   'Manchester',
    device: 'Firestick 4K',
    plan:   'Premium Annual',
    rating: 5,
  },
  {
    quote:  'Set up in 10 minutes on my Samsung Smart TV. Every Premier League game, sorted. The EPG guide makes it feel just like real Sky.',
    name:   'Sarah K.',
    city:   'London',
    device: 'Samsung Smart TV',
    plan:   'Family Plan',
    rating: 5,
  },
  {
    quote:  'The VOD library is massive. My whole family watches something different every night. Worth every penny for the Family Plan.',
    name:   'Mohammed A.',
    city:   'Birmingham',
    device: 'Android Box',
    plan:   'Family Plan',
    rating: 5,
  },
  {
    quote:  '99.9% uptime is no joke. Not a single buffer in 6 months of watching. The Champions League nights have been flawless.',
    name:   'David R.',
    city:   'Leeds',
    device: 'MAG 424W3',
    plan:   'Premium Annual',
    rating: 5,
  },
  {
    quote:  'Customer support on WhatsApp is brilliant. Got my credentials within 5 minutes of paying. Setup instructions were clear too.',
    name:   'Emma W.',
    city:   'Glasgow',
    device: 'iPhone 15',
    plan:   'Standard',
    rating: 5,
  },
  {
    quote:  "Best IPTV UK subscription I've tried. And I've tried a few. The sports coverage is unmatched — BT Sport, Sky Sports, all of it.",
    name:   'Chris B.',
    city:   'Bristol',
    device: 'Firestick',
    plan:   'Premium Annual',
    rating: 5,
  },
  {
    quote:  'I was sceptical at first but the free trial convinced me immediately. Crystal clear picture, loads of channels. Happy customer.',
    name:   'Priya M.',
    city:   'Leicester',
    device: 'LG Smart TV',
    plan:   'Premium Annual',
    rating: 5,
  },
  {
    quote:  'The Arabic channels are brilliant — MBC, Al Arabiya, all the Egyptian drama channels. Exactly what my family needed.',
    name:   'Yousef H.',
    city:   'London',
    device: 'Android Box',
    plan:   'Family Plan',
    rating: 5,
  },
  {
    quote:  'Running on Nvidia Shield — butter smooth. The 4K HDR on Sky Cinema is genuinely impressive. Highly recommend the annual plan.',
    name:   'Tom G.',
    city:   'Edinburgh',
    device: 'Nvidia Shield',
    plan:   'Premium Annual',
    rating: 5,
  },
  {
    quote:  "My kids love CBeebies and Cartoon Network. I've got Sky Sports. Wife has her soaps. Family Plan covers all of us no problem.",
    name:   'Lisa P.',
    city:   'Cardiff',
    device: 'Multiple devices',
    plan:   'Family Plan',
    rating: 5,
  },
  {
    quote:  'Cancelled my £110/month Sky package. This does everything Sky does for a fraction of the cost. Wish I had switched sooner.',
    name:   'Nathan S.',
    city:   'Sheffield',
    device: 'Fire TV Cube',
    plan:   'Family Plan',
    rating: 5,
  },
  {
    quote:  'The catch-up TV feature is a game changer. Missed a match? No problem — watch it the next morning. Premium plan is the one to get.',
    name:   'Amy L.',
    city:   'Nottingham',
    device: 'Firestick',
    plan:   'Premium Annual',
    rating: 4,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-[#EF4136]' : 'text-white/20'}
          fill={i < rating ? 'currentColor' : 'none'}
          aria-hidden
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.article
      className="glass relative flex flex-col gap-4 p-6 h-full overflow-hidden"
      whileHover={{ y: -4 }}
      transition={SPRING}
    >
      {/* Decorative quote mark */}
      <span
        className="absolute top-2 left-4 text-6xl text-[#EF4136]/10 font-serif leading-none select-none pointer-events-none"
        aria-hidden
      >
        &ldquo;
      </span>

      <StarRating rating={review.rating} />

      <blockquote className="flex-1 relative">
        <p className="text-sm text-white/80 leading-relaxed italic">
          &ldquo;{review.quote}&rdquo;
        </p>
      </blockquote>

      <footer className="flex flex-col gap-0.5 pt-2 border-t border-white/10">
        <span className="text-sm font-semibold text-white">{review.name}</span>
        <span className="text-xs text-white/40">
          {review.city} &nbsp;·&nbsp; {review.device}
        </span>
        <span className="text-[10px] tracking-[0.15em] uppercase text-[#EF4136] font-ui mt-0.5">
          {review.plan}
        </span>
      </footer>
    </motion.article>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ReviewsPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#08090D] pt-32 pb-20">
        <div className="container-site">

          {/* ── Hero ───────────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-display text-white leading-tight mb-4">
              IPTV UK Subscription{' '}
              <span className="text-gradient">Reviews</span>
            </h1>
            <p className="text-white/60 text-lg mt-4 max-w-xl mx-auto">
              Real reviews from real UK customers. No cherry-picking, no fakes.
            </p>
          </motion.div>

          {/* ── Summary bar ────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="glass p-6 max-w-lg mx-auto mb-16 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="font-mono text-5xl font-bold text-white">4.9</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} className="text-[#EF4136]" fill="currentColor" aria-hidden />
                ))}
              </div>
              <span className="text-xs text-white/40 mt-0.5">Average rating</span>
            </div>
            <div className="hidden sm:block w-px h-14 bg-white/10" aria-hidden />
            <div className="flex flex-col items-center gap-1">
              <span className="font-mono text-5xl font-bold text-white">2,400+</span>
              <span className="text-xs text-white/40 mt-0.5">UK customers</span>
            </div>
            <div className="hidden sm:block w-px h-14 bg-white/10" aria-hidden />
            <div className="flex flex-col items-center gap-1">
              <span className="font-mono text-5xl font-bold text-white">99.9%</span>
              <span className="text-xs text-white/40 mt-0.5">Uptime</span>
            </div>
          </motion.div>

          {/* ── Reviews grid ───────────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </motion.div>

          {/* ── CTA ─────────────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="text-center mt-16"
          >
            <p className="text-white/40 text-sm mb-6">
              Join 2,400+ satisfied UK customers. Try free for 24 hours — no card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-trial/">
                <Button variant="primary">Claim Free Trial</Button>
              </Link>
              <Link href="/plans/">
                <Button variant="ghost">View Plans &amp; Pricing</Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
