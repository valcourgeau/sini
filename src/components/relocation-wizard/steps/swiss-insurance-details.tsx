// import { UseFormReturn, FieldError } from "react-hook-form";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Check, UserRound, Home, CloudLightning, Building, Landmark, ChevronDown, ChevronUp, X } from "lucide-react";
// import { 
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";

// interface SwissInsuranceDetailsProps {
//   form: UseFormReturn<any>;
// }

// // Common Swiss insurance companies
// const SWISS_INSURANCE_COMPANIES = [
//   "Zurich Insurance",
//   "AXA",
//   "Helvetia",
//   "Swiss Re",
//   "Swiss Life",
//   "Basler Versicherungen",
//   "Generali",
//   "Allianz",
//   "Vaudoise Assurances",
//   "Baloise",
//   "Other"
// ];

// export function SwissInsuranceDetails({ form }: SwissInsuranceDetailsProps) {
//   const { register, setValue, watch, formState: { errors } } = form;
//   const insuranceErrors = errors.swissInsuranceDetails as Record<string, FieldError> || {};
  
//   const isOwner = watch("role") === "owner";
//   const address = watch("singleDisasterAddress") || {};
//   const isVaud = address.canton === "Vaud" || (address.postalCode?.startsWith("1") && address.country === "Switzerland");
  
//   // Watch for insurance types
//   const hasRCInsurance = watch("swissInsuranceDetails.hasRCInsurance");
//   const hasMenageInsurance = watch("swissInsuranceDetails.hasMenageInsurance");
//   const hasNaturalDisasterInsurance = watch("swissInsuranceDetails.hasNaturalDisasterInsurance");
//   const hasBuildingInsurance = watch("swissInsuranceDetails.hasBuildingInsurance");
  
//   // State for tracking if "Other" is selected for each insurance type
//   const [showOtherRC, setShowOtherRC] = useState(false);
//   const [showOtherMenage, setShowOtherMenage] = useState(false);
//   const [showOtherNaturalDisaster, setShowOtherNaturalDisaster] = useState(false);
//   const [showOtherBuilding, setShowOtherBuilding] = useState(false);
  
//   // Helper functions to handle toggle
//   const handleToggleInsurance = (field: string, value: boolean) => {
//     setValue(field, value);
//   };
  
//   // Helper function to handle insurance company selection
//   const handleInsuranceCompanyChange = (type: string, value: string) => {
//     const field = `swissInsuranceDetails.${type}InsuranceCompany`;
    
//     if (value === "Other") {
//       setValue(field, "");
      
//       // Show the custom input field
//       switch (type) {
//         case "rc":
//           setShowOtherRC(true);
//           break;
//         case "menage":
//           setShowOtherMenage(true);
//           break;
//         case "naturalDisaster":
//           setShowOtherNaturalDisaster(true);
//           break;
//         case "building":
//           setShowOtherBuilding(true);
//           break;
//       }
//     } else {
//       setValue(field, value);
      
//       // Hide the custom input field
//       switch (type) {
//         case "rc":
//           setShowOtherRC(false);
//           break;
//         case "menage":
//           setShowOtherMenage(false);
//           break;
//         case "naturalDisaster":
//           setShowOtherNaturalDisaster(false);
//           break;
//         case "building":
//           setShowOtherBuilding(false);
//           break;
//       }
//     }
//   };
  
//   // Helper function to switch back to dropdown
//   const switchToDropdown = (type: string) => {
//     switch (type) {
//       case "rc":
//         setShowOtherRC(false);
//         break;
//       case "menage":
//         setShowOtherMenage(false);
//         break;
//       case "naturalDisaster":
//         setShowOtherNaturalDisaster(false);
//         break;
//       case "building":
//         setShowOtherBuilding(false);
//         break;
//     }
//   };
  
//   return (
//     <div className="space-y-4">
//       <div className="text-center">
//         <h2 className="text-xl font-semibold mb-2">Détails des assurances suisses</h2>
//         <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
//           Veuillez fournir les informations concernant vos différentes assurances qui pourraient couvrir les frais de relogement.
//         </p>
//       </div>

