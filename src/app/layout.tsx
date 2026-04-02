import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://iptvuksubscription.uk";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090c",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IPTV UK Subscription | #1 Premium IPTV Service in the UK",
    template: "%s | IPTV UK Subscription",
  },
  description:
    "Premium IPTV UK subscription with 30,000+ channels, 4K quality, and 99.9% uptime. Watch live UK sports, Sky Sports, Premier League, and more from £9.99/mo.",
  keywords: [
    "iptv uk subscription",
    "iptv uk",
    "iptv subscription uk",
    "uk iptv",
    "iptv service uk",
    "best iptv uk",
    "iptv uk channels",
  ],
  authors: [{ name: "IPTV UK Subscription" }],
  creator: "IPTV UK Subscription",
  publisher: "IPTV UK Subscription",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "IPTV UK Subscription",
    title: "IPTV UK Subscription | Premium UK Streaming Service",
    description:
      "The UK's #1 IPTV subscription service. 30,000+ live channels, 4K quality, 99.9% uptime. Stream Sky Sports, Premier League, UK Drama & more from £9.99/mo.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IPTV UK Subscription - Premium UK Streaming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPTV UK Subscription | #1 Premium IPTV Service in the UK",
    description:
      "30,000+ channels, 4K quality, 99.9% uptime. The UK's best IPTV subscription from £9.99/mo.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${bebasNeue.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
      </head>
      <body className="font-body antialiased bg-bg-primary text-text-primary">
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
