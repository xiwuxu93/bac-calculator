import AccuracyPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/most-accurate-bac-calculator/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <AccuracyPage params={{ locale: defaultLocale }} />;
}

