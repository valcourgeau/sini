import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Check, Clock, Calendar, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SingleArrivalDetailsProps {
  form: UseFormReturn<any>;
}

// Define a type for the error object structure
interface ArrivalErrors {
  arrivalDate?: {
    message?: string;
  };
  estimatedDuration?: {
    message?: string;
  };
}

export function SingleArrivalDetails({ form }: SingleArrivalDetailsProps) {
  const { register, setValue, formState: { errors } } = form;
  // Type assertion to handle errors properly
  const arrivalErrors = (errors.singleArrivalDetails || {}) as ArrivalErrors;
  
  // Get the current value or default to the first option
  const currentDuration = form.watch("singleArrivalDetails.estimatedDuration") || "1-2 weeks";
  // State to track selected duration
  const [selectedDuration, setSelectedDuration] = useState(currentDuration);
  
  // Duration options with icons and descriptions
  const durationOptions = [
    { 
      id: "short-term", 
      value: "1-2 weeks", 
      label: "1-2 weeks",
      subLabel: "Short stay",
      icon: <Clock size={32} />,
      description: "Brief accommodation for urgent needs"
    },
    { 
      id: "medium-short", 
      value: "2-4 weeks",
      label: "2-4 weeks",
      subLabel: "Short-medium stay",
      icon: <Clock size={32} />,
      description: "A few weeks of temporary housing"
    },
    { 
      id: "medium", 
      value: "1-3 months",
      label: "1-3 months",
      subLabel: "Medium stay",
      icon: <Calendar size={32} />,
      description: "Several months of transitional housing"
    },
    { 
      id: "medium-long", 
      value: "3-6 months",
      label: "3-6 months",
      subLabel: "Medium-long stay",
      icon: <Calendar size={32} />,
      description: "Extended period accommodation"
    },
    { 
      id: "long", 
      value: "6-12 months",
      label: "6-12 months",
      subLabel: "Long stay",
      icon: <Calendar size={32} />,
      description: "Long-term housing solution"
    },
    { 
      id: "very-long", 
      value: "more than 12 months",
      label: "More than 12 months",
      subLabel: "Very long stay",
      icon: <Calendar size={32} />,
      description: "Long-term or permanent relocation"
    },
    { 
      id: "unknown", 
      value: "unknown",
      label: "Unknown / Not sure",
      subLabel: "Flexible duration",
      icon: <HelpCircle size={32} />,
      description: "Duration to be determined later"
    },
  ];

  // Calculate tomorrow's date for the min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Arrival & Duration Details</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Please provide information about when you need to arrive and how long you anticipate needing accommodation.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="singleArrivalDetails.arrivalDate" className="text-base font-medium">
            Desired Arrival Date <span className="text-red-500">*</span>
          </Label>
          <input
            id="singleArrivalDetails.arrivalDate"
            type="date"
            min={tomorrowStr}
            {...register("singleArrivalDetails.arrivalDate")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue={tomorrowStr}
          />
          {arrivalErrors.arrivalDate && (
            <p className="text-sm text-red-500 mt-1">
              {arrivalErrors.arrivalDate.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            The earliest date you would need to move into the new accommodation.
          </p>
        </div>

        <div className="space-y-4 mt-6">
          <Label htmlFor="singleArrivalDetails.estimatedDuration" className="text-base font-medium">
            Estimated Duration <span className="text-red-500">*</span>
          </Label>
          
          {/* Duration selection cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {durationOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleDurationSelect(option.value)}
                className={cn(
                  "group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200",
                  selectedDuration === option.value
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                )}
                aria-pressed={selectedDuration === option.value}
              >
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all",
                  selectedDuration === option.value 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                )}>
                  {option.icon}
                </div>
                <h3 className="text-lg font-medium mb-1">{option.label}</h3>
                <p className="text-sm text-center text-muted-foreground mb-1">
                  {option.subLabel}
                </p>
                <p className="text-xs text-center text-muted-foreground">
                  {option.description}
                </p>
                
                {selectedDuration === option.value && (
                  <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                    <Check size={16} />
                  </div>
                )}
                
                <input
                  type="radio"
                  name="singleArrivalDetails.estimatedDuration"
                  value={option.value}
                  checked={selectedDuration === option.value}
                  onChange={() => handleDurationSelect(option.value)}
                  className="sr-only" // Hidden but keeps form functionality
                />
              </button>
            ))}
          </div>
          
          {arrivalErrors.estimatedDuration && (
            <p className="text-sm text-red-500 mt-1">
              {arrivalErrors.estimatedDuration.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            How long do you anticipate needing the accommodation? This helps us find the most suitable options.
          </p>
        </div>

        <div className="p-4 bg-blue-50 rounded-md border border-blue-100 mt-6">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> These details help us match you with appropriate relocation options. 
            If your circumstances change, you can always update this information later.
          </p>
        </div>
      </div>
    </div>
  );
} 