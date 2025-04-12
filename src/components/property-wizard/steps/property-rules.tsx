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
  yesLabel?: string;
  noLabel?: string;
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
      icon: <Baby size={24} />,
      fieldName: "propertyRules.allowChildren",
      yesLabel: "Allowed",
      noLabel: "Not allowed"
    },
    {
      id: "pets",
      name: "Pets",
      description: "Do you accept pets?",
      icon: <PawPrint size={24} />,
      fieldName: "propertyRules.allowPets",
      yesLabel: "Allowed",
      noLabel: "Not allowed"
    },
    {
      id: "smoking",
      name: "Smoking",
      description: "Is smoking permitted?",
      icon: <Cigarette size={24} />,
      fieldName: "propertyRules.allowSmoking",
      yesLabel: "Permitted",
      noLabel: "Not permitted"
    },
    {
      id: "events",
      name: "Events",
      description: "Are parties/events allowed?",
      icon: <Music size={24} />,
      fieldName: "propertyRules.allowEvents",
      yesLabel: "Allowed",
      noLabel: "Not allowed"
    },
    {
      id: "quietHours",
      name: "Quiet Hours",
      description: "Do you enforce quiet hours?",
      icon: <Clock size={24} />,
      fieldName: "propertyRules.quietHours",
      yesLabel: "Yes",
      noLabel: "No"
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
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Property Rules</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Define the rules for your property.
        </p>
      </div>

      <div className="space-y-8">
        {rulesOptions.map((rule) => (
          <div key={rule.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">{rule.icon}</span>
              <h3 className="text-lg font-medium">{rule.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
            
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => toggleRule(rule.fieldName, true)}
                className={cn(
                  "flex-1 group relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
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
                <span className="font-medium">{rule.yesLabel || "Yes"}</span>
                
                <input
                  type="radio"
                  name={rule.fieldName}
                  checked={watch(rule.fieldName) === true}
                  onChange={() => {}}
                  className="sr-only" // Hidden but keeps form functionality
                />
              </button>
              
              <button
                type="button"
                onClick={() => toggleRule(rule.fieldName, false)}
                className={cn(
                  "flex-1 group relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
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
                <span className="font-medium">{rule.noLabel || "No"}</span>
                
                <input
                  type="radio"
                  name={rule.fieldName}
                  checked={watch(rule.fieldName) === false}
                  onChange={() => {}}
                  className="sr-only" // Hidden but keeps form functionality
                />
              </button>
            </div>
            
            {/* Show time inputs if quiet hours is selected */}
            {rule.id === "quietHours" && watch("propertyRules.quietHours") && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyRules.quietHoursStart">Start</Label>
                  <Input
                    id="propertyRules.quietHoursStart"
                    type="time"
                    defaultValue="22:00"
                    {...register("propertyRules.quietHoursStart")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyRules.quietHoursEnd">End</Label>
                  <Input
                    id="propertyRules.quietHoursEnd"
                    type="time"
                    defaultValue="07:00"
                    {...register("propertyRules.quietHoursEnd")}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Additional rules textarea */}
      <div className="mt-8 bg-white p-5 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Plus size={20} className="text-gray-500" />
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