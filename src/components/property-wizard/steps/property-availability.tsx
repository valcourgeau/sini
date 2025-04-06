import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyAvailabilityProps {
  form: UseFormReturn<any>;
}

export function PropertyAvailability({ form }: PropertyAvailabilityProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const availabilityErrors = errors.propertyAvailability || {};
  
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

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Disponibilité du logement</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Quand votre logement est-il disponible et pour combien de temps?
        </p>
      </div>

      <div className="space-y-6">
        {/* Date fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Available from */}
          <div className="space-y-2">
            <Label 
              htmlFor="propertyAvailability.availableFrom" 
              className="text-base font-medium flex items-center gap-2"
            >
              <Calendar size={18} className="text-gray-500" />
              Disponible à partir du
            </Label>
            <Input
              id="propertyAvailability.availableFrom"
              type="date"
              {...register("propertyAvailability.availableFrom")}
              className={cn(
                availabilityErrors.availableFrom && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {availabilityErrors.availableFrom && (
              <p className="text-sm text-red-500 mt-1">
                {availabilityErrors.availableFrom.message}
              </p>
            )}
          </div>
          
          {/* Available to (optional) */}
          <div className="space-y-2">
            <Label 
              htmlFor="propertyAvailability.availableTo" 
              className="text-base font-medium flex items-center gap-2"
            >
              <Calendar size={18} className="text-gray-500" />
              Disponible jusqu'au (optionnel)
            </Label>
            <Input
              id="propertyAvailability.availableTo"
              type="date"
              {...register("propertyAvailability.availableTo")}
              className={cn(
                availabilityErrors.availableTo && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {availabilityErrors.availableTo && (
              <p className="text-sm text-red-500 mt-1">
                {availabilityErrors.availableTo.message}
              </p>
            )}
          </div>
        </div>
        
        {/* Duration fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t">
          <div className="space-y-2">
            <Label 
              htmlFor="propertyAvailability.minStay" 
              className="text-base font-medium flex items-center gap-2"
            >
              <Clock size={18} className="text-gray-500" />
              Durée minimale de séjour (jours)
            </Label>
            <Input
              id="propertyAvailability.minStay"
              type="number"
              min="1"
              defaultValue="1"
              {...register("propertyAvailability.minStay", { valueAsNumber: true })}
              className={cn(
                availabilityErrors.minStay && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {availabilityErrors.minStay && (
              <p className="text-sm text-red-500 mt-1">
                {availabilityErrors.minStay.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label 
              htmlFor="propertyAvailability.maxStay" 
              className="text-base font-medium flex items-center gap-2"
            >
              <Clock size={18} className="text-gray-500" />
              Durée maximale de séjour (jours, optionnel)
            </Label>
            <Input
              id="propertyAvailability.maxStay"
              type="number"
              min="1"
              {...register("propertyAvailability.maxStay", { valueAsNumber: true })}
              className={cn(
                availabilityErrors.maxStay && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {availabilityErrors.maxStay && (
              <p className="text-sm text-red-500 mt-1">
                {availabilityErrors.maxStay.message}
              </p>
            )}
          </div>
        </div>
        
        {/* Flexibility option */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-medium mb-4">Flexibilité</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Êtes-vous flexible sur les dates d'entrée et de sortie?
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
                <Calendar size={16} />
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