import BacConversionCalculatorPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/bac-conversion-calculator/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <BacConversionCalculatorPage params={{ locale: defaultLocale }} />;
}

