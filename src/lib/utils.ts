import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resetForm(formId: string) {
  const form = document.getElementById(formId) as HTMLFormElement;
  form.reset();
}
