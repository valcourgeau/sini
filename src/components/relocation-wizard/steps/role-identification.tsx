import { UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RoleIdentificationProps {
  form: UseFormReturn<any>;
}

export function RoleIdentification({ form }: RoleIdentificationProps) {
  const { formState: { errors } } = form;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">What is your role?</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please identify your relationship to the property that needs relocation assistance.
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup 
          defaultValue={form.getValues("role")}
          onValueChange={(value) => form.setValue("role", value as "tenant" | "owner" | "intermediary")}
          className="grid gap-4"
        >
          <div className="flex items-start space-x-3 p-4 border rounded-md">
            <RadioGroupItem value="tenant" id="role-tenant" />
            <div className="space-y-1.5 flex-1">
              <Label htmlFor="role-tenant" className="text-base">
                Tenant
              </Label>
              <p className="text-sm text-muted-foreground">
                I am renting the property that requires relocation assistance.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 border rounded-md">
            <RadioGroupItem value="owner" id="role-owner" />
            <div className="space-y-1.5 flex-1">
              <Label htmlFor="role-owner" className="text-base">
                Owner
              </Label>
              <p className="text-sm text-muted-foreground">
                I own the property that requires relocation assistance.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 border rounded-md">
            <RadioGroupItem value="intermediary" id="role-intermediary" />
            <div className="space-y-1.5 flex-1">
              <Label htmlFor="role-intermediary" className="text-base">
                Intermediary
              </Label>
              <p className="text-sm text-muted-foreground">
                I am submitting this request on behalf of someone else (e.g., property manager, family member, agent).
              </p>
            </div>
          </div>
        </RadioGroup>
        
        {errors.role && (
          <p className="text-sm text-red-500 mt-2">
            {errors.role.message as string}
          </p>
        )}
      </div>
    </div>
  );
} 