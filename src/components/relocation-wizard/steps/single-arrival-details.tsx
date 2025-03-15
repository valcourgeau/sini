import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface SingleArrivalDetailsProps {
  form: UseFormReturn<any>;
}

export function SingleArrivalDetails({ form }: SingleArrivalDetailsProps) {
  const { register, setValue, formState: { errors } } = form;
  const arrivalErrors = errors.singleArrivalDetails || {};
  
  // Duration options
  const durationOptions = [
    { value: "1-2 weeks", label: "1-2 weeks" },
    { value: "2-4 weeks", label: "2-4 weeks" },
    { value: "1-3 months", label: "1-3 months" },
    { value: "3-6 months", label: "3-6 months" },
    { value: "6-12 months", label: "6-12 months" },
    { value: "more than 12 months", label: "More than 12 months" },
    { value: "unknown", label: "Unknown / Not sure yet" },
  ];

  // Calculate tomorrow's date for the min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Arrival & Duration Details</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please provide information about when you need to arrive and how long you anticipate needing accommodation.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="singleArrivalDetails.arrivalDate">
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
              {arrivalErrors.arrivalDate.message as string}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            The earliest date you would need to move into the new accommodation.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="singleArrivalDetails.estimatedDuration">
            Estimated Duration <span className="text-red-500">*</span>
          </Label>
          <Select 
            onValueChange={(value) => setValue("singleArrivalDetails.estimatedDuration", value)}
            // defaultValue={form.getValues("singleArrivalDetails.estimatedDuration")}
            defaultValue="1-2 weeks"  // TODO(val): remove this
          >
            <SelectTrigger id="singleArrivalDetails.estimatedDuration" className="w-full">
              <SelectValue placeholder="Select estimated duration" />
            </SelectTrigger>
            <SelectContent>
              {durationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {arrivalErrors.estimatedDuration && (
            <p className="text-sm text-red-500 mt-1">
              {arrivalErrors.estimatedDuration.message as string}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            How long do you anticipate needing the accommodation? This helps us find the most suitable options.
          </p>
        </div>

        <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> These details help us match you with appropriate relocation options. 
            If your circumstances change, you can always update this information later.
          </p>
        </div>
      </div>
    </div>
  );
} 