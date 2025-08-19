/**
 * Unified property data structure
 * This interface handles property listings for disaster relief housing
 */

export interface PropertyData {
  id: string;
  
  // Basic property information
  propertyType: PropertyType;
  propertyDetails: PropertyDetails;
  propertyLocation: PropertyLocation;
  
  // Amenities and features
  propertyAmenities: PropertyAmenities;
  
  // Availability and booking
  propertyAvailability: PropertyAvailability;
  
  // Media
  propertyPhotos: PropertyPhotos;
  
  // Pricing and financial
  propertyPricing: PropertyPricing;
  
  // Rules and policies
  propertyRules: PropertyRules;
  
  // Owner information
  ownerDetails: OwnerDetails;
  
  // System fields
  status: PropertyStatus;
  priority: "high" | "normal";
  createdAt: string;
  updatedAt: string;
  
  // Optional performance metrics
  views?: number;
  inquiries?: number;
  bookings?: number;
  rating?: {
    average: number;
    count: number;
  };
  agent?: {
    id: string;
    name: string;
    canton: string;
  };
}

// Property type enumeration
export type PropertyType = "apartment" | "house" | "room" | "studio" | "other";

// Property status enumeration
export type PropertyStatus = "draft" | "pending" | "active" | "inactive" | "booked" | "archived";

// Property details interface
export interface PropertyDetails {
  title: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  description?: string;
  size?: number; // in square meters
  floor?: number;
  totalFloors?: number;
}

// Property location interface
export interface PropertyLocation {
  street: string;
  city: string;
  postalCode: string;
  canton: string;
  country: string;
  latitude?: number;
  longitude?: number;
  neighborhood?: string;
}

// Property amenities interface
export interface PropertyAmenities {
  features: string[];
  hasWifi?: boolean;
  hasParking?: boolean;
  hasKitchen?: boolean;
  hasWashingMachine?: boolean;
  hasTv?: boolean;
  hasAirConditioning?: boolean;
  hasHeating?: boolean;
  hasAccessibility?: boolean;
  accessibilityFeatures?: string[];
  hasBalcony?: boolean;
  hasGarden?: boolean;
  hasTerrace?: boolean;
  hasElevator?: boolean;
  hasSecurity?: boolean;
  hasStorage?: boolean;
}

// Property availability interface
export interface PropertyAvailability {
  availableFrom: string;
  availableTo?: string;
  minStay: number;
  maxStay?: number;
  isFlexible?: boolean;
  instantBooking?: boolean;
  advanceBookingDays?: number;
  blackoutDates?: string[];
}

// Property photos interface
export interface PropertyPhotos {
  photos: string[];
  coverPhoto?: string;
  virtualTour?: string;
  floorPlan?: string;
}

// Property pricing interface
export interface PropertyPricing {
  prices: {
    night: number;
    week: number;
    month: number;
  };
  currency: string;
  includesUtilities?: boolean;
  utilitiesIncluded?: string[];
  additionalFees?: AdditionalFee[];
  discounts?: {
    hasLongTermDiscount?: boolean;
    longTermDiscountPercent?: number;
    weeklyDiscount?: number;
    monthlyDiscount?: number;
  };
  securityDeposit?: number;
  cleaningFee?: number;
}

// Additional fee interface
export interface AdditionalFee {
  name: string;
  amount: number;
  frequency: "one-time" | "per-night" | "per-week" | "per-month";
  description?: string;
  isOptional?: boolean;
}

// Property rules interface
export interface PropertyRules {
  houseRules: string[];
  checkInTime: string;
  checkOutTime: string;
  smokingAllowed?: boolean;
  petsAllowed?: boolean;
  partiesAllowed?: boolean;
  additionalRules?: string;
  maxGuests?: number;
  quietHours?: {
    start: string;
    end: string;
  };
  cancellationPolicy?: "flexible" | "moderate" | "strict";
}

// Owner details interface
export interface OwnerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContactMethod: "email" | "phone" | "both";
  company?: string;
  website?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

// Helper types for form compatibility
export interface PropertyFormData {
  // Step 1: Property Type
  propertyType: PropertyType;
  
  // Step 2: Property Details and Location
  propertyDetails: PropertyDetails;
  propertyLocation: PropertyLocation;
  
  // Step 3: Property Amenities
  propertyAmenities: PropertyAmenities;
  
  // Step 4: Property Availability
  propertyAvailability: PropertyAvailability;
  
  // Step 5: Property Photos
  propertyPhotos: PropertyPhotos;
  
  // Step 6: Property Pricing
  propertyPricing: PropertyPricing;
  
  // Step 7: Property Rules
  propertyRules: PropertyRules;
  
  // Step 8: Owner Details
  ownerDetails: OwnerDetails;
  
  // Step 9: Confirmation
  confirmDetails: {
    agreeToTerms: boolean;
    agreeToDataPolicy: boolean;
  };
}

// Swiss cantons for validation
export const SWISS_CANTONS = [
  { value: "geneve", label: "Genève" },
  { value: "vaud", label: "Vaud" },
  { value: "neuchatel", label: "Neuchâtel" },
  { value: "fribourg", label: "Fribourg" },
  { value: "valais", label: "Valais" },
  { value: "berne", label: "Berne" },
  { value: "jura", label: "Jura" },
  { value: "zurich", label: "Zurich" },
  { value: "bale", label: "Bâle" },
  { value: "tessin", label: "Tessin" }
] as const;

export type SwissCanton = typeof SWISS_CANTONS[number]["value"];

// Property features for amenities
export const PROPERTY_FEATURES = [
  "wifi",
  "parking",
  "kitchen",
  "washing_machine",
  "tv",
  "air_conditioning",
  "heating",
  "accessibility",
  "balcony",
  "garden",
  "terrace",
  "elevator",
  "security",
  "storage"
] as const;

export type PropertyFeature = typeof PROPERTY_FEATURES[number];

// Accessibility features
export const ACCESSIBILITY_FEATURES = [
  "wheelchair_accessible",
  "ground_floor",
  "elevator_access",
  "accessible_bathroom",
  "accessible_kitchen",
  "wide_doorways",
  "ramp_access",
  "grab_bars"
] as const;

export type AccessibilityFeature = typeof ACCESSIBILITY_FEATURES[number];

// House rules options
export const HOUSE_RULES_OPTIONS = [
  "no_smoking",
  "no_pets",
  "no_parties",
  "quiet_hours",
  "no_shoes",
  "no_food_in_bedrooms",
  "check_in_time",
  "check_out_time",
  "max_guests",
  "no_visitors"
] as const;

export type HouseRule = typeof HOUSE_RULES_OPTIONS[number];

// Utility types
export const UTILITY_TYPES = [
  "electricity",
  "water",
  "gas",
  "internet",
  "heating",
  "cleaning",
  "laundry",
  "parking"
] as const;

export type UtilityType = typeof UTILITY_TYPES[number];

// Contact method types
export type ContactMethod = "email" | "phone" | "both";

// Cancellation policy types
export type CancellationPolicy = "flexible" | "moderate" | "strict";

// Fee frequency types
export type FeeFrequency = "one-time" | "per-night" | "per-week" | "per-month";
