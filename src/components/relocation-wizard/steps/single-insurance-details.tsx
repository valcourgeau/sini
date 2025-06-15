import { UseFormReturn, FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface SingleInsuranceDetailsProps {
  form: UseFormReturn<any>;
}

export function SingleInsuranceDetails({ form }: SingleInsuranceDetailsProps) {
  const { register, formState: { errors } } = form;
  const insuranceErrors = errors.singleInsuranceDetails as Record<string, FieldError> || {};
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Détails de l'assurance</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Veuillez fournir les informations concernant votre police d'assurance qui pourrait couvrir les frais de relogement.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="singleInsuranceDetails.insuranceCompany">
            Compagnie d'assurance <span className="text-red-500">*</span>
          </Label>
          <input
            id="singleInsuranceDetails.insuranceCompany"
            {...register("singleInsuranceDetails.insuranceCompany")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Ex: Zurich Insurance, AXA, Swiss Life"
          />
          {insuranceErrors.insuranceCompany && (
            <p className="text-sm text-red-500 mt-1">
              {insuranceErrors.insuranceCompany.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="singleInsuranceDetails.policyNumber">
            Numéro de police <span className="text-red-500">*</span>
          </Label>
          <input
            id="singleInsuranceDetails.policyNumber"
            {...register("singleInsuranceDetails.policyNumber")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Votre numéro de police d'assurance"
          />
          {insuranceErrors.policyNumber && (
            <p className="text-sm text-red-500 mt-1">
              {insuranceErrors.policyNumber.message as string}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Vous pouvez généralement le trouver sur vos documents d'assurance ou votre compte en ligne.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="singleInsuranceDetails.agentContact">
            Contact de l'agent d'assurance (Optionnel)
          </Label>
          <input
            id="singleInsuranceDetails.agentContact"
            {...register("singleInsuranceDetails.agentContact")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Nom et coordonnées de votre agent d'assurance"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Si vous avez un agent spécifique qui gère votre dossier, fournir ses coordonnées peut aider à accélérer le processus.
          </p>
        </div>

        <div className="p-4 bg-amber-50 rounded-md border border-amber-100">
          <p className="text-sm text-amber-700">
            <strong>Important:</strong> We may need to verify your insurance coverage with your provider. By providing 
            this information, you authorize us to contact your insurance company regarding your relocation claim.
          </p>
        </div>
      </div>
    </div>
  );
} 