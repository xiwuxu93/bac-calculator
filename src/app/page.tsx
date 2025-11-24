import HomePage, { generateMetadata as generateLocaleMetadata } from './[locale]/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <HomePage params={{ locale: defaultLocale }} />;
}
