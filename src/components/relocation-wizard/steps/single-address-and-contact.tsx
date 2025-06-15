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
        <h3 className="text-lg font-medium">Adresse du sinistre</h3>
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
              <Label htmlFor="singleDisasterAddress.city">Ville</Label>
              <input
                id="singleDisasterAddress.city"
                {...register("singleDisasterAddress.city")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Ville"
                defaultValue="Genève"
              />
              {addressErrors.city && (
                <p className="text-sm text-red-500 mt-1">
                  {addressErrors.city.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="singleDisasterAddress.postalCode">Code postal</Label>
              <input
                id="singleDisasterAddress.postalCode"
                {...register("singleDisasterAddress.postalCode")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Code postal" 
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
        <h3 className="text-lg font-medium">Informations de contact</h3>
        <div className="space-y-4">
          {/* Name fields row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="singlePersonalData.firstName">
                Prénom <span className="text-red-500">*</span>
              </Label>
              <input
                id="singlePersonalData.firstName"
                {...register("singlePersonalData.firstName")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Votre prénom"
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
                Nom <span className="text-red-500">*</span>
              </Label>
              <input
                id="singlePersonalData.lastName"
                {...register("singlePersonalData.lastName")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Votre nom"
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
                Adresse email <span className="text-red-500">*</span>
              </Label>
              <input
                id="singlePersonalData.email"
                type="email"
                {...register("singlePersonalData.email")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="votre.email@exemple.com"
                defaultValue="valentin.garnier@gmail.com"
              />
              {personalErrors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {personalErrors.email.message as string}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Nous utiliserons cet email pour vous envoyer des mises à jour concernant votre demande de relogement.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="singlePersonalData.phone">
                Numéro de téléphone <span className="text-red-500">*</span>
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
                Veuillez inclure l'indicatif du pays (ex: +41 pour la Suisse).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 rounded-md border border-amber-100">
        <p className="text-sm text-amber-700">
          <strong>Note de confidentialité :</strong> Vos informations personnelles ne seront utilisées que pour traiter votre demande 
          de relogement et communiquer avec vous concernant vos besoins en logement. Nous traitons vos données conformément 
          à notre politique de confidentialité.
        </p>
      </div>
    </div>
  );
} 