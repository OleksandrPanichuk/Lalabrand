import { insertCookieFromString } from '@/lib';
import { APP_URL, XSRF_TOKEN_COOKIE_NAME } from '@/shared/constants';
import axios, { AxiosError } from 'axios';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { localePrefix, locales } from './i18n';

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix,
});

export default async function middleware(request: NextRequest) {
  const intlResponse = nextIntlMiddleware(request);

  try {
    await axios.post(
      APP_URL + '/api/graphiql',
      {},
      {
        withCredentials: true,
        withXSRFToken: true,
      },
    );
  } catch (err) {
    const token = insertCookieFromString(
      XSRF_TOKEN_COOKIE_NAME,
      (err as AxiosError).response?.headers['set-cookie'] as unknown as string,
    );
    if (token) {
      intlResponse.cookies.set(XSRF_TOKEN_COOKIE_NAME, token);
    }
  }

  return intlResponse;
}

export const config = {
  matcher: ['/', '/(ua|en)/:path*'],
};
