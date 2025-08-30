"use client";

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  BrandTheme, 
  detectBrandFromPath, 
  getCurrentBrandTheme, 
  applyBrandTheme 
} from '@/lib/utils/brand-theme';

export function useBrandTheme() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentTheme, setCurrentTheme] = useState<BrandTheme>('default');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize theme on mount with a small delay to ensure DOM is ready
    const initializeTheme = () => {
      const theme = getCurrentBrandTheme(pathname, searchParams);
      setCurrentTheme(theme);
      applyBrandTheme(theme);
      setIsInitialized(true);
    };

    // Apply theme immediately if possible
    initializeTheme();

    // Also apply theme after a small delay to ensure everything is ready
    const timeoutId = setTimeout(initializeTheme, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    // Update theme when pathname or search params change
    const newTheme = getCurrentBrandTheme(pathname, searchParams);
    if (newTheme !== currentTheme) {
      setCurrentTheme(newTheme);
      applyBrandTheme(newTheme);
    }
  }, [pathname, searchParams, currentTheme, isInitialized]);

  // Additional effect to handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isInitialized) {
        const theme = getCurrentBrandTheme(pathname, searchParams);
        if (theme !== currentTheme) {
          setCurrentTheme(theme);
          applyBrandTheme(theme);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [pathname, searchParams, currentTheme, isInitialized]);

  return {
    currentTheme,
    isInitialized
  };
}
