import { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Building, 
  MapPin, 
  Calendar, 
  Users, 
  Heart, 
  FileText, 
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Home,
  Car,
  Accessibility,
  PawPrint
} from "lucide-react";

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

  // Get form errors for validation
  const { formState: { errors } } = form;
  const reviewErrors = errors.singleReviewConfirmation as any;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
          <CheckCircle className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Vérification de votre demande</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Veuillez vérifier les détails de votre demande de relogement avant de soumettre. 
            Si vous devez apporter des modifications, vous pouvez revenir aux sections concernées.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Personal Information */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {getValue("singleInsuranceCoverage.hasInsurance") === false ? "Informations du courtier" : "Informations du courtier"}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Nom complet</span>
                <p className="text-foreground font-medium">
                  {getValue("singlePersonalData.firstName")} {getValue("singlePersonalData.lastName")}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Email</span>
                <p className="text-foreground">{getValue("singlePersonalData.email")}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Téléphone</span>
                <p className="text-foreground">{getValue("singlePersonalData.phone")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insured Person Information - Only show when user doesn't have insurance */}
        {getValue("singleInsuranceCoverage.hasInsurance") === false && (
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                <Shield className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Informations de l'assuré</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Nom complet</span>
                  <p className="text-foreground font-medium">
                    {getValue("singleInsuredData.firstName")} {getValue("singleInsuredData.lastName")}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Email</span>
                  <p className="text-foreground">{getValue("singleInsuredData.email")}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Téléphone</span>
                  <p className="text-foreground">{getValue("singleInsuredData.phone")}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insurance Details */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Détails de l'assurance</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Déclaration de sinistre :</span>
              <div className="flex items-center gap-2">
                {getValue("singleInsuranceCoverage.hasInsurance") === true ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-foreground">Téléchargée</span>
                  </>
                ) : getValue("singleInsuranceCoverage.hasInsurance") === false ? (
                  <>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">Non téléchargée</span>
                  </>
                ) : (
                  <span className="text-foreground">Non spécifié</span>
                )}
              </div>
            </div>
            
            {getValue("singleInsuranceCoverage.hasInsurance") === true && getValue("singleInsuranceCoverage.claimDocument") && (
              <div className="bg-muted/50 rounded-lg p-3">
                <span className="text-sm font-medium text-muted-foreground">Fichier :</span>
                <p className="text-foreground text-sm mt-1">
                  {getValue("singleInsuranceCoverage.claimDocument.name") || "Document téléchargé"}
                </p>
              </div>
            )}
            
            {getValue("singleInsuranceCoverage.hasInsurance") === false && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Compagnie d'assurance</span>
                  <p className="text-foreground">
                    {getValue("singleInsuranceDetails.insuranceCompany") === "other" 
                      ? getValue("singleInsuranceDetails.customInsuranceCompany")
                      : getValue("singleInsuranceDetails.insuranceCompany")
                    }
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Numéro de police</span>
                  <p className="text-foreground">{getValue("singleInsuranceDetails.policyNumber")}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Disaster Address */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Adresse du sinistre</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Rue</span>
                <p className="text-foreground">{getValue("singleDisasterAddress.street")}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Ville</span>
                <p className="text-foreground">{getValue("singleDisasterAddress.city")}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Code postal</span>
                <p className="text-foreground">{getValue("singleDisasterAddress.postalCode")}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Pays</span>
                <p className="text-foreground">{getValue("singleDisasterAddress.country")}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Relocation Preferences */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
              <Home className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Préférences de relogement</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Chambres</span>
              </div>
              <p className="text-foreground font-semibold text-lg">{getValue("singleRelocationPreferences.bedrooms")}</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Adultes</span>
              </div>
              <p className="text-foreground font-semibold text-lg">{getValue("singleRelocationPreferences.adults")}</p>
            </div>
            {getValue("singleRelocationPreferences.children") && getValue("singleRelocationPreferences.children") > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Enfants</span>
                </div>
                <p className="text-foreground font-semibold text-lg">{getValue("singleRelocationPreferences.children")}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Special Requirements */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
              <Heart className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Besoins spécifiques</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <PawPrint className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Animaux</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                getValue("singleRelocationPreferences.hasAnimals") 
                  ? "bg-primary/10 text-primary" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {getValue("singleRelocationPreferences.hasAnimals") ? "Oui" : "Non"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Accessibility className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Accessibilité</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                getValue("singleRelocationPreferences.hasAccessibilityNeeds") 
                  ? "bg-primary/10 text-primary" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {getValue("singleRelocationPreferences.hasAccessibilityNeeds") ? "Oui" : "Non"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Stationnement</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                getValue("singleRelocationPreferences.needsParking") 
                  ? "bg-primary/10 text-primary" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {getValue("singleRelocationPreferences.needsParking") ? "Oui" : "Non"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Arrival & Duration */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Arrivée & Durée</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Date d'arrivée</span>
                <p className="text-foreground font-medium">{formatDate(getValue("singleArrivalDetails.arrivalDate"))}</p>
              </div>
              {getValue("singleArrivalDetails.departureDate") && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Date de départ</span>
                  <p className="text-foreground font-medium">{formatDate(getValue("singleArrivalDetails.departureDate"))}</p>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  {getValue("singleArrivalDetails.useExactDates") === true ? "Durée" : "Durée estimée"}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-foreground font-medium">
                    {getValue("singleArrivalDetails.useExactDates") === true && getValue("singleArrivalDetails.arrivalDate") && getValue("singleArrivalDetails.departureDate") 
                      ? `${getNumberOfNights(getValue("singleArrivalDetails.arrivalDate"), getValue("singleArrivalDetails.departureDate"))} nuits`
                      : getValue("singleArrivalDetails.estimatedDuration") || "Non spécifié"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Accuracy Confirmation */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
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
            className="mt-1"
          />
          <div className="space-y-2">
            <Label 
              htmlFor="singleReviewConfirmation.confirmDataAccuracy" 
              className="text-base font-semibold text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Confirmation de l'exactitude des données <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Je confirme que toutes les informations fournies dans cette demande sont exactes et complètes à la meilleure de ma connaissance. 
              Je comprends que des informations incorrectes peuvent affecter le traitement de ma demande de relogement.
            </p>
          </div>
        </div>
        {reviewErrors?.confirmDataAccuracy && (
          <div className="flex items-center gap-2 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <p className="text-sm text-red-700">
              {reviewErrors.confirmDataAccuracy.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 