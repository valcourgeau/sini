import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface SingleSpecialNeedsProps {
  form: UseFormReturn<any>;
}

export function SingleSpecialNeeds({ form }: SingleSpecialNeedsProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const specialNeedsErrors = errors.singleSpecialNeeds || {};
  
  const hasAnimals = watch("singleSpecialNeeds.hasAnimals");
  const hasAccessibilityNeeds = watch("singleSpecialNeeds.hasAccessibilityNeeds");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Special Needs & Requirements</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please let us know if you have any special needs or requirements for your relocation.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="singleSpecialNeeds.hasAnimals"
              {...register("singleSpecialNeeds.hasAnimals")}
              className="rounded border-input h-5 w-5 mt-0.5"
              onChange={(e) => {
                setValue("singleSpecialNeeds.hasAnimals", e.target.checked);
                if (!e.target.checked) {
                  setValue("singleSpecialNeeds.animalDetails", "");
                }
              }}
            />
            <div className="space-y-1">
              <Label htmlFor="singleSpecialNeeds.hasAnimals" className="text-base font-medium">
                I have pets or animals
              </Label>
              <p className="text-sm text-muted-foreground">
                The relocation needs to accommodate pets or other animals.
              </p>
            </div>
          </div>
          
          {hasAnimals && (
            <div className="ml-8 space-y-2">
              <Label htmlFor="singleSpecialNeeds.animalDetails">Details about your pets/animals</Label>
              <textarea
                id="singleSpecialNeeds.animalDetails"
                {...register("singleSpecialNeeds.animalDetails")}
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="E.g., 2 cats, 1 medium-sized dog, etc."
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="singleSpecialNeeds.hasAccessibilityNeeds"
              {...register("singleSpecialNeeds.hasAccessibilityNeeds")}
              className="rounded border-input h-5 w-5 mt-0.5"
              onChange={(e) => {
                setValue("singleSpecialNeeds.hasAccessibilityNeeds", e.target.checked);
                if (!e.target.checked) {
                  setValue("singleSpecialNeeds.accessibilityDetails", "");
                }
              }}
            />
            <div className="space-y-1">
              <Label htmlFor="singleSpecialNeeds.hasAccessibilityNeeds" className="text-base font-medium">
                I have accessibility requirements
              </Label>
              <p className="text-sm text-muted-foreground">
                The relocation needs to accommodate accessibility requirements.
              </p>
            </div>
          </div>
          
          {hasAccessibilityNeeds && (
            <div className="ml-8 space-y-2">
              <Label htmlFor="singleSpecialNeeds.accessibilityDetails">Details about accessibility requirements</Label>
              <textarea
                id="singleSpecialNeeds.accessibilityDetails"
                {...register("singleSpecialNeeds.accessibilityDetails")}
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="E.g., wheelchair accessible, ground floor required, etc."
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="singleSpecialNeeds.otherSpecialNeeds">Other Special Needs (Optional)</Label>
          <textarea
            id="singleSpecialNeeds.otherSpecialNeeds"
            {...register("singleSpecialNeeds.otherSpecialNeeds")}
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Any other special needs or requirements for your relocation"
          />
        </div>
      </div>
    </div>
  );
} 