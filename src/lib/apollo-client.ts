import { XSRF_TOKEN_COOKIE_NAME } from '@/shared/constants';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { getCookie } from 'cookies-next';

export function makeClient() {
  const httpLink = new HttpLink({
    uri: '/api/graphql',
    headers: {
      'apollo-require-preflight': 'true',
      'X-XSRF-TOKEN': getCookie(XSRF_TOKEN_COOKIE_NAME) ?? '',
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
