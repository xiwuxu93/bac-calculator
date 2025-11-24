import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { Locale, locales, resolveLocale } from '@/lib/i18n';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const resolved = resolveLocale(locale);
  unstable_setRequestLocale(resolved);
  const messages = await getMessages({ locale: resolved });

  return (
    <NextIntlClientProvider key={resolved} locale={resolved} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
