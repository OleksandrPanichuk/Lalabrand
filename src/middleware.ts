import createMiddleware from 'next-intl/middleware'
import { localePrefix, locales } from './i18n'
 

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix
});
 
export const config = {
  matcher: ['/', '/(ua|en)/:path*']
};