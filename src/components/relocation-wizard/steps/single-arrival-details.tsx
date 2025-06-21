import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Check, Clock, Calendar, HelpCircle, CalendarRange } from "lucide-react";
import { cn } from "@/lib/utils";

interface SingleArrivalDetailsProps {
  form: UseFormReturn<any>;
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

export function SingleArrivalDetails({ form }: SingleArrivalDetailsProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  // Type assertion to handle errors properly
  const arrivalErrors = (errors.singleArrivalDetails || {}) as ArrivalErrors;
  
  // Get the current value or default to the first option
  const currentDuration = form.watch("singleArrivalDetails.estimatedDuration") || "A few weeks";
  // State to track selected duration
  const [selectedDuration, setSelectedDuration] = useState(currentDuration);
  
  // Watch for useExactDates value
  const useExactDates = watch("singleArrivalDetails.useExactDates") ?? true;
  
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
    { 
      id: "unknown", 
      value: "Inconnu / Pas sûr",
      label: "Inconnu / Pas sûr",
      subLabel: "Durée flexible",
      icon: <HelpCircle size={28} />
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

  // Function to handle duration selection
  const handleDurationSelect = (value: string) => {
    setSelectedDuration(value);
    
    // Store duration in the form
    setValue("singleArrivalDetails.estimatedDuration", value, { 
      shouldValidate: true, 
      shouldDirty: true,
      shouldTouch: true
    });
  };

  // Function to handle date type selection
  const handleDateTypeSelect = (useExact: boolean) => {
    setValue("singleArrivalDetails.useExactDates", useExact, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

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
            <h3 className="text-lg font-medium mb-1">Je connais les dates exactes</h3>
            
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
            <h3 className="text-lg font-medium mb-1">J'ai besoin de dates flexibles</h3>
            
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
                  Date de départ
                </Label>
                <div>
                  <input
                    id="singleArrivalDetails.departureDate"
                    type="date"
                    min={minDepartureDateStr}
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
        </div>

        {!useExactDates && (
          <div className="space-y-4 mt-6">
            <Label htmlFor="singleArrivalDetails.estimatedDuration" className="text-base font-medium">
              Durée estimée <span className="text-red-500">*</span>
            </Label>
            
            {/* Duration selection cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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

        <div className="p-4 bg-primary/5 rounded-md border border-primary/10 mt-6">
          <p className="text-sm text-primary/80">
            <strong>Note :</strong> Aidez-nous à vous proposer des options de relogement appropriées. 
            Si votre situation change, vous pourrez toujours mettre à jour ces informations ultérieurement.
          </p>
        </div>
      </div>
    </div>
  );
} 