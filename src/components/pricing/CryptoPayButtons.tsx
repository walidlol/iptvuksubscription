"use client";

import { useState } from "react";
import { Bitcoin, Loader2 } from "lucide-react";
import { waLink } from "@/lib/wa";

const PLANS = [
  { id: "monthly", label: "Monthly", price: "£9.99" },
  { id: "annual", label: "Annual", price: "£59" },
  { id: "family", label: "Family", price: "£129.99" },
] as const;

type PlanId = (typeof PLANS)[number]["id"];

interface ApiResponse {
  success: boolean;
  invoiceUrl?: string;
  error?: string;
}

export default function CryptoPayButtons() {
  const [loading, setLoading] = useState<PlanId | null>(null);
  const [error, setError] = useState("");

  async function handlePay(planId: PlanId) {
    setLoading(planId);
    setError("");

    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      const data: ApiResponse = await res.json();

      if (!data.success || !data.invoiceUrl) {
        setError(data.error ?? "Failed to create payment. Please try WhatsApp.");
        return;
      }

      // Redirect to NOWPayments hosted checkout
      window.location.href = data.invoiceUrl;
    } catch {
      setError("Network error. Please try WhatsApp instead.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PLANS.map((plan) => (
          <button
            key={plan.id}
            onClick={() => handlePay(plan.id)}
            disabled={loading !== null}
            className={[
              "flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl",
              "border border-[rgba(255,255,255,0.12)]",
              "bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.10)]",
              "text-text-primary text-sm font-medium",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-[rgba(255,255,255,0.2)]",
            ].join(" ")}
          >
            {loading === plan.id ? (
              <Loader2 size={15} className="animate-spin text-text-muted shrink-0" />
            ) : (
              <Bitcoin size={15} className="text-text-muted shrink-0" />
            )}
            <span>
              {plan.label} — {plan.price}
            </span>
          </button>
        ))}
      </div>

      {error && (
        <div className="text-center space-y-2">
          <p className="text-sm text-live">{error}</p>
          <a
            href={waLink("Hi, I'd like to pay for my IPTV UK subscription with cryptocurrency.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-text-muted hover:text-text-secondary underline underline-offset-2 transition-colors"
          >
            Contact us on WhatsApp instead
          </a>
        </div>
      )}
    </div>
  );
}
