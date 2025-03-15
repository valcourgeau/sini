import { UseFormReturn } from "react-hook-form";

interface SingleReviewConfirmProps {
  form: UseFormReturn<any>;
}

export function SingleReviewConfirm({ form }: SingleReviewConfirmProps) {
  const formValues = form.getValues();
  
  // Helper functions to handle optional nested objects safely
  const getValue = (path: string, defaultValue: string = "Not provided") => {
    const pathParts = path.split(".");
    let value = formValues;
    
    for (const part of pathParts) {
      if (value === undefined || value === null) return defaultValue;
      value = value[part];
    }
    
    return value || defaultValue;
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
          </div>
        </div>
        
        {/* Relocation Preferences */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Relocation Preferences</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Maximum Distance:</span>
              <span className={valueClass}>
                {getValue("singleRelocationPreferences.maxDistance") !== "Not provided" 
                  ? `Up to ${getValue("singleRelocationPreferences.maxDistance")} km` 
                  : "Not specified"}
              </span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Preferred Areas:</span>
              <span className={valueClass}>{getValue("singleRelocationPreferences.preferredAreas")}</span>
            </div>
            {getValue("singleRelocationPreferences.additionalNotes") !== "Not provided" && (
              <div className={detailRowClass}>
                <span className={labelClass}>Additional Notes:</span>
                <span className={valueClass}>{getValue("singleRelocationPreferences.additionalNotes")}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Special Needs */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Special Needs</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Pets/Animals:</span>
              <span className={valueClass}>
                {getValue("singleSpecialNeeds.hasAnimals") ? "Yes" : "No"}
                {getValue("singleSpecialNeeds.hasAnimals") && getValue("singleSpecialNeeds.animalDetails") !== "Not provided" && 
                  ` - ${getValue("singleSpecialNeeds.animalDetails")}`}
              </span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Accessibility Requirements:</span>
              <span className={valueClass}>
                {getValue("singleSpecialNeeds.hasAccessibilityNeeds") ? "Yes" : "No"}
                {getValue("singleSpecialNeeds.hasAccessibilityNeeds") && getValue("singleSpecialNeeds.accessibilityDetails") !== "Not provided" && 
                  ` - ${getValue("singleSpecialNeeds.accessibilityDetails")}`}
              </span>
            </div>
            {getValue("singleSpecialNeeds.otherSpecialNeeds") !== "Not provided" && (
              <div className={detailRowClass}>
                <span className={labelClass}>Other Special Needs:</span>
                <span className={valueClass}>{getValue("singleSpecialNeeds.otherSpecialNeeds")}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Arrival & Duration */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Arrival & Duration</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Desired Arrival Date:</span>
              <span className={valueClass}>{formatDate(getValue("singleArrivalDetails.arrivalDate"))}</span>
            </div>
            <div className={detailRowClass}>
              <span className={labelClass}>Estimated Duration:</span>
              <span className={valueClass}>{getValue("singleArrivalDetails.estimatedDuration")}</span>
            </div>
          </div>
        </div>
        
        {/* Insurance Information */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Insurance Information</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Has Insurance Coverage:</span>
              <span className={valueClass}>
                {getValue("singleInsuranceCoverage.hasInsurance") === true 
                  ? "Yes" 
                  : getValue("singleInsuranceCoverage.hasInsurance") === false 
                    ? "No" 
                    : "Unsure"}
              </span>
            </div>
            
            {getValue("singleInsuranceCoverage.hasInsurance") === true && (
              <>
                <div className={detailRowClass}>
                  <span className={labelClass}>Insurance Company:</span>
                  <span className={valueClass}>{getValue("singleInsuranceDetails.insuranceCompany")}</span>
                </div>
                <div className={detailRowClass}>
                  <span className={labelClass}>Policy Number:</span>
                  <span className={valueClass}>{getValue("singleInsuranceDetails.policyNumber")}</span>
                </div>
                {getValue("singleInsuranceDetails.agentContact") !== "Not provided" && (
                  <div className={detailRowClass}>
                    <span className={labelClass}>Agent Contact:</span>
                    <span className={valueClass}>{getValue("singleInsuranceDetails.agentContact")}</span>
                  </div>
                )}
              </>
            )}
            
            {getValue("singleInsuranceCoverage.hasInsurance") === null && (
              <>
                {/* Swiss Insurance Details */}
                <div className="mt-3 border-t border-border pt-3">
                  <h4 className="font-medium text-sm mb-2">Swiss Insurance Details</h4>
                  
                  {/* RC Insurance */}
                  {getValue("swissInsuranceDetails.hasRCInsurance") && (
                    <div className="ml-2 mb-3">
                      <div className="font-medium text-sm">Responsabilité Civile (RC) Insurance</div>
                      <div className={detailRowClass}>
                        <span className={labelClass}>Insurance Company:</span>
                        <span className={valueClass}>{getValue("swissInsuranceDetails.rcInsuranceCompany")}</span>
                      </div>
                      <div className={detailRowClass}>
                        <span className={labelClass}>Policy Number:</span>
                        <span className={valueClass}>{getValue("swissInsuranceDetails.rcPolicyNumber")}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Ménage Insurance */}
                  {getValue("swissInsuranceDetails.hasMenageInsurance") && (
                    <div className="ml-2 mb-3">
                      <div className="font-medium text-sm">Assurance Ménage (Household Insurance)</div>
                      <div className={detailRowClass}>
                        <span className={labelClass}>Insurance Company:</span>
                        <span className={valueClass}>{getValue("swissInsuranceDetails.menageInsuranceCompany")}</span>
                      </div>
                      <div className={detailRowClass}>
                        <span className={labelClass}>Policy Number:</span>
                        <span className={valueClass}>{getValue("swissInsuranceDetails.menagePolicyNumber")}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Natural Disaster Insurance */}
                  {getValue("swissInsuranceDetails.hasNaturalDisasterInsurance") && (
                    <div className="ml-2 mb-3">
                      <div className="font-medium text-sm">Natural Disaster Insurance</div>
                      <div className={detailRowClass}>
                        <span className={labelClass}>Insurance Company:</span>
                        <span className={valueClass}>{getValue("swissInsuranceDetails.naturalDisasterInsuranceCompany")}</span>
                      </div>
                      <div className={detailRowClass}>
                        <span className={labelClass}>Policy Number:</span>
                        <span className={valueClass}>{getValue("swissInsuranceDetails.naturalDisasterPolicyNumber")}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Building Insurance */}
                  {getValue("swissInsuranceDetails.hasBuildingInsurance") && (
                    <div className="ml-2 mb-3">
                      <div className="font-medium text-sm">Building Insurance</div>
                      <div className={detailRowClass}>
                        <span className={labelClass}>Insurance Company:</span>
                        <span className={valueClass}>{getValue("swissInsuranceDetails.buildingInsuranceCompany")}</span>
                      </div>
                      <div className={detailRowClass}>
                        <span className={labelClass}>Policy Number:</span>
                        <span className={valueClass}>{getValue("swissInsuranceDetails.buildingPolicyNumber")}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* ECA Insurance */}
                  {getValue("swissInsuranceDetails.ecaPolicyNumber") !== "Not provided" && (
                    <div className="ml-2 mb-3">
                      <div className="font-medium text-sm">ECA Insurance (Canton de Vaud)</div>
                      <div className={detailRowClass}>
                        <span className={labelClass}>Policy Number:</span>
                        <span className={valueClass}>{getValue("swissInsuranceDetails.ecaPolicyNumber")}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Additional Information */}
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
              </>
            )}
          </div>
        </div>
        
        {/* Lease Information */}
        <div className={sectionClass}>
          <h3 className={titleClass}>Lease Information</h3>
          <div className="space-y-0.5">
            <div className={detailRowClass}>
              <span className={labelClass}>Lease Terminated:</span>
              <span className={valueClass}>{getValue("singleLeaseTermination.hasTerminatedLease") ? "Yes" : "No"}</span>
            </div>
            
            {getValue("singleLeaseTermination.hasTerminatedLease") && (
              <div className={detailRowClass}>
                <span className={labelClass}>Termination Date:</span>
                <span className={valueClass}>{formatDate(getValue("singleLeaseTermination.terminationDate"))}</span>
              </div>
            )}
            
            <div className={detailRowClass}>
              <span className={labelClass}>Landlord Notified:</span>
              <span className={valueClass}>{getValue("singleLeaseTermination.hasNotifiedLandlord") ? "Yes" : "No"}</span>
            </div>
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