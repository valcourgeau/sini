import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Check, FileTerminal, Bell, Calendar } from "lucide-react";
import { useState } from "react";

interface SingleLeaseTerminationProps {
  form: UseFormReturn<any>;
}

export function SingleLeaseTermination({ form }: SingleLeaseTerminationProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const leaseErrors = errors.singleLeaseTermination || {};
  
  const hasTerminatedLease = watch("singleLeaseTermination.hasTerminatedLease");
  const hasNotifiedLandlord = watch("singleLeaseTermination.hasNotifiedLandlord");
  const terminationDate = watch("singleLeaseTermination.terminationDate");

  const handleToggleTermination = (value: boolean) => {
    setValue("singleLeaseTermination.hasTerminatedLease", value);
    if (!value) {
      setValue("singleLeaseTermination.terminationDate", "");
    }
  };

  const handleToggleNotification = (value: boolean) => {
    setValue("singleLeaseTermination.hasNotifiedLandlord", value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Lease Termination Status</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please provide information about the status of your current lease or rental agreement.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lease Termination Card */}
          <div className="relative">
            <button
              type="button"
              onClick={() => handleToggleTermination(!hasTerminatedLease)}
              className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 w-full ${
                hasTerminatedLease === true
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
              aria-pressed={hasTerminatedLease === true}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
                hasTerminatedLease === true 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              }`}>
                <FileTerminal size={32} />
              </div>

              <h3 className="text-lg font-medium mb-1">Lease Termination</h3>
              <p className="text-sm text-center text-muted-foreground">
                For my current lease/rental agreement
              </p>

              {hasTerminatedLease === true && (
                <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                  <Check size={16} />
                </div>
              )}

              <input
                type="checkbox"
                id="singleLeaseTermination.hasTerminatedLease"
                {...register("singleLeaseTermination.hasTerminatedLease")}
                checked={hasTerminatedLease === true}
                onChange={(e) => handleToggleTermination(e.target.checked)}
                className="sr-only"
              />
            </button>
          </div>

          {/* Landlord Notification Card */}
          <div className="relative">
            <button
              type="button"
              onClick={() => handleToggleNotification(!hasNotifiedLandlord)}
              className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 w-full ${
                hasNotifiedLandlord === true
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
              aria-pressed={hasNotifiedLandlord === true}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
                hasNotifiedLandlord === true 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              }`}>
                <Bell size={32} />
              </div>

              <h3 className="text-lg font-medium mb-1">Landlord Notification</h3>
              <p className="text-sm text-center text-muted-foreground">
                I have notified my landlord about the disaster
              </p>

              {hasNotifiedLandlord === true && (
                <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-0.5">
                  <Check size={16} />
                </div>
              )}

              <input
                type="checkbox"
                id="singleLeaseTermination.hasNotifiedLandlord"
                {...register("singleLeaseTermination.hasNotifiedLandlord")}
                checked={hasNotifiedLandlord === true}
                onChange={(e) => handleToggleNotification(e.target.checked)}
                className="sr-only"
              />
            </button>
          </div>
        </div>

        {/* Termination Date Field - Only appears when lease termination is selected */}
        {hasTerminatedLease && (
          <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="text-base font-medium">Lease Termination Date</h3>
                  <p className="text-sm text-muted-foreground">
                    When will your current lease officially end?
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <input
                  id="singleLeaseTermination.terminationDate"
                  type="date"
                  {...register("singleLeaseTermination.terminationDate")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {leaseErrors.terminationDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {leaseErrors.terminationDate.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

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