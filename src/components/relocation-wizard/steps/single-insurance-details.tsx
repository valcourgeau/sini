import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface SingleInsuranceDetailsProps {
  form: UseFormReturn<any>;
}

export function SingleInsuranceDetails({ form }: SingleInsuranceDetailsProps) {
  const { register, formState: { errors } } = form;
  const insuranceErrors = errors.singleInsuranceDetails || {};
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Insurance Details</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please provide information about your insurance policy that may cover relocation expenses.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="singleInsuranceDetails.insuranceCompany">
            Insurance Company <span className="text-red-500">*</span>
          </Label>
          <input
            id="singleInsuranceDetails.insuranceCompany"
            {...register("singleInsuranceDetails.insuranceCompany")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="e.g., Zurich Insurance, AXA, Swiss Life"
          />
          {insuranceErrors.insuranceCompany && (
            <p className="text-sm text-red-500 mt-1">
              {insuranceErrors.insuranceCompany.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="singleInsuranceDetails.policyNumber">
            Policy Number <span className="text-red-500">*</span>
          </Label>
          <input
            id="singleInsuranceDetails.policyNumber"
            {...register("singleInsuranceDetails.policyNumber")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Your insurance policy number"
          />
          {insuranceErrors.policyNumber && (
            <p className="text-sm text-red-500 mt-1">
              {insuranceErrors.policyNumber.message as string}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            This can usually be found on your insurance documents or online account.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="singleInsuranceDetails.agentContact">
            Insurance Agent Contact (Optional)
          </Label>
          <input
            id="singleInsuranceDetails.agentContact"
            {...register("singleInsuranceDetails.agentContact")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Name and contact details of your insurance agent"
          />
          <p className="text-xs text-muted-foreground mt-1">
            If you have a specific agent handling your claim, providing their details can help expedite the process.
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