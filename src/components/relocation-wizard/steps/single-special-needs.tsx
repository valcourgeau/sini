import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { PawPrint, Accessibility, Plus, Check, Dog, Cat, Bird, Rabbit, HelpCircle, X, Eye, Ear, Brain, Heart, Building2, ArrowUpDown, LucideIcon, Stethoscope, HeartHandshake  } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from "@/lib/utils";

interface SingleSpecialNeedsProps {
  form: UseFormReturn<any>;
}

interface PetType {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface AccessibilityType {
  id: string;
  label: string;
  icon: LucideIcon;
  description?: string;
}

export function SingleSpecialNeeds({ form }: SingleSpecialNeedsProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const specialNeedsErrors = errors.singleSpecialNeeds || {};
  
  // Watch the boolean values
  const hasAnimals = watch("singleSpecialNeeds.hasAnimals");
  const hasAccessibilityNeeds = watch("singleSpecialNeeds.hasAccessibilityNeeds");
  
  // State for pet type selection
  const [selectedPetTypes, setSelectedPetTypes] = useState<string[]>([]);
  const [petDetails, setPetDetails] = useState<Record<string, string>>({});
  
  // State for accessibility requirements
  const [selectedAccessibilityTypes, setSelectedAccessibilityTypes] = useState<string[]>([]);
  const [accessibilityDetails, setAccessibilityDetails] = useState<Record<string, string>>({});

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
        // Reset pet type selection
        setSelectedPetTypes([]);
        setPetDetails({});
      } else if (field === "singleSpecialNeeds.hasAccessibilityNeeds") {
        setValue("singleSpecialNeeds.accessibilityDetails", "", {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        });
        // Reset accessibility type selection
        setSelectedAccessibilityTypes([]);
        setAccessibilityDetails({});
      }
    }
  };

  // Pet type options
  const petTypes: PetType[] = [
    { id: "dog", name: "Dog", icon: Dog },
    { id: "cat", name: "Cat", icon: Cat },
    { id: "bird", name: "Bird", icon: Bird },
    { id: "small", name: "Small Animal", icon: Rabbit },
    { id: "other", name: "Other", icon: HelpCircle }
  ];

  // Accessibility type options
  const accessibilityTypeOptions: AccessibilityType[] = [
    {
      id: 'wheelchair',
      label: 'Wheelchair Access',
      icon: Accessibility,
    },
    {
      id: 'medical',
      label: 'Medical Care',
      icon: Stethoscope,
    },
    {
      id: 'elevator',
      label: 'Elevator Access',
      icon: Building2,
    },
    {
      id: 'other',
      label: 'Other',
      icon: Accessibility,
    },
  ];

  // Handler for toggling pet type selection
  const handlePetTypeToggle = (typeId: string) => {
    const updatedTypes = selectedPetTypes.includes(typeId)
      ? selectedPetTypes.filter(id => id !== typeId)
      : [...selectedPetTypes, typeId];
    
    setSelectedPetTypes(updatedTypes);
    
    // Update form value
    const details = updatedTypes.map(type => {
      const pet = petTypes.find(p => p.id === type);
      return pet ? pet.name : type;
    }).join(", ");
    
    setValue("singleSpecialNeeds.animalDetails", details, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  // Handler for pet details change
  const handlePetDetailsChange = (typeId: string, value: string) => {
    setPetDetails(prev => ({ ...prev, [typeId]: value }));
    
    // Update the animalDetails field with the selected pet types and custom input
    const petTypeLabels = selectedPetTypes.map(type => {
      const pet = petTypes.find(p => p.id === type);
      if (type === 'other') {
        return `Other (${value})`;
      }
      return pet ? pet.name : type;
    });
    
    setValue("singleSpecialNeeds.animalDetails", petTypeLabels.join(", "), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  // Handler for toggling accessibility type selection
  const handleAccessibilityTypeToggle = (typeId: string) => {
    const updatedTypes = selectedAccessibilityTypes.includes(typeId)
      ? selectedAccessibilityTypes.filter(id => id !== typeId)
      : [...selectedAccessibilityTypes, typeId];
    
    setSelectedAccessibilityTypes(updatedTypes);
    
    // Update form value
    const details = updatedTypes.map(type => {
      const option = accessibilityTypeOptions.find(opt => opt.id === type);
      return option ? option.label : type;
    }).join(", ");
    
    setValue("singleSpecialNeeds.accessibilityDetails", details, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  // Handler for accessibility details change
  const handleAccessibilityDetailsChange = (typeId: string, value: string) => {
    setAccessibilityDetails(prev => ({ ...prev, [typeId]: value }));
    
    // Update the accessibilityDetails field with the selected types and custom input
    const accessibilityTypeLabels = selectedAccessibilityTypes.map(type => {
      const option = accessibilityTypeOptions.find(opt => opt.id === type);
      if (type === 'other') {
        return `Other (${value})`;
      }
      return option ? option.label : type;
    });
    
    setValue("singleSpecialNeeds.accessibilityDetails", accessibilityTypeLabels.join(", "), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Special Needs & Requirements</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
          Please let us know if you have any special needs or requirements for your relocation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min">
        {/* Animals Card */}
        <div
          className={cn(
            "group relative flex flex-col p-6 rounded-xl border-2 transition-all duration-200",
            hasAnimals
              ? "border-primary bg-primary/5 shadow-md"
              : "border-gray-200 hover:border-gray-300 hover:shadow-sm h-[160px]"
          )}
        >
          <button
            type="button"
            onClick={() => handleSpecialNeedToggle("singleSpecialNeeds.hasAnimals", !hasAnimals)}
            className="flex flex-col items-center w-full"
            aria-pressed={hasAnimals}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all",
              hasAnimals ? "bg-primary text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
            )}>
            <PawPrint size={32} />
          </div>
          <h3 className="text-lg font-medium mb-1">Pets or Animals</h3>
          
            {hasAnimals && (
              <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                <Check size={16} />
              </div>
            )}
          </button>
          
          {/* Pet Selection Content - Appears when card is selected */}
          {hasAnimals && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <PawPrint className="text-primary" size={20} />
                <Label className="text-base font-medium">
                  What types of pets do you have?
                </Label>
              </div>
              
              {/* Pet Type Selection Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {petTypes.map((pet) => {
                  const isSelected = selectedPetTypes.includes(pet.id);
                  return (
                    <button
                      key={pet.id}
                      type="button"
                      onClick={() => handlePetTypeToggle(pet.id)}
                      className={cn(
                        "flex flex-col items-center p-3 rounded-xl border transition-all",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                        isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                      )}>
                        <pet.icon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-medium">{pet.name}</span>
                      {isSelected && (
                        <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5">
                          <Check size={12} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              {/* Selected Pets Details */}
              {selectedPetTypes.includes('other') && (
                <div className="space-y-2 mt-4">
                  <Label htmlFor="pet-details-other">Specify Pet Type</Label>
                  <Input
                    id="pet-details-other"
                    placeholder="Enter pet type"
                    value={petDetails['other'] || ''}
                    onChange={(e) => handlePetDetailsChange('other', e.target.value)}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Accessibility Card */}
        <div
          className={cn(
            "group relative flex flex-col p-6 rounded-xl border-2 transition-all duration-200",
            hasAccessibilityNeeds
              ? "border-primary bg-primary/5 shadow-md"
              : "border-gray-200 hover:border-gray-300 hover:shadow-sm h-[160px]"
          )}
        >
          <button
            type="button"
            onClick={() => handleSpecialNeedToggle("singleSpecialNeeds.hasAccessibilityNeeds", !hasAccessibilityNeeds)}
            className="flex flex-col items-center w-full"
            aria-pressed={hasAccessibilityNeeds}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all",
              hasAccessibilityNeeds ? "bg-primary text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
            )}>
              <HeartHandshake size={32} />
            </div>
            <h3 className="text-lg font-medium">Accessibility Requirements</h3>
            
            {hasAccessibilityNeeds && (
              <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                <Check size={16} />
              </div>
            )}
          </button>
          
          {/* Accessibility Selection Content - Appears when card is selected */}
          {hasAccessibilityNeeds && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Accessibility className="text-primary" size={20} />
                <Label className="text-base font-medium">
                  What accessibility requirements do you need?
                </Label>
              </div>
              
              {/* Accessibility Type Selection Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {accessibilityTypeOptions.map((type) => {
                  const isSelected = selectedAccessibilityTypes.includes(type.id);
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleAccessibilityTypeToggle(type.id)}
                      className={cn(
                        "flex flex-col items-center p-3 rounded-xl border transition-all",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                        isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                      )}>
                        <type.icon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-medium">{type.label}</span>
                      {isSelected && (
                        <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5">
                          <Check size={12} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              {/* Selected Accessibility Details */}
              {selectedAccessibilityTypes.includes('other') && (
                <div className="space-y-2 mt-4">
                  <Label htmlFor="accessibility-details-other">Specify Requirements</Label>
                  <Input
                    id="accessibility-details-other"
                    placeholder="Enter specific accessibility requirements"
                    value={accessibilityDetails['other'] || ''}
                    onChange={(e) => handleAccessibilityDetailsChange('other', e.target.value)}
                  />
                </div>
              )}
            </div>
          )}
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
  );
} 