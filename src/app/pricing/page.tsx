import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Bitcoin } from "lucide-react";
import WhatsAppGate from "@/components/ui/WhatsAppGate";
import CinematicShapes from "@/components/ui/CinematicShapes";
import CryptoPayButtons from "@/components/pricing/CryptoPayButtons";
import { buildBreadcrumbSchema, buildOfferSchema } from "@/lib/schema";
import { WA_MESSAGES } from "@/lib/wa";

const SITE_URL = "https://iptvuksubscription.uk";

export const metadata: Metadata = {
  title: "IPTV UK Subscription Plans & Pricing",
  description:
    "IPTV UK subscription plans from £9.99/mo. Monthly, Annual, and Family plans — 30,000+ channels, 100,000+ VODs, 4K quality. No contract. Cancel anytime.",
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: "IPTV UK Pricing — From £9.99/mo | 30,000+ Channels",
    description:
      "Monthly £9.99 · Annual £59 · Family £129.99. 30,000+ live channels, 100,000+ VODs, 4K quality, no contract.",
    url: `${SITE_URL}/pricing`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPTV UK Pricing — From £9.99/mo",
    description: "30,000+ channels, 100,000+ VODs, no contract.",
    images: ["/opengraph-image"],
  },
};

// ─── Structured data ─────────────────────────────────────────────────────────

function buildPricingSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Pricing", url: `${SITE_URL}/pricing` },
      ]),
      buildOfferSchema({
        name: "IPTV UK Monthly Plan",
        price: "9.99",
        priceCurrency: "GBP",
        billingPeriod: "P1M",
        url: `${SITE_URL}/pricing`,
      }),
      buildOfferSchema({
        name: "IPTV UK Annual Plan",
        price: "59",
        priceCurrency: "GBP",
        billingPeriod: "P1Y",
        url: `${SITE_URL}/pricing`,
      }),
      buildOfferSchema({
        name: "IPTV UK Family Plan",
        price: "129.99",
        priceCurrency: "GBP",
        billingPeriod: "P1Y",
        url: `${SITE_URL}/pricing`,
      }),
    ],
  };
}

// ─── Comparison table data ────────────────────────────────────────────────────

type CellValue = string | boolean;

interface TableRow {
  readonly feature: string;
  readonly monthly: CellValue;
  readonly annual: CellValue;
  readonly family: CellValue;
}

const TABLE_ROWS: readonly TableRow[] = [
  { feature: "Price", monthly: "£9.99/mo", annual: "£4.92/mo*", family: "£10.83/mo*" },
  { feature: "Live Channels", monthly: "30,000+", annual: "30,000+", family: "30,000+" },
  { feature: "VOD Library", monthly: "100,000+", annual: "100,000+", family: "100,000+" },
  { feature: "Streaming Quality", monthly: "HD & 4K", annual: "HD & 4K", family: "HD & 4K" },
  { feature: "Simultaneous Devices", monthly: "1", annual: "1", family: "4" },
  { feature: "EPG TV Guide", monthly: true, annual: true, family: true },
  { feature: "All UK Sports Channels", monthly: true, annual: true, family: true },
  { feature: "Sports VODs", monthly: true, annual: true, family: true },
  { feature: "Customer Support", monthly: "24/7", annual: "Priority", family: "VIP" },
  { feature: "Free Trial", monthly: true, annual: true, family: true },
  { feature: "Contract", monthly: "None", annual: "None", family: "None" },
];

