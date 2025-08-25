import { Metadata } from "next";
import { Logo } from "@/components/ui/logo";

export const metadata: Metadata = {
  title: "Conditions d'utilisation - Pharewest",
  description: "Conditions d'utilisation de la plateforme Pharewest pour les services de relogement et d'hébergement.",
};

export default function TermsPage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Conditions d'utilisation
            </h1>
            <p className="text-muted-foreground">
              Dernière mise à jour : {currentYear}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <div className="space-y-8">
              
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-4">
                  Bienvenue sur Pharewest, plateforme de relogement d'urgence pour les personnes touchées par des sinistres 
                  dans les cantons de Genève et Vaud, Suisse. Ces conditions d'utilisation régissent votre utilisation de 
                  nos services d'hébergement et de relogement.
                </p>
                <p className="text-muted-foreground">
                  En utilisant notre plateforme, vous acceptez d'être lié par ces conditions. Si vous n'acceptez pas 
                  ces conditions, veuillez ne pas utiliser nos services.
                </p>
              </section>

              {/* Service Description */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Description des services</h2>
                <p className="text-muted-foreground mb-4">
                  Pharewest propose les services suivants :
                </p>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Mise en relation entre sinistrés et propriétaires de biens disponibles</li>
                  <li>Assistance au relogement d'urgence</li>
                  <li>Coordination avec les compagnies d'assurance</li>
                  <li>Gestion des dossiers de sinistres</li>
                  <li>Support administratif et logistique</li>
                </ul>
              </section>

              {/* Host Responsibilities */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Responsabilités des hôtes</h2>
                <p className="text-muted-foreground mb-4">
                  En tant qu'hôte proposant un bien sur notre plateforme, vous vous engagez à :
                </p>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Fournir des informations exactes et complètes sur votre bien</li>
                  <li>Respecter les réglementations locales d'hébergement</li>
                  <li>Obtenir les autorisations nécessaires (notamment pour la sous-location)</li>
                  <li>Maintenir votre bien dans un état conforme aux normes de sécurité</li>
                  <li>Collecter et reverser les taxes de séjour si applicable</li>
                  <li>Respecter les limites de majoration autorisées (20% maximum pour les biens meublés)</li>
                </ul>
              </section>

              {/* Guest Responsibilities */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Responsabilités des sinistrés</h2>
                <p className="text-muted-foreground mb-4">
                  En tant que sinistré utilisant nos services, vous vous engagez à :
                </p>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Fournir des informations exactes sur votre situation</li>
                  <li>Respecter les biens mis à disposition</li>
                  <li>Répondre rapidement aux communications de suivi</li>
                  <li>Signaler tout problème ou dommage immédiatement</li>
                  <li>Respecter les règles de vie établies par l'hôte</li>
                </ul>
              </section>

              {/* Insurance Coverage */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Couverture d'assurance</h2>
                <div className="bg-muted p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-medium mb-4">Assurance responsabilité civile</h3>
                  <p className="text-muted-foreground mb-4">
                    Il est fortement recommandé aux hôtes de disposer d'une assurance responsabilité civile 
                    couvrant les dommages causés par les invités.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">Protection Pharewest</h3>
                  <p className="text-muted-foreground mb-4">
                    Notre plateforme propose une protection incluant :
                  </p>
                  <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                    <li>Protection contre les dommages matériels</li>
                    <li>Assurance responsabilité civile de base</li>
                    <li>Assistance juridique en cas de litige</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    <strong>Note :</strong> Cette protection ne remplace pas une assurance habitation ou locative adéquate.
                  </p>
                </div>
              </section>

              {/* Data Protection */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Protection des données personnelles</h2>
                <p className="text-muted-foreground mb-4">
                  Conformément à la Loi fédérale suisse sur la protection des données (LPD), nous nous engageons à :
                </p>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Collecter uniquement les données nécessaires à nos services</li>
                  <li>Protéger vos données contre tout accès non autorisé</li>
                  <li>Ne pas partager vos données avec des tiers sans votre consentement</li>
                  <li>Conserver vos données uniquement le temps nécessaire</li>
                  <li>Vous permettre d'accéder, corriger ou supprimer vos données</li>
                </ul>
                
                <div className="bg-muted p-6 rounded-lg border border-border mt-6">
                  <h3 className="text-xl font-medium mb-4">Enregistrement des invités</h3>
                  <p className="text-muted-foreground">
                    Les hôtes peuvent être légalement tenus de collecter et conserver les informations de leurs invités 
                    suisses et étrangers. Ces informations doivent être protégées et traitées uniquement pour remplir 
                    les obligations du système de déclaration suisse.
                  </p>
                </div>
              </section>

              {/* Local Regulations */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Réglementations locales</h2>
                <div className="bg-muted p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-medium mb-4">Canton de Genève</h3>
                  <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                    <li>Enregistrement obligatoire des hôtes dans certaines municipalités</li>
                    <li>Taxes de séjour selon les communes</li>
                    <li>Autorisation de sous-location requise pour les locataires</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mb-4 mt-6">Canton de Vaud</h3>
                  <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                    <li>Réglementations spécifiques par commune</li>
                    <li>Obligations fiscales pour les revenus locatifs</li>
                    <li>Normes de sécurité et d'habitabilité</li>
                  </ul>
                </div>
              </section>

              {/* Limitations */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Limitations de responsabilité</h2>
                <p className="text-muted-foreground mb-4">
                  Pharewest agit en tant qu'intermédiaire et ne peut garantir :
                </p>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>La disponibilité permanente de biens</li>
                  <li>La conformité absolue des informations fournies par les utilisateurs</li>
                  <li>La résolution de tous les litiges entre hôtes et sinistrés</li>
                  <li>La couverture de tous les dommages ou préjudices</li>
                </ul>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Résiliation</h2>
                <p className="text-muted-foreground mb-4">
                  Nous nous réservons le droit de suspendre ou résilier l'accès à nos services en cas de :
                </p>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Violation de ces conditions d'utilisation</li>
                  <li>Fourniture d'informations fausses ou trompeuses</li>
                  <li>Comportement frauduleux ou abusif</li>
                  <li>Non-respect des réglementations locales</li>
                </ul>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
                <p className="text-muted-foreground mb-4">
                  Pour toute question concernant ces conditions d'utilisation, contactez-nous :
                </p>
                <div className="bg-muted p-6 rounded-lg border border-border">
                  <p className="text-muted-foreground">
                    <strong>Pharewest</strong><br />
                    Email : contact@pharewest.ch<br />
                    Téléphone : +41 XX XXX XX XX<br />
                    Adresse : [Adresse en Suisse]
                  </p>
                </div>
              </section>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  &copy; {currentYear} Pharewest. Tous droits réservés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
