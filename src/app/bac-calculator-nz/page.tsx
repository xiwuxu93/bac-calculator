import BacCalculatorNzPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/bac-calculator-nz/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <BacCalculatorNzPage params={{ locale: defaultLocale }} />;
}

