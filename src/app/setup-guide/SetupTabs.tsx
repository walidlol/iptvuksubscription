"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEVICES } from "./setupData";
import type { Step } from "./setupData";

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepItem({
  step,
  index,
}: {
  readonly step: Step;
  readonly index: number;
}) {
  return (
    <div className="flex gap-4">
      {/* Step number */}
      <div className="shrink-0 w-8 h-8 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.14)] flex items-center justify-center mt-0.5">
        <span className="font-heading text-sm text-text-primary leading-none">
          {index + 1}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 pb-6 border-b border-[rgba(255,255,255,0.06)] last:border-0 last:pb-0">
        <h3 className="font-medium text-text-primary mb-1">{step.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SetupTabs() {
  const [activeId, setActiveId] = useState<string>(DEVICES[0].id);
  const activeDevice = DEVICES.find((d) => d.id === activeId) ?? DEVICES[0];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {DEVICES.map((device) => (
          <button
            key={device.id}
            onClick={() => setActiveId(device.id)}
            className={[
              "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border",
              activeId === device.id
                ? "bg-[rgba(255,255,255,0.12)] border-[rgba(255,255,255,0.28)] text-text-primary shadow-glass"
                : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-text-muted hover:text-text-secondary hover:bg-[rgba(255,255,255,0.07)]",
            ].join(" ")}
          >
            <span aria-hidden="true">{device.emoji}</span>
            {device.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="glass p-6 sm:p-8"
        >
          {/* Device intro */}
          <p className="text-text-secondary mb-8 leading-relaxed">
            {activeDevice.intro}
          </p>

          {/* Steps */}
          <div className="space-y-0">
            {activeDevice.steps.map((step, i) => (
              <StepItem key={step.title} step={step} index={i} />
            ))}
          </div>

          {/* Help footer */}
          <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)]">
            <p className="text-sm text-text-muted">
              Need help?{" "}
              <a
                href="https://wa.me/212762151824?text=Hi%2C+I+need+help+setting+up+my+IPTV+subscription."
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary underline underline-offset-2 transition-colors"
              >
                Contact us on WhatsApp
              </a>{" "}
              — our team typically responds within 5 minutes.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
