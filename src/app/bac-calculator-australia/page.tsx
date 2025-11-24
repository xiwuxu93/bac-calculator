import BacCalculatorAustraliaPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/bac-calculator-australia/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <BacCalculatorAustraliaPage params={{ locale: defaultLocale }} />;
}

