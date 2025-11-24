import AboutPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/about/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <AboutPage params={{ locale: defaultLocale }} />;
}

