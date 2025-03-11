"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { AccommodationCheck } from "./steps/accommodation-check";
import { RoleIdentification } from "./steps/role-identification";
import { RelocationTypeSelection } from "./steps/relocation-type-selection";
import { SingleDisasterAddress } from "./steps/single-disaster-address";
import { SingleRelocationPreferences } from "./steps/single-relocation-preferences";
import { SingleSpecialNeeds } from "./steps/single-special-needs";
import { SingleArrivalDetails } from "./steps/single-arrival-details";
import { SinglePersonalData } from "./steps/single-personal-data";
import { SingleInsuranceCoverage } from "./steps/single-insurance-coverage";
import { SingleInsuranceDetails } from "./steps/single-insurance-details";
import { SingleLeaseTermination } from "./steps/single-lease-termination";
import { SingleReviewConfirm } from "./steps/single-review-confirm";
import { SingleConsent } from "./steps/single-consent";
import { MultipleDisasterAddress } from "./steps/multiple-disaster-address";
import { MultipleRelocationRequests } from "./steps/multiple-relocation-requests";
import { MultipleReviewConfirm } from "./steps/multiple-review-confirm";
import { MultipleConsent } from "./steps/multiple-consent";
import { SuccessMessage } from "./steps/success-message";

// Define the form schema using Zod
const formSchema = z.object({
  // Step 2: Accommodation Check
  isAccommodationListed: z.enum(["yes", "no", "unknown"]),

  // Step 3: Role Identification
  role: z.enum(["tenant", "owner", "intermediary"]),

  // Step 4: Relocation Type
  relocationType: z.enum(["single", "multiple"]),

  // Single Relocation path (5A-7A)
  singleDisasterAddress: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(4, "Valid postal code is required"),
    country: z.string().min(1, "Country is required"),
  }).optional(),

  singleRelocationPreferences: z.object({
    maxDistance: z.number().min(0, "Distance must be positive"),
    preferredAreas: z.array(z.string()).optional(),
    additionalNotes: z.string().optional(),
  }).optional(),

  singleSpecialNeeds: z.object({
    hasAnimals: z.boolean().optional(),
    animalDetails: z.string().optional(),
    hasAccessibilityNeeds: z.boolean().optional(),
    accessibilityDetails: z.string().optional(),
    otherSpecialNeeds: z.string().optional(),
  }).optional(),

  singleArrivalDetails: z.object({
    arrivalDate: z.string().min(1, "Arrival date is required"),
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
  }).optional(),

  singleInsuranceDetails: z.object({
    insuranceCompany: z.string().min(1, "Insurance company is required"),
    policyNumber: z.string().min(1, "Policy number is required"),
    agentContact: z.string().optional(),
  }).optional(),

  singleLeaseTermination: z.object({
    hasTerminatedLease: z.boolean().optional(),
    terminationDate: z.string().optional(),
    hasNotifiedLandlord: z.boolean().optional(),
  }).optional(),

  singleConsent: z.object({
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: "You must agree to the terms to continue",
    }),
    agreeToDataProcessing: z.boolean().refine(val => val === true, {
      message: "You must agree to data processing to continue",
    }),
  }).optional(),

  // Multiple Relocation path (5B-6B)
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isAccommodationListed: undefined,
      role: undefined,
      relocationType: undefined,
    },
  });

  // Calculate total steps based on the selected path
  const getTotalSteps = () => {
    const relocationType = form.watch("relocationType");
    
    if (!relocationType) return 4; // Default steps until relocation type selection
    
    return relocationType === "single" ? 13 : 8; // Single: 13 steps, Multiple: 8 steps
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
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Determine which step component to render
  const renderStep = () => {
    const relocationType = form.watch("relocationType");
    const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;

    switch (step) {
      case 1:
        return <AccommodationCheck form={form} />;
      case 2:
        return <RoleIdentification form={form} />;
      case 3:
        return <RelocationTypeSelection form={form} />;
      case 4:
        // Branch based on relocation type
        if (relocationType === "single") {
          return <SingleDisasterAddress form={form} />;
        } else if (relocationType === "multiple") {
          return <MultipleDisasterAddress form={form} />;
        }
        break;
      case 5:
        if (relocationType === "single") {
          return <SingleRelocationPreferences form={form} />;
        } else if (relocationType === "multiple") {
          return <MultipleRelocationRequests form={form} />;
        }
        break;
      case 6:
        if (relocationType === "single") {
          return <SingleSpecialNeeds form={form} />;
        } else if (relocationType === "multiple") {
          return <MultipleReviewConfirm form={form} />;
        }
        break;
      case 7:
        if (relocationType === "single") {
          return <SingleArrivalDetails form={form} />;
        } else if (relocationType === "multiple") {
          return <MultipleConsent form={form} />;
        }
        break;
      case 8:
        if (relocationType === "single") {
          return <SinglePersonalData form={form} />;
        } else if (relocationType === "multiple") {
          return <SuccessMessage />;
        }
        break;
      case 9:
        return <SingleInsuranceCoverage form={form} />;
      case 10:
        // Show insurance details only if they have insurance
        if (hasInsurance) {
          return <SingleInsuranceDetails form={form} />;
        } else {
          return <SingleLeaseTermination form={form} />;
        }
        break;
      case 11:
        if (hasInsurance) {
          return <SingleLeaseTermination form={form} />;
        } else {
          return <SingleReviewConfirm form={form} />;
        }
        break;
      case 12:
        if (hasInsurance) {
          return <SingleReviewConfirm form={form} />;
        } else {
          return <SingleConsent form={form} />;
        }
        break;
      case 13:
        if (hasInsurance) {
          return <SingleConsent form={form} />;
        } else {
          return <SuccessMessage />;
        }
        break;
      case 14:
        return <SuccessMessage />;
      default:
        return null;
    }
  };

  // Handle conditional button logic
  const renderNavigationButtons = () => {
    const relocationType = form.watch("relocationType");
    const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;
    
    const isFinalStep = 
      (relocationType === "single" && ((hasInsurance && step === 13) || (!hasInsurance && step === 12))) ||
      (relocationType === "multiple" && step === 7);
      
    return (
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={prevStep}
          >
            Back
          </Button>
        )}
        
        {isFinalStep ? (
          <Button 
            type="button" 
            onClick={() => form.handleSubmit(onSubmit)()}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        ) : (
          <Button type="button" onClick={nextStep}>
            {step === 1 ? "Start" : "Next"}
          </Button>
        )}
      </CardFooter>
    );
  };

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Relocation Assistance Request</CardTitle>
          <CardDescription>
            Please complete this form to request relocation assistance.
          </CardDescription>
          <div className="mt-4">
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-right mt-1 text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <form>
            {renderStep()}
          </form>
        </CardContent>
        
        {renderNavigationButtons()}
      </Card>
    </div>
  );
} 