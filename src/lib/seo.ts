import { Locale, locales, defaultLocale, getLocalizedPath } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/**
 * Generates the hreflang alternates for a given path across all supported locales.
 * @param path - The path relative to the locale root (e.g., '/about', '/' for home)
 */
export function getLanguageAlternates(path: string) {
  const languages: Record<string, string> = {};
  
  locales.forEach((locale) => {
    const pathname = getLocalizedPath(locale, path);
    // Ensure we don't have double slashes if pathname starts with / and SITE_URL ends with / (though SITE_URL usually doesn't)
    // getLocalizedPath returns something like "/" or "/about" or "/fr/about"
    const url = `${SITE_URL}${pathname === '/' ? '' : pathname}`;
    languages[locale] = url;
  });

  // Set x-default to the default locale's URL
  languages['x-default'] = languages[defaultLocale];

  return languages;
}

export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    name: 'SafeBAC',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.svg`, // Assuming logo exists
    },
    sameAs: [
      // Add social profiles here if available
    ],
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.item}`,
    })),
  };
}
