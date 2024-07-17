import {
  ACCESS_TOKEN_COOKIE_NAME,
  XSRF_TOKEN_COOKIE_NAME,
} from '@/shared/constants';
import { ApolloLink, from, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { getCookie } from 'cookies-next';

const tokenLink = setContext(async (_, { headers: prevHeaders }) => {
  // TODO: validate Access Token before setting it in httpLink headers(check if it has expired or not)
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);

  const XSRFToken = getCookie(XSRF_TOKEN_COOKIE_NAME) ?? '';

  const headers: Record<string, string> = {
    ...prevHeaders,
    'X-XSRF-TOKEN': XSRFToken,
  };

  if (accessToken) {
    headers['authorization'] = 'Bearer ' + accessToken;
  }

  return {
    headers: headers,
  };
});

export function makeClient() {
  const httpLink = new HttpLink({
    uri: '/api/graphql',
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
            from([tokenLink, httpLink]),
          ])
        : from([tokenLink, httpLink]),
  });
}
