import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface MultipleConsentProps {
  form: UseFormReturn<any>;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  onBack: () => void;
}

interface ConsentErrors {
  agreeToTerms?: { message?: string };
  agreeToDataProcessing?: { message?: string };
}

export function MultipleConsent({ form, onSubmit, isSubmitting, onBack }: MultipleConsentProps) {
  const { register, formState: { errors } } = form;
  const consentErrors = (errors.multipleConsent || {}) as ConsentErrors;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Consentement et autorisation</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Veuillez examiner et accepter les conditions suivantes pour soumettre vos demandes de relogement.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-md border border-border">
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            <h3 className="font-medium">Conditions d'utilisation</h3>
            <p className="text-sm text-muted-foreground">
              En utilisant notre service d'assistance au relogement, vous acceptez les conditions suivantes :
            </p>
            <ul className="list-disc list-outside ml-5 text-sm text-muted-foreground space-y-1">
              <li>Les informations fournies dans ce formulaire sont exactes et complètes à votre connaissance.</li>
              <li>Vous nous autorisez à utiliser ces informations pour vous aider à trouver des options de relogement adaptées.</li>
              <li>Vous comprenez que la soumission de ce formulaire ne garantit pas l'assistance au relogement.</li>
              <li>Vous acceptez de répondre rapidement à toute communication de suivi concernant les demandes.</li>
              <li>Vous reconnaissez que les options de relogement sont soumises à disponibilité et critères d'éligibilité.</li>
              <li>Vous comprenez que toute information fausse ou trompeuse peut entraîner le rejet des demandes.</li>
            </ul>
            
            <h3 className="font-medium mt-6">Politique de confidentialité</h3>
            <p className="text-sm text-muted-foreground">
              Nous nous engageons à protéger votre vie privée. Voici comment nous traitons vos données :
            </p>
            <ul className="list-disc list-outside ml-5 text-sm text-muted-foreground space-y-1">
              <li>Les informations personnelles ne seront utilisées que pour traiter les demandes de relogement et les services associés.</li>
              <li>Nous pouvons partager les informations avec des partenaires de relogement, des fournisseurs de logement et les autorités compétentes si nécessaire.</li>
              <li>Si des informations d'assurance ont été fournies, nous pouvons contacter les assureurs pour vérifier la couverture.</li>
              <li>Les données seront stockées de manière sécurisée et conservées pendant la durée requise par les lois applicables.</li>
              <li>Les personnes concernées ont le droit d'accéder, de corriger ou de demander la suppression de leurs informations personnelles.</li>
              <li>Pour plus de détails sur le traitement des données, veuillez consulter notre Politique de confidentialité complète.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="multipleConsent.agreeToTerms"
              {...register("multipleConsent.agreeToTerms")}
              className="rounded border-input h-5 w-5 mt-0.5"
            />
            <div className="space-y-1">
              <Label htmlFor="multipleConsent.agreeToTerms" className="text-base font-medium">
                J'accepte les conditions d'utilisation <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                En cochant cette case, vous confirmez avoir lu, compris et accepté les conditions ci-dessus.
              </p>
              {consentErrors.agreeToTerms && (
                <p className="text-sm text-destructive">
                  {consentErrors.agreeToTerms.message as string}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="multipleConsent.agreeToDataProcessing"
              {...register("multipleConsent.agreeToDataProcessing")}
              className="rounded border-input h-5 w-5 mt-0.5"
            />
            <div className="space-y-1">
              <Label htmlFor="multipleConsent.agreeToDataProcessing" className="text-base font-medium">
                Je consens au traitement des données personnelles <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                En cochant cette case, vous donnez votre consentement pour la collecte, l'utilisation et le partage des 
                informations personnelles comme décrit dans notre politique de confidentialité.
              </p>
              {consentErrors.agreeToDataProcessing && (
                <p className="text-sm text-destructive">
                  {consentErrors.agreeToDataProcessing.message as string}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-md border border-primary/10">
          <p className="text-sm text-primary/80">
            <strong>Important :</strong> Après avoir soumis les demandes, vous recevrez un email de confirmation 
            avec un résumé de toutes les demandes de relogement. Notre équipe vous contactera pour les prochaines étapes.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={onBack}
            className="px-6 py-2 h-auto"
          >
            Retour
          </Button>
          <Button 
            type="button" 
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-8 py-2 h-auto bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? "Envoi en cours..." : "Valider les demandes"}
          </Button>
        </div>
      </div>
    </div>
  );
} 