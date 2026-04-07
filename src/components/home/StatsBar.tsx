"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface Stat {
  readonly label: string;
  readonly value: number;
  readonly suffix: string;
  readonly decimals?: number;
}

const STATS: readonly Stat[] = [
  { label: "Live Channels", value: 30000, suffix: "+" },
  { label: "VODs On Demand", value: 100000, suffix: "+" },
  { label: "Subscribers", value: 3000, suffix: "+" },
  { label: "Uptime", value: 99.9, suffix: "%", decimals: 1 },
] as const;

function useCountUp(target: number, inView: boolean, decimals = 0, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start: number | null = null;
    let rafId: number;

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, decimals, duration]);

  return count;
}

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const count = useCountUp(stat.value, inView, stat.decimals ?? 0);

  const formatted =
    stat.value >= 1000
      ? (count / 1000).toFixed(count >= stat.value ? 0 : 1) + "K"
      : stat.decimals
      ? count.toFixed(stat.decimals)
      : Math.round(count).toString();

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-1 px-6 py-5 text-center"
    >
      <span className="font-heading text-[clamp(2rem,5vw,3.5rem)] text-[#F2F2F7] leading-none tracking-wide">
        {formatted}
        {stat.suffix}
      </span>
      <span className="text-sm text-[#6E6E7A] font-medium tracking-wide uppercase">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section
      aria-label="Service statistics"
      className="bg-[var(--bg-surface)] border-y border-[rgba(255,255,255,0.06)] relative overflow-hidden"
    >
      {/* Subtle teal glow accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(24,57,73,0.12)] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[rgba(255,255,255,0.06)]">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
