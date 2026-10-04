import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import * as PopoverPrimitive from "@radix-ui/react-popover";   

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
