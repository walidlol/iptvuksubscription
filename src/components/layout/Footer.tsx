import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Plans",
    links: [
      { label: "Monthly Plan", href: "/pricing" },
      { label: "Annual Plan", href: "/pricing" },
      { label: "Family Plan", href: "/pricing" },
      { label: "Free Trial", href: "/pricing" },
    ],
  },
  {
    title: "IPTV UK",
    links: [
      { label: "Channels", href: "/channels" },
      { label: "Devices", href: "/#devices" },
      { label: "Live Sports", href: "/#live-sports" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Setup Guide", href: "/setup-guide" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "WhatsApp", href: "https://wa.me/212762151824" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[rgba(255,255,255,0.08)] relative">
      {/* Teal glow along top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(24,57,73,0.5)] to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">

        {/* Top: Brand + Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="IPTV UK Subscription — Home"
            >
              <div className="h-8 w-8 rounded-full bg-[rgba(255,255,255,0.10)] border border-[rgba(255,255,255,0.18)] flex items-center justify-center">
                <span className="font-heading text-xs text-white leading-none select-none">
                  UK
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading text-lg tracking-widest text-[#F2F2F7]">
                  IPTV UK
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#6E6E7A] font-medium mt-0.5">
                  Subscription
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-[#6E6E7A] leading-relaxed max-w-[220px]">
              Premium IPTV UK subscription. 30,000+ live channels, 100,000+ VODs,
              4K quality, 99.9% uptime.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-sm tracking-widest text-[#F2F2F7] mb-4 uppercase">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6E6E7A] hover:text-[#F2F2F7] transition-colors duration-150"
                      {...(link.href.startsWith("https://")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6E6E7A]">
            &copy; 2026 IPTV UK Subscription. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs text-[#6E6E7A] hover:text-[#F2F2F7] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[#6E6E7A] hover:text-[#F2F2F7] transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/refund-policy"
              className="text-xs text-[#6E6E7A] hover:text-[#F2F2F7] transition-colors"
            >
              Refunds
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
