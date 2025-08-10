import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pharewest - Service de relogement d'urgence | Partenaire Generali",
  description: "Plateforme de relogement pour les personnes touchées par des sinistres en Suisse. Partenaire officiel de Generali.",
  keywords: ["relogement", "urgence", "sinistre", "Suisse", "assurance", "propriétaire", "locataire", "Generali"],
};

export default function GeneraliLayout({
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
