import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | Pharewest",
  description: "À propos de Pharewest, service de relogement de Sinistrés pour les cantons de Genève et Vaud.",
};

/**
 * About page component
 */
export default function AboutPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            À propos de Pharewest
          </h1>

          <div className="prose prose-gray max-w-none">
            <h2>Notre Mission</h2>
            <p>
              Pharewest a été créé pour répondre aux besoins urgents de relogement des personnes touchées par des sinistres dans les cantons de Genève et Vaud. Notre mission est de faciliter et d&apos;accélérer le processus de relogement en mettant en relation les personnes sinistrées avec les logements disponibles.
            </p>

            <div className="my-12">
              <div className="relative h-[300px] overflow-hidden rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 md:h-[400px] flex items-center justify-center">
                <div className="text-2xl font-bold text-primary">Notre Mission</div>
              </div>
            </div>

            <h2>Notre Engagement</h2>
            <p>
              Notre équipe s&apos;engage à fournir un service de qualité et à accompagner les personnes sinistrées tout au long du processus de relogement. Nous travaillons en étroite collaboration avec les autorités locales, les assurances et les propriétaires pour garantir des solutions adaptées à chaque situation.
            </p>

            <h2>Notre Approche</h2>
            <ul>
              <li>Réactivité et efficacité dans le traitement des demandes</li>
              <li>Accompagnement personnalisé tout au long du processus</li>
              <li>Réseau étendu de partenaires et de logements disponibles</li>
              <li>Solutions adaptées aux besoins spécifiques de chaque situation</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 