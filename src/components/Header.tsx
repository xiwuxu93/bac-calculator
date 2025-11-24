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
  const homeHref = getLocalePrefix(resolvedLocale) || '/';
  const timeToZeroHref = getLocalizedPath(resolvedLocale, '/bac-time-to-zero-calculator');
  const howToHref = getLocalizedPath(resolvedLocale, '/how-to-calculate-bac');
  const accuracyHref = getLocalizedPath(resolvedLocale, '/most-accurate-bac-calculator');

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
          <nav className="flex flex-1 flex-wrap items-center gap-3 text-xs font-medium text-gray-600 md:justify-center md:text-sm">
            <Link href={homeHref} className="hover:text-gray-900">
              {t('navHome')}
            </Link>
            <Link href={timeToZeroHref} className="hover:text-gray-900">
              {t('navTimeToZero')}
            </Link>
            <Link href={howToHref} className="hover:text-gray-900">
              {t('navHowTo')}
            </Link>
            <Link href={accuracyHref} className="hover:text-gray-900">
              {t('navAccuracy')}
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
