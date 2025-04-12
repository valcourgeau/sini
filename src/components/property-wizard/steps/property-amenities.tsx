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
  Shirt,
  Droplet,
  Coffee,
  Home,
  Laptop,
  Lock,
  Snowflake,
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
    { id: "kitchen", name: "Kitchen", icon: Utensils },
    { id: "washer", name: "Washer", icon: Shirt },
    { id: "tv", name: "TV", icon: Tv },
    { id: "aircon", name: "Air Conditioning", icon: Snowflake },
    { id: "heating", name: "Heating", icon: Flame },
    { id: "accessibility", name: "Accessibility", icon: Accessibility }
  ];
  
  // Additional amenities for multi-select
  const additionalAmenities: AmenityOption[] = [
    { id: "pool", name: "Pool", icon: Waves },
    { id: "pets", name: "Pets Allowed", icon: Dog },
    { id: "workspace", name: "Workspace", icon: Laptop },
    { id: "bbq", name: "BBQ", icon: Flame },
    { id: "bikes", name: "Bikes", icon: Bike },
    { id: "securitycam", name: "Security Cameras", icon: Lock },
    { id: "coffee", name: "Coffee Machine", icon: Coffee },
    { id: "dishwasher", name: "Dishwasher", icon: Utensils },
    { id: "bathtub", name: "Bathtub", icon: Bath },
    { id: "shower", name: "Shower", icon: Droplet }
  ];
  
  // Accessibility features
  const accessibilityFeatures: AmenityOption[] = [
    { id: "wheelchair", name: "Wheelchair Access", icon: Accessibility },
    { id: "elevator", name: "Elevator", icon: Home },
    { id: "stepfree", name: "Step-free Entry", icon: Home }
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
      ? accessibilityFeatures.filter((featureId: string) => featureId !== id)
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
        <h2 className="text-xl font-semibold mb-2">Amenities and Services</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          What amenities and services do you offer in your property?
        </p>
      </div>

      {/* Essential amenities - Uses toggle cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Essential Amenities</h3>
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
        <h3 className="text-lg font-medium">Additional Amenities</h3>
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
          <h3 className="text-lg font-medium">Accessibility Features</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select all available accessibility features.
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