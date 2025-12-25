import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Locale, getLocalePrefix, getLocalizedPath, resolveLocale } from '@/lib/i18n';

type HeaderProps = {
  locale: Locale;
};

export default async function Header({ locale }: HeaderProps) {
  const resolvedLocale = resolveLocale(locale);
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'common' });
  
  const homeHref = getLocalizedPath(resolvedLocale, '/');
  const timeToZeroHref = getLocalizedPath(resolvedLocale, '/bac-time-to-zero-calculator');
  const chartHref = getLocalizedPath(resolvedLocale, '/bac-chart');
  const howToHref = getLocalizedPath(resolvedLocale, '/how-to-calculate-bac');

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href={homeHref} aria-label={t('siteName')} className="flex flex-col gap-1">
            <span className="text-lg font-semibold tracking-tight text-gray-900 md:text-xl">
              {t('siteName')}
            </span>
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 md:text-sm">
              {t('professionalUseOnly')}
            </span>
          </Link>
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <nav className="hidden md:flex md:gap-x-6" aria-label="Global">
            <Link
              href={homeHref}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-sky-600"
            >
              {t('navHome')}
            </Link>
            <Link
              href={timeToZeroHref}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-sky-600"
            >
              {t('navTimeToZero')}
            </Link>
            <Link
              href={chartHref}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-sky-600"
            >
              {t('navChart')}
            </Link>
            <Link
              href={howToHref}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-sky-600"
            >
              {t('navHowTo')}
            </Link>
          </nav>
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
