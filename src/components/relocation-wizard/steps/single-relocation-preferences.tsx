import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { 
  Check, 
  Bed, 
  Bath, 
  Users, 
  Baby, 
  PawPrint, 
  Accessibility, 
  Car as CarIcon,
  MinusCircle, 
  PlusCircle 
} from "lucide-react";
import { Input } from '@/components/ui/input';

interface SingleRelocationPreferencesProps {
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

interface SpecialNeedCard {
  id: string;
  name: string;
  icon: React.ReactNode;
  fieldName: string;
  description?: string;
}

export function SingleRelocationPreferences({ form }: SingleRelocationPreferencesProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const preferencesErrors = errors.singleRelocationPreferences || {};
  
  // Initialize numeric values if they are undefined
  const initializeNumericValues = () => {
    const fieldDefaults = {
      "singleRelocationPreferences.bedrooms": 1,
      "singleRelocationPreferences.bathrooms": 1,
      "singleRelocationPreferences.adults": 1,
      "singleRelocationPreferences.children": 0
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
      fieldName: "singleRelocationPreferences.bedrooms"
    },
    {
      id: "bathrooms",
      name: "Salles de bain",
      icon: <Bath size={24} />,
      min: 0,
      fieldName: "singleRelocationPreferences.bathrooms"
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

  // Function to toggle special need
  const toggleSpecialNeed = (fieldName: string) => {
    const currentValue = watch(fieldName) || false;
    setValue(fieldName, !currentValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Préférences de relogement</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Veuillez spécifier vos besoins pour le logement de relogement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Property Requirements */}
        <div className="space-y-6">
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-6 text-center">Besoins du logement</h3>
            
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
          </div>
        </div>

        {/* Right Column - Special Requirements Cards */}
        <div className="space-y-6">
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-6 text-center">Besoins particuliers</h3>
            
            <div className="grid grid-cols-1 gap-6 max-w-[220px] mx-auto mt-10">
              {specialNeedCards.map((card) => {
                const isSelected = watch(card.fieldName) || false;
                
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => toggleSpecialNeed(card.fieldName)}
                    className={cn(
                      "group relative flex items-center p-3 rounded-lg border-2 transition-all duration-200",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md" 
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
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