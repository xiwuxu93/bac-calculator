import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BacCalculator from '@/components/BacCalculator';
import MarkdownContent from '@/components/MarkdownContent';
import FAQ from '@/components/FAQ';
import { Locale, defaultLocale, getLocalizedPath, locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const metadata = await getTranslations({ locale, namespace: 'metadata' });
  const t = await getTranslations({ locale, namespace: 'countryBac' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/bac-calculator-dz`;
  const imageUrl = `${SITE_URL}/og-image.svg`;

  return {
    title: `${t('dz.title')} | ${metadata('siteName')}`,
    description: t('dz.description'),
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: `${SITE_URL}/bac-calculator-dz`,
        'x-default': `${SITE_URL}/bac-calculator-dz`,
      },
    },
    openGraph: {
      type: 'article',
      locale,
      url: localizedUrl,
      title: t('dz.title'),
      description: t('dz.description'),
      siteName: metadata('siteName'),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t('dz.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('dz.title'),
      description: t('dz.description'),
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BacCalculatorDzPage({ params }: PageProps) {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'countryBac' });
  const countryName = t('shared.names.dz');

  const docsMarkdown = `
## ${t('shared.legalSectionTitle', { countryName })}

${t('shared.faqA1', { countryName })}

## ${t('shared.safetySectionTitle', { countryName })}

${t('shared.safetySectionBody', { countryName })}
`;

  const faqItems = [
    {
      question: t('shared.faqQ1', { countryName }),
      answer: t('shared.faqA1', { countryName }),
    },
    {
      question: t('shared.faqQ2', { countryName }),
      answer: t('shared.faqA2', { countryName }),
    },
    {
      question: t('shared.faqQ3', { countryName }),
      answer: t('shared.faqA3', { countryName }),
    },
  ];

  const switchLinks = [
    { href: '/bac-calculator-uk', labelKey: 'shared.names.uk' },
    { href: '/bac-calculator-australia', labelKey: 'shared.names.au' },
    { href: '/bac-calculator-nz', labelKey: 'shared.names.nz' },
    { href: '/bac-calculator-maroc', labelKey: 'shared.names.ma' },
  ] as const;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('dz.title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('dz.heroSubtitle')}
            </p>
          </div>

          <div id="tool" className="mb-16">
            <BacCalculator defaultCountryCode="DZ" enableLocalStorage />
          </div>

          <div className="mb-16">
            <MarkdownContent content={docsMarkdown} />
          </div>

          <div className="mb-16">
            <FAQ
              items={faqItems}
              title={t('shared.faqTitle', { countryName })}
              defaultOpenIndex={0}
              allowMultiple={false}
              showCategory={false}
            />
          </div>

          <div className="mb-16 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-700">
            <p className="mb-2 font-semibold">{t('shared.switchTitle')}</p>
            <p className="mb-3 text-xs text-gray-600">{t('shared.switchIntro')}</p>
            <ul className="flex flex-wrap gap-3 text-sm">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
