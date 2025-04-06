import { UseFormReturn, FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, UserRound, Home, CloudLightning, Building, Landmark, ChevronDown, ChevronUp, X } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SwissInsuranceDetailsProps {
  form: UseFormReturn<any>;
}

// Common Swiss insurance companies
const SWISS_INSURANCE_COMPANIES = [
  "Zurich Insurance",
  "AXA",
  "Helvetia",
  "Swiss Re",
  "Swiss Life",
  "Basler Versicherungen",
  "Generali",
  "Allianz",
  "Vaudoise Assurances",
  "Baloise",
  "Other"
];

export function SwissInsuranceDetails({ form }: SwissInsuranceDetailsProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const insuranceErrors = errors.swissInsuranceDetails as Record<string, FieldError> || {};
  
  const isOwner = watch("role") === "owner";
  const address = watch("singleDisasterAddress") || {};
  const isVaud = address.canton === "Vaud" || (address.postalCode?.startsWith("1") && address.country === "Switzerland");
  
  // Watch for insurance types
  const hasRCInsurance = watch("swissInsuranceDetails.hasRCInsurance");
  const hasMenageInsurance = watch("swissInsuranceDetails.hasMenageInsurance");
  const hasNaturalDisasterInsurance = watch("swissInsuranceDetails.hasNaturalDisasterInsurance");
  const hasBuildingInsurance = watch("swissInsuranceDetails.hasBuildingInsurance");
  
  // State for tracking if "Other" is selected for each insurance type
  const [showOtherRC, setShowOtherRC] = useState(false);
  const [showOtherMenage, setShowOtherMenage] = useState(false);
  const [showOtherNaturalDisaster, setShowOtherNaturalDisaster] = useState(false);
  const [showOtherBuilding, setShowOtherBuilding] = useState(false);
  
  // Helper functions to handle toggle
  const handleToggleInsurance = (field: string, value: boolean) => {
    setValue(field, value);
  };
  
  // Helper function to handle insurance company selection
  const handleInsuranceCompanyChange = (type: string, value: string) => {
    const field = `swissInsuranceDetails.${type}InsuranceCompany`;
    
    if (value === "Other") {
      setValue(field, "");
      
      // Show the custom input field
      switch (type) {
        case "rc":
          setShowOtherRC(true);
          break;
        case "menage":
          setShowOtherMenage(true);
          break;
        case "naturalDisaster":
          setShowOtherNaturalDisaster(true);
          break;
        case "building":
          setShowOtherBuilding(true);
          break;
      }
    } else {
      setValue(field, value);
      
      // Hide the custom input field
      switch (type) {
        case "rc":
          setShowOtherRC(false);
          break;
        case "menage":
          setShowOtherMenage(false);
          break;
        case "naturalDisaster":
          setShowOtherNaturalDisaster(false);
          break;
        case "building":
          setShowOtherBuilding(false);
          break;
      }
    }
  };
  
  // Helper function to switch back to dropdown
  const switchToDropdown = (type: string) => {
    switch (type) {
      case "rc":
        setShowOtherRC(false);
        break;
      case "menage":
        setShowOtherMenage(false);
        break;
      case "naturalDisaster":
        setShowOtherNaturalDisaster(false);
        break;
      case "building":
        setShowOtherBuilding(false);
        break;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Swiss Insurance Details</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
          Please provide details about your Swiss insurance policies that may cover relocation costs.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Responsabilité Civile (RC) Insurance Card */}
          <div className="relative">
            <div
              className={`group relative flex flex-col p-4 rounded-xl border-2 transition-all duration-200 w-full ${
                hasRCInsurance === true
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => handleToggleInsurance("swissInsuranceDetails.hasRCInsurance", !hasRCInsurance)}
                className="flex flex-col items-center w-full"
                aria-pressed={hasRCInsurance === true}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                  hasRCInsurance === true 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  <UserRound size={32} />
                </div>

                <h3 className="text-base font-medium mb-1">Responsabilité Civile (RC)</h3>
                <p className="text-xs text-center text-muted-foreground">
                  Covers damage you might cause to third parties or their property.
                </p>

                {hasRCInsurance === true && (
                  <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                    <Check size={14} />
                  </div>
                )}

                <input
                  type="checkbox"
                  id="swissInsuranceDetails.hasRCInsurance"
                  checked={hasRCInsurance === true}
                  onChange={(e) => handleToggleInsurance("swissInsuranceDetails.hasRCInsurance", e.target.checked)}
                  className="sr-only"
                />
              </button>

              {/* RC Insurance Details Section - Integrated into the card */}
              {hasRCInsurance && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="swissInsuranceDetails.rcInsuranceCompany" className="text-sm">
                        Insurance Company
                      </Label>
                      {!showOtherRC ? (
                        <Select
                          onValueChange={(value) => handleInsuranceCompanyChange("rc", value)}
                          defaultValue={watch("swissInsuranceDetails.rcInsuranceCompany") || ""}
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Select insurance company" />
                          </SelectTrigger>
                          <SelectContent>
                            {SWISS_INSURANCE_COMPANIES.map((company) => (
                              <SelectItem key={company} value={company}>
                                {company}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            id="swissInsuranceDetails.rcInsuranceCompany"
                            {...register("swissInsuranceDetails.rcInsuranceCompany")}
                            placeholder="Enter company name"
                            className="h-8 text-sm"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            className="h-8 px-2"
                            onClick={() => switchToDropdown("rc")}
                            title="Switch back to dropdown"
                          >
                            <X size={16} className="text-red-500" />
                          </Button>
                        </div>
                      )}
                      {insuranceErrors.rcInsuranceCompany && (
                        <p className="text-xs text-red-500">
                          {insuranceErrors.rcInsuranceCompany.message as string}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="swissInsuranceDetails.rcPolicyNumber" className="text-sm">
                        Policy Number
                      </Label>
                      <Input
                        id="swissInsuranceDetails.rcPolicyNumber"
                        {...register("swissInsuranceDetails.rcPolicyNumber")}
                        placeholder="e.g., RC123456"
                        className="h-8 text-sm"
                      />
                      {insuranceErrors.rcPolicyNumber && (
                        <p className="text-xs text-red-500">
                          {insuranceErrors.rcPolicyNumber.message as string}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    <Label htmlFor="swissInsuranceDetails.rcContactPerson" className="text-sm">
                      Contact details (Optional)
                    </Label>
                    <Input
                      id="swissInsuranceDetails.rcContactPerson"
                      {...register("swissInsuranceDetails.rcContactPerson")}
                      placeholder="Name and contact details"
                      className="h-8 text-sm"
                    />
                    {insuranceErrors.rcContactPerson && (
                      <p className="text-xs text-red-500">
                        {insuranceErrors.rcContactPerson.message as string}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Assurance Ménage (Household Insurance) Card */}
          <div className="relative">
            <div
              className={`group relative flex flex-col p-4 rounded-xl border-2 transition-all duration-200 w-full ${
                hasMenageInsurance === true
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => handleToggleInsurance("swissInsuranceDetails.hasMenageInsurance", !hasMenageInsurance)}
                className="flex flex-col items-center w-full"
                aria-pressed={hasMenageInsurance === true}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                  hasMenageInsurance === true 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  <Home size={32} />
                </div>

                <h3 className="text-base font-medium mb-1">Assurance Ménage</h3>
                <p className="text-xs text-center text-muted-foreground">
                  Covers your personal belongings against damage, theft, and other risks.
                </p>

                {hasMenageInsurance === true && (
                  <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                    <Check size={16} />
                  </div>
                )}

                <input
                  type="checkbox"
                  id="swissInsuranceDetails.hasMenageInsurance"
                  checked={hasMenageInsurance === true}
                  onChange={(e) => handleToggleInsurance("swissInsuranceDetails.hasMenageInsurance", e.target.checked)}
                  className="sr-only"
                />
              </button>

              {/* Assurance Ménage Insurance Details Section - Integrated into the card */}
              {hasMenageInsurance && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="swissInsuranceDetails.menageInsuranceCompany" className="text-sm">
                        Insurance Company
                      </Label>
                      {!showOtherMenage ? (
                        <Select
                          onValueChange={(value) => handleInsuranceCompanyChange("menage", value)}
                          defaultValue={watch("swissInsuranceDetails.menageInsuranceCompany") || ""}
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Select insurance company" />
                          </SelectTrigger>
                          <SelectContent>
                            {SWISS_INSURANCE_COMPANIES.map((company) => (
                              <SelectItem key={company} value={company}>
                                {company}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            id="swissInsuranceDetails.menageInsuranceCompany"
                            {...register("swissInsuranceDetails.menageInsuranceCompany")}
                            placeholder="Enter company name"
                            className="h-8 text-sm"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            className="h-8 px-2"
                            onClick={() => switchToDropdown("menage")}
                            title="Switch back to dropdown"
                          >
                            <X size={16} className="text-red-500" />
                          </Button>
                        </div>
                      )}
                      {insuranceErrors.menageInsuranceCompany && (
                        <p className="text-xs text-red-500">
                          {insuranceErrors.menageInsuranceCompany.message as string}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="swissInsuranceDetails.menagePolicyNumber" className="text-sm">
                        Policy Number
                      </Label>
                      <Input
                        id="swissInsuranceDetails.menagePolicyNumber"
                        {...register("swissInsuranceDetails.menagePolicyNumber")}
                        placeholder="e.g., MEN123456"
                        className="h-8 text-sm"
                      />
                      {insuranceErrors.menagePolicyNumber && (
                        <p className="text-xs text-red-500">
                          {insuranceErrors.menagePolicyNumber.message as string}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    <Label htmlFor="swissInsuranceDetails.menageContactPerson" className="text-sm">
                      Contact details (Optional)
                    </Label>
                    <Input
                      id="swissInsuranceDetails.menageContactPerson"
                      {...register("swissInsuranceDetails.menageContactPerson")}
                      placeholder="Name and contact details"
                      className="h-8 text-sm"
                    />
                    {insuranceErrors.menageContactPerson && (
                      <p className="text-xs text-red-500">
                        {insuranceErrors.menageContactPerson.message as string}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Natural Disaster Insurance Card */}
          <div className="relative">
            <div
              className={`group relative flex flex-col p-4 rounded-xl border-2 transition-all duration-200 w-full ${
                hasNaturalDisasterInsurance === true
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => handleToggleInsurance("swissInsuranceDetails.hasNaturalDisasterInsurance", !hasNaturalDisasterInsurance)}
                className="flex flex-col items-center w-full"
                aria-pressed={hasNaturalDisasterInsurance === true}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                  hasNaturalDisasterInsurance === true 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  <CloudLightning size={32} />
                </div>

                <h3 className="text-base font-medium mb-1">Natural Disaster Insurance</h3>
                <p className="text-xs text-center text-muted-foreground">
                  For damages caused by natural disasters like floods, storms, or landslides.
                </p>

                {hasNaturalDisasterInsurance === true && (
                  <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                    <Check size={16} />
                  </div>
                )}

                <input
                  type="checkbox"
                  id="swissInsuranceDetails.hasNaturalDisasterInsurance"
                  checked={hasNaturalDisasterInsurance === true}
                  onChange={(e) => handleToggleInsurance("swissInsuranceDetails.hasNaturalDisasterInsurance", e.target.checked)}
                  className="sr-only"
                />
              </button>

              {/* Natural Disaster Insurance Details Section - Integrated into the card */}
              {hasNaturalDisasterInsurance && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="swissInsuranceDetails.naturalDisasterInsuranceCompany" className="text-sm">
                        Insurance Company
                      </Label>
                      {!showOtherNaturalDisaster ? (
                        <Select
                          onValueChange={(value) => handleInsuranceCompanyChange("naturalDisaster", value)}
                          defaultValue={watch("swissInsuranceDetails.naturalDisasterInsuranceCompany") || ""}
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Select insurance company" />
                          </SelectTrigger>
                          <SelectContent>
                            {SWISS_INSURANCE_COMPANIES.map((company) => (
                              <SelectItem key={company} value={company}>
                                {company}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            id="swissInsuranceDetails.naturalDisasterInsuranceCompany"
                            {...register("swissInsuranceDetails.naturalDisasterInsuranceCompany")}
                            placeholder="Enter company name"
                            className="h-8 text-sm"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            className="h-8 px-2"
                            onClick={() => switchToDropdown("naturalDisaster")}
                            title="Switch back to dropdown"
                          >
                            <X size={16} className="text-red-500" />
                          </Button>
                        </div>
                      )}
                      {insuranceErrors.naturalDisasterInsuranceCompany && (
                        <p className="text-xs text-red-500">
                          {insuranceErrors.naturalDisasterInsuranceCompany.message as string}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="swissInsuranceDetails.naturalDisasterPolicyNumber" className="text-sm">
                        Policy Number
                      </Label>
                      <Input
                        id="swissInsuranceDetails.naturalDisasterPolicyNumber"
                        {...register("swissInsuranceDetails.naturalDisasterPolicyNumber")}
                        placeholder="e.g., ND123456"
                        className="h-8 text-sm"
                      />
                      {insuranceErrors.naturalDisasterPolicyNumber && (
                        <p className="text-xs text-red-500">
                          {insuranceErrors.naturalDisasterPolicyNumber.message as string}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    <Label htmlFor="swissInsuranceDetails.naturalDisasterContactPerson" className="text-sm">
                      Contact details (Optional)
                    </Label>
                    <Input
                      id="swissInsuranceDetails.naturalDisasterContactPerson"
                      {...register("swissInsuranceDetails.naturalDisasterContactPerson")}
                      placeholder="Name and contact details"
                      className="h-8 text-sm"
                    />
                    {insuranceErrors.naturalDisasterContactPerson && (
                      <p className="text-xs text-red-500">
                        {insuranceErrors.naturalDisasterContactPerson.message as string}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Building Insurance Card (only for owners) */}
          {isOwner && (
            <div className="relative">
              <div
                className={`group relative flex flex-col p-4 rounded-xl border-2 transition-all duration-200 w-full ${
                  hasBuildingInsurance === true
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggleInsurance("swissInsuranceDetails.hasBuildingInsurance", !hasBuildingInsurance)}
                  className="flex flex-col items-center w-full"
                  aria-pressed={hasBuildingInsurance === true}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                    hasBuildingInsurance === true 
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  }`}>
                    <Building size={32} />
                  </div>

                  <h3 className="text-base font-medium mb-1">Building Insurance</h3>
                  <p className="text-xs text-center text-muted-foreground">
                    As a property owner, this insurance covers damages to the building structure.
                  </p>

                  {hasBuildingInsurance === true && (
                    <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                      <Check size={16} />
                    </div>
                  )}

                  <input
                    type="checkbox"
                    id="swissInsuranceDetails.hasBuildingInsurance"
                    checked={hasBuildingInsurance === true}
                    onChange={(e) => handleToggleInsurance("swissInsuranceDetails.hasBuildingInsurance", e.target.checked)}
                    className="sr-only"
                  />
                </button>

                {/* Building Insurance Details Section - Integrated into the card */}
                {hasBuildingInsurance && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="swissInsuranceDetails.buildingInsuranceCompany" className="text-sm">
                          Insurance Company
                        </Label>
                        {!showOtherBuilding ? (
                          <Select
                            onValueChange={(value) => handleInsuranceCompanyChange("building", value)}
                            defaultValue={watch("swissInsuranceDetails.buildingInsuranceCompany") || ""}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue placeholder="Select insurance company" />
                            </SelectTrigger>
                            <SelectContent>
                              {SWISS_INSURANCE_COMPANIES.map((company) => (
                                <SelectItem key={company} value={company}>
                                  {company}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="flex gap-2">
                            <Input
                              id="swissInsuranceDetails.buildingInsuranceCompany"
                              {...register("swissInsuranceDetails.buildingInsuranceCompany")}
                              placeholder="Enter company name"
                              className="h-8 text-sm"
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              className="h-8 px-2"
                              onClick={() => switchToDropdown("building")}
                              title="Switch back to dropdown"
                            >
                              <X size={16} className="text-red-500" />
                            </Button>
                          </div>
                        )}
                        {insuranceErrors.buildingInsuranceCompany && (
                          <p className="text-xs text-red-500">
                            {insuranceErrors.buildingInsuranceCompany.message as string}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="swissInsuranceDetails.buildingPolicyNumber" className="text-sm">
                          Policy Number
                        </Label>
                        <Input
                          id="swissInsuranceDetails.buildingPolicyNumber"
                          {...register("swissInsuranceDetails.buildingPolicyNumber")}
                          placeholder="e.g., BLD123456"
                          className="h-8 text-sm"
                        />
                        {insuranceErrors.buildingPolicyNumber && (
                          <p className="text-xs text-red-500">
                            {insuranceErrors.buildingPolicyNumber.message as string}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-1">
                      <Label htmlFor="swissInsuranceDetails.buildingContactPerson" className="text-sm">
                        Contact details (Optional)
                      </Label>
                      <Input
                        id="swissInsuranceDetails.buildingContactPerson"
                        {...register("swissInsuranceDetails.buildingContactPerson")}
                        placeholder="Name and contact details"
                        className="h-8 text-sm"
                      />
                      {insuranceErrors.buildingContactPerson && (
                        <p className="text-xs text-red-500">
                          {insuranceErrors.buildingContactPerson.message as string}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ECA Insurance Section (only for Canton de Vaud) */}
        {isVaud && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-amber-50 text-card-foreground shadow-sm">
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Landmark size={32} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">ECA Insurance (Canton de Vaud)</h3>
                    <p className="text-xs text-muted-foreground">
                      Mandatory insurance against fire and natural disasters in some cantons.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <Label htmlFor="swissInsuranceDetails.ecaPolicyNumber" className="text-sm whitespace-nowrap">
                      ECA Policy Number
                    </Label>
                    <Input
                      id="swissInsuranceDetails.ecaPolicyNumber"
                      {...register("swissInsuranceDetails.ecaPolicyNumber")}
                      placeholder="e.g., ECA123456"
                      className="h-8 text-sm w-1/2 min-w-[120px]"
                    />
                  </div>
                  {insuranceErrors.ecaPolicyNumber && (
                    <p className="text-xs text-red-500">
                      {insuranceErrors.ecaPolicyNumber.message as string}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    You can find this number on your ECA insurance documents or by contacting ECA directly.
                  </p>
                </div>
              </div>
            </div>
            <div></div> {/* Empty div to maintain grid layout */}
          </div>
        )}

        {/* Additional Insurance Information */}
        <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="additional-info" className="border-0">
              <AccordionTrigger className="px-4 py-3 text-sm font-medium">
                Additional Insurance Information
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="swissInsuranceDetails.agentContact" className="text-sm">
                      Insurance Agent Contact (Optional)
                    </Label>
                    <Input
                      id="swissInsuranceDetails.agentContact"
                      {...register("swissInsuranceDetails.agentContact")}
                      placeholder="Name and contact details of your insurance agent"
                      className="h-8 text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      If you have a specific agent handling your insurance, providing their details can help expedite the process.
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="swissInsuranceDetails.additionalNotes" className="text-sm">
                      Additional Notes (Optional)
                    </Label>
                    <textarea
                      id="swissInsuranceDetails.additionalNotes"
                      {...register("swissInsuranceDetails.additionalNotes")}
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Any additional information about your insurance coverage"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-sm text-blue-700">
            <strong>Important:</strong> We may need to verify your insurance coverage with your providers. By providing 
            this information, you authorize us to contact your insurance companies regarding your relocation claim.
            If you're unsure about any details, you can leave them blank and our team will assist you.
          </p>
        </div>
      </div>
    </div>
  );
} 