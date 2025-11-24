import AreBacCalculatorsAccuratePage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/are-bac-calculators-accurate/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <AreBacCalculatorsAccuratePage params={{ locale: defaultLocale }} />;
}

