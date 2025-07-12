import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Check, Clock, Calendar, CalendarRange } from "lucide-react";
import { cn } from "@/lib/utils";

interface SingleArrivalDetailsProps {
  form: UseFormReturn<any>;
  onValidationChange?: (isValid: boolean) => void;
}

export interface SingleArrivalDetailsRef {
  validate: () => boolean;
}

// Define a type for the error object structure
interface ArrivalErrors {
  arrivalDate?: {
    message?: string;
  };
  departureDate?: {
    message?: string;
  };
  estimatedDuration?: {
    message?: string;
  };
}

export const SingleArrivalDetails = forwardRef<SingleArrivalDetailsRef, SingleArrivalDetailsProps>(
  ({ form, onValidationChange }, ref) => {
  const { register, setValue, watch, formState: { errors }, trigger } = form;
  // Type assertion to handle errors properly
  const arrivalErrors = (errors.singleArrivalDetails || {}) as ArrivalErrors;
  
  // Get the current value or default to the first option
  const currentDuration = form.watch("singleArrivalDetails.estimatedDuration");
  // State to track selected duration
  const [selectedDuration, setSelectedDuration] = useState(currentDuration);
  
  // Watch for useExactDates value
  const useExactDates = watch("singleArrivalDetails.useExactDates") ?? true;
  
  // State for validation messages
  const [validationMessage, setValidationMessage] = useState<string>("");
  
  // Duration options with icons and labels
  const durationOptions = [
    { 
      id: "short-term", 
      value: "Quelques jours", 
      label: "Quelques jours",
      subLabel: "Séjour urgent et court",
      icon: <Clock size={28} />
    },
    { 
      id: "few-weeks", 
      value: "Quelques semaines", 
      label: "Quelques semaines",
      subLabel: "Séjour temporaire",
      icon: <Clock size={28} />
    },
    { 
      id: "few-months", 
      value: "Quelques mois", 
      label: "Quelques mois",
      subLabel: "Logement transitoire",
      icon: <Calendar size={28} />
    },
  ];

  // Calculate tomorrow's date for the min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Get the arrival date for the departure date minimum
  const arrivalDate = watch("singleArrivalDetails.arrivalDate") || tomorrowStr;
  const minDepartureDate = new Date(arrivalDate);
  minDepartureDate.setDate(minDepartureDate.getDate() + 1);
  const minDepartureDateStr = minDepartureDate.toISOString().split('T')[0];

  // Helper to compute number of nights between two dates
  /**
   * Returns the number of nights between two ISO date strings.
   * @param arrival ISO date string (YYYY-MM-DD)
   * @param departure ISO date string (YYYY-MM-DD)
   * @returns number of nights (integer >= 0), or null if invalid
   */
  const getNumberOfNights = (arrival?: string, departure?: string): number | null => {
    if (!arrival || !departure) return null;
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    if (isNaN(arrivalDate.getTime()) || isNaN(departureDate.getTime())) return null;
    const diff = departureDate.getTime() - arrivalDate.getTime();
    const nights = Math.round(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  // Function to validate the form and set validation message
  const validateForm = (showMessage = true) => {
    const arrivalData = form.getValues("singleArrivalDetails");
    
    if (!arrivalData) {
      if (showMessage) {
        setValidationMessage("Veuillez remplir les détails d'arrivée");
      }
      onValidationChange?.(false);
      return false;
    }
    
    if (useExactDates) {
      // Check departure date for exact dates
      if (!arrivalData.departureDate || arrivalData.departureDate.trim().length === 0) {
        if (showMessage) {
          setValidationMessage("La date de départ est requise lorsque vous sélectionnez des dates exactes");
        }
        onValidationChange?.(false);
        return false;
      }
    } else {
      // Check estimated duration for flexible dates
      if (!arrivalData.estimatedDuration || arrivalData.estimatedDuration.trim().length === 0) {
        if (showMessage) {
          setValidationMessage("Veuillez sélectionner une durée estimée");
        }
        onValidationChange?.(false);
        return false;
      }
    }
    
    if (showMessage) {
      setValidationMessage("");
    }
    onValidationChange?.(true);
    return true;
  };

  // Function to handle duration selection
  const handleDurationSelect = (value: string) => {
    setSelectedDuration(value);
    
    // Store duration in the form
    setValue("singleArrivalDetails.estimatedDuration", value, { 
      shouldValidate: true, 
      shouldDirty: true,
      shouldTouch: true
    });
    
    // Clear validation message when user makes a selection
    setValidationMessage("");
  };

  // Function to handle date type selection
  const handleDateTypeSelect = (useExact: boolean) => {
    setValue("singleArrivalDetails.useExactDates", useExact, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
    // Clear validation message when user changes date type
    setValidationMessage("");
    
    // If switching to exact dates, trigger validation immediately
    if (useExact) {
      setTimeout(() => {
        form.trigger("singleArrivalDetails");
      }, 100);
    }
  };

  // Watch for changes and validate
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.startsWith("singleArrivalDetails")) {
        validateForm();
      }
    });
    
    return () => subscription.unsubscribe();
  }, [watch, useExactDates]);

  // Expose validation method to parent
  useImperativeHandle(ref, () => ({
    validate: () => validateForm(true)
  }));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Détails d'arrivée</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto whitespace-nowrap">
          Veuillez spécifier quand vous souhaitez emménager et la durée prévue de votre séjour.
        </p>
      </div>

      <div className="space-y-6">
        {/* Date Type Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Exact Dates Card */}
          <button
            type="button"
            onClick={() => handleDateTypeSelect(true)}
            className={cn(
              "group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 w-full",
              useExactDates
                ? "border-primary bg-primary/5 shadow-md" 
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            )}
            aria-pressed={useExactDates}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all",
              useExactDates 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
            )}>
              <CalendarRange size={32} />
            </div>
            <h3 className="text-lg font-medium mb-1">Dates exactes</h3>
            
            {useExactDates && (
              <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                <Check size={16} />
              </div>
            )}
          </button>

          {/* Estimated Duration Card */}
          <button
            type="button"
            onClick={() => handleDateTypeSelect(false)}
            className={cn(
              "group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 w-full",
              !useExactDates
                ? "border-primary bg-primary/5 shadow-md" 
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            )}
            aria-pressed={!useExactDates}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all",
              !useExactDates 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
            )}>
              <Clock size={32} />
            </div>
            <h3 className="text-lg font-medium mb-1">Dates flexibles</h3>
            
            {!useExactDates && (
              <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                <Check size={16} />
              </div>
            )}
          </button>
        </div>

        {/* Date fields */}
        <div className="space-y-4">
          {useExactDates ? (
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <Label htmlFor="singleArrivalDetails.arrivalDate" className="text-base font-medium whitespace-nowrap">
                  Date d'arrivée souhaitée <span className="text-red-500">*</span>
                </Label>
                <div>
                  <input
                    id="singleArrivalDetails.arrivalDate"
                    type="date"
                    min={tomorrowStr}
                    lang="fr"
                    {...register("singleArrivalDetails.arrivalDate")}
                    className="w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={tomorrowStr}
                  />
                  {arrivalErrors.arrivalDate && (
                    <p className="text-sm text-red-500 mt-1">
                      {arrivalErrors.arrivalDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="singleArrivalDetails.departureDate" className="text-base font-medium whitespace-nowrap">
                  Date de départ <span className="text-red-500">*</span>
                </Label>
                <div>
                  <input
                    id="singleArrivalDetails.departureDate"
                    type="date"
                    min={minDepartureDateStr}
                    lang="fr"
                    {...register("singleArrivalDetails.departureDate")}
                    className="w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  {arrivalErrors.departureDate && (
                    <p className="text-sm text-red-500 mt-1">
                      {arrivalErrors.departureDate.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Label htmlFor="singleArrivalDetails.arrivalDate" className="text-base font-medium whitespace-nowrap">
                Date d'arrivée souhaitée <span className="text-red-500">*</span>
              </Label>
              <div>
                <input
                  id="singleArrivalDetails.arrivalDate"
                  type="date"
                  min={tomorrowStr}
                  lang="fr"
                  {...register("singleArrivalDetails.arrivalDate")}
                  className="w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={tomorrowStr}
                />
                {arrivalErrors.arrivalDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {arrivalErrors.arrivalDate.message}
                  </p>
                )}
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground -mt-2">
            La date la plus proche à laquelle vous auriez besoin d'emménager dans le nouveau logement.
          </p>
          {/* Number of nights info for exact dates */}
          {useExactDates && getNumberOfNights(watch("singleArrivalDetails.arrivalDate"), watch("singleArrivalDetails.departureDate")) !== null && (
            <p className="text-xs text-primary font-medium mt-1">
              Nombre de nuits : {getNumberOfNights(watch("singleArrivalDetails.arrivalDate"), watch("singleArrivalDetails.departureDate"))}
            </p>
          )}
        </div>

        {!useExactDates && (
          <div className="space-y-4 mt-6">
            <Label htmlFor="singleArrivalDetails.estimatedDuration" className="text-base font-medium">
              Durée estimée <span className="text-red-500">*</span>
            </Label>
            
            {/* Duration selection cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {durationOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleDurationSelect(option.value)}
                  className={cn(
                    "group relative flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200",
                    selectedDuration === option.value
                      ? "border-primary bg-primary/5 shadow-md" 
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  )}
                  aria-pressed={selectedDuration === option.value}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all",
                    selectedDuration === option.value 
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  )}>
                    {option.icon}
                  </div>
                  <h3 className="text-base font-medium mb-0.5">{option.label}</h3>
                  <p className="text-xs text-center text-muted-foreground">
                    {option.subLabel}
                  </p>
                  
                  {selectedDuration === option.value && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                      <Check size={14} />
                    </div>
                  )}
                  
                  <input
                    type="radio"
                    name="singleArrivalDetails.estimatedDuration"
                    value={option.value}
                    checked={selectedDuration === option.value}
                    onChange={() => handleDurationSelect(option.value)}
                    className="sr-only"
                  />
                </button>
              ))}
            </div>
            
            {arrivalErrors.estimatedDuration && (
              <p className="text-sm text-destructive mt-1">
                {arrivalErrors.estimatedDuration.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Combien de temps prévoyez-vous d'avoir besoin du logement ? Cela nous aide à trouver les options les plus adaptées.
            </p>
          </div>
        )}
      </div>
      
      {/* Validation message at the bottom */}
      {validationMessage && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-medium text-center">
            {validationMessage}
          </p>
        </div>
      )}
    </div>
  );
}); 