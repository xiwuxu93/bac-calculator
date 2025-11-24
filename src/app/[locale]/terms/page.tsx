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
  const terms = await getTranslations({ locale, namespace: 'terms' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/terms`;
  const imageUrl = `${SITE_URL}/og-image.png`;

  return {
    title: `${terms('title')} | ${metadata('siteName')}`,
    description: terms('description'),
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
        en: `${SITE_URL}/terms`,
        es: `${SITE_URL}/es/terms`,
        zh: `${SITE_URL}/zh/terms`,
        'x-default': `${SITE_URL}/terms`,
      },
    },
    openGraph: {
      type: 'article',
      locale,
      url: localizedUrl,
      title: terms('title'),
      description: terms('description'),
      siteName: metadata('siteName'),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: terms('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: terms('title'),
      description: terms('description'),
      images: [imageUrl],
    },
    robots: {
      index: false,
      follow: true,
    },
    keywords: [terms('title'), metadata('siteName'), 'terms'],
  };
}

export default async function TermsPage({ params }: PageProps) {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const terms = await getTranslations({ locale, namespace: 'terms' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const disclaimer = await getTranslations({ locale, namespace: 'disclaimer' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedPath = (path: string) => {
    if (path === '/' || path === '') {
      return localePrefix || '/';
    }
    return `${localePrefix}${path}`;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />
      <main className="flex-1 px-4 py-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-12">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              {terms('title')}
            </h1>
            <p className="text-base text-gray-600 md:text-lg">{terms('description')}</p>
          </div>

          <div className="space-y-8 rounded-lg bg-white p-6 shadow-lg md:p-8">
            <p className="text-gray-700">{terms('intro')}</p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{terms('acceptableUseTitle')}</h2>
              <p className="text-gray-700">{terms('acceptableUseContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{terms('medicalDisclaimerTitle')}</h2>
              <p className="text-gray-700">{terms('medicalDisclaimerContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{terms('limitationsTitle')}</h2>
              <p className="text-gray-700">{terms('limitationsContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{terms('liabilityTitle')}</h2>
              <p className="text-gray-700">{terms('liabilityContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{terms('changesTitle')}</h2>
              <p className="text-gray-700">{terms('changesContent')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{terms('contactTitle')}</h2>
              <p className="text-gray-700">{terms('contactContent')}</p>
            </section>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
              <p className="font-semibold uppercase tracking-wide">{common('professionalUseOnly')}</p>
              <p className="mt-2">{disclaimer('description')}</p>
              <Link
                href={localizedPath('/disclaimer')}
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-amber-600 px-3 py-1 text-xs font-medium text-amber-700 transition hover:bg-amber-600 hover:text-white"
              >
                {common('viewFullDisclaimer')}
              </Link>
            </div>

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
      <Footer />
    </div>
  );
}
