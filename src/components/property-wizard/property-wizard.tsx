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
    photos: z.array(z.string()).min(0, "At least one photo is required"),
  }),
  
  // Step 7: Property Pricing
  propertyPricing: z.object({
    prices: z.object({
      night: z.number().min(1, "At least one price is required"),
      week: z.number().min(0),
      month: z.number().min(0),
    }),
    cleaningFee: z.number().min(0).nullable().optional(),
    securityDeposit: z.number().min(0).nullable().optional(),
    discounts: z.object({
      hasLongTermDiscount: z.boolean().optional(),
      longTermDiscountPercent: z.number().min(0).max(100).nullable().optional(),
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

  // Add debugging for isSubmitted state changes
  useEffect(() => {
    console.log("isSubmitted state changed:", isSubmitted);
  }, [isSubmitted]);

  const totalSteps = 10; // Total number of steps in our wizard
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: undefined,
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
    mode: "onChange",
  });
  
  // Add debugging for form state changes
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log("Form value changed:", { name, type, value });
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  // Add debugging for form errors
  useEffect(() => {
    console.log("Form errors:", form.formState.errors);
  }, [form.formState.errors]);
  
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
    // This function is now just a wrapper for the direct submission handler
    // The actual submission logic is in the handleSubmit function in renderNavigationButtons
    return data;
  };

  // Add a function to validate the current step
  const validateCurrentStep = async () => {
    console.log("Validating current step:", step);
    
    // Define the fields to validate for each step
    const stepFields: Record<number, string[]> = {
      1: ["propertyType"],
      2: ["propertyDetails"],
      3: ["propertyLocation"],
      4: ["propertyAmenities"],
      5: ["propertyAvailability"],
      6: ["propertyPhotos"],
      7: ["propertyPricing.prices"], // Only validate required price fields
      8: ["propertyRules"],
      9: ["ownerDetails"],
      10: ["confirmDetails"]
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
    // Render the appropriate step component
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
    
    const isFinalStep = step === 10;
    
    console.log("Navigation state:", { 
      step, 
      isFinalStep, 
      isSubmitting, 
      isSubmitted 
    });
      
    // Direct form submission handler
    const handleSubmit = async () => {
      console.log("Submit button clicked");
      setIsSubmitting(true);
      
      try {
        // Validate the entire form before submission
        console.log("Validating entire form before submission");
        const isFormValid = await form.trigger();
        
        if (!isFormValid) {
          console.log("Form validation failed:", form.formState.errors);
          setIsSubmitting(false);
          return;
        }
        
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
        // Move to success message
        setStep(11);
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsSubmitting(false);
      }
    };

    // Function to validate current step and proceed
    const validateAndProceed = async () => {
      console.log("Validating step:", step);
      
      // Validate the current step
      const isValid = await validateCurrentStep();
      
      if (isValid) {
        console.log("Step validation successful, proceeding to next step");
        nextStep();
      } else {
        console.log("Step validation failed, showing errors");
      }
    };

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
          {isFinalStep ? (
            <Button 
              type="button" 
              onClick={async () => {
                console.log("Final step - validating form before submission");
                // Validate the current step before submission
                const isValid = await validateCurrentStep();
                
                if (isValid) {
                  console.log("Final step validation successful, proceeding with submission");
                  handleSubmit();
                } else {
                  console.log("Final step validation failed:", form.formState.errors);
                }
              }}
              disabled={isSubmitting}
              className="px-8 py-2 h-auto bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Submitting..." : "Submit Property"}
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={validateAndProceed}
              className="px-8 py-2 h-auto bg-primary hover:bg-primary/90"
            >
              {step === 1 ? "Start" : "Next"}
            </Button>
          )}
        </div>
      </CardFooter>
    );
  };

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0 max-w-5xl">
      <Card className="border-2 shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold text-center">
            {step === 1 && "Property Type"}
            {step === 2 && "Property Details"}
            {step === 3 && "Property Location"}
            {step === 4 && "Amenities"}
            {step === 5 && "Availability"}
            {step === 6 && "Photos"}
            {step === 7 && "Price"}
            {step === 8 && "Rules"}
            {step === 9 && "Contact Information"}
            {step === 10 && "Review and Confirmation"}
            {step === 11 && "Thank you for your submission!"}
          </CardTitle>
          <CardDescription className="text-center text-base">
            {step === 1 && "Select the type of property you wish to make available."}
            {step === 2 && "Describe your property in detail."}
            {step === 3 && "Indicate where your property is located."}
            {step === 4 && "What amenities do you offer?"}
            {step === 5 && "When is your property available?"}
            {step === 6 && "Add photos of your property."}
            {step === 7 && "Set the price of your property."}
            {step === 8 && "Establish the rules for your property."}
            {step === 9 && "Provide your contact information."}
            {step === 10 && "Verify all details before submitting."}
            {step === 11 && "Your property has been successfully added."}
          </CardDescription>
          <div className="mt-12">
            <Progress value={progressPercentage} className="h-2.5" />
            <p className="text-sm text-right mt-2 text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="pb-8">
          <form onSubmit={(e) => e.preventDefault()}>
            {renderStep()}
          </form>
        </CardContent>
        
        {renderNavigationButtons()}
      </Card>
    </div>
  );
} 