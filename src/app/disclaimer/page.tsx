import DisclaimerPage, { generateMetadata as generateLocaleMetadata } from '../[locale]/disclaimer/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <DisclaimerPage params={{ locale: defaultLocale }} />;
}

