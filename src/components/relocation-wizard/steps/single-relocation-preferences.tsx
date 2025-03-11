import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface SingleRelocationPreferencesProps {
  form: UseFormReturn<any>;
}

export function SingleRelocationPreferences({ form }: SingleRelocationPreferencesProps) {
  const { register, setValue, formState: { errors } } = form;
  const preferencesErrors = errors.singleRelocationPreferences || {};
  
  // Available distance options in kilometers
  const distanceOptions = [
    { value: 5, label: "Up to 5 km" },
    { value: 10, label: "Up to 10 km" },
    { value: 20, label: "Up to 20 km" },
    { value: 50, label: "Up to 50 km" },
    { value: 100, label: "Up to 100 km" },
    { value: 999, label: "Any distance" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Relocation Preferences</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please specify your preferences for the relocation, including maximum distance and preferred areas.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="singleRelocationPreferences.maxDistance">Maximum Distance from Current Location</Label>
          <Select 
            onValueChange={(value) => setValue("singleRelocationPreferences.maxDistance", parseInt(value))}
            defaultValue={form.getValues("singleRelocationPreferences.maxDistance")?.toString()}
          >
            <SelectTrigger id="singleRelocationPreferences.maxDistance" className="w-full">
              <SelectValue placeholder="Select maximum distance" />
            </SelectTrigger>
            <SelectContent>
              {distanceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {preferencesErrors.maxDistance && (
            <p className="text-sm text-red-500 mt-1">
              {preferencesErrors.maxDistance.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="singleRelocationPreferences.preferredAreas">Preferred Areas (Optional)</Label>
          <input
            id="singleRelocationPreferences.preferredAreas"
            {...register("singleRelocationPreferences.preferredAreas")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="E.g., Lausanne, Geneva, Zurich"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter your preferred cities or areas, separated by commas.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="singleRelocationPreferences.additionalNotes">Additional Preferences (Optional)</Label>
          <textarea
            id="singleRelocationPreferences.additionalNotes"
            {...register("singleRelocationPreferences.additionalNotes")}
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Any additional preferences or requirements for your relocation"
          />
        </div>
      </div>
    </div>
  );
} 