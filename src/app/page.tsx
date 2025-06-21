"use client";

import { Home, Users, Building2, Clock, CheckCircle2, Phone, ArrowRight, Loader2, HandCoins, Timer, UserRound, Video, Calendar, Heart, PiggyBank } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { ScrollButton } from "@/components/ui/scroll-button";
import { NavigationArrow } from "@/components/ui/navigation-arrow";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isManagementLoading, setIsManagementLoading] = useState(false);
  const router = useRouter();

  const handleRelocationClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 800));
    
    router.push("/relocation/new?type=single");
  };

  const handleHostClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 800));
    
    router.push("/relocation/new?type=host");
  };

  const handlePropertyClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 800));
    
    router.push("/property/new");
  };

  const handleManagementClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsManagementLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 800));
    
    router.push("/property/management");
  };

  return (
    <main className="min-h-screen scroll-smooth">
      {/* First Section - Sand Background */}
      <section id="home" className="relative bg-secondary min-h-[calc(100vh-4rem)] flex items-center justify-center scroll-mt-16">
        <div className="container">
          <div className="mx-auto max-w-[980px] text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] mb-8">
              Service de relogement de sinistrés
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-16">
              Pour le canton de Genève
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <ScrollButton
                iconName="alert-triangle"
                title="Sinistrés"
                description="Particuliers affectés par un sinistre"
                sectionId="sinistres"
              />
              <ScrollButton
                iconName="building2"
                title="Assurances"
                description="Professionnels de l'assurance"
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
      <section id="sinistres" className="relative bg-primary min-h-[calc(100vh-4rem)] flex items-center justify-center text-primary-foreground scroll-mt-16">
        <div className="absolute top-24 right-8">
          <NavigationArrow direction="up" targetId="home" position="top" />
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
                  <Timer className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Rapidité de relogement</h3>
                    <p className="text-secondary/90">
                      Une solution d'hébergement temporaire adaptée visant à proposer un relogement dans les 24-48 heures.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Home className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Logements adaptés</h3>
                    <p className="text-secondary/90">
                      Profitez de notre réseau de logements meublés, des appartements meublés et équipés, proches de votre lieu de vie habituel.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <UserRound className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Accompagnement personnalisé</h3>
                    <p className="text-secondary/90">
                      Un interlocuteur unique qui facilite vos démarches administratives et assure le suivi auprès de votre assurance.
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
                    <Video className="h-8 w-8 text-white" />
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
      <section id="assurances" className="relative bg-secondary min-h-[calc(100vh-4rem)] flex items-center justify-center scroll-mt-16">
        <div className="absolute top-24 right-8">
          <NavigationArrow direction="up" targetId="sinistres" position="top" />
        </div>
        <div className="absolute bottom-8 right-8">
          <NavigationArrow direction="down" targetId="hosts" position="bottom" />
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
                    <h3 className="text-xl font-bold mb-2">Améliorer l'efficacité de vos équipes</h3>
                    <p className="text-muted-foreground">
                      Accédez à notre interface pour gérer les dossiers de vos assurés.
                    </p>
                    <ul className="text-muted-foreground mt-3 space-y-1 ml-4">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Faciliter et centraliser la recherche de logements
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Gérer plusieurs assurés en une seule demande
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Reloger à moindre coût</h3>
                    <p className="text-muted-foreground">
                      Suivez l'état d'avancement des relogements et gérez vos priorités.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Satisfaction client</h3>
                    <p className="text-muted-foreground">
                      Bénéficiez d'un interlocuteur unique pour tous vos dossiers de relogement pour un relogement rapide et adapté aux besoins de vos assurés.
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
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-lg font-medium">Démonstration</p>
                  <p className="text-sm text-muted-foreground mt-2">Découvrez notre plateforme en action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section - Blue Background */}
      <section id="hosts" className="relative bg-primary min-h-[calc(100vh-4rem)] flex items-center justify-center text-primary-foreground scroll-mt-16">
        <div className="absolute top-24 right-8">
          <NavigationArrow direction="up" targetId="assurances" position="top" />
        </div>
        
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold mb-6 text-secondary">Hôtes</h2>
                <p className="text-xl text-secondary/90 mb-8">
                  Une opportunité simple et sécurisée de proposer votre logement à notre réseau de sinistrés
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <HandCoins className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Maximiser vos revenus</h3>
                    <p className="text-secondary/90">
                      Optimisez vos rendements en rejoignant la plateforme partenaire des assurances.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Calendar className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Gestion centralisée de vos annonces</h3>
                    <p className="text-secondary/90">
                      Un calendrier multi-plateforme pour les disponibilités et les réservations de vos biens.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Heart className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Solidarité locale</h3>
                    <p className="text-secondary/90">
                      Venez en aide aux sinistrés de votre région en mettant votre bien à disposition.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button
                  onClick={handleRelocationClick}
                  disabled={isLoading || isManagementLoading}
                  className="group inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      Devenir hôte
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <button
                  onClick={handleManagementClick}
                  disabled={isLoading || isManagementLoading}
                  className="group inline-flex items-center gap-2 bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isManagementLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      Gérer mes biens
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
                    <Home className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-lg font-medium text-white">Découvrez le programme</p>
                  <p className="text-sm text-white/60 mt-2">Rejoignez notre réseau d'hôtes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 