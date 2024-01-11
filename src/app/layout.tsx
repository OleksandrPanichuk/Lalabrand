import { ApolloProvider } from '@/components/providers'
import { constructRootMetadata } from '@/shared/metadata'
import type { Metadata } from 'next'

import '@/styles/globals.scss'

//TODO: Add font

export const metadata: Metadata = constructRootMetadata()

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<ApolloProvider>{children}</ApolloProvider>
			</body>
		</html>
	)
}
