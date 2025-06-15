import { UseFormReturn } from "react-hook-form";
import { CheckCircle, MapPin, Calendar, DollarSign, Home, User, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ReviewAndConfirmProps {
  form: UseFormReturn<any>;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  onBack: () => void;
}

interface ConfirmErrors {
  agreeToTerms?: { message?: string };
  agreeToDataPolicy?: { message?: string };
}

export function ReviewAndConfirm({ form, onSubmit, isSubmitting, onBack }: ReviewAndConfirmProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const confirmErrors = (errors.confirmDetails || {}) as ConfirmErrors;
  
  // Get all the form data
  const formData = form.getValues();

  // Function to get property type label
  const getPropertyTypeLabel = (type: string): string => {
    const types: Record<string, string> = {
      apartment: "Apartment",
      house: "House",
      room: "Private Room",
      studio: "Studio",
      other: "Other"
    };
    
    return types[type] || type;
  };
  
  // Function to format price period
  const formatPricePeriod = (period: string): string => {
    const periods: Record<string, string> = {
      night: "per night",
      week: "per week",
      month: "per month"
    };
    
    return periods[period] || period;
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (field: string, checked: boolean) => {
    setValue(field, checked, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Review and Confirm</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Verify your property information before submitting.
        </p>
      </div>

      <div className="space-y-6">
        {/* Property summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Home className="text-gray-500" />
            Property Summary
          </h3>
          
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            {/* Title and Type */}
            <div className="space-y-1">
              <h4 className="text-xl font-semibold">
                {formData.propertyDetails?.title || "Title not defined"}
              </h4>
              <p className="text-gray-500">
                {getPropertyTypeLabel(formData.propertyType)}
              </p>
            </div>
            
            {/* Location */}
            <div className="flex items-start gap-3 text-gray-600 mt-4">
              <MapPin size={18} className="text-gray-400 mt-0.5" />
              <div>
                <p>{formData.propertyLocation?.street}</p>
                <p>{formData.propertyLocation?.postalCode} {formData.propertyLocation?.city}</p>
                <p>{formData.propertyLocation?.canton}, {formData.propertyLocation?.country}</p>
              </div>
            </div>
            
            {/* Details */}
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div className="text-center p-3 bg-white rounded-lg border">
                <p className="font-medium">{formData.propertyDetails?.bedrooms || 0}</p>
                <p className="text-gray-500">Bedrooms</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <p className="font-medium">{formData.propertyDetails?.bathrooms || 0}</p>
                <p className="text-gray-500">Bathrooms</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <p className="font-medium">{formData.propertyDetails?.maxGuests || 0}</p>
                <p className="text-gray-500">Guests</p>
              </div>
            </div>
            
            {/* Price */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-gray-400" />
                <span className="text-lg font-medium">Prix</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border p-3">
                  <p className="text-sm text-gray-500">Par nuit</p>
                  <p className="text-xl font-bold">{formData.propertyPricing?.prices?.night || 0} CHF</p>
                </div>
                <div className="bg-white rounded-lg border p-3">
                  <p className="text-sm text-gray-500">Par semaine</p>
                  <p className="text-xl font-bold">{formData.propertyPricing?.prices?.week || 0} CHF</p>
                </div>
                <div className="bg-white rounded-lg border p-3">
                  <p className="text-sm text-gray-500">Par mois</p>
                  <p className="text-xl font-bold">{formData.propertyPricing?.prices?.month || 0} CHF</p>
                </div>
              </div>
            </div>
            
            {/* Availability */}
            <div className="flex items-start gap-3 text-gray-600 mt-4">
              <Calendar size={18} className="text-gray-400 mt-0.5" />
              <div>
                <p>Available from: {formData.propertyAvailability?.availableFrom}</p>
                <p>Minimum stay: {formData.propertyAvailability?.minStay || 1} days</p>
              </div>
            </div>
            
            {/* Owner info */}
            <div className="flex items-start gap-3 text-gray-600 mt-4">
              <User size={18} className="text-gray-400 mt-0.5" />
              <div>
                <p>Listed by: {formData.ownerDetails?.firstName} {formData.ownerDetails?.lastName}</p>
                <p>Contact: {formData.ownerDetails?.email}</p>
                <p>Phone: {formData.ownerDetails?.phone}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Terms and conditions */}
        <div className="space-y-4 mt-8 pt-6 border-t">
          <h3 className="text-lg font-medium">Terms and Conditions</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="confirmDetails.agreeToTerms"
                checked={watch("confirmDetails.agreeToTerms") || false}
                onCheckedChange={(checked) => 
                  handleCheckboxChange("confirmDetails.agreeToTerms", Boolean(checked))
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="confirmDetails.agreeToTerms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms of service
                </Label>
                <p className="text-sm text-muted-foreground">
                  By checking this box, you agree to the terms of service of our platform.
                </p>
              </div>
            </div>
            
            {confirmErrors.agreeToTerms && (
              <p className="text-sm text-red-500">
                {confirmErrors.agreeToTerms.message}
              </p>
            )}
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="confirmDetails.agreeToDataPolicy"
                checked={watch("confirmDetails.agreeToDataPolicy") || false}
                onCheckedChange={(checked) => 
                  handleCheckboxChange("confirmDetails.agreeToDataPolicy", Boolean(checked))
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="confirmDetails.agreeToDataPolicy"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  J'accepte la politique de confidentialité
                </Label>
                <p className="text-sm text-muted-foreground">
                  En cochant cette case, vous acceptez notre politique de confidentialité concernant le traitement de vos données personnelles.
                </p>
              </div>
            </div>
            
            {confirmErrors.agreeToDataPolicy && (
              <p className="text-sm text-red-500">
                {confirmErrors.agreeToDataPolicy.message}
              </p>
            )}
          </div>
        </div>
        
        {/* Final confirmation message */}
        <div className="mt-8 bg-green-50 rounded-lg p-4 flex gap-3">
          <CheckCircle className="text-green-500 mt-0.5 h-5 w-5 flex-shrink-0" />
          <p className="text-sm text-green-700">
            En cliquant sur "Valider" ci-dessous, votre bien sera ajouté à notre plateforme et pourra être réservé par des personnes ayant besoin d'un logement d'urgence.
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6">
          <Button 
            type="button" 
            variant="outline"
            onClick={onBack}
            className="px-6 py-2 h-auto"
          >
            Retour
          </Button>
          <Button 
            type="button" 
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-8 py-2 h-auto bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? "Envoi en cours..." : "Valider"}
          </Button>
        </div>
      </div>
    </div>
  );
} 