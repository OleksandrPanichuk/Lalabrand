import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value:number ,locale:string) {
  return new Intl.NumberFormat(locale, {
    currency:'USD',
    style:'currency'
  }).format(value)
}