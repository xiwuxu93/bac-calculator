import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import CurrentYear from '@/components/CurrentYear';
import { defaultLocale } from '@/lib/i18n';

const getLocalePrefix = (locale: string, fallbackLocale: string) =>
  locale === fallbackLocale ? '' : `/${locale}`;

export default async function Footer() {
  const [tCommon, tFooter, locale] = await Promise.all([
    getTranslations('common'),
    getTranslations('footer'),
    getLocale(),
  ]);
  const basePath = getLocalePrefix(locale, defaultLocale);
  const withPrefix = (path: string) => `${basePath}${path}`;

  return (
    <footer className="border-t border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              {tFooter('toolsSection')}
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link
                  href={withPrefix('/')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {tCommon('navHome')}
                </Link>
              </li>
              <li>
                <Link
                  href={withPrefix('/bac-time-to-zero-calculator')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {tFooter('linkTimeToZero')}
                </Link>
              </li>
              <li>
                <Link
                  href={withPrefix('/advanced-bac-calculator')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {tFooter('linkAdvanced')}
                </Link>
              </li>
              <li>
                <Link
                  href={withPrefix('/bac-calculator-for-women')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {tFooter('linkWomen')}
                </Link>
              </li>
              <li>
                <Link
                  href={withPrefix('/bac-chart')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {tFooter('linkChart')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              {tFooter('resourcesSection')}
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link
                  href={withPrefix('/how-to-calculate-bac')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {tCommon('navHowTo')}
                </Link>
              </li>
              <li>
                <Link
                  href={withPrefix('/are-bac-calculators-accurate')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {tCommon('navAccuracy')}
                </Link>
              </li>
              <li>
                <Link
                  href={withPrefix('/bac-conversion-calculator')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  BAC Unit Converter
                </Link>
              </li>
              <li>
                <Link
                  href={withPrefix('/about')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {tFooter('about')}
                </Link>
              </li>
              <li>
                <Link
                  href={withPrefix('/contact')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {tFooter('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-10 sm:mt-0">
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              {tFooter('legalSection')}
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link
                  href={withPrefix('/privacy')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {tCommon('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href={withPrefix('/terms')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {tCommon('termsOfService')}
                </Link>
              </li>
              <li>
                <Link
                  href={withPrefix('/disclaimer')}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {tCommon('disclaimer')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-12 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © <CurrentYear /> {tCommon('siteName')}. {tCommon('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}