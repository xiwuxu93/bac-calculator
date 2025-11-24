import MgdlToBacPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/mgdl-to-bac/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <MgdlToBacPage params={{ locale: defaultLocale }} />;
}

