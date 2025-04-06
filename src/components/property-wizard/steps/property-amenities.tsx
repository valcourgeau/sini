import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Wifi,
  Car,
  Utensils,
  Tv,
  Wind,
  Flame,
  Waves,
  Bath,
  Accessibility,
  Check,
  Washer,
  Shower,
  Coffee,
  Home,
  Laptop,
  Lock,
  Snowflake,
  SwimmingPool,
  Dog,
  Bike,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface PropertyAmenitiesProps {
  form: UseFormReturn<any>;
}

type AmenityOption = {
  id: string;
  name: string;
  icon: LucideIcon;
  description?: string;
};

export function PropertyAmenities({ form }: PropertyAmenitiesProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  
  // Get the current amenities from the form
  const amenities = watch("propertyAmenities") || {};
  
  // State for selected amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    amenities.features || []
  );
  
  // Essential amenities with boolean toggles
  const essentialAmenities: AmenityOption[] = [
    { id: "wifi", name: "WiFi", icon: Wifi },
    { id: "parking", name: "Parking", icon: Car },
    { id: "kitchen", name: "Cuisine", icon: Utensils },
    { id: "washer", name: "Lave-linge", icon: Washer },
    { id: "tv", name: "Télévision", icon: Tv },
    { id: "aircon", name: "Climatisation", icon: Snowflake },
    { id: "heating", name: "Chauffage", icon: Flame },
    { id: "accessibility", name: "Accessibilité", icon: Accessibility }
  ];
  
  // Additional amenities for multi-select
  const additionalAmenities: AmenityOption[] = [
    { id: "pool", name: "Piscine", icon: SwimmingPool },
    { id: "pets", name: "Animaux acceptés", icon: Dog },
    { id: "workspace", name: "Espace de travail", icon: Laptop },
    { id: "bbq", name: "Barbecue", icon: Flame },
    { id: "bikes", name: "Vélos", icon: Bike },
    { id: "securitycam", name: "Caméras de sécurité", icon: Lock },
    { id: "coffee", name: "Machine à café", icon: Coffee },
    { id: "dishwasher", name: "Lave-vaisselle", icon: Utensils },
    { id: "bathtub", name: "Baignoire", icon: Bath },
    { id: "shower", name: "Douche", icon: Shower }
  ];
  
  // Accessibility features
  const accessibilityFeatures: AmenityOption[] = [
    { id: "wheelchair", name: "Accès fauteuil roulant", icon: Accessibility },
    { id: "elevator", name: "Ascenseur", icon: Home },
    { id: "stepfree", name: "Entrée sans marches", icon: Home }
  ];

  // Function to toggle essential amenities (true/false)
  const toggleEssentialAmenity = (id: string) => {
    const fieldName = `propertyAmenities.has${id.charAt(0).toUpperCase() + id.slice(1)}`;
    const currentValue = watch(fieldName) || false;
    
    // Toggle the value
    setValue(fieldName, !currentValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };
  
  // Function to toggle additional amenities (array of strings)
  const toggleAdditionalAmenity = (id: string) => {
    const newSelectedAmenities = selectedAmenities.includes(id)
      ? selectedAmenities.filter(amenityId => amenityId !== id)
      : [...selectedAmenities, id];
    
    setSelectedAmenities(newSelectedAmenities);
    
    // Update the form value
    setValue("propertyAmenities.features", newSelectedAmenities, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };
  
  // Function to toggle accessibility features
  const toggleAccessibilityFeature = (id: string) => {
    const accessibilityFeatures = watch("propertyAmenities.accessibilityFeatures") || [];
    
    const newFeatures = accessibilityFeatures.includes(id)
      ? accessibilityFeatures.filter(featureId => featureId !== id)
      : [...accessibilityFeatures, id];
    
    setValue("propertyAmenities.accessibilityFeatures", newFeatures, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };
  
  // Initialize accessibilityFeatures array if it doesn't exist
  useEffect(() => {
    if (!watch("propertyAmenities.accessibilityFeatures")) {
      setValue("propertyAmenities.accessibilityFeatures", [], {
        shouldValidate: false
      });
    }
  }, [setValue, watch]);

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Équipements et services</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Quels équipements et services proposez-vous dans votre logement?
        </p>
      </div>

      {/* Essential amenities - Uses toggle cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Équipements essentiels</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {essentialAmenities.map((amenity) => {
            const fieldName = `propertyAmenities.has${amenity.id.charAt(0).toUpperCase() + amenity.id.slice(1)}`;
            const isSelected = watch(fieldName) || false;
            
            return (
              <button
                key={amenity.id}
                type="button"
                onClick={() => toggleEssentialAmenity(amenity.id)}
                className={cn(
                  "group relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                )}
                aria-pressed={isSelected}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all",
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                )}>
                  <amenity.icon size={24} />
                </div>
                <h4 className="text-base font-medium">{amenity.name}</h4>
                
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                    <Check size={14} />
                  </div>
                )}
                
                <input
                  type="checkbox"
                  {...register(fieldName)}
                  checked={isSelected}
                  onChange={() => {}}
                  className="sr-only" // Hidden but keeps form functionality
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Additional amenities - Uses multi-select cards */}
      <div className="space-y-4 mt-8">
        <h3 className="text-lg font-medium">Équipements supplémentaires</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {additionalAmenities.map((amenity) => {
            const isSelected = selectedAmenities.includes(amenity.id);
            
            return (
              <button
                key={amenity.id}
                type="button"
                onClick={() => toggleAdditionalAmenity(amenity.id)}
                className={cn(
                  "group relative flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                )}
                aria-pressed={isSelected}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all",
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                )}>
                  <amenity.icon size={20} />
                </div>
                <h4 className="text-sm font-medium text-center">{amenity.name}</h4>
                
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                    <Check size={12} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessibility features - Only shown if accessibility is selected in essential amenities */}
      {watch("propertyAmenities.hasAccessibility") && (
        <div className="space-y-4 mt-8 border-t pt-8">
          <h3 className="text-lg font-medium">Caractéristiques d'accessibilité</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sélectionnez toutes les caractéristiques d'accessibilité disponibles.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accessibilityFeatures.map((feature) => {
              const accessibilityFeaturesList = watch("propertyAmenities.accessibilityFeatures") || [];
              const isSelected = accessibilityFeaturesList.includes(feature.id);
              
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => toggleAccessibilityFeature(feature.id)}
                  className={cn(
                    "group relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  )}
                  aria-pressed={isSelected}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all",
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  )}>
                    <feature.icon size={24} />
                  </div>
                  <h4 className="text-base font-medium text-center">{feature.name}</h4>
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                      <Check size={14} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 