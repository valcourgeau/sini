import { Metadata } from "next";
import Link from "next/link";

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

            <div className="rounded-lg bg-blue-50 p-6">
              <div className="flex items-start space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-600"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-blue-800">Vous êtes un professionnel?</h3>
                  <p className="text-blue-700">
                    Si vous êtes une régie immobilière, une compagnie d'assurance ou une autorité locale et que vous avez besoin de gérer plusieurs demandes de relogement, notre module de traitement par lots est fait pour vous. Contactez-nous pour en savoir plus sur nos solutions professionnelles.
                  </p>
                  <div className="pt-2">
                    <Link 
                      href="/contact" 
                      className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      Demander une démo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 