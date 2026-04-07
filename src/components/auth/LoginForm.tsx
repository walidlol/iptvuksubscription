"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import GlassButton from "@/components/ui/GlassButton";
import { waLink } from "@/lib/wa";

type Step = "phone" | "code";

interface ApiResponse {
  success: boolean;
  step?: string;
  code?: string;
  whatsapp_sent?: boolean;
  message?: string;
  error?: string;
}

// ─── Glass input class ───────────────────────────────────────────────────────

const GLASS_INPUT = [
  "w-full px-4 py-3",
  "bg-[rgba(255,255,255,0.06)]",
  "border border-[rgba(255,255,255,0.12)]",
  "rounded-xl",
  "text-[#F2F2F7] placeholder:text-[#6E6E7A]",
  "backdrop-blur-sm",
  "focus:outline-none focus:border-[rgba(255,255,255,0.35)] focus:bg-[rgba(255,255,255,0.10)]",
  "transition-colors duration-200",
].join(" ");

const OTP_INPUT = [
  "w-12 h-14 text-center text-xl font-bold",
  "bg-[rgba(255,255,255,0.06)]",
  "border border-[rgba(255,255,255,0.12)]",
  "rounded-xl",
  "text-[#F2F2F7]",
  "backdrop-blur-sm",
  "focus:outline-none focus:border-[rgba(255,255,255,0.35)] focus:bg-[rgba(255,255,255,0.10)]",
  "transition-colors duration-200",
].join(" ");

// ─── Component ───────────────────────────────────────────────────────────────

export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [displayCode, setDisplayCode] = useState("");
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first OTP input when switching to code step
  useEffect(() => {
    if (step === "code") {
      inputRefs.current[0]?.focus();
    }
  }, [step]);

  // ─── Step 1: Request Code ───

  async function handlePhoneSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data: ApiResponse = await res.json();

      if (!data.success) {
        setError(data.error ?? "Something went wrong");
        return;
      }

      setWhatsappSent(data.whatsapp_sent ?? false);
      setDisplayCode(data.code ?? ""); // only set in MVP fallback
      setStep("code");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ─── Step 2: Verify Code ───

  async function handleCodeSubmit(code: string) {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });

      const data: ApiResponse = await res.json();

      if (!data.success) {
        setError(data.error ?? "Invalid code");
        setOtpDigits(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        return;
      }

      // Session cookie set by API — redirect
      router.push("/");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ─── OTP Input Handlers ───

  function handleOTPChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const updated = [...otpDigits];
    updated[index] = digit;
    setOtpDigits(updated);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = updated.join("");
    if (fullCode.length === 6) {
      handleCodeSubmit(fullCode);
    }
  }

  function handleOTPKeyDown(index: number, key: string) {
    if (key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleOTPPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setOtpDigits(pasted.split(""));
      handleCodeSubmit(pasted);
    }
  }

  // ─── Render ───

  return (
    <div className="w-full">
      {step === "phone" ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              UK Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07451 296 412"
              required
              autoFocus
              className={GLASS_INPUT}
            />
          </div>

          {error && (
            <p className="text-sm text-live">{error}</p>
          )}

          <GlassButton
            type="submit"
            disabled={loading || !phone.trim()}
            variant="primary"
            size="lg"
            className="w-full justify-center"
          >
            {loading ? "Sending..." : "Get Verification Code"}
          </GlassButton>

          {/* Quick access WhatsApp link */}
          <div className="pt-2 text-center">
            <a
              href={waLink("Hi, I'd like to access my IPTV UK account.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              <MessageCircle size={16} />
              Quick access via WhatsApp
            </a>
          </div>
        </form>
      ) : (
        <div className="space-y-5">
          {/* WhatsApp API mode: code sent to phone */}
          {whatsappSent && (
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] text-center">
              <MessageCircle size={20} className="mx-auto mb-2 text-green-400" />
              <p className="text-sm text-text-secondary">
                Verification code sent to your WhatsApp.
              </p>
              <p className="mt-1 text-xs text-text-muted">
                Check your WhatsApp messages and enter the 6-digit code below.
              </p>
            </div>
          )}

          {/* MVP fallback: show code on screen */}
          {!whatsappSent && displayCode && (
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] text-center">
              <p className="text-sm text-text-muted mb-2">
                Send this code to our WhatsApp to verify:
              </p>
              <p className="font-heading text-3xl tracking-[0.3em] text-text-primary">
                {displayCode}
              </p>
              <a
                href={waLink(`My verification code is: ${displayCode}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <MessageCircle size={14} />
                Open WhatsApp
              </a>
            </div>
          )}

          {/* OTP Input */}
          <div>
            <p className="text-sm text-text-secondary mb-3 text-center">
              Enter your 6-digit verification code
            </p>
            <div
              className="flex gap-2 justify-center"
              onPaste={handleOTPPaste}
            >
              {otpDigits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(i, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(i, e.key)}
                  className={OTP_INPUT}
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-live text-center">{error}</p>
          )}

          {loading && (
            <p className="text-sm text-text-muted text-center animate-pulse">
              Verifying...
            </p>
          )}

          {/* Back button */}
          <button
            type="button"
            onClick={() => {
              setStep("phone");
              setOtpDigits(["", "", "", "", "", ""]);
              setDisplayCode("");
              setWhatsappSent(false);
              setError("");
            }}
            className="w-full text-sm text-text-muted hover:text-text-primary transition-colors text-center"
          >
            &larr; Use a different number
          </button>
        </div>
      )}
    </div>
  );
}
