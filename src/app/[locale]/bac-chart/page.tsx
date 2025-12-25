import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BacChart from '@/components/BacChart';
import MarkdownContent from '@/components/MarkdownContent';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import { Locale, defaultLocale, locales } from '@/lib/i18n';
import { getLanguageAlternates, getOrganizationSchema } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'bacChart' });
  const metadata = await getTranslations({ locale, namespace: 'metadata' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/bac-chart`;
  const imageUrl = `${SITE_URL}/og-image.svg`;

  return {
    title: `${t('title')} | ${metadata('siteName')}`,
    description: t('description'),
    alternates: {
      canonical: localizedUrl,
      languages: getLanguageAlternates('/bac-chart'),
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

export default async function BacChartPage({ params }: PageProps) {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'bacChart' });
  const home = await getTranslations({ locale, namespace: 'home' });

  const docsMarkdown = `
## ${t('docs.readChartTitle')}

${t('docs.readChartContent')}

## ${t('docs.variablesTitle')}

${t('docs.variablesContent')}

## ${t('docs.safetyTitle')}

${t('docs.safetyContent')}
`;

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
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* Chart Component */}
          <div className="mb-12">
            <BacChart unit="imperial" />
          </div>

          {/* Educational Content */}
          <div className="mb-16">
            <MarkdownContent content={docsMarkdown} />
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <FAQ
              items={faqItems}
              title={t('faqTitle')}
              defaultOpenIndex={0}
              allowMultiple={false}
              showCategory={false}
            />
          </div>

          {/* CTA to Main Calculator */}
          <CTA
            title={home('ctaTitle')}
            description={home('ctaDescription')}
            primaryButton={{
              text: home('ctaButton'),
              href: "/",
            }}
            variant="gradient"
            size="md"
          />

          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...getOrganizationSchema(),
            }) }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
