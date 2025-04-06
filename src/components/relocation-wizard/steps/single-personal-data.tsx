import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface SinglePersonalDataProps {
  form: UseFormReturn<any>;
}

export function SinglePersonalData({ form }: SinglePersonalDataProps) {
  const { register, formState: { errors } } = form;
  const personalErrors = errors.singlePersonalData || {};
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Please provide your contact information so we can communicate with you about your relocation request.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name fields row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="singlePersonalData.firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <input
              id="singlePersonalData.firstName"
              {...register("singlePersonalData.firstName")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Your first name"
              defaultValue="Valentin"
            />
            {personalErrors.firstName && (
              <p className="text-sm text-red-500 mt-1">
                {personalErrors.firstName.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="singlePersonalData.lastName">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <input
              id="singlePersonalData.lastName"
              {...register("singlePersonalData.lastName")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Your last name"
              defaultValue="Garnier"
            />
            {personalErrors.lastName && (
              <p className="text-sm text-red-500 mt-1">
                {personalErrors.lastName.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Contact information row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="singlePersonalData.email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <input
              id="singlePersonalData.email"
              type="email"
              {...register("singlePersonalData.email")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="your.email@example.com"
              defaultValue="valentin.garnier@gmail.com"
            />
            {personalErrors.email && (
              <p className="text-sm text-red-500 mt-1">
                {personalErrors.email.message as string}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              We'll use this email to send you updates about your relocation request.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="singlePersonalData.phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <input
              id="singlePersonalData.phone"
              type="tel"
              {...register("singlePersonalData.phone")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="+41 XX XXX XX XX"
              defaultValue="+41 79 123 45 67"
            />
            {personalErrors.phone && (
              <p className="text-sm text-red-500 mt-1">
                {personalErrors.phone.message as string}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Please include the country code (e.g., +41 for Switzerland).
            </p>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-md border border-amber-100 mt-4">
          <p className="text-sm text-amber-700">
            <strong>Privacy Note:</strong> Your personal information will only be used to process your relocation 
            request and communicate with you about your accommodation needs. We handle your data in accordance 
            with our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
} 