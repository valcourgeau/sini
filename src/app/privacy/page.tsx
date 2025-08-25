import { Metadata } from "next";
import { Logo } from "@/components/ui/logo";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Pharewest",
  description: "Politique de confidentialité de la plateforme Pharewest pour la protection des données personnelles.",
};

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Politique de confidentialité
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
                  Pharewest s'engage à protéger votre vie privée et vos données personnelles. Cette politique de confidentialité 
                  explique comment nous collectons, utilisons, stockons et protégeons vos informations conformément à la 
                  Loi fédérale suisse sur la protection des données (LPD).
                </p>
                <p className="text-muted-foreground">
                  En utilisant notre plateforme, vous acceptez les pratiques décrites dans cette politique.
                </p>
              </section>

              {/* Data Controller */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Responsable du traitement</h2>
                <div className="bg-muted p-6 rounded-lg border border-border">
                  <p className="text-muted-foreground">
                    <strong>Pharewest</strong><br />
                    Email : privacy@pharewest.ch<br />
                    Téléphone : +41 XX XXX XX XX<br />
                    Adresse : [Adresse en Suisse]<br />
                    <br />
                    Pour toute question concernant le traitement de vos données, contactez notre délégué à la protection des données.
                  </p>
                </div>
              </section>

              {/* Data Collection */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Données collectées</h2>
                
                <h3 className="text-xl font-medium mb-4">Données d'identification</h3>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Nom, prénom et coordonnées (email, téléphone, adresse)</li>
                  <li>Informations sur le sinistre et la situation d'urgence</li>
                  <li>Documents d'identité (si requis par la réglementation)</li>
                </ul>

                <h3 className="text-xl font-medium mb-4 mt-6">Données relatives aux biens</h3>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Description et caractéristiques des biens proposés</li>
                  <li>Photographies et documents relatifs aux biens</li>
                  <li>Informations sur la disponibilité et les conditions</li>
                </ul>

                <h3 className="text-xl font-medium mb-4 mt-6">Données de communication</h3>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Messages échangés via la plateforme</li>
                  <li>Historique des interactions et demandes</li>
                  <li>Préférences et besoins spécifiques</li>
                </ul>

                <h3 className="text-xl font-medium mb-4 mt-6">Données techniques</h3>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Adresse IP et informations de navigation</li>
                  <li>Cookies et technologies similaires</li>
                  <li>Données d'utilisation de la plateforme</li>
                </ul>
              </section>

              {/* Purpose of Processing */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Finalités du traitement</h2>
                <p className="text-muted-foreground mb-4">
                  Nous traitons vos données pour les finalités suivantes :
                </p>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Fournir nos services de relogement d'urgence</li>
                  <li>Mettre en relation sinistrés et propriétaires</li>
                  <li>Coordonner avec les compagnies d'assurance</li>
                  <li>Gérer les dossiers et communications</li>
                  <li>Respecter les obligations légales et réglementaires</li>
                  <li>Améliorer nos services et la sécurité de la plateforme</li>
                </ul>
              </section>

              {/* Legal Basis */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Base légale du traitement</h2>
                <div className="bg-muted p-6 rounded-lg border border-border">
                  <p className="text-muted-foreground mb-4">
                    Le traitement de vos données est fondé sur :
                  </p>
                  <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                    <li><strong>Consentement :</strong> Pour les traitements non essentiels au service</li>
                    <li><strong>Exécution du contrat :</strong> Pour fournir nos services de relogement</li>
                    <li><strong>Obligation légale :</strong> Pour respecter les réglementations suisses</li>
                    <li><strong>Intérêt légitime :</strong> Pour la sécurité et l'amélioration de nos services</li>
                  </ul>
                </div>
              </section>

              {/* Data Sharing */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Partage des données</h2>
                <p className="text-muted-foreground mb-4">
                  Nous ne partageons vos données qu'avec :
                </p>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Les compagnies d'assurance partenaires (avec votre consentement)</li>
                  <li>Les autorités compétentes (si requis par la loi)</li>
                  <li>Nos prestataires de services techniques (sous garanties appropriées)</li>
                  <li>Les autres utilisateurs de la plateforme (selon les paramètres de confidentialité)</li>
                </ul>
                
                <div className="bg-muted p-6 rounded-lg border border-border mt-6">
                  <h3 className="text-xl font-medium mb-4">Enregistrement des invités</h3>
                  <p className="text-muted-foreground">
                    Conformément aux réglementations suisses, les hôtes peuvent être tenus de collecter et conserver 
                    les informations de leurs invités. Ces données doivent être protégées et utilisées uniquement 
                    pour les obligations légales.
                  </p>
                </div>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Conservation des données</h2>
                <p className="text-muted-foreground mb-4">
                  Nous conservons vos données uniquement le temps nécessaire :
                </p>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li><strong>Données de compte :</strong> Pendant la durée de votre inscription + 3 ans</li>
                  <li><strong>Données de sinistre :</strong> 10 ans (obligation légale)</li>
                  <li><strong>Données de communication :</strong> 2 ans après la fin du dossier</li>
                  <li><strong>Données techniques :</strong> 1 an maximum</li>
                </ul>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Sécurité des données</h2>
                <p className="text-muted-foreground mb-4">
                  Nous mettons en œuvre des mesures de sécurité appropriées :
                </p>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Chiffrement des données en transit et au repos</li>
                  <li>Accès restreint et authentification forte</li>
                  <li>Surveillance et détection d'intrusion</li>
                  <li>Sauvegardes sécurisées et régulières</li>
                  <li>Formation du personnel à la protection des données</li>
                </ul>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Vos droits</h2>
                <p className="text-muted-foreground mb-4">
                  Conformément à la LPD, vous disposez des droits suivants :
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg border border-border">
                    <h3 className="font-medium mb-2">Droit d'accès</h3>
                    <p className="text-sm text-muted-foreground">
                      Obtenir une copie de vos données personnelles
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg border border-border">
                    <h3 className="font-medium mb-2">Droit de rectification</h3>
                    <p className="text-sm text-muted-foreground">
                      Corriger des données inexactes ou incomplètes
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg border border-border">
                    <h3 className="font-medium mb-2">Droit d'effacement</h3>
                    <p className="text-sm text-muted-foreground">
                      Demander la suppression de vos données
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg border border-border">
                    <h3 className="font-medium mb-2">Droit de limitation</h3>
                    <p className="text-sm text-muted-foreground">
                      Limiter le traitement de vos données
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg border border-border">
                    <h3 className="font-medium mb-2">Droit de portabilité</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevoir vos données dans un format structuré
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg border border-border">
                    <h3 className="font-medium mb-2">Droit d'opposition</h3>
                    <p className="text-sm text-muted-foreground">
                      Vous opposer au traitement de vos données
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Cookies et technologies similaires</h2>
                <p className="text-muted-foreground mb-4">
                  Nous utilisons des cookies pour :
                </p>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Assurer le bon fonctionnement de la plateforme</li>
                  <li>Mémoriser vos préférences</li>
                  <li>Analyser l'utilisation du site (anonymement)</li>
                  <li>Améliorer nos services</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
                </p>
              </section>

              {/* International Transfers */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Transferts internationaux</h2>
                <p className="text-muted-foreground mb-4">
                  Vos données sont principalement traitées en Suisse. En cas de transfert vers des pays tiers, 
                  nous nous assurons que des garanties appropriées sont en place conformément à la LPD.
                </p>
              </section>

              {/* Complaints */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Réclamations</h2>
                <p className="text-muted-foreground mb-4">
                  Si vous estimez que le traitement de vos données ne respecte pas cette politique, 
                  vous pouvez :
                </p>
                <ul className="list-disc list-outside ml-6 text-muted-foreground space-y-2">
                  <li>Nous contacter directement à privacy@pharewest.ch</li>
                  <li>Déposer une réclamation auprès du Préposé fédéral à la protection des données</li>
                </ul>
              </section>

              {/* Updates */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Modifications de cette politique</h2>
                <p className="text-muted-foreground mb-4">
                  Nous pouvons mettre à jour cette politique de confidentialité. Les modifications importantes 
                  vous seront notifiées par email ou via la plateforme.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">14. Contact</h2>
                <p className="text-muted-foreground mb-4">
                  Pour toute question concernant cette politique de confidentialité :
                </p>
                <div className="bg-muted p-6 rounded-lg border border-border">
                  <p className="text-muted-foreground">
                    <strong>Pharewest - Protection des données</strong><br />
                    Email : privacy@pharewest.ch<br />
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
