import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface RoleIdentificationProps {
  form: UseFormReturn<any>;
}

interface RoleOption {
  value: "tenant" | "owner" | "intermediary";
  icon: React.ReactNode;
  label: string;
}

export function RoleIdentification({ form }: RoleIdentificationProps) {
  const { formState: { errors } } = form;
  const currentValue = form.getValues("role");
  
  const roleOptions: RoleOption[] = [
    {
      value: "tenant",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-indigo-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      label: "Tenant"
    },
    {
      value: "owner",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-amber-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      label: "Owner"
    },
    {
      value: "intermediary",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-teal-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      label: "Intermediary"
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
      <div>
        <h2 className="text-lg font-medium mb-4">Tell us a bit more about you and the property:</h2>
        <p className="text-sm text-muted-foreground mb-6">
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
        
      {errors.role && (
        <p className="text-sm text-red-500 mt-2">
          {errors.role.message as string}
        </p>
      )}
    </div>
  );
} 