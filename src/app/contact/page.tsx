import ContactPage, {
  generateMetadata as generateLocaleMetadata,
} from '../[locale]/contact/page';
import { defaultLocale } from '@/lib/i18n';

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: defaultLocale } });
}

export default function Page() {
  return <ContactPage params={{ locale: defaultLocale }} />;
}

