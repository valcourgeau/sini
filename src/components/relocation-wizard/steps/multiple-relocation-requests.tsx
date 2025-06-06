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
  Trash2, 
  UserPlus, 
  Users, 
  Copy, 
  Check, 
  AlertCircle,
  Clock,
  HelpCircle,
  FastForward,
  TrafficCone,
  Bed,
  Bath,
  Baby,
  PawPrint,
  Accessibility,
  Car as CarIcon,
  MinusCircle,
  PlusCircle,
  Calendar,
  Clock as ClockIcon,
  User,
  Home,
  Bath as BathIcon,
  Paperclip,
  CircleCheckBig,
  X,
  Upload
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
  bedrooms: number;
  bathrooms: number;
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
        bedrooms: 1,
        bathrooms: 1,
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
      value: "A few days", 
      label: "A few days",
      subLabel: "Urgent and short stay"
    },
    { 
      id: "few-weeks", 
      value: "A few weeks", 
      label: "A few weeks",
      subLabel: "Temporary stay"
    },
    { 
      id: "few-months", 
      value: "A few months", 
      label: "A few months",
      subLabel: "Transitional housing"
    },
    { 
      id: "unknown", 
      value: "Unknown / Not sure",
      label: "Unknown / Not sure",
      subLabel: "Flexible duration"
    },
  ];

  // Counter fields configuration
  const counterFields = [
    {
      id: "bedrooms",
      name: "Bedrooms",
      icon: <Bed size={20} />,
      min: 0,
      fieldName: "bedrooms"
    },
    {
      id: "bathrooms",
      name: "Bathrooms",
      icon: <Bath size={20} />,
      min: 0,
      fieldName: "bathrooms"
    },
    {
      id: "adults",
      name: "Adults",
      icon: <Users size={20} />,
      min: 1,
      fieldName: "adults"
    },
    {
      id: "children",
      name: "Children",
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
      bedrooms: 1,
      bathrooms: 1,
      adults: 1,
      children: 0,
      hasAnimals: false,
      hasAccessibilityNeeds: false,
      needsParking: false,
    };
    
    setValue("multipleRelocationRequests", [...requests, newPerson]);
    toast.success("New person added to the list");
  };
  
  // Remove a person by index
  const removePerson = (index: number) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setValue("multipleRelocationRequests", updatedRequests);
    toast.success("Person removed from the list");
  };

  // Duplicate a person
  const duplicatePerson = (index: number) => {
    const personToDuplicate = { ...requests[index] };
    const updatedRequests = [...requests];
    updatedRequests.splice(index + 1, 0, personToDuplicate);
    setValue("multipleRelocationRequests", updatedRequests);
    toast.success("Person duplicated");
  };

  // Function to increment counter
  const incrementCounter = (index: number, fieldName: string, min: number) => {
    const currentValue = watch(`multipleRelocationRequests.${index}.${fieldName}`) || min;
    setValue(`multipleRelocationRequests.${index}.${fieldName}`, currentValue + 1, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };
  
  // Function to decrement counter
  const decrementCounter = (index: number, fieldName: string, min: number) => {
    const currentValue = watch(`multipleRelocationRequests.${index}.${fieldName}`) || min;
    if (currentValue > min) {
      setValue(`multipleRelocationRequests.${index}.${fieldName}`, currentValue - 1, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
    }
  };

  // Function to toggle special need
  const toggleSpecialNeed = (index: number, fieldName: string) => {
    const currentValue = watch(`multipleRelocationRequests.${index}.${fieldName}`) || false;
    setValue(`multipleRelocationRequests.${index}.${fieldName}`, !currentValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  // Helper function to safely access error messages
  const getErrorMessage = (index: number, field: string): string | undefined => {
    if (Array.isArray(requestErrors) && requestErrors[index]) {
      const error = requestErrors[index] as any;
      return error[field]?.message as string;
    }
    return undefined;
  };

  // Calculate tomorrow's date for the min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

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
      toast.success("Claim document uploaded successfully");
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
    toast.success("Claim document removed");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Multiple Relocation Requests</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please kindly provide information for each household requiring relocation assistance. Note that a single entry per household is preferred.
        </p>
      </div>

      <div className="space-y-6">
        {requests.length > 0 ? (
          <div className="rounded-lg border overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {/* Contact Information Column */}
                  <TableHead className="w-[150px] text-gray-900 font-medium text-sm whitespace-nowrap">Name</TableHead>
                  <TableHead className="w-[150px] text-gray-900 font-medium text-sm whitespace-nowrap">Surname</TableHead>
                  <TableHead className="w-[200px] text-gray-900 font-medium text-sm whitespace-nowrap">Email</TableHead>
                  <TableHead className="w-[150px] text-gray-900 font-medium text-sm whitespace-nowrap">Phone</TableHead>
                  <TableHead className="w-[120px] text-gray-900 font-medium text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {/* <Calendar className="h-5 w-5" /> */}
                      <span>Arrival</span>
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px] text-gray-900 font-medium text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {/* <ClockIcon className="h-5 w-5" /> */}
                      <span>Duration</span>
                    </div>
                  </TableHead>

                  {/* Property Requirements Column */}
                  <TableHead className="w-[20px] text-gray-900 font-medium text-sm">
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5" />
                      <span className="sr-only">Bedrooms</span>
                    </div>
                  </TableHead>
                  <TableHead className="w-[20px] text-gray-900 font-medium text-sm">
                    <div className="flex items-center gap-2">
                      <BathIcon className="h-5 w-5" />
                      <span className="sr-only">Bathrooms</span>
                    </div>
                  </TableHead>
                  <TableHead className="w-[20px] text-gray-900 font-medium text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Adults</span>
                    </div>
                  </TableHead>
                  <TableHead className="w-[20px] text-gray-900 font-medium text-sm">
                    <div className="flex items-center gap-2">
                      <Baby className="h-5 w-5" />
                      <span className="sr-only">Children</span>
                    </div>
                  </TableHead>

                  {/* Special Needs Column */}
                  <TableHead className="w-[80px] text-gray-900 font-medium text-center text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <PawPrint className="h-5 w-5" />
                      <span className="sr-only">Pets</span>
                    </div>
                  </TableHead>
                  <TableHead className="w-[80px] text-gray-900 font-medium text-center text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Accessibility className="h-5 w-5" />
                      <span className="sr-only">Accessibility</span>
                    </div>
                  </TableHead>
                  <TableHead className="w-[80px] text-gray-900 font-medium text-center text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <CarIcon className="h-5 w-5" />
                      <span className="sr-only">Parking</span>
                    </div>
                  </TableHead>
                  <TableHead className="w-[80px] text-gray-900 font-medium text-center text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Paperclip className="h-5 w-5" />
                      <span className="sr-only">Claim Document</span>
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px] text-gray-900 font-medium text-right text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request: RelocationRequest, index: number) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="space-y-0.5">
                        <Input
                          {...register(`multipleRelocationRequests.${index}.firstName`, {
                            required: "First name is required"
                          })}
                          placeholder="Paul"
                          className={cn(
                            "h-8 px-2 py-1 text-xs",
                            getErrorMessage(index, 'firstName') ? "border-red-500" : ""
                          )}
                        />
                        {getErrorMessage(index, 'firstName') && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {getErrorMessage(index, 'firstName')}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-0.5">
                        <Input
                          {...register(`multipleRelocationRequests.${index}.lastName`, {
                            required: "Last name is required"
                          })}
                          placeholder="Dupont"
                          className={cn(
                            "h-8 px-2 py-1 text-xs",
                            getErrorMessage(index, 'lastName') ? "border-red-500" : ""
                          )}
                        />
                        {getErrorMessage(index, 'lastName') && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {getErrorMessage(index, 'lastName')}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-0.5">
                        <Input
                          type="email"
                          {...register(`multipleRelocationRequests.${index}.email`)}
                          placeholder="paul.dupont@gmail.com"
                          className={cn(
                            "h-8 px-2 py-1 text-xs",
                            getErrorMessage(index, 'email') ? "border-red-500" : ""
                          )}
                        />
                        {getErrorMessage(index, 'email') && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {getErrorMessage(index, 'email')}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-0.5">
                        <Input
                          type="tel"
                          {...register(`multipleRelocationRequests.${index}.phone`)}
                          placeholder="+41 XX XXX XX XX"
                          className={cn(
                            "h-8 px-2 py-1 text-xs",
                            getErrorMessage(index, 'phone') ? "border-red-500" : ""
                          )}
                        />
                        {getErrorMessage(index, 'phone') && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {getErrorMessage(index, 'phone')}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-0.5">
                        <input
                          type="date"
                          min={tomorrowStr}
                          {...register(`multipleRelocationRequests.${index}.arrivalDate`)}
                          className="w-[130px] rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue={tomorrowStr}
                        />
                        {getErrorMessage(index, 'arrivalDate') && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {getErrorMessage(index, 'arrivalDate')}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={watch(`multipleRelocationRequests.${index}.estimatedDuration`) || ""}
                        onValueChange={(value) => setValue(`multipleRelocationRequests.${index}.estimatedDuration`, value)}
                      >
                        <SelectTrigger className="h-8 px-2 py-1 text-xs w-[110px]">
                          <SelectValue placeholder="Select duration" className="text-muted-foreground" />
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
                    </TableCell>
                    {counterFields.map((field) => (
                      <TableCell key={field.id}>
                        <Select
                          value={watch(`multipleRelocationRequests.${index}.${field.fieldName}`)?.toString() || field.min.toString()}
                          onValueChange={(value) => setValue(`multipleRelocationRequests.${index}.${field.fieldName}`, parseInt(value))}
                        >
                          <SelectTrigger className="h-8 px-2 py-1 text-xs w-[45px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {field.fieldName === 'adults' ? 
                              [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num}
                                </SelectItem>
                              )) :
                              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num}
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          id={`multipleRelocationRequests.${index}.hasAnimals`}
                          checked={watch(`multipleRelocationRequests.${index}.hasAnimals`)}
                          onCheckedChange={(checked) => {
                            setValue(`multipleRelocationRequests.${index}.hasAnimals`, checked);
                          }}
                          className="h-4 w-4"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          id={`multipleRelocationRequests.${index}.hasAccessibilityNeeds`}
                          checked={watch(`multipleRelocationRequests.${index}.hasAccessibilityNeeds`)}
                          onCheckedChange={(checked) => {
                            setValue(`multipleRelocationRequests.${index}.hasAccessibilityNeeds`, checked);
                          }}
                          className="h-4 w-4"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          id={`multipleRelocationRequests.${index}.needsParking`}
                          checked={watch(`multipleRelocationRequests.${index}.needsParking`)}
                          onCheckedChange={(checked) => {
                            setValue(`multipleRelocationRequests.${index}.needsParking`, checked);
                          }}
                          className="h-4 w-4"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        {request.hasUploadedClaim ? (
                          <div className="flex items-center justify-center">
                            <div className="flex items-center bg-white border border-gray-200 rounded-full px-1">
                              <CircleCheckBig className="h-4 w-4 text-green-500" />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveFile(index)}
                                type="button"
                                className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
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
                            <label
                              htmlFor={`claim-document-${index}`}
                              className="flex items-center justify-center gap-2 px-3 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                              <Upload className="h-4 w-4" />
                            </label>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => duplicatePerson(index)}
                          type="button"
                          className="h-7 w-7 text-black hover:text-black/70 hover:bg-gray-100"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removePerson(index)}
                          type="button"
                          className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-md bg-muted/10">
            <Users className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No People Added</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please add the individuals requiring relocation assistance
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            type="button" 
            onClick={addPerson}
            className="flex-1"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Person
          </Button>
        </div>

        {requests.length > 0 && (
          <div className="p-4 bg-amber-50 rounded-md border border-amber-100">
            <p className="text-sm text-amber-700">
              <strong>Note:</strong> Please ensure that you've added all individuals requiring relocation assistance. 
              You can add, duplicate, or remove people using the buttons above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 