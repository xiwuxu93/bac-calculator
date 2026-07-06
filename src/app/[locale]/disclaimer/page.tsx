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
  const localePrefix = `/${locale}`;
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
  const localePrefix = `/${locale}`;
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header locale={locale} />
      <main className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-7xl px-4 py-12 flex gap-8 justify-center items-start">
          <article className="entry-content flex-grow max-w-4xl rounded-2xl bg-white p-6 shadow-sm border border-gray-100 md:p-12">
          <h1>{disclaimer('title')}</h1>
          <p className="text-center text-gray-600 !mb-2">{disclaimer('description')}</p>
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold text-center !mb-8 border-b border-gray-100 pb-6">
            {disclaimer('lastUpdatedLabel')} {disclaimer('lastUpdatedValue')}
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">{disclaimer('intro')}</p>

          <h2>{disclaimer('educationHeading')}</h2>
          <p>{disclaimer('educationContent')}</p>

          <h2>{disclaimer('noAdviceHeading')}</h2>
          <p>{disclaimer('noAdviceContent')}</p>

          <h2>{disclaimer('emergencyHeading')}</h2>
          <p>{disclaimer('emergencyContent')}</p>

          <h2>{disclaimer('audienceHeading')}</h2>
          <ul>
            <li>{disclaimer('audienceList1')}</li>
            <li>{disclaimer('audienceList2')}</li>
            <li>{disclaimer('audienceList3')}</li>
          </ul>

          <h2>{disclaimer('audienceExclusionHeading')}</h2>
          <ul>
            <li>{disclaimer('audienceExclusionList1')}</li>
            <li>{disclaimer('audienceExclusionList2')}</li>
            <li>{disclaimer('audienceExclusionList3')}</li>
          </ul>

          <h2>{disclaimer('clinicalJudgmentHeading')}</h2>
          <p>{disclaimer('clinicalJudgmentContent')}</p>

          <h2>{disclaimer('accuracyHeading')}</h2>
          <p>{disclaimer('accuracyContent')}</p>

          <h2>{disclaimer('liabilityHeading')}</h2>
          <p>{disclaimer('liabilityContent')}</p>

          <h2>{disclaimer('noRelationshipHeading')}</h2>
          <p>{disclaimer('noRelationshipContent')}</p>

          <h2>{disclaimer('thirdPartyHeading')}</h2>
          <p>{disclaimer('thirdPartyContent')}</p>

          <h2>{disclaimer('complianceHeading')}</h2>
          <p>{disclaimer('complianceContent')}</p>

          <h2>{disclaimer('updatesHeading')}</h2>
          <p>{disclaimer('updatesContent')}</p>

          <h2>{disclaimer('contactHeading')}</h2>
          <p>{disclaimer('contactContent')}</p>

          <div className="pt-6 border-t border-gray-100 mt-8">
            <Link
              href={localizedPath('/')}
              className="inline-flex items-center gap-2 rounded-full border border-gray-900 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              {common('backToHome')}
            </Link>
          </div>
          </article>
          <aside className="sidebar hidden xl:block w-[320px] flex-shrink-0" />
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
