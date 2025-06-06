import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { FieldError } from "react-hook-form";
import { Check, ShieldCheck, ShieldX, Upload, ExternalLink } from "lucide-react";
import { InfoBox } from "@/components/ui/info-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SingleInsuranceCoverageProps {
  form: UseFormReturn<any>;
}

// Insurance providers with their claim submission URLs
const INSURANCE_PROVIDERS = [
  {
    name: "Helvetia",
    url: "https://www.helvetia.com/ch/web/en/private-customers/contact/report-claim.html",
    fallbackUrl: "https://www.helvetia.com/ch/",
  },
  {
    name: "Swiss Life",
    url: "https://www.swisslife.fr/home/Landing/MySwissLife/Premiers-pas-sur-MySwissLife/mon-foyer.html",
    fallbackUrl: "https://www.swisslife.ch/fr/",
  },
  {
    name: "Baloise",
    url: "https://www.baloise.ch/fr/clients-prives/contact-services/sinistre.html",
    fallbackUrl: "https://www.baloise.ch/fr/",
  },
  {
    name: "CSS",
    url: "https://www.css.ch/en/private-customers/quick-easy.html",
    fallbackUrl: "https://www.css.ch/",
  },
  {
    name: "Vaudoise Assurances",
    url: "https://www.vaudoise.ch/fr/service-center/declarer-un-sinistre",
    fallbackUrl: "https://www.vaudoise.ch/fr/",
  },
  {
    name: "Other",
    url: "",
    fallbackUrl: "",
  },
];

export function SingleInsuranceCoverage({ form }: SingleInsuranceCoverageProps) {
  const { setValue, watch, register, formState: { errors } } = form;
  const insuranceErrors = errors.singleInsuranceCoverage as Record<string, FieldError> || {};
  
  // Get the current value to set the default
  const hasInsurance = watch("singleInsuranceCoverage.hasInsurance");
  let selectedValue = "no";
  
  if (hasInsurance === true) selectedValue = "yes";
  else if (hasInsurance === false) selectedValue = "no";

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  
  const handleSelection = (value: string) => {
    if (value === "yes") {
      setValue("singleInsuranceCoverage.hasInsurance", true);
    } else if (value === "no") {
      setValue("singleInsuranceCoverage.hasInsurance", false);
      // Clear the file and upload status when switching to "no"
      setSelectedFile(null);
      setValue("singleInsuranceCoverage.claimDocument", undefined);
      setValue("singleInsuranceCoverage.hasUploadedClaim", false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("singleInsuranceCoverage.claimDocument", file);
      setValue("singleInsuranceCoverage.hasUploadedClaim", true);
    }
  };

  const handleInsuranceWebsiteRedirect = () => {
    const provider = INSURANCE_PROVIDERS.find(p => p.name === selectedProvider);
    if (provider) {
      // Try to open the claims page first, if it fails, open the fallback URL
      const claimsWindow = window.open(provider.url, "_blank");
      if (!claimsWindow || claimsWindow.closed || typeof claimsWindow.closed === 'undefined') {
        window.open(provider.fallbackUrl, "_blank");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Insurance Claim Document</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
          Please upload your insurance claim document ("Déclaration de Sinistre").
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Do you have your insurance claim document?</Label>
          
          <RadioGroup 
            value={selectedValue}
            onValueChange={handleSelection}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="relative">
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleSelection("yes")}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelection("yes");
                  }
                }}
                className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 w-full cursor-pointer ${
                  selectedValue === "yes"
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
                  selectedValue === "yes" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  <ShieldCheck size={32} />
                </div>

                <h3 className="text-lg font-medium mb-1">Yes, I have it</h3>

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

                {selectedValue === "yes" && (
                  <div className="mt-4 pt-4 border-t border-border w-full">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="claim-document"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, DOC, or DOCX (MAX. 10MB)</p>
                        </div>
                        <input
                          id="claim-document"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    {selectedFile && (
                      <p className="mt-2 text-sm text-gray-500 text-center">
                        Selected file: {selectedFile.name}
                      </p>
                    )}
                    {insuranceErrors.claimDocument && (
                      <p className="mt-2 text-sm text-red-500 text-center">
                        {insuranceErrors.claimDocument.message as string}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleSelection("no")}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelection("no");
                  }
                }}
                className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 w-full cursor-pointer ${
                  selectedValue === "no"
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
                  selectedValue === "no" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  <ShieldX size={32} />
                </div>

                <h3 className="text-lg font-medium mb-1">No, not yet.</h3>

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

                {selectedValue === "no" && (
                  <div className="mt-4 pt-4 border-t border-border w-full text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Please submit your claim through your insurance provider and return with the claim document.
                    </p>
                    
                    {selectedProvider === "Other" && (
                      <p className="text-sm text-muted-foreground">
                        Please contact your insurance provider directly to submit your claim.
                      </p>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {INSURANCE_PROVIDERS.filter(provider => provider.name !== "Other").map((provider) => (
                          <a
                            key={provider.name}
                            href={provider.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {provider.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RadioGroup>
          
          {insuranceErrors.hasInsurance && (
            <p className="text-sm text-red-500 mt-2">
              {insuranceErrors.hasInsurance.message as string}
            </p>
          )}
        </div>

        <InfoBox className="mt-6">
          The insurance claim document is required to process your relocation request. If you don't have it yet, please submit a claim through your insurance provider and return with the document.
        </InfoBox>
      </div>
    </div>
  );
} 