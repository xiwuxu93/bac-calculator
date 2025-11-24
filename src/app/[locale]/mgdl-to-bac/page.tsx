import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BacUnitConverter from '@/components/BacUnitConverter';
import MarkdownContent from '@/components/MarkdownContent';
import { Locale, defaultLocale, locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const metadata = await getTranslations({ locale, namespace: 'metadata' });
  const t = await getTranslations({ locale, namespace: 'unitConversion' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/mgdl-to-bac`;
  const imageUrl = `${SITE_URL}/og-image.svg`;

  return {
    title: `${t('mgdlPage.title')} | ${metadata('siteName')}`,
    description: t('mgdlPage.description'),
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: `${SITE_URL}/mgdl-to-bac`,
        'x-default': `${SITE_URL}/mgdl-to-bac`,
      },
    },
    openGraph: {
      type: 'article',
      locale,
      url: localizedUrl,
      title: t('mgdlPage.title'),
      description: t('mgdlPage.description'),
      siteName: metadata('siteName'),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t('mgdlPage.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('mgdlPage.title'),
      description: t('mgdlPage.description'),
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function MgdlToBacPage({ params }: PageProps) {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'unitConversion' });

  const docsMarkdown = `
## ${t('mgdlPage.docsTitle')}

${t('mgdlPage.docsContent')}
`;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('mgdlPage.title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('mgdlPage.heroSubtitle')}
            </p>
          </div>

          <div id="tool" className="mb-16">
            <BacUnitConverter defaultInputUnit="mgPerDl" />
          </div>

          <div className="mb-16">
            <MarkdownContent content={docsMarkdown} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

