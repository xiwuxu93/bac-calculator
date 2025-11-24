import PromilleToBacPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/promille-to-bac/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <PromilleToBacPage params={{ locale: defaultLocale }} />;
}

