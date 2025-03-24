import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { PawPrint, Accessibility, Plus, Check } from "lucide-react";
import { useEffect } from "react";

interface SingleSpecialNeedsProps {
  form: UseFormReturn<any>;
}

export function SingleSpecialNeeds({ form }: SingleSpecialNeedsProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const specialNeedsErrors = errors.singleSpecialNeeds || {};
  
  // Watch the boolean values
  const hasAnimals = watch("singleSpecialNeeds.hasAnimals");
  const hasAccessibilityNeeds = watch("singleSpecialNeeds.hasAccessibilityNeeds");

  // Ensure form fields are initialized with proper boolean values
  useEffect(() => {
    // Initialize hasAnimals with false if undefined
    if (hasAnimals === undefined) {
      setValue("singleSpecialNeeds.hasAnimals", false, { 
        shouldDirty: true, 
        shouldTouch: true, 
        shouldValidate: true 
      });
    }
    
    // Initialize hasAccessibilityNeeds with false if undefined
    if (hasAccessibilityNeeds === undefined) {
      setValue("singleSpecialNeeds.hasAccessibilityNeeds", false, { 
        shouldDirty: true, 
        shouldTouch: true, 
        shouldValidate: true 
      });
    }
  }, [hasAnimals, hasAccessibilityNeeds, setValue]);

  // Handler for selecting/deselecting special needs options
  const handleSpecialNeedToggle = (field: string, value: boolean) => {
    console.log(`Setting ${field} to ${value}`);
    
    // Set the value with explicit boolean and validation options to ensure changes are correctly registered
    setValue(field, value === true, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
    // If turning off the option, clear the related details
    if (value === false) {
      if (field === "singleSpecialNeeds.hasAnimals") {
        setValue("singleSpecialNeeds.animalDetails", "", {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        });
      } else if (field === "singleSpecialNeeds.hasAccessibilityNeeds") {
        setValue("singleSpecialNeeds.accessibilityDetails", "", {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Special Needs & Requirements</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Please let us know if you have any special needs or requirements for your relocation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Animals Card */}
        <button
          type="button"
          onClick={() => handleSpecialNeedToggle("singleSpecialNeeds.hasAnimals", !hasAnimals)}
          className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 ${
            hasAnimals === true
              ? "border-primary bg-primary/5 shadow-md" 
              : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
          }`}
          aria-pressed={hasAnimals === true}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
            hasAnimals === true ? "bg-primary text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
          }`}>
            <PawPrint size={32} />
          </div>
          <h3 className="text-lg font-medium mb-1">Pets or Animals</h3>
          <p className="text-sm text-center text-muted-foreground">
            The relocation needs to accommodate pets or other animals
          </p>
          
          {hasAnimals === true && (
            <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
              <Check size={16} />
            </div>
          )}
          
          <input
            type="checkbox"
            id="singleSpecialNeeds.hasAnimals"
            {...register("singleSpecialNeeds.hasAnimals")}
            checked={hasAnimals === true}
            onChange={(e) => handleSpecialNeedToggle("singleSpecialNeeds.hasAnimals", e.target.checked)}
            className="sr-only" // Hidden but keeps the form functionality
          />
        </button>

        {/* Accessibility Card */}
        <button
          type="button"
          onClick={() => handleSpecialNeedToggle("singleSpecialNeeds.hasAccessibilityNeeds", !hasAccessibilityNeeds)}
          className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 ${
            hasAccessibilityNeeds === true
              ? "border-primary bg-primary/5 shadow-md" 
              : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
          }`}
          aria-pressed={hasAccessibilityNeeds === true}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
            hasAccessibilityNeeds === true ? "bg-primary text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
          }`}>
            <Accessibility size={32} />
          </div>
          <h3 className="text-lg font-medium mb-1">Accessibility Requirements</h3>
          <p className="text-sm text-center text-muted-foreground">
            The relocation needs to accommodate accessibility requirements
          </p>
          
          {hasAccessibilityNeeds === true && (
            <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
              <Check size={16} />
            </div>
          )}
          
          <input
            type="checkbox"
            id="singleSpecialNeeds.hasAccessibilityNeeds"
            {...register("singleSpecialNeeds.hasAccessibilityNeeds")}
            checked={hasAccessibilityNeeds === true}
            onChange={(e) => handleSpecialNeedToggle("singleSpecialNeeds.hasAccessibilityNeeds", e.target.checked)}
            className="sr-only" // Hidden but keeps the form functionality
          />
        </button>
      </div>

      {/* Details sections that appear when options are selected */}
      <div className="space-y-6 mt-8 overflow-hidden">
        {/* Animals Details */}
        <div className={`transition-all duration-300 ease-in-out ${
          hasAnimals === true
            ? "max-h-96 opacity-100" 
            : "max-h-0 opacity-0 pointer-events-none"
        }`}>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <PawPrint className="text-primary" size={20} />
              <Label htmlFor="singleSpecialNeeds.animalDetails" className="text-base font-medium">
                Tell us about your pets
              </Label>
            </div>
            <textarea
              id="singleSpecialNeeds.animalDetails"
              {...register("singleSpecialNeeds.animalDetails")}
              rows={3}
              className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="E.g., 2 cats, 1 medium-sized dog, etc."
              disabled={hasAnimals !== true}
            />
          </div>
        </div>

        {/* Accessibility Details */}
        <div className={`transition-all duration-300 ease-in-out ${
          hasAccessibilityNeeds === true
            ? "max-h-96 opacity-100" 
            : "max-h-0 opacity-0 pointer-events-none"
        }`}>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Accessibility className="text-primary" size={20} />
              <Label htmlFor="singleSpecialNeeds.accessibilityDetails" className="text-base font-medium">
                Tell us about your accessibility needs
              </Label>
            </div>
            <textarea
              id="singleSpecialNeeds.accessibilityDetails"
              {...register("singleSpecialNeeds.accessibilityDetails")}
              rows={3}
              className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="E.g., wheelchair accessible, ground floor required, etc."
              disabled={hasAccessibilityNeeds !== true}
            />
          </div>
        </div>

        {/* Other Special Needs */}
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Plus className="text-gray-500" size={20} />
            <Label htmlFor="singleSpecialNeeds.otherSpecialNeeds" className="text-base font-medium">
              Any other special needs or requests? (Optional)
            </Label>
          </div>
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