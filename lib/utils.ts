import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function weiToEth(wei: bigint, toFixed = 2) {
  return Number((Number(wei) / 10 ** 18).toFixed(toFixed))
}
