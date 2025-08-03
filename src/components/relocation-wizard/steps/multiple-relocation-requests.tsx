import { useState, useEffect } from "react";
import { UseFormReturn, FieldError, FieldErrorsImpl } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Trash2, 
  UserPlus, 
  Users, 
  Copy, 
  Bed,
  Baby,
  PawPrint,
  Accessibility,
  Car as CarIcon,
  User,
  Paperclip,
  CircleCheckBig,
  X,
  Upload,
  Check,
  Clock,
  CalendarRange
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface RelocationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  estimatedDuration: string;
  arrivalDate: Date | undefined;
  departureDate?: string;
  useExactDates?: boolean;
  bedrooms: number;
  adults: number;
  children: number;
  hasAnimals: boolean;
  hasAccessibilityNeeds: boolean;
  needsParking: boolean;
  claimDocument?: File;
  hasUploadedClaim?: boolean;
}

interface MultipleRelocationRequestsProps {
  form: UseFormReturn<any>;
}

export function MultipleRelocationRequests({ form }: MultipleRelocationRequestsProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  
  // Get current requests or initialize empty array
  const requests = watch("multipleRelocationRequests") || [];
  // Cast errors to any to avoid type issues
  const requestErrors = (errors.multipleRelocationRequests as any) || [];
  
  // Initialize with one person when component mounts
  useEffect(() => {
    if (requests.length === 0) {
      const initialPerson: RelocationRequest = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        estimatedDuration: "",
        arrivalDate: undefined,
        departureDate: "",
        useExactDates: false,
        bedrooms: 1,
        adults: 1,
        children: 0,
        hasAnimals: false,
        hasAccessibilityNeeds: false,
        needsParking: false,
      };
      setValue("multipleRelocationRequests", [initialPerson]);
    }
  }, []);
  
  // Duration options with icons and labels
  const durationOptions = [
    { 
      id: "short-term", 
      value: "Quelques jours", 
      label: "Quelques jours",
      subLabel: "Séjour urgent et court"
    },
    { 
      id: "few-weeks", 
      value: "Quelques semaines", 
      label: "Quelques semaines",
      subLabel: "Séjour temporaire"
    },
    { 
      id: "few-months", 
      value: "Quelques mois", 
      label: "Quelques mois",
      subLabel: "Logement transitoire"
    },
  ];

  // Calculate tomorrow's date for the min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Helper to compute number of nights between two dates
  const getNumberOfNights = (arrival?: string, departure?: string): number | null => {
    if (!arrival || !departure) return null;
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    if (isNaN(arrivalDate.getTime()) || isNaN(departureDate.getTime())) return null;
    const diff = departureDate.getTime() - arrivalDate.getTime();
    const nights = Math.round(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  // Function to handle date type selection for a specific person
  const handleDateTypeSelect = (index: number, useExact: boolean) => {
    setValue(`multipleRelocationRequests.${index}.useExactDates`, useExact, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
    // If switching to exact dates, auto-calculate duration
    if (useExact) {
      const arrivalDate = watch(`multipleRelocationRequests.${index}.arrivalDate`);
      const departureDate = watch(`multipleRelocationRequests.${index}.departureDate`);
      
      if (arrivalDate && departureDate) {
        const nights = getNumberOfNights(arrivalDate, departureDate);
        if (nights !== null) {
          setValue(`multipleRelocationRequests.${index}.estimatedDuration`, `${nights} nuits`, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
          });
        }
      }
    }
    
    // Trigger validation for both fields when switching modes
    setTimeout(() => {
      form.trigger(`multipleRelocationRequests.${index}.departureDate`);
      form.trigger(`multipleRelocationRequests.${index}.estimatedDuration`);
    }, 100);
  };

  // Function to handle arrival date change with validation
  const handleArrivalDateChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newArrivalDate = event.target.value;
    setValue(`multipleRelocationRequests.${index}.arrivalDate`, newArrivalDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
    // If in exact dates mode and departure date exists, auto-calculate duration
    const useExactDates = watch(`multipleRelocationRequests.${index}.useExactDates`);
    if (useExactDates) {
      const departureDate = watch(`multipleRelocationRequests.${index}.departureDate`);
      if (newArrivalDate && departureDate) {
        const nights = getNumberOfNights(newArrivalDate, departureDate);
        if (nights !== null) {
          setValue(`multipleRelocationRequests.${index}.estimatedDuration`, `${nights} nuits`, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
          });
        }
      }
    }
  };

  // Function to handle departure date change with validation
  const handleDepartureDateChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newDepartureDate = event.target.value;
    setValue(`multipleRelocationRequests.${index}.departureDate`, newDepartureDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
    // Auto-calculate duration when both dates are set
    const arrivalDate = watch(`multipleRelocationRequests.${index}.arrivalDate`);
    if (newDepartureDate && arrivalDate) {
      const nights = getNumberOfNights(arrivalDate, newDepartureDate);
      if (nights !== null) {
        setValue(`multipleRelocationRequests.${index}.estimatedDuration`, `${nights} nuits`, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        });
      }
    }
  };

  // Counter fields configuration
  const counterFields = [
    {
      id: "bedrooms",
      name: "Chambres",
      icon: <Bed size={20} />,
      min: 0,
      fieldName: "bedrooms"
    },
    {
      id: "adults",
      name: "Adultes",
      icon: <Users size={20} />,
      min: 1,
      fieldName: "adults"
    },
    {
      id: "children",
      name: "Enfants",
      icon: <Baby size={20} />,
      min: 0,
      fieldName: "children"
    }
  ];
  
  // Add a new person
  const addPerson = () => {
    const newPerson: RelocationRequest = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      estimatedDuration: "",
      arrivalDate: undefined,
      departureDate: "",
      useExactDates: false,
      bedrooms: 1,
      adults: 1,
      children: 0,
      hasAnimals: false,
      hasAccessibilityNeeds: false,
      needsParking: false,
    };
    
    setValue("multipleRelocationRequests", [...requests, newPerson]);
    toast.success("Nouvelle personne ajoutée à la liste");
  };
  
  // Remove a person by index
  const removePerson = (index: number) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setValue("multipleRelocationRequests", updatedRequests);
    toast.success("Personne retirée de la liste");
  };

  // Duplicate a person
  const duplicatePerson = (index: number) => {
    const personToDuplicate = { ...requests[index] };
    const updatedRequests = [...requests];
    updatedRequests.splice(index + 1, 0, personToDuplicate);
    setValue("multipleRelocationRequests", updatedRequests);
    toast.success("Personne dupliquée");
  };


  // Function to get error message for a specific field
  const getErrorMessage = (index: number, field: string): string | undefined => {
    const fieldErrors = requestErrors[index] as any;
    return fieldErrors?.[field]?.message;
  };



  // Function to handle file upload
  const handleFileUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(`multipleRelocationRequests.${index}.claimDocument`, file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
      setValue(`multipleRelocationRequests.${index}.hasUploadedClaim`, true, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
      toast.success("Document téléchargé avec succès");
    }
  };

  // Function to remove uploaded file
  const handleRemoveFile = (index: number) => {
    setValue(`multipleRelocationRequests.${index}.claimDocument`, undefined, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    setValue(`multipleRelocationRequests.${index}.hasUploadedClaim`, false, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    toast.success("Document supprimé");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Demandes de relogement multiples</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Veuillez fournir les informations d'une personne pour chaque foyer nécessitant une assistance au relogement.
        </p>
      </div>

      <div className="space-y-6">
        {requests.length > 0 ? (
          <div className="rounded-lg border overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {/* Contact Information Column */}
                  <TableHead className="w-[90px] text-gray-900 font-medium text-sm whitespace-nowrap">Prénom</TableHead>
                  <TableHead className="w-[110px] text-gray-900 font-medium text-sm whitespace-nowrap">Nom</TableHead>
                  <TableHead className="w-[180px] text-gray-900 font-medium text-sm whitespace-nowrap">Email</TableHead>
                  <TableHead className="w-[140px] text-gray-900 font-medium text-sm whitespace-nowrap">Téléphone</TableHead>
                  <TableHead className="w-[120px] text-gray-900 font-medium text-sm whitespace-nowrap">Arrivée</TableHead>
                  <TableHead className="w-[200px] text-gray-900 font-medium text-sm whitespace-nowrap">Départ</TableHead>

                  {/* Property Requirements Column - Grouped */}
                  <TableHead className="w-[80px] text-gray-900 font-medium text-center text-sm">
                    <div className="flex items-center justify-center gap-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help">
                              <Bed className="h-5 w-5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Nombre de chambres nécessaires</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help">
                              <User className="h-5 w-5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Nombre d'adultes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help">
                              <Baby className="h-5 w-5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Nombre d'enfants</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableHead>

                  {/* Special Needs & Document Column - Grouped */}
                  <TableHead className="w-[120px] text-gray-900 font-medium text-center text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help">
                              <PawPrint className="h-5 w-5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Présence d'animaux</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help">
                              <Accessibility className="h-5 w-5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Besoins d'accessibilité</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help">
                              <CarIcon className="h-5 w-5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Besoin de stationnement</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help">
                              <Paperclip className="h-5 w-5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Document de déclaration de sinistre</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px] text-gray-900 font-medium text-right text-sm"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request: RelocationRequest, index: number) => {
                  const useExactDates = watch(`multipleRelocationRequests.${index}.useExactDates`) ?? false;
                  const arrivalDate = watch(`multipleRelocationRequests.${index}.arrivalDate`);
                  
                  // Calculate minimum departure date
                  const minDepartureDate = arrivalDate ? new Date(arrivalDate) : new Date(tomorrow);
                  minDepartureDate.setDate(minDepartureDate.getDate() + 1);
                  const minDepartureDateStr = minDepartureDate.toISOString().split('T')[0];
                  
                  return (
                    <TableRow key={index} className="hover:bg-muted/30">
                      <TableCell>
                        <Input
                          {...register(`multipleRelocationRequests.${index}.firstName`, {
                            required: "Le prénom est requis"
                          })}
                          placeholder="Paul"
                          className={cn(
                            "h-8 px-2 py-1 text-xs",
                            getErrorMessage(index, 'firstName') ? "border-red-500" : ""
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          {...register(`multipleRelocationRequests.${index}.lastName`, {
                            required: "Le nom est requis"
                          })}
                          placeholder="Dupont"
                          className={cn(
                            "h-8 px-2 py-1 text-xs",
                            getErrorMessage(index, 'lastName') ? "border-red-500" : ""
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="email"
                          {...register(`multipleRelocationRequests.${index}.email`)}
                          placeholder="paul.dupont@gmail.com"
                          className={cn(
                            "h-8 px-2 py-1 text-xs",
                            getErrorMessage(index, 'email') ? "border-red-500" : ""
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="tel"
                          {...register(`multipleRelocationRequests.${index}.phone`)}
                          placeholder="+41 XX XXX XX XX"
                          className={cn(
                            "h-8 px-2 py-1 text-xs",
                            getErrorMessage(index, 'phone') ? "border-red-500" : ""
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="date"
                          min={tomorrowStr}
                          {...register(`multipleRelocationRequests.${index}.arrivalDate`, {
                            required: "La date d'arrivée est requise",
                            onChange: (e) => handleArrivalDateChange(index, e)
                          })}
                          className={cn(
                            "w-[120px] rounded-md border bg-background px-2 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground [color-scheme:light]",
                            getErrorMessage(index, 'arrivalDate') 
                              ? "border-red-500 focus-visible:ring-red-500 !border-red-500" 
                              : "border-input"
                          )}
                          style={{ color: 'hsl(215 28% 25%)' }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {/* Date Type Toggle */}
                          <div className="flex gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => handleDateTypeSelect(index, true)}
                                    className={cn(
                                      "px-2 py-1 text-xs rounded-l-md border transition-all duration-200",
                                      useExactDates
                                        ? "bg-primary text-white border-primary" 
                                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                                    )}
                                  >
                                    Dates
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Sélectionner la date exacte de départ</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => handleDateTypeSelect(index, false)}
                                    className={cn(
                                      "px-2 py-1 text-xs rounded-r-md border transition-all duration-200",
                                      !useExactDates
                                        ? "bg-primary text-white border-primary" 
                                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                                    )}
                                  >
                                    Durée
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Spécifier la durée estimée du séjour</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          
                          {/* Departure Date or Duration Selection */}
                          {useExactDates ? (
                            <input
                              type="date"
                              min={minDepartureDateStr}
                              {...register(`multipleRelocationRequests.${index}.departureDate`, {
                                required: useExactDates ? "La date de départ est requise" : false,
                                onChange: (e) => handleDepartureDateChange(index, e)
                              })}
                              placeholder="Date de départ"
                              className={cn(
                                "w-[120px] rounded-md border bg-background px-2 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground [color-scheme:light]",
                                getErrorMessage(index, 'departureDate') 
                                  ? "border-red-500 focus-visible:ring-red-500 !border-red-500" 
                                  : "border-input"
                              )}
                              style={{ color: 'hsl(215 28% 25%)' }}
                            />
                          ) : (
                            <>
                              <input
                                type="hidden"
                                {...register(`multipleRelocationRequests.${index}.estimatedDuration`, {
                                  validate: (value) => {
                                    const useExactDates = watch(`multipleRelocationRequests.${index}.useExactDates`);
                                    if (!useExactDates && !value) {
                                      return "La durée est requise";
                                    }
                                    return true;
                                  },
                                  onChange: (e) => {
                                    // Trigger validation when the hidden input changes
                                    form.trigger(`multipleRelocationRequests.${index}.estimatedDuration`);
                                  }
                                })}
                              />
                              <Select
                                value={watch(`multipleRelocationRequests.${index}.estimatedDuration`) || ""}
                                onValueChange={(value) => {
                                  setValue(`multipleRelocationRequests.${index}.estimatedDuration`, value, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                    shouldTouch: true
                                  });
                                  // Explicitly trigger validation
                                  setTimeout(() => {
                                    form.trigger(`multipleRelocationRequests.${index}.estimatedDuration`);
                                  }, 100);
                                }}
                              >
                                <SelectTrigger className={cn(
                                  "h-6 px-2 py-1 text-xs w-[120px] border",
                                  getErrorMessage(index, 'estimatedDuration') 
                                    ? "border-red-500 focus-visible:ring-red-500 !border-red-500" 
                                    : "border-input"
                                )}>
                                  <span className="truncate text-muted-foreground">
                                    <SelectValue placeholder="Choisir une durée" />
                                  </span>
                                </SelectTrigger>
                                <SelectContent className="py-1">
                                  {durationOptions.map((option) => (
                                    <SelectItem key={option.id} value={option.value} className="py-1">
                                      <div className="flex items-center">
                                        <span className="whitespace-nowrap">{option.label}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </>
                          )}
                          

                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          {counterFields.map((field) => (
                            <Select
                              key={field.id}
                              value={watch(`multipleRelocationRequests.${index}.${field.fieldName}`)?.toString() || field.min.toString()}
                              onValueChange={(value) => setValue(`multipleRelocationRequests.${index}.${field.fieldName}`, parseInt(value))}
                            >
                              <SelectTrigger className="h-8 px-2 py-1 text-xs w-[45px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="py-1">
                                {field.fieldName === 'adults' ? 
                                  [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                    <SelectItem key={num} value={num.toString()} className="py-1">
                                      {num}
                                    </SelectItem>
                                  )) :
                                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <SelectItem key={num} value={num.toString()} className="py-1">
                                      <span className={num === 0 ? "text-gray-500 font-medium" : ""}>
                                        {num}
                                      </span>
                                    </SelectItem>
                                  ))
                                }
                              </SelectContent>
                            </Select>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Checkbox
                            id={`multipleRelocationRequests.${index}.hasAnimals`}
                            checked={watch(`multipleRelocationRequests.${index}.hasAnimals`)}
                            onCheckedChange={(checked) => {
                              setValue(`multipleRelocationRequests.${index}.hasAnimals`, checked);
                            }}
                            className="h-5 w-5"
                          />
                          <Checkbox
                            id={`multipleRelocationRequests.${index}.hasAccessibilityNeeds`}
                            checked={watch(`multipleRelocationRequests.${index}.hasAccessibilityNeeds`)}
                            onCheckedChange={(checked) => {
                              setValue(`multipleRelocationRequests.${index}.hasAccessibilityNeeds`, checked);
                            }}
                            className="h-5 w-5"
                          />
                          <Checkbox
                            id={`multipleRelocationRequests.${index}.needsParking`}
                            checked={watch(`multipleRelocationRequests.${index}.needsParking`)}
                            onCheckedChange={(checked) => {
                              setValue(`multipleRelocationRequests.${index}.needsParking`, checked);
                            }}
                            className="h-5 w-5"
                          />
                          {request.hasUploadedClaim ? (
                            <div className="relative group">
                              <div className="flex items-center bg-white border border-gray-200 rounded-full px-1 w-8 h-6 justify-center">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="cursor-help">
                                        <CircleCheckBig className="h-4 w-4 text-green-500" />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Document téléchargé</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleRemoveFile(index)}
                                      type="button"
                                      className="h-5 w-5 text-red-500 hover:text-red-700 hover:bg-red-50 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Supprimer le document</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ) : (
                            <div className="relative">
                              <input
                                type="file"
                                id={`claim-document-${index}`}
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileUpload(index, e)}
                              />
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <label
                                      htmlFor={`claim-document-${index}`}
                                      className="flex items-center justify-center w-8 h-6 text-xs text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                      <Upload className="h-4 w-4" />
                                    </label>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Télécharger un document de déclaration</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => duplicatePerson(index)}
                                  type="button"
                                  className="h-7 w-7 text-black hover:text-black/70 hover:bg-gray-100"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Dupliquer cette personne</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removePerson(index)}
                                  type="button"
                                  className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Supprimer cette personne</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-md bg-muted/10">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <Users className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Aucune personne ajoutée</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <h3 className="text-lg font-medium mb-1">Aucune personne ajoutée</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Veuillez ajouter les personnes nécessitant une assistance au relogement
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="button" 
                  onClick={addPerson}
                  className="flex-1"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Ajouter un foyer
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ajouter un nouveau foyer à la liste</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
} 