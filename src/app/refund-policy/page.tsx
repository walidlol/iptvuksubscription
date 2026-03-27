/**
 * /refund-policy/ — Refund Policy
 */

import type { Metadata } from 'next'
import Link from 'next/link'

import { buildMetadata } from '@/lib/seo'
import { Navbar }        from '@/components/organisms/Navbar'

export function generateMetadata(): Metadata {
  return buildMetadata({
    title:       'Refund Policy | IPTV UK Subscription',
    description: 'Refund policy for IPTV UK Subscription. We offer a free 24-hour trial before purchase. Refund terms explained clearly.',
    canonical:   '/refund-policy/',
    noindex:     false,
  })
}

const LAST_UPDATED = '27 March 2026'

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#08090D] pt-32 pb-20 px-6">
        <div className="container-site max-w-3xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-display text-white leading-tight mb-2">
            Refund Policy
          </h1>
          <p className="text-white/40 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

          <div className="prose-section space-y-8 text-white/60 text-base leading-relaxed">

            <section>
              <h2 className="text-xl font-display text-white mb-3">Our Commitment</h2>
              <p>
                We offer a free 24-hour trial of our full IPTV UK service specifically so you can test everything before spending any money. We encourage all new customers to take the trial before purchasing. Visit our{' '}
                <Link href="/free-trial/" className="text-[#EF4136] hover:underline">free trial page</Link>{' '}
                to claim your slot.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">Eligibility for a Full Refund</h2>
              <p>You are eligible for a full refund if:</p>
              <ul className="list-disc list-inside space-y-2 mt-3 text-white/50">
                <li>We are unable to deliver your credentials within 2 hours of payment.</li>
                <li>We cannot resolve a technical issue preventing service access within 24 hours of your subscription start date.</li>
                <li>You were charged incorrectly (wrong amount or duplicate charge).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">Refunds After Service Delivery</h2>
              <p>
                Because IPTV credentials are digital goods delivered instantly, refunds after successful delivery and access are not automatically guaranteed. However, we assess each case individually. If you are genuinely unsatisfied with the service for a reason not related to your own equipment or internet connection, please contact us on WhatsApp and we will do our best to find a fair resolution.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">Non-Refundable Circumstances</h2>
              <p>Refunds will not be issued in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 mt-3 text-white/50">
                <li>You have used the service for more than 48 hours after delivery.</li>
                <li>Buffering or quality issues caused by your own internet connection speed.</li>
                <li>Incompatibility with a device type that we did not confirm as supported.</li>
                <li>Violation of our Terms of Service (sharing credentials, reselling, etc.).</li>
                <li>Change of mind after credential delivery and service activation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">How to Request a Refund</h2>
              <p>
                To request a refund, contact us via WhatsApp at +44 7451 296412 or email{' '}
                <a href="mailto:support@iptvuksubscription.uk" className="text-[#EF4136] hover:underline">
                  support@iptvuksubscription.uk
                </a>{' '}
                with your payment confirmation and a brief description of the issue. We aim to respond within 2 hours during UK hours (9am–11pm).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">Processing Time</h2>
              <p>
                Approved refunds are processed within 3–5 business days via the original payment method. PayPal refunds typically appear in your account within 1–3 business days. Cryptocurrency refunds are processed within 24 hours to your specified wallet address.
              </p>
            </section>

          </div>

          <p className="text-white/30 text-sm mt-16">
            <Link href="/" className="text-[#EF4136] hover:underline">← Back to home</Link>
          </p>

        </div>
      </div>
    </>
  )
}
