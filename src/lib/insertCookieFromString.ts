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
      !['Path', 'Domain', 'Expires', 'Max-Age', 'SameSite', 'Secure', 'HttpOnly'].some(
        (attr) => name.trim().includes(attr),
      )
    ) {
      cookies[name.trim()] = value;
    }
  });

  return cookies[key];
}
