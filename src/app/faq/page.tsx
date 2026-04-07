import type { Metadata } from "next";
import FAQContent from "./FAQContent";
import { FAQ_ITEMS } from "./faqData";

const SITE_URL = "https://iptvuksubscription.uk";

export const metadata: Metadata = {
  title: "FAQ — IPTV UK Subscription",
  description:
    "Frequently asked questions about IPTV UK Subscription. Channels, pricing, devices, setup, free trials, and everything you need to know about our IPTV UK service.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "IPTV UK Subscription — FAQ",
    description:
      "Answers to the 18 most common questions about our IPTV UK subscription service. Channels, pricing, setup, devices, and more.",
    url: `${SITE_URL}/faq`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPTV UK Subscription — FAQ",
    description: "Answers to 18 common questions about IPTV UK.",
    images: ["/opengraph-image"],
  },
};

// FAQPage JSON-LD (server-rendered)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-bg-primary pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQContent />
    </main>
  );
}
