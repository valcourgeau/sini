import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Bed, 
  Bath, 
  Users, 
  SquareCode, 
  MinusCircle, 
  PlusCircle 
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PropertyDetailsProps {
  form: UseFormReturn<any>;
}

type CounterField = {
  id: string;
  name: string;
  icon: React.ReactNode;
  min: number;
  fieldName: string;
  increment?: number;
};

export function PropertyDetails({ form }: PropertyDetailsProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  
  // Safely access nested errors
  const detailsErrors = errors.propertyDetails || {};
  
  // Log form state for debugging
  useEffect(() => {
    console.log("PropertyDetails - Form errors:", errors);
    console.log("PropertyDetails - Details errors:", detailsErrors);
  }, [errors, detailsErrors]);
  
  // Log form values for debugging
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name?.startsWith('propertyDetails')) {
        console.log(`PropertyDetails - Form value changed: ${name}`, value[name]);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  // Function to validate the current step
  const validateStep = async () => {
    console.log("Validating PropertyDetails step");
    
    // Validate all fields in the propertyDetails object
    const isValid = await form.trigger([
      "propertyDetails.title",
      "propertyDetails.description",
      "propertyDetails.bedrooms",
      "propertyDetails.bathrooms",
      "propertyDetails.maxGuests",
      "propertyDetails.squareMeters"
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
      "propertyDetails.maxGuests": 2,
      "propertyDetails.squareMeters": 50
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
      name: "Bedrooms",
      icon: <Bed size={24} />,
      min: 0,
      fieldName: "propertyDetails.bedrooms"
    },
    {
      id: "bathrooms",
      name: "Bathrooms",
      icon: <Bath size={24} />,
      min: 0,
      fieldName: "propertyDetails.bathrooms"
    },
    {
      id: "maxGuests",
      name: "Guests",
      icon: <Users size={24} />,
      min: 1,
      fieldName: "propertyDetails.maxGuests"
    },
    {
      id: "squareMeters",
      name: "Area (m²)",
      icon: <SquareCode size={24} />,
      min: 5,
      fieldName: "propertyDetails.squareMeters",
      increment: 5
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
        <h2 className="text-xl font-semibold mb-2">Property Details</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Describe your property to help travelers find what they're looking for.
        </p>
      </div>

      <div className="space-y-6">
        {/* Title field */}
        <div className="space-y-2">
          <Label 
            htmlFor="propertyDetails.title" 
            className="text-base font-medium"
          >
            Title
          </Label>
          <Input
            id="propertyDetails.title"
            {...register("propertyDetails.title")}
            defaultValue="Beautiful bright apartment in the city center"
            placeholder="Ex: Beautiful bright apartment in the city center"
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
            A short, catchy title that describes your property.
          </p>
        </div>
        
        {/* Counter fields (bedrooms, bathrooms, guests, size) - MOVED ABOVE DESCRIPTION */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-6 text-center">Features</h3>
          
          <div className="space-y-8">
            {counterFields.map((field) => (
              <div key={field.id} className="flex items-center justify-between max-w-md mx-auto w-full">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-600">{field.icon}</span>
                  </div>
                  <Label 
                    htmlFor={field.fieldName} 
                    className="font-medium text-lg"
                  >
                    {field.name}
                  </Label>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => decrementCounter(field.fieldName, field.min, field.increment || 1)}
                    className={cn(
                      "p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors",
                      watch(field.fieldName) <= field.min && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={watch(field.fieldName) <= field.min}
                  >
                    <MinusCircle size={28} />
                  </button>
                  
                  <span className="w-16 text-center font-medium text-xl">
                    {watch(field.fieldName) || field.min}
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => incrementCounter(field.fieldName, field.min, field.increment || 1)}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    <PlusCircle size={28} />
                  </button>
                  
                  <input
                    type="hidden"
                    id={field.fieldName}
                    {...register(field.fieldName, { valueAsNumber: true })}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Error messages for counter fields */}
          <div className="space-y-6 mt-4">
            {counterFields.map((field) => {
              const errorMessage = getErrorMessage(field.id);
              return (
                <div key={`${field.id}-error`} className="text-center">
                  {errorMessage && (
                    <p className="text-sm text-red-500">
                      {errorMessage}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Description field - MOVED BELOW FEATURES */}
        <div className="space-y-2">
          <Label 
            htmlFor="propertyDetails.description" 
            className="text-base font-medium"
          >
            Description
          </Label>
          <textarea
            id="propertyDetails.description"
            {...register("propertyDetails.description")}
            rows={5}
            placeholder="Describe your property in detail, mention what makes it unique..."
            defaultValue="This is a beautiful apartment in the city center. It has a balcony and a view of the lake."
            className={cn(
              "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              getErrorMessage("description") && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {getErrorMessage("description") && (
            <p className="text-sm text-red-500 mt-1">
              {getErrorMessage("description")}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            A detailed description will help travelers better understand what you're offering.
          </p>
        </div>
      </div>
    </div>
  );
} 