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

import { MultipleRelocationRequests } from "./steps/multiple-relocation-requests";
import { MultipleReviewConfirm } from "./steps/multiple-review-confirm";
import { MultipleConsent } from "./steps/multiple-consent";
import { SuccessMessage } from "./steps/success-message";
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
    return true; // If they select "no", they can proceed (validation will be handled in the component for sinistre users)
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
  multipleDisasterAddresses: z.array(z.object({
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
    canton: z.string().optional(),
    country: z.string()
      .min(1, "Le pays est requis")
      .min(2, "Le pays doit contenir au moins 2 caractères")
      .max(50, "Le pays ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-ZÀ-ÿ\s\-]+$/, "Le pays ne peut contenir que des lettres, espaces et tirets"),
  })).optional(),

  multiplePersonalData: z.object({
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
    disasterAddressIndex: z.number().min(0, "Veuillez sélectionner une adresse de sinistre"),
    specialNeeds: z.string()
      .max(500, "Les besoins spéciaux ne peuvent pas dépasser 500 caractères")
      .optional(),
    arrivalDate: z.string().min(1, "La date d'arrivée est requise"),
    departureDate: z.string().optional(),
    useExactDates: z.boolean().default(false),
    estimatedDuration: z.string().optional(),
    bedrooms: z.number().min(1, "Au moins une chambre est requise"),
    adults: z.number().min(1, "Au moins un adulte est requis"),
    children: z.number().min(0, "Le nombre d'enfants doit être positif"),
    hasAnimals: z.boolean().optional(),
    hasAccessibilityNeeds: z.boolean().optional(),
    needsParking: z.boolean().optional(),
    hasInsurance: z.boolean().optional(),
    insuranceDetails: z.string()
      .max(500, "Les détails d'assurance ne peuvent pas dépasser 500 caractères")
      .optional(),
    claimDocument: z.instanceof(File).optional(),
    hasUploadedClaim: z.boolean().optional(),
  }).refine((data) => {
    // If using exact dates, departure date is required
    if (data.useExactDates) {
      return data.departureDate && data.departureDate.length > 0;
    }
    // If not using exact dates, estimated duration is required
    return data.estimatedDuration && data.estimatedDuration.length > 0;
  }, {
    message: "Veuillez remplir tous les champs requis",
    path: ["departureDate", "estimatedDuration"]
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
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
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
      multipleDisasterAddresses: [
        {
          street: "",
          city: "",
          postalCode: "",
          canton: "Genève",
          country: "Suisse"
        }
      ],
      multiplePersonalData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
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
    
    return relocationType === "single" ? 8 : 4; // Single: 8 steps, Multiple: 4 steps
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
          } else if (insuranceData.hasInsurance === false && userTypeParam === "sinistre") {
            // For sinistre users, prevent proceeding when "no" is selected
            form.setError("singleInsuranceCoverage", {
              type: "manual",
              message: "Une déclaration de sinistre doit être téléchargée pour continuer."
            });
            isValid = false;
          } else {
            isValid = await form.trigger("singleInsuranceCoverage");
          }
        } else {
          // For multiple path, validate multiple relocation requests with custom validation
          const requests = form.getValues("multipleRelocationRequests");
          let requestsValid = true;
          
          if (!requests || requests.length === 0) {
            form.setError("multipleRelocationRequests", {
              type: "manual",
              message: "Au moins une demande de relogement est requise"
            });
            requestsValid = false;
          } else {
            // Clear any existing errors first
            form.clearErrors("multipleRelocationRequests");
            
            // Validate each request
            for (let i = 0; i < requests.length; i++) {
              const request = requests[i];
              
              // Validate firstName
              if (!request.firstName || request.firstName.length < 2) {
                form.setError(`multipleRelocationRequests.${i}.firstName`, {
                  type: "manual",
                  message: "Le prénom est requis (minimum 2 caractères)"
                });
                requestsValid = false;
              }
              
              // Validate lastName
              if (!request.lastName || request.lastName.length < 2) {
                form.setError(`multipleRelocationRequests.${i}.lastName`, {
                  type: "manual",
                  message: "Le nom est requis (minimum 2 caractères)"
                });
                requestsValid = false;
              }
              
              // Validate email
              if (!request.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(request.email)) {
                form.setError(`multipleRelocationRequests.${i}.email`, {
                  type: "manual",
                  message: "Veuillez entrer une adresse email valide"
                });
                requestsValid = false;
              }
              
              // Validate phone
              if (!request.phone || request.phone.length < 10) {
                form.setError(`multipleRelocationRequests.${i}.phone`, {
                  type: "manual",
                  message: "Le numéro de téléphone est requis (minimum 10 caractères)"
                });
                requestsValid = false;
              }
              
              // Validate arrival date
              if (!request.arrivalDate || request.arrivalDate.length === 0) {
                form.setError(`multipleRelocationRequests.${i}.arrivalDate`, {
                  type: "manual",
                  message: "La date d'arrivée est requise"
                });
                requestsValid = false;
              }
              
              // Validate departure date or duration based on useExactDates
              if (request.useExactDates) {
                if (!request.departureDate || request.departureDate.length === 0) {
                  form.setError(`multipleRelocationRequests.${i}.departureDate`, {
                    type: "manual",
                    message: "La date de départ est requise"
                  });
                  requestsValid = false;
                }
              } else {
                if (!request.estimatedDuration || request.estimatedDuration.length === 0) {
                  form.setError(`multipleRelocationRequests.${i}.estimatedDuration`, {
                    type: "manual",
                    message: "La durée est requise"
                  });
                  requestsValid = false;
                }
              }
              
              // Validate bedrooms (should be at least 1)
              if (!request.bedrooms || request.bedrooms < 1) {
                form.setError(`multipleRelocationRequests.${i}.bedrooms`, {
                  type: "manual",
                  message: "Au moins une chambre est requise"
                });
                requestsValid = false;
              }
              
              // Validate adults (should be at least 1)
              if (!request.adults || request.adults < 1) {
                form.setError(`multipleRelocationRequests.${i}.adults`, {
                  type: "manual",
                  message: "Au moins un adulte est requis"
                });
                requestsValid = false;
              }
              
              // Validate children (should be 0 or more)
              if (request.children === undefined || request.children < 0) {
                form.setError(`multipleRelocationRequests.${i}.children`, {
                  type: "manual",
                  message: "Le nombre d'enfants doit être positif"
                });
                requestsValid = false;
              }
              
              // Validate disaster address index
              if (request.disasterAddressIndex === undefined || request.disasterAddressIndex < 0) {
                form.setError(`multipleRelocationRequests.${i}.disasterAddressIndex`, {
                  type: "manual",
                  message: "Veuillez sélectionner une adresse de sinistre"
                });
                requestsValid = false;
              }
            }
          }
          
          // Validate broker information (multiplePersonalData)
          const brokerData = form.getValues("multiplePersonalData");
          if (!brokerData) {
            form.setError("multiplePersonalData", {
              type: "manual",
              message: "Les informations du courtier sont requises"
            });
            isValid = false;
          } else {
            // Validate broker firstName
            if (!brokerData.firstName || brokerData.firstName.length < 2) {
              form.setError("multiplePersonalData.firstName", {
                type: "manual",
                message: "Le prénom du courtier est requis (minimum 2 caractères)"
              });
              requestsValid = false;
            }
            
            // Validate broker lastName
            if (!brokerData.lastName || brokerData.lastName.length < 2) {
              form.setError("multiplePersonalData.lastName", {
                type: "manual",
                message: "Le nom du courtier est requis (minimum 2 caractères)"
              });
              requestsValid = false;
            }
            
            // Validate broker email
            if (!brokerData.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(brokerData.email)) {
              form.setError("multiplePersonalData.email", {
                type: "manual",
                message: "Veuillez entrer une adresse email valide pour le courtier"
              });
              requestsValid = false;
            }
            
            // Validate broker phone
            if (!brokerData.phone || brokerData.phone.length < 10) {
              form.setError("multiplePersonalData.phone", {
                type: "manual",
                message: "Le numéro de téléphone du courtier est requis (minimum 10 caractères)"
              });
              requestsValid = false;
            }
          }
          
          // Also validate that at least one disaster address exists
          const addresses = form.getValues("multipleDisasterAddresses");
          if (!addresses || addresses.length === 0) {
            form.setError("multipleDisasterAddresses", {
              type: "manual",
              message: "Au moins une adresse de sinistre est requise"
            });
            isValid = false;
          } else {
            // Validate each address
            for (let i = 0; i < addresses.length; i++) {
              const address = addresses[i];
              
              if (!address.street || address.street.length < 5) {
                form.setError(`multipleDisasterAddresses.${i}.street`, {
                  type: "manual",
                  message: "L'adresse est requise (minimum 5 caractères)"
                });
                requestsValid = false;
              }
              
              if (!address.city || address.city.length < 2) {
                form.setError(`multipleDisasterAddresses.${i}.city`, {
                  type: "manual",
                  message: "La ville est requise (minimum 2 caractères)"
                });
                requestsValid = false;
              }
              
              if (!address.postalCode || address.postalCode.length < 4) {
                form.setError(`multipleDisasterAddresses.${i}.postalCode`, {
                  type: "manual",
                  message: "Le code postal est requis (minimum 4 caractères)"
                });
                requestsValid = false;
              }
              
              if (!address.country || address.country.length < 2) {
                form.setError(`multipleDisasterAddresses.${i}.country`, {
                  type: "manual",
                  message: "Le pays est requis (minimum 2 caractères)"
                });
                requestsValid = false;
              }
            }
          }
          
          isValid = requestsValid;
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
          // Multiple path - validate review confirmation checkbox
          isValid = await form.trigger("multipleReviewConfirmation");
        }
        break;
      case 4:
        // Validate step 4 based on path
        if (form.watch("relocationType") === "single") {
          // Step 4 is always relocation preferences for single path
          isValid = await form.trigger("singleRelocationPreferences");
        } else {
          // Multiple path - consent step, validate consent
          isValid = await form.trigger("multipleConsent");
        }
        break;
      case 5:
        // Validate step 5 based on path
        if (form.watch("relocationType") === "single") {
          // Step 5 is always arrival details for single path
          isValid = arrivalDetailsRef.current?.validate() ?? false;
        }
        break;
      case 6:
        // Validate step 6 based on path
        if (form.watch("relocationType") === "single") {
          // Step 6 is always review confirmation for single path
          isValid = await form.trigger("singleReviewConfirmation");
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
        return <RelocationTypeSelection form={form} userType={userTypeParam} />;
      case 2:
        // Branch based on relocation type
        if (relocationType === "single") {
          return <SingleInsuranceCoverage form={form} userType={userTypeParam} />;
        } else if (relocationType === "multiple") {
          return <MultipleRelocationRequests form={form} userType={userTypeParam} />;
        }
        break;
      case 3:
        if (relocationType === "single") {
          return <SingleAddressAndContact form={form} userType={userTypeParam} />;
        } else if (relocationType === "multiple") {
          return <MultipleReviewConfirm form={form} userType={userTypeParam} />;
        }
        break;
      case 4:
        if (relocationType === "single") {
          return <SingleRelocationPreferences form={form} userType={userTypeParam} />;
        } else if (relocationType === "multiple") {
          return <MultipleConsent form={form} onSubmit={handleSubmit} isSubmitting={isSubmitting} onBack={prevStep} userType={userTypeParam} />;
        }
        break;
      case 5:
        if (relocationType === "single") {
          return <SingleArrivalDetails ref={arrivalDetailsRef} form={form} onValidationChange={setIsArrivalDetailsValid} userType={userTypeParam} />;
        }
        break;
      case 6:
        if (relocationType === "single") {
          return <SingleReviewConfirm form={form} userType={userTypeParam} />;
        }
        break;
      case 7:
        if (relocationType === "single") {
          return <SingleConsent form={form} onSubmit={handleSubmit} isSubmitting={isSubmitting} onBack={prevStep} userType={userTypeParam} />;
        }
        break;
      case 8:
        if (relocationType === "single") {
          return <SuccessMessage userType={userTypeParam} />;
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
      (relocationType === "multiple" && step === 4);
    
    // Don't show navigation buttons on the final step or consent step
    if (isFinalStep || (relocationType === "single" && step === 7) || (relocationType === "multiple" && step === 4)) {
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
    return <SuccessMessage userType={userTypeParam} />;
  }

  // Use wider container (max-w-11xl) only for the multiple relocation requests table
  // to accommodate the larger table layout, while keeping other steps at max-w-5xl
  // 
  // Conditions for wider container:
  // - step === 2: This is the step where we show the multiple relocation requests table
  // - relocationType === "multiple": Only applies to the multiple relocation flow
  const shouldUseWiderContainer = form.watch("relocationType") === "multiple" && step === 2;

  return (
    <div className={cn(
      "container mx-auto py-4 px-4 md:px-0",
      shouldUseWiderContainer ? "max-w-12xl" : "max-w-5xl"
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