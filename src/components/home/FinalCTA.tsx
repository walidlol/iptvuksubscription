"use client";

import { motion } from "framer-motion";
import WhatsAppGate from "@/components/ui/WhatsAppGate";
import CinematicShapes from "@/components/ui/CinematicShapes";
import { WA_MESSAGES } from "@/lib/wa";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function FinalCTA() {
  return (
    <section className="bg-cinematic py-20 sm:py-28 relative overflow-hidden">
      {/* Cinematic animated shapes */}
      <CinematicShapes />

      {/* Subtle top-edge glass border to separate from previous section */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(24,57,73,0.6)] to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="font-heading text-section-h2 uppercase text-text-primary">
          Start Watching Today
        </h2>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
          Join 3,000+ UK subscribers streaming 30,000+ live channels
          and 100,000+ VODs in 4K quality. Get started in under 5 minutes.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <WhatsAppGate
            message={WA_MESSAGES.getStarted}
            variant="primary"
            size="lg"
          >
            Get Started &mdash; &pound;9.99/mo
          </WhatsAppGate>
          <WhatsAppGate
            message={WA_MESSAGES.freeTrial}
            variant="secondary"
            size="lg"
          >
            Free Trial via WhatsApp
          </WhatsAppGate>
        </div>
      </motion.div>
    </section>
  );
}
