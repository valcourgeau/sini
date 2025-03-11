import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, UserPlus, Users } from "lucide-react";

interface MultipleRelocationRequestsProps {
  form: UseFormReturn<any>;
}

export function MultipleRelocationRequests({ form }: MultipleRelocationRequestsProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const [showAddPersonForm, setShowAddPersonForm] = useState(false);
  
  // Get current requests or initialize empty array
  const requests = watch("multipleRelocationRequests") || [];
  const requestErrors = errors.multipleRelocationRequests || [];
  
  // Add a new person
  const addPerson = () => {
    const newPerson = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialNeeds: "",
      arrivalDate: "",
      estimatedDuration: "",
      hasInsurance: false,
      insuranceDetails: "",
    };
    
    setValue("multipleRelocationRequests", [...requests, newPerson]);
    setShowAddPersonForm(false);
  };
  
  // Remove a person by index
  const removePerson = (index: number) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setValue("multipleRelocationRequests", updatedRequests);
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
          <div className="space-y-8">
            {requests.map((request: any, index: number) => (
              <div key={index} className="p-4 border rounded-md bg-muted/20 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    Person {index + 1}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removePerson(index)}
                    type="button"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`multipleRelocationRequests.${index}.firstName`}>
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id={`multipleRelocationRequests.${index}.firstName`}
                      {...register(`multipleRelocationRequests.${index}.firstName`)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="First name"
                    />
                    {requestErrors[index]?.firstName && (
                      <p className="text-sm text-red-500 mt-1">
                        {requestErrors[index]?.firstName?.message as string}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`multipleRelocationRequests.${index}.lastName`}>
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id={`multipleRelocationRequests.${index}.lastName`}
                      {...register(`multipleRelocationRequests.${index}.lastName`)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Last name"
                    />
                    {requestErrors[index]?.lastName && (
                      <p className="text-sm text-red-500 mt-1">
                        {requestErrors[index]?.lastName?.message as string}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`multipleRelocationRequests.${index}.email`}>
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id={`multipleRelocationRequests.${index}.email`}
                      type="email"
                      {...register(`multipleRelocationRequests.${index}.email`)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Email address"
                    />
                    {requestErrors[index]?.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {requestErrors[index]?.email?.message as string}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`multipleRelocationRequests.${index}.phone`}>
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id={`multipleRelocationRequests.${index}.phone`}
                      type="tel"
                      {...register(`multipleRelocationRequests.${index}.phone`)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="+41 XX XXX XX XX"
                    />
                    {requestErrors[index]?.phone && (
                      <p className="text-sm text-red-500 mt-1">
                        {requestErrors[index]?.phone?.message as string}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`multipleRelocationRequests.${index}.arrivalDate`}>
                      Desired Arrival Date (Optional)
                    </Label>
                    <input
                      id={`multipleRelocationRequests.${index}.arrivalDate`}
                      type="date"
                      {...register(`multipleRelocationRequests.${index}.arrivalDate`)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`multipleRelocationRequests.${index}.estimatedDuration`}>
                      Estimated Duration (Optional)
                    </Label>
                    <input
                      id={`multipleRelocationRequests.${index}.estimatedDuration`}
                      {...register(`multipleRelocationRequests.${index}.estimatedDuration`)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="e.g., 3 months"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`multipleRelocationRequests.${index}.specialNeeds`}>
                    Special Needs (Optional)
                  </Label>
                  <textarea
                    id={`multipleRelocationRequests.${index}.specialNeeds`}
                    {...register(`multipleRelocationRequests.${index}.specialNeeds`)}
                    rows={2}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Any special needs, accessibility requirements, or pets"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start space-x-3 py-2">
                    <input
                      type="checkbox"
                      id={`multipleRelocationRequests.${index}.hasInsurance`}
                      {...register(`multipleRelocationRequests.${index}.hasInsurance`)}
                      className="rounded border-input h-5 w-5 mt-0.5"
                    />
                    <Label htmlFor={`multipleRelocationRequests.${index}.hasInsurance`} className="cursor-pointer">
                      Has insurance coverage for relocation
                    </Label>
                  </div>
                  
                  {watch(`multipleRelocationRequests.${index}.hasInsurance`) && (
                    <div className="space-y-2 ml-8">
                      <Label htmlFor={`multipleRelocationRequests.${index}.insuranceDetails`}>
                        Insurance Details
                      </Label>
                      <textarea
                        id={`multipleRelocationRequests.${index}.insuranceDetails`}
                        {...register(`multipleRelocationRequests.${index}.insuranceDetails`)}
                        rows={2}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Insurance company, policy number, etc."
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
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
        
        {showAddPersonForm ? (
          <div className="p-4 border rounded-md bg-muted/10 space-y-4">
            <h3 className="font-medium">Add New Person</h3>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAddPersonForm(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={addPerson}
                type="button"
              >
                Add Person
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setShowAddPersonForm(true)}
            className="w-full"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Another Person
          </Button>
        )}
        
        {requests.length === 0 && (
          <Button type="button" onClick={addPerson} className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Add First Person
          </Button>
        )}

        {requests.length > 0 && (
          <div className="p-4 bg-amber-50 rounded-md border border-amber-100">
            <p className="text-sm text-amber-700">
              <strong>Note:</strong> Please ensure that you've added all individuals requiring relocation assistance. 
              You can add or remove people using the buttons above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 