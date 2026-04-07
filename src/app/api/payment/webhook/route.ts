import { NextResponse } from "next/server";
import { createHmac } from "crypto";

interface NowPaymentsPayload {
  payment_id?: number;
  payment_status?: string;
  pay_address?: string;
  price_amount?: number;
  price_currency?: string;
  order_id?: string;
}

/** Sort object keys recursively and stringify — required for NOWPayments HMAC-SHA512 */
function sortedStringify(obj: Record<string, unknown>): string {
  const sorted = Object.keys(obj)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
  return JSON.stringify(sorted);
}

export async function POST(request: Request): Promise<NextResponse> {
  const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
  const rawBody = await request.text();

  let payload: NowPaymentsPayload;
  try {
    payload = JSON.parse(rawBody) as NowPaymentsPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Verify HMAC-SHA512 signature if IPN secret is configured
  if (ipnSecret) {
    const sig = request.headers.get("x-nowpayments-sig");
    if (!sig) {
      return NextResponse.json(
        { error: "Missing x-nowpayments-sig header" },
        { status: 401 }
      );
    }

    const expected = createHmac("sha512", ipnSecret)
      .update(sortedStringify(payload as unknown as Record<string, unknown>))
      .digest("hex");

    if (sig !== expected) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }
  }

  const { payment_status, order_id, payment_id, price_amount, price_currency } =
    payload;

  // Log all status transitions
  console.log(
    `[NOWPayments] payment_id=${payment_id} order=${order_id} ` +
      `status=${payment_status} amount=${price_amount} ${price_currency}`
  );

  // Confirmed / complete payment
  if (payment_status === "finished" || payment_status === "confirmed") {
    console.log(`[NOWPayments] ✓ Payment confirmed — order: ${order_id}`);
    // TODO: Update subscription record in database
    // TODO: Send confirmation message via WhatsApp / email
  }

  // Waiting for more confirmations on-chain
  if (payment_status === "confirming") {
    console.log(`[NOWPayments] ⏳ Payment confirming — order: ${order_id}`);
  }

  // Failed / expired
  if (payment_status === "failed" || payment_status === "expired") {
    console.log(
      `[NOWPayments] ✗ Payment ${payment_status} — order: ${order_id}`
    );
  }

  return NextResponse.json({ received: true });
}
