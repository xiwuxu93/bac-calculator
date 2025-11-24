import BacTimeToZeroPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/bac-time-to-zero-calculator/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <BacTimeToZeroPage params={{ locale: defaultLocale }} />;
}

