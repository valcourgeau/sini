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
  PawPrint
} from "lucide-react";

interface MultipleReviewConfirmProps {
  form: UseFormReturn<any>;
}

export function MultipleReviewConfirm({ form }: MultipleReviewConfirmProps) {
  const formValues = form.getValues();
  const requests = formValues.multipleRelocationRequests || [];
  
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

  // Get form errors for validation
  const { formState: { errors } } = form;
  const reviewErrors = errors.multipleReviewConfirmation as any;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
          <CheckCircle className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Vérification des demandes multiples</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Veuillez vérifier les détails de toutes les demandes de relogement avant de soumettre. 
            Si vous devez apporter des modifications, vous pouvez revenir aux sections concernées.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Disaster Address */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Adresse commune du sinistre</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Rue</span>
                <p className="text-foreground">{getValue("multipleDisasterAddress.street")}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Ville</span>
                <p className="text-foreground">{getValue("multipleDisasterAddress.city")}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Code postal</span>
                <p className="text-foreground">{getValue("multipleDisasterAddress.postalCode")}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Canton</span>
                <p className="text-foreground">{getValue("multipleDisasterAddress.canton")}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Pays</span>
                <p className="text-foreground">{getValue("multipleDisasterAddress.country")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Broker Information */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Informations du courtier</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Prénom</span>
                <p className="text-foreground">{getValue("multiplePersonalData.firstName")}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Nom</span>
                <p className="text-foreground">{getValue("multiplePersonalData.lastName")}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Email</span>
                <p className="text-foreground">{getValue("multiplePersonalData.email")}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Téléphone</span>
                <p className="text-foreground">{getValue("multiplePersonalData.phone")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* People Information */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Demandes de relogement</h3>
              <p className="text-sm text-muted-foreground">{requests.length} foyer(s) enregistré(s)</p>
            </div>
          </div>
          
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request: any, index: number) => {
                const useExactDates = request.useExactDates ?? false;
                const arrivalDate = request.arrivalDate;
                const departureDate = request.departureDate;
                const estimatedDuration = request.estimatedDuration;
                
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
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">Contact & Planning</span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-xs font-medium text-muted-foreground">Email</span>
                            <p className="text-sm text-foreground">{request.email || "Non spécifié"}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-muted-foreground">Téléphone</span>
                            <p className="text-sm text-foreground">{request.phone || "Non spécifié"}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-muted-foreground">Date d'arrivée</span>
                            <p className="text-sm text-foreground">{formatDate(request.arrivalDate)}</p>
                          </div>
                          {useExactDates && departureDate && (
                            <div>
                              <span className="text-xs font-medium text-muted-foreground">Date de départ</span>
                              <p className="text-sm text-foreground">{formatDate(departureDate)}</p>
                            </div>
                          )}
                          <div>
                            <span className="text-xs font-medium text-muted-foreground">
                              {useExactDates ? "Durée" : "Durée estimée"}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <p className="text-sm text-foreground">{durationDisplay}</p>
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-muted-foreground">Document</span>
                            <div className="flex items-center gap-2 mt-1">
                              {request.hasUploadedClaim ? (
                                <>
                                  <CheckCircle className="h-3 w-3 text-primary" />
                                  <span className="text-sm text-foreground">Téléchargé ({request.claimDocument?.name})</span>
                                </>
                              ) : (
                                <>
                                  <X className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-sm text-foreground">Non téléchargé</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Property Requirements Column */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Home className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">Besoins logement</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Home className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs font-medium text-muted-foreground">Chambres</span>
                            </div>
                            <p className="text-lg font-semibold text-foreground">{request.bedrooms || 0}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs font-medium text-muted-foreground">Adultes</span>
                            </div>
                            <p className="text-lg font-semibold text-foreground">{request.adults || 0}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs font-medium text-muted-foreground">Enfants</span>
                            </div>
                            <p className="text-lg font-semibold text-foreground">{request.children || 0}</p>
                          </div>
                        </div>
                      </div>

                      {/* Special Needs Column */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Heart className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">Besoins spécifiques</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2">
                              <PawPrint className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs font-medium">Animaux</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.hasAnimals 
                                ? "bg-primary/10 text-primary" 
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {request.hasAnimals ? "Oui" : "Non"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Accessibility className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs font-medium">Accessibilité</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.hasAccessibilityNeeds 
                                ? "bg-primary/10 text-primary" 
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {request.hasAccessibilityNeeds ? "Oui" : "Non"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Car className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs font-medium">Stationnement</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.needsParking 
                                ? "bg-primary/10 text-primary" 
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {request.needsParking ? "Oui" : "Non"}
                            </span>
                          </div>
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
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
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