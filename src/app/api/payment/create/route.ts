import { NextResponse } from "next/server";

const PLAN_CONFIG = {
  monthly: {
    amount: 9.99,
    description: "IPTV UK Monthly Plan — 30,000+ Channels",
  },
  annual: {
    amount: 59.0,
    description: "IPTV UK Annual Plan — Best Value",
  },
  family: {
    amount: 129.99,
    description: "IPTV UK Family Plan — 4 Devices",
  },
} as const;

type PlanId = keyof typeof PLAN_CONFIG;

interface RequestBody {
  plan?: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://iptvuksubscription.uk";

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "Payment service not configured" },
      { status: 503 }
    );
  }

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const plan = body.plan as PlanId;
  if (!plan || !(plan in PLAN_CONFIG)) {
    return NextResponse.json(
      { success: false, error: "Invalid plan. Choose: monthly, annual, family" },
      { status: 400 }
    );
  }

  const config = PLAN_CONFIG[plan];
  const orderId = `${plan}_${Date.now()}`;

  try {
    const res = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: config.amount,
        price_currency: "gbp",
        order_id: orderId,
        order_description: config.description,
        success_url: `${siteUrl}/pricing?payment=success`,
        cancel_url: `${siteUrl}/pricing#crypto`,
      }),
    });

    if (!res.ok) {
      const errorData = (await res.json().catch(() => ({}))) as Record<
        string,
        unknown
      >;
      console.error("NOWPayments invoice error:", errorData);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to create payment. Please try WhatsApp instead.",
        },
        { status: 502 }
      );
    }

    const data = (await res.json()) as { invoice_url?: string };

    if (!data.invoice_url) {
      return NextResponse.json(
        { success: false, error: "Invalid response from payment provider" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, invoiceUrl: data.invoice_url });
  } catch (err) {
    console.error("Payment create error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Payment service unavailable. Please try WhatsApp.",
      },
      { status: 503 }
    );
  }
}
