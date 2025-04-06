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
import { PropertyType } from "./steps/property-type";
import { PropertyDetails } from "./steps/property-details";
import { PropertyLocation } from "./steps/property-location";
import { PropertyAmenities } from "./steps/property-amenities";
import { PropertyAvailability } from "./steps/property-availability";
import { PropertyPhotos } from "./steps/property-photos";
import { PropertyPricing } from "./steps/property-pricing";
import { PropertyRules } from "./steps/property-rules";
import { OwnerDetails } from "./steps/owner-details";
import { ReviewAndConfirm } from "./steps/review-and-confirm";
import { SuccessMessage } from "./steps/success-message";

// Define the form schema using Zod
const formSchema = z.object({
  // Step 1: Property Type
  propertyType: z.enum(["apartment", "house", "room", "studio", "other"]),
  
  // Step 2: Property Details
  propertyDetails: z.object({
    title: z.string().min(5, "Title is required (min 5 chars)"),
    description: z.string().min(10, "Description is required (min 10 chars)"),
    bedrooms: z.number().min(0, "Must be 0 or more"),
    bathrooms: z.number().min(0, "Must be 0 or more"),
    maxGuests: z.number().min(1, "At least 1 guest required"),
    squareMeters: z.number().min(1, "Size is required"),
  }),
  
  // Step 3: Property Location
  propertyLocation: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(4, "Valid postal code is required"),
    canton: z.string().min(1, "Canton is required"),
    country: z.string().min(1, "Country is required"),
    showExactLocation: z.boolean().default(true),
  }),
  
  // Step 4: Property Amenities
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
  
  // Step 5: Property Availability
  propertyAvailability: z.object({
    availableFrom: z.string(),
    availableTo: z.string().optional(),
    minStay: z.number().min(1, "Minimum stay required"),
    maxStay: z.number().optional(),
    isFlexible: z.boolean().optional(),
  }),
  
  // Step 6: Property Photos
  propertyPhotos: z.object({
    photos: z.array(z.string()).min(1, "At least one photo is required"),
  }),
  
  // Step 7: Property Pricing
  propertyPricing: z.object({
    price: z.number().min(1, "Price is required"),
    pricePeriod: z.enum(["night", "week", "month"]),
    cleaningFee: z.number().optional(),
    securityDeposit: z.number().optional(),
    discounts: z.object({
      hasLongTermDiscount: z.boolean().optional(),
      longTermDiscountPercent: z.number().optional(),
    }).optional(),
  }),
  
  // Step 8: Property Rules
  propertyRules: z.object({
    allowChildren: z.boolean().optional(),
    allowPets: z.boolean().optional(),
    allowSmoking: z.boolean().optional(),
    allowEvents: z.boolean().optional(),
    quietHours: z.boolean().optional(),
    quietHoursStart: z.string().optional(),
    quietHoursEnd: z.string().optional(),
    additionalRules: z.string().optional(),
  }),
  
  // Step 9: Owner Details
  ownerDetails: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    preferredContact: z.enum(["email", "phone", "both"]),
  }),
  
  // Step 10: Review and Confirm
  confirmDetails: z.object({
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: "You must agree to the terms to continue",
    }),
    agreeToDataPolicy: z.boolean().refine(val => val === true, {
      message: "You must agree to the data policy to continue",
    }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function PropertyWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 10; // Total number of steps in our wizard
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyAmenities: {
        features: [],
        hasWifi: false,
        hasParking: false,
        hasKitchen: false,
        hasWashingMachine: false,
        hasTv: false,
        hasAirConditioning: false,
        hasHeating: false,
        hasAccessibility: false,
        accessibilityFeatures: [],
      },
      propertyRules: {
        allowChildren: true,
        allowPets: false,
        allowSmoking: false,
        allowEvents: false,
        quietHours: false,
      },
      propertyPhotos: {
        photos: [],
      },
    },
  });
  
  // Calculate progress percentage
  const progressPercentage = (step / totalSteps) * 100;

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const onSubmit = async (data: FormValues) => {
    console.log("Form data:", data);
    return data;
  };

  // Determine which step component to render
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PropertyType form={form} />;
      case 2:
        return <PropertyDetails form={form} />;
      case 3:
        return <PropertyLocation form={form} />;
      case 4:
        return <PropertyAmenities form={form} />;
      case 5:
        return <PropertyAvailability form={form} />;
      case 6:
        return <PropertyPhotos form={form} />;
      case 7:
        return <PropertyPricing form={form} />;
      case 8:
        return <PropertyRules form={form} />;
      case 9:
        return <OwnerDetails form={form} />;
      case 10:
        return <ReviewAndConfirm form={form} />;
      case 11:
        return <SuccessMessage />;
      default:
        return <PropertyType form={form} />;
    }
  };

  // Navigation buttons based on current step
  const renderNavigationButtons = () => {
    // If on the success message step, don't show navigation buttons
    if (step === 11) return null;
    
    const handleSubmit = async () => {
      setIsSubmitting(true);
      try {
        const formData = form.getValues();
        await onSubmit(formData);
        console.log("Form submitted successfully");
        setIsSubmitted(true);
        // Move to success message
        setStep(11);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={prevStep}>
            Précédent
          </Button>
        ) : (
          <div></div> // Placeholder to maintain layout
        )}
        
        {step < 10 ? (
          <Button 
            type="button" 
            onClick={() => {
              form.trigger().then(isValid => {
                if (isValid) {
                  nextStep();
                } else {
                  console.log("Form validation failed");
                }
              });
            }}
          >
            Suivant
          </Button>
        ) : (
          <Button 
            type="button" 
            onClick={() => {
              form.trigger().then(isValid => {
                if (isValid) {
                  handleSubmit();
                } else {
                  console.log("Form validation failed");
                }
              });
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Soumission..." : "Soumettre"}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Étape {step} sur {totalSteps}</span>
          <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Type de logement"}
            {step === 2 && "Détails du logement"}
            {step === 3 && "Localisation"}
            {step === 4 && "Équipements"}
            {step === 5 && "Disponibilité"}
            {step === 6 && "Photos"}
            {step === 7 && "Prix"}
            {step === 8 && "Règles"}
            {step === 9 && "Informations de contact"}
            {step === 10 && "Vérification et confirmation"}
            {step === 11 && "Merci pour votre proposition!"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Sélectionnez le type de logement que vous souhaitez mettre à disposition."}
            {step === 2 && "Décrivez votre logement en détail."}
            {step === 3 && "Indiquez où se trouve votre logement."}
            {step === 4 && "Quels équipements proposez-vous?"}
            {step === 5 && "Quand votre logement est-il disponible?"}
            {step === 6 && "Ajoutez des photos de votre logement."}
            {step === 7 && "Définissez le prix de votre logement."}
            {step === 8 && "Établissez les règles pour votre logement."}
            {step === 9 && "Fournissez vos informations de contact."}
            {step === 10 && "Vérifiez tous les détails avant de soumettre."}
            {step === 11 && "Votre logement a été ajouté avec succès."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            {renderStep()}
          </form>
        </CardContent>
        <CardFooter>
          {renderNavigationButtons()}
        </CardFooter>
      </Card>
    </div>
  );
} 