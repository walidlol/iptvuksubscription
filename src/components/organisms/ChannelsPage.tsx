'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Tv, Zap, Film } from 'lucide-react'

import { fadeUp, SPRING, defaultViewport, staggerContainer } from '@/lib/animations'
import { Navbar }  from './Navbar'
import { Button }  from '../atoms/Button'

// ─── Types ────────────────────────────────────────────────────────────────────

type Category =
  | 'All'
  | 'UK Freeview'
  | 'Sports'
  | 'Entertainment'
  | 'Movies'
  | 'News'
  | 'Kids'
  | 'International'
  | 'Adult (18+)'

interface Channel {
  name:     string
  category: Category
  quality:  'HD' | '4K' | 'SD'
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  'All', 'UK Freeview', 'Sports', 'Entertainment',
  'Movies', 'News', 'Kids', 'International', 'Adult (18+)',
]

const CHANNELS: Channel[] = [
  // UK Freeview
  { name: 'BBC One',      category: 'UK Freeview',    quality: 'HD' },
  { name: 'BBC Two',      category: 'UK Freeview',    quality: 'HD' },
  { name: 'BBC Three',    category: 'UK Freeview',    quality: 'HD' },
  { name: 'ITV',          category: 'UK Freeview',    quality: 'HD' },
  { name: 'ITV2',         category: 'UK Freeview',    quality: 'HD' },
  { name: 'Channel 4',    category: 'UK Freeview',    quality: 'HD' },
  { name: 'Channel 5',    category: 'UK Freeview',    quality: 'HD' },
  { name: 'E4',           category: 'UK Freeview',    quality: 'HD' },
  { name: 'Sky One',      category: 'UK Freeview',    quality: 'HD' },
  { name: 'Dave',         category: 'UK Freeview',    quality: 'HD' },
  // Sports
  { name: 'Sky Sports Main Event',    category: 'Sports', quality: '4K' },
  { name: 'Sky Sports Premier League',category: 'Sports', quality: '4K' },
  { name: 'BT Sport 1',               category: 'Sports', quality: '4K' },
  { name: 'BT Sport 2',               category: 'Sports', quality: 'HD' },
  { name: 'BT Sport 3',               category: 'Sports', quality: 'HD' },
  { name: 'ESPN',                     category: 'Sports', quality: 'HD' },
  { name: 'Eurosport 1',              category: 'Sports', quality: 'HD' },
  { name: 'Eurosport 2',              category: 'Sports', quality: 'HD' },
  { name: 'beIN Sports',              category: 'Sports', quality: 'HD' },
  { name: 'DAZN',                     category: 'Sports', quality: '4K' },
  { name: 'TNT Sports',               category: 'Sports', quality: '4K' },
  { name: 'LaLiga TV',                category: 'Sports', quality: 'HD' },
  { name: 'NBA TV',                   category: 'Sports', quality: 'HD' },
  { name: 'NFL Network',              category: 'Sports', quality: 'HD' },
  // Entertainment
  { name: 'Sky Atlantic',         category: 'Entertainment', quality: 'HD' },
  { name: 'Sky Max',              category: 'Entertainment', quality: 'HD' },
  { name: 'Comedy Central',       category: 'Entertainment', quality: 'HD' },
  { name: 'MTV',                  category: 'Entertainment', quality: 'HD' },
  { name: 'VH1',                  category: 'Entertainment', quality: 'HD' },
  { name: 'Discovery',            category: 'Entertainment', quality: 'HD' },
  { name: 'National Geographic',  category: 'Entertainment', quality: 'HD' },
  { name: 'History',              category: 'Entertainment', quality: 'HD' },
  { name: 'Crime+Investigation',  category: 'Entertainment', quality: 'HD' },
  { name: 'TLC',                  category: 'Entertainment', quality: 'HD' },
  // Movies
  { name: 'Sky Cinema Premier',   category: 'Movies', quality: '4K' },
  { name: 'Sky Cinema Action',    category: 'Movies', quality: 'HD' },
  { name: 'TCM',                  category: 'Movies', quality: 'HD' },
  { name: 'Film4',                category: 'Movies', quality: 'HD' },
  { name: 'Sony Movies',          category: 'Movies', quality: 'HD' },
  { name: 'Horror Channel',       category: 'Movies', quality: 'HD' },
  { name: 'MGM',                  category: 'Movies', quality: 'HD' },
  // News
  { name: 'BBC News',    category: 'News', quality: 'HD' },
  { name: 'Sky News',    category: 'News', quality: 'HD' },
  { name: 'CNN',         category: 'News', quality: 'HD' },
  { name: 'Fox News',    category: 'News', quality: 'HD' },
  { name: 'Al Jazeera',  category: 'News', quality: 'HD' },
  { name: 'GB News',     category: 'News', quality: 'HD' },
  { name: 'TalkTV',      category: 'News', quality: 'HD' },
  { name: 'Bloomberg',   category: 'News', quality: 'HD' },
  // Kids
  { name: 'CBBC',            category: 'Kids', quality: 'HD' },
  { name: 'CBeebies',        category: 'Kids', quality: 'HD' },
  { name: 'Cartoon Network', category: 'Kids', quality: 'HD' },
  { name: 'Disney Channel',  category: 'Kids', quality: 'HD' },
  { name: 'Nickelodeon',     category: 'Kids', quality: 'HD' },
  { name: 'Nick Jr.',        category: 'Kids', quality: 'HD' },
  // International
  { name: 'MBC',        category: 'International', quality: 'HD' },
  { name: 'Al Arabiya', category: 'International', quality: 'HD' },
  { name: 'RAI 1',      category: 'International', quality: 'HD' },
  { name: 'TVE',        category: 'International', quality: 'HD' },
  { name: 'TF1',        category: 'International', quality: 'HD' },
  { name: 'RTL',        category: 'International', quality: 'HD' },
]

