import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BacCalculator from '@/components/BacCalculator';
import MarkdownContent from '@/components/MarkdownContent';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import { Locale, defaultLocale, getLocalizedPath, locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}`;
  const imageUrl = `${SITE_URL}/og-image.svg`;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
    },
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: SITE_URL,
        'x-default': SITE_URL,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: localizedUrl,
      title: t('title'),
      description: t('description'),
      siteName: t('siteName'),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const home = await getTranslations({ locale, namespace: 'home' });
  const metadata = await getTranslations({ locale, namespace: 'metadata' });

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: metadata('siteName'),
    description: metadata('description'),
    url: SITE_URL,
    inLanguage: locale,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
  };

  // Example markdown content for documentation
  const exampleMarkdown = `
# ${home('aboutTitle')}

${home('aboutContent')}

## ${home('howToUseTitle')}

1. ${home('howToUseStep1')}
2. ${home('howToUseStep2')}
3. ${home('howToUseStep3')}

## ${home('technicalTitle')}

${home('technicalContent')}

## ${home('limitationsTitle')}

${home('limitationsContent')}

## ${home('legalLimitsTitle')}

${home('legalLimitsContent')}

## ${home('effectsTitle')}

${home('effectsContent')}

## ${home('safetyTitle')}

${home('safetyContent')}
`;

  const faqItems = [
    {
      question: home('faqQ1'),
      answer: home('faqA1'),
    },
    {
      question: home('faqQ2'),
      answer: home('faqA2'),
    },
    {
      question: home('faqQ3'),
      answer: home('faqA3'),
    },
    {
      question: home('faqQ4'),
      answer: home('faqA4'),
    },
    {
      question: home('faqQ5'),
      answer: home('faqA5'),
    },
    {
      question: home('faqQ6'),
      answer: home('faqA6'),
    },
  ];

  const relatedLinks = [
    {
      href: '/bac-time-to-zero-calculator',
      label: home('relatedTimeToZero'),
    },
    {
      href: '/how-to-calculate-bac',
      label: home('relatedHowTo'),
    },
    {
      href: '/most-accurate-bac-calculator',
      label: home('relatedAccuracy'),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
          {/* Hero + Tool Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {home('title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {home('description')}
            </p>
          </div>

          {/* Main Tool Area */}
          <div id="tool" className="mb-16">
            <BacCalculator defaultCountryCode="US" enableLocalStorage />
          </div>

          {/* Documentation Section */}
          <div className="mb-16">
            <MarkdownContent
              content={exampleMarkdown}
            />
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-700">
              <p className="mb-2 font-semibold">{home('relatedToolsTitle')}</p>
              <ul className="flex flex-wrap gap-3 text-sm">
                {relatedLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={getLocalizedPath(locale, link.href)}
                      className="text-sky-700 hover:text-sky-900 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <FAQ
              items={faqItems}
              title={home('faqTitle')}
              defaultOpenIndex={0}
              allowMultiple={false}
              showCategory={false}
            />
          </div>

          {/* CTA Section */}
          <CTA
            title={home('ctaTitle')}
            description={home('ctaDescription')}
            primaryButton={{
              text: home('ctaButton'),
              href: "#tool",
            }}
            variant="gradient"
            size="md"
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
