import { API_URL } from "@/shared/constants"
import { HttpLink } from "@apollo/client"
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"
import { NextSSRApolloClient, NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr"

export const { getClient } = registerApolloClient(() => {

	const httpLink = new HttpLink({
		uri: API_URL,
		headers: {
			'apollo-require-preflight': 'true',
		},
		credentials: 'include',
	})
	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		link: httpLink,
	})
})