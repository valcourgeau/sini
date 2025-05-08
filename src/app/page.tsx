import { Home, Users, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { IconBox } from "@/components/ui/icon-box";

export default function HomePage() {
  return (
    <main>
      <section className="relative bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-[980px] text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              Service de Relogement d'Urgence
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Pour le canton de Genève
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Votre partenaire de confiance
              </h2>
              <p className="text-muted-foreground">
                Nous accompagnons les propriétaires et les locataires dans leurs démarches de relogement suite à un sinistre.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/relocation/new"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Demander un relogement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/property/list"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Proposer un logement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 md:h-[400px] flex items-center justify-center">
              <div className="text-2xl font-bold text-primary">PHAREWEST</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center md:text-left">
              <IconBox>
                <Home />
              </IconBox>
              <h3 className="mt-4 text-xl font-bold">Relogement d'urgence</h3>
              <p className="mt-2 text-muted-foreground">
                Solutions rapides et adaptées pour un relogement temporaire suite à un sinistre sous 24 heures.
              </p>
            </div>
            <div className="text-center md:text-left">
              <IconBox>
                <Users />
              </IconBox>
              <h3 className="mt-4 text-xl font-bold">Accompagnement personnalisé</h3>
              <p className="mt-2 text-muted-foreground">
                Une équipe dédiée pour vous guider dans toutes vos démarches.
              </p>
            </div>
            <div className="text-center md:text-left">
              <IconBox>
                <Building2 />
              </IconBox>
              <h3 className="mt-4 text-xl font-bold">Réseau d'hébergement</h3>
              <p className="mt-2 text-muted-foreground">
                Un vaste réseau de logements temporaires dans toute la région.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              Besoin d'assistance ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Notre équipe est disponible 24/7 pour vous accompagner dans vos démarches de relogement.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 