import BacCalculatorMarocPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/bac-calculator-maroc/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <BacCalculatorMarocPage params={{ locale: defaultLocale }} />;
}

