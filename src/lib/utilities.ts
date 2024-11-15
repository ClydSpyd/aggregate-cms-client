import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const generateUID = (input: string) => {
  let hash = 5381; // Initialize the hash value
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i); // XOR each character
  }
  return hash >>> 0; // Ensure a positive 32-bit integer
};