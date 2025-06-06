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
  const getValue = (path: string, defaultValue: string = "Not provided") => {
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
    if (!dateStr) return "Not provided";
    
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-GB", {
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
        <h2 className="text-lg font-medium mb-4">Review Your Request</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please review your relocation request details before submitting. If you need to make changes, 
          you can navigate back to the relevant sections.
        </p>
      </div>

      <div className="space-y-4 bg-muted/20 p-5 rounded-md border border-border">
        {/* Personal Information */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Personal Information</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Name:</span>
              <span className={valueClass}>
                {getValue("singlePersonalData.firstName")} {getValue("singlePersonalData.lastName")}
              </span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Email:</span>
              <span className={valueClass}>{getValue("singlePersonalData.email")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Phone:</span>
              <span className={valueClass}>{getValue("singlePersonalData.phone")}</span>
            </div>
          </div>
        </div>
        
        {/* Disaster Address */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Disaster Address</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Street:</span>
              <span className={valueClass}>{getValue("singleDisasterAddress.street")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>City:</span>
              <span className={valueClass}>{getValue("singleDisasterAddress.city")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Postal Code:</span>
              <span className={valueClass}>{getValue("singleDisasterAddress.postalCode")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Country:</span>
              <span className={valueClass}>{getValue("singleDisasterAddress.country")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Role:</span>
              <span className={valueClass}>{getValue("role")}</span>
            </div>
          </div>
        </div>
        
        {/* Relocation Preferences */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Relocation Preferences</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Bedrooms:</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.bedrooms")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Bathrooms:</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.bathrooms")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Adults:</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.adults")}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Children:</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.children")}</span>
            </div>
          </div>
        </div>
        
        {/* Special Requirements */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Special Requirements</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Pets:</span>
              <span className={valueClass}>
                {getBooleanValue("singleRelocationPreferences.hasAnimals") ? "Yes" : "No"}
              </span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Accessibility:</span>
              <span className={valueClass}>
                {getBooleanValue("singleRelocationPreferences.hasAccessibilityNeeds") ? "Yes" : "No"}
              </span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Parking:</span>
              <span className={valueClass}>
                {getBooleanValue("singleRelocationPreferences.needsParking") ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Arrival & Duration */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Arrival & Duration</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Preferred Arrival Date:</span>
              <span className={valueClass}>{formatDate(getValue("singleArrivalDetails.arrivalDate"))}</span>
            </div>
            {getValue("singleArrivalDetails.useExactDates") === true && getValue("singleArrivalDetails.departureDate") && (
              <div className={detailRowClass}>
                <span className={labelClass}>Departure Date:</span>
                <span className={valueClass}>{formatDate(getValue("singleArrivalDetails.departureDate"))}</span>
              </div>
            )}
            {getValue("singleArrivalDetails.useExactDates") !== true && (
              <div className={detailRowClass}>
                <span className={labelClass}>Estimated Duration:</span>
                <span className={valueClass}>{getValue("singleArrivalDetails.estimatedDuration")}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Insurance Information */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Insurance Information</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Has Insurance Coverage for Relocation:</span>
              <span className={valueClass}>
                {getValue("singleInsuranceCoverage.hasInsurance") === true 
                  ? "Yes" 
                  : getValue("singleInsuranceCoverage.hasInsurance") === false 
                    ? "No" 
                    : "Unsure"}
              </span>
            </div>
            
            {getValue("singleInsuranceCoverage.hasInsurance") === true && (
              <div className={detailRowClass}>
                <span className={labelClass}>Claim Document Uploaded:</span>
                <span className={valueClass}>
                  {getValue("singleInsuranceCoverage.hasUploadedClaim") === true 
                    ? "Yes" 
                    : "No"}
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
                    getValue("swissInsuranceDetails.ecaPolicyNumber") !== "Not provided" ||
                    getValue("swissInsuranceDetails.agentContact") !== "Not provided" ||
                    getValue("swissInsuranceDetails.additionalNotes") !== "Not provided") ? (
                    <div className="space-y-4">
                      {/* RC Insurance */}
                      <div className="ml-2 rounded-md bg-gray-50 p-3 border-l-2 border-gray-300">
                        <div className="font-medium text-sm text-gray-700">Responsabilité Civile (RC) Insurance</div>
                        <div className={detailRowClass}>
                          <span className={labelClass}>Has RC Insurance:</span>
                          <span className={valueClass}>
                            {getValue("swissInsuranceDetails.hasRCInsurance") === true 
                              ? "Yes" 
                              : getValue("swissInsuranceDetails.hasRCInsurance") === false 
                                ? "No" 
                                : "Not specified"}
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
                            {getValue("swissInsuranceDetails.rcContactPerson") !== "Not provided" && (
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
                        <div className="font-medium text-sm text-gray-700">Assurance Ménage (Household Insurance)</div>
                        <div className={detailRowClass}>
                          <span className={labelClass}>Has Ménage Insurance:</span>
                          <span className={valueClass}>
                            {getValue("swissInsuranceDetails.hasMenageInsurance") === true 
                              ? "Yes" 
                              : getValue("swissInsuranceDetails.hasMenageInsurance") === false 
                                ? "No" 
                                : "Not specified"}
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
                            {getValue("swissInsuranceDetails.menageContactPerson") !== "Not provided" && (
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
                        <div className="font-medium text-sm text-gray-700">Natural Disaster Insurance</div>
                        <div className={detailRowClass}>
                          <span className={labelClass}>Has Natural Disaster Insurance:</span>
                          <span className={valueClass}>
                            {getValue("swissInsuranceDetails.hasNaturalDisasterInsurance") === true 
                              ? "Yes" 
                              : getValue("swissInsuranceDetails.hasNaturalDisasterInsurance") === false 
                                ? "No" 
                                : "Not specified"}
                          </span>
                        </div>
                        {getValue("swissInsuranceDetails.hasNaturalDisasterInsurance") === true && (
                          <>
                            <div className={detailRowClass}>
                              <span className={labelClass}>Insurance Company:</span>
                              <span className={valueClass}>{getValue("swissInsuranceDetails.naturalDisasterInsuranceCompany")}</span>
                            </div>
                            <div className={detailRowClass}>
                              <span className={labelClass}>Policy Number:</span>
                              <span className={valueClass}>{getValue("swissInsuranceDetails.naturalDisasterPolicyNumber")}</span>
                            </div>
                            {getValue("swissInsuranceDetails.naturalDisasterContactPerson") !== "Not provided" && (
                              <div className={detailRowClass}>
                                <span className={labelClass}>Contact details:</span>
                                <span className={valueClass}>{getValue("swissInsuranceDetails.naturalDisasterContactPerson")}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      
                      {/* Building Insurance - Only show if user is an owner */}
                      {getValue("role") === "owner" && (
                        <div className="ml-2 rounded-md bg-gray-50 p-3 border-l-2 border-gray-300">
                          <div className="font-medium text-sm text-gray-700">Building Insurance</div>
                          <div className={detailRowClass}>
                            <span className={labelClass}>Has Building Insurance:</span>
                            <span className={valueClass}>
                              {getValue("swissInsuranceDetails.hasBuildingInsurance") === true 
                                ? "Yes" 
                                : getValue("swissInsuranceDetails.hasBuildingInsurance") === false 
                                  ? "No" 
                                  : "Not specified"}
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
                              {getValue("swissInsuranceDetails.buildingContactPerson") !== "Not provided" && (
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
                          <div className="font-medium text-sm text-gray-700">ECA Insurance (Canton de Vaud)</div>
                          <div className={detailRowClass}>
                            <span className={labelClass}>Policy Number:</span>
                            <span className={valueClass}>{getValue("swissInsuranceDetails.ecaPolicyNumber")}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Additional Information */}
                      {(getValue("swissInsuranceDetails.agentContact") !== "Not provided" || 
                        getValue("swissInsuranceDetails.additionalNotes") !== "Not provided") && (
                        <div className="ml-2 mt-4 p-3 border-t border-border/50 bg-gray-50 rounded-md">
                          <div className="font-medium text-sm mb-1">Additional Information</div>
                          {getValue("swissInsuranceDetails.agentContact") !== "Not provided" && (
                            <div className={detailRowClass}>
                              <span className={labelClass}>Agent Contact:</span>
                              <span className={valueClass}>{getValue("swissInsuranceDetails.agentContact")}</span>
                            </div>
                          )}
                          
                          {getValue("swissInsuranceDetails.additionalNotes") !== "Not provided" && (
                            <div className={detailRowClass}>
                              <span className={labelClass}>Additional Notes:</span>
                              <span className={valueClass}>{getValue("swissInsuranceDetails.additionalNotes")}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground ml-2">
                      No insurance information provided. Our team will help you identify potential coverage options.
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
          <strong>Please verify:</strong> Check that all the information above is correct before proceeding to the 
          next step. You will be asked to provide consent for processing your request on the next screen.
        </p>
      </div>
    </div>
  );
} 