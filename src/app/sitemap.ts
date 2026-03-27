import type { MetadataRoute } from 'next'

const BASE_URL = 'https://iptvuksubscription.uk'
const LAST_MOD = new Date('2026-03-27')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:              `${BASE_URL}/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'weekly',
      priority:         1.0,
    },
    {
      url:              `${BASE_URL}/iptv-uk-subscription/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'weekly',
      priority:         0.9,
    },
    {
      url:              `${BASE_URL}/iptv-subscription-uk/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'weekly',
      priority:         0.9,
    },
    {
      url:              `${BASE_URL}/plans/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'monthly',
      priority:         0.9,
    },
    {
      url:              `${BASE_URL}/channels/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'monthly',
      priority:         0.8,
    },
    {
      url:              `${BASE_URL}/free-trial/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'monthly',
      priority:         0.8,
    },
    {
      url:              `${BASE_URL}/setup-guide/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'monthly',
      priority:         0.7,
    },
    {
      url:              `${BASE_URL}/faq/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'monthly',
      priority:         0.7,
    },
    {
      url:              `${BASE_URL}/reviews/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'weekly',
      priority:         0.7,
    },
    {
      url:              `${BASE_URL}/contact/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'yearly',
      priority:         0.5,
    },
    {
      url:              `${BASE_URL}/privacy-policy/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'yearly',
      priority:         0.3,
    },
    {
      url:              `${BASE_URL}/terms-of-service/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'yearly',
      priority:         0.3,
    },
    {
      url:              `${BASE_URL}/refund-policy/`,
      lastModified:     LAST_MOD,
      changeFrequency: 'yearly',
      priority:         0.3,
    },
  ]
}
