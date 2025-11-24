import TermsPage, { generateMetadata as generateLocaleMetadata } from '../[locale]/terms/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <TermsPage params={{ locale: defaultLocale }} />;
}

