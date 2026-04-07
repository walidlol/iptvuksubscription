import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock } from "lucide-react";
import CinematicShapes from "@/components/ui/CinematicShapes";
import WhatsAppContactCard from "./WhatsAppContactCard";
import { buildBreadcrumbSchema } from "@/lib/schema";

const SITE_URL = "https://iptvuksubscription.uk";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact IPTV UK Subscription. Reach us via WhatsApp for instant support, free trials, subscriptions, and technical help. Response within 5 minutes.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact IPTV UK Subscription",
    description: "WhatsApp support available 24/7. Response within 5 minutes.",
    url: `${SITE_URL}/contact`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact IPTV UK Subscription",
    description: "WhatsApp support 24/7 — response within 5 minutes.",
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              buildBreadcrumbSchema([
                { name: "Home", url: SITE_URL },
                { name: "Contact", url: `${SITE_URL}/contact` },
              ]),
            ],
          }),
        }}
      />
      {/* Hero */}
      <section className="bg-cinematic relative overflow-hidden pt-32 pb-14">
        <CinematicShapes subtle />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-text-muted">
              <li><Link href="/" className="hover:text-text-secondary transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-text-secondary">Contact</li>
            </ol>
          </nav>
          <h1 className="font-heading text-section-h2 uppercase text-text-primary">Contact Us</h1>
          <p className="mt-3 text-text-secondary max-w-xl">
            We&apos;re available 24/7 to help with subscriptions, setup, and technical support.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="bg-bg-primary py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp card — client component with phone gate */}
            <WhatsAppContactCard />

            {/* Email card */}
            <div className="glass p-8 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.08)] border border-border-glass flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-text-secondary" />
                </div>
                <div>
                  <h2 className="font-heading text-xl tracking-wider text-text-primary uppercase">Email</h2>
                  <p className="text-sm text-text-muted">support@iptvuksubscription.uk</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Prefer email? Send us a message and we&apos;ll respond within 24 hours. For urgent issues, WhatsApp is always faster.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Clock size={12} /> Response within 24h
                </span>
              </div>
              <div className="mt-auto pt-2">
                <a
                  href="mailto:support@iptvuksubscription.uk"
                  className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  Send email <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* FAQ nudge */}
          <div className="mt-10 p-6 rounded-xl bg-[rgba(255,255,255,0.03)] border border-border-glass text-center">
            <p className="text-text-muted text-sm">
              Looking for quick answers?{" "}
              <Link href="/faq" className="text-text-secondary hover:text-text-primary underline underline-offset-2 transition-colors">
                Visit our FAQ page
              </Link>{" "}
              — we&apos;ve answered the 18 most common questions about our IPTV UK subscription service.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
