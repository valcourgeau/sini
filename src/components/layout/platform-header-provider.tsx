"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Header } from "./header";

interface PlatformHeaderProviderProps {
  children: ReactNode;
}

export function PlatformHeaderProvider({ children }: PlatformHeaderProviderProps) {
  const pathname = usePathname();
  
  // Check if we're on a platform page
  const isPlatformPage = pathname.startsWith("/platform");
  
  return (
    <>
      {/* Only render the main header on non-platform pages */}
      {!isPlatformPage && <Header />}
      {children}
    </>
  );
} 