"use client";

import { useState } from "react";
import { 
  Users, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  FileText,
  Calendar,
  Wallet,
  BarChart3,
  Star,
  Filter,
  ChevronDown,
  Eye,
  Edit,
  Download,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  Car,
  Baby,
  Accessibility,
  CheckCircle,
  File,
  Shield,
  MessageSquare,
  X,
  RotateCcw
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AssuranceStatistics from "./statistiques/assurance-statistics";

// Types based on relocation wizard data structure
interface RelocationData {
  id: string;
  relocationType: "single" | "multiple";
  disasterAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    canton?: string;
  };
  personalData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  relocationPreferences?: {
    bedrooms: number;
    adults: number;
    children: number;
    hasAnimals?: boolean;
    hasAccessibilityNeeds?: boolean;
    needsParking?: boolean;
  };
  arrivalDetails?: {
    arrivalDate: string;
    departureDate?: string;
    useExactDates: boolean;
    estimatedDuration?: string;
  };
  insuranceCoverage?: {
    hasInsurance: boolean;
    claimDocument?: File;
  };
  insuranceDetails?: {
    insuranceCompany: string;
    policyNumber: string;
    customInsuranceCompany?: string;
  };
  swissInsuranceDetails?: {
    hasRCInsurance?: boolean;
    rcInsuranceCompany?: string;
    rcPolicyNumber?: string;
    hasMenageInsurance?: boolean;
    menageInsuranceCompany?: string;
    menagePolicyNumber?: string;
    hasNaturalDisasterInsurance?: boolean;
    naturalDisasterInsuranceCompany?: string;
    naturalDisasterPolicyNumber?: string;
    hasBuildingInsurance?: boolean;
    buildingInsuranceCompany?: string;
    buildingPolicyNumber?: string;
    ecaPolicyNumber?: string;
    agentContact?: string;
    additionalNotes?: string;
  };
  status: "pending" | "processing" | "completed" | "cancelled";
  priority: "high" | "normal" | "low";
  createdAt: string;
  updatedAt: string;
  responseTime?: number | null; // in days
  cost?: {
    insuranceCost: number;
    insuredCost: number;
    totalCost: number;
  } | null;
  satisfaction?: {
    rating: number; // 1-5 stars
    feedback?: string;
  } | null;
  agent: {
    id: string;
    name: string;
    canton: string;
  };
}

// Helper function to format dates to dd/mm/yyyy
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Helper function to get date range display
const getDateRangeDisplay = (arrivalDetails: any): string => {
  if (!arrivalDetails) return "Dates non définies";
  
  const startDate = formatDate(arrivalDetails.arrivalDate);
  
  if (arrivalDetails.useExactDates && arrivalDetails.departureDate) {
    const endDate = formatDate(arrivalDetails.departureDate);
    return `${startDate} - ${endDate}`;
  } else if (arrivalDetails.estimatedDuration) {
    return `${startDate} (${arrivalDetails.estimatedDuration})`;
  } else {
    return startDate;
  }
};

