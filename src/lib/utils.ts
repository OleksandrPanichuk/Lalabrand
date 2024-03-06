import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value:number ,locale:string = 'en-US') {
  return new Intl.NumberFormat(locale, {
    currency:'USD',
    style:'currency'
  }).format(value)
}