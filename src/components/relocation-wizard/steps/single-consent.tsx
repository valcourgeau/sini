import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface SingleConsentProps {
  form: UseFormReturn<any>;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  onBack: () => void;
}

interface ConsentErrors {
  agreeToTerms?: { message?: string };
  agreeToDataProcessing?: { message?: string };
}

export function SingleConsent({ form, onSubmit, isSubmitting, onBack }: SingleConsentProps) {
  const { register, formState: { errors } } = form;
  const consentErrors = (errors.singleConsent || {}) as ConsentErrors;

  // Handle form submission with validation
  const handleSubmit = async () => {
    console.log("Consent validation triggered");
    const isValid = await form.trigger("singleConsent");
    console.log("Consent validation result:", isValid);
    console.log("Current consent values:", form.getValues("singleConsent"));
    if (isValid) {
      await onSubmit();
    } else {
      console.log("Consent validation failed, showing errors");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Consentement et autorisation</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Veuillez examiner et accepter les conditions suivantes pour soumettre votre demande de relogement.
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
              <li>Vous acceptez de répondre sous 24 heures à toute communication de suivi concernant votre demande.</li>
              <li>Vous reconnaissez que les options de relogement sont soumises à disponibilité et critères d'éligibilité.</li>
              <li>Vous comprenez que toute information fausse ou trompeuse peut entraîner le rejet de votre demande.</li>
            </ul>
            
            <h3 className="font-medium mt-6">Politique de confidentialité</h3>
            <p className="text-sm text-muted-foreground">
              Nous nous engageons à protéger votre vie privée. Voici comment nous traitons vos données :
            </p>
            <ul className="list-disc list-outside ml-5 text-sm text-muted-foreground space-y-1">
              <li>Vos informations personnelles ne seront utilisées que pour traiter votre demande de relogement et les services associés.</li>
              <li>Nous pouvons partager vos informations avec des partenaires et fournisseurs de relogement si nécessaire.</li>
              <li>Si vous avez fourni des informations d'assurance, nous pouvons contacter votre assureur pour vérifier la couverture.</li>
              <li>Vos données seront stockées de manière sécurisée et conservées pendant la durée requise par les lois applicables.</li>
              <li>Vous avez le droit d'accéder, de corriger ou de demander la suppression de vos informations personnelles.</li>
              <li>Pour plus de détails sur le traitement de vos données, veuillez consulter notre Politique de confidentialité complète.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="singleConsent.agreeToTerms"
              checked={form.watch("singleConsent.agreeToTerms") || false}
              onCheckedChange={(checked) => {
                form.setValue("singleConsent.agreeToTerms", checked as boolean, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true
                });
              }}
              className="mt-0.5"
            />
            <div className="space-y-1">
              <Label 
                htmlFor="singleConsent.agreeToTerms" 
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                J'accepte les conditions d'utilisation <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                En cochant cette case, vous confirmez avoir lu, compris et accepté les conditions ci-dessus.
              </p>
              {consentErrors.agreeToTerms && (
                <p className="text-sm text-destructive mt-2">
                  {consentErrors.agreeToTerms.message as string}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox
              id="singleConsent.agreeToDataProcessing"
              checked={form.watch("singleConsent.agreeToDataProcessing") || false}
              onCheckedChange={(checked) => {
                form.setValue("singleConsent.agreeToDataProcessing", checked as boolean, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true
                });
              }}
              className="mt-0.5"
            />
            <div className="space-y-1">
              <Label 
                htmlFor="singleConsent.agreeToDataProcessing" 
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Je consens au traitement de mes données personnelles <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                En cochant cette case, vous donnez votre consentement pour la collecte, l'utilisation et le partage de vos 
                informations personnelles comme décrit dans notre politique de confidentialité.
              </p>
              {consentErrors.agreeToDataProcessing && (
                <p className="text-sm text-destructive mt-2">
                  {consentErrors.agreeToDataProcessing.message as string}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-md border border-primary/10">
          <p className="text-sm text-primary/80">
            <strong>Important :</strong> Après avoir soumis votre demande, vous recevrez un email de confirmation 
            avec un résumé de votre demande de relogement. Notre équipe vous contactera pour les prochaines étapes.
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
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-2 h-auto bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? "Envoi en cours..." : "Valider la demande"}
          </Button>
        </div>
      </div>
    </div>
  );
} 