//       <div className="space-y-6">
//         <div className="space-y-4">
//           <Accordion type="single" collapsible className="w-full">
//             {/* RC Insurance */}
//             <AccordionItem value="rc">
//               <AccordionTrigger className="text-base">
//                 <div className="flex items-center gap-2">
//                   <UserRound className="h-5 w-5 text-primary" />
//                   <span>Assurance responsabilité civile (RC)</span>
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="space-y-4 pt-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="swissInsuranceDetails.hasRCInsurance">
//                       Avez-vous une assurance RC ?
//                     </Label>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="swissInsuranceDetails.hasRCInsurance"
//                         checked={watch("swissInsuranceDetails.hasRCInsurance")}
//                         onCheckedChange={(checked) => {
//                           setValue("swissInsuranceDetails.hasRCInsurance", checked);
//                         }}
//                       />
//                       <label
//                         htmlFor="swissInsuranceDetails.hasRCInsurance"
//                         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       >
//                         Oui, j'ai une assurance RC
//                       </label>
//                     </div>
//                   </div>

//                   {watch("swissInsuranceDetails.hasRCInsurance") && (
//                     <>
//                       <div className="space-y-2">
//                         <Label htmlFor="swissInsuranceDetails.rcInsuranceCompany">
//                           Compagnie d'assurance RC
//                         </Label>
//                         {!showOtherRC ? (
//                           <Select
//                             onValueChange={(value) => handleInsuranceCompanyChange("rc", value)}
//                             defaultValue={watch("swissInsuranceDetails.rcInsuranceCompany") || ""}
//                           >
//                             <SelectTrigger className="h-8 text-sm">
//                               <SelectValue placeholder="Select insurance company" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {SWISS_INSURANCE_COMPANIES.map((company) => (
//                                 <SelectItem key={company} value={company}>
//                                   {company}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         ) : (
//                           <div className="flex gap-2">
//                             <Input
//                               id="swissInsuranceDetails.rcInsuranceCompany"
//                               {...register("swissInsuranceDetails.rcInsuranceCompany")}
//                               placeholder="Enter company name"
//                               className="h-8 text-sm"
//                             />
//                             <Button 
//                               type="button" 
//                               variant="outline" 
//                               size="sm" 
//                               className="h-8 px-2"
//                               onClick={() => switchToDropdown("rc")}
//                               title="Switch back to dropdown"
//                             >
//                               <X size={16} className="text-red-500" />
//                             </Button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="swissInsuranceDetails.rcPolicyNumber">
//                           Numéro de police RC
//                         </Label>
//                         <Input
//                           id="swissInsuranceDetails.rcPolicyNumber"
//                           {...register("swissInsuranceDetails.rcPolicyNumber")}
//                           placeholder="e.g., RC123456"
//                           className="h-8 text-sm"
//                         />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>

//             {/* Ménage Insurance */}
//             <AccordionItem value="menage">
//               <AccordionTrigger className="text-base">
//                 <div className="flex items-center gap-2">
//                   <Home className="h-5 w-5 text-primary" />
//                   <span>Assurance ménage</span>
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="space-y-4 pt-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="swissInsuranceDetails.hasMenageInsurance">
//                       Avez-vous une assurance ménage ?
//                     </Label>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="swissInsuranceDetails.hasMenageInsurance"
//                         checked={watch("swissInsuranceDetails.hasMenageInsurance")}
//                         onCheckedChange={(checked) => {
//                           setValue("swissInsuranceDetails.hasMenageInsurance", checked);
//                         }}
//                       />
//                       <label
//                         htmlFor="swissInsuranceDetails.hasMenageInsurance"
//                         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       >
//                         Oui, j'ai une assurance ménage
//                       </label>
//                     </div>
//                   </div>

