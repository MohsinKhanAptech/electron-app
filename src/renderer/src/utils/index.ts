import { twMerge } from 'tailwind-merge'
import { ClassValue, clsx } from 'clsx'

export const classMerge = (...args: ClassValue[]): string => {
  return twMerge(clsx(...args))
}
