"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Clock, Zap, X } from "lucide-react";
import { waLink } from "@/lib/wa";

function isValidUKPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^(?:\+?44|0)7\d{9}$/.test(cleaned);
}

function formatToInternational(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("+44")) return cleaned.slice(1);
  if (cleaned.startsWith("44")) return cleaned;
  if (cleaned.startsWith("07")) return "44" + cleaned.slice(1);
  return cleaned;
}

export default function WhatsAppContactCard() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleClose = useCallback(() => {
    setOpen(false);
    setError("");
  }, []);

  const handleSubmit = useCallback(() => {
    if (!isValidUKPhone(phone)) {
      setError("Please enter a valid UK phone number (e.g. 07XXX XXXXXX)");
      return;
    }
    const intlPhone = formatToInternational(phone);
    const msg = `Hi, I'd like to enquire about IPTV UK Subscription.\n\nMy number: +${intlPhone}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    handleClose();
    setPhone("");
  }, [phone, handleClose]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group glass p-8 flex flex-col gap-5 hover:bg-[rgba(255,255,255,0.09)] transition-colors text-left w-full"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[rgba(37,211,102,0.12)] border border-[rgba(37,211,102,0.25)] flex items-center justify-center shrink-0">
            <MessageCircle size={22} className="text-[#25D366]" />
          </div>
          <div>
            <h2 className="font-heading text-xl tracking-wider text-text-primary uppercase">WhatsApp</h2>
            <p className="text-sm text-text-muted">+212 762 151 824</p>
          </div>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed">
          The fastest way to reach us. Message us for free trials, subscriptions, setup help, or any question. Our team typically responds within 5 minutes.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <Clock size={12} /> Available 24/7
          </span>
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <Zap size={12} /> Response in ~5 mins
          </span>
        </div>
        <div className="mt-auto pt-2">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[#25D366] group-hover:gap-3 transition-all">
            Open WhatsApp <span aria-hidden>→</span>
          </span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            >
              <div
                className="relative w-full max-w-sm rounded-2xl bg-[rgba(18,20,26,0.95)] backdrop-blur-glass border border-[rgba(255,255,255,0.12)] shadow-[0_24px_64px_rgba(0,0,0,0.5)] p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-1 text-[#6E6E7A] hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(37,211,102,0.12)] border border-[rgba(37,211,102,0.25)] mx-auto mb-4">
                  <MessageCircle size={22} className="text-[#25D366]" />
                </div>
                <h3 className="font-heading text-xl text-center text-[#F2F2F7] tracking-wider uppercase mb-2">
                  Enter Your Number
                </h3>
                <p className="text-sm text-[#B8B8C0] text-center mb-5">
                  Enter your UK phone number to continue to WhatsApp
                </p>
                <div className="relative mb-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6E6E7A] select-none">
                    +44
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setError(""); }}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                    placeholder="7XXX XXX XXX"
                    autoFocus
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] text-[#F2F2F7] text-sm placeholder:text-[#6E6E7A] focus:border-[rgba(255,255,255,0.30)] focus:outline-none transition-colors"
                  />
                </div>
                {error && <p className="text-xs text-[#E8392A] mb-3">{error}</p>}
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle size={16} />
                  Continue to WhatsApp
                </motion.button>
                <p className="text-xs text-[#6E6E7A] text-center mt-3">UK numbers only (+44)</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
