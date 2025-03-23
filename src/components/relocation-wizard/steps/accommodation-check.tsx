import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface AccommodationCheckProps {
  form: UseFormReturn<any>;
}

interface AccommodationOption {
  value: "yes" | "no" | "unknown";
  icon: React.ReactNode;
  label: string;
}

export function AccommodationCheck({ form }: AccommodationCheckProps) {
  const { formState: { errors } } = form;
  const currentValue = form.getValues("isAccommodationListed");
  
  const accommodationOptions: AccommodationOption[] = [
    {
      value: "yes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Yes"
    },
    {
      value: "no",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-rose-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "No"
    },
    {
      value: "unknown",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25h.007v.008H12v-.008z" />
        </svg>
      ),
      label: "I don't know"
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
      <div>
        <h2 className="text-lg font-medium mb-4">Is your accommodation already listed on our platform?</h2>
        <p className="text-sm text-muted-foreground mb-6">
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
              "flex flex-col items-center text-left p-6 rounded-xl border-2 transition-all duration-200",
              "hover:shadow-md hover:border-gray-300",
              currentValue === option.value 
                ? "border-blue-500 bg-blue-50 shadow-sm" 
                : "border-gray-200"
            )}
          >
            <div className="mb-3">{option.icon}</div>
            <h3 className="text-base font-medium">{option.label}</h3>
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