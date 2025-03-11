import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | SINI",
  description: "En savoir plus sur le Service d'Intervention et de Relogement d'Urgence pour les cantons de Genève et Vaud.",
};

/**
 * About page component
 */
export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              À propos de SINI
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed">
              Service d'Intervention et de Relogement d'Urgence pour les cantons de Genève et Vaud.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Notre mission</h2>
              <p className="text-gray-500">
                SINI a été créé pour répondre aux besoins urgents de relogement des personnes touchées par des sinistres dans les cantons de Genève et Vaud. Notre mission est de faciliter et d'accélérer le processus de relogement en mettant en relation les personnes sinistrées avec les logements disponibles.
              </p>
              <p className="text-gray-500">
                Nous travaillons en étroite collaboration avec les autorités locales, les assurances, les régies immobilières et les propriétaires pour offrir une solution rapide et efficace aux personnes touchées par des sinistres.
              </p>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-lg bg-gradient-to-r from-blue-100 to-blue-200 md:h-[400px] flex items-center justify-center">
              <div className="text-2xl font-bold text-blue-600">Notre Mission</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Notre équipe</h2>
            <p className="text-gray-500">
              Notre équipe est composée de professionnels expérimentés dans les domaines de l'immobilier, de l'assurance et de la gestion de crise. Nous sommes dédiés à fournir un service de qualité et à accompagner les personnes sinistrées tout au long du processus de relogement.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                <div className="flex h-full w-full items-center justify-center text-gray-500">
                  Photo
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Jean Dupont</h3>
                <p className="text-sm text-gray-500">Directeur</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                <div className="flex h-full w-full items-center justify-center text-gray-500">
                  Photo
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Marie Martin</h3>
                <p className="text-sm text-gray-500">Responsable des opérations</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                <div className="flex h-full w-full items-center justify-center text-gray-500">
                  Photo
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Pierre Blanc</h3>
                <p className="text-sm text-gray-500">Responsable des relations</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 