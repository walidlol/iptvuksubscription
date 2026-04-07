"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import { FAQ_ITEMS } from "./faqData";

const EASE: Easing = [0.25, 0.1, 0.25, 1];

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  readonly item: (typeof FAQ_ITEMS)[number];
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}) {
  return (
    <div className="border-b border-border-glass">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-base font-medium text-text-primary">{item.question}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="w-5 h-5 text-text-muted shrink-0"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-text-secondary leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-xs text-text-muted">
          <li><Link href="/" className="hover:text-text-secondary transition-colors">Home</Link></li>
          <li aria-hidden>/</li>
          <li className="text-text-secondary">FAQ</li>
        </ol>
      </nav>

      <h1 className="font-heading text-section-h2 uppercase text-text-primary mb-3">
        Frequently Asked Questions
      </h1>
      <p className="text-text-secondary mb-12">
        Everything you need to know about our IPTV UK subscription service. Can&apos;t find your answer?{" "}
        <a
          href="https://wa.me/212762151824"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          Ask us on WhatsApp
        </a>
        .
      </p>

      <div className="border-t border-border-glass">
        {FAQ_ITEMS.map((item, i) => (
          <FAQItem
            key={item.question}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}
