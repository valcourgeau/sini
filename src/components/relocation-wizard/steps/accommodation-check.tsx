import { UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AccommodationCheckProps {
  form: UseFormReturn<any>;
}

export function AccommodationCheck({ form }: AccommodationCheckProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Is your accommodation already listed on our platform?</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Let us know if your property is already registered in our system.
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup
          defaultValue={form.getValues("isAccommodationListed")}
          onValueChange={(value) => form.setValue("isAccommodationListed", value as "yes" | "no" | "unknown")}
          className="grid gap-4"
        >
          <div className="flex items-start space-x-3 p-4 border rounded-md">
            <RadioGroupItem value="yes" id="accommodation-yes" />
            <div className="space-y-1.5 flex-1">
              <Label htmlFor="accommodation-yes" className="text-base">
                Yes
              </Label>
              <p className="text-sm text-muted-foreground">
                My accommodation is already listed on this platform.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 border rounded-md">
            <RadioGroupItem value="no" id="accommodation-no" />
            <div className="space-y-1.5 flex-1">
              <Label htmlFor="accommodation-no" className="text-base">
                No
              </Label>
              <p className="text-sm text-muted-foreground">
                My accommodation is not listed on this platform.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 border rounded-md">
            <RadioGroupItem value="unknown" id="accommodation-unknown" />
            <div className="space-y-1.5 flex-1">
              <Label htmlFor="accommodation-unknown" className="text-base">
                I don't know
              </Label>
              <p className="text-sm text-muted-foreground">
                I'm not sure if my accommodation is listed.
              </p>
            </div>
          </div>
        </RadioGroup>

        {errors.isAccommodationListed && (
          <p className="text-sm text-red-500 mt-2">
            {errors.isAccommodationListed.message as string}
          </p>
        )}
      </div>
    </div>
  );
} 