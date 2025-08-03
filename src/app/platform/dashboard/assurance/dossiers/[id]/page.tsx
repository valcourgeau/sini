
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
  ArrowLeft,
  PawPrint,
  Bed,
  Heart
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../../../../../../components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Generate static params for all mock case IDs
export async function generateStaticParams() {
  return [
    { id: "REL-001" },
    { id: "REL-002" },
    { id: "REL-003" },
    { id: "REL-004" },
    { id: "REL-005" },
    { id: "REL-006" },
  ];
}

// Types based on relocation wizard data structure
interface RelocationData {
  id: string;
  relocationType: "single" | "multiple";
  
  // Single relocation path
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
  
  // Multiple relocation path
  multipleDisasterAddress?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  
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
    specialNeeds?: string;
    arrivalDate: string;
    departureDate?: string;
    useExactDates: boolean;
    estimatedDuration?: string;
    bedrooms: number;
    adults: number;
    children: number;
    hasAnimals?: boolean;
    hasAccessibilityNeeds?: boolean;
    needsParking?: boolean;
    hasInsurance?: boolean;
    insuranceDetails?: string;
    claimDocument?: File;
    hasUploadedClaim?: boolean;
  }>;
  
  // Common fields
  status: "pending" | "processing" | "completed" | "cancelled";
  priority: "high" | "normal" | "low";
  createdAt: string;
  updatedAt: string;
  responseTime?: number; // in days
  cost?: {
    insuranceCost: number;
    insuredCost: number;
    totalCost: number;
  };
  satisfaction?: {
    rating: number; // 1-5 stars
    feedback?: string;
  };
  agent: {
    id: string;
    name: string;
    canton: string;
  };
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const caseId = id || "REL-001";

  // Function to get case data based on ID
  // Mock data for a single detailed view
  const caseData: RelocationData = {
    id: "REL-001",
    relocationType: "single",
    singleDisasterAddress: {
      street: "Rue de la Paix 10",
      city: "Genève",
      postalCode: "1201",
      country: "Suisse",
      canton: "Genève"
    },
    singlePersonalData: {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@email.com",
      phone: "+41 22 123 45 67"
    },
    singleInsuredData: {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@email.com",
      phone: "+41 22 123 45 67"
    },
    singleRelocationPreferences: {
      bedrooms: 2,
      adults: 2,
      children: 1,
      hasAnimals: false,
      hasAccessibilityNeeds: false,
      needsParking: true
    },
    singleArrivalDetails: {
      arrivalDate: "2025-08-01",
      departureDate: "2025-09-01",
      useExactDates: true
    },
    singleInsuranceCoverage: {
      hasInsurance: true
    },
    singleInsuranceDetails: {
      insuranceCompany: "other",
      policyNumber: "POL-123456",
      customInsuranceCompany: "Assurance Genève"
    },
    status: "processing",
    priority: "high",
    createdAt: "2025-08-01T10:30:00Z",
    updatedAt: "2025-08-08T14:45:00Z",
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
  };

  // Additional mock data examples for different scenarios
  const multipleRelocationExample: RelocationData = {
    id: "REL-002",
    relocationType: "multiple",
    multipleDisasterAddress: {
      street: "Avenue des Alpes 25",
      city: "Lausanne",
      postalCode: "1000",
      country: "Suisse"
    },
    multiplePersonalData: {
      firstName: "Sophie",
      lastName: "Martin",
      email: "sophie.martin@email.com",
      phone: "+41 21 987 65 43"
    },
    multipleRelocationRequests: [
      {
        firstName: "Pierre",
        lastName: "Durand",
        email: "pierre.durand@email.com",
        phone: "+41 21 123 45 67",
        specialNeeds: "Accès handicapé requis",
        arrivalDate: "2025-08-15",
        departureDate: "2025-10-15",
        useExactDates: true,
        bedrooms: 1,
        adults: 1,
        children: 0,
        hasAnimals: false,
        hasAccessibilityNeeds: true,
        needsParking: false,
        hasInsurance: true,
        insuranceDetails: "Assurance ménage - AXA"
      },
      {
        firstName: "Marie",
        lastName: "Leroy",
        email: "marie.leroy@email.com",
        phone: "+41 21 234 56 78",
        arrivalDate: "2025-08-20",
        estimatedDuration: "2-3 mois",
        useExactDates: false,
        bedrooms: 2,
        adults: 2,
        children: 1,
        hasAnimals: true,
        hasAccessibilityNeeds: false,
        needsParking: true,
        hasInsurance: false
      }
    ],
    status: "pending",
    priority: "normal",
    createdAt: "2025-08-05T09:15:00Z",
    updatedAt: "2025-08-08T09:15:00Z",
    agent: {
      id: "AG-002",
      name: "Thomas Weber",
      canton: "Vaud"
    }
  };

  const noInsuranceExample: RelocationData = {
    id: "REL-003",
    relocationType: "single",
    singleDisasterAddress: {
      street: "Rue du Rhône 45",
      city: "Genève",
      postalCode: "1204",
      country: "Suisse",
      canton: "Genève"
    },
    singlePersonalData: {
      firstName: "Claire",
      lastName: "Bernard",
      email: "claire.bernard@email.com",
      phone: "+41 22 456 78 90"
    },
    singleInsuredData: {
      firstName: "Marc",
      lastName: "Bernard",
      email: "marc.bernard@email.com",
      phone: "+41 22 456 78 91"
    },
    singleRelocationPreferences: {
      bedrooms: 3,
      adults: 2,
      children: 2,
      hasAnimals: true,
      hasAccessibilityNeeds: false,
      needsParking: true
    },
    singleArrivalDetails: {
      arrivalDate: "2025-07-25",
      estimatedDuration: "6-8 mois",
      useExactDates: false
    },
    singleInsuranceCoverage: {
      hasInsurance: false
    },
    singleInsuranceDetails: {
      insuranceCompany: "other",
      policyNumber: "POL-789012",
      customInsuranceCompany: "Assurance Privée"
    },
    status: "completed",
    priority: "low",
    createdAt: "2025-07-20T14:20:00Z",
    updatedAt: "2025-08-05T16:30:00Z",
    responseTime: 1.5,
    cost: {
      insuranceCost: 0,
      insuredCost: 4500,
      totalCost: 4500
    },
    satisfaction: {
      rating: 4,
      feedback: "Service correct, délais respectés"
    },
    agent: {
      id: "AG-003",
      name: "Anne Müller",
      canton: "Genève"
    }
  };

  // New examples for different cantons and scenarios
  const vaudCompletedExample: RelocationData = {
    id: "REL-004",
    relocationType: "single",
    singleDisasterAddress: {
      street: "Rue de la Tour 78",
      city: "Montreux",
      postalCode: "1820",
      country: "Suisse",
      canton: "Vaud"
    },
    singlePersonalData: {
      firstName: "Antoine",
      lastName: "Moreau",
      email: "antoine.moreau@email.com",
      phone: "+41 21 345 67 89"
    },
    singleInsuredData: {
      firstName: "Antoine",
      lastName: "Moreau",
      email: "antoine.moreau@email.com",
      phone: "+41 21 345 67 89"
    },
    singleRelocationPreferences: {
      bedrooms: 2,
      adults: 1,
      children: 0,
      hasAnimals: false,
      hasAccessibilityNeeds: false,
      needsParking: true
    },
    singleArrivalDetails: {
      arrivalDate: "2025-07-10",
      departureDate: "2025-08-10",
      useExactDates: true
    },
    singleInsuranceCoverage: {
      hasInsurance: true
    },
    singleInsuranceDetails: {
      insuranceCompany: "other",
      policyNumber: "POL-456789",
      customInsuranceCompany: "Assurance Vaudoise"
    },
    status: "completed",
    priority: "normal",
    createdAt: "2025-07-08T11:30:00Z",
    updatedAt: "2025-08-01T13:45:00Z",
    responseTime: 2.8,
    cost: {
      insuranceCost: 1800,
      insuredCost: 300,
      totalCost: 2100
    },
    satisfaction: {
      rating: 5,
      feedback: "Service impeccable, relogement rapide"
    },
    agent: {
      id: "AG-004",
      name: "Claire Martin",
      canton: "Vaud"
    }
  };

  const genevaProcessingExample: RelocationData = {
    id: "REL-005",
    relocationType: "single",
    singleDisasterAddress: {
      street: "Avenue de Champel 45",
      city: "Genève",
      postalCode: "1206",
      country: "Suisse",
      canton: "Genève"
    },
    singlePersonalData: {
      firstName: "Isabelle",
      lastName: "Lefebvre",
      email: "isabelle.lefebvre@email.com",
      phone: "+41 22 567 89 01"
    },
    singleInsuredData: {
      firstName: "Isabelle",
      lastName: "Lefebvre",
      email: "isabelle.lefebvre@email.com",
      phone: "+41 22 567 89 01"
    },
    singleRelocationPreferences: {
      bedrooms: 4,
      adults: 2,
      children: 2,
      hasAnimals: true,
      hasAccessibilityNeeds: false,
      needsParking: true
    },
    singleArrivalDetails: {
      arrivalDate: "2025-08-12",
      estimatedDuration: "4-5 mois",
      useExactDates: false
    },
    singleInsuranceCoverage: {
      hasInsurance: true
    },
    singleInsuranceDetails: {
      insuranceCompany: "other",
      policyNumber: "POL-234567",
      customInsuranceCompany: "Assurance Genève"
    },
    status: "processing",
    priority: "high",
    createdAt: "2025-08-10T16:45:00Z",
    updatedAt: "2025-08-08T10:20:00Z",
    responseTime: 1.2,
    cost: {
      insuranceCost: 3800,
      insuredCost: 600,
      totalCost: 4400
    },
    satisfaction: undefined,
    agent: {
      id: "AG-001",
      name: "Marie Dubois",
      canton: "Genève"
    }
  };

  const vaudPendingExample: RelocationData = {
    id: "REL-006",
    relocationType: "multiple",
    multipleDisasterAddress: {
      street: "Rue du Lac 90",
      city: "Vevey",
      postalCode: "1800",
      country: "Suisse"
    },
    multiplePersonalData: {
      firstName: "François",
      lastName: "Rousseau",
      email: "francois.rousseau@email.com",
      phone: "+41 21 678 90 12"
    },
    multipleRelocationRequests: [
      {
        firstName: "François",
        lastName: "Rousseau",
        email: "francois.rousseau@email.com",
        phone: "+41 21 678 90 12",
        arrivalDate: "2025-08-25",
        estimatedDuration: "3-4 mois",
        useExactDates: false,
        bedrooms: 3,
        adults: 2,
        children: 1,
        hasAnimals: false,
        hasAccessibilityNeeds: false,
        needsParking: true,
        hasInsurance: true,
        insuranceDetails: "Assurance ménage - Helvetia"
      },
      {
        firstName: "Catherine",
        lastName: "Rousseau",
        email: "catherine.rousseau@email.com",
        phone: "+41 21 678 90 13",
        arrivalDate: "2025-08-25",
        estimatedDuration: "3-4 mois",
        useExactDates: false,
        bedrooms: 2,
        adults: 1,
        children: 0,
        hasAnimals: true,
        hasAccessibilityNeeds: false,
        needsParking: false,
        hasInsurance: true,
        insuranceDetails: "Assurance ménage - Helvetia"
      }
    ],
    status: "pending",
    priority: "normal",
    createdAt: "2025-08-08T14:30:00Z",
    updatedAt: "2025-08-08T14:30:00Z",
    agent: {
      id: "AG-004",
      name: "Claire Martin",
      canton: "Vaud"
    }
  };

  // Get the current case data based on ID
  const currentCaseData = (() => {
    switch (caseId) {
      case "REL-002":
        return multipleRelocationExample;
      case "REL-003":
        return noInsuranceExample;
      case "REL-004":
        return vaudCompletedExample;
      case "REL-005":
        return genevaProcessingExample;
      case "REL-006":
        return vaudPendingExample;
      default:
        return caseData;
    }
  })();

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
        month: "long",
        year: "numeric"
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };

  const getNumberOfNights = (arrival?: string, departure?: string): number | null => {
    if (!arrival || !departure) return null;
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    if (isNaN(arrivalDate.getTime()) || isNaN(departureDate.getTime())) return null;
    const diff = departureDate.getTime() - arrivalDate.getTime();
    const nights = Math.round(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header with Navigation */}
              <div className="flex items-center justify-between">
          <div>
            <Link href="/platform/dashboard/assurance/dossiers">
              <Button variant="outline" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-primary">Dossier {currentCaseData.id}</h1>
              <p className="text-muted-foreground mt-1">
                {currentCaseData.relocationType === "single" 
                  ? `${currentCaseData.singlePersonalData?.firstName} ${currentCaseData.singlePersonalData?.lastName}`
                  : `${currentCaseData.multiplePersonalData?.firstName} ${currentCaseData.multiplePersonalData?.lastName}`
                }
              </p>
            </div>
          </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {getStatusIcon(currentCaseData.status)}
            <span className={`font-medium ${getStatusColor(currentCaseData.status)}`}>
              {currentCaseData.status === "processing" ? "En cours" : 
               currentCaseData.status === "completed" ? "Terminé" : 
               currentCaseData.status === "pending" ? "En attente" : "Annulé"}
            </span>
          </div>
          <Badge variant="outline" className={getPriorityColor(currentCaseData.priority)}>
            {currentCaseData.priority === "high" ? "Haute" : 
             currentCaseData.priority === "normal" ? "Normale" : "Basse"}
          </Badge>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Insured Person Information - Only show when user doesn't have insurance */}
              {currentCaseData.relocationType === "single" && 
               currentCaseData.singleInsuranceCoverage?.hasInsurance === false && (
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Informations de l'assuré</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Nom complet</span>
                      <span className="text-sm font-medium text-foreground">
                        {currentCaseData.singleInsuredData?.firstName} {currentCaseData.singleInsuredData?.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <span className="text-sm text-foreground">{currentCaseData.singleInsuredData?.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Téléphone</span>
                      <span className="text-sm text-foreground">{currentCaseData.singleInsuredData?.phone}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Vertical Separator - Only show when insured person info is present */}
              {currentCaseData.relocationType === "single" && 
               currentCaseData.singleInsuranceCoverage?.hasInsurance === false && (
                <div className="hidden lg:block w-px bg-border"></div>
              )}

              {/* Broker Information */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {currentCaseData.relocationType === "single" ? "Informations du courtier" : "Informations du contact"}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Nom complet</span>
                    <span className="text-sm font-medium text-foreground">
                      {currentCaseData.relocationType === "single" 
                        ? `${currentCaseData.singlePersonalData?.firstName} ${currentCaseData.singlePersonalData?.lastName}`
                        : `${currentCaseData.multiplePersonalData?.firstName} ${currentCaseData.multiplePersonalData?.lastName}`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="text-sm text-foreground">
                      {currentCaseData.relocationType === "single" 
                        ? currentCaseData.singlePersonalData?.email
                        : currentCaseData.multiplePersonalData?.email
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Téléphone</span>
                    <span className="text-sm text-foreground">
                      {currentCaseData.relocationType === "single" 
                        ? currentCaseData.singlePersonalData?.phone
                        : currentCaseData.multiplePersonalData?.phone
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance & Address Information */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Disaster Address Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Adresse du sinistre</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Rue</span>
                    <span className="text-sm text-foreground">
                      {currentCaseData.relocationType === "single" 
                        ? currentCaseData.singleDisasterAddress?.street
                        : currentCaseData.multipleDisasterAddress?.street
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Ville</span>
                    <span className="text-sm text-foreground">
                      {currentCaseData.relocationType === "single" 
                        ? currentCaseData.singleDisasterAddress?.city
                        : currentCaseData.multipleDisasterAddress?.city
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Code postal</span>
                    <span className="text-sm text-foreground">
                      {currentCaseData.relocationType === "single" 
                        ? currentCaseData.singleDisasterAddress?.postalCode
                        : currentCaseData.multipleDisasterAddress?.postalCode
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">
                      {currentCaseData.relocationType === "single" ? "Canton" : "Pays"}
                    </span>
                    <span className="text-sm text-foreground">
                      {currentCaseData.relocationType === "single" 
                        ? currentCaseData.singleDisasterAddress?.canton
                        : currentCaseData.multipleDisasterAddress?.country
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Vertical Separator */}
              <div className="hidden lg:block w-px bg-border"></div>

              {/* Insurance Details Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Détails de l'assurance</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">Déclaration de sinistre</span>
                    <div className="flex items-center gap-2">
                      {currentCaseData.relocationType === "single" ? (
                        currentCaseData.singleInsuranceCoverage?.hasInsurance === true ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-foreground">Oui</span>
                          </>
                        ) : currentCaseData.singleInsuranceCoverage?.hasInsurance === false ? (
                          <>
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            <span className="text-sm text-foreground">Non</span>
                          </>
                        ) : (
                          <span className="text-sm text-foreground">Non spécifié</span>
                        )
                      ) : (
                        <span className="text-sm text-foreground">Multiple demandes</span>
                      )}
                    </div>
                  </div>
                  
                  {currentCaseData.relocationType === "single" && 
                   currentCaseData.singleInsuranceCoverage?.hasInsurance === true && 
                   currentCaseData.singleInsuranceCoverage?.claimDocument && (
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Fichier</span>
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-foreground" />
                        <span className="text-sm text-foreground">Document téléchargé</span>
                      </div>
                    </div>
                  )}
                  
                  {currentCaseData.relocationType === "single" && 
                   currentCaseData.singleInsuranceCoverage?.hasInsurance === false && (
                    <>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-muted-foreground">Compagnie d'assurance</span>
                        <span className="text-sm text-foreground">
                          {currentCaseData.singleInsuranceDetails?.insuranceCompany === "other" 
                            ? currentCaseData.singleInsuranceDetails?.customInsuranceCompany
                            : currentCaseData.singleInsuranceDetails?.insuranceCompany
                          }
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-muted-foreground">Numéro de police</span>
                        <span className="text-sm text-foreground">{currentCaseData.singleInsuranceDetails?.policyNumber}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Relocation Preferences, Special Requirements & Arrival */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Relocation Preferences Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-lg">
                    <Home className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {currentCaseData.relocationType === "single" ? "Préférences" : "Demandes"}
                  </h3>
                </div>
                {currentCaseData.relocationType === "single" ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Chambres</span>
                      <span className="text-sm font-medium text-foreground">{currentCaseData.singleRelocationPreferences?.bedrooms}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Adultes</span>
                      <span className="text-sm font-medium text-foreground">{currentCaseData.singleRelocationPreferences?.adults}</span>
                    </div>
                    {currentCaseData.singleRelocationPreferences?.children && currentCaseData.singleRelocationPreferences.children > 0 && (
                      <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-muted-foreground">Enfants</span>
                        <span className="text-sm font-medium text-foreground">{currentCaseData.singleRelocationPreferences.children}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Nombre de demandes</span>
                      <span className="text-sm font-medium text-foreground">{currentCaseData.multipleRelocationRequests?.length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Total de personnes</span>
                      <span className="text-sm font-medium text-foreground">
                        {currentCaseData.multipleRelocationRequests?.reduce((total, req) => total + req.adults + req.children, 0) || 0}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Vertical Separator */}
              <div className="hidden lg:block w-px bg-border"></div>

              {/* Special Requirements Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg">
                    <PawPrint className="h-5 w-5 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Besoins spécifiques</h3>
                </div>
                {currentCaseData.relocationType === "single" ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Animaux</span>
                      <span className="text-sm text-foreground">
                        {currentCaseData.singleRelocationPreferences?.hasAnimals ? "Oui" : "Non"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Accessibilité</span>
                      <span className="text-sm text-foreground">
                        {currentCaseData.singleRelocationPreferences?.hasAccessibilityNeeds ? "Oui" : "Non"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Stationnement</span>
                      <span className="text-sm text-foreground">
                        {currentCaseData.singleRelocationPreferences?.needsParking ? "Oui" : "Non"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Avec animaux</span>
                      <span className="text-sm text-foreground">
                        {currentCaseData.multipleRelocationRequests?.filter(r => r.hasAnimals).length || 0} demandes
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Avec accessibilité</span>
                      <span className="text-sm text-foreground">
                        {currentCaseData.multipleRelocationRequests?.filter(r => r.hasAccessibilityNeeds).length || 0} demandes
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Avec stationnement</span>
                      <span className="text-sm text-foreground">
                        {currentCaseData.multipleRelocationRequests?.filter(r => r.needsParking).length || 0} demandes
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Vertical Separator */}
              <div className="hidden lg:block w-px bg-border"></div>
              
              {/* Arrival & Duration Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Le séjour</h3>
                </div>
                {currentCaseData.relocationType === "single" ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Date d'arrivée</span>
                      <span className="text-sm text-foreground">{formatDate(currentCaseData.singleArrivalDetails?.arrivalDate || "")}</span>
                    </div>
                    {currentCaseData.singleArrivalDetails?.departureDate && (
                      <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-muted-foreground">Date de départ</span>
                        <span className="text-sm text-foreground">{formatDate(currentCaseData.singleArrivalDetails.departureDate)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">
                        {currentCaseData.singleArrivalDetails?.useExactDates === true ? "Durée" : "Durée estimée"}
                      </span>
                      <span className="text-sm text-foreground">
                        {currentCaseData.singleArrivalDetails?.useExactDates === true && currentCaseData.singleArrivalDetails?.arrivalDate && currentCaseData.singleArrivalDetails?.departureDate 
                          ? `${getNumberOfNights(currentCaseData.singleArrivalDetails.arrivalDate, currentCaseData.singleArrivalDetails.departureDate)} nuits`
                          : currentCaseData.singleArrivalDetails?.estimatedDuration || "Non spécifié"
                        }
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Première arrivée</span>
                      <span className="text-sm text-foreground">
                        {currentCaseData.multipleRelocationRequests?.length ? 
                          formatDate(currentCaseData.multipleRelocationRequests[0].arrivalDate) : "Non spécifié"
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Dernière arrivée</span>
                      <span className="text-sm text-foreground">
                        {currentCaseData.multipleRelocationRequests?.length ? 
                          formatDate(currentCaseData.multipleRelocationRequests[currentCaseData.multipleRelocationRequests.length - 1].arrivalDate) : "Non spécifié"
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Durée moyenne</span>
                      <span className="text-sm text-foreground">
                        {currentCaseData.multipleRelocationRequests?.length ? 
                          `${currentCaseData.multipleRelocationRequests.length} demandes` : "Non spécifié"
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Multiple Relocation Requests - Detailed View */}
          {currentCaseData.relocationType === "multiple" && currentCaseData.multipleRelocationRequests && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Détails des demandes</h3>
              </div>
              <div className="space-y-4">
                {currentCaseData.multipleRelocationRequests.map((request, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">
                        {request.firstName} {request.lastName}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        Demande {index + 1}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Email</span>
                          <span className="text-xs text-foreground">{request.email}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Téléphone</span>
                          <span className="text-xs text-foreground">{request.phone}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Chambres</span>
                          <span className="text-xs font-medium">{request.bedrooms}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Personnes</span>
                          <span className="text-xs font-medium">{request.adults + request.children}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Arrivée</span>
                          <span className="text-xs text-foreground">{formatDate(request.arrivalDate)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {request.useExactDates ? "Départ" : "Durée"}
                          </span>
                          <span className="text-xs text-foreground">
                            {request.useExactDates && request.departureDate
                              ? formatDate(request.departureDate)
                              : request.estimatedDuration || "Non spécifié"
                            }
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Assurance</span>
                          <span className="text-xs font-medium">
                            {request.hasInsurance ? "Oui" : "Non"}
                          </span>
                        </div>
                        {request.specialNeeds && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Besoins spéciaux</span>
                            <span className="text-xs text-foreground">{request.specialNeeds}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Specific needs icons */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                      {request.hasAnimals && (
                        <PawPrint className="h-3 w-3 text-primary" />
                      )}
                      {request.hasAccessibilityNeeds && (
                        <Accessibility className="h-3 w-3 text-primary" />
                      )}
                      {request.needsParking && (
                        <Car className="h-3 w-3 text-primary" />
                      )}
                      {!request.hasAnimals && !request.hasAccessibilityNeeds && !request.needsParking && (
                        <span className="text-xs text-muted-foreground">Aucun besoin spécifique</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Technical Information */}
        <div className="space-y-6">
          {/* Agent Information */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Agent responsable</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">Nom</span>
                <span className="text-sm font-medium text-foreground">{currentCaseData.agent.name}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">Canton</span>
                <span className="text-sm font-medium text-foreground">{currentCaseData.agent.canton}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">ID Agent</span>
                <span className="text-sm font-medium text-foreground">{currentCaseData.agent.id}</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Performance</h3>
            </div>
            <div className="space-y-3">
              {currentCaseData.responseTime && (
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Délai d'acceptation</span>
                  <span className="text-sm font-medium text-foreground">{currentCaseData.responseTime} jours</span>
                </div>
              )}
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">Date de création</span>
                <span className="text-sm font-medium text-foreground">{formatDate(currentCaseData.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">Dernière mise à jour</span>
                <span className="text-sm font-medium text-foreground">{formatDate(currentCaseData.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Costs */}
          {currentCaseData.cost && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg">
                  <Wallet className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Coûts</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">Coût total</span>
                  <span className="text-sm font-bold text-green-600">CHF {currentCaseData.cost.totalCost}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Assurance</span>
                    <span className="text-sm font-medium">CHF {currentCaseData.cost.insuranceCost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Assuré</span>
                    <span className="text-sm font-medium">CHF {currentCaseData.cost.insuredCost}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customer Satisfaction */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Satisfaction client</h3>
            </div>
            <div className="space-y-3">
              {currentCaseData.status === "completed" && currentCaseData.satisfaction ? (
                <>
                  <div className="flex items-center gap-2">
                    {renderStars(currentCaseData.satisfaction.rating)}
                    <span className="text-sm font-bold text-primary">{currentCaseData.satisfaction.rating}/5</span>
                  </div>
                  {currentCaseData.satisfaction.feedback && (
                    <div className="flex justify-between items-start py-1">
                      <span className="text-sm text-muted-foreground">Commentaire</span>
                      <span className="text-sm text-foreground italic">"{currentCaseData.satisfaction.feedback}"</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">En attente du retour client</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Edit className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Actions</h3>
            </div>
            <div className="space-y-3">
              <Button className="w-full" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Modifier le dossier
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exporter le dossier
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Générer rapport
              </Button>
              <Button 
                variant="outline" 
                className={`w-full size-sm ${
                  currentCaseData.relocationType === "single" && 
                  currentCaseData.singleInsuranceCoverage?.hasInsurance === true && 
                  currentCaseData.singleInsuranceCoverage?.claimDocument
                    ? "border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                    : "border-muted text-muted-foreground cursor-not-allowed opacity-50"
                }`}
                disabled={
                  !(currentCaseData.relocationType === "single" && 
                    currentCaseData.singleInsuranceCoverage?.hasInsurance === true && 
                    currentCaseData.singleInsuranceCoverage?.claimDocument)
                }
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger déclaration
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 