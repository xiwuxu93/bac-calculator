import HowToCalculateBacPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/how-to-calculate-bac/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <HowToCalculateBacPage params={{ locale: defaultLocale }} />;
}

