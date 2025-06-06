import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
} 