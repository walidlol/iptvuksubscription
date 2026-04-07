import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import CinematicShapes from "@/components/ui/CinematicShapes";
import { BLOG_POSTS, SITE_URL } from "@/data/blogPosts";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "IPTV UK Blog — Guides, Tips & News",
  description:
    "IPTV UK subscription guides, channel comparisons, setup tips, and streaming news. Expert advice on getting the most from your IPTV UK service.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "IPTV UK Blog — Guides & Tips",
    description: "Expert guides on IPTV UK subscriptions, channel lineups, device setup, and streaming tips.",
    url: `${SITE_URL}/blog`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPTV UK Blog — Guides & Tips",
    description: "Expert guides on IPTV UK subscriptions, channels, and streaming.",
    images: ["/opengraph-image"],
  },
};

export default function BlogPage() {
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
                { name: "Blog", url: `${SITE_URL}/blog` },
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
              <li className="text-text-secondary">Blog</li>
            </ol>
          </nav>
          <h1 className="font-heading text-section-h2 uppercase text-text-primary">IPTV UK Blog</h1>
          <p className="mt-3 text-text-secondary max-w-xl">
            Guides, comparisons, and tips to get the most from your IPTV UK subscription.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-bg-primary py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group glass flex flex-col p-6 hover:bg-[rgba(255,255,255,0.09)] transition-colors"
              >
                <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <span aria-hidden>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-heading text-lg tracking-wider text-text-primary uppercase leading-tight mb-3 group-hover:text-white transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-5 pt-4 border-t border-border-glass">
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors group-hover:gap-3 inline-flex items-center gap-2">
                    Read article <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
