/**
 * Unified relocation data structure
 * This interface handles both single and multiple relocations from the same form
 */

export interface RelocationData {
  id: string;
  relocationType: "single" | "multiple";
  
  // Common disaster address (same for all cases)
  disasterAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    canton?: string;
  };
  
  // Contact person (broker/coordinator)
  contactPerson: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  
  // For single relocations: the person being relocated
  // For multiple relocations: array of people being relocated
  relocationRequests: RelocationRequest[];
  
  // Insurance information (if applicable)
  insurance?: {
    hasInsurance: boolean;
    company?: string;
    policyNumber?: string;
    claimDocument?: File;
  };
  
  // Selected relocation options (for assurance users to propose)
  selectedRelocationOptions?: string[]; // Array of property IDs
  
  // Selected relocation property (single option)
  relocationOption?: {
    propertyId?: string;
    propertyType: string;
    propertyDetails: {
      title: string;
      bedrooms: number;
      bathrooms: number;
      maxGuests: number;
      description: string;
      size: number;
      floor: number;
      totalFloors: number;
    };
    propertyLocation: {
      street: string;
      city: string;
      postalCode: string;
      canton: string;
      country: string;
      neighborhood: string;
    };
    propertyAmenities: {
      hasWifi: boolean;
      hasParking: boolean;
      hasKitchen: boolean;
      hasWashingMachine: boolean;
      hasTv: boolean;
      hasHeating: boolean;
      hasElevator?: boolean;
      hasSecurity: boolean;
      hasBalcony?: boolean;
      hasGarden?: boolean;
      hasTerrace?: boolean;
      hasStorage?: boolean;
      hasAccessibility?: boolean;
      accessibilityFeatures?: string[];
    };
    propertyPricing: {
      prices: {
        night: number;
        week: number;
        month: number;
      };
      currency: string;
      includesUtilities: boolean;
      securityDeposit: number;
      cleaningFee: number;
      additionalFees?: Array<{
        name: string;
        amount: number;
        frequency: string;
        description: string;
        isOptional: boolean;
      }>;
    };
    selectedAt: string;
    status: string;
  };
  
  // Selected relocation properties (multiple options)
  relocationOptions?: Array<{
    propertyId: string;
    propertyType: string;
    propertyDetails: {
      title: string;
      bedrooms: number;
      bathrooms: number;
      maxGuests: number;
      description: string;
      size: number;
      floor: number;
      totalFloors: number;
    };
    propertyLocation: {
      street: string;
      city: string;
      postalCode: string;
      canton: string;
      country: string;
      neighborhood: string;
    };
    propertyAmenities: {
      hasWifi: boolean;
      hasParking: boolean;
      hasKitchen: boolean;
      hasWashingMachine: boolean;
      hasTv: boolean;
      hasHeating: boolean;
      hasElevator?: boolean;
      hasSecurity: boolean;
      hasBalcony?: boolean;
      hasGarden?: boolean;
      hasTerrace?: boolean;
      hasStorage?: boolean;
      hasAccessibility?: boolean;
      accessibilityFeatures?: string[];
    };
    propertyPricing: {
      prices: {
        night: number;
        week: number;
        month: number;
      };
      currency: string;
      includesUtilities: boolean;
      securityDeposit: number;
      cleaningFee: number;
      additionalFees?: Array<{
        name: string;
        amount: number;
        frequency: string;
        description: string;
        isOptional: boolean;
      }>;
    };
    selectedAt: string;
    status: string;
  }>;
  
  // System fields
  status: "initie" | "pending" | "processing" | "completed" | "cancelled";
  priority: "high" | "normal";
  createdAt: string;
  updatedAt: string;
  
  // Optional performance metrics
  responseTime?: number;
  cost?: {
    insuranceCost: number;
    insuredCost: number;
    totalCost: number;
  };
  satisfaction?: {
    rating: number;
    feedback?: string;
  };
  agent?: {
    id: string;
    name: string;
    canton: string;
  };
}

export interface RelocationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Relocation preferences
  bedrooms: number;
  adults: number;
  children: number;
  hasAnimals: boolean;
  hasAccessibilityNeeds: boolean;
  needsParking: boolean;
  specialNeeds?: string;
  
  // Arrival details
  arrivalDate: string;
  departureDate?: string;
  useExactDates: boolean;
  estimatedDuration?: string;
  
  // Individual insurance (for multiple relocations)
  hasInsurance?: boolean;
  insuranceDetails?: string;
  claimDocument?: File;
}

// Helper types for form compatibility
export interface RelocationFormData {
  relocationType: "single" | "multiple";
  
  // Single relocation path (for form compatibility)
  singleDisasterAddress?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    canton?: string;
  };
  
  singlePersonalData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  
  singleInsuredData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  
  singleRelocationPreferences?: {
    bedrooms: number;
    adults: number;
    children: number;
    hasAnimals?: boolean;
    hasAccessibilityNeeds?: boolean;
    needsParking?: boolean;
  };
  
  singleArrivalDetails?: {
    arrivalDate: string;
    departureDate?: string;
    useExactDates: boolean;
    estimatedDuration?: string;
  };
  
  singleInsuranceCoverage?: {
    hasInsurance: boolean;
    claimDocument?: File;
  };
  
  singleInsuranceDetails?: {
    insuranceCompany: string;
    policyNumber: string;
    customInsuranceCompany?: string;
  };
  
  singleConsent?: {
    agreeToTerms: boolean;
    agreeToDataProcessing: boolean;
  };
  
  singleReviewConfirmation?: {
    confirmDataAccuracy: boolean;
  };
  
  // Multiple relocation path (for form compatibility)
  multipleDisasterAddresses?: Array<{
    street: string;
    city: string;
    postalCode: string;
    canton?: string;
    country: string;
  }>;
  
  multiplePersonalData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  
  multipleRelocationRequests?: Array<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    disasterAddressIndex: number;
    specialNeeds?: string;
    arrivalDate: string;
    departureDate?: string;
    useExactDates: boolean;
    estimatedDuration?: string;
    bedrooms: number;
    adults: number;
    children: number;
    hasAnimals: boolean;
    hasAccessibilityNeeds: boolean;
    needsParking: boolean;
    hasInsurance?: boolean;
    insuranceDetails?: string;
    claimDocument?: File;
    hasUploadedClaim?: boolean;
  }>;
  
  multipleConsent?: {
    agreeToTerms: boolean;
    agreeToDataProcessing: boolean;
  };
  
  multipleReviewConfirmation?: {
    confirmDataAccuracy: boolean;
  };
}
