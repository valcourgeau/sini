"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Header } from "./header";
import { useBrandTheme } from "@/hooks/use-brand-theme";
import { isSyntheticRoute } from "@/lib/utils/brand-theme";

interface PlatformHeaderProviderProps {
  children: ReactNode;
}

export function PlatformHeaderProvider({ children }: PlatformHeaderProviderProps) {
  const pathname = usePathname();
  
  // Initialize brand theme
  useBrandTheme();
  
  // Check if we're on a platform page (standard or synthetic)
  const isPlatformPage = pathname.startsWith("/platform") || isSyntheticRoute(pathname);
  
  return (
    <>
      {/* Show the main header on non-platform pages, and platform header on platform pages */}
      {!isPlatformPage && <Header />}
      {children}
    </>
  );
} 