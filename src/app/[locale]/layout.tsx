import getRequestConfig from '@/i18n'
import { constructRootMetadata } from '@/shared/metadata'
import type { Metadata } from 'next'

import { ApolloProvider, ThemeProvider } from '@/components/providers'
import '@/styles/globals.scss'
import { NextIntlClientProvider } from 'next-intl'

//TODO: Add font

export const metadata: Metadata = constructRootMetadata()

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: {
		locale: string
	}
}) {
	const translations = await getRequestConfig(params)

	return (
		<html lang={params.locale} suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute='class'
					defaultTheme='light'
					enableSystem={false}
					storageKey='lalabrand:theme'
				>
					<NextIntlClientProvider {...translations}>
						<ApolloProvider>{children}</ApolloProvider>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
