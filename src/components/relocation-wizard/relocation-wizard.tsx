"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RelocationTypeSelection } from "./steps/relocation-type-selection";
import { SingleRelocationPreferences } from "./steps/single-relocation-preferences";
import { SingleArrivalDetails } from "./steps/single-arrival-details";
import { SingleInsuranceCoverage } from "./steps/single-insurance-coverage";
import { SingleInsuranceDetails } from "./steps/single-insurance-details";
import { SingleReviewConfirm } from "./steps/single-review-confirm";
import { SingleConsent } from "./steps/single-consent";
import { MultipleDisasterAddress } from "./steps/multiple-disaster-address";
import { MultipleRelocationRequests } from "./steps/multiple-relocation-requests";
import { MultipleReviewConfirm } from "./steps/multiple-review-confirm";
import { MultipleConsent } from "./steps/multiple-consent";
import { SuccessMessage } from "./steps/success-message";
import { SwissInsuranceDetails } from "./steps/swiss-insurance-details";
import { UseFormReturn } from "react-hook-form";
import { SingleAddressAndContact } from "./steps/single-address-and-contact";
import { cn } from "@/lib/utils";

// Define the form schema using Zod
const formSchema = z.object({
  // Step 1: Relocation Type
  relocationType: z.enum(["single", "multiple"]),

  // Single Relocation path
  singleDisasterAddress: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(4, "Valid postal code is required"),
    country: z.string().min(1, "Country is required"),
    canton: z.string().optional(),
  }).optional(),

  singleRelocationPreferences: z.object({
    bedrooms: z.number().min(0, "Number of bedrooms must be positive"),
    bathrooms: z.number().min(0, "Number of bathrooms must be positive"),
    adults: z.number().min(1, "At least one adult is required"),
    children: z.number().min(0, "Number of children must be positive"),
    hasAnimals: z.boolean().optional(),
    hasAccessibilityNeeds: z.boolean().optional(),
    needsParking: z.boolean().optional(),
  }).optional(),

  singleArrivalDetails: z.object({
    arrivalDate: z.string().min(1, "Arrival date is required"),
    departureDate: z.string().optional(),
    useExactDates: z.boolean().default(false),
    estimatedDuration: z.string().min(1, "Estimated duration is required"),
  }).optional(),

  singlePersonalData: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(10, "Valid phone number is required"),
  }).optional(),

  singleInsuranceCoverage: z.object({
    hasInsurance: z.boolean(),
    claimDocument: z.instanceof(File).optional(),
  }).optional(),

  singleInsuranceDetails: z.object({
    insuranceCompany: z.string().min(1, "Insurance company is required"),
    policyNumber: z.string().min(1, "Policy number is required"),
    agentContact: z.string().optional(),
  }).optional(),

  swissInsuranceDetails: z.object({
    // RC Insurance
    hasRCInsurance: z.boolean().optional(),
    rcInsuranceCompany: z.string().optional(),
    rcPolicyNumber: z.string().optional(),
    
    // Ménage Insurance
    hasMenageInsurance: z.boolean().optional(),
    menageInsuranceCompany: z.string().optional(),
    menagePolicyNumber: z.string().optional(),
    
    // Natural Disaster Insurance
    hasNaturalDisasterInsurance: z.boolean().optional(),
    naturalDisasterInsuranceCompany: z.string().optional(),
    naturalDisasterPolicyNumber: z.string().optional(),
    
    // Building Insurance (for owners)
    hasBuildingInsurance: z.boolean().optional(),
    buildingInsuranceCompany: z.string().optional(),
    buildingPolicyNumber: z.string().optional(),
    
    // ECA Insurance (for Canton de Vaud)
    ecaPolicyNumber: z.string().optional(),
    
    // Additional Information
    agentContact: z.string().optional(),
    additionalNotes: z.string().optional(),
  }).optional(),

  singleConsent: z.object({
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: "You must agree to the terms to continue",
    }),
    agreeToDataProcessing: z.boolean().refine(val => val === true, {
      message: "You must agree to data processing to continue",
    }),
  }).optional(),

  // Multiple Relocation path
  multipleDisasterAddress: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(4, "Valid postal code is required"),
    country: z.string().min(1, "Country is required"),
  }).optional(),

  multipleRelocationRequests: z.array(z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    specialNeeds: z.string().optional(),
    arrivalDate: z.string().optional(),
    estimatedDuration: z.string().optional(),
    hasInsurance: z.boolean().optional(),
    insuranceDetails: z.string().optional(),
    claimDocument: z.instanceof(File).optional(),
    hasUploadedClaim: z.boolean().optional(),
  })).optional(),

  multipleConsent: z.object({
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: "You must agree to the terms to continue",
    }),
    agreeToDataProcessing: z.boolean().refine(val => val === true, {
      message: "You must agree to data processing to continue",
    }),
  }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RelocationWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  // Add debugging for isSubmitted state changes
  useEffect(() => {
    console.log("isSubmitted state changed:", isSubmitted);
  }, [isSubmitted]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relocationType: typeParam === "single" ? "single" : undefined,
    },
  });

  // If type is single, start at step 2 (insurance coverage)
  useEffect(() => {
    if (typeParam === "single") {
      setStep(2);
    }
  }, [typeParam]);

  // Calculate total steps based on the selected path
  const getTotalSteps = () => {
    const relocationType = form.watch("relocationType");
    
    if (!relocationType) return 8; // Default steps until relocation type selection
    
    return relocationType === "single" ? 8 : 6; // Single: 8 steps (reduced from 9), Multiple: 6 steps
  };

  const totalSteps = getTotalSteps();
  
  // Calculate progress percentage
  const progressPercentage = (step / totalSteps) * 100;

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const onSubmit = async (data: FormValues) => {
    console.log("onSubmit called with data:", data);
    return data;
  };

  // Determine which step component to render
  const renderStep = () => {
    const relocationType = form.watch("relocationType");
    const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;

    switch (step) {
      case 1:
        return <RelocationTypeSelection form={form} />;
      case 2:
        // Branch based on relocation type
        if (relocationType === "single") {
          return <SingleInsuranceCoverage form={form} />;
        } else if (relocationType === "multiple") {
          return <MultipleDisasterAddress form={form} />;
        }
        break;
      case 3:
        if (relocationType === "single") {
          // Show insurance details only if they have insurance
          if (hasInsurance) {
            return <SingleInsuranceDetails form={form} />;
          } else {
            return <SingleAddressAndContact form={form} />;
          }
        } else if (relocationType === "multiple") {
          return <MultipleRelocationRequests form={form} />;
        }
        break;
      case 4:
        if (relocationType === "single") {
          if (hasInsurance) {
            return <SingleAddressAndContact form={form} />;
          } else {
            return <SingleRelocationPreferences form={form} />;
          }
        } else if (relocationType === "multiple") {
          return <MultipleReviewConfirm form={form} />;
        }
        break;
      case 5:
        if (relocationType === "single") {
          if (hasInsurance) {
            return <SingleRelocationPreferences form={form} />;
          } else {
            return <SingleArrivalDetails form={form} />;
          }
        } else if (relocationType === "multiple") {
          return <MultipleConsent form={form} onSubmit={handleSubmit} isSubmitting={isSubmitting} onBack={prevStep} />;
        }
        break;
      case 6:
        if (relocationType === "single") {
          if (hasInsurance) {
            return <SingleArrivalDetails form={form} />;
          } else {
            return <SingleReviewConfirm form={form} />;
          }
        } else if (relocationType === "multiple") {
          return <SuccessMessage />;
        }
        break;
      case 7:
        if (relocationType === "single") {
          if (hasInsurance) {
            return <SingleReviewConfirm form={form} />;
          } else {
            return <SingleConsent form={form} onSubmit={handleSubmit} isSubmitting={isSubmitting} onBack={prevStep} />;
          }
        }
        break;
      case 8:
        if (relocationType === "single") {
          if (hasInsurance) {
            return <SingleConsent form={form} onSubmit={handleSubmit} isSubmitting={isSubmitting} onBack={prevStep} />;
          } else {
            return <SuccessMessage />;
          }
        }
        break;
      case 9:
        if (relocationType === "single") {
          return <SuccessMessage />;
        }
        break;
      default:
        return null;
    }
  };

  // Handle conditional button logic
  const renderNavigationButtons = () => {
    const relocationType = form.watch("relocationType");
    const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;
    
    const isFinalStep = 
      (relocationType === "single" && ((hasInsurance && step === 9) || (!hasInsurance && step === 8))) ||
      (relocationType === "multiple" && step === 5);
    
    // Don't show navigation buttons on the final step or consent step
    if (isFinalStep || (relocationType === "single" && ((hasInsurance && step === 8) || (!hasInsurance && step === 7)))) {
      return null;
    }
      
    return (
      <CardFooter className="flex justify-between pt-4 pb-6">
        <div>
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              className="px-6 py-2 h-auto"
            >
              Back
            </Button>
          )}
        </div>
        
        <div>
          <Button 
            type="button" 
            onClick={nextStep}
            className="px-8 py-2 h-auto bg-primary hover:bg-primary/90"
          >
            {step === 1 ? "Start" : "Next"}
          </Button>
        </div>
      </CardFooter>
    );
  };

  // Direct form submission handler
  const handleSubmit = async () => {
    console.log("Submit button clicked");
    setIsSubmitting(true);
    
    try {
      // Get form data
      const formData = form.getValues();
      console.log("Form data:", formData);
      
      // Simulate API call
      console.log("Starting simulated API call");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted successfully");
      setIsSubmitting(false);
      console.log("Setting isSubmitted to true");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  // Use wider container (max-w-7xl) only for the multiple relocation requests table
  // to accommodate the larger table layout, while keeping other steps at max-w-5xl
  // 
  // Conditions for wider container:
  // - step === 3: This is the step where we show the multiple relocation requests table
  // - relocationType === "multiple": Only applies to the multiple relocation flow
  const shouldUseWiderContainer = form.watch("relocationType") === "multiple" && step === 3;

  return (
    <div className={cn(
      "container mx-auto py-8 px-4 md:px-0 bg-sand/50",
      shouldUseWiderContainer ? "max-w-9xl" : "max-w-5xl"
    )}>
      <Card className="border-2 shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold text-center">Demande d'assistance au relogement</CardTitle>
          <CardDescription className="text-center text-base">
            Veuillez remplir ce formulaire pour demander une assistance au relogement.
          </CardDescription>
          <div className="mt-12">
            <Progress value={progressPercentage} className="h-2.5" />
            <p className="text-sm text-right mt-2 text-muted-foreground">
              Étape {step} sur {totalSteps}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="pb-8">
          <form>
            {renderStep()}
          </form>
        </CardContent>
        
        {renderNavigationButtons()}
      </Card>
    </div>
  );
} 