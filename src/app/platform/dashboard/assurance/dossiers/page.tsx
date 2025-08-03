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
  Search,
  X
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function AssuranceDossiers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  // Mock data based on relocation wizard structure
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
        arrivalDate: "2024-01-15",
        departureDate: "2024-02-15",
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
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T14:45:00Z",
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
        arrivalDate: "2024-01-10",
        departureDate: "2024-02-10",
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
      createdAt: "2024-01-10T09:15:00Z",
      updatedAt: "2024-01-12T16:30:00Z",
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
        arrivalDate: "2024-01-08",
        estimatedDuration: "3 mois",
        useExactDates: false
      },
      insuranceCoverage: {
        hasInsurance: false
      },
      status: "completed",
      priority: "low",
      createdAt: "2024-01-08T11:20:00Z",
      updatedAt: "2024-01-10T13:45:00Z",
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
        arrivalDate: "2024-01-16",
        departureDate: "2024-03-16",
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
      createdAt: "2024-01-16T08:45:00Z",
      updatedAt: "2024-01-16T12:30:00Z",
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
        arrivalDate: "2024-01-18",
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
      createdAt: "2024-01-18T14:20:00Z",
      updatedAt: "2024-01-18T14:20:00Z",
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
        arrivalDate: "2024-01-17",
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
      createdAt: "2024-01-17T16:45:00Z",
      updatedAt: "2024-01-17T16:45:00Z",
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
        arrivalDate: "2024-01-19",
        departureDate: "2024-02-19",
        useExactDates: true
      },
      insuranceCoverage: {
        hasInsurance: false
      },
      status: "pending",
      priority: "low",
      createdAt: "2024-01-19T09:30:00Z",
      updatedAt: "2024-01-19T09:30:00Z",
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
        arrivalDate: "2024-01-20",
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
      createdAt: "2024-01-20T11:15:00Z",
      updatedAt: "2024-01-20T11:15:00Z",
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

  // Filter cases based on search and filters
  const filteredCases = mockRelocations.filter((case_) => {
    const matchesSearch = searchTerm === "" || 
      case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${case_.personalData.firstName} ${case_.personalData.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.disasterAddress.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    const matchesType = typeFilter === "all" || case_.relocationType === typeFilter;
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Non spécifié";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };

  const getTimeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Il y a ${diffInDays}j`;
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setPriorityFilter("all");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Dossiers de relogement</h1>
        <p className="text-muted-foreground mt-2">
          Gérez et suivez tous vos dossiers de relogement
        </p>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par ID, nom ou ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Statut:</span>
              <div className="flex gap-1">
                {["all", "pending", "processing", "completed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={cn(
                      "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                      statusFilter === status
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    )}
                  >
                    {status === "all" ? "Tous" : 
                     status === "pending" ? "En attente" :
                     status === "processing" ? "En cours" : "Terminé"}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Type:</span>
              <div className="flex gap-1">
                {["all", "single", "multiple"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={cn(
                      "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                      typeFilter === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    )}
                  >
                    {type === "all" ? "Tous" : 
                     type === "single" ? "Unique" : "Multiple"}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Priorité:</span>
              <div className="flex gap-1">
                {["all", "high", "normal", "low"].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setPriorityFilter(priority)}
                    className={cn(
                      "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                      priorityFilter === priority
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    )}
                  >
                    {priority === "all" ? "Toutes" : 
                     priority === "high" ? "Haute" :
                     priority === "normal" ? "Normale" : "Basse"}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
            >
              <X className="h-3 w-3" />
              Réinitialiser
            </button>
          </div>
        </div>
      </Card>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((case_) => (
          <Card key={case_.id} className="p-6">
            {/* Header with Status and Priority */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(case_.status)}
                  <span className={`font-medium ${getStatusColor(case_.status)}`}>
                    {case_.status === "processing" ? "En cours" : 
                     case_.status === "completed" ? "Terminé" : 
                     case_.status === "pending" ? "En attente" : "Annulé"}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(case_.priority)}`}>
                  {case_.priority === "high" ? "Haute" : 
                   case_.priority === "normal" ? "Normale" : "Basse"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {getTimeAgo(case_.updatedAt)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Link href={`/platform/dashboard/assurance/dossiers/${case_.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-lg">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Informations personnelles</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-muted-foreground">Nom</span>
                    <span className="text-xs font-medium">
                      {case_.personalData.firstName} {case_.personalData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-muted-foreground">Email</span>
                    <span className="text-xs font-medium">{case_.personalData.email}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-muted-foreground">Téléphone</span>
                    <span className="text-xs font-medium">{case_.personalData.phone}</span>
                  </div>
                </div>
              </div>

              {/* Disaster Address */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-6 h-6 bg-red-100 rounded-lg">
                    <MapPin className="h-4 w-4 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Adresse du sinistre</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-muted-foreground">Adresse</span>
                    <span className="text-xs font-medium">{case_.disasterAddress.street}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-muted-foreground">Ville</span>
                    <span className="text-xs font-medium">
                      {case_.disasterAddress.city}, {case_.disasterAddress.postalCode}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-muted-foreground">Canton</span>
                    <span className="text-xs font-medium">{case_.disasterAddress.canton}</span>
                  </div>
                </div>
              </div>

              {/* Relocation Details */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-lg">
                    <Home className="h-4 w-4 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Détails du relogement</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-muted-foreground">Type</span>
                    <span className="text-xs font-medium">
                      {case_.relocationType === "single" ? "Unique" : "Multiple"}
                    </span>
                  </div>
                  {case_.relocationPreferences && (
                    <>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-xs text-muted-foreground">Chambres</span>
                        <span className="text-xs font-medium">{case_.relocationPreferences.bedrooms}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-xs text-muted-foreground">Personnes</span>
                        <span className="text-xs font-medium">
                          {case_.relocationPreferences.adults + (case_.relocationPreferences.children || 0)}
                        </span>
                      </div>
                    </>
                  )}
                  {case_.arrivalDetails && (
                    <div className="flex justify-between items-center py-1">
                      <span className="text-xs text-muted-foreground">Arrivée</span>
                      <span className="text-xs font-medium">{formatDate(case_.arrivalDetails.arrivalDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Bottom Row with Performance Metrics */}
            <div className="grid lg:grid-cols-4 gap-4 mt-6 pt-4 border-t">
              {/* Agent Responsible */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-lg">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Agent responsable</p>
                  <p className="text-xs font-medium">{case_.agent.name}</p>
                </div>
              </div>
              
              {/* Performance Metrics */}
              {case_.responseTime && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-purple-100 rounded-lg">
                    <Clock className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Délai d'acceptation</p>
                    <p className="text-xs font-medium">{case_.responseTime} jours</p>
                  </div>
                </div>
              )}
              
              {/* Costs */}
              {case_.cost && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 rounded-lg">
                    <Wallet className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Coût total</p>
                    <p className="text-xs font-medium text-green-600">CHF {case_.cost.totalCost}</p>
                  </div>
                </div>
              )}
              
              {/* Client Satisfaction */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-yellow-100 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Satisfaction client</p>
                  {case_.status === "completed" && case_.satisfaction ? (
                    <div className="flex items-center gap-1">
                      {renderStars(case_.satisfaction.rating)}
                      <span className="text-xs font-medium ml-1">{case_.satisfaction.rating}/5</span>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">En attente du retour client</p>
                  )}
                </div>
              </div>
            </div>

            {/* Declaration de sinistre */}
            {case_.insuranceCoverage && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded-lg">
                    <File className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Déclaration de sinistre:</span>
                    {case_.insuranceCoverage.hasInsurance ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium text-green-600">Téléchargée</span>
                        <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Télécharger
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-orange-500" />
                        <span className="text-xs font-medium text-orange-600">Non téléchargée</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <Card className="p-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun dossier trouvé avec les critères sélectionnés.</p>
        </Card>
      )}
    </div>
  );
} 