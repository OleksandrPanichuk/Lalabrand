import getRequestConfig from '@/i18n'
import { constructRootMetadata } from '@/shared/metadata'
import type { Metadata } from 'next'

import { Footer, Header } from '@/components/common'
import { ApolloProvider, AuthProvider } from '@/components/providers'
import { cn } from '@/lib'
import '@/styles/globals.scss'
import { NextIntlClientProvider } from 'next-intl'
import { Inter, Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['600', '400', '500'],
  subsets: ['cyrillic', 'latin'],
  variable: '--font-montserrat',
});

const inter = Inter({
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  subsets: ['cyrillic', 'latin'],
});

export const metadata: Metadata = constructRootMetadata();

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  const translations = await getRequestConfig(params);

  //TODO: fetch current user data
  const currentUser = null

  return (
    <html
      lang={params.locale}
      className={cn(montserrat.className, montserrat.variable, inter.variable)}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider {...translations}>
          <ApolloProvider>
            <AuthProvider initialUser={currentUser}>
            <Header />
            <main>{children}</main>
            <Footer />
            </AuthProvider>
          </ApolloProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
