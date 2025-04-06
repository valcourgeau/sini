import { UseFormReturn, FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, FileTerminal, Bell, Calendar } from "lucide-react";

interface SingleLeaseTerminationProps {
  form: UseFormReturn<any>;
}

export function SingleLeaseTermination({ form }: SingleLeaseTerminationProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const leaseErrors = errors.singleLeaseTermination as Record<string, FieldError> || {};
  
  const hasTerminatedLease = watch("singleLeaseTermination.hasTerminatedLease");
  const hasNotifiedLandlord = watch("singleLeaseTermination.hasNotifiedLandlord");
  const terminationDate = watch("singleLeaseTermination.terminationDate");
  const notificationDate = watch("singleLeaseTermination.notificationDate");

  const handleToggleTermination = (value: boolean) => {
    setValue("singleLeaseTermination.hasTerminatedLease", value);
    if (!value) {
      setValue("singleLeaseTermination.terminationDate", "");
    }
  };

  const handleToggleNotification = (value: boolean) => {
    setValue("singleLeaseTermination.hasNotifiedLandlord", value);
    if (!value) {
      setValue("singleLeaseTermination.notificationDate", "");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Lease Termination Status</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
          Please provide information about the status of your current lease or rental agreement.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lease Termination Card */}
          <div className="relative">
            <div
              className={`group relative flex flex-col p-4 rounded-xl border-2 transition-all duration-200 w-full ${
                hasTerminatedLease === true
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => handleToggleTermination(!hasTerminatedLease)}
                className="flex flex-col items-center w-full"
                aria-pressed={hasTerminatedLease === true}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                  hasTerminatedLease === true 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  <FileTerminal size={32} />
                </div>

                <h3 className="text-base font-medium mb-1">Lease Termination</h3>
                <p className="text-xs text-center text-muted-foreground">
                  For my current lease/rental agreement
                </p>

                {hasTerminatedLease === true && (
                  <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                    <Check size={14} />
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

              {/* Termination Date Field - Integrated into the card */}
              {hasTerminatedLease && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="singleLeaseTermination.terminationDate" className="text-sm whitespace-nowrap">
                      Termination Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="singleLeaseTermination.terminationDate"
                      type="date"
                      {...register("singleLeaseTermination.terminationDate")}
                      className="h-8 text-sm w-1/2 max-w-[150px]"
                    />
                  </div>
                  {leaseErrors.terminationDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {leaseErrors.terminationDate.message as string}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Landlord Notification Card */}
          <div className="relative">
            <div
              className={`group relative flex flex-col p-4 rounded-xl border-2 transition-all duration-200 w-full ${
                hasNotifiedLandlord === true
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => handleToggleNotification(!hasNotifiedLandlord)}
                className="flex flex-col items-center w-full"
                aria-pressed={hasNotifiedLandlord === true}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                  hasNotifiedLandlord === true 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  <Bell size={32} />
                </div>

                <h3 className="text-base font-medium mb-1">Landlord Notification</h3>
                <p className="text-xs text-center text-muted-foreground">
                  I have notified my landlord about the disaster
                </p>

                {hasNotifiedLandlord === true && (
                  <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                    <Check size={14} />
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

              {/* Notification Date Field - Integrated into the card */}
              {hasNotifiedLandlord && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="singleLeaseTermination.notificationDate" className="text-sm whitespace-nowrap">
                      Notification Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="singleLeaseTermination.notificationDate"
                      type="date"
                      {...register("singleLeaseTermination.notificationDate")}
                      className="h-8 text-sm w-1/2 max-w-[150px]"
                    />
                  </div>
                  {leaseErrors.notificationDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {leaseErrors.notificationDate.message as string}
                    </p>
                  )}
                </div>
              )}
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