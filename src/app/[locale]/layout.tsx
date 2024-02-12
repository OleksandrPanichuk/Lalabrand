
import getRequestConfig from '@/i18n'
import { constructRootMetadata } from '@/shared/metadata'
import type { Metadata } from 'next'
        
import { Footer, Header } from '@/components/common'
import { ApolloProvider } from '@/components/providers'
import { cn } from '@/lib'
import '@/styles/globals.scss'
import { NextIntlClientProvider } from 'next-intl'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['600', '400', '500'],
  subsets: ['cyrillic', 'latin'],
  variable: '--font-montserrat',
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

  return (
    <html
      lang={params.locale}
      className={cn(montserrat.className, montserrat.variable)}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider {...translations}>
          <ApolloProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ApolloProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );

}
