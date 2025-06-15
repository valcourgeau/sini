import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Bed, 
  Bath, 
  Users, 
  MinusCircle, 
  PlusCircle,
  MapPin
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PropertyDetailsProps {
  form: UseFormReturn<any>;
}

interface PropertyLocationErrors {
  street?: { message?: string };
  city?: { message?: string };
  postalCode?: { message?: string };
  canton?: { message?: string };
  country?: { message?: string };
}

type CounterField = {
  id: string;
  name: string;
  icon: React.ReactNode;
  min: number;
  fieldName: string;
  increment?: number;
};

const swissCantons = [
  { value: "geneve", label: "Genève" },
  { value: "vaud", label: "Vaud" },
  { value: "neuchatel", label: "Neuchâtel" },
  { value: "fribourg", label: "Fribourg" },
  { value: "valais", label: "Valais" },
  { value: "berne", label: "Berne" },
  { value: "jura", label: "Jura" },
  { value: "zurich", label: "Zurich" },
  { value: "bale", label: "Bâle" },
  { value: "tessin", label: "Tessin" }
];

export function PropertyDetails({ form }: PropertyDetailsProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  
  // Safely access nested errors
  const detailsErrors = errors.propertyDetails || {};
  const locationErrors = (errors.propertyLocation || {}) as PropertyLocationErrors;
  
  // Log form state for debugging
  useEffect(() => {
    console.log("PropertyDetails - Form errors:", errors);
    console.log("PropertyDetails - Details errors:", detailsErrors);
    console.log("PropertyDetails - Location errors:", locationErrors);
  }, [errors, detailsErrors, locationErrors]);
  
  // Log form values for debugging
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name?.startsWith('propertyDetails') || name?.startsWith('propertyLocation')) {
        console.log(`PropertyDetails - Form value changed: ${name}`, value[name]);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  // Function to validate the current step
  const validateStep = async () => {
    console.log("Validating PropertyDetails step");
    
    // Validate all fields in both propertyDetails and propertyLocation objects
    const isValid = await form.trigger([
      "propertyDetails.title",
      "propertyDetails.bedrooms",
      "propertyDetails.bathrooms",
      "propertyDetails.maxGuests",
      "propertyLocation.street",
      "propertyLocation.city",
      "propertyLocation.postalCode",
      "propertyLocation.canton",
      "propertyLocation.country"
    ]);
    
    console.log("PropertyDetails validation result:", isValid);
    
    if (!isValid) {
      console.log("PropertyDetails validation errors:", form.formState.errors);
    }
    
    return isValid;
  };
  
  // Expose the validate function to the parent component
  useEffect(() => {
    // @ts-ignore - Adding a custom property to the form object
    form.validatePropertyDetails = validateStep;
  }, [form]);
  
  // Initialize numeric values if they are undefined
  const initializeNumericValues = () => {
    const fieldDefaults = {
      "propertyDetails.bedrooms": 1,
      "propertyDetails.bathrooms": 1,
      "propertyDetails.maxGuests": 2
    };
    
    console.log("Initializing numeric values");
    
    Object.entries(fieldDefaults).forEach(([field, defaultValue]) => {
      const currentValue = watch(field);
      console.log(`Field ${field} current value:`, currentValue);
      
      if (currentValue === undefined || currentValue === null) {
        console.log(`Setting ${field} to default value:`, defaultValue);
        setValue(field, defaultValue, {
          shouldValidate: true,
          shouldDirty: false,
          shouldTouch: false
        });
      }
    });
  };

  // Call initialization on first render
  useEffect(() => {
    initializeNumericValues();
  }, []);
  
  // Counter fields
  const counterFields: CounterField[] = [
    {
      id: "bedrooms",
      name: "Chambres",
      icon: <Bed size={24} />,
      min: 0,
      fieldName: "propertyDetails.bedrooms"
    },
    {
      id: "bathrooms",
      name: "Salles de bain",
      icon: <Bath size={24} />,
      min: 0,
      fieldName: "propertyDetails.bathrooms"
    },
    {
      id: "maxGuests",
      name: "Invités",
      icon: <Users size={24} />,
      min: 1,
      fieldName: "propertyDetails.maxGuests"
    }
  ];
  
  // Function to increment counter
  const incrementCounter = (fieldName: string, min: number, increment: number = 1) => {
    const currentValue = watch(fieldName) || min;
    console.log(`Incrementing ${fieldName} from ${currentValue} to ${currentValue + increment}`);
    setValue(fieldName, currentValue + increment, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };
  
  // Function to decrement counter
  const decrementCounter = (fieldName: string, min: number, increment: number = 1) => {
    const currentValue = watch(fieldName) || min;
    if (currentValue > min) {
      console.log(`Decrementing ${fieldName} from ${currentValue} to ${currentValue - increment}`);
      setValue(fieldName, currentValue - increment, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
    }
  };

  // Helper function to safely access error messages
  const getErrorMessage = (fieldName: string): string | undefined => {
    const error = detailsErrors[fieldName as keyof typeof detailsErrors];
    if (!error) return undefined;
    
    // Handle different error types
    if (typeof error === 'string') return error;
    
    // For FieldError objects
    if (error && typeof error === 'object' && 'message' in error) {
      return error.message as string;
    }
    
    return undefined;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Détails du bien</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Fournissez des informations sur votre bien pour aider les voyageurs à trouver ce qu'ils recherchent.
        </p>
      </div>

      {/* Title field spanning both columns */}
      <div className="space-y-2">
        <Label 
          htmlFor="propertyDetails.title" 
          className="text-base font-medium"
        >
          Titre
        </Label>
        <Input
          id="propertyDetails.title"
          {...register("propertyDetails.title")}
          defaultValue="Bel appartement lumineux au centre-ville"
          placeholder="Ex: Bel appartement lumineux au centre-ville"
          className={cn(
            getErrorMessage("title") && "border-red-500 focus-visible:ring-red-500"
          )}
        />
        {getErrorMessage("title") && (
          <p className="text-sm text-red-500 mt-1">
            {getErrorMessage("title")}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Un titre court et accrocheur qui décrit votre bien.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Property Details */}
        <div className="space-y-6">
          {/* Location Section */}
          <div className="space-y-6">
            {/* Street */}
            <div className="space-y-2">
              <Label 
                htmlFor="propertyLocation.street" 
                className="text-base font-medium"
              >
                Adresse du bien
              </Label>
              <Input
                id="propertyLocation.street"
                {...register("propertyLocation.street")}
                placeholder="Ex: Rue du Mont-Blanc 15"
                className={cn(
                  locationErrors.street && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {locationErrors.street && (
                <p className="text-sm text-red-500 mt-1">
                  {locationErrors.street.message}
                </p>
              )}
            </div>
            
            {/* City and Postal Code */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Localisation</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* City */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="propertyLocation.city" 
                      className="text-base font-medium"
                    >
                      Ville
                    </Label>
                    <Input
                      id="propertyLocation.city"
                      {...register("propertyLocation.city")}
                      placeholder="Ex: Genève"
                      className={cn(
                        locationErrors.city && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {locationErrors.city && (
                      <p className="text-sm text-red-500 mt-1">
                        {locationErrors.city.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Postal Code */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="propertyLocation.postalCode" 
                      className="text-base font-medium"
                    >
                      Code postal
                    </Label>
                    <Input
                      id="propertyLocation.postalCode"
                      {...register("propertyLocation.postalCode")}
                      placeholder="Ex: 1201"
                      className={cn(
                        locationErrors.postalCode && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {locationErrors.postalCode && (
                      <p className="text-sm text-red-500 mt-1">
                        {locationErrors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Canton and Country */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Canton */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="propertyLocation.canton" 
                      className="text-base font-medium"
                    >
                      Canton
                    </Label>
                    <select
                      id="propertyLocation.canton"
                      {...register("propertyLocation.canton")}
                      className={cn(
                        "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        locationErrors.canton && "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <option value="">Sélectionnez un canton</option>
                      {swissCantons.map((canton) => (
                        <option key={canton.value} value={canton.value}>
                          {canton.label}
                        </option>
                      ))}
                    </select>
                    {locationErrors.canton && (
                      <p className="text-sm text-red-500 mt-1">
                        {locationErrors.canton.message}
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="propertyLocation.country" 
                      className="text-base font-medium"
                    >
                      Pays
                    </Label>
                    <Input
                      id="propertyLocation.country"
                      {...register("propertyLocation.country")}
                      defaultValue="Suisse"
                      disabled
                      className={cn(
                        locationErrors.country && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {locationErrors.country && (
                      <p className="text-sm text-red-500 mt-1">
                        {locationErrors.country.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Features */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium mb-6 text-center">Features</h3>
          
          <div className="space-y-8">
            {counterFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label 
                  htmlFor={field.fieldName} 
                  className="text-base font-medium"
                >
                  {field.name}
                </Label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => decrementCounter(field.fieldName, field.min)}
                    className="p-2 rounded-full hover:bg-gray-100"
                    disabled={watch(field.fieldName) <= field.min}
                  >
                    <MinusCircle size={24} className="text-gray-500" />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">
                    {watch(field.fieldName) || field.min}
                  </span>
                  <button
                    type="button"
                    onClick={() => incrementCounter(field.fieldName, field.min)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <PlusCircle size={24} className="text-gray-500" />
                  </button>
                </div>
                {getErrorMessage(field.id) && (
                  <p className="text-sm text-red-500 mt-1">
                    {getErrorMessage(field.id)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 