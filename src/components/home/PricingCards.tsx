"use client";

import { motion } from "framer-motion";
import WhatsAppGate from "@/components/ui/WhatsAppGate";
import { WA_MESSAGES } from "@/lib/wa";

interface PlanFeature {
  readonly text: string;
  readonly included: boolean;
}

interface Plan {
  readonly id: string;
  readonly name: string;
  readonly displayPrice: string;
  readonly period: string;
  readonly popular: boolean;
  readonly features: readonly PlanFeature[];
  readonly waMessage: string;
}

const PLANS: readonly Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    displayPrice: "£9.99",
    period: "/mo",
    popular: false,
    features: [
      { text: "30,000+ Live Channels", included: true },
      { text: "Full HD & 4K Quality", included: true },
      { text: "All UK Sports Channels", included: true },
      { text: "EPG TV Guide", included: true },
      { text: "1 Device Connection", included: true },
      { text: "24/7 Support", included: true },
      { text: "100,000+ VOD Library", included: true },
    ],
    waMessage: WA_MESSAGES.monthly,
  },
  {
    id: "annual",
    name: "Annual",
    displayPrice: "£59",
    period: "/yr",
    popular: true,
    features: [
      { text: "30,000+ Live Channels", included: true },
      { text: "Full HD & 4K Quality", included: true },
      { text: "All UK Sports Channels", included: true },
      { text: "EPG TV Guide", included: true },
      { text: "1 Device Connection", included: true },
      { text: "24/7 Priority Support", included: true },
      { text: "100,000+ VOD Library", included: true },
    ],
    waMessage: WA_MESSAGES.annual,
  },
  {
    id: "family",
    name: "Family",
    displayPrice: "£129.99",
    period: "/yr",
    popular: false,
    features: [
      { text: "30,000+ Live Channels", included: true },
      { text: "Full HD & 4K Quality", included: true },
      { text: "All UK Sports Channels", included: true },
      { text: "EPG TV Guide", included: true },
      { text: "4 Device Connections", included: true },
      { text: "24/7 VIP Support", included: true },
      { text: "100,000+ VOD Library", included: true },
    ],
    waMessage: WA_MESSAGES.family,
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-green-400 shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      className="w-4 h-4 text-text-muted/40 shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function PricingCards() {
  return (
    <section id="pricing" className="bg-bg-surface py-16 sm:py-24 relative overflow-hidden">
      {/* Teal ambient orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[rgba(24,57,73,0.08)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[rgba(24,57,73,0.06)] blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-section-h2 uppercase text-text-primary">
            Choose Your Plan
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Premium IPTV UK subscription plans with instant activation via
            WhatsApp. Cancel anytime.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col rounded-xl border p-6 lg:p-8 transition-shadow ${
                plan.popular
                  ? "border-[rgba(24,57,73,0.6)] bg-[rgba(255,255,255,0.08)] shadow-glass-hover shadow-teal-glow-sm scale-[1.02]"
                  : "border-border-glass bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-live text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-heading text-2xl tracking-wider text-text-primary uppercase">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-primary font-body">
                  {plan.displayPrice}
                </span>
                <span className="text-text-muted text-sm">{plan.period}</span>
              </div>

              {/* Divider */}
              <div className="mt-6 mb-6 h-px bg-border-glass" />

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.included ? <CheckIcon /> : <CrossIcon />}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? "text-text-secondary"
                          : "text-text-muted/50 line-through"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8 space-y-3">
                <WhatsAppGate
                  message={plan.waMessage}
                  variant={plan.popular ? "primary" : "secondary"}
                  size="lg"
                  className="w-full justify-center"
                >
                  Subscribe via WhatsApp
                </WhatsAppGate>
                <p className="text-center">
                  <a
                    href="/pricing#crypto"
                    className="text-xs text-text-muted hover:text-text-secondary transition-colors"
                  >
                    Pay with Crypto (BTC / USDT / ETH)
                  </a>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
