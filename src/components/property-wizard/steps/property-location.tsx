import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyLocationProps {
  form: UseFormReturn<any>;
}

interface PropertyLocationErrors {
  street?: { message?: string };
  city?: { message?: string };
  postalCode?: { message?: string };
  canton?: { message?: string };
  country?: { message?: string };
  showExactLocation?: { message?: string };
}

const swissCantons = [
  { value: "geneve", label: "Geneva" },
  { value: "vaud", label: "Vaud" },
  { value: "neuchatel", label: "Neuchâtel" },
  { value: "fribourg", label: "Fribourg" },
  { value: "valais", label: "Valais" },
  { value: "berne", label: "Bern" },
  { value: "jura", label: "Jura" },
  { value: "zurich", label: "Zurich" },
  { value: "bale", label: "Basel" },
  { value: "tessin", label: "Ticino" }
];

export function PropertyLocation({ form }: PropertyLocationProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const locationErrors = (errors.propertyLocation || {}) as PropertyLocationErrors;
  
  // Watch if show exact location is selected
  const showExactLocation = watch("propertyLocation.showExactLocation");
  
  // Toggle show exact location
  const toggleShowExactLocation = (value: boolean) => {
    setValue("propertyLocation.showExactLocation", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Property Location</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Please provide the exact address of your property.
        </p>
      </div>

      <div className="space-y-6">
        {/* Address fields */}
        <div className="grid grid-cols-1 gap-6">
          {/* Street */}
          <div className="space-y-2">
            <Label 
              htmlFor="propertyLocation.street" 
              className="text-base font-medium"
            >
              Property Address
            </Label>
            <Input
              id="propertyLocation.street"
              {...register("propertyLocation.street")}
              placeholder="Ex: Mont-Blanc Street 18"
              defaultValue="18 Rue du Lac"
              className={cn(
                locationErrors.street && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {locationErrors.street && (
              <p className="text-sm text-red-500 mt-1">
                {locationErrors.street.message}
              </p>
            )}
          </div>
          
          {/* City, Postal Code and Canton in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City */}
            <div className="space-y-2">
              <Label 
                htmlFor="propertyLocation.city" 
                className="text-base font-medium"
              >
                City
              </Label>
              <Input
                id="propertyLocation.city"
                {...register("propertyLocation.city")}
                placeholder="Ex: Geneva"
                defaultValue="Geneva"
                className={cn(
                  locationErrors.city && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {locationErrors.city && (
                <p className="text-sm text-red-500 mt-1">
                  {locationErrors.city.message}
                </p>
              )}
            </div>
            
            {/* Postal Code */}
            <div className="space-y-2">
              <Label 
                htmlFor="propertyLocation.postalCode" 
                className="text-base font-medium"
              >
                Postal Code
              </Label>
              <Input
                id="propertyLocation.postalCode"
                {...register("propertyLocation.postalCode")}
                placeholder="Ex: 1201"
                defaultValue="1201"
                className={cn(
                  locationErrors.postalCode && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {locationErrors.postalCode && (
                <p className="text-sm text-red-500 mt-1">
                  {locationErrors.postalCode.message}
                </p>
              )}
            </div>
            
            {/* Canton */}
            <div className="space-y-2">
              <Label 
                htmlFor="propertyLocation.canton" 
                className="text-base font-medium"
              >
                Canton
              </Label>
              <select
                id="propertyLocation.canton"
                {...register("propertyLocation.canton")}
                defaultValue="geneve"
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  locationErrors.canton && "border-red-500 focus-visible:ring-red-500"
                )}
              >
                <option value="">Select a canton</option>
                {swissCantons.map((canton) => (
                  <option key={canton.value} value={canton.value}>
                    {canton.label}
                  </option>
                ))}
              </select>
              {locationErrors.canton && (
                <p className="text-sm text-red-500 mt-1">
                  {locationErrors.canton.message}
                </p>
              )}
            </div>
          </div>
          
          {/* Country */}
          <div className="space-y-2">
            <Label 
              htmlFor="propertyLocation.country" 
              className="text-base font-medium"
            >
              Country
            </Label>
            <Input
              id="propertyLocation.country"
              defaultValue="Switzerland"
              {...register("propertyLocation.country")}
              className={cn(
                locationErrors.country && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {locationErrors.country && (
              <p className="text-sm text-red-500 mt-1">
                {locationErrors.country.message}
              </p>
            )}
          </div>
        </div>
        
        {/* Show exact location toggle */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Address Visibility</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Do you want your exact address to be visible to interested individuals?
          </p>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => toggleShowExactLocation(true)}
              className={cn(
                "flex-1 group relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                showExactLocation === true
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
              aria-pressed={showExactLocation === true}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all",
                showExactLocation === true
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              )}>
                <MapPin size={16} />
              </div>
              <span className="font-medium">Show exact address</span>
              
              {showExactLocation === true && (
                <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                  <Check size={16} />
                </div>
              )}
              
              <input
                type="radio"
                name="propertyLocation.showExactLocation"
                checked={showExactLocation === true}
                onChange={() => {}}
                className="sr-only" // Hidden but keeps form functionality
              />
            </button>
            
            <button
              type="button"
              onClick={() => toggleShowExactLocation(false)}
              className={cn(
                "flex-1 group relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                showExactLocation === false
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
              aria-pressed={showExactLocation === false}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all",
                showExactLocation === false
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              )}>
                <MapPin size={16} />
              </div>
              <span className="font-medium">Show only the neighborhood</span>
              
              {showExactLocation === false && (
                <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                  <Check size={16} />
                </div>
              )}
              
              <input
                type="radio"
                name="propertyLocation.showExactLocation"
                checked={showExactLocation === false}
                onChange={() => {}}
                className="sr-only" // Hidden but keeps form functionality
              />
            </button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            <strong>Note:</strong> Even if you only show the neighborhood publicly, the exact address will be shared with the interested person once you have accepted their request.
          </p>
        </div>
      </div>
    </div>
  );
} 