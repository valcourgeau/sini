"use client";

import { useState, useEffect } from "react";
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
import { PropertyType } from "./steps/property-type";
import { PropertyDetails } from "./steps/property-details";
import { PropertyAmenities } from "./steps/property-amenities";
import { PropertyAvailability } from "./steps/property-availability";
import { PropertyPhotos } from "./steps/property-photos";
import { PropertyPricing } from "./steps/property-pricing";
import { PropertyRules } from "./steps/property-rules";
import { OwnerDetails } from "./steps/owner-details";
import { ReviewAndConfirm } from "./steps/review-and-confirm";
import { SuccessMessage } from "./steps/success-message";
import { cn } from "@/lib/utils";

// Define the form schema using Zod
const formSchema = z.object({
  // Step 1: Property Type
  propertyType: z.enum(["apartment", "house", "room", "studio", "other"]),
  
  // Step 2: Property Details and Location
  propertyDetails: z.object({
    title: z.string().min(5, "Le titre est requis (minimum 5 caractères)"),
    bedrooms: z.number().min(0, "Doit être 0 ou plus"),
    bathrooms: z.number().min(0, "Doit être 0 ou plus"),
    maxGuests: z.number().min(1, "Au moins 1 invité requis"),
  }),
  
  // Property Location (now part of Step 2)
  propertyLocation: z.object({
    street: z.string().min(1, "L'adresse est requise"),
    city: z.string().min(1, "La ville est requise"),
    postalCode: z.string().min(4, "Un code postal valide est requis"),
    canton: z.string().min(1, "Le canton est requis"),
    country: z.string().min(1, "Le pays est requis"),
  }),
  
  // Step 3: Property Amenities
  propertyAmenities: z.object({
    features: z.array(z.string()),
    hasWifi: z.boolean().optional(),
    hasParking: z.boolean().optional(),
    hasKitchen: z.boolean().optional(),
    hasWashingMachine: z.boolean().optional(),
    hasTv: z.boolean().optional(),
    hasAirConditioning: z.boolean().optional(),
    hasHeating: z.boolean().optional(),
    hasAccessibility: z.boolean().optional(),
    accessibilityFeatures: z.array(z.string()).optional(),
  }),
  
  // Step 4: Property Availability
  propertyAvailability: z.object({
    availableFrom: z.string(),
    availableTo: z.string().optional(),
    minStay: z.number().min(1, "Séjour minimum requis"),
    maxStay: z.number().optional(),
    isFlexible: z.boolean().optional(),
  }),
  
  // Step 5: Property Photos
  propertyPhotos: z.object({
    photos: z.array(z.string()).min(0, "Au moins une photo est requise"),
  }),
  
  // Step 6: Property Pricing
  propertyPricing: z.object({
    prices: z.object({
      night: z.number().min(0, "Le prix par nuit est requis"),
      week: z.number().min(0, "Le prix par semaine est requis"),
      month: z.number().min(0, "Le prix par mois est requis"),
    }),
    currency: z.string().default("CHF"),
    includesUtilities: z.boolean().optional(),
    utilitiesIncluded: z.array(z.string()).optional(),
    additionalFees: z.array(z.object({
      name: z.string(),
      amount: z.number(),
      frequency: z.enum(["one-time", "per-night", "per-week", "per-month"]),
    })).optional(),
  }),
  
  // Step 7: Property Rules
  propertyRules: z.object({
    houseRules: z.array(z.string()),
    checkInTime: z.string(),
    checkOutTime: z.string(),
    smokingAllowed: z.boolean().optional(),
    petsAllowed: z.boolean().optional(),
    partiesAllowed: z.boolean().optional(),
    additionalRules: z.string().optional(),
  }),
  
  // Step 8: Owner Details
  ownerDetails: z.object({
    firstName: z.string().min(1, "Le prénom est requis"),
    lastName: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Un email valide est requis"),
    phone: z.string().min(1, "Le numéro de téléphone est requis"),
    preferredContactMethod: z.enum(["email", "phone", "both"]).default("email"),
  }),
  
  // Step 9: Confirmation
  confirmDetails: z.object({
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions d'utilisation",
    }),
    agreeToDataPolicy: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter la politique de confidentialité",
    }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function PropertyWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Add debugging for isSubmitted state changes
  useEffect(() => {
    console.log("isSubmitted state changed:", isSubmitted);
  }, [isSubmitted]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      propertyType: "apartment",
      propertyDetails: {
        title: "",
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
      },
      propertyLocation: {
        street: "",
        city: "",
        postalCode: "",
        canton: "",
        country: "Switzerland",
      },
      propertyAmenities: {
        features: [],
      },
      propertyAvailability: {
        availableFrom: "",
        minStay: 1,
      },
      propertyPhotos: {
        photos: [],
      },
      propertyPricing: {
        prices: {
          night: 0,
          week: 0,
          month: 0,
        },
        currency: "CHF",
      },
      propertyRules: {
        houseRules: [],
        checkInTime: "15:00",
        checkOutTime: "11:00",
      },
      ownerDetails: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        preferredContactMethod: "email",
      },
      confirmDetails: {
        agreeToTerms: false,
        agreeToDataPolicy: false,
      },
    },
  });

  // Calculate progress percentage
  const progressPercentage = (step / 9) * 100;

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  // Add a function to validate the current step
  const validateCurrentStep = async () => {
    console.log("Validating current step:", step);
    
    // Define the fields to validate for each step
    const stepFields: Record<number, string[]> = {
      1: ["propertyType"],
      2: ["propertyDetails", "propertyLocation"],
      3: ["propertyAmenities"],
      4: ["propertyAvailability"],
      5: ["propertyPhotos"],
      6: ["propertyPricing.prices"],
      7: ["propertyRules"],
      8: ["ownerDetails"],
      9: ["confirmDetails"]
    };
    
    // Get the fields to validate for the current step
    const fieldsToValidate = stepFields[step];
    
    if (!fieldsToValidate) {
      console.log("No fields to validate for step:", step);
      return true;
    }
    
    // Validate the fields
    console.log("Validating fields:", fieldsToValidate);
    const isValid = await form.trigger(fieldsToValidate as any);
    
    console.log("Validation result:", isValid);
    if (!isValid) {
      console.log("Validation errors:", form.formState.errors);
    }
    
    return isValid;
  };

  // Determine which step component to render
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PropertyType form={form} />;
      case 2:
        return <PropertyDetails form={form} />;
      case 3:
        return <PropertyAmenities form={form} />;
      case 4:
        return <PropertyAvailability form={form} />;
      case 5:
        return <PropertyPhotos form={form} />;
      case 6:
        return <PropertyPricing form={form} />;
      case 7:
        return <PropertyRules form={form} />;
      case 8:
        return <OwnerDetails form={form} />;
      case 9:
        return <ReviewAndConfirm 
          form={form} 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onBack={prevStep}
        />;
      case 10:
        return <SuccessMessage />;
      default:
        return <PropertyType form={form} />;
    }
  };

  // Handle conditional button logic
  const renderNavigationButtons = () => {
    const isFinalStep = step === 9;
    
    if (isFinalStep) {
      return null; // Don't show navigation buttons on the final step
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
            onClick={async () => {
              const isValid = await validateCurrentStep();
              if (isValid) {
                nextStep();
              }
            }}
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

  return (
    <div className="container mx-auto py-8 px-4 md:px-0 bg-sand/50 max-w-5xl">
      <Card className="border-2 shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold text-center">Ajouter un bien</CardTitle>
          <CardDescription className="text-center text-base">
            Veuillez remplir ce formulaire pour ajouter votre bien à notre plateforme.
          </CardDescription>
          <div className="mt-12">
            <Progress value={progressPercentage} className="h-2.5" />
            <p className="text-sm text-right mt-2 text-muted-foreground">
              Étape {step} sur 9
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