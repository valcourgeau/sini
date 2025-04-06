import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { FieldError } from "react-hook-form";
import { Check, ShieldCheck, ShieldQuestion, ShieldX } from "lucide-react";

interface SingleInsuranceCoverageProps {
  form: UseFormReturn<any>;
}

export function SingleInsuranceCoverage({ form }: SingleInsuranceCoverageProps) {
  const { setValue, watch, formState: { errors } } = form;
  const insuranceErrors = errors.singleInsuranceCoverage as Record<string, FieldError> || {};
  
  // Get the current value to set the default
  const hasInsurance = watch("singleInsuranceCoverage.hasInsurance");
  let selectedValue = "unknown";
  
  if (hasInsurance === true) selectedValue = "yes";
  else if (hasInsurance === false) selectedValue = "no";
  
  const handleSelection = (value: string) => {
    if (value === "yes") {
      setValue("singleInsuranceCoverage.hasInsurance", true);
    } else if (value === "no") {
      setValue("singleInsuranceCoverage.hasInsurance", false);
    } else {
      setValue("singleInsuranceCoverage.hasInsurance", null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Insurance Coverage</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Please indicate whether you have insurance that may cover your relocation expenses.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Do you have insurance that covers relocation due to the disaster?</Label>
          
          <RadioGroup 
            value={selectedValue}
            onValueChange={handleSelection}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => handleSelection("yes")}
                className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 w-full ${
                  selectedValue === "yes"
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
                aria-pressed={selectedValue === "yes"}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
                  selectedValue === "yes" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  <ShieldCheck size={32} />
                </div>

                <h3 className="text-lg font-medium mb-1">Yes</h3>
                {/* <p className="text-sm text-center text-muted-foreground">
                  e.g. Home or rental insurance may cover relocation expenses.
                </p> */}

                {selectedValue === "yes" && (
                  <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                    <Check size={16} />
                  </div>
                )}

                <input
                  type="radio"
                  name="singleInsuranceCoverage.hasInsurance"
                  value="yes"
                  checked={selectedValue === "yes"}
                  onChange={() => handleSelection("yes")}
                  className="sr-only"
                  id="insurance-yes"
                />
              </button>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => handleSelection("unknown")}
                className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 w-full ${
                  selectedValue === "unknown"
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
                aria-pressed={selectedValue === "unknown"}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
                  selectedValue === "unknown" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  <ShieldQuestion size={32} />
                </div>

                <h3 className="text-lg font-medium mb-1">I don't know</h3>
                {/* <p className="text-sm text-center text-muted-foreground">
                  I am unsure if I have insurance coverage for relocation expenses.
                </p> */}

                {selectedValue === "unknown" && (
                  <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                    <Check size={16} />
                  </div>
                )}

                <input
                  type="radio"
                  name="singleInsuranceCoverage.hasInsurance"
                  value="unknown"
                  checked={selectedValue === "unknown"}
                  onChange={() => handleSelection("unknown")}
                  className="sr-only"
                  id="insurance-unknown"
                />
              </button>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => handleSelection("no")}
                className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 w-full ${
                  selectedValue === "no"
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
                aria-pressed={selectedValue === "no"}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
                  selectedValue === "no" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  <ShieldX size={32} />
                </div>

                <h3 className="text-lg font-medium mb-1">No</h3>
                {/* <p className="text-sm text-center text-muted-foreground">
                  I do not have insurance coverage for relocation expenses.
                </p> */}

                {selectedValue === "no" && (
                  <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                    <Check size={16} />
                  </div>
                )}

                <input
                  type="radio"
                  name="singleInsuranceCoverage.hasInsurance"
                  value="no"
                  checked={selectedValue === "no"}
                  onChange={() => handleSelection("no")}
                  className="sr-only"
                  id="insurance-no"
                />
              </button>
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
            If you're unsure about your coverage, select "I don't know" and we'll help you identify potential coverage options.
          </p>
        </div>
      </div>
    </div>
  );
} 