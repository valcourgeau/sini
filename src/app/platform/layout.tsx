"use client";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import "../globals.css";
import { PlatformHeader } from "@/components/layout/platform-header";
import { initializeTheme } from "@/lib/theme";

const inter = Inter({ subsets: ["latin"] });

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <div className="platform-layout">
      <PlatformHeader />
      {children}
    </div>
  );
} 