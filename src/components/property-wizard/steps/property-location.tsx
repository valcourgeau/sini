import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyLocationProps {
  form: UseFormReturn<any>;
}

const swissCantons = [
  { value: "geneve", label: "Genève" },
  { value: "vaud", label: "Vaud" },
  { value: "neuchatel", label: "Neuchâtel" },
  { value: "fribourg", label: "Fribourg" },
  { value: "valais", label: "Valais" },
  { value: "berne", label: "Berne" },
  { value: "jura", label: "Jura" },
  { value: "zurich", label: "Zürich" },
  { value: "bale", label: "Bâle" },
  { value: "tessin", label: "Tessin" }
];

export function PropertyLocation({ form }: PropertyLocationProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const locationErrors = errors.propertyLocation || {};
  
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
        <h2 className="text-xl font-semibold mb-2">Localisation du logement</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Veuillez indiquer l'adresse précise de votre logement.
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
              Rue et numéro
            </Label>
            <Input
              id="propertyLocation.street"
              {...register("propertyLocation.street")}
              placeholder="Ex: Rue du Mont-Blanc 18"
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
                Ville
              </Label>
              <Input
                id="propertyLocation.city"
                {...register("propertyLocation.city")}
                placeholder="Ex: Genève"
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
                Code postal
              </Label>
              <Input
                id="propertyLocation.postalCode"
                {...register("propertyLocation.postalCode")}
                placeholder="Ex: 1201"
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
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  locationErrors.canton && "border-red-500 focus-visible:ring-red-500"
                )}
              >
                <option value="">Sélectionnez un canton</option>
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
              Pays
            </Label>
            <Input
              id="propertyLocation.country"
              defaultValue="Suisse"
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
          <h3 className="text-lg font-medium mb-4">Visibilité de l'adresse</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Souhaitez-vous que votre adresse exacte soit visible par les personnes intéressées?
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
              <span className="font-medium">Montrer l'adresse exacte</span>
              
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
              <span className="font-medium">Montrer uniquement le quartier</span>
              
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
            <strong>Note:</strong> Même si vous ne montrez que le quartier publiquement, l'adresse exacte sera partagée avec la personne intéressée une fois que vous aurez accepté sa demande.
          </p>
        </div>
      </div>
    </div>
  );
} 