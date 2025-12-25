import BacCalculatorDzPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/bac-calculator-for-women/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <BacCalculatorDzPage params={{ locale: defaultLocale }} />;
}

