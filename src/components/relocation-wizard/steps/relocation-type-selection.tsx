import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

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
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-purple-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      label: "Single Relocation",
      description: "For myself or a single household."
    },
    {
      value: "multiple",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-cyan-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
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
      <div>
        <h2 className="text-lg font-medium mb-4">Type of Relocation Request</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Are you submitting a request for a single relocation or for multiple people?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relocationOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleTypeSelect(option.value)}
            className={cn(
              "flex flex-col items-center text-left p-6 rounded-xl border-2 transition-all duration-200",
              "hover:shadow-md hover:border-gray-300",
              currentValue === option.value 
                ? "border-blue-500 bg-blue-50 shadow-sm" 
                : "border-gray-200"
            )}
          >
            <div className="mb-3">{option.icon}</div>
            <h3 className="text-base font-medium mb-2">{option.label}</h3>
            <p className="text-sm text-muted-foreground text-center">
              {option.description}
            </p>
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