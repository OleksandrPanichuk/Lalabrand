import {
  ACCESS_TOKEN_COOKIE_NAME,
  XSRF_TOKEN_COOKIE_NAME,
} from '@/shared/constants';
import { ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { getCookie } from 'cookies-next';

const authLink = setContext(() => {
  // TODO: validate Access Token before setting it in httpLink headers(check if it has expired or not)
  const token = getCookie(ACCESS_TOKEN_COOKIE_NAME);

  if (!token) return {};

  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
});

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
            authLink.concat(httpLink),
          ])
        : authLink.concat(httpLink),
  });
}
