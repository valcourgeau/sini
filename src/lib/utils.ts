import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind CSS classes
 * @param inputs - Class names to be combined
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the correct image path for both development and production
 * 
 * @param imagePath - The image path relative to the public directory
 * @returns The correct image path for the current environment
 * 
 * @example
 * // In development: returns "/image.jpg"
 * // In production: returns "/sini/image.jpg"
 * 
 * <Image src={getImagePath("/happy-swiss-family.jpg")} alt="Family" />
 * <Image src={getImagePath("/logos/company-logo.png")} alt="Logo" />
 * <Image src={getImagePath("/icons/arrow.svg")} alt="Arrow" />
 */
export function getImagePath(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  
  // In production, prepend the basePath
  if (process.env.NODE_ENV === 'production') {
    return `/sini/${cleanPath}`
  }
  
  // In development, use the path as is
  return `/${cleanPath}`
}

/**
 * Formats a date to a localized string
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
): string {
  return new Intl.DateTimeFormat("fr-CH", options).format(date);
}

/**
 * Validates a Swiss postal code
 * @param postalCode - Postal code to validate
 * @returns Boolean indicating if the postal code is valid
 */
export function isValidSwissPostalCode(postalCode: string): boolean {
  return /^[1-9]\d{3}$/.test(postalCode);
}

/**
 * Validates a Swiss phone number
 * @param phoneNumber - Phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export function isValidSwissPhoneNumber(phoneNumber: string): boolean {
  // Swiss phone numbers can be in formats like: +41 XX XXX XX XX or 0XX XXX XX XX
  return /^(\+41|0)(\s?\d{2}){4}$/.test(phoneNumber);
} 