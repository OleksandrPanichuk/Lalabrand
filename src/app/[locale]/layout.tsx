import getRequestConfig from '@/i18n'
import { constructRootMetadata } from '@/shared/metadata'
import type { Metadata } from 'next'

import { ConfirmModal, Footer, Header } from '@/components/common'
import { ApolloProvider, AuthProvider } from '@/components/providers'
import { cn, getXSRFToken } from '@/lib'
import { TypeUser } from '@/shared/types'
import '@/styles/globals.scss'
import { NextIntlClientProvider } from 'next-intl'
import { Inter, Montserrat } from 'next/font/google'

import { APP_URL } from '@/shared/constants'

const montserrat = Montserrat({
  weight: ['600', '400', '500'],
  subsets: ['cyrillic', 'latin'],
  variable: '--font-montserrat',
});

const inter = Inter({
  weight: ['400', '500', '600', '700'],
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
  const currentUser: TypeUser = {
    id: '1',
    bonus: 60,
    createdAt: new Date(),
    email: 'example@gmail.com',
    firstName: 'Firstname',
    lastName: 'Lastname',
    username: 'Oleksandr',
    phone: '380994223232',
  };

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
              <ConfirmModal />
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
