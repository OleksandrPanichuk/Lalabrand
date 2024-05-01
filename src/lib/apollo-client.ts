import { API_URL } from '@/shared/constants';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

export function makeClient() {
  const httpLink = new HttpLink({
    uri: API_URL,
    headers: {
      'apollo-require-preflight': 'true',
      'X-XSRF-TOKEN': '8e7cf714-0f4c-4d00-8b13-333a2c02f80e',
    },
    fetchOptions: {
      mode: 'no-cors',
    },
    credentials: 'include',
  });
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    connectToDevTools: true,
    credentials: 'include',
    ssrMode: typeof window === 'undefined',
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}
