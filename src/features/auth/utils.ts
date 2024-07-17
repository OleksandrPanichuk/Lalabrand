export function isValidPassword(password: string): boolean {
  return (
    password.length > 7 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[@$!%*?&]/.test(password)
  );
}
