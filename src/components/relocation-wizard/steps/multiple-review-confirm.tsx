import { UseFormReturn } from "react-hook-form";
import { Users, Users2, CircleCheckBig, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
  
  const sectionClass = "border-b border-border pb-4 mb-4 last:border-0 last:pb-0 last:mb-0";
  const titleClass = "font-medium text-base mb-2";
  const detailRowClass = "flex flex-col md:flex-row md:items-baseline py-1.5";
  const labelClass = "text-sm font-medium text-muted-foreground md:w-1/3";
  const valueClass = "text-sm";
  const noBorderSectionClass = "pb-4 mb-4 last:pb-0 last:mb-0";

  // Get form errors for validation
  const { formState: { errors } } = form;
  const reviewErrors = errors.multipleReviewConfirmation as any;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Vérification des demandes multiples</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Veuillez vérifier les détails de toutes les demandes de relogement avant de soumettre. Si vous devez apporter des modifications, 
          vous pouvez revenir aux sections concernées.
        </p>
      </div>

      <div className="space-y-4">
        {/* Disaster Address */}
        <div className="bg-muted/20 p-5 rounded-md border border-border">
          <div className={sectionClass}>
            <h3 className={titleClass}>Adresse commune du sinistre</h3>
            <div className="space-y-0.5">
              <div className={detailRowClass}>
                <span className={labelClass}>Rue :</span>
                <span className={valueClass}>{getValue("multipleDisasterAddress.street")}</span>
              </div>
              <div className={detailRowClass}>
                <span className={labelClass}>Ville :</span>
                <span className={valueClass}>{getValue("multipleDisasterAddress.city")}</span>
              </div>
              <div className={detailRowClass}>
                <span className={labelClass}>Code postal :</span>
                <span className={valueClass}>{getValue("multipleDisasterAddress.postalCode")}</span>
              </div>
              <div className={detailRowClass}>
                <span className={labelClass}>Canton :</span>
                <span className={valueClass}>{getValue("multipleDisasterAddress.canton")}</span>
              </div>
              <div className={detailRowClass}>
                <span className={labelClass}>Pays :</span>
                <span className={valueClass}>{getValue("multipleDisasterAddress.country")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* People Information */}
        <h3 className="text-lg font-medium mt-6 mb-3 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Relocation Requests ({requests.length})
        </h3>
        
        {requests.length > 0 ? (
          <div className="space-y-3">
            {requests.map((request: any, index: number) => (
              <div key={index} className="bg-muted/20 p-4 rounded-md border border-border">
                <h4 className="font-medium text-sm mb-2 flex items-center">
                  <Users2 className="h-4 w-4 mr-1.5 text-muted-foreground" />
                  Person {index + 1}: {request.firstName} {request.lastName}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  {/* Contact & Timing Column */}
                  <div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-xs text-muted-foreground">Email:</span>
                      <span className="col-span-2">{request.email || "Non spécifié"}</span>
                      
                      <span className="text-xs text-muted-foreground">Phone:</span>
                      <span className="col-span-2">{request.phone || "Non spécifié"}</span>
                      
                      <span className="text-xs text-muted-foreground">Arrival:</span>
                      <span className="col-span-2">{formatDate(request.arrivalDate)}</span>
                      
                      <span className="text-xs text-muted-foreground">Duration:</span>
                      <span className="col-span-2">{request.estimatedDuration || "Non spécifié"}</span>

                      <span className="text-xs text-muted-foreground">Claim Document:</span>
                      <span className="col-span-2 flex items-center gap-1.5">
                        {request.hasUploadedClaim ? (
                          <>
                            <CircleCheckBig className="h-4 w-4 text-green-500" />
                            <span>Téléchargé ({request.claimDocument?.name})</span>
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 text-red-500" />
                            <span>Non téléchargé</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  {/* Property Requirements Column */}
                  <div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-xs text-muted-foreground">Bedrooms:</span>
                      <span className="col-span-2">{request.bedrooms}</span>
                      
                      <span className="text-xs text-muted-foreground">Adults:</span>
                      <span className="col-span-2">{request.adults}</span>
                      
                      <span className="text-xs text-muted-foreground">Children:</span>
                      <span className="col-span-2">{request.children}</span>
                    </div>
                  </div>

                  {/* Special Needs Column */}
                  <div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-xs text-muted-foreground">Pets:</span>
                      <span className="col-span-2">{request.hasAnimals ? "Oui" : "Non"}</span>
                      
                      <span className="text-xs text-muted-foreground">Accessibility:</span>
                      <span className="col-span-2">{request.hasAccessibilityNeeds ? "Oui" : "Non"}</span>
                      
                      <span className="text-xs text-muted-foreground">Parking:</span>
                      <span className="col-span-2">{request.needsParking ? "Oui" : "Non"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-md bg-muted/10">
            <p className="text-sm text-muted-foreground">
              Aucune demande de relogement n'a été ajoutée. Veuillez revenir en arrière et ajouter au moins une personne.
            </p>
          </div>
        )}

        {/* Data Accuracy Confirmation */}
        <div className="mt-6 p-4 border border-border rounded-lg bg-background">
          <div className="flex items-start space-x-3">
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
              className="mt-0.5"
            />
            <div className="space-y-1">
              <Label 
                htmlFor="multipleReviewConfirmation.confirmDataAccuracy" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Confirmation de l'exactitude des données <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                Je confirme que toutes les informations fournies dans ces demandes sont exactes et complètes à la meilleure de ma connaissance. 
                Je comprends que des informations incorrectes peuvent affecter le traitement de ces demandes de relogement.
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
    </div>
  );
} 