//                   {watch("swissInsuranceDetails.hasMenageInsurance") && (
//                     <>
//                       <div className="space-y-2">
//                         <Label htmlFor="swissInsuranceDetails.menageInsuranceCompany">
//                           Compagnie d'assurance ménage
//                         </Label>
//                         {!showOtherMenage ? (
//                           <Select
//                             onValueChange={(value) => handleInsuranceCompanyChange("menage", value)}
//                             defaultValue={watch("swissInsuranceDetails.menageInsuranceCompany") || ""}
//                           >
//                             <SelectTrigger className="h-8 text-sm">
//                               <SelectValue placeholder="Select insurance company" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {SWISS_INSURANCE_COMPANIES.map((company) => (
//                                 <SelectItem key={company} value={company}>
//                                   {company}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         ) : (
//                           <div className="flex gap-2">
//                             <Input
//                               id="swissInsuranceDetails.menageInsuranceCompany"
//                               {...register("swissInsuranceDetails.menageInsuranceCompany")}
//                               placeholder="Enter company name"
//                               className="h-8 text-sm"
//                             />
//                             <Button 
//                               type="button" 
//                               variant="outline" 
//                               size="sm" 
//                               className="h-8 px-2"
//                               onClick={() => switchToDropdown("menage")}
//                               title="Switch back to dropdown"
//                             >
//                               <X size={16} className="text-red-500" />
//                             </Button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="swissInsuranceDetails.menagePolicyNumber">
//                           Numéro de police ménage
//                         </Label>
//                         <Input
//                           id="swissInsuranceDetails.menagePolicyNumber"
//                           {...register("swissInsuranceDetails.menagePolicyNumber")}
//                           placeholder="e.g., MEN123456"
//                           className="h-8 text-sm"
//                         />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>

//             {/* Natural Disaster Insurance */}
//             <AccordionItem value="naturalDisaster">
//               <AccordionTrigger className="text-base">
//                 <div className="flex items-center gap-2">
//                   <CloudLightning className="h-5 w-5 text-primary" />
//                   <span>Assurance catastrophes naturelles</span>
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="space-y-4 pt-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="swissInsuranceDetails.hasNaturalDisasterInsurance">
//                       Avez-vous une assurance catastrophes naturelles ?
//                     </Label>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="swissInsuranceDetails.hasNaturalDisasterInsurance"
//                         checked={watch("swissInsuranceDetails.hasNaturalDisasterInsurance")}
//                         onCheckedChange={(checked) => {
//                           setValue("swissInsuranceDetails.hasNaturalDisasterInsurance", checked);
//                         }}
//                       />
//                       <label
//                         htmlFor="swissInsuranceDetails.hasNaturalDisasterInsurance"
//                         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       >
//                         Oui, j'ai une assurance catastrophes naturelles
//                       </label>
//                     </div>
//                   </div>

//                   {watch("swissInsuranceDetails.hasNaturalDisasterInsurance") && (
//                     <>
//                       <div className="space-y-2">
//                         <Label htmlFor="swissInsuranceDetails.naturalDisasterInsuranceCompany">
//                           Compagnie d'assurance catastrophes naturelles
//                         </Label>
//                         {!showOtherNaturalDisaster ? (
//                           <Select
//                             onValueChange={(value) => handleInsuranceCompanyChange("naturalDisaster", value)}
//                             defaultValue={watch("swissInsuranceDetails.naturalDisasterInsuranceCompany") || ""}
//                           >
//                             <SelectTrigger className="h-8 text-sm">
//                               <SelectValue placeholder="Select insurance company" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {SWISS_INSURANCE_COMPANIES.map((company) => (
//                                 <SelectItem key={company} value={company}>
//                                   {company}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         ) : (
//                           <div className="flex gap-2">
//                             <Input
//                               id="swissInsuranceDetails.naturalDisasterInsuranceCompany"
//                               {...register("swissInsuranceDetails.naturalDisasterInsuranceCompany")}
//                               placeholder="Enter company name"
//                               className="h-8 text-sm"
//                             />
//                             <Button 
//                               type="button" 
//                               variant="outline" 
//                               size="sm" 
//                               className="h-8 px-2"
//                               onClick={() => switchToDropdown("naturalDisaster")}
//                               title="Switch back to dropdown"
//                             >
//                               <X size={16} className="text-red-500" />
//                             </Button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="swissInsuranceDetails.naturalDisasterPolicyNumber">
//                           Numéro de police catastrophes naturelles
//                         </Label>
//                         <Input
//                           id="swissInsuranceDetails.naturalDisasterPolicyNumber"
//                           {...register("swissInsuranceDetails.naturalDisasterPolicyNumber")}
//                           placeholder="e.g., ND123456"
//                           className="h-8 text-sm"
//                         />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>

