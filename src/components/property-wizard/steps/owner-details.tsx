import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MessageSquare, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OwnerDetailsProps {
  form: UseFormReturn<any>;
}

export function OwnerDetails({ form }: OwnerDetailsProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const ownerErrors = errors.ownerDetails || {};
  
  // Get the current contact preference
  const preferredContact = watch("ownerDetails.preferredContact");
  
  // Set the preferred contact method
  const setPreferredContact = (method: string) => {
    setValue("ownerDetails.preferredContact", method, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Informations de contact</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Ces informations seront utilisées pour vous contacter en cas d'intérêt pour votre logement.
        </p>
      </div>

      <div className="space-y-6">
        {/* Personal details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First name */}
          <div className="space-y-2">
            <Label 
              htmlFor="ownerDetails.firstName" 
              className="text-base font-medium"
            >
              Prénom
            </Label>
            <Input
              id="ownerDetails.firstName"
              {...register("ownerDetails.firstName")}
              className={cn(
                ownerErrors.firstName && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {ownerErrors.firstName && (
              <p className="text-sm text-red-500 mt-1">
                {ownerErrors.firstName.message}
              </p>
            )}
          </div>
          
          {/* Last name */}
          <div className="space-y-2">
            <Label 
              htmlFor="ownerDetails.lastName" 
              className="text-base font-medium"
            >
              Nom
            </Label>
            <Input
              id="ownerDetails.lastName"
              {...register("ownerDetails.lastName")}
              className={cn(
                ownerErrors.lastName && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {ownerErrors.lastName && (
              <p className="text-sm text-red-500 mt-1">
                {ownerErrors.lastName.message}
              </p>
            )}
          </div>
        </div>
        
        {/* Contact details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Email */}
          <div className="space-y-2">
            <Label 
              htmlFor="ownerDetails.email" 
              className="text-base font-medium flex items-center gap-2"
            >
              <Mail size={18} className="text-gray-500" />
              Email
            </Label>
            <Input
              id="ownerDetails.email"
              type="email"
              {...register("ownerDetails.email")}
              className={cn(
                ownerErrors.email && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {ownerErrors.email && (
              <p className="text-sm text-red-500 mt-1">
                {ownerErrors.email.message}
              </p>
            )}
          </div>
          
          {/* Phone */}
          <div className="space-y-2">
            <Label 
              htmlFor="ownerDetails.phone" 
              className="text-base font-medium flex items-center gap-2"
            >
              <Phone size={18} className="text-gray-500" />
              Téléphone
            </Label>
            <Input
              id="ownerDetails.phone"
              type="tel"
              {...register("ownerDetails.phone")}
              className={cn(
                ownerErrors.phone && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {ownerErrors.phone && (
              <p className="text-sm text-red-500 mt-1">
                {ownerErrors.phone.message}
              </p>
            )}
          </div>
        </div>
        
        {/* Preferred contact method */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-medium mb-4">Méthode de contact préférée</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Comment préférez-vous être contacté par les personnes intéressées?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setPreferredContact("email")}
              className={cn(
                "group relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200",
                preferredContact === "email"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
              aria-pressed={preferredContact === "email"}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all",
                preferredContact === "email"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              )}>
                <Mail size={24} />
              </div>
              <h4 className="text-base font-medium">Email</h4>
              
              {preferredContact === "email" && (
                <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                  <Check size={14} />
                </div>
              )}
              
              <input
                type="radio"
                name="ownerDetails.preferredContact"
                value="email"
                checked={preferredContact === "email"}
                onChange={() => {}}
                className="sr-only" // Hidden but keeps form functionality
              />
            </button>
            
            <button
              type="button"
              onClick={() => setPreferredContact("phone")}
              className={cn(
                "group relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200",
                preferredContact === "phone"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
              aria-pressed={preferredContact === "phone"}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all",
                preferredContact === "phone"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              )}>
                <Phone size={24} />
              </div>
              <h4 className="text-base font-medium">Téléphone</h4>
              
              {preferredContact === "phone" && (
                <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                  <Check size={14} />
                </div>
              )}
              
              <input
                type="radio"
                name="ownerDetails.preferredContact"
                value="phone"
                checked={preferredContact === "phone"}
                onChange={() => {}}
                className="sr-only" // Hidden but keeps form functionality
              />
            </button>
            
            <button
              type="button"
              onClick={() => setPreferredContact("both")}
              className={cn(
                "group relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200",
                preferredContact === "both"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
              aria-pressed={preferredContact === "both"}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all",
                preferredContact === "both"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              )}>
                <MessageSquare size={24} />
              </div>
              <h4 className="text-base font-medium">Les deux</h4>
              
              {preferredContact === "both" && (
                <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                  <Check size={14} />
                </div>
              )}
              
              <input
                type="radio"
                name="ownerDetails.preferredContact"
                value="both"
                checked={preferredContact === "both"}
                onChange={() => {}}
                className="sr-only" // Hidden but keeps form functionality
              />
            </button>
          </div>
          
          {ownerErrors.preferredContact && (
            <p className="text-sm text-red-500 mt-2">
              {ownerErrors.preferredContact.message}
            </p>
          )}
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Vos informations de contact ne seront partagées qu'avec les personnes intéressées par votre logement, et uniquement après votre approbation.
          </p>
        </div>
      </div>
    </div>
  );
} 