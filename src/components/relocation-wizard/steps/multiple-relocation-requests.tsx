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
  Trash2, 
  UserPlus, 
  Users, 
  Copy, 
  Check, 
  AlertCircle,
  Clock,
  HelpCircle,
  FastForward,
  TrafficCone
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RelocationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  estimatedDuration: string;
  hasInsurance: boolean;
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
        hasInsurance: false,
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
      subLabel: "Urgent and short stay",
      icon: <FastForward size={18} strokeWidth={1.5} />
    },
    { 
      id: "few-weeks", 
      value: "A few weeks", 
      label: "A few weeks",
      subLabel: "Temporary stay",
      icon: <Clock size={18} strokeWidth={1.5} />
    },
    { 
      id: "few-months", 
      value: "A few months", 
      label: "A few months",
      subLabel: "Transitional housing",
      icon: <TrafficCone size={18} strokeWidth={1.5} />
    },
    { 
      id: "unknown", 
      value: "Unknown / Not sure",
      label: "Unknown / Not sure",
      subLabel: "Flexible duration",
      icon: <HelpCircle size={18} strokeWidth={1.5} />
    },
  ];
  
  // Add a new person
  const addPerson = () => {
    const newPerson: RelocationRequest = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      estimatedDuration: "",
      hasInsurance: false,
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

  // Save changes
  const saveChanges = () => {
    // Validate required fields
    const hasErrors = requests.some((request: RelocationRequest) => {
      return !request.firstName || !request.lastName || !request.email || !request.phone;
    });

    if (hasErrors) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Changes saved successfully");
  };

  // Helper function to safely access error messages
  const getErrorMessage = (index: number, field: string): string | undefined => {
    if (Array.isArray(requestErrors) && requestErrors[index]) {
      const error = requestErrors[index] as any;
      return error[field]?.message as string;
    }
    return undefined;
  };

  // Function to handle duration selection
  const handleDurationSelect = (index: number, value: string) => {
    setValue(`multipleRelocationRequests.${index}.estimatedDuration`, value, { 
      shouldValidate: true, 
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Multiple Relocation Requests</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please provide information for each person requiring relocation assistance.
        </p>
      </div>

      <div className="space-y-6">
        {requests.length > 0 ? (
          <div className="rounded-lg border overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[100px] text-gray-900 font-medium">First Name</TableHead>
                  <TableHead className="w-[100px] text-gray-900 font-medium">Last Name</TableHead>
                  <TableHead className="w-[200px] text-gray-900 font-medium">Email</TableHead>
                  <TableHead className="w-[150px] text-gray-900 font-medium">Phone</TableHead>
                  <TableHead className="w-[100px] text-gray-900 font-medium">Duration</TableHead>
                  <TableHead className="w-[50px] text-gray-900 font-medium">Insurance</TableHead>
                  <TableHead className="w-[80px] text-gray-900 font-medium text-right">Actions</TableHead>
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
                            "h-8 px-2 py-1 text-sm",
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
                            "h-8 px-2 py-1 text-sm",
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
                            "h-8 px-2 py-1 text-sm",
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
                            "h-8 px-2 py-1 text-sm",
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
                      <Select
                        value={watch(`multipleRelocationRequests.${index}.estimatedDuration`) || ""}
                        onValueChange={(value) => handleDurationSelect(index, value)}
                      >
                        <SelectTrigger className="h-8 px-2 py-1 text-sm w-[145px]">
                          <SelectValue placeholder="Select duration" className="text-muted-foreground" />
                        </SelectTrigger>
                        <SelectContent>
                          {durationOptions.map((option) => (
                            <SelectItem key={option.id} value={option.value}>
                              <div className="flex items-center gap-2">
                                {option.icon}
                                <span className="whitespace-nowrap">{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1.5">
                        <Checkbox
                          id={`multipleRelocationRequests.${index}.hasInsurance`}
                          checked={watch(`multipleRelocationRequests.${index}.hasInsurance`)}
                          onCheckedChange={(checked) => {
                            setValue(`multipleRelocationRequests.${index}.hasInsurance`, checked);
                          }}
                          className="h-4 w-4 border-black"
                        />
                        <Label 
                          htmlFor={`multipleRelocationRequests.${index}.hasInsurance`} 
                          className="text-sm cursor-pointer"
                        >
                          Yes
                        </Label>
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
          
          {requests.length > 0 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={saveChanges}
              className="flex-1"
            >
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
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