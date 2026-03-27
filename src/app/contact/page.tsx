/**
 * /contact/ — Contact Us page
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

import { buildMetadata }                                      from '@/lib/seo'
import { generateBreadcrumbSchema, schemaToString }           from '@/lib/schema'
import { Navbar }                                             from '@/components/organisms/Navbar'

export function generateMetadata(): Metadata {
  return buildMetadata({
    title:       'Contact IPTV UK Subscription | WhatsApp & Email',
    description: 'Contact IPTV UK Subscription support via WhatsApp or email. UK support team available 9am–11pm daily. Average response time under 5 minutes.',
    canonical:   '/contact/',
    keywords:    ['iptv uk contact', 'iptv uk support', 'iptv uk whatsapp'],
  })
}

const breadcrumbJsonLd = schemaToString(generateBreadcrumbSchema([
  { name: 'Home',    url: '/'        },
  { name: 'Contact', url: '/contact/' },
]))

export default function ContactPage() {
  return (
    <>
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <Navbar />

      <div className="min-h-screen bg-[#08090D] pt-32 pb-20 px-6">
        <div className="container-site max-w-2xl mx-auto">

          <h1 className="text-5xl md:text-6xl font-display text-white leading-tight mb-4 text-center">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-white/60 text-lg text-center mb-12">
            UK support team available every day, 9am–11pm. Average response time: under 5 minutes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* WhatsApp */}
            <a
              href="https://wa.me/447451296412?text=Hi%2C+I+have+a+question+about+IPTV+UK+Subscription."
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-8 flex flex-col items-center gap-4 text-center group hover:border-[#25D366]/40 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-display text-white mb-1">WhatsApp</h2>
                <p className="text-sm text-white/50">+44 7451 296412</p>
                <p className="text-xs text-[#25D366] mt-2 group-hover:underline">Message us now →</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:support@iptvuksubscription.uk"
              className="glass p-8 flex flex-col items-center gap-4 text-center group hover:border-[#EF4136]/40 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#EF4136]/10 border border-[#EF4136]/25 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#EF4136]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-display text-white mb-1">Email</h2>
                <p className="text-sm text-white/50">support@iptvuksubscription.uk</p>
                <p className="text-xs text-[#EF4136] mt-2 group-hover:underline">Send an email →</p>
              </div>
            </a>

          </div>

          <p className="text-center text-white/30 text-sm mt-12">
            Looking for pricing?{' '}
            <Link href="/plans/" className="text-[#EF4136] hover:text-[#EF4136]/80 transition-colors duration-200">
              View our plans →
            </Link>
          </p>

        </div>
      </div>
    </>
  )
}
