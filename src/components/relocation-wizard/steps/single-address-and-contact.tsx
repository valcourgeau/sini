import { UseFormReturn, FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SingleAddressAndContactProps {
  form: UseFormReturn<any>;
  userType?: string | null;
}

interface PersonalErrors {
  firstName?: { message?: string };
  lastName?: { message?: string };
  email?: { message?: string };
  phone?: { message?: string };
}

export function SingleAddressAndContact({ form, userType }: SingleAddressAndContactProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const addressErrors = errors.singleDisasterAddress as Record<string, FieldError> || {};
  const personalErrors = (errors.singlePersonalData || {}) as PersonalErrors;
  const insuredErrors = (errors.singleInsuredData || {}) as PersonalErrors;
  const insuranceErrors = errors.singleInsuranceDetails as Record<string, FieldError> || {};
  
  // Check if user has insurance coverage
  const hasInsurance = watch("singleInsuranceCoverage.hasInsurance");
  
  // Swiss cantons
  const swissCantons = [
    "Argovie", "Appenzell Rhodes-Extérieures", "Appenzell Rhodes-Intérieures", "Bâle-Campagne", 
    "Bâle-Ville", "Berne", "Fribourg", "Genève", "Glaris", "Grisons", "Jura", 
    "Lucerne", "Neuchâtel", "Nidwald", "Obwald", "Schaffhouse", "Schwytz", 
    "Soleure", "Saint-Gall", "Thurgovie", "Tessin", "Uri", "Valais", "Vaud", 
    "Zoug", "Zurich"
  ];
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">L'adresse et les coordonnées</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Veuillez fournir l'adresse du bien affecté et vos coordonnées.
        </p>
      </div>

      {/* Disaster Address Section */}
      <div className="space-y-6">
        <div className="pt-4 border-t">
          <div className="space-y-4">
            {/* Street - Full width */}
            <div className="space-y-2">
              <Label htmlFor="singleDisasterAddress.street">Adresse du sinistre <span className="text-red-500">*</span></Label>
              <input
                id="singleDisasterAddress.street"
                {...register("singleDisasterAddress.street")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Rue et Numéro"
              />
              {addressErrors.street && (
                <p className="text-sm text-destructive mt-1">
                  {addressErrors.street.message as string}
                </p>
              )}
            </div>

            {/* City, Postal Code, Canton, Country - Same line */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="singleDisasterAddress.city">Ville <span className="text-red-500">*</span></Label>
                <input
                  id="singleDisasterAddress.city"
                  {...register("singleDisasterAddress.city")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Ville"
                />
                {addressErrors.city && (
                  <p className="text-sm text-destructive mt-1">
                    {addressErrors.city.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="singleDisasterAddress.postalCode">Code postal <span className="text-red-500">*</span></Label>
                <input
                  id="singleDisasterAddress.postalCode"
                  {...register("singleDisasterAddress.postalCode")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Code postal"
                />
                {addressErrors.postalCode && (
                  <p className="text-sm text-destructive mt-1">
                    {addressErrors.postalCode.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="singleDisasterAddress.canton">Canton</Label>
                <Select 
                  onValueChange={(value) => setValue("singleDisasterAddress.canton", value)}
                  defaultValue="Genève"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Canton" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Non applicable</SelectItem>
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
                <Label htmlFor="singleDisasterAddress.country">Pays <span className="text-red-500">*</span></Label>
                <input
                  id="singleDisasterAddress.country"
                  {...register("singleDisasterAddress.country")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Pays"
                  defaultValue="Suisse"
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
      </div>

      {/* Insured Person Information Section - Only show when user doesn't have insurance */}
      {hasInsurance === false && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Informations de l'assuré</h3>
          <div className="space-y-4">
            {/* Personal Information - All fields on same line */}
            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="singleInsuredData.firstName">
                  Prénom <span className="text-red-500">*</span>
                </Label>
                <input
                  id="singleInsuredData.firstName"
                  {...register("singleInsuredData.firstName")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Prénom"
                />
                {insuredErrors.firstName && (
                  <p className="text-sm text-red-500 mt-1">
                    {insuredErrors.firstName.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="singleInsuredData.lastName">
                  Nom <span className="text-red-500">*</span>
                </Label>
                <input
                  id="singleInsuredData.lastName"
                  {...register("singleInsuredData.lastName")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Nom"
                />
                {insuredErrors.lastName && (
                  <p className="text-sm text-red-500 mt-1">
                    {insuredErrors.lastName.message as string}
                  </p>
                )}
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="singleInsuredData.email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <input
                  id="singleInsuredData.email"
                  type="email"
                  {...register("singleInsuredData.email")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="email@exemple.com"
                />
                {insuredErrors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {insuredErrors.email.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="singleInsuredData.phone">
                  Téléphone <span className="text-red-500">*</span>
                </Label>
                <input
                  id="singleInsuredData.phone"
                  type="tel"
                  {...register("singleInsuredData.phone")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="+41 XX XXX XX XX"
                />
                {insuredErrors.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    {insuredErrors.phone.message as string}
                  </p>
                )}
              </div>
            </div>

            {/* Insurance Details - Required when hasInsurance === false */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="singleInsuranceDetails.insuranceCompany">
                  Compagnie d'assurance <span className="text-red-500">*</span>
                </Label>
                {watch("singleInsuranceDetails.insuranceCompany") === "other" ? (
                  <div className="space-y-2">
                    <input
                      {...register("singleInsuranceDetails.customInsuranceCompany")}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Nom de votre compagnie d'assurance"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setValue("singleInsuranceDetails.insuranceCompany", "");
                        setValue("singleInsuranceDetails.customInsuranceCompany", "");
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      ← Retour à la liste
                    </button>
                  </div>
                ) : (
                  <Select 
                    onValueChange={(value) => {
                      if (value === "other") {
                        setValue("singleInsuranceDetails.insuranceCompany", "other");
                        setValue("singleInsuranceDetails.customInsuranceCompany", "");
                      } else {
                        setValue("singleInsuranceDetails.insuranceCompany", value);
                        setValue("singleInsuranceDetails.customInsuranceCompany", "");
                      }
                    }}
                    value={watch("singleInsuranceDetails.insuranceCompany") || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionnez une compagnie d'assurance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AXA">AXA</SelectItem>
                      <SelectItem value="Allianz">Allianz</SelectItem>
                      <SelectItem value="Zurich">Zurich</SelectItem>
                      <SelectItem value="Helvetia">Helvetia</SelectItem>
                      <SelectItem value="Swiss Life">Swiss Life</SelectItem>
                      <SelectItem value="Basler">Basler</SelectItem>
                      <SelectItem value="Generali">Generali</SelectItem>
                      <SelectItem value="Baloise">Baloise</SelectItem>
                      <SelectItem value="Vaudoise">Vaudoise</SelectItem>
                      <SelectItem value="Mobilière">Mobilière</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {insuranceErrors.insuranceCompany && (
                  <p className="text-sm text-red-500 mt-1">
                    {insuranceErrors.insuranceCompany.message as string}
                  </p>
                )}
                {insuranceErrors.customInsuranceCompany && (
                  <p className="text-sm text-red-500 mt-1">
                    {insuranceErrors.customInsuranceCompany.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="singleInsuranceDetails.policyNumber">
                  Numéro de police <span className="text-red-500">*</span>
                </Label>
                <input
                  id="singleInsuranceDetails.policyNumber"
                  {...register("singleInsuranceDetails.policyNumber")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Numéro de police d'assurance"
                />
                {insuranceErrors.policyNumber && (
                  <p className="text-sm text-red-500 mt-1">
                    {insuranceErrors.policyNumber.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Personal Information Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Informations du courtier</h3>
        <div className="space-y-4">
          {/* All fields on same line */}
          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="singlePersonalData.firstName">
                Prénom <span className="text-red-500">*</span>
              </Label>
              <input
                id="singlePersonalData.firstName"
                {...register("singlePersonalData.firstName")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Prénom"
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
                placeholder="Nom"
              />
              {personalErrors.lastName && (
                <p className="text-sm text-red-500 mt-1">
                  {personalErrors.lastName.message as string}
                </p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="singlePersonalData.email">
                Email <span className="text-red-500">*</span>
              </Label>
              <input
                id="singlePersonalData.email"
                type="email"
                {...register("singlePersonalData.email")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="email@exemple.com"
              />
              {personalErrors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {personalErrors.email.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="singlePersonalData.phone">
                Téléphone <span className="text-red-500">*</span>
              </Label>
              <input
                id="singlePersonalData.phone"
                type="tel"
                {...register("singlePersonalData.phone")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="+41 XX XXX XX XX"
              />
              {personalErrors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {personalErrors.phone.message as string}
                </p>
              )}
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