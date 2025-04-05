import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Check, Home, Users } from "lucide-react";

interface RelocationTypeSelectionProps {
  form: UseFormReturn<any>;
}

interface RelocationTypeOption {
  value: "single" | "multiple";
  icon: React.ReactNode;
  label: string;
  description: string;
}

export function RelocationTypeSelection({ form }: RelocationTypeSelectionProps) {
  const { formState: { errors } } = form;
  const currentValue = form.getValues("relocationType");
  
  const relocationOptions: RelocationTypeOption[] = [
    {
      value: "single",
      icon: <Home size={32} />,
      label: "Single Relocation",
      description: "For myself or a single household."
    },
    {
      value: "multiple",
      icon: <Users size={32} />,
      label: "Multiple Relocations",
      description: "For multiple individuals or households."
    }
  ];

  const handleTypeSelect = (value: "single" | "multiple") => {
    form.setValue("relocationType", value, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true 
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Type of Relocation Request</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Are you submitting a request for a single relocation or for multiple people?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relocationOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleTypeSelect(option.value)}
            className={cn(
              "group relative flex flex-col items-center p-8 rounded-xl border-2 transition-all duration-200",
              currentValue === option.value 
                ? "border-primary bg-primary/5 shadow-md" 
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            )}
            aria-pressed={currentValue === option.value}
          >
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all",
              currentValue === option.value 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
            )}>
              {option.icon}
            </div>
            <h3 className="text-xl font-medium mb-2">{option.label}</h3>
            <p className="text-sm text-center text-muted-foreground">
              {option.description}
            </p>
            
            {currentValue === option.value && (
              <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-1">
                <Check size={18} />
              </div>
            )}
            
            <input
              type="radio"
              name="relocationType"
              value={option.value}
              checked={currentValue === option.value}
              onChange={() => handleTypeSelect(option.value)}
              className="sr-only" // Hidden but keeps form functionality
            />
          </button>
        ))}
      </div>
        
      {errors.relocationType && (
        <p className="text-sm text-red-500 mt-2">
          {errors.relocationType.message as string}
        </p>
      )}
    </div>
  );
} 