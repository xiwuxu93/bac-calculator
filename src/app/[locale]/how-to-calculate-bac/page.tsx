import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarkdownContent from '@/components/MarkdownContent';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import { Locale, defaultLocale, getLocalizedPath, locales } from '@/lib/i18n';
import { getLanguageAlternates, getOrganizationSchema } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const metadata = await getTranslations({ locale, namespace: 'metadata' });
  const t = await getTranslations({ locale, namespace: 'howToBac' });
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const localizedUrl = `${SITE_URL}${localePrefix}/how-to-calculate-bac`;
  const imageUrl = `${SITE_URL}/og-image.svg`;

  return {
    title: `${t('title')} | ${metadata('siteName')}`,
    description: t('description'),
    alternates: {
      canonical: localizedUrl,
      languages: getLanguageAlternates('/how-to-calculate-bac'),
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

export default async function HowToCalculateBacPage({ params }: PageProps) {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'howToBac' });
  const home = await getTranslations({ locale, namespace: 'home' });

  const docsMarkdown = `
# ${t('docs.introTitle')}

${t('docs.introContent')}

## ${t('docs.formulaTitle')}

${t('docs.formulaContent')}

## ${t('docs.stepsTitle')}

${t('docs.stepsContent')}

## ${t('docs.limitationsTitle')}

${t('docs.limitationsContent')}
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

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t('title'),
    description: t('description'),
    mainEntityOfPage: `${SITE_URL}/how-to-calculate-bac`,
    step: [
      {
        '@type': 'HowToStep',
        text: t('docs.stepsContent'),
      }
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* Calculator Removed: Focus on educational content */}

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

          {/* Added CTA to drive users who actually want to calculate to the right place */}
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

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
          />
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