import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Check, Clock, Calendar, CalendarRange, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

interface SingleArrivalDetailsProps {
  form: UseFormReturn<any>;
  onValidationChange?: (isValid: boolean) => void;
  userType?: string | null;
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
  ({ form, onValidationChange, userType }, ref) => {
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
      icon: <Gauge size={28} /> 
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

  // Determine section titles and descriptions based on user type
  const getArrivalTitle = () => {
    if (userType === "sinistre") {
      return "Votre séjour";
    }
    return "Le séjour";
  };

  const getArrivalDescription = () => {
    if (userType === "sinistre") {
      return "Veuillez spécifier quand vous souhaitez emménager et la durée prévue de votre séjour.";
    }
    return "Veuillez spécifier quand la date d'emménagement et la durée prévue de votre séjour.";
  };

  const getArrivalDateLabel = () => {
    if (userType === "sinistre") {
      return "Quand souhaitez-vous emménager ?";
    }
    return "Date d'arrivée souhaitée";
  };

  const getDepartureDateLabel = () => {
    if (userType === "sinistre") {
      return "Quand prévoyez-vous de partir ?";
    }
    return "Date de départ";
  };

  const getDurationLabel = () => {
    if (userType === "sinistre") {
      return "Combien de temps prévoyez-vous de rester ?";
    }
    return "Durée estimée";
  };

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
    
    // Always check that arrival date is properly defined
    if (!arrivalData.arrivalDate || arrivalData.arrivalDate.trim().length === 0) {
      if (showMessage) {
        setValidationMessage("La date d'arrivée est obligatoire");
      }
      onValidationChange?.(false);
      return false;
    }
    
    // Validate that arrival date is not in the past
    const arrivalDate = new Date(arrivalData.arrivalDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison
    
    if (arrivalDate < today) {
      if (showMessage) {
        setValidationMessage("La date d'arrivée ne peut pas être dans le passé");
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
      
      // Validate that departure date is strictly later than arrival date
      const departureDate = new Date(arrivalData.departureDate);
      if (departureDate <= arrivalDate) {
        if (showMessage) {
          setValidationMessage("La date de départ doit être strictement postérieure à la date d'arrivée");
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

  // Function to handle arrival date change with validation
  const handleArrivalDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newArrivalDate = event.target.value;
    setValue("singleArrivalDetails.arrivalDate", newArrivalDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
    // Clear validation message when user makes a change
    setValidationMessage("");
    
    // If in exact dates mode and departure date exists, validate the relationship
    if (useExactDates && watch("singleArrivalDetails.departureDate")) {
      const departureDate = watch("singleArrivalDetails.departureDate");
      if (newArrivalDate && departureDate) {
        const arrival = new Date(newArrivalDate);
        const departure = new Date(departureDate);
        if (departure <= arrival) {
          setValidationMessage("La date de départ doit être strictement postérieure à la date d'arrivée");
          onValidationChange?.(false);
        } else {
          setValidationMessage("");
          onValidationChange?.(true);
        }
      }
    }
  };

  // Function to handle departure date change with validation
  const handleDepartureDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDepartureDate = event.target.value;
    setValue("singleArrivalDetails.departureDate", newDepartureDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
    // Clear validation message when user makes a change
    setValidationMessage("");
    
    // Validate against arrival date
    const arrivalDate = watch("singleArrivalDetails.arrivalDate");
    if (newDepartureDate && arrivalDate) {
      const arrival = new Date(arrivalDate);
      const departure = new Date(newDepartureDate);
      if (departure <= arrival) {
        setValidationMessage("La date de départ doit être strictement postérieure à la date d'arrivée");
        onValidationChange?.(false);
      } else {
        setValidationMessage("");
        onValidationChange?.(true);
      }
    }
  };

  // Watch for changes and validate
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.startsWith("singleArrivalDetails")) {
        validateForm();
        
        // Auto-update estimatedDuration when exact dates are used
        // Only update if the change is to arrival or departure date, not estimatedDuration itself
        if (useExactDates && (name === "singleArrivalDetails.arrivalDate" || name === "singleArrivalDetails.departureDate")) {
          const arrivalDate = watch("singleArrivalDetails.arrivalDate");
          const departureDate = watch("singleArrivalDetails.departureDate");
          
          if (arrivalDate && departureDate) {
            const nights = getNumberOfNights(arrivalDate, departureDate);
            if (nights !== null) {
              const newDuration = `${nights} nuits`;
              const currentDuration = watch("singleArrivalDetails.estimatedDuration");
              
              // Only update if the value is different to prevent infinite loop
              if (currentDuration !== newDuration) {
                setValue("singleArrivalDetails.estimatedDuration", newDuration, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true
                });
              }
            }
          }
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [watch, useExactDates, setValue]);

  // Expose validation method to parent
  useImperativeHandle(ref, () => ({
    validate: () => validateForm(true)
  }));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">{getArrivalTitle()}</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto whitespace-nowrap">
          {getArrivalDescription()}
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
                  {getArrivalDateLabel()} <span className="text-red-500">*</span>
                </Label>
                <div>
                  <input
                    id="singleArrivalDetails.arrivalDate"
                    type="date"
                    min={tomorrowStr}
                    lang="fr"
                    value={watch("singleArrivalDetails.arrivalDate") || ""}
                    onChange={handleArrivalDateChange}
                    className="w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  {getDepartureDateLabel()} <span className="text-red-500">*</span>
                </Label>
                <div>
                  <input
                    id="singleArrivalDetails.departureDate"
                    type="date"
                    min={minDepartureDateStr}
                    lang="fr"
                    value={watch("singleArrivalDetails.departureDate") || ""}
                    onChange={handleDepartureDateChange}
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
                {getArrivalDateLabel()} <span className="text-red-500">*</span>
              </Label>
              <div>
                <input
                  id="singleArrivalDetails.arrivalDate"
                  type="date"
                  min={tomorrowStr}
                  lang="fr"
                  value={watch("singleArrivalDetails.arrivalDate") || ""}
                  onChange={handleArrivalDateChange}
                  className="w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {arrivalErrors.arrivalDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {arrivalErrors.arrivalDate.message}
                  </p>
                )}
              </div>
            </div>
          )}
          {/* Number of nights info for exact dates */}
          {useExactDates && getNumberOfNights(watch("singleArrivalDetails.arrivalDate"), watch("singleArrivalDetails.departureDate")) !== null && (
            <p className="text-xs text-primary font-medium mt-1">
              Durée du séjour : {getNumberOfNights(watch("singleArrivalDetails.arrivalDate"), watch("singleArrivalDetails.departureDate"))} nuits.
            </p>
          )}
        </div>

        {!useExactDates && (
          <div className="space-y-4 mt-6">
            <Label htmlFor="singleArrivalDetails.estimatedDuration" className="text-base font-medium">
              {getDurationLabel()} <span className="text-red-500">*</span>
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
          </div>
        )}
      </div>
      
      {/* Validation message at the bottom */}
      {validationMessage && (
        <div className="mt-6">
          <p className="text-sm text-red-600 font-medium text-center">
            {validationMessage}
          </p>
        </div>
      )}
    </div>
  );
}); 