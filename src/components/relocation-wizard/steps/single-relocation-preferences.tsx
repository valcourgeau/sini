import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Check, Home, Building2, Globe, Map, Plus } from "lucide-react";

interface SingleRelocationPreferencesProps {
  form: UseFormReturn<any>;
}

// Define distance taxonomy mapping for easier future adjustments
const DISTANCE_TAXONOMY = {
  QUARTIER: {
    id: "quartier",
    label: "Quartier",
    value: 5, // km
    subLabel: "0-5 km",
    description: "Walking distance"
  },
  VILLE: {
    id: "ville",
    label: "Ville",
    value: 10, // km
    subLabel: "5-10 km",
    description: "City limits"
  },
  CANTON: {
    id: "canton",
    label: "Canton",
    value: 20, // km
    subLabel: "10-20 km",
    description: "Cantonal area"
  },
  REGION: {
    id: "region",
    label: "Région",
    value: 25, // km
    subLabel: "max 25 km",
    description: "Regional area"
  }
};

export function SingleRelocationPreferences({ form }: SingleRelocationPreferencesProps) {
  const { register, setValue, getValues, formState: { errors } } = form;
  const preferencesErrors = errors.singleRelocationPreferences as Record<string, any> || {};
  
  // Get current selected distance value or default to Canton (20km)
  // TODO(Val): remove canton default
  const [selectedDistance, setSelectedDistance] = useState<number>(
    getValues("singleRelocationPreferences.maxDistance") || DISTANCE_TAXONOMY.CANTON.value
  );

  // Available distance options with icons
  const distanceOptions = [
    { 
      ...DISTANCE_TAXONOMY.QUARTIER,
      icon: <Home size={32} />,
    },
    { 
      ...DISTANCE_TAXONOMY.VILLE,
      icon: <Building2 size={32} />,
    },
    { 
      ...DISTANCE_TAXONOMY.CANTON,
      icon: <Map size={32} />,
    },
    { 
      ...DISTANCE_TAXONOMY.REGION,
      icon: <Globe size={32} />,
    }
  ];

  // Find a distance option by its value
  const findDistanceOption = (value: number) => {
    return distanceOptions.find(option => option.value === value);
  };

  // Function to handle distance selection
  const handleDistanceSelect = (value: number) => {
    const selectedOption = findDistanceOption(value);
    
    setSelectedDistance(value);
    
    // Store all relevant distance information in the form
    setValue("singleRelocationPreferences.maxDistance", value, { 
      shouldValidate: true, 
      shouldDirty: true,
      shouldTouch: true
    });
    
    if (selectedOption) {
      setValue("singleRelocationPreferences.distanceLabel", selectedOption.label, {
        shouldDirty: true
      });
      
      setValue("singleRelocationPreferences.distanceSubLabel", selectedOption.subLabel, {
        shouldDirty: true
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Relocation Preferences</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Please specify your preferences for the relocation, including maximum distance and preferred areas.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="singleRelocationPreferences.maxDistance" className="text-base font-medium">
            Maximum Distance from Current Location
          </Label>
          
          {/* Distance selection cards with updated styling to match special-needs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {distanceOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleDistanceSelect(option.value)}
                className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedDistance === option.value
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
                aria-pressed={selectedDistance === option.value}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
                  selectedDistance === option.value 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  {option.icon}
                </div>
                <h3 className="text-lg font-medium mb-1">{option.label}</h3>
                <p className="text-sm text-center text-muted-foreground mb-1">
                  {option.subLabel}
                </p>
                <p className="text-xs text-center text-muted-foreground">
                  {option.description}
                </p>
                
                {selectedDistance === option.value && (
                  <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                    <Check size={16} />
                  </div>
                )}
                
                <input
                  type="radio"
                  name="singleRelocationPreferences.maxDistance"
                  value={option.value}
                  checked={selectedDistance === option.value}
                  onChange={() => handleDistanceSelect(option.value)}
                  className="sr-only" // Hidden but keeps form functionality
                />
              </button>
            ))}
          </div>
          
          {/* Fixed TypeScript error for preferencesErrors.maxDistance */}
          {preferencesErrors.maxDistance && (
            <p className="text-sm text-red-500 mt-1">
              {preferencesErrors.maxDistance.message}
            </p>
          )}
        </div>

        <div className="space-y-2 mt-6">
          <Label htmlFor="singleRelocationPreferences.preferredAreas" className="text-base font-medium">
            Preferred Areas (Optional)
          </Label>
          <input
            id="singleRelocationPreferences.preferredAreas"
            {...register("singleRelocationPreferences.preferredAreas")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="E.g., Lausanne, Geneva, Zurich"
            defaultValue={form.watch("singleDisasterAddress.city") || ""}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter your preferred cities or areas, separated by commas.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Plus size={20} className="text-gray-500" />
            <Label htmlFor="singleRelocationPreferences.additionalNotes" className="text-base font-medium">
              Additional Preferences (Optional)
            </Label>
          </div>
          <textarea
            id="singleRelocationPreferences.additionalNotes"
            {...register("singleRelocationPreferences.additionalNotes")}
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Any additional preferences or requirements for your relocation"
          />
        </div>
      </div>
    </div>
  );
} 