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
  relocationType: z.enum(["single", "multiple"], {
    required_error: "Veuillez sélectionner une option pour continuer",
    invalid_type_error: "Veuillez sélectionner une option pour continuer"
  }),

  // Single Relocation path
  singleDisasterAddress: z.object({
    street: z.string().min(1, "La rue est requise"),
    city: z.string().min(1, "La ville est requise"),
    postalCode: z.string().min(4, "Un code postal valide est requis"),
    country: z.string().min(1, "Le pays est requis"),
    canton: z.string().optional(),
  }).optional(),

  singleRelocationPreferences: z.object({
    bedrooms: z.number().min(0, "Le nombre de chambres doit être positif"),
    bathrooms: z.number().min(0, "Le nombre de salles de bain doit être positif"),
    adults: z.number().min(1, "Au moins un adulte est requis"),
    children: z.number().min(0, "Le nombre d'enfants doit être positif"),
    hasAnimals: z.boolean().optional(),
    hasAccessibilityNeeds: z.boolean().optional(),
    needsParking: z.boolean().optional(),
  }).optional(),

  singleArrivalDetails: z.object({
    arrivalDate: z.string().min(1, "La date d'arrivée est requise"),
    departureDate: z.string().optional(),
    useExactDates: z.boolean().default(false),
    estimatedDuration: z.string().min(1, "La durée estimée est requise"),
  }).optional(),

  singlePersonalData: z.object({
    firstName: z.string().min(1, "Le prénom est requis"),
    lastName: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Un email valide est requis"),
    phone: z.string().min(10, "Un numéro de téléphone valide est requis"),
  }).optional(),

  singleInsuranceCoverage: z.object({
    hasInsurance: z.boolean({
      required_error: "Veuillez sélectionner une option pour continuer",
      invalid_type_error: "Veuillez sélectionner une option pour continuer"
    }),
    claimDocument: z.instanceof(File).optional(),
  }).refine((data) => {
    // User must select "yes" AND upload a document to proceed
    if (data.hasInsurance === true) {
      return data.claimDocument !== undefined;
    }
    return false; // If they select "no", they cannot proceed
  }, {
    message: "Veuillez vous procurer la déclaration de sinistre et la télécharger pour continuer",
    path: ["claimDocument"]
  }).optional(),

  singleInsuranceDetails: z.object({
    insuranceCompany: z.string().min(1, "La compagnie d'assurance est requise"),
    policyNumber: z.string().min(1, "Le numéro de police est requis"),
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
      message: "Vous devez accepter les conditions pour continuer",
    }),
    agreeToDataProcessing: z.boolean().refine(val => val === true, {
      message: "Vous devez accepter le traitement des données pour continuer",
    }),
  }).optional(),

  // Multiple Relocation path
  multipleDisasterAddress: z.object({
    street: z.string().min(1, "La rue est requise"),
    city: z.string().min(1, "La ville est requise"),
    postalCode: z.string().min(4, "Un code postal valide est requis"),
    country: z.string().min(1, "Le pays est requis"),
  }).optional(),

  multipleRelocationRequests: z.array(z.object({
    firstName: z.string().min(1, "Le prénom est requis"),
    lastName: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Un email valide est requis"),
    phone: z.string().min(10, "Un numéro de téléphone valide est requis"),
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
      message: "Vous devez accepter les conditions pour continuer",
    }),
    agreeToDataProcessing: z.boolean().refine(val => val === true, {
      message: "Vous devez accepter le traitement des données pour continuer",
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

  const nextStep = async () => {
    // Validate current step before proceeding
    let isValid = false;
    
    switch (step) {
      case 1:
        // Validate relocation type selection
        isValid = await form.trigger("relocationType");
        break;
      case 2:
        // Validate insurance coverage step
        if (form.watch("relocationType") === "single") {
          isValid = await form.trigger("singleInsuranceCoverage");
        } else {
          isValid = await form.trigger("multipleDisasterAddress");
        }
        break;
      case 3:
        // Validate step 3 based on path
        if (form.watch("relocationType") === "single") {
          const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;
          if (hasInsurance) {
            isValid = await form.trigger("singleInsuranceDetails");
          } else {
            isValid = await form.trigger("singlePersonalData");
          }
        } else {
          isValid = await form.trigger("multipleRelocationRequests");
        }
        break;
      case 4:
        // Validate step 4 based on path
        if (form.watch("relocationType") === "single") {
          const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;
          if (hasInsurance) {
            isValid = await form.trigger("singlePersonalData");
          } else {
            isValid = await form.trigger("singleRelocationPreferences");
          }
        } else {
          // Multiple path - review step, no validation needed
          isValid = true;
        }
        break;
      case 5:
        // Validate step 5 based on path
        if (form.watch("relocationType") === "single") {
          const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;
          if (hasInsurance) {
            isValid = await form.trigger("singleRelocationPreferences");
          } else {
            isValid = await form.trigger("singleArrivalDetails");
          }
        } else {
          // Multiple path - consent step, validate consent
          isValid = await form.trigger("multipleConsent");
        }
        break;
      case 6:
        // Validate step 6 based on path
        if (form.watch("relocationType") === "single") {
          const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;
          if (hasInsurance) {
            isValid = await form.trigger("singleArrivalDetails");
          } else {
            // Review step, no validation needed
            isValid = true;
          }
        } else {
          // Multiple path - success step, no validation needed
          isValid = true;
        }
        break;
      case 7:
        // Validate step 7 based on path
        if (form.watch("relocationType") === "single") {
          const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;
          if (hasInsurance) {
            // Review step, no validation needed
            isValid = true;
          } else {
            isValid = await form.trigger("singleConsent");
          }
        }
        break;
      case 8:
        // Validate step 8 based on path
        if (form.watch("relocationType") === "single") {
          const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;
          if (hasInsurance) {
            isValid = await form.trigger("singleConsent");
          } else {
            // Success step, no validation needed
            isValid = true;
          }
        }
        break;
      default:
        isValid = true;
    }
    
    if (isValid) {
      setStep(prevStep => prevStep + 1);
    }
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
              Retour
            </Button>
          )}
        </div>
        
        <div>
          <Button 
            type="button" 
            onClick={nextStep}
            className="px-8 py-2 h-auto bg-primary hover:bg-primary/90"
          >
            {step === 1 ? "Commencer" : "Suivant"}
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
          <CardTitle className="text-3xl font-bold text-center">Demande de relogement</CardTitle>
          {step > 1 && (
            <div className="mt-80">
              <Progress value={progressPercentage} className="h-2.5" />
              <p className="text-sm text-right mt-2 text-muted-foreground">
                Étape {step} sur {totalSteps}
              </p>
            </div>
          )}
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