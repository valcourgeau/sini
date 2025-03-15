import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SingleInsuranceCoverageProps {
  form: UseFormReturn<any>;
}

export function SingleInsuranceCoverage({ form }: SingleInsuranceCoverageProps) {
  const { setValue, formState: { errors } } = form;
  const insuranceErrors = errors.singleInsuranceCoverage || {};
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Insurance Coverage</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please indicate whether you have insurance that may cover your relocation expenses.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Do you have insurance that covers relocation due to the disaster?</Label>
          
          <RadioGroup 
            defaultValue={form.watch("singleInsuranceCoverage.hasInsurance") ? "yes" : "no"}
            onValueChange={(value) => setValue("singleInsuranceCoverage.hasInsurance", value === "yes" ? true : value === "no" ? false : null)}
            className="grid gap-4"
          >
            <div className="flex items-start space-x-3 p-4 border rounded-md">
              <RadioGroupItem value="yes" id="insurance-yes" />
              <div className="space-y-1.5 flex-1">
                <Label htmlFor="insurance-yes" className="text-base">
                  Yes
                </Label>
                <p className="text-sm text-muted-foreground">
                  I have insurance (e.g., home insurance, rental insurance) that may cover relocation expenses.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-md">
              <RadioGroupItem value="unknown" id="insurance-unknown" />
              <div className="space-y-1.5 flex-1">
                <Label htmlFor="insurance-unknown" className="text-base">
                  I don't know
                </Label>
                <p className="text-sm text-muted-foreground">
                  I am unsure if I have insurance coverage for relocation expenses.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 border rounded-md">
              <RadioGroupItem value="no" id="insurance-no" />
              <div className="space-y-1.5 flex-1">
                <Label htmlFor="insurance-no" className="text-base">
                  No
                </Label>
                <p className="text-sm text-muted-foreground">
                  I do not have insurance coverage for relocation expenses.
                </p>
              </div>
            </div>
          </RadioGroup>
          
          {insuranceErrors.hasInsurance && (
            <p className="text-sm text-red-500 mt-2">
              {insuranceErrors.hasInsurance.message as string}
            </p>
          )}
        </div>

        <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Insurance information helps us coordinate with your provider if applicable. 
            If you're unsure about your coverage, we still encourage you to proceed with the request and select "No".
          </p>
        </div>
      </div>
    </div>
  );
} 