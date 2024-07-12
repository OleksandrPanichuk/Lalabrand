import { getXSRFToken } from '@/lib';
import { XSRF_TOKEN_COOKIE_NAME } from '@/shared/constants';
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { localePrefix, locales } from './i18n';

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix,
});

export default async function middleware(request: NextRequest) {
  const intlResponse = nextIntlMiddleware(request);

  const token = await getXSRFToken();

  if (token) {
    intlResponse.cookies.set(XSRF_TOKEN_COOKIE_NAME, token);
  }

  return intlResponse;
}

export const config = {
  matcher: ['/', '/(ua|en)/:path*'],
};
