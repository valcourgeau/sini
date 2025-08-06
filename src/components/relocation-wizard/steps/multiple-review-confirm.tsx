import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Users, 
  MapPin, 
  User, 
  Building, 
  Calendar, 
  Home, 
  Heart, 
  Car, 
  Accessibility,
  CheckCircle, 
  X, 
  Clock,
  FileText,
  AlertCircle,
  Shield,
  PawPrint,
  Bed,
  File
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MultipleReviewConfirmProps {
  form: UseFormReturn<any>;
}

interface DisasterAddress {
  street: string;
  city: string;
  postalCode: string;
  canton?: string;
  country: string;
}

export function MultipleReviewConfirm({ form }: MultipleReviewConfirmProps) {
  const formValues = form.getValues();
  const requests = formValues.multipleRelocationRequests || [];
  const disasterAddresses = formValues.multipleDisasterAddresses || [];
  
  // Helper function to safely get nested values
  const getValue = (path: string, defaultValue: string = "Non spécifié") => {
    const pathParts = path.split(".");
    let value = formValues;
    
    for (const part of pathParts) {
      if (value === undefined || value === null) return defaultValue;
      value = value[part];
    }
    
    return value || defaultValue;
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
  const getNumberOfNights = (arrival?: string, departure?: string): number | null => {
    if (!arrival || !departure) return null;
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    if (isNaN(arrivalDate.getTime()) || isNaN(departureDate.getTime())) return null;
    const diff = departureDate.getTime() - arrivalDate.getTime();
    const nights = Math.round(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  // Function to format complete address
  const formatCompleteAddress = (address: DisasterAddress): string => {
    const parts = [
      address.street,
      address.postalCode && address.city ? `${address.postalCode} ${address.city}` : address.city,
      address.canton && address.canton !== "none" ? address.canton : null,
      address.country
    ].filter(Boolean);
    
    return parts.join(", ");
  };

  // Get form errors for validation
  const { formState: { errors } } = form;
  const reviewErrors = errors.multipleReviewConfirmation as any;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Vérification pour de multiples relogements</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Veuillez vérifier les détails et coordonnées des assurés avant de soumettre. 
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Broker Information Only */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
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
                {getValue("multiplePersonalData.firstName")} {getValue("multiplePersonalData.lastName")}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm text-foreground">{getValue("multiplePersonalData.email")}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">Téléphone</span>
              <span className="text-sm text-foreground">{getValue("multiplePersonalData.phone")}</span>
            </div>
          </div>
        </div>

        {/* People Information */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-lg">
              <Users className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Demandes de relogement</h3>
              <p className="text-sm text-muted-foreground">
                {requests.length} {requests.length === 1 ? "foyer enregistré" : "foyers enregistrés"}
              </p>
            </div>
          </div>
          
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request: any, index: number) => {
                const useExactDates = request.useExactDates ?? false;
                const arrivalDate = request.arrivalDate;
                const departureDate = request.departureDate;
                const estimatedDuration = request.estimatedDuration;
                const disasterAddressIndex = request.disasterAddressIndex ?? 0;
                const disasterAddress = disasterAddresses[disasterAddressIndex];
                
                // Calculate duration display
                let durationDisplay = "Non spécifié";
                if (useExactDates && arrivalDate && departureDate) {
                  const nights = getNumberOfNights(arrivalDate, departureDate);
                  durationDisplay = nights !== null ? `${nights} nuits` : "Non spécifié";
                } else if (estimatedDuration) {
                  durationDisplay = estimatedDuration;
                }
                
                return (
                  <div key={index} className="border border-border rounded-lg p-5 bg-muted/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full text-xs font-semibold text-primary">
                        {index + 1}
                      </div>
                      <h4 className="font-semibold text-foreground">
                        {request.firstName} {request.lastName}
                      </h4>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Contact & Timing Column */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-medium text-muted-foreground">Contact & Planning</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">Email:</span>
                            <span className="text-sm text-foreground">{request.email || "Non spécifié"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">Téléphone:</span>
                            <span className="text-sm text-foreground">{request.phone || "Non spécifié"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">Adresse de sinistre:</span>
                            <span className="text-sm text-foreground">
                              {disasterAddress ? formatCompleteAddress(disasterAddress) : "Non spécifiée"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">Date d'arrivée:</span>
                            <span className="text-sm text-foreground">{formatDate(request.arrivalDate)}</span>
                          </div>
                          {useExactDates && departureDate && (
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">Date de départ:</span>
                              <span className="text-sm text-foreground">{formatDate(departureDate)}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">
                              {useExactDates ? "Durée:" : "Durée estimée:"}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-foreground">{durationDisplay}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">Déclaration de sinistre:</span>
                            <div className="flex items-center gap-1">
                              {request.hasUploadedClaim ? (
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <span className="text-sm text-foreground">Oui</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="h-3 w-3 text-orange-500" />
                                  <span className="text-sm text-foreground">Non</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {request.hasUploadedClaim && request.claimDocument && (
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">Fichier:</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2">
                                      <File className="h-3 w-3 text-foreground" />
                                      <span className="text-sm text-foreground">Document téléchargé</span>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{request.claimDocument?.name || "Document téléchargé"}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Property Requirements Column */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-medium text-muted-foreground">Besoins logement</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Chambres</span>
                            <span className="text-base font-semibold text-foreground">{request.bedrooms || 0}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Adultes</span>
                            <span className="text-base font-semibold text-foreground">{request.adults || 0}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Enfants</span>
                            <span className="text-base font-semibold text-foreground">{request.children || 0}</span>
                          </div>
                        </div>
                      </div>

                      {/* Special Needs Column */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-medium text-muted-foreground">Besoins spécifiques</span>
                        </div>
                        <div className="space-y-3">
                          {request.hasAnimals && (
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <PawPrint className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-sm text-foreground">Animaux</span>
                            </div>
                          )}
                          {request.hasAccessibilityNeeds && (
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <Accessibility className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-sm text-foreground">Accessibilité</span>
                            </div>
                          )}
                          {request.needsParking && (
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <Car className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-sm text-foreground">Stationnement</span>
                            </div>
                          )}
                          {!request.hasAnimals && !request.hasAccessibilityNeeds && !request.needsParking && (
                            <div className="text-sm text-muted-foreground italic">
                              Aucun besoin spécifique
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-8 border border-dashed rounded-lg bg-muted/10">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                Aucune demande de relogement n'a été ajoutée. Veuillez revenir en arrière et ajouter au moins une personne.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Data Accuracy Confirmation */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Checkbox
            id="multipleReviewConfirmation.confirmDataAccuracy"
            checked={form.watch("multipleReviewConfirmation.confirmDataAccuracy") || false}
            onCheckedChange={(checked) => {
              form.setValue("multipleReviewConfirmation.confirmDataAccuracy", checked as boolean, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
              });
            }}
            className="mt-1"
          />
          <div className="space-y-2">
            <Label 
              htmlFor="multipleReviewConfirmation.confirmDataAccuracy" 
              className="text-base font-semibold text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Confirmation de l'exactitude des données <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Je confirme que toutes les informations fournies dans ces demandes sont exactes et complètes à la meilleure de ma connaissance. 
              Je comprends que des informations incorrectes peuvent affecter le traitement de ces demandes de relogement.
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