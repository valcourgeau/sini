import { UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RelocationTypeSelectionProps {
  form: UseFormReturn<any>;
}

export function RelocationTypeSelection({ form }: RelocationTypeSelectionProps) {
  const { formState: { errors } } = form;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Type of Relocation Request</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Are you submitting a request for a single relocation or for multiple people?
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup 
          defaultValue={form.getValues("relocationType")}
          onValueChange={(value) => form.setValue("relocationType", value as "single" | "multiple")}
          className="grid gap-4"
        >
          <div className="flex items-start space-x-3 p-4 border rounded-md">
            <RadioGroupItem value="single" id="type-single" />
            <div className="space-y-1.5 flex-1">
              <Label htmlFor="type-single" className="text-base">
                Single Relocation
              </Label>
              <p className="text-sm text-muted-foreground">
                I need relocation assistance for myself or a single household.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 border rounded-md">
            <RadioGroupItem value="multiple" id="type-multiple" />
            <div className="space-y-1.5 flex-1">
              <Label htmlFor="type-multiple" className="text-base">
                Multiple Relocations
              </Label>
              <p className="text-sm text-muted-foreground">
                I need to submit relocation requests for multiple individuals or households.
              </p>
            </div>
          </div>
        </RadioGroup>
        
        {errors.relocationType && (
          <p className="text-sm text-red-500 mt-2">
            {errors.relocationType.message as string}
          </p>
        )}
      </div>
    </div>
  );
} 