/**
 * /privacy-policy/ — Privacy Policy
 */

import type { Metadata } from 'next'
import Link from 'next/link'

import { buildMetadata } from '@/lib/seo'
import { Navbar }        from '@/components/organisms/Navbar'

export function generateMetadata(): Metadata {
  return buildMetadata({
    title:       'Privacy Policy | IPTV UK Subscription',
    description: 'Privacy policy for IPTV UK Subscription. How we collect, use and protect your personal data in compliance with UK GDPR.',
    canonical:   '/privacy-policy/',
    noindex:     false,
  })
}

const LAST_UPDATED = '27 March 2026'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#08090D] pt-32 pb-20 px-6">
        <div className="container-site max-w-3xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-display text-white leading-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-white/40 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

          <div className="prose-section space-y-8 text-white/60 text-base leading-relaxed">

            <section>
              <h2 className="text-xl font-display text-white mb-3">1. Who We Are</h2>
              <p>
                IPTV UK Subscription operates at <strong className="text-white/80">iptvuksubscription.uk</strong>. We are a digital subscription service providing IPTV access to customers in the United Kingdom. Our registered legal entity is an LLC registered in New Mexico, USA.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">2. Data We Collect</h2>
              <p>
                When you use our service or contact us, we may collect the following information:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-3 text-white/50">
                <li>Name and contact details (WhatsApp number or email address)</li>
                <li>Device type (for setup assistance)</li>
                <li>Payment confirmation information (transaction ID — not card details)</li>
                <li>UK city or region (to confirm UK residency for service eligibility)</li>
                <li>Website usage data via analytics (page views, session duration)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">3. How We Use Your Data</h2>
              <p>We use your data solely to:</p>
              <ul className="list-disc list-inside space-y-1 mt-3 text-white/50">
                <li>Deliver your IPTV subscription credentials</li>
                <li>Provide customer support via WhatsApp or email</li>
                <li>Process and verify payments</li>
                <li>Improve our service and website experience</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-4">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">4. Payment Data</h2>
              <p>
                We do not store payment card details. All card payments are processed by PayPal on their encrypted platform. Cryptocurrency payments are processed by NOWPayments. Neither payment processor shares full card or wallet details with us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">5. Your Rights</h2>
              <p>
                Under UK GDPR, you have the right to access, correct, or delete your personal data at any time. To exercise any of these rights, contact us at{' '}
                <a href="mailto:support@iptvuksubscription.uk" className="text-[#EF4136] hover:underline">
                  support@iptvuksubscription.uk
                </a>{' '}
                or via WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">6. Cookies</h2>
              <p>
                Our website uses minimal cookies for analytics purposes only. We do not use advertising cookies or tracking pixels. You can disable cookies in your browser settings at any time without affecting core site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display text-white mb-3">7. Contact</h2>
              <p>
                For any privacy-related queries, contact us at{' '}
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
