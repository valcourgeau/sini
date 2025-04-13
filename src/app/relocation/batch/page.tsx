"use client";

import { Metadata } from "next";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Relocation Batch | Pharewest",
  description: "Submit multiple relocation requests at once",
};

/**
 * Batch processing page for multiple relocation requests
 */
export default function BatchRelocationPage() {
  const router = useRouter();

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Relogement par lots</h1>
          <p className="text-lg text-muted-foreground">
            Soumettez plusieurs demandes de relogement en une seule fois avec Pharewest
          </p>
        </div>

        <div className="grid gap-8">
          {/* Individual Relocation Form */}
          <div className="bg-card rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Formulaire individuel</h2>
                <p className="text-muted-foreground">
                  Pour les particuliers et les petites demandes
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Si vous avez besoin de reloger une seule personne ou une petite famille, 
                utilisez notre formulaire standard de relogement.
              </p>
              <Button 
                variant="default"
                className="w-full"
                onClick={() => router.push('/relocation/new')}
              >
                Commencer un relogement individuel
              </Button>
            </div>
          </div>

          {/* Professional Form */}
          <div className="bg-card rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Formulaire professionnel</h2>
                <p className="text-muted-foreground">
                  Pour les professionnels et les grandes demandes
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Si vous êtes un professionnel (agent immobilier, administrateur, etc.), 
                veuillez utiliser notre formulaire dédié aux professionnels.
              </p>
              <Button 
                variant="default"
                className="w-full"
                onClick={() => router.push('/relocation/batch/professional')}
              >
                Commencer un relogement professionnel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 