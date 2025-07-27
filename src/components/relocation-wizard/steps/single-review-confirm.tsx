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
  PawPrint,
  Bed,
  File
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Insured Person Information - Only show when user doesn't have insurance */}
            {getValue("singleInsuranceCoverage.hasInsurance") === false && (
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Informations de l'assuré</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Nom complet</span>
                    <span className="text-sm font-medium text-foreground">
                      {getValue("singleInsuredData.firstName")} {getValue("singleInsuredData.lastName")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="text-sm text-foreground">{getValue("singleInsuredData.email")}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Téléphone</span>
                    <span className="text-sm text-foreground">{getValue("singleInsuredData.phone")}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Vertical Separator - Only show when insured person info is present */}
            {getValue("singleInsuranceCoverage.hasInsurance") === false && (
              <div className="hidden lg:block w-px bg-border"></div>
            )}

            {/* Broker Information */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Informations du courtier</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Nom complet</span>
                  <span className="text-sm font-medium text-foreground">
                    {getValue("singlePersonalData.firstName")} {getValue("singlePersonalData.lastName")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm text-foreground">{getValue("singlePersonalData.email")}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Téléphone</span>
                  <span className="text-sm text-foreground">{getValue("singlePersonalData.phone")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance & Address Information */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Disaster Address Section */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Adresse du sinistre</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Rue</span>
                  <span className="text-sm text-foreground">{getValue("singleDisasterAddress.street")}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Ville</span>
                  <span className="text-sm text-foreground">{getValue("singleDisasterAddress.city")}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Code postal</span>
                  <span className="text-sm text-foreground">{getValue("singleDisasterAddress.postalCode")}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Canton</span>
                  <span className="text-sm text-foreground">{getValue("singleDisasterAddress.canton")}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Pays</span>
                  <span className="text-sm text-foreground">{getValue("singleDisasterAddress.country")}</span>
                </div>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="hidden lg:block w-px bg-border"></div>

            {/* Insurance Details Section */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Détails de l'assurance</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Déclaration de sinistre</span>
                  <div className="flex items-center gap-2">
                    {getValue("singleInsuranceCoverage.hasInsurance") === true ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-foreground">Oui</span>
                      </>
                    ) : getValue("singleInsuranceCoverage.hasInsurance") === false ? (
                      <>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-foreground">Non</span>
                      </>
                    ) : (
                      <span className="text-sm text-foreground">Non spécifié</span>
                    )}
                  </div>
                </div>
                
                {getValue("singleInsuranceCoverage.hasInsurance") === true && getValue("singleInsuranceCoverage.claimDocument") && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Fichier</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2">
                            <File className="h-4 w-4 text-foreground" />
                            <span className="text-sm text-foreground">Document téléchargé</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{getValue("singleInsuranceCoverage.claimDocument.name") || "Document téléchargé"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
                
                {getValue("singleInsuranceCoverage.hasInsurance") === false && (
                  <>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Compagnie d'assurance</span>
                      <span className="text-sm text-foreground">
                        {getValue("singleInsuranceDetails.insuranceCompany") === "other" 
                          ? getValue("singleInsuranceDetails.customInsuranceCompany")
                          : getValue("singleInsuranceDetails.insuranceCompany")
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Numéro de police</span>
                      <span className="text-sm text-foreground">{getValue("singleInsuranceDetails.policyNumber")}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Relocation Preferences, Special Requirements & Arrival */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Relocation Preferences Section */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-lg">
                  <Home className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Préférences</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Chambres</span>
                  <span className="text-sm font-medium text-foreground">{getValue("singleRelocationPreferences.bedrooms")}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Adultes</span>
                  <span className="text-sm font-medium text-foreground">{getValue("singleRelocationPreferences.adults")}</span>
                </div>
                {getValue("singleRelocationPreferences.children") && getValue("singleRelocationPreferences.children") > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Enfants</span>
                    <span className="text-sm font-medium text-foreground">{getValue("singleRelocationPreferences.children")}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="hidden lg:block w-px bg-border"></div>

            {/* Special Requirements Section */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg">
                  <PawPrint className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Besoins spécifiques</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Animaux</span>
                  <span className="text-sm text-foreground">
                    {getValue("singleRelocationPreferences.hasAnimals") ? "Oui" : "Non"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Accessibilité</span>
                  <span className="text-sm text-foreground">
                    {getValue("singleRelocationPreferences.hasAccessibilityNeeds") ? "Oui" : "Non"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Stationnement</span>
                  <span className="text-sm text-foreground">
                    {getValue("singleRelocationPreferences.needsParking") ? "Oui" : "Non"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Vertical Separator */}
            <div className="hidden lg:block w-px bg-border"></div>
            
            {/* Arrival & Duration Section */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Le séjour</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Date d'arrivée</span>
                  <span className="text-sm text-foreground">{formatDate(getValue("singleArrivalDetails.arrivalDate"))}</span>
                </div>
                {getValue("singleArrivalDetails.departureDate") && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Date de départ</span>
                    <span className="text-sm text-foreground">{formatDate(getValue("singleArrivalDetails.departureDate"))}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">
                    {getValue("singleArrivalDetails.useExactDates") === true ? "Durée" : "Durée estimée"}
                  </span>
                  <span className="text-sm text-foreground">
                    {getValue("singleArrivalDetails.useExactDates") === true && getValue("singleArrivalDetails.arrivalDate") && getValue("singleArrivalDetails.departureDate") 
                      ? `${getNumberOfNights(getValue("singleArrivalDetails.arrivalDate"), getValue("singleArrivalDetails.departureDate"))} nuits`
                      : getValue("singleArrivalDetails.estimatedDuration") || "Non spécifié"
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Accuracy Confirmation */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
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