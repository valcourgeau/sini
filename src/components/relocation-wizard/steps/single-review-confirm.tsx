import { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SingleReviewConfirmProps {
  form: UseFormReturn<any>;
}

export function SingleReviewConfirm({ form }: SingleReviewConfirmProps) {
  // Create a state to store form values and trigger re-renders when they change
  const [formData, setFormData] = useState(form.getValues());
  
  // Update formData whenever the form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      setFormData(form.getValues());
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  // Helper functions to handle optional nested objects safely
  const getValue = (path: string, defaultValue: string = "Non spécifié") => {
    const pathParts = path.split(".");
    let value = formData; // Use formData instead of calling getValues directly
    
    for (const part of pathParts) {
      if (value === undefined || value === null) return defaultValue;
      value = value[part];
    }
    
    // Handle boolean values explicitly
    if (typeof value === "boolean") {
      return value;
    }
    
    return value || defaultValue;
  };
  
  // Helper function to check boolean values properly
  const getBooleanValue = (path: string): boolean => {
    const pathParts = path.split(".");
    let value = formData; // Use formData to get the latest values
    
    for (const part of pathParts) {
      if (value === undefined || value === null) return false;
      value = value[part];
    }
    
    // Strict comparison to ensure we're getting a true boolean
    return value === true;
  };
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Non spécifié";
    
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };
  
  // Helper to compute number of nights between two dates
  /**
   * Returns the number of nights between two ISO date strings.
   * @param arrival ISO date string (YYYY-MM-DD)
   * @param departure ISO date string (YYYY-MM-DD)
   * @returns number of nights (integer >= 0), or null if invalid
   */
  const getNumberOfNights = (arrival?: string, departure?: string): number | null => {
    if (!arrival || !departure) return null;
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    if (isNaN(arrivalDate.getTime()) || isNaN(departureDate.getTime())) return null;
    const diff = departureDate.getTime() - arrivalDate.getTime();
    const nights = Math.round(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };
  
  // Log the form values for debugging
  console.log("Form values in review:", {
    hasAnimals: getBooleanValue("singleSpecialNeeds.hasAnimals"),
    hasAccessibilityNeeds: getBooleanValue("singleSpecialNeeds.hasAccessibilityNeeds"),
    rawHasAnimals: getValue("singleSpecialNeeds.hasAnimals"),
    rawHasAccessibilityNeeds: getValue("singleSpecialNeeds.hasAccessibilityNeeds")
  });
  
  const sectionClass = "border-b border-border pb-4 mb-4 last:border-0 last:pb-0 last:mb-0";
  const titleClass = "font-medium text-base mb-2";
  const detailRowClass = "flex flex-col md:flex-row md:items-baseline py-1.5";
  const labelClass = "text-sm font-medium text-muted-foreground md:w-1/3";
  const valueClass = "text-sm";

  // Get form errors for validation
  const { formState: { errors } } = form;
  const reviewErrors = errors.singleReviewConfirmation as any;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Vérification de votre demande</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Veuillez vérifier les détails de votre demande de relogement avant de soumettre. Si vous devez apporter des modifications, 
          vous pouvez revenir aux sections concernées.
        </p>
      </div>

      <div className="space-y-4 bg-muted/20 p-5 rounded-md border border-border">
        {/* Personal Information */}
        <div className={sectionClass}>
          <h3 className={titleClass}>
            {getValue("singleInsuranceCoverage.hasInsurance") === false ? "Informations du courtier" : "Informations du courtier"}
          </h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Nom :</span>
              <span className={valueClass}>
                {getValue("singlePersonalData.firstName")} {getValue("singlePersonalData.lastName")}
              </span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Email :</span>
              <span className={valueClass}>{getValue("singlePersonalData.email")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Téléphone :</span>
              <span className={valueClass}>{getValue("singlePersonalData.phone")}</span>
            </div>
          </div>
        </div>

        {/* Insured Person Information - Only show when user doesn't have insurance */}
        {getValue("singleInsuranceCoverage.hasInsurance") === false && (
          <div className={sectionClass}>
            <h3 className={titleClass}>Informations de l'assuré</h3>
            <div className="space-y-0.5">
              <div className={detailRowClass}>
                <span className={labelClass}>Nom :</span>
                <span className={valueClass}>
                  {getValue("singleInsuredData.firstName")} {getValue("singleInsuredData.lastName")}
                </span>
              </div>
              <div className={detailRowClass}>
                <span className={labelClass}>Email :</span>
                <span className={valueClass}>{getValue("singleInsuredData.email")}</span>
              </div>
              <div className={detailRowClass}>
                <span className={labelClass}>Téléphone :</span>
                <span className={valueClass}>{getValue("singleInsuredData.phone")}</span>
              </div>
            </div>
          </div>
        )}

        {/* Insurance Details - Show for all users */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Détails de l'assurance</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Déclaration de sinistre téléchargée :</span>
              <span className={valueClass}>
                {getValue("singleInsuranceCoverage.hasInsurance") === true 
                  ? "Oui" 
                  : getValue("singleInsuranceCoverage.hasInsurance") === false 
                    ? "Non" 
                    : "Non spécifié"}
              </span>
            </div>
            
            {getValue("singleInsuranceCoverage.hasInsurance") === true && getValue("singleInsuranceCoverage.claimDocument") && (
              <div className={detailRowClass}>
                <span className={labelClass}>Nom du fichier :</span>
                <span className={valueClass}>
                  {getValue("singleInsuranceCoverage.claimDocument.name") || "Document téléchargé"}
                </span>
              </div>
            )}
            
            {getValue("singleInsuranceCoverage.hasInsurance") === false && (
              <>
                <div className={detailRowClass}>
                  <span className={labelClass}>Compagnie d'assurance :</span>
                  <span className={valueClass}>
                    {getValue("singleInsuranceDetails.insuranceCompany") === "other" 
                      ? getValue("singleInsuranceDetails.customInsuranceCompany")
                      : getValue("singleInsuranceDetails.insuranceCompany")
                    }
                  </span>
                </div>
                <div className={detailRowClass}>
                  <span className={labelClass}>Numéro de police :</span>
                  <span className={valueClass}>{getValue("singleInsuranceDetails.policyNumber")}</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Disaster Address */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Adresse du sinistre</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Rue :</span>
              <span className={valueClass}>{getValue("singleDisasterAddress.street")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Ville :</span>
              <span className={valueClass}>{getValue("singleDisasterAddress.city")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Code postal :</span>
              <span className={valueClass}>{getValue("singleDisasterAddress.postalCode")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Pays :</span>
              <span className={valueClass}>{getValue("singleDisasterAddress.country")}</span>
            </div>
          </div>
        </div>
        
        {/* Relocation Preferences */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Préférences de relogement</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Chambres :</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.bedrooms")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Adultes :</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.adults")}</span>
            </div>
            {getValue("singleRelocationPreferences.children") && getValue("singleRelocationPreferences.children") > 0 && (
              <div className={detailRowClass}>
                <span className={labelClass}>Enfants :</span>
                <span className={valueClass}>{getValue("singleRelocationPreferences.children")}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Special Requirements */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Besoins spécifiques</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Animaux :</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.hasAnimals") ? "Oui" : "Non"}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Accessibilité :</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.hasAccessibilityNeeds") ? "Oui" : "Non"}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Stationnement :</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.needsParking") ? "Oui" : "Non"}</span>
            </div>
          </div>
        </div>
        
        {/* Arrival & Duration */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Arrivée & Durée</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Date d'arrivée :</span>
              <span className={valueClass}>{formatDate(getValue("singleArrivalDetails.arrivalDate"))}</span>
            </div>
            {getValue("singleArrivalDetails.departureDate") && (
              <div className={detailRowClass}>
                <span className={labelClass}>Date de départ :</span>
                <span className={valueClass}>{formatDate(getValue("singleArrivalDetails.departureDate"))}</span>
              </div>
            )}
            <div className={detailRowClass}>
              <span className={labelClass}>
                {getValue("singleArrivalDetails.useExactDates") === true ? "Durée :" : "Durée estimée :"}
              </span>
              <span className={valueClass}>
                {getValue("singleArrivalDetails.useExactDates") === true && getValue("singleArrivalDetails.arrivalDate") && getValue("singleArrivalDetails.departureDate") 
                  ? `${getNumberOfNights(getValue("singleArrivalDetails.arrivalDate"), getValue("singleArrivalDetails.departureDate"))} nuits`
                  : getValue("singleArrivalDetails.estimatedDuration") || "Non spécifié"
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Accuracy Confirmation */}
      <div className="mt-6 p-4 border border-border rounded-lg bg-background">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="singleReviewConfirmation.confirmDataAccuracy"
            checked={form.watch("singleReviewConfirmation.confirmDataAccuracy") || false}
            onCheckedChange={(checked) => {
              form.setValue("singleReviewConfirmation.confirmDataAccuracy", checked as boolean, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
              });
            }}
            className="mt-0.5"
          />
          <div className="space-y-1">
            <Label 
              htmlFor="singleReviewConfirmation.confirmDataAccuracy" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Confirmation de l'exactitude des données <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-muted-foreground">
              Je confirme que toutes les informations fournies dans cette demande sont exactes et complètes à la meilleure de ma connaissance. 
              Je comprends que des informations incorrectes peuvent affecter le traitement de ma demande de relogement.
            </p>
          </div>
        </div>
        {reviewErrors?.confirmDataAccuracy && (
          <p className="text-sm text-destructive mt-2">
            {reviewErrors.confirmDataAccuracy.message}
          </p>
        )}
      </div>
    </div>
  );
} 