//             {/* Building Insurance */}
//             <AccordionItem value="building">
//               <AccordionTrigger className="text-base">
//                 <div className="flex items-center gap-2">
//                   <Building className="h-5 w-5 text-primary" />
//                   <span>Assurance bâtiment (propriétaires)</span>
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="space-y-4 pt-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="swissInsuranceDetails.hasBuildingInsurance">
//                       Êtes-vous propriétaire avec une assurance bâtiment ?
//                     </Label>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="swissInsuranceDetails.hasBuildingInsurance"
//                         checked={watch("swissInsuranceDetails.hasBuildingInsurance")}
//                         onCheckedChange={(checked) => {
//                           setValue("swissInsuranceDetails.hasBuildingInsurance", checked);
//                         }}
//                       />
//                       <label
//                         htmlFor="swissInsuranceDetails.hasBuildingInsurance"
//                         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       >
//                         Oui, je suis propriétaire avec une assurance bâtiment
//                       </label>
//                     </div>
//                   </div>

//                   {watch("swissInsuranceDetails.hasBuildingInsurance") && (
//                     <>
//                       <div className="space-y-2">
//                         <Label htmlFor="swissInsuranceDetails.buildingInsuranceCompany">
//                           Compagnie d'assurance bâtiment
//                         </Label>
//                         {!showOtherBuilding ? (
//                           <Select
//                             onValueChange={(value) => handleInsuranceCompanyChange("building", value)}
//                             defaultValue={watch("swissInsuranceDetails.buildingInsuranceCompany") || ""}
//                           >
//                             <SelectTrigger className="h-8 text-sm">
//                               <SelectValue placeholder="Select insurance company" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {SWISS_INSURANCE_COMPANIES.map((company) => (
//                                 <SelectItem key={company} value={company}>
//                                   {company}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         ) : (
//                           <div className="flex gap-2">
//                             <Input
//                               id="swissInsuranceDetails.buildingInsuranceCompany"
//                               {...register("swissInsuranceDetails.buildingInsuranceCompany")}
//                               placeholder="Enter company name"
//                               className="h-8 text-sm"
//                             />
//                             <Button 
//                               type="button" 
//                               variant="outline" 
//                               size="sm" 
//                               className="h-8 px-2"
//                               onClick={() => switchToDropdown("building")}
//                               title="Switch back to dropdown"
//                             >
//                               <X size={16} className="text-red-500" />
//                             </Button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="swissInsuranceDetails.buildingPolicyNumber">
//                           Numéro de police bâtiment
//                         </Label>
//                         <Input
//                           id="swissInsuranceDetails.buildingPolicyNumber"
//                           {...register("swissInsuranceDetails.buildingPolicyNumber")}
//                           placeholder="e.g., BLD123456"
//                           className="h-8 text-sm"
//                         />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>

//             {/* ECA Insurance (Canton de Vaud) */}
//             <AccordionItem value="eca">
//               <AccordionTrigger className="text-base">
//                 <div className="flex items-center gap-2">
//                   <Landmark className="h-5 w-5 text-primary" />
//                   <span>Assurance ECA (Canton de Vaud)</span>
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="space-y-4 pt-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="swissInsuranceDetails.ecaPolicyNumber">
//                       Numéro de police ECA
//                     </Label>
//                     <input
//                       id="swissInsuranceDetails.ecaPolicyNumber"
//                       {...register("swissInsuranceDetails.ecaPolicyNumber")}
//                       className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                       placeholder="Numéro de votre police ECA"
//                     />
//                     <p className="text-xs text-muted-foreground mt-1">
//                       Si vous êtes dans le Canton de Vaud, vous pouvez avoir une police ECA (Établissement Cantonal d'Assurance).
//                     </p>
//                   </div>
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//         </div>

//         <div className="p-3 bg-primary/5 rounded-md border border-primary/10">
//           <p className="text-sm text-primary/80">
//             <strong>Important :</strong> Nous pourrions avoir besoin de vérifier votre couverture d'assurance auprès de vos assureurs. En fournissant 
//             ces informations, vous nous autorisez à contacter vos compagnies d'assurance concernant votre demande de relogement.
//             Si vous n'êtes pas sûr de certains détails, vous pouvez les laisser vides et notre équipe vous aidera.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// } 