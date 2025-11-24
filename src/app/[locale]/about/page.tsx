import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarkdownContent from '@/components/MarkdownContent';
import { Locale, defaultLocale, locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const metadata = await getTranslations({ locale, namespace: 'metadata' });
  const t = await getTranslations({ locale, namespace: 'about' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/about`;
  const imageUrl = `${SITE_URL}/og-image.svg`;

  return {
    title: `${t('title')} | ${metadata('siteName')}`,
    description: t('description'),
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: `${SITE_URL}/about`,
        'x-default': `${SITE_URL}/about`,
      },
    },
    openGraph: {
      type: 'website',
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

export default async function AboutPage({ params }: PageProps) {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'about' });

  const markdown = `
# ${t('title')}

${t('description')}

## ${t('sections.missionTitle')}

${t('sections.missionBody')}

## ${t('sections.methodologyTitle')}

${t('sections.methodologyBody')}

## ${t('sections.limitationsTitle')}

${t('sections.limitationsBody')}

## ${t('sections.safetyTitle')}

${t('sections.safetyBody')}

## ${t('sections.reviewTitle')}

${t('sections.reviewBody')}

## ${t('sections.updatesTitle')}

${t('sections.updatesBody')}

## ${t('sections.referencesTitle')}

${t('sections.referencesIntro')}

- ${t('sections.referencesList1')}
- ${t('sections.referencesList2')}
- ${t('sections.referencesList3')}
`;

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: t('title'),
    description: t('description'),
    url: `${SITE_URL}/about`,
  };

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

          <div className="mb-16">
            <MarkdownContent content={markdown} />
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

