import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { PlatformHeaderProvider } from "@/components/layout/platform-header-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pharewest - Service de relogement d'urgence",
  description: "Plateforme de relogement pour les personnes touchées par des sinistres dans les cantons de Genève et Vaud, Suisse.",
  keywords: ["relogement", "urgence", "sinistre", "Genève", "Vaud", "Suisse", "assurance", "propriétaire", "locataire"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <div className="flex-1 flex flex-col">
            <PlatformHeaderProvider>
              {children}
            </PlatformHeaderProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
} 