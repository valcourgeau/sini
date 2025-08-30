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
  
  // Check if we're on a platform page (standard or synthetic) or relocation page
  const isPlatformPage = pathname.startsWith("/platform") || isSyntheticRoute(pathname);
  const isRelocationPage = pathname.startsWith("/relocation");
  
  return (
    <>
      {/* Show the main header only on pages that are not platform or relocation pages */}
      {!isPlatformPage && !isRelocationPage && <Header />}
      {children}
    </>
  );
} 