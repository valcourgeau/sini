import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { 
  Check, 
  Bed, 
  Users, 
  Baby, 
  PawPrint, 
  Accessibility, 
  Car as CarIcon,
  MinusCircle, 
  PlusCircle,
  AlertCircle
} from "lucide-react";
import { Input } from '@/components/ui/input';

interface SingleRelocationPreferencesProps {
  form: UseFormReturn<any>;
  userType?: string | null;
}

type CounterField = {
  id: string;
  name: string;
  icon: React.ReactNode;
  min: number;
  fieldName: string;
  increment?: number;
};

interface SpecialNeedCard {
  id: string;
  name: string;
  icon: React.ReactNode;
  fieldName: string;
  description?: string;
}

export function SingleRelocationPreferences({ form, userType }: SingleRelocationPreferencesProps) {
  const { register, setValue, watch, formState: { errors, isSubmitted } } = form;
  const preferencesErrors = (errors.singleRelocationPreferences as any) || {};
  
  // Initialize numeric values if they are undefined
  const initializeNumericValues = () => {
    const fieldDefaults = {
      "singleRelocationPreferences.bedrooms": 1,
      "singleRelocationPreferences.adults": 1,
      "singleRelocationPreferences.children": 0
    };
    
    Object.entries(fieldDefaults).forEach(([field, defaultValue]) => {
      const currentValue = watch(field);
      // Set default value if the field is undefined, null, empty string, or if the entire preferences object doesn't exist
      if (currentValue === undefined || currentValue === null || currentValue === '' || !watch("singleRelocationPreferences")) {
        setValue(field, defaultValue, {
          shouldValidate: true,
          shouldDirty: false,
          shouldTouch: false
        });
      }
    });
  };

  // Call initialization on first render and when form changes
  useEffect(() => {
    initializeNumericValues();
  }, []);

  // Also initialize when the component mounts to ensure values are set
  useEffect(() => {
    const preferences = watch("singleRelocationPreferences");
    if (!preferences) {
      setValue("singleRelocationPreferences", {
        bedrooms: 1,
        adults: 1,
        children: 0,
        hasAnimals: false,
        hasAccessibilityNeeds: false,
        needsParking: false
      }, {
        shouldValidate: true,
        shouldDirty: false,
        shouldTouch: false
      });
    }
  }, []);

  // Determine section titles and descriptions based on user type
  const getPreferencesTitle = () => {
    if (userType === "sinistre") {
      return "Vos besoins en logement";
    }
    return "Préférences";
  };

  const getPreferencesDescription = () => {
    if (userType === "sinistre") {
      return "Aidez-nous à trouver le logement le plus adapté à votre situation.";
    }
    return "Veuillez nous aider à trouver la solution la plus adaptée.";
  };

  const getHousingNeedsTitle = () => {
    if (userType === "sinistre") {
      return "Vos besoins en logement";
    }
    return "Besoins du logement";
  };

  const getSpecialNeedsTitle = () => {
    if (userType === "sinistre") {
      return "Vos besoins spécifiques";
    }
    return "Besoins spécifiques";
  };

  // Counter fields
  const counterFields: CounterField[] = [
    {
      id: "bedrooms",
      name: "Chambres",
      icon: <Bed size={24} />,
      min: 1,
      fieldName: "singleRelocationPreferences.bedrooms"
    },
    {
      id: "adults",
      name: "Adultes",
      icon: <Users size={24} />,
      min: 1,
      fieldName: "singleRelocationPreferences.adults"
    },
    {
      id: "children",
      name: "Enfants",
      icon: <Baby size={24} />,
      min: 0,
      fieldName: "singleRelocationPreferences.children"
    }
  ];

  // Special needs cards
  const specialNeedCards: SpecialNeedCard[] = [
    {
      id: "animals",
      name: "Animaux",
      icon: <PawPrint size={28} />,
      fieldName: "singleRelocationPreferences.hasAnimals"
    },
    {
      id: "accessibility",
      name: "Accessibilité",
      icon: <Accessibility size={28} />,
      fieldName: "singleRelocationPreferences.hasAccessibilityNeeds"
    },
    {
      id: "parking",
      name: "Stationnement",
      icon: <CarIcon size={28} />,
      fieldName: "singleRelocationPreferences.needsParking"
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
    // Trigger validation for the specific field
    form.trigger(fieldName);
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
      // Trigger validation for the specific field
      form.trigger(fieldName);
    }
  };

  // Function to toggle special need
  const toggleSpecialNeed = (fieldName: string) => {
    const currentValue = watch(fieldName) || false;
    setValue(fieldName, !currentValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    // Trigger validation for the specific field
    form.trigger(fieldName);
  };

  // Check if there are any validation errors
  const hasErrors = Object.keys(preferencesErrors).length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">{getPreferencesTitle()}</h2>
        <p className="text-sm text-muted-foreground">
          {getPreferencesDescription()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Property Requirements */}
        <div className="space-y-6">
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-6 text-center">{getHousingNeedsTitle()}</h3>
            
            <div className="space-y-8">
              {counterFields.map((field) => {
                const fieldError = preferencesErrors[field.id];
                const currentValue = watch(field.fieldName) || field.min;
                const hasError = !!fieldError;
                
                return (
                  <div key={field.id} className="space-y-2">
                    <div className={cn(
                      "flex items-center justify-between max-w-md mx-auto w-full p-3 rounded-lg transition-colors",
                      hasError 
                        ? "border-2 border-red-300 bg-red-50" 
                        : "border-0"
                    )}>
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center",
                          hasError ? "bg-red-100" : "bg-gray-100"
                        )}>
                          <span className={cn(
                            hasError ? "text-red-600" : "text-gray-600"
                          )}>
                            {field.icon}
                          </span>
                        </div>
                        <Label 
                          htmlFor={field.fieldName} 
                          className={cn(
                            "font-medium text-lg",
                            hasError && "text-red-700"
                          )}
                        >
                          {field.name}
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => decrementCounter(field.fieldName, field.min, field.increment || 1)}
                          className={cn(
                            "p-2 rounded-full transition-colors",
                            currentValue <= field.min 
                              ? "text-gray-300 cursor-not-allowed" 
                              : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          )}
                          disabled={currentValue <= field.min}
                        >
                          <MinusCircle size={28} />
                        </button>
                        
                        <span className={cn(
                          "w-16 text-center font-medium text-xl",
                          hasError && "text-red-700"
                        )}>
                          {currentValue}
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => incrementCounter(field.fieldName, field.min, field.increment || 1)}
                          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
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
                    
                    {/* Field-specific error message */}
                    {hasError && (
                      <div className="flex items-center gap-2 text-red-600 text-sm max-w-md mx-auto">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          {field.id === 'bedrooms' && 'Au moins une chambre est requise'}
                          {field.id === 'adults' && 'Au moins un adulte est requis'}
                          {field.id === 'children' && 'Veuillez indiquer le nombre d\'enfants'}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Special Requirements Cards */}
        <div className="space-y-6">
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-6 text-center">{getSpecialNeedsTitle()}</h3>
            
            <div className="grid grid-cols-1 gap-6 max-w-[220px] mx-auto mt-10">
              {specialNeedCards.map((card) => {
                const isSelected = watch(card.fieldName) || false;
                
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => toggleSpecialNeed(card.fieldName)}
                    className={cn(
                      "group relative flex items-center p-3 rounded-lg transition-colors duration-300 ease-in-out",
                      isSelected
                        ? "border-2 border-primary bg-primary/5 shadow-md" 
                        : "bg-gray-100/90 hover:bg-gray-200/90"
                    )}
                    aria-pressed={isSelected}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mr-3 transition-all shrink-0",
                      isSelected 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    )}>
                      {card.icon}
                    </div>
                    
                    <h3 className="text-lg font-medium text-center">{card.name}</h3>
                    
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                        <Check size={14} />
                      </div>
                    )}
                    
                    <input
                      type="checkbox"
                      name={card.fieldName}
                      checked={isSelected}
                      onChange={() => toggleSpecialNeed(card.fieldName)}
                      className="sr-only"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 