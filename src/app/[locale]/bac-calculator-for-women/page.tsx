import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BacCalculator from '@/components/BacCalculator';
import MarkdownContent from '@/components/MarkdownContent';
import FAQ from '@/components/FAQ';
import { Locale, defaultLocale, getLocalizedPath, locales } from '@/lib/i18n';
import { getLanguageAlternates, getOrganizationSchema } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'bacForWomen' });
  const metadata = await getTranslations({ locale, namespace: 'metadata' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/bac-calculator-for-women`;
  const imageUrl = `${SITE_URL}/og-image.svg`;

  return {
    title: `${t('title')} | ${metadata('siteName')}`,
    description: t('description'),
    alternates: {
      canonical: localizedUrl,
      languages: getLanguageAlternates('/bac-calculator-for-women'),
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

export default async function BacCalculatorForWomenPage({ params }: PageProps) {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'bacForWomen' });

  // Markdown content explaining the biology
  const biologyMarkdown = `
## ${t('docs.biologyTitle')}

${t('docs.biologyContent')}

### ${t('docs.waterTitle')}

${t('docs.waterContent')}

### ${t('docs.enzymesTitle')}

${t('docs.enzymesContent')}

### ${t('docs.hormonesTitle')}

${t('docs.hormonesContent')}
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

          {/* Calculator Section - Defaulted to Female */}
          <div id="tool" className="mb-16">
            <BacCalculator defaultCountryCode="US" defaultSex="female" enableLocalStorage />
          </div>

          {/* Educational Content */}
          <div className="mb-16">
            <MarkdownContent content={biologyMarkdown} />
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-700">
              <p className="mb-2 font-semibold">Explore more tools:</p>
              <ul className="flex flex-wrap gap-3 text-sm">
                <li>
                  <a
                    href={getLocalizedPath(locale, '/bac-chart')}
                    className="text-sky-700 hover:text-sky-900 hover:underline"
                  >
                    View BAC Chart
                  </a>
                </li>
                <li>
                  <a
                    href={getLocalizedPath(locale, '/advanced-bac-calculator')}
                    className="text-sky-700 hover:text-sky-900 hover:underline"
                  >
                    Advanced Calculator
                  </a>
                </li>
              </ul>
            </div>
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
