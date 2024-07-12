// 'use server';

import {
  ACCESS_TOKEN_COOKIE_NAME,
  XSRF_TOKEN_COOKIE_NAME,
} from '@/shared/constants';
import { ApolloLink, HttpLink } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { cookies } from 'next/headers';

const responseLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    // TODO: check whether backend sets new XSRF token and set add it to cookies

    return response;
  });
});

export const { getClient } = registerApolloClient(() => {
  const XSRFtoken = cookies().get(XSRF_TOKEN_COOKIE_NAME)?.value ?? '';
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME);

  const headers: Record<string, string> = {
    'X-XSRF-TOKEN': XSRFtoken,
  };

  if (accessToken?.value) {
    headers['Authorization'] = 'Bearer ' + accessToken.value;
  }

  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
    credentials: 'include',
    headers: {
      ...headers,
      Cookie: cookies().toString(),
      'apollo-require-preflight': 'true',
    },
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: responseLink.concat(httpLink),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  });
});
