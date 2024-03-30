import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resetForm(formId: string) {
  const form = document.getElementById(formId) as HTMLFormElement;
  form.reset();
}

export function formatCurrency(value: number, locale: string = 'en-US') {
  return new Intl.NumberFormat(locale, {
    currency: 'USD',
    style: 'currency',
  }).format(value);
}

//Функція для отримання перекладу слів, що можуть бути в однині, множині та родовому відмінку множини

export function getUkrainianTranslation(
  count: number,
  {
    one,
    plural,
    other,
  }: {
    one: string;
    plural: string;
    other: string;
  },
  callback?: (result: string) => string,
): string {
  const strCount: string = count.toString();
  const isLT10AGT20 = count <= 10 || count >= 20;

  const returnFn = !!callback
    ? callback
    : (result: string) => `${count} ${result}`;

  return strCount.endsWith('1') && isLT10AGT20
    ? returnFn(one)
    : (strCount.endsWith('3') ||
          strCount.endsWith('2') ||
          strCount.endsWith('4')) &&
        isLT10AGT20
      ? returnFn(plural)
      : returnFn(other);
}
