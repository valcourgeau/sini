"use client";

import { Inter } from "next/font/google";
import "../globals.css";
import { PlatformHeader } from "@/components/layout/platform-header";

const inter = Inter({ subsets: ["latin"] });

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="platform-layout">
      <PlatformHeader />
      {children}
    </div>
  );
} 