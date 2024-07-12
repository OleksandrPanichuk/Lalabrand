import { insertCookieFromString } from '@/lib';
import { APP_URL, XSRF_TOKEN_COOKIE_NAME } from '@/shared/constants';
import axios, { AxiosError } from 'axios';

export async function getXSRFToken(): Promise<string> {
  let token: string = '';
  try {
    await axios.post(
      APP_URL + '/api/graphiql',
      {},
      {
        withCredentials: true,
        withXSRFToken: true,
      },
    );
  } catch (err) {
    const setCookieHeaderValue = (err as AxiosError).response?.headers[
      'set-cookie'
    ] as unknown as string | string[];

    const setCookieString = Array.isArray(setCookieHeaderValue)
      ? setCookieHeaderValue[0]
      : setCookieHeaderValue;

    token =
      insertCookieFromString(XSRF_TOKEN_COOKIE_NAME, setCookieString) ?? '';
  }

  return token;
}
