import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pharewest - Service de relogement d'urgence | Partenaire Vaudoise",
  description: "Plateforme de relogement pour les personnes touchées par des sinistres dans les cantons de Genève et Vaud, Suisse. Partenaire officiel de Vaudoise Assurances.",
  keywords: ["relogement", "urgence", "sinistre", "Genève", "Vaud", "Suisse", "assurance", "propriétaire", "locataire", "Vaudoise"],
};

export default function VaudoiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
} 