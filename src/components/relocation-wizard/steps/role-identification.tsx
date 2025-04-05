import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Check, Home, Key, Users } from "lucide-react";

interface RoleIdentificationProps {
  form: UseFormReturn<any>;
}

interface RoleOption {
  value: "tenant" | "owner" | "intermediary";
  icon: React.ReactNode;
  label: string;
  description: string;
}

export function RoleIdentification({ form }: RoleIdentificationProps) {
  const { formState: { errors } } = form;
  const currentValue = form.getValues("role");
  
  const roleOptions: RoleOption[] = [
    {
      value: "tenant",
      icon: <Home size={32} />,
      label: "Tenant",
      description: "I rent or lease the property"
    },
    {
      value: "owner",
      icon: <Key size={32} />,
      label: "Owner",
      description: "I own the property"
    },
    {
      value: "intermediary",
      icon: <Users size={32} />,
      label: "Intermediary",
      description: "I represent the tenant or owner"
    }
  ];

  const handleRoleSelect = (value: "tenant" | "owner" | "intermediary") => {
    form.setValue("role", value, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true 
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Tell us a bit more about you and the property</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Please identify your relationship to the property that needs relocation assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roleOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleRoleSelect(option.value)}
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
              name="role"
              value={option.value}
              checked={currentValue === option.value}
              onChange={() => handleRoleSelect(option.value)}
              className="sr-only" // Hidden but keeps form functionality
            />
          </button>
        ))}
      </div>
        
      {errors.role && (
        <p className="text-sm text-red-500 mt-2">
          {errors.role.message as string}
        </p>
      )}
    </div>
  );
} 