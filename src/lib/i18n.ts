import { getRequestConfig } from "next-intl/server";

export const localeConfigs = [
  { code: "en", currency: "USD" },
] as const;

export type Locale = (typeof localeConfigs)[number]["code"];

export const locales = localeConfigs.map((config) => config.code) as Locale[];
export const defaultLocale: Locale = localeConfigs[0].code;

export function resolveLocale(input?: string | null): Locale {
  if (!input) {
    return defaultLocale;
  }
  const normalized = input.toLowerCase();
  const match = locales.find(
    (code) => normalized === code || normalized.startsWith(`${code}-`)
  );
  return match ?? defaultLocale;
}

export function getLocalePrefix(locale: Locale) {
  return locale === defaultLocale ? "" : `/${locale}`;
}

export function getLocalizedPath(locale: Locale, path: string) {
  const prefix = getLocalePrefix(locale);
  if (path === "/" || path === "") {
    return prefix || "/";
  }
  return `${prefix}${path.startsWith("/") ? path : `/${path}`}`;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedLocale = await requestLocale;
  const locale = locales.includes(resolvedLocale as Locale)
    ? (resolvedLocale as Locale)
    : defaultLocale;
  const messages = (await import(`../messages/${locale}`)).default;

  return {
    locale,
    messages,
  };
});
