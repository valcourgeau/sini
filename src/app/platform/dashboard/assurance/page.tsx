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
  MessageSquare
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
  const [selectedDateFilter, setSelectedDateFilter] = useState<"month" | "year" | "all">("month");

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
    }
  ];

  // Calculate KPIs based on filtered data
  const filteredData = mockRelocations.filter(relocation => {
    if (selectedFilter === "agent" && selectedAgent !== "all") {
      return relocation.agent.id === selectedAgent;
    }
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
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        )}
      />
    ));
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

      {/* Filter Selection Tool */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center gap-4 mb-6">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-primary">Filtres</h3>
        </div>
        
        {/* Main Filter Tabs */}
        <div className="flex items-center gap-1 mb-6">
          <button
            onClick={() => setSelectedFilter("agent")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              selectedFilter === "agent"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            )}
          >
            Mes données
          </button>
          <button
            onClick={() => setSelectedFilter("canton")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              selectedFilter === "canton"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            )}
          >
            Canton
          </button>
          <button
            onClick={() => setSelectedFilter("group")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              selectedFilter === "group"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            )}
          >
            Groupe d'assurance
          </button>
        </div>
        
        {/* Secondary Filters */}
        {selectedFilter === "agent" && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Agent:</span>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sélectionnez un agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les agents</SelectItem>
                  <SelectItem value="AG-001">Marie Dubois</SelectItem>
                  <SelectItem value="AG-002">Thomas Moreau</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {selectedFilter === "canton" && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Canton:</span>
              <Select value={selectedCanton} onValueChange={setSelectedCanton}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sélectionnez un canton" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les cantons</SelectItem>
                  <SelectItem value="Genève">Genève</SelectItem>
                  <SelectItem value="Vaud">Vaud</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {selectedFilter === "group" && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Vue globale du groupe d'assurance</span>
            </div>
          </div>
        )}
      </Card>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Operational KPI */}
        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Délai d'acceptation moyen</p>
              <p className="text-2xl font-bold text-primary">{kpis.averageAcceptanceDelay} jours</p>
              <p className="text-xs text-muted-foreground">Délai moyen d'acceptation</p>
            </div>
            <Clock className="h-8 w-8 text-primary" />
          </div>
        </Card>

        {/* Financial KPI */}
        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Coût moyen par séjour</p>
              <p className="text-2xl font-bold text-primary">CHF {kpis.averageCostPerStay}</p>
              <div className="text-xs text-muted-foreground mt-1">
                <div>Assurance: CHF {kpis.averageInsuranceCost}</div>
                <div>Assuré: CHF {kpis.averageInsuredCost}</div>
              </div>
            </div>
            <Wallet className="h-8 w-8 text-primary" />
          </div>
        </Card>

        {/* Client Satisfaction KPI */}
        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Satisfaction client</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {renderStars(parseFloat(kpis.averageSatisfaction))}
                </div>
                <span className="text-lg font-bold text-primary">{kpis.averageSatisfaction}/5</span>
              </div>
            </div>
            <Star className="h-8 w-8 text-primary" />
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