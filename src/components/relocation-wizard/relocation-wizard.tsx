"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RelocationTypeSelection } from "./steps/relocation-type-selection";
import { SingleRelocationPreferences } from "./steps/single-relocation-preferences";
import { SingleArrivalDetails, SingleArrivalDetailsRef } from "./steps/single-arrival-details";
import { SingleInsuranceCoverage } from "./steps/single-insurance-coverage";
import { SingleInsuranceDetails } from "./steps/single-insurance-details";
import { SingleReviewConfirm } from "./steps/single-review-confirm";
import { SingleConsent } from "./steps/single-consent";
import { MultipleDisasterAddress } from "./steps/multiple-disaster-address";
import { MultipleRelocationRequests } from "./steps/multiple-relocation-requests";
import { MultipleReviewConfirm } from "./steps/multiple-review-confirm";
import { MultipleConsent } from "./steps/multiple-consent";
import { SuccessMessage } from "./steps/success-message";
import { SwissInsuranceDetails } from "./steps/swiss-insurance-details";
import { UseFormReturn } from "react-hook-form";
import { SingleAddressAndContact } from "./steps/single-address-and-contact";
import { cn } from "@/lib/utils";

// Define the form schema using Zod
const formSchema = z.object({
  // Step 1: Relocation Type
  relocationType: z.enum(["single", "multiple"], {
    required_error: "Veuillez sélectionner une option pour continuer.",
    invalid_type_error: "Veuillez sélectionner une option pour continuer."
  }),

  // Single Relocation path
  singleDisasterAddress: z.object({
    street: z.string()
      .min(1, "L'adresse est requise")
      .min(5, "L'adresse doit contenir au moins 5 caractères")
      .max(100, "L'adresse ne peut pas dépasser 100 caractères")
      .regex(/^[a-zA-ZÀ-ÿ0-9\s\-\.\,]+$/, "L'adresse ne peut contenir que des lettres, chiffres, espaces, tirets, points et virgules"),
    city: z.string()
      .min(1, "La ville est requise")
      .min(2, "La ville doit contenir au moins 2 caractères")
      .max(50, "La ville ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-ZÀ-ÿ\s\-]+$/, "La ville ne peut contenir que des lettres, espaces et tirets"),
    postalCode: z.string()
      .min(1, "Le code postal est requis")
      .min(4, "Le code postal doit contenir au moins 4 caractères")
      .max(10, "Le code postal ne peut pas dépasser 10 caractères")
      .regex(/^[0-9A-Z\s]+$/, "Le code postal ne peut contenir que des chiffres et des lettres majuscules"),
    country: z.string()
      .min(1, "Le pays est requis")
      .min(2, "Le pays doit contenir au moins 2 caractères")
      .max(50, "Le pays ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-ZÀ-ÿ\s\-]+$/, "Le pays ne peut contenir que des lettres, espaces et tirets"),
    canton: z.string().optional(),
  }).optional(),

  singleRelocationPreferences: z.object({
    bedrooms: z.number().min(1, "Au moins une chambre est requise"),
    adults: z.number().min(1, "Au moins un adulte est requis"),
    children: z.number().min(0, "Le nombre d'enfants doit être positif"),
    hasAnimals: z.boolean().optional(),
    hasAccessibilityNeeds: z.boolean().optional(),
    needsParking: z.boolean().optional(),
  }).optional(),

  singleArrivalDetails: z.object({
    arrivalDate: z.string().min(1, "La date d'arrivée est requise"),
    departureDate: z.string().optional(),
    useExactDates: z.boolean().default(false),
    estimatedDuration: z.string().optional(),
  }).optional(),

  singlePersonalData: z.object({
    firstName: z.string()
      .min(1, "Le prénom est requis")
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(50, "Le prénom ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, "Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes"),
    lastName: z.string()
      .min(1, "Le nom est requis")
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes"),
    email: z.string()
      .min(1, "L'email est requis")
      .email("Veuillez entrer une adresse email valide")
      .max(100, "L'email ne peut pas dépasser 100 caractères")
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Format d'email invalide"),
    phone: z.string()
      .min(1, "Le numéro de téléphone est requis")
      .min(10, "Le numéro de téléphone doit contenir au moins 10 caractères")
      .max(20, "Le numéro de téléphone ne peut pas dépasser 20 caractères")
      .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Le numéro de téléphone ne peut contenir que des chiffres, espaces, tirets, parenthèses et le symbole +"),
  }).optional(),

  singleInsuredData: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
  }).optional(),

  singleInsuranceCoverage: z.object({
    hasInsurance: z.boolean({
      required_error: "Veuillez sélectionner une option pour continuer.",
      invalid_type_error: "Veuillez sélectionner une option pour continuer."
    }),
    claimDocument: z.instanceof(File).optional(),
  }).refine((data) => {
    // User must select "yes" AND upload a document to proceed
    if (data.hasInsurance === true) {
      return data.claimDocument !== undefined;
    }
    return true; // If they select "no", they can proceed
  }, {
    message: "Veuillez télécharger la déclaration de sinistre pour continuer.",
    path: ["claimDocument"]
  }).optional(),

  singleInsuranceDetails: z.object({
    insuranceCompany: z.string()
      .min(1, "La compagnie d'assurance est requise")
      .max(100, "Le nom de la compagnie ne peut pas dépasser 100 caractères"),
    policyNumber: z.string()
      .min(1, "Le numéro de police d'assurance est requis")
      .min(3, "Le numéro de police doit contenir au moins 3 caractères")
      .max(50, "Le numéro de police ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-Z0-9\-\_\/\s]+$/, "Le numéro de police ne peut contenir que des lettres, chiffres, tirets, underscores, slashes et espaces"),
    customInsuranceCompany: z.string()
      .max(100, "Le nom de la compagnie ne peut pas dépasser 100 caractères")
      .regex(/^[a-zA-ZÀ-ÿ0-9\s\-\.&]+$/, "Le nom de la compagnie ne peut contenir que des lettres, chiffres, espaces, tirets, points et &")
      .optional(),
  }).optional(),

  swissInsuranceDetails: z.object({
    // RC Insurance
    hasRCInsurance: z.boolean().optional(),
    rcInsuranceCompany: z.string()
      .max(100, "Le nom de la compagnie ne peut pas dépasser 100 caractères")
      .regex(/^[a-zA-ZÀ-ÿ0-9\s\-\.&]+$/, "Le nom de la compagnie ne peut contenir que des lettres, chiffres, espaces, tirets, points et &")
      .optional(),
    rcPolicyNumber: z.string()
      .min(3, "Le numéro de police doit contenir au moins 3 caractères")
      .max(50, "Le numéro de police ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-Z0-9\-\_\/\s]+$/, "Le numéro de police ne peut contenir que des lettres, chiffres, tirets, underscores, slashes et espaces")
      .optional(),
    
    // Ménage Insurance
    hasMenageInsurance: z.boolean().optional(),
    menageInsuranceCompany: z.string()
      .max(100, "Le nom de la compagnie ne peut pas dépasser 100 caractères")
      .regex(/^[a-zA-ZÀ-ÿ0-9\s\-\.&]+$/, "Le nom de la compagnie ne peut contenir que des lettres, chiffres, espaces, tirets, points et &")
      .optional(),
    menagePolicyNumber: z.string()
      .min(3, "Le numéro de police doit contenir au moins 3 caractères")
      .max(50, "Le numéro de police ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-Z0-9\-\_\/\s]+$/, "Le numéro de police ne peut contenir que des lettres, chiffres, tirets, underscores, slashes et espaces")
      .optional(),
    
    // Natural Disaster Insurance
    hasNaturalDisasterInsurance: z.boolean().optional(),
    naturalDisasterInsuranceCompany: z.string()
      .max(100, "Le nom de la compagnie ne peut pas dépasser 100 caractères")
      .regex(/^[a-zA-ZÀ-ÿ0-9\s\-\.&]+$/, "Le nom de la compagnie ne peut contenir que des lettres, chiffres, espaces, tirets, points et &")
      .optional(),
    naturalDisasterPolicyNumber: z.string()
      .min(3, "Le numéro de police doit contenir au moins 3 caractères")
      .max(50, "Le numéro de police ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-Z0-9\-\_\/\s]+$/, "Le numéro de police ne peut contenir que des lettres, chiffres, tirets, underscores, slashes et espaces")
      .optional(),
    
    // Building Insurance (for owners)
    hasBuildingInsurance: z.boolean().optional(),
    buildingInsuranceCompany: z.string()
      .max(100, "Le nom de la compagnie ne peut pas dépasser 100 caractères")
      .regex(/^[a-zA-ZÀ-ÿ0-9\s\-\.&]+$/, "Le nom de la compagnie ne peut contenir que des lettres, chiffres, espaces, tirets, points et &")
      .optional(),
    buildingPolicyNumber: z.string()
      .min(3, "Le numéro de police doit contenir au moins 3 caractères")
      .max(50, "Le numéro de police ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-Z0-9\-\_\/\s]+$/, "Le numéro de police ne peut contenir que des lettres, chiffres, tirets, underscores, slashes et espaces")
      .optional(),
    
    // ECA Insurance (for Canton de Vaud)
    ecaPolicyNumber: z.string()
      .min(3, "Le numéro de police doit contenir au moins 3 caractères")
      .max(50, "Le numéro de police ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-Z0-9\-\_\/\s]+$/, "Le numéro de police ne peut contenir que des lettres, chiffres, tirets, underscores, slashes et espaces")
      .optional(),
    
    // Additional Information
    agentContact: z.string()
      .max(200, "Les informations de contact ne peuvent pas dépasser 200 caractères")
      .optional(),
    additionalNotes: z.string()
      .max(1000, "Les notes additionnelles ne peuvent pas dépasser 1000 caractères")
      .optional(),
  }).optional(),

  singleConsent: z.object({
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: "Vous devez accepter les conditions pour continuer",
    }),
    agreeToDataProcessing: z.boolean().refine(val => val === true, {
      message: "Vous devez accepter le traitement des données pour continuer",
    }),
  }),

  // Review confirmation fields
  singleReviewConfirmation: z.object({
    confirmDataAccuracy: z.boolean().refine(val => val === true, {
      message: "Vous devez confirmer l'exactitude des données pour continuer",
    }),
  }).optional(),

  multipleReviewConfirmation: z.object({
    confirmDataAccuracy: z.boolean().refine(val => val === true, {
      message: "Vous devez confirmer l'exactitude des données pour continuer",
    }),
  }).optional(),

  // Multiple Relocation path
  multipleDisasterAddress: z.object({
    street: z.string()
      .min(1, "L'adresse est requise")
      .min(5, "L'adresse doit contenir au moins 5 caractères")
      .max(100, "L'adresse ne peut pas dépasser 100 caractères")
      .regex(/^[a-zA-ZÀ-ÿ0-9\s\-\.\,]+$/, "L'adresse ne peut contenir que des lettres, chiffres, espaces, tirets, points et virgules"),
    city: z.string()
      .min(1, "La ville est requise")
      .min(2, "La ville doit contenir au moins 2 caractères")
      .max(50, "La ville ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-ZÀ-ÿ\s\-]+$/, "La ville ne peut contenir que des lettres, espaces et tirets"),
    postalCode: z.string()
      .min(1, "Le code postal est requis")
      .min(4, "Le code postal doit contenir au moins 4 caractères")
      .max(10, "Le code postal ne peut pas dépasser 10 caractères")
      .regex(/^[0-9A-Z\s]+$/, "Le code postal ne peut contenir que des chiffres et des lettres majuscules"),
    country: z.string()
      .min(1, "Le pays est requis")
      .min(2, "Le pays doit contenir au moins 2 caractères")
      .max(50, "Le pays ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-ZÀ-ÿ\s\-]+$/, "Le pays ne peut contenir que des lettres, espaces et tirets"),
  }).optional(),

  multipleRelocationRequests: z.array(z.object({
    firstName: z.string()
      .min(1, "Le prénom est requis")
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(50, "Le prénom ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, "Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes"),
    lastName: z.string()
      .min(1, "Le nom est requis")
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes"),
    email: z.string()
      .min(1, "L'email est requis")
      .email("Veuillez entrer une adresse email valide")
      .max(100, "L'email ne peut pas dépasser 100 caractères")
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Format d'email invalide"),
    phone: z.string()
      .min(1, "Le numéro de téléphone est requis")
      .min(10, "Le numéro de téléphone doit contenir au moins 10 caractères")
      .max(20, "Le numéro de téléphone ne peut pas dépasser 20 caractères")
      .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Le numéro de téléphone ne peut contenir que des chiffres, espaces, tirets, parenthèses et le symbole +"),
    specialNeeds: z.string()
      .max(500, "Les besoins spéciaux ne peuvent pas dépasser 500 caractères")
      .optional(),
    arrivalDate: z.string().optional(),
    departureDate: z.string().optional(),
    useExactDates: z.boolean().default(false),
    estimatedDuration: z.string().optional(),
    hasInsurance: z.boolean().optional(),
    insuranceDetails: z.string()
      .max(500, "Les détails d'assurance ne peuvent pas dépasser 500 caractères")
      .optional(),
    claimDocument: z.instanceof(File).optional(),
    hasUploadedClaim: z.boolean().optional(),
  })).optional(),

  multipleConsent: z.object({
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: "Vous devez accepter les conditions pour continuer",
    }),
    agreeToDataProcessing: z.boolean().refine(val => val === true, {
      message: "Vous devez accepter le traitement des données pour continuer",
    }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function RelocationWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isArrivalDetailsValid, setIsArrivalDetailsValid] = useState(false);
  const arrivalDetailsRef = useRef<SingleArrivalDetailsRef>(null);
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const userTypeParam = searchParams.get("userType");

  // Add debugging for isSubmitted state changes
  useEffect(() => {
    console.log("isSubmitted state changed:", isSubmitted);
  }, [isSubmitted]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relocationType: userTypeParam === "sinistre" ? "single" : undefined,
      singleDisasterAddress: {
        street: "",
        city: "",
        postalCode: "",
        country: "Suisse",
        canton: "Genève"
      },
      singlePersonalData: {
        firstName: "Valentin",
        lastName: "Garnier",
        email: "valentin.garnier@gmail.com",
        phone: "+41 79 123 45 67"
      },
      singleInsuredData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
      },
      singleInsuranceDetails: {
        insuranceCompany: "",
        policyNumber: "",
        customInsuranceCompany: ""
      },
      singleRelocationPreferences: {
        bedrooms: 1,
        adults: 1,
        children: 0,
        hasAnimals: false,
        hasAccessibilityNeeds: false,
        needsParking: false
      },
      singleReviewConfirmation: {
        confirmDataAccuracy: false
      },
      multipleReviewConfirmation: {
        confirmDataAccuracy: false
      },
      singleConsent: {
        agreeToTerms: false,
        agreeToDataProcessing: false
      },
      multipleConsent: {
        agreeToTerms: false,
        agreeToDataProcessing: false
      }
    },
  });

  // If user is sinistre, start at step 2 (insurance coverage) since single is auto-selected
  useEffect(() => {
    if (userTypeParam === "sinistre") {
      setStep(2);
    }
  }, [userTypeParam]);

  // Reset validation state when step changes
  useEffect(() => {
    setIsArrivalDetailsValid(false);
  }, [step]);

  // Calculate total steps based on the selected path
  const getTotalSteps = () => {
    const relocationType = form.watch("relocationType");
    
    if (!relocationType) return 8; // Default steps until relocation type selection
    
    return relocationType === "single" ? 8 : 6; // Single: 8 steps, Multiple: 6 steps
  };

  const totalSteps = getTotalSteps();
  
  // Calculate progress percentage
  const progressPercentage = (step / totalSteps) * 100;

  const nextStep = async () => {
    // Validate current step before proceeding
    let isValid = false;
    console.log("Validating step:", step);
    
    switch (step) {
      case 1:
        // Validate relocation type selection
        isValid = await form.trigger("relocationType");
        break;
      case 2:
        // Validate insurance coverage step
        if (form.watch("relocationType") === "single") {
          const insuranceData = form.getValues("singleInsuranceCoverage");
          if (!insuranceData || typeof insuranceData.hasInsurance !== 'boolean') {
            // Set a custom error message for no selection
            form.setError("singleInsuranceCoverage", {
              type: "manual",
              message: "Veuillez sélectionner une option pour continuer."
            });
            isValid = false;
          } else if (insuranceData.hasInsurance === true && !insuranceData.claimDocument) {
            // Set a custom error message for missing document upload
            form.setError("singleInsuranceCoverage", {
              type: "manual",
              message: "Veuillez télécharger la déclaration de sinistre pour continuer"
            });
            isValid = false;
          } else {
            isValid = await form.trigger("singleInsuranceCoverage");
          }
        } else {
          isValid = await form.trigger("multipleDisasterAddress");
        }
        break;
      case 3:
        // Validate step 3 based on path
        if (form.watch("relocationType") === "single") {
          const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;
          console.log("Step 3 - hasInsurance:", hasInsurance);
          
          // Always validate disaster address and personal data
          const addressValid = await form.trigger("singleDisasterAddress");
          const personalDataValid = await form.trigger("singlePersonalData");
          console.log("Step 3 - addressValid:", addressValid, "personalDataValid:", personalDataValid);
          
          if (hasInsurance === false) {
            // If user has no insurance, validate insured data with custom validation
            const insuredData = form.getValues("singleInsuredData");
            let insuredDataValid = true;
            
            // Clear any existing errors first
            form.clearErrors([
              "singleInsuredData.firstName",
              "singleInsuredData.lastName", 
              "singleInsuredData.email",
              "singleInsuredData.phone"
            ]);
            
            // Custom validation for insured data when user has no insurance
            if (!insuredData?.firstName || insuredData.firstName.length < 2) {
              form.setError("singleInsuredData.firstName", {
                type: "manual",
                message: "Le prénom de l'assuré est requis (minimum 2 caractères)"
              });
              insuredDataValid = false;
            }
            if (!insuredData?.lastName || insuredData.lastName.length < 2) {
              form.setError("singleInsuredData.lastName", {
                type: "manual",
                message: "Le nom de l'assuré est requis (minimum 2 caractères)"
              });
              insuredDataValid = false;
            }
            if (!insuredData?.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(insuredData.email)) {
              form.setError("singleInsuredData.email", {
                type: "manual",
                message: "Un email valide est requis"
              });
              insuredDataValid = false;
            }
            if (!insuredData?.phone || insuredData.phone.length < 10) {
              form.setError("singleInsuredData.phone", {
                type: "manual",
                message: "Un numéro de téléphone valide est requis (minimum 10 caractères)"
              });
              insuredDataValid = false;
            }
            
            // Validate insurance details when user has no insurance
            const insuranceDetails = form.getValues("singleInsuranceDetails");
            let insuranceDetailsValid = true;
            
            // Clear any existing insurance details errors first
            form.clearErrors([
              "singleInsuranceDetails.insuranceCompany",
              "singleInsuranceDetails.policyNumber",
              "singleInsuranceDetails.customInsuranceCompany"
            ]);
            
            // Custom validation for insurance details when user has no insurance
            if (!insuranceDetails?.insuranceCompany || insuranceDetails.insuranceCompany.length < 1) {
              form.setError("singleInsuranceDetails.insuranceCompany", {
                type: "manual",
                message: "La compagnie d'assurance est requise"
              });
              insuranceDetailsValid = false;
            } else if (insuranceDetails.insuranceCompany === "other") {
              // If "other" is selected, validate custom insurance company
              if (!insuranceDetails?.customInsuranceCompany || insuranceDetails.customInsuranceCompany.length < 1) {
                form.setError("singleInsuranceDetails.customInsuranceCompany", {
                  type: "manual",
                  message: "Veuillez saisir le nom de votre compagnie d'assurance"
                });
                insuranceDetailsValid = false;
              }
            }
            if (!insuranceDetails?.policyNumber || insuranceDetails.policyNumber.length < 3) {
              form.setError("singleInsuranceDetails.policyNumber", {
                type: "manual",
                message: "Le numéro de police d'assurance est requis (minimum 3 caractères)"
              });
              insuranceDetailsValid = false;
            }
            
            console.log("Step 3 - insuredDataValid:", insuredDataValid, "insuranceDetailsValid:", insuranceDetailsValid);
            isValid = addressValid && personalDataValid && insuredDataValid && insuranceDetailsValid;
          } else if (hasInsurance === true) {
            // If user has insurance, only validate address and personal data (no insurance details needed)
            
            // Clear any insured data errors since they're not required when user has insurance
            form.clearErrors([
              "singleInsuredData.firstName",
              "singleInsuredData.lastName", 
              "singleInsuredData.email",
              "singleInsuredData.phone"
            ]);
            
            // Clear any insurance details errors since they're not required when user has insurance
            form.clearErrors([
              "singleInsuranceDetails.insuranceCompany",
              "singleInsuranceDetails.policyNumber",
              "singleInsuranceDetails.customInsuranceCompany"
            ]);
            
            console.log("Step 3 - user has insurance, only validating address and personal data");
            isValid = addressValid && personalDataValid;
          } else {
            // If hasInsurance is null/undefined, just validate address and personal data
            isValid = addressValid && personalDataValid;
          }
          console.log("Step 3 - final isValid:", isValid);
        } else {
          isValid = await form.trigger("multipleRelocationRequests");
        }
        break;
      case 4:
        // Validate step 4 based on path
        if (form.watch("relocationType") === "single") {
          // Step 4 is always relocation preferences for single path
          isValid = await form.trigger("singleRelocationPreferences");
        } else {
          // Multiple path - review step, validate confirmation checkbox
          isValid = await form.trigger("multipleReviewConfirmation");
        }
        break;
      case 5:
        // Validate step 5 based on path
        if (form.watch("relocationType") === "single") {
          // Step 5 is always arrival details for single path
          isValid = arrivalDetailsRef.current?.validate() ?? false;
        } else {
          // Multiple path - consent step, validate consent
          isValid = await form.trigger("multipleConsent");
        }
        break;
      case 6:
        // Validate step 6 based on path
        if (form.watch("relocationType") === "single") {
          // Step 6 is always review confirmation for single path
          isValid = await form.trigger("singleReviewConfirmation");
        } else {
          // Multiple path - validate review confirmation
          isValid = await form.trigger("multipleReviewConfirmation");
        }
        break;
      case 7:
        // Validate step 7 based on path
        if (form.watch("relocationType") === "single") {
          // Step 7 is always consent for single path
          isValid = await form.trigger("singleConsent");
        }
        break;
      case 8:
        // Validate step 8 based on path
        if (form.watch("relocationType") === "single") {
          // Step 8 is always success step for single path
          isValid = true;
        }
        break;
      default:
        isValid = true;
    }
    
    console.log("Validation result for step", step, ":", isValid);
    if (isValid) {
      setStep(prevStep => prevStep + 1);
    } else {
      console.log("Validation failed for step", step, ". Form errors:", form.formState.errors);
    }
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const onSubmit = async (data: FormValues) => {
    console.log("onSubmit called with data:", data);
    return data;
  };

  // Determine which step component to render
  const renderStep = () => {
    const relocationType = form.watch("relocationType");
    const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;

    switch (step) {
      case 1:
        return <RelocationTypeSelection form={form} />;
      case 2:
        // Branch based on relocation type
        if (relocationType === "single") {
          return <SingleInsuranceCoverage form={form} userType={userTypeParam} />;
        } else if (relocationType === "multiple") {
          return <MultipleDisasterAddress form={form} />;
        }
        break;
      case 3:
        if (relocationType === "single") {
          return <SingleAddressAndContact form={form} userType={userTypeParam} />;
        } else if (relocationType === "multiple") {
          return <MultipleRelocationRequests form={form} />;
        }
        break;
      case 4:
        if (relocationType === "single") {
          return <SingleRelocationPreferences form={form} />;
        } else if (relocationType === "multiple") {
          return <MultipleReviewConfirm form={form} />;
        }
        break;
      case 5:
        if (relocationType === "single") {
          return <SingleArrivalDetails ref={arrivalDetailsRef} form={form} onValidationChange={setIsArrivalDetailsValid} />;
        } else if (relocationType === "multiple") {
          return <MultipleConsent form={form} onSubmit={handleSubmit} isSubmitting={isSubmitting} onBack={prevStep} />;
        }
        break;
      case 6:
        if (relocationType === "single") {
          return <SingleReviewConfirm form={form} />;
        } else if (relocationType === "multiple") {
          return <SuccessMessage />;
        }
        break;
      case 7:
        if (relocationType === "single") {
          return <SingleConsent form={form} onSubmit={handleSubmit} isSubmitting={isSubmitting} onBack={prevStep} userType={userTypeParam} />;
        }
        break;
      case 8:
        if (relocationType === "single") {
          return <SuccessMessage />;
        }
        break;
      default:
        return null;
    }
  };

  // Handle conditional button logic
  const renderNavigationButtons = () => {
    const relocationType = form.watch("relocationType");
    const hasInsurance = form.watch("singleInsuranceCoverage")?.hasInsurance;
    
    const isFinalStep = 
      (relocationType === "single" && step === 8) ||
      (relocationType === "multiple" && step === 5);
    
    // Don't show navigation buttons on the final step or consent step
    if (isFinalStep || (relocationType === "single" && step === 7)) {
      return null;
    }
      
    return (
      <CardFooter className="flex justify-between pt-4 pb-6">
        <div>
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              className="px-6 py-2 h-auto"
            >
              Retour
            </Button>
          )}
        </div>
        
        <div>
          <Button 
            type="button" 
            onClick={nextStep}
            className="px-8 py-2 h-auto bg-primary hover:bg-primary/90"
          >
            {step === 1 ? "Commencer" : "Suivant"}
          </Button>
        </div>
      </CardFooter>
    );
  };

  // Direct form submission handler
  const handleSubmit = async () => {
    console.log("Submit button clicked");
    setIsSubmitting(true);
    
    try {
      // Get form data
      const formData = form.getValues();
      console.log("Form data:", formData);
      
      // Simulate API call
      console.log("Starting simulated API call");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted successfully");
      setIsSubmitting(false);
      console.log("Setting isSubmitted to true");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  // Use wider container (max-w-7xl) only for the multiple relocation requests table
  // to accommodate the larger table layout, while keeping other steps at max-w-5xl
  // 
  // Conditions for wider container:
  // - step === 3: This is the step where we show the multiple relocation requests table
  // - relocationType === "multiple": Only applies to the multiple relocation flow
  const shouldUseWiderContainer = form.watch("relocationType") === "multiple" && step === 3;

  return (
    <div className={cn(
      "container mx-auto py-8 px-4 md:px-0 bg-sand/50",
      shouldUseWiderContainer ? "max-w-9xl" : "max-w-5xl"
    )}>
      <Card className="border-2 shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl font-bold text-center">Demande de relogement</CardTitle>
          {step > 1 && (
            <div className="mt-80">
              <Progress value={progressPercentage} className="h-2.5" />
              <p className="text-sm text-right mt-2 text-muted-foreground">
                Étape {step} sur {totalSteps}
              </p>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="pb-8">
          <form>
            {renderStep()}
          </form>
        </CardContent>
        
        {renderNavigationButtons()}
      </Card>
    </div>
  );
} 