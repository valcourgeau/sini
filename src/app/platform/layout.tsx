"use client";

import { useBrandTheme } from "@/hooks/use-brand-theme";
import { PlatformHeaderProvider } from "@/components/layout/platform-header-provider";
import { PlatformHeader } from "@/components/layout/platform-header";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize brand theme for platform pages
  useBrandTheme();

  return (
    <div className="min-h-screen bg-background">
      <PlatformHeaderProvider>
        <PlatformHeader />
        {children}
      </PlatformHeaderProvider>
    </div>
  );
} 