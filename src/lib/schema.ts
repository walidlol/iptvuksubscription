// ─── JSON-LD Schema Builders ───
// All functions return plain objects for serialization via
// <script type="application/ld+json">.

const SITE_URL = "https://iptvuksubscription.uk";
const SITE_NAME = "IPTV UK Subscription";
const WHATSAPP_NUMBER = "+212762151824";

// ─── WebSite Schema ───

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Premium IPTV UK subscription with 30,000+ live channels, 100,000+ VODs, 4K quality, and 99.9% uptime.",
    inLanguage: "en-GB",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

// ─── Organization Schema ───

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
      width: 512,
      height: 512,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: WHATSAPP_NUMBER,
      contactType: "customer service",
      availableLanguage: "English",
      areaServed: "GB",
    },
    sameAs: [
      `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`,
    ],
  };
}

// ─── BreadcrumbList Schema ───

interface BreadcrumbItem {
  readonly name: string;
  readonly url: string;
}

export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${items[items.length - 1]?.url ?? SITE_URL}/#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── WebPage Schema ───

interface WebPageInput {
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly datePublished?: string;
  readonly dateModified?: string;
}

export function buildWebPageSchema(page: WebPageInput) {
  return {
    "@type": "WebPage",
    "@id": `${page.url}/#webpage`,
    url: page.url,
    name: page.name,
    description: page.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-GB",
    ...(page.datePublished && { datePublished: page.datePublished }),
    ...(page.dateModified && { dateModified: page.dateModified }),
  };
}

// ─── Service Schema ───

export function buildServiceSchema() {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "IPTV UK Subscription Service",
    description:
      "Premium IPTV streaming service for the UK with 30,000+ live channels, 100,000+ VODs including movies, football events and UFC, 4K quality, 99.9% uptime, and support for all major devices.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    serviceType: "IPTV Streaming Service",
    offers: [
      buildOfferSchema({
        name: "Monthly Plan",
        price: "9.99",
        priceCurrency: "GBP",
        billingPeriod: "P1M",
        url: `${SITE_URL}/pricing`,
      }),
      buildOfferSchema({
        name: "Annual Plan",
        price: "59",
        priceCurrency: "GBP",
        billingPeriod: "P1Y",
        url: `${SITE_URL}/pricing`,
      }),
      buildOfferSchema({
        name: "Family Plan",
        price: "129.99",
        priceCurrency: "GBP",
        billingPeriod: "P1Y",
        url: `${SITE_URL}/pricing`,
      }),
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1247",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

// ─── Offer Schema ───

interface OfferInput {
  readonly name: string;
  readonly price: string;
  readonly priceCurrency: string;
  readonly billingPeriod: string;
  readonly url: string;
}

export function buildOfferSchema(offer: OfferInput) {
  return {
    "@type": "Offer",
    name: offer.name,
    url: offer.url,
    price: offer.price,
    priceCurrency: offer.priceCurrency,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      billingDuration: offer.billingPeriod,
    },
    availability: "https://schema.org/InStock",
    seller: { "@id": `${SITE_URL}/#organization` },
  };
}

// ─── FAQPage Schema ───

interface FAQInput {
  readonly question: string;
  readonly answer: string;
}

export function buildFAQSchema(items: readonly FAQInput[]) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── Article Schema ───

interface ArticleInput {
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly datePublished: string;
  readonly dateModified?: string;
  readonly authorName?: string;
  readonly imageUrl?: string;
}

export function buildArticleSchema(article: ArticleInput) {
  return {
    "@type": "BlogPosting",
    "@id": `${article.url}/#article`,
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: {
      "@type": "Organization",
      name: article.authorName ?? "IPTV UK Subscription",
      url: SITE_URL,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    ...(article.imageUrl && {
      image: {
        "@type": "ImageObject",
        url: article.imageUrl,
      },
    }),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en-GB",
  };
}

// ─── HowTo Schema ───

interface HowToStep {
  readonly name: string;
  readonly text: string;
  readonly image?: string;
}

interface HowToInput {
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly steps: readonly HowToStep[];
  readonly totalTime?: string; // ISO 8601 duration e.g. "PT10M"
}

export function buildHowToSchema(howTo: HowToInput) {
  return {
    "@type": "HowTo",
    "@id": `${howTo.url}/#howto`,
    name: howTo.name,
    description: howTo.description,
    url: howTo.url,
    inLanguage: "en-GB",
    ...(howTo.totalTime && { totalTime: howTo.totalTime }),
    step: howTo.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: { "@type": "ImageObject", url: step.image },
      }),
    })),
  };
}

// ─── Homepage @graph Builder ───

/** FAQ items shared between the accordion UI and the FAQPage schema */
export const HOMEPAGE_FAQ_ITEMS = [
  {
    question: "What is IPTV UK Subscription?",
    answer:
      "IPTV UK Subscription is a premium Internet Protocol Television service designed specifically for UK viewers. We deliver over 30,000 live TV channels including BBC, ITV, Sky Sports, BT Sport, and Premier League coverage, plus 100,000+ on-demand VODs — movies, documentaries, TV shows, and special events like iconic football matches and UFC fights — all in stunning Full HD and 4K quality.",
  },
  {
    question: "How many channels do you offer?",
    answer:
      "We provide access to over 30,000 live TV channels from the UK and around the world, plus a library of 100,000+ on-demand VODs including movies, documentaries, TV shows, and special events such as classic football matches and UFC fights. This includes all UK sports channels, entertainment, news, kids channels, and international content from Europe, Asia, the Americas, and more.",
  },
  {
    question: "What devices are compatible with your IPTV service?",
    answer:
      "Our IPTV UK subscription works on virtually any device. This includes Smart TVs (Samsung, LG, Sony), Amazon Firestick, Android TV boxes, MAG devices, computers (Windows and Mac), smartphones and tablets (iOS and Android), Roku, Apple TV, and Chromecast. If it connects to the internet, it likely works with our service.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a free trial so you can test our IPTV UK service before committing to a subscription. Simply contact us via WhatsApp to request your free trial, and we will set you up within minutes. No payment details required for the trial.",
  },
  {
    question: "What internet speed do I need?",
    answer:
      "For optimal streaming quality, we recommend a minimum of 10 Mbps for HD content and 25 Mbps for 4K Ultra HD content. Most standard UK broadband connections will handle our service without any issues. We also recommend using a wired ethernet connection for the most stable experience, though WiFi works well too.",
  },
  {
    question: "How do I subscribe to your IPTV UK service?",
    answer:
      "Subscribing is simple and takes just a few minutes. Choose your preferred plan (Monthly at £9.99, Annual at £59, or Family at £129.99) — all plans include 30,000+ live channels and our 100,000+ VOD library. Contact us via WhatsApp, and we will process your subscription and send you your login credentials and setup instructions. You can be watching live TV within 5 minutes of subscribing.",
  },
] as const;

export function buildHomepageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebSiteSchema(),
      buildOrganizationSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: SITE_URL }]),
      buildWebPageSchema({
        name: "IPTV UK Subscription | #1 Premium IPTV Service in the UK",
        description:
          "Premium IPTV UK subscription with 30,000+ channels, 100,000+ VODs, 4K quality, and 99.9% uptime. Watch live UK sports, Sky Sports, Premier League, and more from £9.99/mo.",
        url: SITE_URL,
        datePublished: "2026-04-01",
        dateModified: "2026-04-06",
      }),
      buildServiceSchema(),
      buildFAQSchema(HOMEPAGE_FAQ_ITEMS),
    ],
  };
}
