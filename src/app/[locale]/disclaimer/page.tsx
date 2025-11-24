import Link from 'next/link';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Locale, defaultLocale, locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const metadata = await getTranslations({ locale, namespace: 'metadata' });
  const disclaimer = await getTranslations({ locale, namespace: 'disclaimer' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/disclaimer`;
  const imageUrl = `${SITE_URL}/og-image.png`;

  return {
    title: `${disclaimer('title')} | ${metadata('siteName')}`,
    description: disclaimer('description'),
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
        en: `${SITE_URL}/disclaimer`,
        es: `${SITE_URL}/es/disclaimer`,
        zh: `${SITE_URL}/zh/disclaimer`,
        'x-default': `${SITE_URL}/disclaimer`,
      },
    },
    openGraph: {
      type: 'article',
      locale,
      url: localizedUrl,
      title: disclaimer('title'),
      description: disclaimer('description'),
      siteName: metadata('siteName'),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: disclaimer('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: disclaimer('title'),
      description: disclaimer('description'),
      images: [imageUrl],
    },
    robots: {
      index: false,
      follow: true,
    },
    keywords: [disclaimer('title'), metadata('siteName'), 'medical disclaimer'],
  };
}

export default async function DisclaimerPage({ params }: PageProps) {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const disclaimer = await getTranslations({ locale, namespace: 'disclaimer' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedPath = (path: string) => {
    if (path === '/' || path === '') {
      return localePrefix || '/';
    }
    return `${localePrefix}${path}`;
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: disclaimer('title'),
    description: disclaimer('description'),
    url: `${SITE_URL}${localePrefix}/disclaimer`,
    inLanguage: locale,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />
      <main className="flex-1 px-4 py-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-12">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              {disclaimer('title')}
            </h1>
            <p className="text-base text-gray-600 md:text-lg">{disclaimer('description')}</p>
            <p className="text-sm uppercase tracking-wide text-gray-500">
              {disclaimer('lastUpdatedLabel')} {disclaimer('lastUpdatedValue')}
            </p>
          </div>

          <div className="space-y-8 rounded-lg bg-white p-6 shadow-lg md:p-8">
            <p className="text-gray-700">{disclaimer('intro')}</p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('educationHeading')}</h2>
              <p className="text-gray-700">{disclaimer('educationContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('noAdviceHeading')}</h2>
              <p className="text-gray-700">{disclaimer('noAdviceContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('emergencyHeading')}</h2>
              <p className="text-gray-700">{disclaimer('emergencyContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('audienceHeading')}</h2>
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                <li>{disclaimer('audienceList1')}</li>
                <li>{disclaimer('audienceList2')}</li>
                <li>{disclaimer('audienceList3')}</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('audienceExclusionHeading')}</h2>
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                <li>{disclaimer('audienceExclusionList1')}</li>
                <li>{disclaimer('audienceExclusionList2')}</li>
                <li>{disclaimer('audienceExclusionList3')}</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('clinicalJudgmentHeading')}</h2>
              <p className="text-gray-700">{disclaimer('clinicalJudgmentContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('accuracyHeading')}</h2>
              <p className="text-gray-700">{disclaimer('accuracyContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('liabilityHeading')}</h2>
              <p className="text-gray-700">{disclaimer('liabilityContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('noRelationshipHeading')}</h2>
              <p className="text-gray-700">{disclaimer('noRelationshipContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('thirdPartyHeading')}</h2>
              <p className="text-gray-700">{disclaimer('thirdPartyContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('complianceHeading')}</h2>
              <p className="text-gray-700">{disclaimer('complianceContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('updatesHeading')}</h2>
              <p className="text-gray-700">{disclaimer('updatesContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{disclaimer('contactHeading')}</h2>
              <p className="text-gray-700">{disclaimer('contactContent')}</p>
            </section>

            <div className="pt-2">
              <Link
                href={localizedPath('/')}
                className="inline-flex items-center gap-2 rounded-full border border-gray-900 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white"
              >
                {common('backToHome')}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Footer />
    </div>
  );
}
