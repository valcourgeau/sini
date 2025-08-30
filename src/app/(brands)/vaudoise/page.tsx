"use client";

import { Home, Users, Building2, Clock, CheckCircle2, Phone, ArrowRight, Loader2, HandCoins, Timer, UserRound, Video, Calendar, Heart, PiggyBank, Shield, ShieldCheck } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { ScrollButton } from "@/components/ui/scroll-button";
import { NavigationArrow } from "@/components/ui/navigation-arrow";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getImagePath } from "@/lib/utils";
import { useBrandTheme } from "@/hooks/use-brand-theme";

export default function VaudoiseHomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Initialize brand theme
  useBrandTheme();

  const handleRelocationClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 400));
    
    router.push("/relocation/new?userType=sinistre&brand=vaudoise");
  };

  const handleInsuranceClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 400));
    
    router.push("/relocation/new?userType=assurance&brand=vaudoise");
  };

  const handleHostClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 400));
    
    router.push("/relocation/new?type=host&brand=vaudoise");
  };

  const handlePropertyClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 400));
    
    router.push("/property/new?brand=vaudoise");
  };

  return (
    <main className="min-h-screen scroll-smooth">
      {/* First Section - Vaudoise Professional Background */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center scroll-mt-16 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(${getImagePath('/lighthouse-red.JPG')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Content overlay */}
        <div className="hero-overlay-vaudoise" />
        
        {/* Main content */}
        <div className="container relative z-10 mx-auto">
          <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            
            {/* Enhanced title with Vaudoise branding */}
            <div className="mb-6 sm:mb-8 lg:mb-12">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-none tracking-tighter mb-3 sm:mb-4 lg:mb-6 animate-in fade-in duration-500 slide-in-from-bottom-4 text-primary-foreground drop-shadow-xl [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
                Service de relogement d'urgence
              </h1>
              <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
                <span className="text-base sm:text-lg text-primary-foreground font-semibold drop-shadow-xl">Partenaire officiel</span>
                <span className="text-lg sm:text-xl font-bold text-primary-foreground drop-shadow-xl">Vaudoise Assurances</span>
              </div>
            </div>
            
            {/* Enhanced subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-8 sm:mb-12 lg:mb-16 animate-in fade-in duration-500 delay-100 slide-in-from-bottom-4 drop-shadow-md px-4">
              pour le canton de Genève
            </p>
            
            {/* Enhanced action buttons with Vaudoise glass effect */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-2xl sm:max-w-3xl mx-auto animate-in fade-in duration-500 delay-200 slide-in-from-bottom-4 px-4 mb-8 sm:mb-12">
              <ScrollButton
                iconName="userround"
                title="Sinistrés"
                description="Particuliers affectés par un sinistre"
                sectionId="sinistres"
                opacity="70"
              />
              <ScrollButton
                iconName="landmark"
                title="Assurances"
                description="Professionnels de l'assurance"
                sectionId="assurances"
                opacity="70"
              />
            </div>
          </div>
        </div>
        
        {/* Navigation arrow with responsive positioning */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-10">
          <NavigationArrow direction="down" targetId="sinistres" position="bottom" />
        </div>
      </section>

      {/* Second Section - White Background */}
      <section id="sinistres" className="relative bg-secondary min-h-screen flex items-center justify-center scroll-mt-16 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8">
          <NavigationArrow direction="up" targetId="home" position="top" />
        </div>
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8">
          <NavigationArrow direction="down" targetId="assurances" position="bottom" />
        </div>
        
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-primary">Sinistrés</h2>
                <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
                  Votre partenaire de confiance pour un relogement rapide et serein
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Timer className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary">Rapidité de relogement</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Une solution d'hébergement temporaire adaptée visant à proposer un relogement dans les 24-48 heures.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <Home className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary">Logements adaptés</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Profiter de notre réseau d'habitations (meublés, équipés et proches de votre lieu de vie actuel).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                  <UserRound className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary">Accompagnement personnalisé</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Un interlocuteur unique qui facilite vos démarches.
                    </p>
                    <ul className="text-sm sm:text-base text-muted-foreground mt-3 space-y-1 ml-4">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Clarté des coûts de la prise en charge de votre assurance.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Assure le suivi auprès de votre assurance et des autres intervenants.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-4 sm:pt-6">
                <button 
                  onClick={handleRelocationClick}
                  disabled={isLoading}
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 backdrop-blur-sm border-2 border-white/30 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      Demander un relogement
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/10 order-first lg:order-last">
              <Image
                src={getImagePath("/happy-swiss-family.jpg")}
                alt="Famille heureuse devant leur nouvelle maison - Service de relogement d'urgence"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Third Section - Vaudoise Green Background with Diagonal Separation */}
      <section id="assurances" className="relative bg-secondary min-h-screen flex items-center justify-center scroll-mt-16 overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Diagonal Green Background */}
        <div className="absolute inset-0 bg-primary" style={{
          clipPath: 'polygon(0 0, 80% 0, 60% 100%, 0% 100%)'
        }}></div>
        
        <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8">
          <NavigationArrow direction="up" targetId="sinistres" position="top" />
        </div>
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8">
          <NavigationArrow direction="down" targetId="hosts" position="bottom" />
        </div>
        <div className="container relative z-10 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-secondary">Assurances</h2>
                <p className="text-lg sm:text-xl text-secondary/90 mb-6 sm:mb-8">
                  Une solution complète pour la gestion des relogements de vos assurés
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-secondary">Améliorer l'efficacité de vos équipes</h3>
                    <p className="text-sm sm:text-base text-secondary/90">
                      Accéder à notre interface pour gérer les dossiers de vos assurés.
                    </p>
                    <ul className="text-sm sm:text-base text-secondary/90 mt-3 space-y-1 ml-4">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        Faciliter et centraliser la recherche de logements.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        Gérer plusieurs assurés en une seule demande.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-secondary">Reloger à moindre coût</h3>
                    <p className="text-sm sm:text-base text-secondary/90">
                      Comparer les prix des logements grâce à notre base de données complète.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-secondary/90 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-secondary">Satisfaction client</h3>
                    <p className="text-sm sm:text-base text-secondary/90">
                      Bénéficier d'un interlocuteur unique pour un relogement rapide et adapté aux besoins de vos assurés.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 sm:pt-6">
                <button 
                  onClick={handleInsuranceClick}
                  disabled={isLoading}
                  className="group inline-flex items-center gap-2 bg-secondary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-secondary/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 backdrop-blur-sm border-2 border-white/30 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      Effectuer une demande
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden order-first lg:order-last">
              <Image
                src={getImagePath("/happy-swiss-insurers.png")}
                alt="Happy Swiss insurers - professionals shaking hands"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section - White Background */}
      <section id="hosts" className="relative bg-secondary min-h-screen flex items-center justify-center scroll-mt-16 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8">
          <NavigationArrow direction="up" targetId="assurances" position="top" />
        </div>
        
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-primary">Hôtes</h2>
                <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
                  Une opportunité simple et sécurisée de proposer votre logement à notre réseau de sinistrés et assurances.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <HandCoins className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary">Maximiser vos revenus</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Optimiser vos rendements et élargisser votre clientèle en rejoignant le réseau partenaire des assurances.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary">Gestion centralisée de vos annonces</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Un calendrier multi-plateforme pour la gestion et les réservations de vos biens.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary">Protéger votre bien</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Chaque sejour est encadré avec des sinistrés verifiés et garanties pour preserver l'integrité de votre logement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 sm:pt-6">
                <button
                  onClick={handlePropertyClick}
                  disabled={isLoading}
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 backdrop-blur-sm border-2 border-white/30 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      Devenir hôte
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden order-first lg:order-last">
              <Image
                src={getImagePath("/happy-landlord.jpg")}
                alt="Happy landlord - property owner with keys"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 