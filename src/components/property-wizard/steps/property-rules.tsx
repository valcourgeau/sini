import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Baby, PawPrint, Cigarette, Music, Clock, Check, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PropertyRulesProps {
  form: UseFormReturn<any>;
}

type RuleOption = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  fieldName: string;
};

export function PropertyRules({ form }: PropertyRulesProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  
  // Get the current rules from the form
  const rules = watch("propertyRules") || {};
  
  // Define the rules options
  const rulesOptions: RuleOption[] = [
    {
      id: "children",
      name: "Children",
      description: "Do you accept children?",
      icon: <Baby size={32} />,
      fieldName: "propertyRules.allowChildren"
    },
    {
      id: "pets",
      name: "Pets",
      description: "Do you accept pets?",
      icon: <PawPrint size={32} />,
      fieldName: "propertyRules.allowPets"
    },
    {
      id: "smoking",
      name: "Smoking",
      description: "Is smoking permitted?",
      icon: <Cigarette size={32} />,
      fieldName: "propertyRules.allowSmoking"
    },
    {
      id: "events",
      name: "Events",
      description: "Are parties/events allowed?",
      icon: <Music size={32} />,
      fieldName: "propertyRules.allowEvents"
    },
    {
      id: "quietHours",
      name: "Quiet Hours",
      description: "Do you enforce quiet hours?",
      icon: <Clock size={32} />,
      fieldName: "propertyRules.quietHours"
    }
  ];

  // Function to toggle rules (true/false)
  const toggleRule = (fieldName: string, value: boolean) => {
    setValue(fieldName, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold mb-1">Property Rules</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Define the rules for your property to help guests understand what to expect.
        </p>
      </div>

      <div className="space-y-6">
        {rulesOptions.map((rule) => (
          <div key={rule.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                watch(rule.fieldName) === true
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500"
              )}>
                {rule.icon}
              </div>
              <div>
                <h4 className="text-lg font-medium">{rule.name}</h4>
                <p className="text-sm text-muted-foreground">{rule.description}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => toggleRule(rule.fieldName, true)}
                className={cn(
                  "group relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                  watch(rule.fieldName) === true
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                )}
                aria-pressed={watch(rule.fieldName) === true}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all",
                  watch(rule.fieldName) === true
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                )}>
                  <Check size={16} />
                </div>
                <span className="font-medium">Yes</span>
                
                <input
                  type="radio"
                  name={rule.fieldName}
                  checked={watch(rule.fieldName) === true}
                  onChange={() => {}}
                  className="sr-only"
                />
              </button>
              
              <button
                type="button"
                onClick={() => toggleRule(rule.fieldName, false)}
                className={cn(
                  "group relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                  watch(rule.fieldName) === false
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                )}
                aria-pressed={watch(rule.fieldName) === false}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all",
                  watch(rule.fieldName) === false
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                )}>
                  <X size={16} />
                </div>
                <span className="font-medium">No</span>
                
                <input
                  type="radio"
                  name={rule.fieldName}
                  checked={watch(rule.fieldName) === false}
                  onChange={() => {}}
                  className="sr-only"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Show time inputs if quiet hours is selected */}
      {watch("propertyRules.quietHours") && (
        <div className="mt-4 grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="space-y-1.5">
            <Label htmlFor="propertyRules.quietHoursStart">Start</Label>
            <Input
              id="propertyRules.quietHoursStart"
              type="time"
              defaultValue="22:00"
              {...register("propertyRules.quietHoursStart")}
              className="w-full"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="propertyRules.quietHoursEnd">End</Label>
            <Input
              id="propertyRules.quietHoursEnd"
              type="time"
              defaultValue="07:00"
              {...register("propertyRules.quietHoursEnd")}
              className="w-full"
            />
          </div>
        </div>
      )}
      
      {/* Additional rules textarea */}
      <div className="mt-6 bg-white p-5 rounded-xl border border-gray-200 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Plus size={20} className="text-primary" />
          </div>
          <Label htmlFor="propertyRules.additionalRules" className="text-base font-medium">
            Additional Rules (optional)
          </Label>
        </div>
        <textarea
          id="propertyRules.additionalRules"
          {...register("propertyRules.additionalRules")}
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Include any additional rules you want to communicate to your guests."
        />
      </div>
    </div>
  );
} 