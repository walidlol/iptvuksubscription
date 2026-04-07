import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import LiveSports from "@/components/home/LiveSports";
import ContentRowServer from "@/components/home/ContentRowServer";
import NewsSection from "@/components/home/NewsSection";
import PricingCards from "@/components/home/PricingCards";
import DeviceSection from "@/components/home/DeviceSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import { buildHomepageSchema } from "@/lib/schema";
import {
  getUKDrama,
  getPopularMovies,
  getKidsContent,
  getInternationalContent,
} from "@/lib/tmdb";

// ─── Skeletons ───

function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-bg-deep">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-deep via-bg-primary to-bg-surface" />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-hero-gradient-left" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-32 w-full">
        <div className="max-w-2xl">
          <div className="h-16 sm:h-20 w-full max-w-lg bg-white/5 rounded-lg animate-pulse" />
          <div className="mt-4 h-12 w-full max-w-md bg-white/[0.03] rounded-lg animate-pulse" />
          <div className="mt-8 flex gap-4">
            <div className="h-12 w-48 bg-white/[0.04] rounded-lg animate-pulse" />
            <div className="h-12 w-48 bg-white/[0.02] rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveSportsSkeleton() {
  return (
    <div className="bg-bg-primary py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-10 w-48 bg-white/5 rounded-lg animate-pulse mb-8" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-[260px] shrink-0 h-[140px] bg-white/[0.04] rounded-glass animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RowSkeleton() {
  return (
    <div className="py-6">
      <div className="h-10 w-48 bg-white/[0.04] rounded-lg animate-pulse mx-4 sm:px-6 lg:px-8 mb-4" />
      <div className="flex gap-3 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-[150px] min-w-[150px] aspect-[2/3] bg-white/[0.03] rounded-xl animate-pulse shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

function NewsSkeleton() {
  return (
    <div className="bg-bg-primary py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-10 w-52 bg-white/[0.04] rounded-lg animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-glass overflow-hidden">
              <div className="aspect-video bg-white/[0.04] animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-white/[0.03] rounded animate-pulse" />
                <div className="h-4 bg-white/[0.03] rounded w-3/4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Row Definitions (4 rows per CLAUDE.md) ───

const CONTENT_ROWS = [
  { title: "Trending Movies",  fetchFn: getPopularMovies,       size: "poster"   as const, priority: true  },
  { title: "UK Drama",         fetchFn: getUKDrama,             size: "poster"   as const, priority: true  },
  { title: "Kids & Family",    fetchFn: getKidsContent,         size: "poster"   as const, priority: false },
  { title: "International TV", fetchFn: getInternationalContent, size: "backdrop" as const, priority: false },
] as const;

// ─── Page ───
// Section order per CLAUDE.md:
// 1.Hero  2.StatsBar  3.LiveSports  4.ContentRows  5.UKNews
// 6.Pricing  7.Devices  8.FAQ  9.FinalCTA  10.Footer(layout)
// Background alternation: deep→surface→primary→surface→primary→deep→surface→primary→deep→surface

export default function Home() {
  return (
    <main>
      {/* JSON-LD Structured Data: WebSite + Organization + Service + Offers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHomepageSchema()),
        }}
      />

      {/* 1. HERO — full-width TMDB backdrop */}
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      {/* 2. STATS BAR — 30K channels · 100K subs · 99.9% uptime · 4K */}
      <StatsBar />

      {/* 3. LIVE SPORTS — Premier League fixtures, glass match cards */}
      <Suspense fallback={<LiveSportsSkeleton />}>
        <LiveSports />
      </Suspense>

      {/* Teal section divider */}
      <div className="teal-divider" />

      {/* 4. CONTENT ROWS — 4 horizontal scroll poster rows (bg-surface) */}
      <section className="bg-bg-surface py-10 space-y-10">
        {CONTENT_ROWS.map((row) => (
          <Suspense key={row.title} fallback={<RowSkeleton />}>
            <ContentRowServer
              title={row.title}
              fetchFn={row.fetchFn}
              size={row.size}
              priority={row.priority}
            />
          </Suspense>
        ))}
      </section>

      {/* 5. UK NEWS — NewsAPI headlines grid (bg-primary) */}
      <Suspense fallback={<NewsSkeleton />}>
        <NewsSection />
      </Suspense>

      {/* Teal section divider */}
      <div className="teal-divider" />

      {/* 6. PRICING — 3 glass plan cards */}
      <PricingCards />

      {/* 6. DEVICES — 4 device categories */}
      <DeviceSection />

      {/* Teal section divider */}
      <div className="teal-divider" />

      {/* 7. FAQ — 6 questions, glass accordion + FAQPage schema */}
      <FAQSection />

      {/* 8. FINAL CTA — glass button, "Start Watching Today" */}
      <FinalCTA />

      {/* 8. FOOTER — rendered in layout.tsx */}
    </main>
  );
}
