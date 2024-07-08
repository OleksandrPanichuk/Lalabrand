// 'use server';

import {
  ACCESS_TOKEN_COOKIE_NAME,
  XSRF_TOKEN_COOKIE_NAME,
} from '@/shared/constants';
import { HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { cookies } from 'next/headers';

const authLink = setContext(async () => {
  const token = cookies().get(ACCESS_TOKEN_COOKIE_NAME);

  if (!token?.value) return {};

  return {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  };
});

export const { getClient } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
    headers: {
      'apollo-require-preflight': 'true',
      Cookie: cookies().toString(),
      'X-XSRF-TOKEN': cookies().get(XSRF_TOKEN_COOKIE_NAME)?.value ?? '',
    },
    
    credentials: 'include',
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: authLink.concat(httpLink),
    defaultOptions: {
      query: {
        fetchPolicy:"no-cache",
      },
    }
  });
});

