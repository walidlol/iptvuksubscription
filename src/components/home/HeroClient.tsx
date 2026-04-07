"use client";

import { motion, type Easing } from "framer-motion";
import { Tv, Film, Zap, Shield } from "lucide-react";
import WhatsAppGate from "@/components/ui/WhatsAppGate";
import { WA_MESSAGES } from "@/lib/wa";

const TRUST_BADGES = [
  { label: "30,000+ Channels", Icon: Tv },
  { label: "100,000+ VODs", Icon: Film },
  { label: "4K Quality", Icon: Zap },
  { label: "99.9% Uptime", Icon: Shield },
] as const;

const EASE: Easing = [0.25, 0.1, 0.25, 1];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: EASE },
    },
  } as const;
}

export default function HeroClient() {
  const subtitle = fadeUp(0.2);
  const buttons = fadeUp(0.35);
  const badges = fadeUp(0.5);

  return (
    <>
      {/* Subtitle — fade up after H1 */}
      <motion.p
        initial={subtitle.initial}
        animate={subtitle.animate}
        className="mt-5 text-base sm:text-lg text-[#B8B8C0] max-w-xl leading-relaxed"
      >
        Premium IPTV UK subscription — 30,000+ live channels, 100,000+ VODs
        including movies, sports events &amp; UFC, in stunning 4K from £9.99/mo.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={buttons.initial}
        animate={buttons.animate}
        className="mt-8 flex flex-col sm:flex-row gap-4"
      >
        <WhatsAppGate
          message={WA_MESSAGES.getStarted}
          variant="primary"
          size="lg"
        >
          Start Watching — £9.99/mo
        </WhatsAppGate>

        <WhatsAppGate
          message={WA_MESSAGES.freeTrial}
          variant="secondary"
          size="lg"
        >
          Free Trial via WhatsApp
        </WhatsAppGate>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={badges.initial}
        animate={badges.animate}
        className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
      >
        {TRUST_BADGES.map(({ label, Icon }, i) => (
          <div
            key={label}
            className="flex items-center gap-2 text-sm text-[#B8B8C0]"
          >
            <Icon size={14} className="text-white/60 shrink-0" aria-hidden />
            <span>{label}</span>
            {i < TRUST_BADGES.length - 1 && (
              <span className="ml-3 text-white/20 select-none" aria-hidden>
                ·
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </>
  );
}
