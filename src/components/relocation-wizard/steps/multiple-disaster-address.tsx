import { UseFormReturn, FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MultipleDisasterAddressProps {
  form: UseFormReturn<any>;
}

interface PersonalErrors {
  firstName?: { message?: string };
  lastName?: { message?: string };
  email?: { message?: string };
  phone?: { message?: string };
}

export function MultipleDisasterAddress({ form }: MultipleDisasterAddressProps) {
  const { register, setValue, formState: { errors } } = form;
  const addressErrors = errors.multipleDisasterAddress as Record<string, FieldError> || {};
  const personalErrors = (errors.multiplePersonalData || {}) as PersonalErrors;
  
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
        <h2 className="text-xl font-semibold mb-2">Adresse commune du sinistre</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Veuillez fournir l'adresse commune du sinistre et vos coordonnées de courtier.
        </p>
      </div>

      {/* Disaster Address Section */}
      <div className="space-y-6">
        <div className="pt-4 border-t">
          <div className="space-y-4">
            {/* Street - Full width */}
            <div className="space-y-2">
              <Label htmlFor="multipleDisasterAddress.street">Adresse du sinistre <span className="text-red-500">*</span></Label>
              <input
                id="multipleDisasterAddress.street"
                {...register("multipleDisasterAddress.street")}
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
                <Label htmlFor="multipleDisasterAddress.city">Ville <span className="text-red-500">*</span></Label>
                <input
                  id="multipleDisasterAddress.city"
                  {...register("multipleDisasterAddress.city")}
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
                <Label htmlFor="multipleDisasterAddress.postalCode">Code postal <span className="text-red-500">*</span></Label>
                <input
                  id="multipleDisasterAddress.postalCode"
                  {...register("multipleDisasterAddress.postalCode")}
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
                <Label htmlFor="multipleDisasterAddress.canton">Canton</Label>
                <Select 
                  onValueChange={(value) => setValue("multipleDisasterAddress.canton", value)}
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
                <Label htmlFor="multipleDisasterAddress.country">Pays <span className="text-red-500">*</span></Label>
                <input
                  id="multipleDisasterAddress.country"
                  {...register("multipleDisasterAddress.country")}
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

      {/* Broker Information Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Informations du courtier</h3>
        <div className="space-y-4">
          {/* All fields on same line */}
          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="multiplePersonalData.firstName">
                Prénom <span className="text-red-500">*</span>
              </Label>
              <input
                id="multiplePersonalData.firstName"
                {...register("multiplePersonalData.firstName")}
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
              <Label htmlFor="multiplePersonalData.lastName">
                Nom <span className="text-red-500">*</span>
              </Label>
              <input
                id="multiplePersonalData.lastName"
                {...register("multiplePersonalData.lastName")}
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
              <Label htmlFor="multiplePersonalData.email">
                Email <span className="text-red-500">*</span>
              </Label>
              <input
                id="multiplePersonalData.email"
                type="email"
                {...register("multiplePersonalData.email")}
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
              <Label htmlFor="multiplePersonalData.phone">
                Téléphone <span className="text-red-500">*</span>
              </Label>
              <input
                id="multiplePersonalData.phone"
                type="tel"
                {...register("multiplePersonalData.phone")}
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
          <strong>Note de confidentialité :</strong> Vos informations personnelles ne seront utilisées que pour traiter vos demandes 
          de relogement et communiquer avec vous concernant vos besoins en logement. Nous traitons vos données conformément 
          à notre politique de confidentialité.
        </p>
      </div>
    </div>
  );
} 