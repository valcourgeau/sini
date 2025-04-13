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
    <main className="flex-1 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Proposer un logement
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed">
            Remplissez ce formulaire pour mettre à disposition un logement pour les personnes touchées par un sinistre.
          </p>
        </div>
        
        <div className="mt-12">
          <PropertyWizard />
        </div>
      </div>
    </main>
  );
} 