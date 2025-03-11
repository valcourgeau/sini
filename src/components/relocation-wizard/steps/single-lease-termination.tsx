import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface SingleLeaseTerminationProps {
  form: UseFormReturn<any>;
}

export function SingleLeaseTermination({ form }: SingleLeaseTerminationProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const leaseErrors = errors.singleLeaseTermination || {};
  
  const hasTerminatedLease = watch("singleLeaseTermination.hasTerminatedLease");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Lease Termination Status</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please provide information about the status of your current lease or rental agreement.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="singleLeaseTermination.hasTerminatedLease"
              {...register("singleLeaseTermination.hasTerminatedLease")}
              className="rounded border-input h-5 w-5 mt-0.5"
              onChange={(e) => {
                setValue("singleLeaseTermination.hasTerminatedLease", e.target.checked);
                if (!e.target.checked) {
                  setValue("singleLeaseTermination.terminationDate", "");
                }
              }}
            />
            <div className="space-y-1">
              <Label htmlFor="singleLeaseTermination.hasTerminatedLease" className="text-base font-medium">
                I have terminated my current lease/rental agreement
              </Label>
              <p className="text-sm text-muted-foreground">
                Check this if you have already given notice to end your current lease.
              </p>
            </div>
          </div>
          
          {hasTerminatedLease && (
            <div className="ml-8 space-y-2">
              <Label htmlFor="singleLeaseTermination.terminationDate">
                Lease Termination Date
              </Label>
              <input
                id="singleLeaseTermination.terminationDate"
                type="date"
                {...register("singleLeaseTermination.terminationDate")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                The date when your current lease will officially end.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="singleLeaseTermination.hasNotifiedLandlord"
              {...register("singleLeaseTermination.hasNotifiedLandlord")}
              className="rounded border-input h-5 w-5 mt-0.5"
            />
            <div className="space-y-1">
              <Label htmlFor="singleLeaseTermination.hasNotifiedLandlord" className="text-base font-medium">
                I have notified my landlord about the disaster
              </Label>
              <p className="text-sm text-muted-foreground">
                Check this if you have informed your landlord about the disaster and your need for relocation.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Your lease status information helps us understand your timeline and urgency. 
            If you haven't terminated your lease yet, we recommend consulting with your landlord or a legal advisor 
            about your options in light of the disaster circumstances.
          </p>
        </div>
      </div>
    </div>
  );
} 