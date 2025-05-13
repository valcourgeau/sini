/**
 * User roles in the system
 */
export enum UserRole {
  TENANT = "tenant",
  OWNER = "owner",
  INTERMEDIARY = "intermediary",
  ADMIN = "admin",
}

/**
 * Special needs for relocation
 */
export interface SpecialNeeds {
  hasAnimals: boolean;
  hasHandicap: boolean;
  otherNeeds: string;
}

/**
 * Insurance types
 */
export enum InsuranceType {
  RC = "rc", // Responsabilité Civile
  MENAGE = "menage", // Ménage
  COMPLEMENTARY = "complementary", // Complementary insurance
  BUILDING = "building", // Building insurance
  ECA = "eca", // Établissement Cantonal d'Assurance
}

/**
 * Insurance information
 */
export interface InsuranceInfo {
  name: string;
  fileNumber: string;
  contactInfo: string;
  insuranceTypes: InsuranceType[];
  insuranceNumbers: Record<InsuranceType, string>;
}

/**
 * Personal information
 */
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address?: string; // Optional if same as disaster address
}

/**
 * Single relocation request
 */
export interface RelocationRequest {
  id: string;
  disasterAddress: {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    canton: string;
  };
  specialNeeds: SpecialNeeds;
  arrivalDate: Date;
  approximateDuration: string; // e.g., "3 months", "6 months"
  personalInfo: PersonalInfo;
  hasInsuranceCoverage: boolean | null; // null for "I don't know"
  insuranceInfo?: InsuranceInfo;
  isLeaseTerminated: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  status: "pending" | "processing" | "completed" | "cancelled";
}

/**
 * Batch relocation request
 */
export interface BatchRelocationRequest {
  id: string;
  disasterAddress: {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    canton: string;
  };
  requests: RelocationRequest[];
  submittedBy: {
    name: string;
    role: UserRole;
    organization: string;
    contactInfo: string;
  };
  createdAt: Date;
  updatedAt: Date;
  status: "pending" | "processing" | "completed" | "cancelled";
} 