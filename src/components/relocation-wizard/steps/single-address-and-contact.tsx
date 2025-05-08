import { UseFormReturn, FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SingleAddressAndContactProps {
  form: UseFormReturn<any>;
}

interface PersonalErrors {
  firstName?: { message?: string };
  lastName?: { message?: string };
  email?: { message?: string };
  phone?: { message?: string };
}

export function SingleAddressAndContact({ form }: SingleAddressAndContactProps) {
  const { register, setValue, formState: { errors } } = form;
  const addressErrors = errors.singleDisasterAddress as Record<string, FieldError> || {};
  const personalErrors = (errors.singlePersonalData || {}) as PersonalErrors;
  
  // Swiss cantons
  const swissCantons = [
    "Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Basel-Landschaft", 
    "Basel-Stadt", "Bern", "Fribourg", "Geneva", "Glarus", "Graubünden", "Jura", 
    "Lucerne", "Neuchâtel", "Nidwalden", "Obwalden", "Schaffhausen", "Schwyz", 
    "Solothurn", "St. Gallen", "Thurgau", "Ticino", "Uri", "Valais", "Vaud", 
    "Zug", "Zürich"
  ];
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Address and Contact Information</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Please provide the address of the affected property and your contact information.
        </p>
      </div>

      {/* Disaster Address Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Disaster Address</h3>
        <div className="space-y-4">
          {/* Street Address */}
          <div className="space-y-2">
            <Label htmlFor="singleDisasterAddress.street">Street Address</Label>
            <input
              id="singleDisasterAddress.street"
              {...register("singleDisasterAddress.street")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Street address"
              defaultValue="1 Rue de la Gare"
            />
            {addressErrors.street && (
              <p className="text-sm text-red-500 mt-1">
                {addressErrors.street.message as string}
              </p>
            )}
          </div>

          {/* City, Postal Code, Canton, Country in one row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="singleDisasterAddress.city">City</Label>
              <input
                id="singleDisasterAddress.city"
                {...register("singleDisasterAddress.city")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="City"
                defaultValue="Geneva"
              />
              {addressErrors.city && (
                <p className="text-sm text-red-500 mt-1">
                  {addressErrors.city.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="singleDisasterAddress.postalCode">Postal Code</Label>
              <input
                id="singleDisasterAddress.postalCode"
                {...register("singleDisasterAddress.postalCode")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Postal code" 
                defaultValue="1204"
              />
              {addressErrors.postalCode && (
                <p className="text-sm text-red-500 mt-1">
                  {addressErrors.postalCode.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="singleDisasterAddress.canton">Canton</Label>
              <Select 
                onValueChange={(value) => setValue("singleDisasterAddress.canton", value)}
                defaultValue="none"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select canton" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Not applicable</SelectItem>
                  {swissCantons.map((canton) => (
                    <SelectItem key={canton} value={canton}>
                      {canton}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {addressErrors.canton && (
                <p className="text-sm text-destructive mt-1">
                  {addressErrors.canton.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="singleDisasterAddress.country">Country</Label>
              <input
                id="singleDisasterAddress.country"
                {...register("singleDisasterAddress.country")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Country"
                defaultValue="Switzerland"
              />
              {addressErrors.country && (
                <p className="text-sm text-destructive mt-1">
                  {addressErrors.country.message as string}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Contact Information</h3>
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
        </div>
      </div>

      <div className="p-4 bg-amber-50 rounded-md border border-amber-100">
        <p className="text-sm text-amber-700">
          <strong>Privacy Note:</strong> Your personal information will only be used to process your relocation 
          request and communicate with you about your accommodation needs. We handle your data in accordance 
          with our privacy policy.
        </p>
      </div>
    </div>
  );
} 