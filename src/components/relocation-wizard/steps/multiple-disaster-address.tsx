import { UseFormReturn, FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MultipleDisasterAddressProps {
  form: UseFormReturn<any>;
}

export function MultipleDisasterAddress({ form }: MultipleDisasterAddressProps) {
  const { register, setValue, formState: { errors } } = form;
  const addressErrors = errors.multipleDisasterAddress as Record<string, FieldError> || {};
  
  // Swiss cantons
  const swissCantons = [
    "Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Basel-Landschaft", 
    "Basel-Stadt", "Bern", "Fribourg", "Geneva", "Glarus", "Graubünden", "Jura", 
    "Lucerne", "Neuchâtel", "Nidwalden", "Obwalden", "Schaffhausen", "Schwyz", 
    "Solothurn", "St. Gallen", "Thurgau", "Ticino", "Uri", "Valais", "Vaud", 
    "Zug", "Zürich"
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Adresse commune du sinistre</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Veuillez fournir l'adresse du bien affecté par le sinistre nécessitant plusieurs relogements.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="multipleDisasterAddress.street">Street Address</Label>
          <input
            id="multipleDisasterAddress.street"
            {...register("multipleDisasterAddress.street")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Street address"
            defaultValue="123 Rue de la Paix"
          />
          {addressErrors.street && (
            <p className="text-sm text-red-500 mt-1">
              {addressErrors.street.message as string}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="multipleDisasterAddress.city">City</Label>
            <input
              id="multipleDisasterAddress.city"
              {...register("multipleDisasterAddress.city")}
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
            <Label htmlFor="multipleDisasterAddress.postalCode">Postal Code</Label>
            <input
              id="multipleDisasterAddress.postalCode"
              {...register("multipleDisasterAddress.postalCode")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Postal code"
              defaultValue="1201"
            />
            {addressErrors.postalCode && (
              <p className="text-sm text-red-500 mt-1">
                {addressErrors.postalCode.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="multipleDisasterAddress.canton">Canton (if in Switzerland)</Label>
            <Select 
              onValueChange={(value) => setValue("multipleDisasterAddress.canton", value)}
              defaultValue="none"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a canton" />
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
            <Label htmlFor="multipleDisasterAddress.country">Country</Label>
            <input
              id="multipleDisasterAddress.country"
              {...register("multipleDisasterAddress.country")}
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

      <div className="p-4 bg-primary/5 rounded-md border border-primary/10">
        <p className="text-sm text-primary/80">
          <strong>Note :</strong> Cette adresse doit être l'emplacement commun affecté par le sinistre. 
          Dans l'étape suivante, vous pourrez saisir les détails pour chaque personne nécessitant un relogement.
        </p>
      </div>
    </div>
  );
} 