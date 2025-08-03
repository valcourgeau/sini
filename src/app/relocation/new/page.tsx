import { Metadata } from "next";
import { Suspense } from "react";
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
    <main className="flex-1 py-4 bg-primary min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mt-0">
          <Suspense fallback={<div>Chargement...</div>}>
            <RelocationWizard />
          </Suspense>
        </div>
      </div>
    </main>
  );
} 