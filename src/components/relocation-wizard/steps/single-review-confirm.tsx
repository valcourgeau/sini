import { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";

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
          <h3 className={titleClass}>Informations personnelles</h3>
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
            <div className={detailRowClass}>
              <span className={labelClass}>Rôle :</span>
              <span className={valueClass}>{getValue("role")}</span>
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
              <span className={labelClass}>Salles de bain :</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.bathrooms")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Adultes :</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.adults")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Enfants :</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.children")}</span>
            </div>
          </div>
        </div>
        
        {/* Special Requirements */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Besoins spéciaux</h3>
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
              <span className={labelClass}>Date d'arrivée souhaitée :</span>
              <span className={valueClass}>{formatDate(getValue("singleArrivalDetails.arrivalDate"))}</span>
            </div>
            {getValue("singleArrivalDetails.useExactDates") === true && getValue("singleArrivalDetails.departureDate") && (
              <div className={detailRowClass}>
                <span className={labelClass}>Date de départ :</span>
                <span className={valueClass}>{formatDate(getValue("singleArrivalDetails.departureDate"))}</span>
              </div>
            )}
            {getValue("singleArrivalDetails.useExactDates") !== true && (
              <div className={detailRowClass}>
                <span className={labelClass}>Durée estimée :</span>
                <span className={valueClass}>{getValue("singleArrivalDetails.estimatedDuration")}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Insurance Information */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Informations d'assurance</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Couverture d'assurance pour le relogement :</span>
              <span className={valueClass}>
                {getValue("singleInsuranceCoverage.hasInsurance") === true 
                  ? "Oui" 
                  : getValue("singleInsuranceCoverage.hasInsurance") === false 
                    ? "Non" 
                    : "Non spécifié"}
              </span>
            </div>
            
            {getValue("singleInsuranceCoverage.hasInsurance") === true && (
              <div className={detailRowClass}>
                <span className={labelClass}>Document de déclaration téléchargé :</span>
                <span className={valueClass}>
                  {getValue("singleInsuranceCoverage.hasUploadedClaim") === true 
                    ? "Oui" 
                    : "Non"}
                </span>
              </div>
            )}
            
            {getValue("singleInsuranceCoverage.hasInsurance") !== true && getValue("singleInsuranceCoverage.hasInsurance") !== false && (
              <>
                {/* Swiss Insurance Details */}
                <div className="mt-3 border-t border-border pt-3">
                  <h4 className="font-medium text-sm mb-2">Swiss Insurance Details</h4>
                  
                  {/* Check if any Swiss insurance information was provided */}
                  {(getValue("swissInsuranceDetails.hasRCInsurance") !== undefined ||
                    getValue("swissInsuranceDetails.hasMenageInsurance") !== undefined ||
                    getValue("swissInsuranceDetails.hasNaturalDisasterInsurance") !== undefined ||
                    getValue("swissInsuranceDetails.hasBuildingInsurance") !== undefined ||
                    getValue("swissInsuranceDetails.ecaPolicyNumber") !== "Non spécifié" ||
                    getValue("swissInsuranceDetails.agentContact") !== "Non spécifié" ||
                    getValue("swissInsuranceDetails.additionalNotes") !== "Non spécifié") ? (
                    <div className="space-y-4">
                      {/* RC Insurance */}
                      <div className="ml-2 rounded-md bg-gray-50 p-3 border-l-2 border-gray-300">
                        <div className="font-medium text-sm text-gray-700">Assurance responsabilité civile (RC)</div>
                        <div className={detailRowClass}>
                          <span className={labelClass}>Assurance RC :</span>
                          <span className={valueClass}>
                            {getValue("swissInsuranceDetails.hasRCInsurance") === true 
                              ? "Oui" 
                              : getValue("swissInsuranceDetails.hasRCInsurance") === false 
                                ? "Non" 
                                : "Non spécifié"}
                          </span>
                        </div>
                        {getValue("swissInsuranceDetails.hasRCInsurance") === true && (
                          <>
                            <div className={detailRowClass}>
                              <span className={labelClass}>Insurance Company:</span>
                              <span className={valueClass}>{getValue("swissInsuranceDetails.rcInsuranceCompany")}</span>
                            </div>
                            <div className={detailRowClass}>
                              <span className={labelClass}>Policy Number:</span>
                              <span className={valueClass}>{getValue("swissInsuranceDetails.rcPolicyNumber")}</span>
                            </div>
                            {getValue("swissInsuranceDetails.rcContactPerson") !== "Non spécifié" && (
                              <div className={detailRowClass}>
                                <span className={labelClass}>Contact details:</span>
                                <span className={valueClass}>{getValue("swissInsuranceDetails.rcContactPerson")}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      
                      {/* Ménage Insurance */}
                      <div className="ml-2 rounded-md bg-gray-50 p-3 border-l-2 border-gray-300">
                        <div className="font-medium text-sm text-gray-700">Assurance ménage</div>
                        <div className={detailRowClass}>
                          <span className={labelClass}>Assurance ménage :</span>
                          <span className={valueClass}>
                            {getValue("swissInsuranceDetails.hasMenageInsurance") === true 
                              ? "Oui" 
                              : getValue("swissInsuranceDetails.hasMenageInsurance") === false 
                                ? "Non" 
                                : "Non spécifié"}
                          </span>
                        </div>
                        {getValue("swissInsuranceDetails.hasMenageInsurance") === true && (
                          <>
                            <div className={detailRowClass}>
                              <span className={labelClass}>Insurance Company:</span>
                              <span className={valueClass}>{getValue("swissInsuranceDetails.menageInsuranceCompany")}</span>
                            </div>
                            <div className={detailRowClass}>
                              <span className={labelClass}>Policy Number:</span>
                              <span className={valueClass}>{getValue("swissInsuranceDetails.menagePolicyNumber")}</span>
                            </div>
                            {getValue("swissInsuranceDetails.menageContactPerson") !== "Non spécifié" && (
                              <div className={detailRowClass}>
                                <span className={labelClass}>Contact details:</span>
                                <span className={valueClass}>{getValue("swissInsuranceDetails.menageContactPerson")}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      
                      {/* Natural Disaster Insurance */}
                      <div className="ml-2 rounded-md bg-gray-50 p-3 border-l-2 border-gray-300">
                        <div className="font-medium text-sm text-gray-700">Assurance catastrophes naturelles</div>
                        <div className={detailRowClass}>
                          <span className={labelClass}>Assurance catastrophes naturelles :</span>
                          <span className={valueClass}>
                            {getValue("swissInsuranceDetails.hasNaturalDisasterInsurance") === true 
                              ? "Oui" 
                              : getValue("swissInsuranceDetails.hasNaturalDisasterInsurance") === false 
                                ? "Non" 
                                : "Non spécifié"}
                          </span>
                        </div>
                        {getValue("swissInsuranceDetails.hasNaturalDisasterInsurance") === true && (
                          <>
                            <div className={detailRowClass}>
                              <span className={labelClass}>Compagnie d'assurance :</span>
                              <span className={valueClass}>{getValue("swissInsuranceDetails.naturalDisasterInsuranceCompany")}</span>
                            </div>
                            <div className={detailRowClass}>
                              <span className={labelClass}>Numéro de police :</span>
                              <span className={valueClass}>{getValue("swissInsuranceDetails.naturalDisasterPolicyNumber")}</span>
                            </div>
                            {getValue("swissInsuranceDetails.naturalDisasterContactPerson") !== "Non spécifié" && (
                              <div className={detailRowClass}>
                                <span className={labelClass}>Coordonnées :</span>
                                <span className={valueClass}>{getValue("swissInsuranceDetails.naturalDisasterContactPerson")}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      
                      {/* Building Insurance - Only show if user is an owner */}
                      {getValue("role") === "owner" && (
                        <div className="ml-2 rounded-md bg-gray-50 p-3 border-l-2 border-gray-300">
                          <div className="font-medium text-sm text-gray-700">Assurance bâtiment</div>
                          <div className={detailRowClass}>
                            <span className={labelClass}>Assurance bâtiment :</span>
                            <span className={valueClass}>
                              {getValue("swissInsuranceDetails.hasBuildingInsurance") === true 
                                ? "Oui" 
                                : getValue("swissInsuranceDetails.hasBuildingInsurance") === false 
                                  ? "Non" 
                                  : "Non spécifié"}
                            </span>
                          </div>
                          {getValue("swissInsuranceDetails.hasBuildingInsurance") === true && (
                            <>
                              <div className={detailRowClass}>
                                <span className={labelClass}>Insurance Company:</span>
                                <span className={valueClass}>{getValue("swissInsuranceDetails.buildingInsuranceCompany")}</span>
                              </div>
                              <div className={detailRowClass}>
                                <span className={labelClass}>Policy Number:</span>
                                <span className={valueClass}>{getValue("swissInsuranceDetails.buildingPolicyNumber")}</span>
                              </div>
                              {getValue("swissInsuranceDetails.buildingContactPerson") !== "Non spécifié" && (
                                <div className={detailRowClass}>
                                  <span className={labelClass}>Contact details:</span>
                                  <span className={valueClass}>{getValue("swissInsuranceDetails.buildingContactPerson")}</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                      
                      {/* ECA Insurance - Only show for Canton de Vaud */}
                      {(getValue("singleDisasterAddress.canton") === "Vaud" || 
                        (getValue("singleDisasterAddress.postalCode").startsWith("1") && 
                         getValue("singleDisasterAddress.country") === "Switzerland")) && (
                        <div className="ml-2 rounded-md bg-gray-50 p-3 border-l-2 border-gray-300">
                          <div className="font-medium text-sm text-gray-700">Assurance ECA (Canton de Vaud)</div>
                          <div className={detailRowClass}>
                            <span className={labelClass}>Numéro de police :</span>
                            <span className={valueClass}>{getValue("swissInsuranceDetails.ecaPolicyNumber")}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Additional Information */}
                      {(getValue("swissInsuranceDetails.agentContact") !== "Non spécifié" || 
                        getValue("swissInsuranceDetails.additionalNotes") !== "Non spécifié") && (
                        <div className="ml-2 mt-4 p-3 border-t border-border/50 bg-gray-50 rounded-md">
                          <div className="font-medium text-sm mb-1">Informations supplémentaires</div>
                          {getValue("swissInsuranceDetails.agentContact") !== "Non spécifié" && (
                            <div className={detailRowClass}>
                              <span className={labelClass}>Contact agent :</span>
                              <span className={valueClass}>{getValue("swissInsuranceDetails.agentContact")}</span>
                            </div>
                          )}
                          
                          {getValue("swissInsuranceDetails.additionalNotes") !== "Non spécifié" && (
                            <div className={detailRowClass}>
                              <span className={labelClass}>Notes supplémentaires :</span>
                              <span className={valueClass}>{getValue("swissInsuranceDetails.additionalNotes")}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground ml-2">
                      Aucune information d'assurance fournie. Notre équipe vous aidera à identifier les options de couverture potentielles.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 rounded-md border border-amber-100">
        <p className="text-sm text-amber-700">
          <strong>Veuillez vérifier :</strong> Assurez-vous que toutes les informations ci-dessus sont correctes avant de passer à l'étape suivante. 
          Vous serez invité à donner votre consentement pour le traitement de votre demande à l'écran suivant.
        </p>
      </div>
    </div>
  );
} 