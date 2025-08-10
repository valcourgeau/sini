"use client";

import { Home, Users, Building2, Clock, CheckCircle2, Phone, ArrowRight, Loader2, HandCoins, Timer, UserRound, Video, Calendar, Heart, PiggyBank, Shield, ShieldCheck } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { ScrollButton } from "@/components/ui/scroll-button";
import { NavigationArrow } from "@/components/ui/navigation-arrow";
import { CollaborationLogo } from "@/components/brands/generali/collaboration-logo";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getImagePath } from "@/lib/utils";

export default function GeneraliHomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRelocationClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 400));
    
    router.push("/relocation/new?userType=sinistre");
  };

  const handleInsuranceClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 400));
    
    router.push("/relocation/new?userType=assurance");
  };

  const handleHostClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 400));
    
    router.push("/relocation/new?type=host");
  };

  const handlePropertyClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 400));
    
    router.push("/property/new");
  };

  return (
    <main className="min-h-screen scroll-smooth">
      {/* First Section - Generali Professional Background */}
      <section id="home" className="relative hero-background-generali min-h-[calc(100vh-4rem)] flex items-center justify-center scroll-mt-16">
        {/* Background accent elements - Generali themed */}
        <div className="hero-accent-generali hidden lg:block" />
        <div className="hero-accent-circle-generali-1 hidden lg:block" />
        <div className="hero-accent-circle-generali-2 hidden lg:block" />
        <div className="hero-accent-circle-generali-3 hidden lg:block" />
        <div className="hero-accent-circle-generali-4 hidden lg:block" />
        <div className="hero-accent-circle-generali-5 hidden lg:block" />
        
        {/* Content overlay */}
        <div className="hero-overlay-generali" />
        
        {/* Main content */}
        <div className="container relative z-10">
          <div className="mx-auto max-w-[980px] text-center">
            {/* Collaboration Logo */}
            <div className="mb-12 animate-in fade-in duration-500 slide-in-from-bottom-4">
              <CollaborationLogo size="xl" className="justify-center mb-8" />
            </div>
            
            {/* Enhanced title with Generali branding */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] mb-4 animate-in fade-in duration-500 slide-in-from-bottom-4">
                Service de relogement d'urgence
              </h1>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-lg text-foreground font-semibold">Partenaire officiel</span>
                <span className="text-xl font-bold text-foreground">Generali</span>
              </div>
            </div>
            
            {/* Enhanced subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-16 animate-in fade-in duration-500 delay-100 slide-in-from-bottom-4">
              pour le canton de Genève
            </p>
            
            {/* Enhanced action buttons with Generali glass effect */}
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto animate-in fade-in duration-500 delay-200 slide-in-from-bottom-4">
              <ScrollButton
                iconName="userround"
                title="Sinistrés"
                description="Particuliers affectés par un sinistre"
                sectionId="sinistres"
              />
              <ScrollButton
                iconName="landmark"
                title="Assurances"
                description="Professionnels de l'assurance"
                sectionId="assurances"
              />
            </div>
          </div>
        </div>
        
        {/* Navigation arrow with enhanced styling */}
        <div className="absolute bottom-8 right-8 z-10">
          <NavigationArrow direction="down" targetId="sinistres" position="bottom" />
        </div>
      </section>

      {/* Second Section - Generali Red Background */}
      <section id="sinistres" className="relative bg-generali-red min-h-[calc(100vh-4rem)] flex items-center justify-center text-primary-foreground scroll-mt-16">
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
                      Profiter de notre réseau d'habitations (meublés, équipés et proches de votre lieu de vie actuel).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <UserRound className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Accompagnement personnalisé</h3>
                    <p className="text-secondary/90">
                      Un interlocuteur unique qui facilite vos démarches.
                    </p>
                    <ul className="text-secondary/90 mt-3 space-y-1 ml-4">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        Clarté des coûts de la prise en charge de votre assurance.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        Assure le suivi auprès de votre assurance et des autres intervenants.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={handleRelocationClick}
                  disabled={isLoading}
                  className="group inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 backdrop-blur-sm border-2 border-white/30 disabled:opacity-70 disabled:cursor-not-allowed"
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
              <Image
                src={getImagePath("/happy-swiss-family.jpg")}
                alt="Famille heureuse devant leur nouvelle maison - Service de relogement d'urgence"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Third Section - Generali Light Red Background */}
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
                <h2 className="text-5xl font-bold mb-6 text-primary">Assurances</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Une solution complète pour la gestion des relogements de vos assurés
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Building2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-primary">Améliorer l'efficacité de vos équipes</h3>
                    <p className="text-muted-foreground">
                      Accéder à notre interface pour gérer les dossiers de vos assurés.
                    </p>
                    <ul className="text-muted-foreground mt-3 space-y-1 ml-4">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Faciliter et centraliser la recherche de logements.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Gérer plusieurs assurés en une seule demande.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-primary">Reloger à moindre coût</h3>
                    <p className="text-muted-foreground">
                      Comparer les prix des logements grâce à notre base de données complète.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-primary">Satisfaction client</h3>
                    <p className="text-muted-foreground">
                      Bénéficier d'un interlocuteur unique pour un relogement rapide et adapté aux besoins de vos assurés.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={handleInsuranceClick}
                  disabled={isLoading}
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 backdrop-blur-sm border-2 border-white/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      Effectuer une demande
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src={getImagePath("/happy-swiss-insurers.png")}
                alt="Happy Swiss insurers - professionals shaking hands"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section - Generali Red Background */}
      <section id="hosts" className="relative bg-generali-red min-h-[calc(100vh-4rem)] flex items-center justify-center text-primary-foreground scroll-mt-16">
        <div className="absolute top-24 right-8">
          <NavigationArrow direction="up" targetId="assurances" position="top" />
        </div>
        
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold mb-6 text-secondary">Hôtes</h2>
                <p className="text-xl text-secondary/90 mb-8">
                  Une opportunité simple et sécurisée de proposer votre logement à notre réseau de sinistrés et assurances.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <HandCoins className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Maximiser vos revenus</h3>
                    <p className="text-secondary/90">
                      Optimiser vos rendements et élargisser votre clientèle en rejoignant le réseau partenaire des assurances.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Calendar className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Gestion centralisée de vos annonces</h3>
                    <p className="text-secondary/90">
                      Un calendrier multi-plateforme pour la gestion et les réservations de vos biens.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Protéger votre bien</h3>
                    <p className="text-secondary/90">
                      Chaque sejour est encadré avec des sinistrés verifiés et garanties pour preserver l'integrité de votre logement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handlePropertyClick}
                  disabled={isLoading}
                  className="group inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 backdrop-blur-sm border-2 border-white/30 disabled:opacity-70 disabled:cursor-not-allowed"
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
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src={getImagePath("/happy-landlord.jpg")}
                alt="Happy landlord - property owner with keys"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
