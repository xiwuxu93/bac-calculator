import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '@/lib/i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/en' ? '/' : pathname.replace(/^\/en/, '');
    return NextResponse.redirect(url, 308);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
