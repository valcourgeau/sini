"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import AssuranceStatistics from "./assurance-statistics";

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
  status: "pending" | "processing" | "completed" | "cancelled";
  priority: "high" | "normal" | "low";
  createdAt: string;
  updatedAt: string;
  responseTime?: number | null;
  cost?: {
    insuranceCost: number;
    insuredCost: number;
    totalCost: number;
  } | null;
  satisfaction?: {
    rating: number;
    feedback?: string;
  } | null;
  agent: {
    id: string;
    name: string;
    canton: string;
  };
}

export default function AssuranceStatistiquesPage() {
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

  // Complete mock data from the main dashboard
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

  // Calculate filtered data based on current filters
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/platform/dashboard/assurance">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au tableau de bord
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-primary">Statistiques et analyses</h1>
          <p className="text-muted-foreground mt-2">
            Visualisez les performances, revenus et tendances de vos dossiers
          </p>
        </div>
      </div>

      {/* Statistics Component */}
      <Card className="p-6 bg-background border-primary/20">
        <AssuranceStatistics
          data={filteredData}
          selectedFilter={selectedFilter}
          selectedAgent={selectedAgent}
          selectedCanton={selectedCanton}
          selectedDateFilter={selectedDateFilter}
        />
      </Card>
    </div>
  );
} 