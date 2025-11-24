import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BacTimeToZeroCalculator from '@/components/BacTimeToZeroCalculator';
import MarkdownContent from '@/components/MarkdownContent';
import FAQ from '@/components/FAQ';
import { Locale, defaultLocale, locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const metadata = await getTranslations({ locale, namespace: 'metadata' });
  const t = await getTranslations({ locale, namespace: 'timeToZero' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/bac-time-to-zero-calculator`;
  const imageUrl = `${SITE_URL}/og-image.svg`;

  return {
    title: `${t('title')} | ${metadata('siteName')}`,
    description: t('description'),
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: `${SITE_URL}/bac-time-to-zero-calculator`,
        'x-default': `${SITE_URL}/bac-time-to-zero-calculator`,
      },
    },
    openGraph: {
      type: 'article',
      locale,
      url: localizedUrl,
      title: t('title'),
      description: t('description'),
      siteName: metadata('siteName'),
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

export default async function BacTimeToZeroPage({ params }: PageProps) {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'timeToZero' });

  const docsMarkdown = `
# ${t('docs.aboutTitle')}

${t('docs.aboutContent')}

## ${t('docs.factorsTitle')}

${t('docs.factorsContent')}

## ${t('docs.mythsTitle')}

${t('docs.mythsContent')}

## ${t('docs.safetyTitle')}

${t('docs.safetyContent')}
`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t('title'),
    description: t('description'),
    url: `${SITE_URL}/bac-time-to-zero-calculator`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
  };

  const faqItems = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('heroSubtitle')}
            </p>
          </div>

          <div id="tool" className="mb-16">
            <BacTimeToZeroCalculator defaultCountryCode="US" />
          </div>

          <div className="mb-16">
            <MarkdownContent content={docsMarkdown} />
          </div>

          <div className="mb-16">
            <FAQ
              items={faqItems}
              title={t('faqTitle')}
              defaultOpenIndex={0}
              allowMultiple={false}
              showCategory={false}
            />
          </div>

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
