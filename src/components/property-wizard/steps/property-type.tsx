import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";
import { Building, Home, Hotel, Building2, HelpCircle, Check, BedDouble } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyTypeProps {
  form: UseFormReturn<any>;
}

type PropertyTypeOption = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
};

export function PropertyType({ form }: PropertyTypeProps) {
  const { setValue, watch, formState: { errors, isDirty } } = form;
  
  // Get the current property type from the form
  const propertyType = watch("propertyType");
  
  // Log when property type changes for debugging
  useEffect(() => {
    console.log("Property type selected:", propertyType);
  }, [propertyType]);
  
  // Define the property type options
  const propertyTypes: PropertyTypeOption[] = [
    {
      id: "apartment",
      name: "Appartement",
      description: "Un logement dans un immeuble",
      icon: <Building size={32} />
    },
    {
      id: "house",
      name: "Maison",
      description: "Une maison individuelle ou mitoyenne",
      icon: <Home size={32} />
    },
    // {
    //   id: "room",
    //   name: "Private Room",
    //   description: "A room in a shared accommodation",
    //   icon: <BedDouble size={32} />
    // },
    {
      id: "studio",
      name: "Studio",
      description: "Un espace de vie en une seule pièce",
      icon: <Building2 size={32} />
    },
    // {
    //   id: "other",
    //   name: "Other",
    //   description: "Another type of accommodation",
    //   icon: <HelpCircle size={32} />
    // }
  ];

  // Function to handle selection of property type
  const handlePropertyTypeSelect = (id: string) => {
    console.log("Selecting property type:", id);
    setValue("propertyType", id, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
    // Force validation after setting the value
    setTimeout(() => {
      form.trigger("propertyType");
    }, 0);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Quel type de bien proposez-vous ?</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Sélectionnez le type de bien que vous souhaitez rendre disponible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {propertyTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => handlePropertyTypeSelect(type.id)}
            className={cn(
              "group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200",
              propertyType === type.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            )}
            aria-pressed={propertyType === type.id}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all",
              propertyType === type.id
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
            )}>
              {type.icon}
            </div>
            <h3 className="text-lg font-medium mb-1">{type.name}</h3>
            <p className="text-sm text-center text-muted-foreground">
              {type.description}
            </p>
            
            {propertyType === type.id && (
              <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                <Check size={16} />
              </div>
            )}
            
            <input
              type="radio"
              name="propertyType"
              value={type.id}
              checked={propertyType === type.id}
              onChange={() => handlePropertyTypeSelect(type.id)}
              className="sr-only" // Hidden but keeps form functionality
            />
          </button>
        ))}
      </div>
      
      {errors.propertyType && (
        <p className="text-sm text-red-500 mt-1">
          Veuillez sélectionner un type de bien
        </p>
      )}
    </div>
  );
} 