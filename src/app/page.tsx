"use client";

import { Home, Users, Building2, Clock, CheckCircle2, Phone, ArrowRight, Loader2 } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { ScrollButton } from "@/components/ui/scroll-button";
import { NavigationArrow } from "@/components/ui/navigation-arrow";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRelocationClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 800));
    
    router.push("/relocation/new?type=single");
  };

  return (
    <main className="min-h-screen scroll-smooth">
      {/* First Section - Sand Background */}
      <section id="home" className="relative bg-secondary min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="container">
          <div className="mx-auto max-w-[980px] text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] mb-8 whitespace-nowrap">
              Service de relogement d'urgence
            </h1>
            <p className="text-2xl text-muted-foreground mb-16">
              Pour le canton de Genève
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <ScrollButton
                iconName="alert-triangle"
                title="Sinistrés"
                description="Affecté(e) par un sinistre ?"
                sectionId="sinistres"
              />
              <ScrollButton
                iconName="building2"
                title="Assurances"
                description="Professionnel de l'assurance."
                sectionId="assurances"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8">
          <NavigationArrow direction="down" targetId="sinistres" position="bottom" />
        </div>
      </section>

      {/* Second Section - Blue Background */}
      <section id="sinistres" className="relative bg-primary min-h-[100vh] flex items-center justify-center text-primary-foreground">
        <div className="absolute top-8 right-8">
          <NavigationArrow direction="up" targetId="header" position="top" />
        </div>
        <div className="absolute bottom-8 right-8">
          <NavigationArrow direction="down" targetId="assurances" position="bottom" />
        </div>
        
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold mb-6 text-secondary">Sinistrés</h2>
                <p className="text-xl text-secondary/90 mb-8">
                  Votre partenaire de confiance pour un relogement rapide et serein
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Relogement sous 24h</h3>
                    <p className="text-secondary/90">
                      Une solution d'hébergement temporaire adaptée en moins de 24 heures.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Accompagnement personnalisé</h3>
                    <p className="text-secondary/90">
                      Un interlocuteur unique qui facilite vos démarches administratives.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Home className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Logements adaptés</h3>
                    <p className="text-secondary/90">
                      Des appartements meublés et équipés, proches de votre lieu de vie habituel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={handleRelocationClick}
                  disabled={isLoading}
                  className="group inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      Demander un relogement
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-lg font-medium text-white">Vidéo de présentation</p>
                  <p className="text-sm text-white/60 mt-2">Découvrez notre service en action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third Section - Sand Background */}
      <section id="assurances" className="relative bg-secondary min-h-[100vh] flex items-center justify-center">
        <div className="absolute top-8 right-8">
          <NavigationArrow direction="up" targetId="sinistres" position="top" />
        </div>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold mb-6">Assurances</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Une solution complète pour la gestion des relogements d'urgence
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Building2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Plateforme dédiée</h3>
                    <p className="text-muted-foreground">
                      Accédez à notre interface pour gérer les dossiers de vos assurés.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Suivi en temps réel</h3>
                    <p className="text-muted-foreground">
                      Suivez l'état d'avancement des relogements et gérez vos priorités.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Équipe dédiée</h3>
                    <p className="text-muted-foreground">
                      Bénéficiez d'un interlocuteur unique pour tous vos dossiers de relogement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link 
                  href="/relocation/new"
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Accéder à la plateforme
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-primary/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-lg font-medium">Démonstration</p>
                  <p className="text-sm text-muted-foreground mt-2">Découvrez notre plateforme en action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 