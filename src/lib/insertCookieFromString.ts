export function insertCookieFromString(
  key: string,
  cookieString: string | undefined,
) {
  if (!cookieString) {
    return;
  }

  const cookies: Record<string, string> = {};

  const pairs = cookieString.split(';');

  pairs.forEach((pair) => {
    const [name, ...rest] = pair.split('=');
    const value = rest.join('=').trim();
    if (
      name.trim() &&
      !name.trim().includes('Path') &&
      !name.trim().includes('Domain') &&
      !name.trim().includes('Expires') &&
      !name.trim().includes('Max-Age') &&
      !name.trim().includes('SameSite') &&
      !name.trim().includes('Secure') &&
      !name.trim().includes('HttpOnly')
    ) {
      cookies[name.trim()] = value;
    }
  });

  return cookies[key];
}