// ─── Stats ────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Tv,   value: '35,000+', label: 'Total Channels'    },
  { icon: Zap,  value: '5,000+',  label: 'UK & US Channels'  },
  { icon: Film, value: '100,000+',label: 'VODs On Demand'    },
] as const

// ─── Channel card ─────────────────────────────────────────────────────────────

function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <motion.div
      className="glass p-4 text-center flex flex-col items-center gap-1.5"
      whileHover={{ scale: 1.03 }}
      transition={SPRING}
    >
      <span className="text-[10px] tracking-[0.2em] uppercase text-[#EF4136] font-ui font-semibold">
        {channel.category}
      </span>
      <span className="text-white font-semibold text-sm leading-snug">
        {channel.name}
      </span>
      <span className={[
        'text-[10px] font-mono font-bold px-1.5 py-0.5 rounded',
        channel.quality === '4K'
          ? 'text-[#EF4136] bg-[#EF4136]/10'
          : 'text-white/40 bg-white/5',
      ].join(' ')}>
        {channel.quality}
      </span>
    </motion.div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ChannelsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered = activeCategory === 'All'
    ? CHANNELS
    : CHANNELS.filter((ch) => ch.category === activeCategory)

  const displayed = filtered.slice(0, 48)

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
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-display text-white leading-tight mb-4">
              35,000+{' '}
              <span className="text-gradient">IPTV Channels</span>
              <br />
              The Complete UK List
            </h1>
            <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
              Every UK, US, sports, entertainment and international channel available on your subscription.
            </p>

            {/* Stats row */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center justify-center gap-8 mt-10"
            >
              {STATS.map(({ icon: Icon, value, label }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-[#EF4136]" aria-hidden />
                    <span className="font-mono text-3xl font-bold text-white">{value}</span>
                  </div>
                  <span className="text-xs tracking-[0.15em] uppercase text-white/40 font-ui">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Category filter bar ────────────────────────────────────────── */}
          <div className="overflow-x-auto pb-2 mb-10 -mx-4 px-4">
            <div className="flex gap-2 w-max">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={[
                      'px-4 py-2 rounded-full text-sm font-ui whitespace-nowrap',
                      'border transition-all duration-200 cursor-pointer',
                      isActive
                        ? 'bg-[#EF4136] border-[#EF4136] text-white font-semibold'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-[#EF4136]/20 hover:border-[#EF4136]/40 hover:text-white',
                    ].join(' ')}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Channel grid ──────────────────────────────────────────────── */}
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {displayed.map((channel, i) => (
              <motion.div
                key={`${channel.name}-${i}`}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: i * 0.025, ease: [0.22, 1, 0.36, 1] }}
              >
                <ChannelCard channel={channel} />
              </motion.div>
            ))}
          </motion.div>

          {/* ── Grid CTA ──────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="text-center mt-12"
          >
            <p className="text-white/40 text-sm mb-4">
              Can&apos;t find your channel? We have 35,000+ total.
            </p>
            <Link href="/plans/">
              <Button variant="primary">
                View All Plans
              </Button>
            </Link>
          </motion.div>

          {/* ── SEO content block ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="mt-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">
              What{' '}
              <span className="text-gradient">IPTV UK Channels</span>{' '}
              Are Included?
            </h2>

            <div className="prose-section space-y-6 text-white/60 text-base leading-relaxed">

              <p>
                Our IPTV UK subscription gives you access to one of the most comprehensive channel
                libraries available to UK viewers in 2026. Whether you want to catch the latest
                Premier League fixture on Sky Sports, binge a new drama on Sky Atlantic, or watch
                the BBC News at Ten, everything is included in a single subscription — no separate
                packages, no add-ons, no hidden costs.
              </p>

              <h3 className="text-xl font-display text-white mt-8 mb-3">
                UK Freeview Channels
              </h3>
              <p>
                Every channel available on UK Freeview is included, in HD quality. This covers the
                full BBC suite (BBC One, BBC Two, BBC Three, BBC Four, BBC News, CBBC, CBeebies), all
                ITV channels (ITV, ITV2, ITV3, ITV4, ITVBe), Channel 4 and its family of channels
                (E4, More4, Film4, 4Music), Channel 5 and its siblings (5Star, 5USA, 5Select), and
                dozens of free-to-air channels including Dave, Really, Gold, Drama, and Quest.
                You also get the full Freeview EPG programme guide so you always know what&apos;s on.
              </p>

              <h3 className="text-xl font-display text-white mt-8 mb-3">
                Sports Channels on IPTV UK
              </h3>
              <p>
                Sports coverage is where our IPTV UK subscription really stands out. You get the
                complete Sky Sports package — Sky Sports Main Event, Sky Sports Premier League,
                Sky Sports Football, Sky Sports Cricket, Sky Sports Golf, Sky Sports F1, Sky Sports
                Arena, and Sky Sports News — all in 4K Ultra HD on Premium and Family plans.
                BT Sport 1, BT Sport 2, and BT Sport 3 are also included, meaning you never miss
                a Champions League night or a top-flight rugby match. Add in TNT Sports, beIN Sports,
                Eurosport 1 and 2, ESPN, DAZN, LaLiga TV, NBA TV, and NFL Network, and you have
                every major sport covered — from the Premier League and Six Nations to the NBA Finals
                and the Tour de France.
              </p>

              <h3 className="text-xl font-display text-white mt-8 mb-3">
                Entertainment &amp; Movies
              </h3>
              <p>
                For drama and entertainment, Sky Atlantic brings HBO and Sky originals including
                House of the Dragon, The Last of Us, and Succession. Sky Max carries the biggest
                US network hits and reality TV, while Comedy Central, MTV, and VH1 cover
                lighter entertainment. For factual content, Discovery, National Geographic, History,
                and Crime+Investigation are all available. Movie fans get Sky Cinema Premier,
                Sky Cinema Action, TCM, Film4, Sony Movies, Horror Channel, and MGM — covering
                everything from this week&apos;s new releases to classic film library titles.
                Beyond live TV, our 100,000+ VOD library lets you watch on demand whenever suits you,
                with no buffering and no waiting for broadcast schedules.
              </p>

              <h3 className="text-xl font-display text-white mt-8 mb-3">
                International Channels
              </h3>
              <p>
                With over 30,000 international channels, our IPTV UK subscription serves viewers
                from every background. Arabic-speaking viewers get MBC, Al Arabiya, Al Jazeera
                Arabic, and hundreds of regional channels. South Asian viewers have access to Star
                Plus, Zee TV, Colors, Sony LIV, and dozens of regional language channels covering
                Hindi, Urdu, Punjabi, Tamil, Telugu, and Bengali programming. European viewers can
                watch RAI 1 and RAI 2 from Italy, TVE from Spain, TF1 and M6 from France, and
                RTL from Germany. With our subscription, wherever you&apos;re from, you&apos;re at home.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/plans/">
                  <Button variant="primary">See Subscription Plans</Button>
                </Link>
                <Link href="/free-trial/">
                  <Button variant="ghost">Try Free for 24 Hours</Button>
                </Link>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
