import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Standard shadcn/ui class-merging helper (clsx + tailwind-merge). Used by
 *  shadcn-sourced components (e.g. components/ui/button.tsx). App code that
 *  isn't shadcn-sourced continues to use the lighter lib/cn.ts joiner. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
