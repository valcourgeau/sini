import { Metadata } from "next";
import { PropertyWizard } from "@/components/property-wizard/property-wizard";

export const metadata = {
  title: "Proposer un logement | Pharewest",
  description: "Formulaire pour proposer un logement disponible pour les personnes touchées par des sinistres dans les cantons de Genève et Vaud.",
};

/**
 * Property listing page
 */
export default function PropertyListingPage() {
  return (
    <main className="flex-1 py-4 bg-primary min-h-screen">
      <div className="container mx-auto px-0 md:px-0">
        <div className="mt-0">
          <PropertyWizard />
        </div>
      </div>
    </main>
  );
} 