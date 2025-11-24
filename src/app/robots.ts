import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const HOST = (() => {
  try {
    return new URL(SITE_URL).host;
  } catch {
    return SITE_URL.replace(/^https?:\/\//, '');
  }
})();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: HOST,
  };
}
