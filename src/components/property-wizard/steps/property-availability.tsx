import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Check, MinusCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface PropertyAvailabilityProps {
  form: UseFormReturn<any>;
}

interface PropertyAvailabilityErrors {
  availableFrom?: { message?: string };
  minStay?: { message?: string };
  isFlexible?: { message?: string };
}

type CounterField = {
  id: string;
  name: string;
  icon: React.ReactNode;
  min: number;
  fieldName: string;
  increment?: number;
};

export function PropertyAvailability({ form }: PropertyAvailabilityProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const availabilityErrors = (errors.propertyAvailability || {}) as PropertyAvailabilityErrors;
  
  // Watch if isFlexible is selected
  const isFlexible = watch("propertyAvailability.isFlexible");
  
  // Toggle isFlexible
  const toggleIsFlexible = (value: boolean) => {
    setValue("propertyAvailability.isFlexible", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };
  
  // Initialize numeric values if they are undefined
  useEffect(() => {
    const fieldDefaults = {
      "propertyAvailability.minStay": 1
    };
    
    Object.entries(fieldDefaults).forEach(([field, defaultValue]) => {
      const currentValue = watch(field);
      if (currentValue === undefined || currentValue === null) {
        setValue(field, defaultValue, {
          shouldValidate: true,
          shouldDirty: false,
          shouldTouch: false
        });
      }
    });
  }, []);
  
  // Counter fields
  const counterFields: CounterField[] = [
    {
      id: "minStay",
      name: "Durée minimum de séjour",
      icon: <Clock size={24} />,
      min: 1,
      fieldName: "propertyAvailability.minStay"
    }
  ];
  
  // Function to increment counter
  const incrementCounter = (fieldName: string, min: number, increment: number = 1) => {
    const currentValue = watch(fieldName) || min;
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
      setValue(fieldName, currentValue - increment, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Disponibilité du bien</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Quand votre bien est-il disponible et pour quelle durée ?
        </p>
      </div>

      <div className="space-y-6">
        {/* Date fields */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between max-w-md mx-auto w-full mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-600"><Calendar size={24} /></span>
              </div>
              <Label 
                htmlFor="propertyAvailability.availableFrom" 
                className="font-medium text-lg"
              >
                Disponible à partir du
              </Label>
            </div>
            <div className="relative max-w-[180px]">
              <Input
                id="propertyAvailability.availableFrom"
                type="date"
                {...register("propertyAvailability.availableFrom")}
                className={cn(
                  "w-full pl-3 pr-3 py-2 text-base",
                  availabilityErrors.availableFrom && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {availabilityErrors.availableFrom && (
                <p className="text-sm text-red-500 mt-1 absolute">
                  {availabilityErrors.availableFrom.message}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Duration fields */}
        <div className="pt-4">
          {/* <h3 className="text-lg font-medium mb-6 text-center">Stay Duration</h3> */}
          
          <div className="space-y-8 max-w-2xl mx-auto">
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
                  
                  <div className="w-16 text-center font-medium text-xl">
                    {watch(field.fieldName) || field.min}
                  </div>
                  
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
              const errorMessage = availabilityErrors[field.id as keyof PropertyAvailabilityErrors]?.message;
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
        
        {/* Flexibility option */}
        <div className="mt-6 pt-6 border-t max-w-2xl mx-auto">
          <h3 className="text-lg font-medium mb-4">Flexibilité</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Êtes-vous flexible concernant les dates d'arrivée et de départ ?
          </p>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => toggleIsFlexible(true)}
              className={cn(
                "flex-1 group relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                isFlexible === true
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
              aria-pressed={isFlexible === true}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all",
                isFlexible === true
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              )}>
                <Check size={16} />
              </div>
              <span className="font-medium">Oui, je suis flexible</span>
              
              <input
                type="radio"
                name="propertyAvailability.isFlexible"
                checked={isFlexible === true}
                onChange={() => {}}
                className="sr-only" // Hidden but keeps form functionality
              />
            </button>
            
            <button
              type="button"
              onClick={() => toggleIsFlexible(false)}
              className={cn(
                "flex-1 group relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                isFlexible === false
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
              aria-pressed={isFlexible === false}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all",
                isFlexible === false
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              )}>
                <MinusCircle size={16} />
              </div>
              <span className="font-medium">Non, dates fixes</span>
              
              <input
                type="radio"
                name="propertyAvailability.isFlexible"
                checked={isFlexible === false}
                onChange={() => {}}
                className="sr-only" // Hidden but keeps form functionality
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 