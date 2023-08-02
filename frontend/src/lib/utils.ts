import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...input: ClassValue[]): string {
  return twMerge(clsx(...input));
}
