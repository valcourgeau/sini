import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Check, CheckCircle, HelpCircle, XCircle } from "lucide-react";

interface AccommodationCheckProps {
  form: UseFormReturn<any>;
}

interface AccommodationOption {
  value: "yes" | "no" | "unknown";
  icon: React.ReactNode;
  label: string;
  description: string;
}

export function AccommodationCheck({ form }: AccommodationCheckProps) {
  const { formState: { errors } } = form;
  const currentValue = form.getValues("isAccommodationListed");
  
  const accommodationOptions: AccommodationOption[] = [
    {
      value: "yes",
      icon: <CheckCircle size={32} />,
      label: "Yes",
      description: "My property is already registered"
    },
    {
      value: "no",
      icon: <XCircle size={32} />,
      label: "No",
      description: "My property is not registered yet"
    },
    {
      value: "unknown",
      icon: <HelpCircle size={32} />,
      label: "I don't know",
      description: "I'm not sure if my property is registered"
    }
  ];

  const handleOptionSelect = (value: "yes" | "no" | "unknown") => {
    form.setValue("isAccommodationListed", value, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true 
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Is your accommodation already listed on our platform?</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Let us know if your property is already registered in our system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accommodationOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleOptionSelect(option.value)}
            className={cn(
              "group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200",
              currentValue === option.value 
                ? "border-primary bg-primary/5 shadow-md" 
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            )}
            aria-pressed={currentValue === option.value}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all",
              currentValue === option.value 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
            )}>
              {option.icon}
            </div>
            <h3 className="text-lg font-medium mb-1">{option.label}</h3>
            <p className="text-sm text-center text-muted-foreground">
              {option.description}
            </p>
            
            {currentValue === option.value && (
              <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                <Check size={16} />
              </div>
            )}
            
            <input
              type="radio"
              name="isAccommodationListed"
              value={option.value}
              checked={currentValue === option.value}
              onChange={() => handleOptionSelect(option.value)}
              className="sr-only" // Hidden but keeps form functionality
            />
          </button>
        ))}
      </div>

      {errors.isAccommodationListed && (
        <p className="text-sm text-red-500 mt-2">
          {errors.isAccommodationListed.message as string}
        </p>
      )}
    </div>
  );
} 