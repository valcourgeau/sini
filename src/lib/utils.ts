import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

/**
 * Combines multiple class names and merges Tailwind CSS classes
 * @param inputs - Class names to be combined
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => {
    const fillPercentage = Math.max(0, Math.min(1, rating - i));
    
    return (
      <div key={i} className="relative inline-block">
        <svg
          className="h-4 w-4 text-muted-foreground"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {fillPercentage > 0 && (
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${fillPercentage * 100}%` }}
          >
            <svg
              className="h-4 w-4 text-primary fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}
      </div>
    );
  });
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