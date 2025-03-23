import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const preferencesErrors = errors.singleRelocationPreferences || {};
  
  // Get current selected distance value or default to Canton (20km)
  // TODO(Val): remove canton default
  const [selectedDistance, setSelectedDistance] = useState<number>(
    getValues("singleRelocationPreferences.maxDistance") || DISTANCE_TAXONOMY.CANTON.value
  );

  // Available distance options with icons
  const distanceOptions = [
    { 
      ...DISTANCE_TAXONOMY.QUARTIER,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    { 
      ...DISTANCE_TAXONOMY.VILLE,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      ),
    },
    { 
      ...DISTANCE_TAXONOMY.CANTON,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-indigo-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
        </svg>
      ),
    },
    { 
      ...DISTANCE_TAXONOMY.REGION,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-purple-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159-.69-.159-1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      ),
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
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Relocation Preferences</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please specify your preferences for the relocation, including maximum distance and preferred areas.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="singleRelocationPreferences.maxDistance">Maximum Distance from Current Location</Label>
          
          {/* Airbnb-style card grid for distance selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {distanceOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleDistanceSelect(option.value)}
                className={cn(
                  "flex flex-col items-center text-center p-5 rounded-xl border-2 transition-all duration-200",
                  "hover:shadow-md hover:border-gray-300",
                  selectedDistance === option.value
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200"
                )}
              >
                <div className="mb-3">{option.icon}</div>
                <h3 className="text-base font-medium mb-1">{option.label}</h3>
                <p className="text-xs font-medium text-blue-600 mb-2">
                  {option.subLabel}
                </p>
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
              </button>
            ))}
          </div>
          
          {preferencesErrors.maxDistance && (
            <p className="text-sm text-red-500 mt-1">
              {preferencesErrors.maxDistance?.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="singleRelocationPreferences.preferredAreas">Preferred Areas (Optional)</Label>
          <input
            id="singleRelocationPreferences.preferredAreas"
            {...register("singleRelocationPreferences.preferredAreas")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="E.g., Lausanne, Geneva, Zurich"
            defaultValue="Geneva"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter your preferred cities or areas, separated by commas.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="singleRelocationPreferences.additionalNotes">Additional Preferences (Optional)</Label>
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