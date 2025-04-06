import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DollarSign, Calendar, Percent, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PropertyPricingProps {
  form: UseFormReturn<any>;
}

export function PropertyPricing({ form }: PropertyPricingProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const pricingErrors = errors.propertyPricing || {};
  
  // Get the current period from the form
  const pricePeriod = watch("propertyPricing.pricePeriod") || "night";
  
  // Get whether long term discount is enabled
  const hasLongTermDiscount = watch("propertyPricing.discounts.hasLongTermDiscount");
  
  // Function to select price period
  const selectPricePeriod = (period: string) => {
    setValue("propertyPricing.pricePeriod", period, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };
  
  // Toggle long term discount
  const toggleLongTermDiscount = (value: boolean) => {
    setValue("propertyPricing.discounts.hasLongTermDiscount", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
    if (!value) {
      setValue("propertyPricing.discounts.longTermDiscountPercent", undefined);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Prix et tarification</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Définissez le prix de votre logement et les frais supplémentaires.
        </p>
      </div>

      <div className="space-y-6">
        {/* Base price field */}
        <div className="space-y-4">
          <Label 
            htmlFor="propertyPricing.price" 
            className="text-base font-medium"
          >
            Prix de base
          </Label>
          
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="propertyPricing.price"
                  type="number"
                  min="0"
                  placeholder="0"
                  className={cn(
                    "pl-10",
                    pricingErrors.price && "border-red-500 focus-visible:ring-red-500"
                  )}
                  {...register("propertyPricing.price", { valueAsNumber: true })}
                />
              </div>
              {pricingErrors.price && (
                <p className="text-sm text-red-500">
                  {pricingErrors.price.message}
                </p>
              )}
            </div>
            
            <div className="w-48">
              <div className="grid grid-cols-3 gap-1 h-10 rounded-md overflow-hidden border border-input">
                <button
                  type="button"
                  onClick={() => selectPricePeriod("night")}
                  className={cn(
                    "text-xs font-medium h-full",
                    pricePeriod === "night"
                      ? "bg-primary text-white"
                      : "bg-transparent hover:bg-gray-50"
                  )}
                >
                  Par nuit
                </button>
                <button
                  type="button"
                  onClick={() => selectPricePeriod("week")}
                  className={cn(
                    "text-xs font-medium h-full",
                    pricePeriod === "week"
                      ? "bg-primary text-white"
                      : "bg-transparent hover:bg-gray-50"
                  )}
                >
                  Par semaine
                </button>
                <button
                  type="button"
                  onClick={() => selectPricePeriod("month")}
                  className={cn(
                    "text-xs font-medium h-full",
                    pricePeriod === "month"
                      ? "bg-primary text-white"
                      : "bg-transparent hover:bg-gray-50"
                  )}
                >
                  Par mois
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Définissez le prix de base de votre logement. Vous pourrez ajuster le prix en fonction des saisons plus tard.
          </p>
        </div>
        
        {/* Additional fees */}
        <div className="space-y-4 pt-6 mt-6 border-t">
          <h3 className="text-lg font-medium">Frais supplémentaires</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cleaning fee */}
            <div className="space-y-2">
              <Label 
                htmlFor="propertyPricing.cleaningFee" 
                className="text-base font-medium"
              >
                Frais de ménage (optionnel)
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="propertyPricing.cleaningFee"
                  type="number"
                  min="0"
                  placeholder="0"
                  className="pl-10"
                  {...register("propertyPricing.cleaningFee", { valueAsNumber: true })}
                />
              </div>
            </div>
            
            {/* Security deposit */}
            <div className="space-y-2">
              <Label 
                htmlFor="propertyPricing.securityDeposit" 
                className="text-base font-medium"
              >
                Caution (optionnel)
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="propertyPricing.securityDeposit"
                  type="number"
                  min="0"
                  placeholder="0"
                  className="pl-10"
                  {...register("propertyPricing.securityDeposit", { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Discounts */}
        <div className="space-y-4 pt-6 mt-6 border-t">
          <h3 className="text-lg font-medium">Remises</h3>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => toggleLongTermDiscount(true)}
              className={cn(
                "flex-1 group relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                hasLongTermDiscount === true
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
              aria-pressed={hasLongTermDiscount === true}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all",
                hasLongTermDiscount === true
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              )}>
                <Calendar size={16} />
              </div>
              <span className="font-medium">Remise pour séjour long</span>
              
              {hasLongTermDiscount === true && (
                <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                  <Check size={16} />
                </div>
              )}
              
              <input
                type="radio"
                name="propertyPricing.discounts.hasLongTermDiscount"
                checked={hasLongTermDiscount === true}
                onChange={() => {}}
                className="sr-only" // Hidden but keeps form functionality
              />
            </button>
            
            <button
              type="button"
              onClick={() => toggleLongTermDiscount(false)}
              className={cn(
                "flex-1 group relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                hasLongTermDiscount === false
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
              aria-pressed={hasLongTermDiscount === false}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all",
                hasLongTermDiscount === false
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              )}>
                <DollarSign size={16} />
              </div>
              <span className="font-medium">Pas de remise</span>
              
              {hasLongTermDiscount === false && (
                <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                  <Check size={16} />
                </div>
              )}
              
              <input
                type="radio"
                name="propertyPricing.discounts.hasLongTermDiscount"
                checked={hasLongTermDiscount === false}
                onChange={() => {}}
                className="sr-only" // Hidden but keeps form functionality
              />
            </button>
          </div>
          
          {/* Long term discount percentage */}
          {hasLongTermDiscount && (
            <div className="mt-4 space-y-2">
              <Label 
                htmlFor="propertyPricing.discounts.longTermDiscountPercent" 
                className="text-base font-medium"
              >
                Pourcentage de remise pour séjour long
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Percent className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="propertyPricing.discounts.longTermDiscountPercent"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="10"
                  defaultValue="10"
                  className="pl-10"
                  {...register("propertyPricing.discounts.longTermDiscountPercent", { valueAsNumber: true })}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Remise appliquée pour les séjours de plus de 30 jours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 