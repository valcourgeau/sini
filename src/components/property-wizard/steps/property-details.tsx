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
import { useState } from "react";
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
};

export function PropertyDetails({ form }: PropertyDetailsProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const detailsErrors = errors.propertyDetails || {};
  
  // Initialize numeric values if they are undefined
  const initializeNumericValues = () => {
    const fieldDefaults = {
      "propertyDetails.bedrooms": 1,
      "propertyDetails.bathrooms": 1,
      "propertyDetails.maxGuests": 2,
      "propertyDetails.squareMeters": 0
    };
    
    Object.entries(fieldDefaults).forEach(([field, defaultValue]) => {
      if (watch(field) === undefined) {
        setValue(field, defaultValue, {
          shouldValidate: false,
          shouldDirty: false
        });
      }
    });
  };

  // Call initialization on first render
  useState(() => {
    initializeNumericValues();
  });
  
  // Counter fields
  const counterFields: CounterField[] = [
    {
      id: "bedrooms",
      name: "Bedrooms",
      icon: <Bed size={20} />,
      min: 0,
      fieldName: "propertyDetails.bedrooms"
    },
    {
      id: "bathrooms",
      name: "Bathrooms",
      icon: <Bath size={20} />,
      min: 0,
      fieldName: "propertyDetails.bathrooms"
    },
    {
      id: "maxGuests",
      name: "Guests",
      icon: <Users size={20} />,
      min: 1,
      fieldName: "propertyDetails.maxGuests"
    },
    {
      id: "squareMeters",
      name: "Area (m²)",
      icon: <SquareCode size={20} />,
      min: 1,
      fieldName: "propertyDetails.squareMeters"
    }
  ];
  
  // Function to increment counter
  const incrementCounter = (fieldName: string, min: number) => {
    const currentValue = watch(fieldName) || min;
    setValue(fieldName, currentValue + 1, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };
  
  // Function to decrement counter
  const decrementCounter = (fieldName: string, min: number) => {
    const currentValue = watch(fieldName) || min;
    if (currentValue > min) {
      setValue(fieldName, currentValue - 1, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
    }
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
            placeholder="Ex: Beautiful bright apartment in the city center"
            className={cn(
              detailsErrors.title && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {detailsErrors.title && (
            <p className="text-sm text-red-500 mt-1">
              {detailsErrors.title.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            A short, catchy title that describes your property.
          </p>
        </div>
        
        {/* Description field */}
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
            className={cn(
              "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              detailsErrors.description && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {detailsErrors.description && (
            <p className="text-sm text-red-500 mt-1">
              {detailsErrors.description.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            A detailed description will help travelers better understand what you're offering.
          </p>
        </div>
        
        {/* Counter fields (bedrooms, bathrooms, guests, size) */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-4">Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {counterFields.map((field) => (
              <div key={field.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{field.icon}</span>
                  <Label 
                    htmlFor={field.fieldName} 
                    className="font-medium"
                  >
                    {field.name}
                  </Label>
                </div>
                
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => decrementCounter(field.fieldName, field.min)}
                    className={cn(
                      "p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors",
                      watch(field.fieldName) <= field.min && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={watch(field.fieldName) <= field.min}
                  >
                    <MinusCircle size={20} />
                  </button>
                  
                  <span className="w-12 text-center font-medium">
                    {watch(field.fieldName) || field.min}
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => incrementCounter(field.fieldName, field.min)}
                    className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    <PlusCircle size={20} />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            {counterFields.map((field) => {
              const fieldErrors = detailsErrors[field.id];
              return (
                <div key={`${field.id}-error`}>
                  {fieldErrors && (
                    <p className="text-sm text-red-500">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 