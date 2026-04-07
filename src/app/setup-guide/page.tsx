import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import SetupTabs from "./SetupTabs";
import { DEVICES } from "./setupData";
import CinematicShapes from "@/components/ui/CinematicShapes";
import { buildHowToSchema } from "@/lib/schema";

const SITE_URL = "https://iptvuksubscription.uk";

export const metadata: Metadata = {
  title: "IPTV Setup Guide",
  description:
    "Step-by-step IPTV setup guide for Firestick, Smart TV, Android, iOS, and MAG Box. Get streaming in under 5 minutes.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/setup-guide` },
};

// ─── Build HowTo @graph for all 5 devices ─────────────────────────────────────

function buildSetupSchema() {
  const deviceSchemas = DEVICES.map((device) =>
    buildHowToSchema({
      name: `How to Set Up IPTV UK Subscription on ${device.label}`,
      description: device.intro,
      url: `${SITE_URL}/setup-guide`,
      totalTime: "PT5M",
      steps: device.steps.map((step) => ({
        name: step.title,
        text: step.description,
      })),
    })
  );

  return {
    "@context": "https://schema.org",
    "@graph": deviceSchemas,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SetupGuidePage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* HowTo structured data for all 5 devices */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSetupSchema()) }}
      />

      {/* ── Hero ── */}
      <section className="bg-cinematic relative overflow-hidden pt-32 pb-14">
        <CinematicShapes subtle />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)]">
              <BookOpen size={20} className="text-text-secondary" />
            </div>
            <span className="text-sm text-text-muted uppercase tracking-widest font-medium">
              Getting Started
            </span>
          </div>

          <h1 className="font-heading text-section-h2 uppercase text-text-primary">
            IPTV Setup Guide
          </h1>
          <p className="mt-3 text-text-secondary max-w-2xl">
            Get your IPTV UK subscription running on any device in under 5
            minutes. Select your device below for step-by-step instructions.
          </p>
        </div>
      </section>

      {/* ── Tabbed setup guide ── */}
      <section className="bg-bg-primary py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SetupTabs />
        </div>
      </section>

      {/* ── Compatible devices info bar ── */}
      <section className="bg-bg-surface border-t border-[rgba(255,255,255,0.06)] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-lg tracking-widest text-text-primary uppercase mb-6">
            Also Compatible With
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Apple TV",
              "Roku",
              "Chromecast",
              "Formuler Z8",
              "Nvidia Shield",
              "Raspberry Pi",
              "VLC Player",
              "Kodi",
              "Perfect Player",
              "OTT Navigator",
              "Lazy IPTV",
              "SS IPTV",
              "Web Browser",
            ].map((device) => (
              <span
                key={device}
                className="px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-sm text-text-muted"
              >
                {device}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
