import { Metadata } from "next";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Traitement par lots | Pharewest",
  description: "Module de traitement par lots pour les professionnels gérant plusieurs demandes de relogement.",
};

/**
 * Batch processing page for multiple relocation requests
 */
export default function BatchRelocationPage() {
  return (
    <main className="flex-1">
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Traitement par lots
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed">
              Module de traitement par lots pour les professionnels gérant plusieurs demandes de relogement.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Connexion requise</h2>
                <p className="text-gray-500">
                  Vous devez être connecté pour accéder au module de traitement par lots. Si vous n'avez pas encore de compte, veuillez contacter notre équipe.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link 
                    href="/login" 
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Se connecter
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Contacter l'équipe
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Fonctionnalités du module de traitement par lots</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Importation de données</h3>
                    <p className="text-gray-500">
                      Importez facilement des listes de personnes à reloger à partir de fichiers CSV ou Excel.
                    </p>
                  </div>
                </div>
                
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Gestion centralisée</h3>
                    <p className="text-gray-500">
                      Gérez toutes vos demandes de relogement depuis une interface unique et intuitive.
                    </p>
                  </div>
                </div>
                
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Suivi en temps réel</h3>
                    <p className="text-gray-500">
                      Suivez l'état d'avancement de chaque demande de relogement en temps réel.
                    </p>
                  </div>
                </div>
                
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Rapports détaillés</h3>
                    <p className="text-gray-500">
                      Générez des rapports détaillés sur les demandes de relogement et leur traitement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-primary/5 p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Building2 className="h-6 w-6 text-primary/80" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-primary/90">Vous êtes un professionnel?</h3>
                  <p className="text-primary/80">
                    Si vous êtes un professionnel (agent immobilier, administrateur, etc.), 
                    veuillez utiliser notre formulaire dédié aux professionnels.
                  </p>
                  <Button 
                    variant="default"
                    className="mt-4"
                    onClick={() => window.location.href = '/relocation/batch/professional'}
                  >
                    Formulaire professionnel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 