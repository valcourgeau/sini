import { UseFormReturn } from "react-hook-form";
import { Users } from "lucide-react";

interface MultipleReviewConfirmProps {
  form: UseFormReturn<any>;
}

export function MultipleReviewConfirm({ form }: MultipleReviewConfirmProps) {
  const formValues = form.getValues();
  const requests = formValues.multipleRelocationRequests || [];
  
  // Helper function to safely get nested values
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
        <h2 className="text-lg font-medium mb-4">Review Multiple Requests</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please review the details of all relocation requests before submitting. If you need to make 
          changes, you can navigate back to the relevant sections.
        </p>
      </div>

      <div className="space-y-4">
        {/* Disaster Address */}
        <div className="bg-muted/20 p-5 rounded-md border border-border">
          <div className={sectionClass}>
            <h3 className={titleClass}>Common Disaster Address</h3>
            <div className="space-y-0.5">
              <div className={detailRowClass}>
                <span className={labelClass}>Street:</span>
                <span className={valueClass}>{getValue("multipleDisasterAddress.street")}</span>
              </div>
              <div className={detailRowClass}>
                <span className={labelClass}>City:</span>
                <span className={valueClass}>{getValue("multipleDisasterAddress.city")}</span>
              </div>
              <div className={detailRowClass}>
                <span className={labelClass}>Postal Code:</span>
                <span className={valueClass}>{getValue("multipleDisasterAddress.postalCode")}</span>
              </div>
              <div className={detailRowClass}>
                <span className={labelClass}>Country:</span>
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
          <div className="space-y-4">
            {requests.map((request: any, index: number) => (
              <div key={index} className="bg-muted/20 p-5 rounded-md border border-border">
                <h4 className="font-medium text-base mb-4">Person {index + 1}: {request.firstName} {request.lastName}</h4>
                
                <div className="space-y-4">
                  <div className={sectionClass}>
                    <h5 className="font-medium text-sm mb-2">Contact Information</h5>
                    <div className="space-y-0.5">
                      <div className={detailRowClass}>
                        <span className={labelClass}>Email:</span>
                        <span className={valueClass}>{request.email || "Not provided"}</span>
                      </div>
                      <div className={detailRowClass}>
                        <span className={labelClass}>Phone:</span>
                        <span className={valueClass}>{request.phone || "Not provided"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={sectionClass}>
                    <h5 className="font-medium text-sm mb-2">Relocation Details</h5>
                    <div className="space-y-0.5">
                      {request.arrivalDate && (
                        <div className={detailRowClass}>
                          <span className={labelClass}>Arrival Date:</span>
                          <span className={valueClass}>{formatDate(request.arrivalDate)}</span>
                        </div>
                      )}
                      {request.estimatedDuration && (
                        <div className={detailRowClass}>
                          <span className={labelClass}>Estimated Duration:</span>
                          <span className={valueClass}>{request.estimatedDuration}</span>
                        </div>
                      )}
                      {request.specialNeeds && (
                        <div className={detailRowClass}>
                          <span className={labelClass}>Special Needs:</span>
                          <span className={valueClass}>{request.specialNeeds}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={sectionClass}>
                    <h5 className="font-medium text-sm mb-2">Insurance Information</h5>
                    <div className="space-y-0.5">
                      <div className={detailRowClass}>
                        <span className={labelClass}>Has Insurance:</span>
                        <span className={valueClass}>{request.hasInsurance ? "Yes" : "No"}</span>
                      </div>
                      {request.hasInsurance && request.insuranceDetails && (
                        <div className={detailRowClass}>
                          <span className={labelClass}>Insurance Details:</span>
                          <span className={valueClass}>{request.insuranceDetails}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-md bg-muted/10">
            <p className="text-sm text-muted-foreground">
              No relocation requests have been added. Please go back and add at least one person.
            </p>
          </div>
        )}

        <div className="p-4 bg-amber-50 rounded-md border border-amber-100 mt-6">
          <p className="text-sm text-amber-700">
            <strong>Please verify:</strong> Check that all the information above is correct before proceeding to the 
            next step. You will be asked to provide consent for processing these requests on the next screen.
          </p>
        </div>
      </div>
    </div>
  );
} 