function Cell({ value }: { readonly value: CellValue }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check size={16} className="text-green-400 mx-auto" />
    ) : (
      <X size={16} className="text-text-muted/40 mx-auto" />
    );
  }
  return <span className="text-text-secondary text-sm">{value}</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPricingSchema()) }}
      />

      {/* ── Hero ── */}
      <section className="bg-cinematic relative overflow-hidden pt-32 pb-14">
        <CinematicShapes subtle />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-text-muted">
              <li><Link href="/" className="hover:text-text-secondary transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-text-secondary">Pricing</li>
            </ol>
          </nav>
          <h1 className="font-heading text-section-h2 uppercase text-text-primary">
            IPTV UK Subscription Plans
          </h1>
          <p className="mt-3 text-text-secondary max-w-xl">
            30,000+ live channels · 100,000+ VODs · 4K quality · no contract. Choose the plan that fits your household.
          </p>
        </div>
      </section>

      {/* ── Plan cards ── */}
      <section className="bg-bg-primary py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Monthly */}
            <div className="relative flex flex-col rounded-xl border border-border-glass bg-[rgba(255,255,255,0.04)] p-6">
              <h2 className="font-heading text-2xl tracking-wider text-text-primary uppercase">Monthly</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-primary">£9.99</span>
                <span className="text-text-muted text-sm">/mo</span>
              </div>
              <div className="my-5 h-px bg-border-glass" />
              <ul className="space-y-3 flex-1 text-sm text-text-secondary">
                {["30,000+ Live Channels","Full HD & 4K Quality","All UK Sports Channels","EPG TV Guide","1 Device","24/7 Support","100,000+ VOD Library"].map(f => (
                  <li key={f} className="flex items-center gap-2"><Check size={14} className="text-green-400 shrink-0" />{f}</li>
                ))}
              </ul>
              <div className="mt-6 space-y-2">
                <WhatsAppGate message={WA_MESSAGES.monthly} variant="secondary" size="lg" className="w-full justify-center">
                  Subscribe via WhatsApp
                </WhatsAppGate>
                <p className="text-center text-xs text-text-muted">
                  <Link href="#crypto" className="hover:text-text-secondary transition-colors">Pay with Crypto</Link>
                </p>
              </div>
            </div>

            {/* Annual — popular */}
            <div className="relative flex flex-col rounded-xl border border-live bg-[rgba(255,255,255,0.08)] shadow-glass-hover scale-[1.02] p-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-live text-white text-xs font-semibold rounded-full uppercase tracking-wider">Most Popular</span>
              </div>
              <h2 className="font-heading text-2xl tracking-wider text-text-primary uppercase">Annual</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-primary">£59</span>
                <span className="text-text-muted text-sm">/yr</span>
              </div>
              <p className="text-xs text-green-400 mt-1">£4.92/mo — save 51%</p>
              <div className="my-5 h-px bg-border-glass" />
              <ul className="space-y-3 flex-1 text-sm text-text-secondary">
                {["30,000+ Live Channels","Full HD & 4K Quality","All UK Sports Channels","EPG TV Guide","1 Device","Priority Support","100,000+ VOD Library"].map(f => (
                  <li key={f} className="flex items-center gap-2"><Check size={14} className="text-green-400 shrink-0" />{f}</li>
                ))}
              </ul>
              <div className="mt-6 space-y-2">
                <WhatsAppGate message={WA_MESSAGES.annual} variant="primary" size="lg" className="w-full justify-center">
                  Subscribe via WhatsApp
                </WhatsAppGate>
                <p className="text-center text-xs text-text-muted">
                  <Link href="#crypto" className="hover:text-text-secondary transition-colors">Pay with Crypto</Link>
                </p>
              </div>
            </div>

            {/* Family */}
            <div className="relative flex flex-col rounded-xl border border-border-glass bg-[rgba(255,255,255,0.04)] p-6">
              <h2 className="font-heading text-2xl tracking-wider text-text-primary uppercase">Family</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-primary">£129.99</span>
                <span className="text-text-muted text-sm">/yr</span>
              </div>
              <p className="text-xs text-text-muted mt-1">£10.83/mo — 4 devices</p>
              <div className="my-5 h-px bg-border-glass" />
              <ul className="space-y-3 flex-1 text-sm text-text-secondary">
                {["30,000+ Live Channels","Full HD & 4K Quality","All UK Sports Channels","EPG TV Guide","4 Devices","VIP Support","100,000+ VOD Library"].map(f => (
                  <li key={f} className="flex items-center gap-2"><Check size={14} className="text-green-400 shrink-0" />{f}</li>
                ))}
              </ul>
              <div className="mt-6 space-y-2">
                <WhatsAppGate message={WA_MESSAGES.family} variant="secondary" size="lg" className="w-full justify-center">
                  Subscribe via WhatsApp
                </WhatsAppGate>
                <p className="text-center text-xs text-text-muted">
                  <Link href="#crypto" className="hover:text-text-secondary transition-colors">Pay with Crypto</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="bg-bg-surface py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-section-h2 uppercase text-text-primary text-center mb-10">
            Plan Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border-glass">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-glass">
                  <th className="text-left px-4 py-3 text-text-muted font-medium">Feature</th>
                  <th className="text-center px-4 py-3 text-text-secondary font-medium">Monthly</th>
                  <th className="text-center px-4 py-3 text-text-primary font-semibold bg-[rgba(255,255,255,0.04)]">Annual ⭐</th>
                  <th className="text-center px-4 py-3 text-text-secondary font-medium">Family</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-border-glass last:border-0 ${i % 2 === 0 ? "" : "bg-[rgba(255,255,255,0.02)]"}`}>
                    <td className="px-4 py-3 text-text-secondary">{row.feature}</td>
                    <td className="px-4 py-3 text-center"><Cell value={row.monthly} /></td>
                    <td className="px-4 py-3 text-center bg-[rgba(255,255,255,0.04)]"><Cell value={row.annual} /></td>
                    <td className="px-4 py-3 text-center"><Cell value={row.family} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-text-muted text-center">* Billed annually. Monthly equivalent shown.</p>
        </div>
      </section>

      {/* ── Crypto payment ── */}
      <section id="crypto" className="bg-bg-primary py-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(255,255,255,0.06)] border border-border-glass mb-6">
            <Bitcoin size={22} className="text-text-secondary" />
          </div>
          <h2 className="font-heading text-section-h2 uppercase text-text-primary">
            Pay with Cryptocurrency
          </h2>
          <p className="mt-4 mb-8 text-text-secondary leading-relaxed">
            Prefer privacy? We accept <strong className="text-text-primary">Bitcoin (BTC)</strong>,{" "}
            <strong className="text-text-primary">USDT</strong>, and{" "}
            <strong className="text-text-primary">Ethereum (ETH)</strong> via NOWPayments.
            Select your plan below — you&apos;ll be taken to a secure hosted checkout.
            Activation within minutes of confirmation.
          </p>
          <CryptoPayButtons />
          <p className="mt-6 text-xs text-text-muted">
            Powered by NOWPayments · BTC · ETH · USDT · LTC · and 300+ coins
          </p>
        </div>
      </section>
    </main>
  );
}
