import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DollarSign, Calendar, Percent, Check, Battery, CircleOff, BadgePercent, PiggyBank, CirclePercent, MinusCircle, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PropertyPricingProps {
  form: UseFormReturn<any>;
}

// Define the structure of the pricing errors
interface PricingErrors {
  prices?: {
    night?: { message?: string };
    week?: { message?: string };
    month?: { message?: string };
  };
  [key: string]: any;
}

export function PropertyPricing({ form }: PropertyPricingProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const pricingErrors = (errors.propertyPricing || {}) as PricingErrors;
  
  // Get the current prices from the form
  const prices = watch("propertyPricing.prices") || { night: 0, week: 0, month: 0 };
  
  // Get whether long term discount is enabled
  const hasLongTermDiscount = watch("propertyPricing.discounts.hasLongTermDiscount");
  
  // Function to validate the current step
  const validateStep = async () => {
    console.log("Validating PropertyPricing step");
    
    // Only validate the required price fields
    const isValid = await form.trigger("propertyPricing.prices");
    
    console.log("PropertyPricing validation result:", isValid);
    
    if (!isValid) {
      console.log("PropertyPricing validation errors:", form.formState.errors);
    }
    
    return isValid;
  };
  
  // Expose the validate function to the parent component
  useEffect(() => {
    // @ts-ignore - Adding a custom property to the form object
    form.validatePropertyPricing = validateStep;
  }, [form]);
  
  // Function to update prices based on a base price and period
  const updatePrices = (value: number, period: 'night' | 'week' | 'month') => {
    const newPrices = { ...prices };
    
    switch (period) {
      case 'night':
        newPrices.night = value;
        newPrices.week = Math.round(value * 7);
        newPrices.month = Math.round(value * 30);
        break;
      case 'week':
        newPrices.week = value;
        newPrices.night = Math.round(value / 7);
        newPrices.month = Math.round(value * 4);
        break;
      case 'month':
        newPrices.month = value;
        newPrices.night = Math.round(value / 30);
        newPrices.week = Math.round(value / 4);
        break;
    }
    
    setValue("propertyPricing.prices", newPrices, {
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
        {/* Base price fields */}
        <div className="space-y-4">
          <Label className="text-base font-medium">
            Prix de base
          </Label>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Nightly price */}
            <div className="space-y-2">
              <Label htmlFor="propertyPricing.prices.night" className="text-sm">
                Prix par nuit
              </Label>
              <div className="relative flex items-center gap-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                </div>
                <button
                  type="button"
                  onClick={() => updatePrices(Math.max(0, prices.night - 10), 'night')}
                  className={cn(
                    "p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors",
                    prices.night <= 0 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={prices.night <= 0}
                >
                  <MinusCircle size={28} />
                </button>
                <Input
                  id="propertyPricing.prices.night"
                  type="number"
                  min="0"
                  placeholder="0"
                  className={cn(
                    "text-center text-lg min-w-[120px] max-w-[140px]",
                    pricingErrors.prices?.night && "border-red-500 focus-visible:ring-red-500"
                  )}
                  value={prices.night}
                  onChange={(e) => updatePrices(Number(e.target.value), 'night')}
                />
                <button
                  type="button"
                  onClick={() => updatePrices(prices.night + 10, 'night')}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <PlusCircle size={28} />
                </button>
              </div>
              {pricingErrors.prices?.night && (
                <p className="text-sm text-red-500">
                  {pricingErrors.prices.night.message}
                </p>
              )}
            </div>
            
            {/* Weekly price */}
            <div className="space-y-2">
              <Label htmlFor="propertyPricing.prices.week" className="text-sm">
                Prix par semaine
              </Label>
              <div className="relative flex items-center gap-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                </div>
                <button
                  type="button"
                  onClick={() => updatePrices(Math.max(0, prices.week - 100), 'week')}
                  className={cn(
                    "p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors",
                    prices.week <= 0 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={prices.week <= 0}
                >
                  <MinusCircle size={28} />
                </button>
                <Input
                  id="propertyPricing.prices.week"
                  type="number"
                  min="0"
                  placeholder="0"
                  className={cn(
                    "text-center text-lg min-w-[120px] max-w-[140px]",
                    pricingErrors.prices?.week && "border-red-500 focus-visible:ring-red-500"
                  )}
                  value={prices.week}
                  onChange={(e) => updatePrices(Number(e.target.value), 'week')}
                />
                <button
                  type="button"
                  onClick={() => updatePrices(prices.week + 100, 'week')}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <PlusCircle size={28} />
                </button>
              </div>
              {pricingErrors.prices?.week && (
                <p className="text-sm text-red-500">
                  {pricingErrors.prices.week.message}
                </p>
              )}
            </div>
            
            {/* Monthly price */}
            <div className="space-y-2">
              <Label htmlFor="propertyPricing.prices.month" className="text-sm">
                Prix par mois
              </Label>
              <div className="relative flex items-center gap-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                </div>
                <button
                  type="button"
                  onClick={() => updatePrices(Math.max(0, prices.month - 100), 'month')}
                  className={cn(
                    "p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors",
                    prices.month <= 0 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={prices.month <= 0}
                >
                  <MinusCircle size={28} />
                </button>
                <Input
                  id="propertyPricing.prices.month"
                  type="number"
                  min="0"
                  placeholder="0"
                  className={cn(
                    "text-center text-lg min-w-[120px] max-w-[140px]",
                    pricingErrors.prices?.month && "border-red-500 focus-visible:ring-red-500"
                  )}
                  value={prices.month}
                  onChange={(e) => updatePrices(Number(e.target.value), 'month')}
                />
                <button
                  type="button"
                  onClick={() => updatePrices(prices.month + 100, 'month')}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <PlusCircle size={28} />
                </button>
              </div>
              {pricingErrors.prices?.month && (
                <p className="text-sm text-red-500">
                  {pricingErrors.prices.month.message}
                </p>
              )}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Les prix sont automatiquement calculés en fonction du prix que vous définissez. Vous pourrez ajuster les prix en fonction des saisons plus tard.
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Long Term Discount Card */}
            <div className="relative">
              <div
                className={`group relative flex flex-col p-6 rounded-xl border-2 transition-all duration-200 ${
                  hasLongTermDiscount === true
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleLongTermDiscount(true)}
                  className="flex flex-col items-center w-full"
                  aria-pressed={hasLongTermDiscount === true}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
                    hasLongTermDiscount === true
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  }`}>
                    <CirclePercent size={32} />
                  </div>

                  <h3 className="text-lg font-medium mb-1">Remise pour séjour long</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Pour les séjours de plus de 30 jours
                  </p>

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
                    className="sr-only"
                  />
                </button>

                {/* Expanded discount options */}
                {hasLongTermDiscount && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="grid grid-cols-3 gap-4">
                      {/* 5% Option */}
                      <button
                        type="button"
                        onClick={() => setValue("propertyPricing.discounts.longTermDiscountPercent", 5, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true
                        })}
                        className={`group relative flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                          watch("propertyPricing.discounts.longTermDiscountPercent") === 5
                            ? "border-primary bg-primary/5 shadow-sm" 
                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                          watch("propertyPricing.discounts.longTermDiscountPercent") === 5
                            ? "bg-primary text-white" 
                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                        }`}>
                          <PiggyBank className="w-8 h-8" fill="currentColor" fillOpacity={0.1} />
                        </div>
                        <span className="text-lg font-medium">5%</span>
                        <span className="text-xs text-muted-foreground">de remise</span>
                      </button>

                      {/* 10% Option */}
                      <button
                        type="button"
                        onClick={() => setValue("propertyPricing.discounts.longTermDiscountPercent", 10, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true
                        })}
                        className={`group relative flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                          watch("propertyPricing.discounts.longTermDiscountPercent") === 10
                            ? "border-primary bg-primary/5 shadow-sm" 
                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                          watch("propertyPricing.discounts.longTermDiscountPercent") === 10
                            ? "bg-primary text-white" 
                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                        }`}>
                          <PiggyBank className="w-8 h-8" fill="currentColor" fillOpacity={0.425} />
                        </div>
                        <span className="text-lg font-medium">10%</span>
                        <span className="text-xs text-muted-foreground">de remise</span>
                      </button>

                      {/* 20% Option */}
                      <button
                        type="button"
                        onClick={() => setValue("propertyPricing.discounts.longTermDiscountPercent", 20, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true
                        })}
                        className={`group relative flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                          watch("propertyPricing.discounts.longTermDiscountPercent") === 20
                            ? "border-primary bg-primary/5 shadow-sm" 
                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                          watch("propertyPricing.discounts.longTermDiscountPercent") === 20
                            ? "bg-primary text-white" 
                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                        }`}>
                          <PiggyBank className="w-8 h-8" fill="currentColor" fillOpacity={.75} />
                        </div>
                        <span className="text-lg font-medium">20%</span>
                        <span className="text-xs text-muted-foreground">de remise</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* No Discount Card */}
            <div className="relative">
              <div
                className={`group relative flex flex-col p-6 rounded-xl border-2 transition-all duration-200 ${
                  hasLongTermDiscount === false
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleLongTermDiscount(false)}
                  className="flex flex-col items-center w-full"
                  aria-pressed={hasLongTermDiscount === false}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
                    hasLongTermDiscount === false
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  }`}>
                    <CircleOff size={32} />
                  </div>

                  <h3 className="text-lg font-medium mb-1">Pas de remise</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Prix standard pour tous les séjours
                  </p>

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
                    className="sr-only"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 