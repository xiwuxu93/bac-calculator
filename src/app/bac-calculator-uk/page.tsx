import BacCalculatorUkPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/bac-calculator-uk/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <BacCalculatorUkPage params={{ locale: defaultLocale }} />;
}

