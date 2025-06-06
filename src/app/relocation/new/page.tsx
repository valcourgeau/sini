import { Metadata } from "next";
import { RelocationWizard } from "@/components/relocation-wizard/relocation-wizard";

export const metadata = {
  title: "Demande de relogement | Pharewest",
  description: "Formulaire de demande de relogement suite à un sinistre dans les cantons de Genève et Vaud.",
};

/**
 * New relocation request page
 */
export default function NewRelocationPage() {
  return (
    <main className="flex-1 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl whitespace-nowrap">
            Demande de relogement
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed whitespace-nowrap">
            Remplissez ce formulaire pour soumettre une demande de relogement suite à un sinistre.
          </p>
        </div>
        
        <div className="mt-12">
          <RelocationWizard />
        </div>
      </div>
    </main>
  );
} 