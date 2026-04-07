"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import GlassButton from "@/components/ui/GlassButton";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Plans", href: "/pricing" },
  { label: "Channels", href: "/channels" },
  { label: "Setup", href: "/setup-guide" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
] as const;

// Navbar is ALWAYS glass — not transparent-to-blur.
// Shadow intensifies on scroll past 50px.
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer when route changes (simple approach)
  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "bg-[rgba(12,13,18,0.70)]",
          "backdrop-blur-glass",
          "border-b border-[rgba(255,255,255,0.08)]",
          "transition-shadow duration-300",
          scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-b-[rgba(24,57,73,0.3)]" : "",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">

          {/* ── Logo (stacked) ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="IPTV UK Subscription — Home"
          >
            <div className="h-8 w-8 rounded-full bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.20)] flex items-center justify-center">
              <span className="font-heading text-xs text-white leading-none select-none">
                UK
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-lg tracking-widest text-[#F2F2F7] group-hover:text-white transition-colors">
                IPTV UK
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#6E6E7A] font-medium mt-0.5">
                Subscription
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-[#B8B8C0] hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop CTAs ── */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <GlassButton href="/pricing" variant="ghost" size="sm">
              Try for 24h
            </GlassButton>
            <GlassButton href="/pricing" variant="primary" size="sm">
              Subscribe Now
            </GlassButton>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden p-2 text-[#B8B8C0] hover:text-white transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer (slides in from right) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={closeMobile}
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={[
                "fixed top-0 right-0 bottom-0 z-50",
                "w-72 md:hidden",
                "bg-[rgba(12,13,18,0.95)]",
                "backdrop-blur-glass",
                "border-l border-[rgba(255,255,255,0.10)]",
                "flex flex-col",
                "pt-20 pb-8 px-6",
              ].join(" ")}
            >
              {/* Close button */}
              <button
                className="absolute top-6 right-6 p-2 text-[#B8B8C0] hover:text-white transition-colors"
                onClick={closeMobile}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>

              {/* Links */}
              <nav className="flex flex-col gap-1 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className="block py-3 px-2 text-base font-medium text-[#B8B8C0] hover:text-white border-b border-[rgba(255,255,255,0.06)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTAs */}
              <div className="mt-6 flex flex-col gap-3">
                <GlassButton href="/pricing" variant="ghost" size="md" className="w-full justify-center">
                  Try for 24h
                </GlassButton>
                <GlassButton href="/pricing" variant="primary" size="md" className="w-full justify-center">
                  Subscribe Now
                </GlassButton>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
