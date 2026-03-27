/**
 * /terms-of-service/ — Terms of Service
 */

import type { Metadata } from 'next'
import Link from 'next/link'

import { buildMetadata } from '@/lib/seo'
import { Navbar }        from '@/components/organisms/Navbar'

export function generateMetadata(): Metadata {
  return buildMetadata({
    title:       'Terms of Service | IPTV UK Subscription',
    description: 'Terms of service for IPTV UK Subscription. Please read before purchasing a subscription plan.',
    canonical:   '/terms-of-service/',
    noindex:     false,
  })
}

const LAST_UPDATED = '27 March 2026'

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#08090D] pt-32 pb-20 px-6">
        <div className="container-site max-w-3xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-display text-white leading-tight mb-2">
            Terms of Service
          </h1>
          <p className="text-white/40 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

          <div className="prose-section space-y-8 text-white/60 text-base leading-relaxed">

            <section>
              <h2 className="text-xl font-display text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By purchasing a subscription from IPTV UK Subscription (iptvuksubscription.uk), you agree to these Terms of Service in full. If you do not agree, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">2. The Service</h2>
              <p>
                We provide access to an IPTV content delivery platform via login credentials (server URL, username, password). These credentials are delivered to your WhatsApp or email after payment is confirmed. The service provides access to live channels and on-demand video content as described on our plans page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">3. Subscription & Payment</h2>
              <p>
                Subscriptions are sold as described on the <Link href="/plans/" className="text-[#EF4136] hover:underline">/plans/</Link> page. The Standard plan is a monthly rolling subscription. Annual plans (Premium and Family) are billed once per year. Payment is due at the time of purchase. We reserve the right to update pricing — existing subscribers will not be affected until their current term expires.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">4. Acceptable Use</h2>
              <p>
                Your subscription is for personal, household use only. You may not resell, redistribute, or share your credentials outside your household. The Family Plan permits up to 5 simultaneous connections within the same household. Violation of these terms may result in immediate termination of your account without refund.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">5. Service Availability</h2>
              <p>
                We aim to maintain 99.9% uptime. Occasional maintenance, server updates, or force majeure events may cause temporary interruptions. We will notify customers of planned downtime via WhatsApp where possible. We do not guarantee uninterrupted service but will work to resolve issues as quickly as possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">6. Refunds</h2>
              <p>
                Please refer to our{' '}
                <Link href="/refund-policy/" className="text-[#EF4136] hover:underline">Refund Policy</Link>{' '}
                for full details. As a general rule, we offer a free 24-hour trial before purchase. Refunds after credential delivery are assessed on a case-by-case basis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, IPTV UK Subscription shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount paid for your current subscription period.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">8. Governing Law</h2>
              <p>
                These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">9. Contact</h2>
              <p>
                For questions about these terms, contact{' '}
                <a href="mailto:support@iptvuksubscription.uk" className="text-[#EF4136] hover:underline">
                  support@iptvuksubscription.uk
                </a>.
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
