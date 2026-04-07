import { NextResponse } from "next/server";
import { createSession, sessionCookieOptions } from "@/lib/auth";

interface VerifyRequestBody {
  phone: string;
  code: string;
}

// ─── In-memory OTP store (no external DB needed for MVP) ─────────────────────
// Maps normalised phone → { code, expiresAt }
const otpStore = new Map<string, { code: string; expiresAt: number }>();

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

/** Validate UK phone number: must be 10-11 digits, optionally prefixed with +44 or 0 */
function normalizeUKPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");

  // +447451296412 → 447451296412
  if (digits.startsWith("44") && digits.length === 12) {
    return digits;
  }
  // 07451296412 → 447451296412
  if (digits.startsWith("0") && digits.length === 11) {
    return "44" + digits.slice(1);
  }
  // 7451296412 → 447451296412
  if (digits.length === 10 && !digits.startsWith("0")) {
    return "44" + digits;
  }

  return null;
}

/** Generate a random 6-digit code */
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP via WhatsApp Business Cloud API.
 * Requires env vars:
 *   WHATSAPP_BUSINESS_TOKEN    — permanent system user token from Meta
 *   WHATSAPP_PHONE_NUMBER_ID   — phone number ID from Meta WhatsApp Business API
 *
 * Returns true on success, false on failure.
 */
async function sendWhatsAppOTP(
  toPhone: string,
  code: string
): Promise<boolean> {
  const token = process.env.WHATSAPP_BUSINESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    return false; // WhatsApp API not configured → fall back to screen display
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: toPhone, // international format, e.g. 447451296412
          type: "text",
          text: {
            body: `Your IPTV UK verification code is: *${code}*\n\nValid for 10 minutes. Do not share this code with anyone.`,
          },
        }),
      }
    );

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as Record<
        string,
        unknown
      >;
      console.error("[WhatsApp OTP] Failed to send:", err);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[WhatsApp OTP] Network error:", err);
    return false;
  }
}

// ─── POST /api/auth/verify ────────────────────────────────────────────────────
// Step 1: { phone } → generates OTP, sends via WhatsApp if configured,
//          otherwise returns { code } for MVP screen display
// Step 2: { phone, code } → verifies OTP, sets session cookie

export async function POST(request: Request): Promise<NextResponse> {
  let body: Partial<VerifyRequestBody>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { phone: rawPhone, code } = body;

  if (!rawPhone || typeof rawPhone !== "string") {
    return NextResponse.json(
      { success: false, error: "Phone number is required" },
      { status: 400 }
    );
  }

  const phone = normalizeUKPhone(rawPhone);
  if (!phone) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid UK phone number" },
      { status: 400 }
    );
  }

  // ─── Step 1: Generate OTP ────────────────────────────────────────────────
  if (!code) {
    const otp = generateOTP();
    otpStore.set(phone, {
      code: otp,
      expiresAt: Date.now() + OTP_EXPIRY_MS,
    });

    // Try to send via WhatsApp Business Cloud API
    const whatsappSent = await sendWhatsAppOTP(phone, otp);

    if (whatsappSent) {
      // Real WhatsApp delivery — do NOT expose the code
      return NextResponse.json({
        success: true,
        step: "code_sent",
        whatsapp_sent: true,
        message: "Verification code sent to your WhatsApp.",
      });
    }

    // Fallback: return code for display on screen (MVP mode)
    return NextResponse.json({
      success: true,
      step: "code_generated",
      whatsapp_sent: false,
      code: otp,
      message: `Send this code to our WhatsApp to verify: ${otp}`,
    });
  }

  // ─── Step 2: Verify OTP ──────────────────────────────────────────────────
  if (typeof code !== "string" || code.length !== 6) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid 6-digit code" },
      { status: 400 }
    );
  }

  const stored = otpStore.get(phone);

  if (!stored) {
    return NextResponse.json(
      {
        success: false,
        error: "No verification code found. Please request a new one.",
      },
      { status: 400 }
    );
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(phone);
    return NextResponse.json(
      {
        success: false,
        error: "Code has expired. Please request a new one.",
      },
      { status: 400 }
    );
  }

  if (stored.code !== code) {
    return NextResponse.json(
      { success: false, error: "Invalid code. Please try again." },
      { status: 400 }
    );
  }

  // OTP valid — clean up and create session
  otpStore.delete(phone);

  const token = await createSession(phone);
  const cookieOpts = sessionCookieOptions();

  const response = NextResponse.json({
    success: true,
    step: "verified",
    message: "Phone verified successfully",
  });

  response.cookies.set(cookieOpts.name, token, {
    httpOnly: cookieOpts.httpOnly,
    secure: cookieOpts.secure,
    sameSite: cookieOpts.sameSite,
    path: cookieOpts.path,
    maxAge: cookieOpts.maxAge,
  });

  return response;
}
