import PrivacyPage, { generateMetadata as generateLocaleMetadata } from '../[locale]/privacy/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <PrivacyPage params={{ locale: defaultLocale }} />;
}