export default function AssuranceDashboard() {
  const [selectedFilter, setSelectedFilter] = useState<"agent" | "canton" | "group">("agent");
  const [selectedAgent, setSelectedAgent] = useState<string>("all");
  const [selectedCanton, setSelectedCanton] = useState<string>("all");
  const [selectedDateFilter, setSelectedDateFilter] = useState<"month" | "year" | "all">("all");

  // Helper function to check if a date is within the selected filter range
  const isDateInRange = (dateString: string, filter: "month" | "year" | "all"): boolean => {
    const date = new Date(dateString);
    const now = new Date();
    
    switch (filter) {
      case "month":
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      case "year":
        return date.getFullYear() === now.getFullYear();
      case "all":
        return true;
      default:
        return true;
    }
  };

  // Mock data based on relocation wizard structure with 2025 dates
  const mockRelocations: RelocationData[] = [
    // January 2025 data
    {
      id: "REL-001",
      relocationType: "single",
      disasterAddress: {
        street: "Rue de la Paix 10",
        city: "Genève",
        postalCode: "1201",
        country: "Suisse",
        canton: "Genève"
      },
      personalData: {
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean.dupont@email.com",
        phone: "+41 22 123 45 67"
      },
      relocationPreferences: {
        bedrooms: 2,
        adults: 2,
        children: 1,
        hasAnimals: false,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-01-15",
        departureDate: "2025-02-15",
        useExactDates: true
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-123456",
        customInsuranceCompany: "Assurance Genève"
      },
      status: "processing",
      priority: "high",
      createdAt: "2025-01-15T10:30:00Z",
      updatedAt: "2025-01-15T14:45:00Z",
      responseTime: 2.1,
      cost: {
        insuranceCost: 2800,
        insuredCost: 400,
        totalCost: 3200
      },
      satisfaction: {
        rating: 5,
        feedback: "Excellent service, très réactif"
      },
      agent: {
        id: "AG-001",
        name: "Marie Dubois",
        canton: "Genève"
      }
    },
    {
      id: "REL-002",
      relocationType: "multiple",
      disasterAddress: {
        street: "Avenue des Alpes 25",
        city: "Genève",
        postalCode: "1201",
        country: "Suisse",
        canton: "Genève"
      },
      personalData: {
        firstName: "Sophie",
        lastName: "Bernard",
        email: "sophie.bernard@email.com",
        phone: "+41 22 234 56 78"
      },
      relocationPreferences: {
        bedrooms: 3,
        adults: 2,
        children: 1,
        hasAnimals: false,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-01-10",
        departureDate: "2025-02-10",
        useExactDates: true
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-234567",
        customInsuranceCompany: "Assurance Genève"
      },
      status: "completed",
      priority: "normal",
      createdAt: "2025-01-10T09:15:00Z",
      updatedAt: "2025-01-12T16:30:00Z",
      responseTime: 1.8,
      cost: {
        insuranceCost: 3200,
        insuredCost: 600,
        totalCost: 3800
      },
      satisfaction: {
        rating: 5,
        feedback: "Service impeccable, relogement rapide"
      },
      agent: {
        id: "AG-001",
        name: "Marie Dubois",
        canton: "Genève"
      }
    },
    {
      id: "REL-003",
      relocationType: "single",
      disasterAddress: {
        street: "Rue du Rhône 45",
        city: "Genève",
        postalCode: "1204",
        country: "Suisse",
        canton: "Genève"
      },
      personalData: {
        firstName: "Pierre",
        lastName: "Durand",
        email: "pierre.durand@email.com",
        phone: "+41 22 345 67 89"
      },
      relocationPreferences: {
        bedrooms: 1,
        adults: 1,
        children: 0,
        hasAnimals: true,
        hasAccessibilityNeeds: false,
        needsParking: false
      },
      arrivalDetails: {
        arrivalDate: "2025-01-08",
        estimatedDuration: "3 mois",
        useExactDates: false
      },
      insuranceCoverage: {
        hasInsurance: false
      },
      status: "completed",
      priority: "low",
      createdAt: "2025-01-08T11:20:00Z",
      updatedAt: "2025-01-10T13:45:00Z",
      responseTime: 3.2,
      cost: {
        insuranceCost: 0,
        insuredCost: 2500,
        totalCost: 2500
      },
      satisfaction: {
        rating: 4,
        feedback: "Service correct mais délais un peu longs"
      },
      agent: {
        id: "AG-002",
        name: "Thomas Moreau",
        canton: "Vaud"
      }
    },
    {
      id: "REL-004",
      relocationType: "single",
      disasterAddress: {
        street: "Rue de Lausanne 90",
        city: "Lausanne",
        postalCode: "1003",
        country: "Suisse",
        canton: "Vaud"
      },
      personalData: {
        firstName: "Marie",
        lastName: "Martin",
        email: "marie.martin@email.com",
        phone: "+41 21 456 78 90"
      },
      relocationPreferences: {
        bedrooms: 3,
        adults: 2,
        children: 2,
        hasAnimals: false,
        hasAccessibilityNeeds: true,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-01-16",
        departureDate: "2025-03-16",
        useExactDates: true
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-789012",
        customInsuranceCompany: "Assurance Vaudoise"
      },
      status: "processing",
      priority: "high",
      createdAt: "2025-01-16T08:45:00Z",
      updatedAt: "2025-01-16T12:30:00Z",
      responseTime: 2.5,
      cost: {
        insuranceCost: 4500,
        insuredCost: 800,
        totalCost: 5300
      },
      satisfaction: {
        rating: 5,
        feedback: "Très satisfaite du service"
      },
      agent: {
        id: "AG-002",
        name: "Thomas Moreau",
        canton: "Vaud"
      }
    },
    {
      id: "REL-005",
      relocationType: "single",
      disasterAddress: {
        street: "Rue de Carouge 15",
        city: "Genève",
        postalCode: "1227",
        country: "Suisse",
        canton: "Genève"
      },
      personalData: {
        firstName: "Antoine",
        lastName: "Moreau",
        email: "antoine.moreau@email.com",
        phone: "+41 22 567 89 01"
      },
      relocationPreferences: {
        bedrooms: 2,
        adults: 1,
        children: 0,
        hasAnimals: false,
        hasAccessibilityNeeds: false,
        needsParking: false
      },
      arrivalDetails: {
        arrivalDate: "2025-01-18",
        estimatedDuration: "2 mois",
        useExactDates: false
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-345678",
        customInsuranceCompany: "Assurance Genève"
      },
      status: "pending",
      priority: "normal",
      createdAt: "2025-01-18T14:20:00Z",
      updatedAt: "2025-01-18T14:20:00Z",
      responseTime: null,
      cost: null,
      satisfaction: null,
      agent: {
        id: "AG-001",
        name: "Marie Dubois",
        canton: "Genève"
      }
    },
    {
      id: "REL-006",
      relocationType: "multiple",
      disasterAddress: {
        street: "Avenue de Champel 78",
        city: "Genève",
        postalCode: "1206",
        country: "Suisse",
        canton: "Genève"
      },
      personalData: {
        firstName: "Isabelle",
        lastName: "Leroy",
        email: "isabelle.leroy@email.com",
        phone: "+41 22 678 90 12"
      },
      relocationPreferences: {
        bedrooms: 4,
        adults: 3,
        children: 2,
        hasAnimals: true,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-01-17",
        estimatedDuration: "4 mois",
        useExactDates: false
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-678901",
        customInsuranceCompany: "Assurance Genève"
      },
      status: "pending",
      priority: "high",
      createdAt: "2025-01-17T16:45:00Z",
      updatedAt: "2025-01-17T16:45:00Z",
      responseTime: null,
      cost: null,
      satisfaction: null,
      agent: {
        id: "AG-001",
        name: "Marie Dubois",
        canton: "Genève"
      }
    },
    {
      id: "REL-007",
      relocationType: "single",
      disasterAddress: {
        street: "Rue de la Corraterie 12",
        city: "Genève",
        postalCode: "1204",
        country: "Suisse",
        canton: "Genève"
      },
      personalData: {
        firstName: "François",
        lastName: "Petit",
        email: "francois.petit@email.com",
        phone: "+41 22 789 01 23"
      },
      relocationPreferences: {
        bedrooms: 1,
        adults: 1,
        children: 0,
        hasAnimals: false,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-01-19",
        departureDate: "2025-02-19",
        useExactDates: true
      },
      insuranceCoverage: {
        hasInsurance: false
      },
      status: "pending",
      priority: "low",
      createdAt: "2025-01-19T09:30:00Z",
      updatedAt: "2025-01-19T09:30:00Z",
      responseTime: null,
      cost: null,
      satisfaction: null,
      agent: {
        id: "AG-002",
        name: "Thomas Moreau",
        canton: "Vaud"
      }
    },
    {
      id: "REL-008",
      relocationType: "single",
      disasterAddress: {
        street: "Rue du Stand 60",
        city: "Lausanne",
        postalCode: "1006",
        country: "Suisse",
        canton: "Vaud"
      },
      personalData: {
        firstName: "Catherine",
        lastName: "Rousseau",
        email: "catherine.rousseau@email.com",
        phone: "+41 21 890 12 34"
      },
      relocationPreferences: {
        bedrooms: 4,
        adults: 2,
        children: 3,
        hasAnimals: true,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-01-20",
        estimatedDuration: "6 mois",
        useExactDates: false
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-901234",
        customInsuranceCompany: "Assurance Vaudoise"
      },
      status: "pending",
      priority: "high",
      createdAt: "2025-01-20T11:15:00Z",
      updatedAt: "2025-01-20T11:15:00Z",
      responseTime: null,
      cost: null,
      satisfaction: null,
      agent: {
        id: "AG-002",
        name: "Thomas Moreau",
        canton: "Vaud"
      }
    },
    {
      id: "REL-009",
      relocationType: "multiple",
      disasterAddress: {
        street: "Avenue de la Gare 15",
        city: "Lausanne",
        postalCode: "1003",
        country: "Suisse",
        canton: "Vaud"
      },
      personalData: {
        firstName: "Marc",
        lastName: "Lefebvre",
        email: "marc.lefebvre@email.com",
        phone: "+41 21 123 45 67"
      },
      relocationPreferences: {
        bedrooms: 2,
        adults: 1,
        children: 0,
        hasAnimals: false,
        hasAccessibilityNeeds: false,
        needsParking: false
      },
      arrivalDetails: {
        arrivalDate: "2025-01-22",
        departureDate: "2025-03-22",
        useExactDates: true
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-567890",
        customInsuranceCompany: "Assurance Vaudoise"
      },
      status: "completed",
      priority: "normal",
      createdAt: "2025-01-22T09:30:00Z",
      updatedAt: "2025-01-25T16:45:00Z",
      responseTime: 2.8,
      cost: {
        insuranceCost: 1800,
        insuredCost: 300,
        totalCost: 2100
      },
      satisfaction: {
        rating: 4,
        feedback: "Service rapide et efficace"
      },
      agent: {
        id: "AG-003",
        name: "Claire Martin",
        canton: "Vaud"
      }
    },
    {
      id: "REL-010",
      relocationType: "single",
      disasterAddress: {
        street: "Rue de la Tour 45",
        city: "Montreux",
        postalCode: "1820",
        country: "Suisse",
        canton: "Vaud"
      },
      personalData: {
        firstName: "Anne",
        lastName: "Dubois",
        email: "anne.dubois@email.com",
        phone: "+41 21 234 56 78"
      },
      relocationPreferences: {
        bedrooms: 3,
        adults: 2,
        children: 1,
        hasAnimals: true,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-01-25",
        estimatedDuration: "4 mois",
        useExactDates: false
      },
      insuranceCoverage: {
        hasInsurance: false
      },
      status: "processing",
      priority: "high",
      createdAt: "2025-01-25T14:20:00Z",
      updatedAt: "2025-01-25T17:30:00Z",
      responseTime: 1.5,
      cost: {
        insuranceCost: 0,
        insuredCost: 3500,
        totalCost: 3500
      },
      satisfaction: null,
      agent: {
        id: "AG-003",
        name: "Claire Martin",
        canton: "Vaud"
      }
    },
    {
      id: "REL-011",
      relocationType: "single",
      disasterAddress: {
        street: "Rue du Lac 78",
        city: "Vevey",
        postalCode: "1800",
        country: "Suisse",
        canton: "Vaud"
      },
      personalData: {
        firstName: "Pierre",
        lastName: "Moreau",
        email: "pierre.moreau@email.com",
        phone: "+41 21 345 67 89"
      },
      relocationPreferences: {
        bedrooms: 1,
        adults: 1,
        children: 0,
        hasAnimals: false,
        hasAccessibilityNeeds: true,
        needsParking: false
      },
      arrivalDetails: {
        arrivalDate: "2025-01-28",
        departureDate: "2025-02-28",
        useExactDates: true
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-678901",
        customInsuranceCompany: "Assurance Vaudoise"
      },
      status: "completed",
      priority: "normal",
      createdAt: "2025-01-28T11:45:00Z",
      updatedAt: "2025-01-30T13:20:00Z",
      responseTime: 2.1,
      cost: {
        insuranceCost: 2200,
        insuredCost: 500,
        totalCost: 2700
      },
      satisfaction: {
        rating: 5,
        feedback: "Excellent service, très professionnel"
      },
      agent: {
        id: "AG-003",
        name: "Claire Martin",
        canton: "Vaud"
      }
    },
    {
      id: "REL-012",
      relocationType: "multiple",
      disasterAddress: {
        street: "Avenue des Alpes 12",
        city: "Genève",
        postalCode: "1201",
        country: "Suisse",
        canton: "Genève"
      },
      personalData: {
        firstName: "Luc",
        lastName: "Bernard",
        email: "luc.bernard@email.com",
        phone: "+41 22 456 78 90"
      },
      relocationPreferences: {
        bedrooms: 5,
        adults: 3,
        children: 2,
        hasAnimals: true,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-01-30",
        estimatedDuration: "8 mois",
        useExactDates: false
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-789012",
        customInsuranceCompany: "Assurance Genève"
      },
      status: "pending",
      priority: "high",
      createdAt: "2025-01-30T16:30:00Z",
      updatedAt: "2025-01-30T16:30:00Z",
      responseTime: null,
      cost: null,
      satisfaction: null,
      agent: {
        id: "AG-001",
        name: "Marie Dubois",
        canton: "Genève"
      }
    },
    {
      id: "REL-013",
      relocationType: "single",
      disasterAddress: {
        street: "Rue de la Corraterie 8",
        city: "Genève",
        postalCode: "1204",
        country: "Suisse",
        canton: "Genève"
      },
      personalData: {
        firstName: "Sophie",
        lastName: "Petit",
        email: "sophie.petit@email.com",
        phone: "+41 22 567 89 01"
      },
      relocationPreferences: {
        bedrooms: 2,
        adults: 2,
        children: 0,
        hasAnimals: false,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-02-01",
        departureDate: "2025-03-01",
        useExactDates: true
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-890123",
        customInsuranceCompany: "Assurance Genève"
      },
      status: "processing",
      priority: "normal",
      createdAt: "2025-02-01T10:15:00Z",
      updatedAt: "2025-02-01T14:30:00Z",
      responseTime: 1.8,
      cost: {
        insuranceCost: 2400,
        insuredCost: 400,
        totalCost: 2800
      },
      satisfaction: null,
      agent: {
        id: "AG-001",
        name: "Marie Dubois",
        canton: "Genève"
      }
    },
    {
      id: "REL-014",
      relocationType: "single",
      disasterAddress: {
        street: "Rue du Rhône 90",
        city: "Genève",
        postalCode: "1204",
        country: "Suisse",
        canton: "Genève"
      },
      personalData: {
        firstName: "Jean",
        lastName: "Martin",
        email: "jean.martin@email.com",
        phone: "+41 22 678 90 12"
      },
      relocationPreferences: {
        bedrooms: 3,
        adults: 2,
        children: 1,
        hasAnimals: false,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-02-03",
        estimatedDuration: "3 mois",
        useExactDates: false
      },
      insuranceCoverage: {
        hasInsurance: false
      },
      status: "completed",
      priority: "low",
      createdAt: "2025-02-03T13:45:00Z",
      updatedAt: "2025-02-05T11:20:00Z",
      responseTime: 3.5,
      cost: {
        insuranceCost: 0,
        insuredCost: 2800,
        totalCost: 2800
      },
      satisfaction: {
        rating: 4,
        feedback: "Service correct, délais un peu longs"
      },
      agent: {
        id: "AG-001",
        name: "Marie Dubois",
        canton: "Genève"
      }
    },
    {
      id: "REL-015",
      relocationType: "multiple",
      disasterAddress: {
        street: "Avenue de Champel 45",
        city: "Genève",
        postalCode: "1206",
        country: "Suisse",
        canton: "Genève"
      },
      personalData: {
        firstName: "Marie",
        lastName: "Leroy",
        email: "marie.leroy@email.com",
        phone: "+41 22 789 01 23"
      },
      relocationPreferences: {
        bedrooms: 4,
        adults: 2,
        children: 2,
        hasAnimals: true,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-02-05",
        departureDate: "2025-04-05",
        useExactDates: true
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-901234",
        customInsuranceCompany: "Assurance Genève"
      },
      status: "processing",
      priority: "high",
      createdAt: "2025-02-05T09:30:00Z",
      updatedAt: "2025-02-05T15:45:00Z",
      responseTime: 2.3,
      cost: {
        insuranceCost: 3800,
        insuredCost: 600,
        totalCost: 4400
      },
      satisfaction: null,
      agent: {
        id: "AG-001",
        name: "Marie Dubois",
        canton: "Genève"
      }
    },
    // March 2025 data
    {
      id: "REL-016",
      relocationType: "single",
      disasterAddress: {
        street: "Rue de la Corraterie 25",
        city: "Genève",
        postalCode: "1204",
        country: "Suisse",
        canton: "Genève"
      },
      personalData: {
        firstName: "Pierre",
        lastName: "Lefebvre",
        email: "pierre.lefebvre@email.com",
        phone: "+41 22 890 12 34"
      },
      relocationPreferences: {
        bedrooms: 3,
        adults: 2,
        children: 1,
        hasAnimals: false,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-03-10",
        departureDate: "2025-05-10",
        useExactDates: true
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-567890",
        customInsuranceCompany: "Assurance Genève"
      },
      status: "completed",
      priority: "normal",
      createdAt: "2025-03-10T11:20:00Z",
      updatedAt: "2025-03-12T16:30:00Z",
      responseTime: 1.8,
      cost: {
        insuranceCost: 3200,
        insuredCost: 500,
        totalCost: 3700
      },
      satisfaction: {
        rating: 4,
        feedback: "Service rapide et efficace"
      },
      agent: {
        id: "AG-001",
        name: "Marie Dubois",
        canton: "Genève"
      }
    },
    {
      id: "REL-017",
      relocationType: "multiple",
      disasterAddress: {
        street: "Avenue de la Gare 8",
        city: "Lausanne",
        postalCode: "1003",
        country: "Suisse",
        canton: "Vaud"
      },
      personalData: {
        firstName: "Sophie",
        lastName: "Moreau",
        email: "sophie.moreau@email.com",
        phone: "+41 21 123 45 67"
      },
      relocationPreferences: {
        bedrooms: 2,
        adults: 1,
        children: 0,
        hasAnimals: true,
        hasAccessibilityNeeds: false,
        needsParking: false
      },
      arrivalDetails: {
        arrivalDate: "2025-03-15",
        estimatedDuration: "2 mois",
        useExactDates: false
      },
      insuranceCoverage: {
        hasInsurance: false
      },
      status: "completed",
      priority: "low",
      createdAt: "2025-03-15T14:45:00Z",
      updatedAt: "2025-03-18T10:20:00Z",
      responseTime: 3.2,
      cost: {
        insuranceCost: 0,
        insuredCost: 1800,
        totalCost: 1800
      },
      satisfaction: {
        rating: 3,
        feedback: "Service correct mais délais longs"
      },
      agent: {
        id: "AG-002",
        name: "Thomas Moreau",
        canton: "Vaud"
      }
    },
    // April 2025 data
    {
      id: "REL-018",
      relocationType: "single",
      disasterAddress: {
        street: "Rue du Lac 45",
        city: "Vevey",
        postalCode: "1800",
        country: "Suisse",
        canton: "Vaud"
      },
      personalData: {
        firstName: "Antoine",
        lastName: "Bernard",
        email: "antoine.bernard@email.com",
        phone: "+41 21 234 56 78"
      },
      relocationPreferences: {
        bedrooms: 4,
        adults: 2,
        children: 2,
        hasAnimals: true,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-04-05",
        departureDate: "2025-06-05",
        useExactDates: true
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-678901",
        customInsuranceCompany: "Assurance Vaudoise"
      },
      status: "processing",
      priority: "high",
      createdAt: "2025-04-05T09:15:00Z",
      updatedAt: "2025-04-05T13:30:00Z",
      responseTime: 1.5,
      cost: {
        insuranceCost: 4200,
        insuredCost: 700,
        totalCost: 4900
      },
      satisfaction: null,
      agent: {
        id: "AG-003",
        name: "Claire Martin",
        canton: "Vaud"
      }
    },
    {
      id: "REL-019",
      relocationType: "single",
      disasterAddress: {
        street: "Rue de la Tour 12",
        city: "Montreux",
        postalCode: "1820",
        country: "Suisse",
        canton: "Vaud"
      },
      personalData: {
        firstName: "Isabelle",
        lastName: "Petit",
        email: "isabelle.petit@email.com",
        phone: "+41 21 345 67 89"
      },
      relocationPreferences: {
        bedrooms: 1,
        adults: 1,
        children: 0,
        hasAnimals: false,
        hasAccessibilityNeeds: true,
        needsParking: false
      },
      arrivalDetails: {
        arrivalDate: "2025-04-12",
        estimatedDuration: "3 mois",
        useExactDates: false
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-789012",
        customInsuranceCompany: "Assurance Vaudoise"
      },
      status: "completed",
      priority: "normal",
      createdAt: "2025-04-12T16:30:00Z",
      updatedAt: "2025-04-15T11:45:00Z",
      responseTime: 2.8,
      cost: {
        insuranceCost: 2400,
        insuredCost: 400,
        totalCost: 2800
      },
      satisfaction: {
        rating: 5,
        feedback: "Excellent service, très professionnel"
      },
      agent: {
        id: "AG-003",
        name: "Claire Martin",
        canton: "Vaud"
      }
    },
    // May 2025 data
    {
      id: "REL-020",
      relocationType: "multiple",
      disasterAddress: {
        street: "Avenue des Alpes 30",
        city: "Genève",
        postalCode: "1201",
        country: "Suisse",
        canton: "Genève"
      },
      personalData: {
        firstName: "François",
        lastName: "Rousseau",
        email: "francois.rousseau@email.com",
        phone: "+41 22 456 78 90"
      },
      relocationPreferences: {
        bedrooms: 5,
        adults: 3,
        children: 2,
        hasAnimals: true,
        hasAccessibilityNeeds: false,
        needsParking: true
      },
      arrivalDetails: {
        arrivalDate: "2025-05-01",
        departureDate: "2025-08-01",
        useExactDates: true
      },
      insuranceCoverage: {
        hasInsurance: true
      },
      insuranceDetails: {
        insuranceCompany: "other",
        policyNumber: "POL-890123",
        customInsuranceCompany: "Assurance Genève"
      },
      status: "processing",
      priority: "high",
      createdAt: "2025-05-01T10:00:00Z",
      updatedAt: "2025-05-01T15:20:00Z",
      responseTime: 1.2,
      cost: {
        insuranceCost: 5500,
        insuredCost: 900,
        totalCost: 6400
      },
      satisfaction: null,
      agent: {
        id: "AG-001",
        name: "Marie Dubois",
        canton: "Genève"
      }
    }
  ];

  // Calculate KPIs based on filtered data
  const filteredData = mockRelocations.filter(relocation => {
    // Date filter
    if (!isDateInRange(relocation.createdAt, selectedDateFilter)) {
      return false;
    }
    
    // Agent filter
    if (selectedFilter === "agent" && selectedAgent !== "all") {
      return relocation.agent.id === selectedAgent;
    }
    
    // Canton filter
    if (selectedFilter === "canton" && selectedCanton !== "all") {
      return relocation.agent.canton === selectedCanton;
    }
    
    return true; // Show all data for group filter
  });

  const kpis = {
    // Operational KPI: Average acceptance delay
    averageAcceptanceDelay: (() => {
      const availableData = filteredData.filter(item => item.responseTime !== null && item.responseTime !== undefined);
      return availableData.length > 0 
        ? (availableData.reduce((sum, item) => sum + item.responseTime!, 0) / availableData.length).toFixed(1)
        : "N/A";
    })(),
    
    // Financial KPI: Average cost per stay
    averageCostPerStay: (() => {
      const availableData = filteredData.filter(item => item.cost?.totalCost !== null && item.cost?.totalCost !== undefined);
      return availableData.length > 0
        ? (availableData.reduce((sum, item) => sum + item.cost!.totalCost, 0) / availableData.length).toFixed(0)
        : "N/A";
    })(),
    
    // Client satisfaction KPI: Average rating
    averageSatisfaction: (() => {
      const availableData = filteredData.filter(item => item.satisfaction?.rating !== null && item.satisfaction?.rating !== undefined);
      return availableData.length > 0
        ? (availableData.reduce((sum, item) => sum + item.satisfaction!.rating, 0) / availableData.length).toFixed(1)
        : "N/A";
    })(),
    
    // Additional financial breakdown
    averageInsuranceCost: (() => {
      const availableData = filteredData.filter(item => item.cost?.insuranceCost !== null && item.cost?.insuranceCost !== undefined);
      return availableData.length > 0
        ? (availableData.reduce((sum, item) => sum + item.cost!.insuranceCost, 0) / availableData.length).toFixed(0)
        : "N/A";
    })(),
    
    averageInsuredCost: (() => {
      const availableData = filteredData.filter(item => item.cost?.insuredCost !== null && item.cost?.insuredCost !== undefined);
      return availableData.length > 0
        ? (availableData.reduce((sum, item) => sum + item.cost!.insuredCost, 0) / availableData.length).toFixed(0)
        : "N/A";
    })(),
    
    // Operations counters
    totalFiles: filteredData.length,
    pendingFiles: filteredData.filter(item => item.status === "pending").length,
    processingFiles: filteredData.filter(item => item.status === "processing").length,
    completedFiles: filteredData.filter(item => item.status === "completed").length,
    
    // Financial statistics
    costPerDay: (() => {
      const availableData = filteredData.filter(item => item.cost?.totalCost !== null && item.cost?.totalCost !== undefined);
      if (availableData.length === 0) return "N/A";
      
      const totalCost = availableData.reduce((sum, item) => sum + item.cost!.totalCost, 0);
      const totalDays = availableData.reduce((sum, item) => {
        if (item.arrivalDetails?.useExactDates && item.arrivalDetails?.departureDate) {
          const arrival = new Date(item.arrivalDetails.arrivalDate);
          const departure = new Date(item.arrivalDetails.departureDate);
          const days = Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24));
          return sum + days;
        }
        return sum + 30; // Default 30 days for estimated durations
      }, 0);
      
      return totalDays > 0 ? (totalCost / totalDays).toFixed(0) : "N/A";
    })(),
    
    insuranceCoveragePercentage: (() => {
      const totalFiles = filteredData.length;
      if (totalFiles === 0) return "N/A";
      
      const insuredFiles = filteredData.filter(item => item.insuranceCoverage?.hasInsurance === true).length;
      return ((insuredFiles / totalFiles) * 100).toFixed(0);
    })(),
    
    averageRelocationLength: (() => {
      const availableData = filteredData.filter(item => item.arrivalDetails);
      if (availableData.length === 0) return "N/A";
      
      const totalDays = availableData.reduce((sum, item) => {
        if (item.arrivalDetails?.useExactDates && item.arrivalDetails?.departureDate) {
          const arrival = new Date(item.arrivalDetails.arrivalDate);
          const departure = new Date(item.arrivalDetails.departureDate);
          const days = Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24));
          return sum + days;
        }
        return sum + 30; // Default 30 days for estimated durations
      }, 0);
      
      return (totalDays / availableData.length).toFixed(0);
    })(),
    
    // Satisfaction statistics
    accommodationAcceptanceRate: (() => {
      const totalFiles = filteredData.length;
      if (totalFiles === 0) return "N/A";
      
      // Simulate acceptance rate based on completed files (assuming completed means accepted)
      const acceptedFiles = filteredData.filter(item => item.status === "completed").length;
      return ((acceptedFiles / totalFiles) * 100).toFixed(0);
    })(),
    
    averageWaitingTime: (() => {
      const availableData = filteredData.filter(item => item.responseTime !== null && item.responseTime !== undefined);
      if (availableData.length === 0) return "N/A";
      
      const totalWaitingTime = availableData.reduce((sum, item) => sum + item.responseTime!, 0);
      return (totalWaitingTime / availableData.length).toFixed(1);
    })()
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing": return "text-blue-600";
      case "completed": return "text-green-600";
      case "pending": return "text-yellow-600";
      case "cancelled": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing": return <Clock className="h-4 w-4" />;
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      case "pending": return <AlertTriangle className="h-4 w-4" />;
      case "cancelled": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "normal": return "bg-blue-100 text-blue-800";
      case "low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isFilled = starValue <= Math.floor(rating);
      const isHalfFilled = !isFilled && starValue === Math.ceil(rating) && rating % 1 !== 0;
      
      return (
        <div key={i} className="relative">
          <Star
            className={cn(
              "h-4 w-4",
              isFilled ? "text-primary fill-current" : "text-muted-foreground"
            )}
          />
          {isHalfFilled && (
            <div className="absolute inset-0 overflow-hidden">
              <Star
                className="h-4 w-4 text-primary fill-current"
                style={{ clipPath: 'inset(0 50% 0 0)' }}
              />
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Tableau de bord Assurance</h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos dossiers de sinistres et suivez les relogements
        </p>
      </div>



      {/* Filters - Single line, right-aligned */}
      <div className="flex justify-end items-center gap-6 mb-2">
        {/* Vue Filter */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[
              { key: "agent", label: "Mes données" },
              { key: "canton", label: "Canton" },
              { key: "group", label: "Groupe" }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as "agent" | "canton" | "group")}
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium transition-colors",
                  selectedFilter === filter.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="w-px h-4 bg-muted-foreground/30 mx-1"></div>
        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[
              { key: "all", label: "Tout" },
              { key: "year", label: "Année" },
              { key: "month", label: "Mois" }
            ].map((period) => (
              <button
                key={period.key}
                onClick={() => setSelectedDateFilter(period.key as "month" | "year" | "all")}
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium transition-colors",
                  selectedDateFilter === period.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Conditional Filters */}
        {selectedFilter === "agent" && (
          <>
            <div className="w-px h-4 bg-muted-foreground/30 mx-1"></div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[
                  { key: "all", label: "Agence" },
                  { key: "AG-001", label: "M. Dubois" },
                  { key: "AG-002", label: "T. Moreau" },
                  { key: "AG-003", label: "C. Martin" }
                ].map((agent) => (
                  <button
                    key={agent.key}
                    onClick={() => setSelectedAgent(agent.key)}
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium transition-colors",
                      selectedAgent === agent.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    )}
                  >
                    {agent.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        
        {selectedFilter === "canton" && (
          <>
            <div className="w-px h-4 bg-muted-foreground/30 mx-1"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Canton:</span>
              <div className="flex gap-0.5">
                {[
                  { key: "all", label: "Tous" },
                  { key: "Genève", label: "Genève" },
                  { key: "Vaud", label: "Vaud" }
                ].map((canton) => (
                  <button
                    key={canton.key}
                    onClick={() => setSelectedCanton(canton.key)}
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium transition-colors",
                      selectedCanton === canton.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    )}
                  >
                    {canton.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="w-px h-4 bg-muted-foreground/30 mx-1"></div>

        {/* Reset Button */}
        <button
          onClick={() => {
            setSelectedFilter("agent");
            setSelectedAgent("all");
            setSelectedCanton("all");
            setSelectedDateFilter("all");
          }}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-muted-foreground hover:bg-secondary/80 transition-colors"
          title="Réinitialiser les filtres"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Réinitialiser</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Operations KPI */}
        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-base font-semibold text-muted-foreground">Opérations</p>
              <p className="text-3xl font-bold text-primary">{kpis.totalFiles}</p>
              <p className="text-sm text-muted-foreground">Total des dossiers</p>
            </div>
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center pt-3 border-t border-primary/20">
              <span className="text-xs font-medium text-yellow-600">En attente</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary">{kpis.pendingFiles}</span>
                <Link 
                  href="/platform/dashboard/assurance/dossiers?status=pending"
                  className="text-xs text-primary hover:text-primary/80 transition-colors underline"
                >
                  Voir
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-blue-600">En cours</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary">{kpis.processingFiles}</span>
                <Link 
                  href="/platform/dashboard/assurance/dossiers?status=processing"
                  className="text-xs text-primary hover:text-primary/80 transition-colors underline"
                >
                  Voir
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-green-600">Terminés</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary">{kpis.completedFiles}</span>
                <Link 
                  href="/platform/dashboard/assurance/dossiers?status=completed"
                  className="text-xs text-primary hover:text-primary/80 transition-colors underline"
                >
                  Voir
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Financial KPI */}
        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-base font-semibold text-muted-foreground">Résumé financier</p>
              <p className="text-3xl font-bold text-primary">CHF {kpis.averageCostPerStay}</p>
              <p className="text-sm text-muted-foreground">Coût moyen par séjour</p>
            </div>
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center pt-3 border-t border-primary/20">
              <span className="text-xs text-muted-foreground">Coût par jour</span>
              <span className="text-sm font-medium text-primary">CHF {kpis.costPerDay}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Couverture assurance</span>
              <span className="text-sm font-medium text-primary">{kpis.insuranceCoveragePercentage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Durée moyenne</span>
              <span className="text-sm font-medium text-primary">{kpis.averageRelocationLength} jours</span>
            </div>
          </div>
        </Card>

        {/* Client Feedback KPI */}
        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-base font-semibold text-muted-foreground">Satisfaction client</p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex">
                  {renderStars(parseFloat(kpis.averageSatisfaction))}
                </div>
                <span className="text-2xl font-bold text-primary">{kpis.averageSatisfaction}/5</span>
              </div>
            </div>
            <Star className="h-12 w-12 text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center pt-3 border-t border-primary/20">
              <span className="text-xs text-muted-foreground">Acceptation logements</span>
              <span className="text-sm font-medium text-primary">{kpis.accommodationAcceptanceRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Attente moyenne</span>
              <span className="text-sm font-medium text-primary">{kpis.averageWaitingTime} jours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Délai d'acceptation moyen</span>
              <span className="text-sm font-medium text-primary">{kpis.averageAcceptanceDelay} jours</span>
            </div>
          </div>
        </Card>


      </div>

      {/* Recent Relocations - Compact Style */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary">Relogements récents</h2>
          <Link href="/platform/dashboard/assurance/dossiers">
            <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
              Voir tous les relogements
            </Button>
          </Link>
        </div>
        
        <div className="space-y-3">
          {filteredData.slice(0, 3).map((relocation) => (
            <div key={relocation.id} className="grid grid-cols-5 gap-4 p-4 border border-primary/20 rounded-lg bg-secondary/50 items-center">
              {/* Status */}
              <div className="flex items-center gap-2">
                {getStatusIcon(relocation.status)}
                <span className={`font-medium ${getStatusColor(relocation.status)}`}>
                  {relocation.status === "processing" ? "En cours" : 
                   relocation.status === "completed" ? "Terminé" : 
                   relocation.status === "pending" ? "En attente" : "Annulé"}
                </span>
              </div>
              
              {/* ID and Name */}
              <div>
                <p className="font-medium text-primary">{relocation.id}</p>
                <p className="text-sm text-muted-foreground">
                  {relocation.personalData.firstName} {relocation.personalData.lastName}
                </p>
              </div>
              
              {/* Date Range */}
              <div>
                <p className="text-sm font-medium text-primary">
                  {getDateRangeDisplay(relocation.arrivalDetails)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {relocation.disasterAddress.city}, {relocation.disasterAddress.canton}
                </p>
              </div>
              
              {/* Cost */}
              <div>
                {relocation.cost ? (
                  <p className="text-sm font-medium text-green-600">CHF {relocation.cost.totalCost}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">-</p>
                )}
              </div>
              
              {/* Priority and Actions */}
              <div className="flex items-center gap-2 justify-end">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(relocation.priority)}`}>
                  {relocation.priority === "high" ? "Haute" : 
                   relocation.priority === "normal" ? "Normale" : "Basse"}
                </span>
                <Link href={`/platform/dashboard/assurance/dossiers/${relocation.id}`}>
                  <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                    Voir
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions - Messages and Notifications */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 bg-background border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-primary">Messages</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            3 nouveau(x) message(s)
          </p>
          <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Voir les messages
          </Button>
        </Card>

        <Card className="p-4 bg-background border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-primary">Notifications</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            2 notification(s) en attente
          </p>
          <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Voir les notifications
          </Button>
        </Card>

        <Card className="p-4 bg-background border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-primary">Documents</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            1 document(s) en attente
          </p>
          <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Voir les documents
          </Button>
        </Card>
      </div>

      {/* Statistics Section */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-primary">Statistiques et analyses</h2>
                          <p className="text-sm text-muted-foreground">
                Visualisez les performances, coûts et tendances de vos dossiers
              </p>
          </div>
          <Link href="/platform/dashboard/assurance/statistiques">
            <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
              Voir les statistiques complètes
            </Button>
          </Link>
        </div>
        
        <AssuranceStatistics
          data={filteredData}
          selectedFilter={selectedFilter}
          selectedAgent={selectedAgent}
          selectedCanton={selectedCanton}
          selectedDateFilter={selectedDateFilter}
        />
      </Card>

      {/* Recent Messages */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary">Messages récents</h2>
          <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Voir tout
          </Button>
        </div>
        
        <div className="space-y-3">
          {[
            {
              id: 1,
              from: "Marie Dubois",
              subject: "Nouveau dossier REL-009 créé",
              date: "Il y a 2 heures",
              unread: true
            },
            {
              id: 2,
              from: "Thomas Moreau",
              subject: "Mise à jour dossier REL-005",
              date: "Hier",
              unread: true
            },
            {
              id: 3,
              from: "Système",
              subject: "Rapport mensuel disponible",
              date: "Il y a 3 jours",
              unread: false
            }
          ].map((message) => (
            <div key={message.id} className="flex items-center justify-between p-3 border border-primary/20 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${message.unread ? 'bg-primary' : 'bg-muted-foreground'}`} />
                <div>
                  <p className="font-medium text-primary">{message.from}</p>
                  <p className="text-sm text-muted-foreground">{message.subject}</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{message.date}</span>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
} 