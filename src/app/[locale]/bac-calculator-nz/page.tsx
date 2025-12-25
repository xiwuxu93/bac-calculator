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
  const metadata = await getTranslations({ locale, namespace: 'metadata' });
  const t = await getTranslations({ locale, namespace: 'countryBac' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/bac-calculator-nz`;
  const imageUrl = `${SITE_URL}/og-image.svg`;

  return {
    title: `${t('nz.title')} | ${metadata('siteName')}`,
    description: t('nz.description'),
    alternates: {
      canonical: localizedUrl,
      languages: getLanguageAlternates('/bac-calculator-nz'),
    },
    openGraph: {
      type: 'article',
      locale,
      url: localizedUrl,
      title: t('nz.title'),
      description: t('nz.description'),
      siteName: metadata('siteName'),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t('nz.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('nz.title'),
      description: t('nz.description'),
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BacCalculatorNzPage({ params }: PageProps) {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'countryBac' });

  const docsMarkdown = `
## ${t('nz.legalSectionTitle')}

${t('nz.legalSectionBody')}

## ${t('nz.safetySectionTitle')}

${t('nz.safetySectionBody')}
`;

  const faqItems = [
    {
      question: t('nz.faq.q1'),
      answer: t('nz.faq.a1'),
    },
    {
      question: t('nz.faq.q2'),
      answer: t('nz.faq.a2'),
    },
    {
      question: t('nz.faq.q3'),
      answer: t('nz.faq.a3'),
    },
  ];

  const switchLinks = [
    { href: '/bac-calculator-uk', labelKey: 'shared.names.uk' },
    { href: '/bac-calculator-australia', labelKey: 'shared.names.au' },
    { href: '/bac-calculator-maroc', labelKey: 'shared.names.ma' },
    { href: '/bac-calculator-dz', labelKey: 'shared.names.dz' },
  ] as const;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('nz.title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('nz.heroSubtitle')}
            </p>
          </div>

          <div id="tool" className="mb-16">
            <BacCalculator defaultCountryCode="NZ" enableLocalStorage />
          </div>

          <div className="mb-16">
            <MarkdownContent content={docsMarkdown} />
          </div>

          <div className="mb-16">
            <FAQ
              items={faqItems}
              title={t('nz.faqTitle')}
              defaultOpenIndex={0}
              allowMultiple={false}
              showCategory={false}
            />
          </div>

          <div className="mb-16 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-700">
            <p className="mb-2 font-semibold">{t('shared.switchTitle')}</p>
            <p className="mb-3 text-xs text-gray-600">{t('shared.switchIntro')}</p>
            <ul className="flex flex-wrap gap-3 text-sm">
              <li>
                <a
                  href={getLocalizedPath(locale, '/bac-chart')}
                  className="font-medium text-slate-700 hover:text-sky-700 hover:underline"
                >
                  View BAC Chart
                </a>
              </li>
              {switchLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={getLocalizedPath(locale, link.href)}
                    className="text-sky-700 hover:text-sky-900 hover:underline"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

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