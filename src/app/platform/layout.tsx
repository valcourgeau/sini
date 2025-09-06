"use client";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import "../globals.css";
import { PlatformHeader } from "@/components/layout/platform-header";
import { initializeTheme, clearTheme } from "@/lib/theme";

const inter = Inter({ subsets: ["latin"] });

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const brand = initializeTheme();
    // If no brand is returned, ensure we're using the default theme
    if (!brand) {
      clearTheme();
    }
  }, []);

  return (
    <div className="platform-layout">
      <PlatformHeader />
      {children}
    </div>
  );
} 