
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
  Heart,
  FileUp
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { StarRating } from "@/components/ui/star-rating";
import Link from "next/link";
import { RelocationData } from '@/types/relocation';
import { getCaseById, needsRelocationOptions } from '@/lib/data-loader';
import { DossierDetailClient, RelocationWarningWrapper } from '@/components/dossier-detail-client';
import { SelectedRelocationDetail } from '@/components/selected-relocation-detail';

// Generate static params for all mock case IDs
export async function generateStaticParams() {
  return [
    { id: "REL-001" },
    { id: "REL-002" },
    { id: "REL-003" },
    { id: "REL-004" },
    { id: "REL-005" },
    { id: "REL-006" },
    { id: "REL-007" },
    { id: "REL-008" },
    { id: "REL-009" },
    { id: "REL-010" },
    { id: "REL-011" },
  ];
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const caseId = id || "REL-001";

  // Get case data from centralized source
  const currentCaseData = getCaseById(caseId);

  if (!currentCaseData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-black mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-black mb-2">Dossier non trouvé</h2>
          <p className="text-black mb-4">Le dossier {caseId} n'existe pas.</p>
          <Link href="/platform/dashboard/assurance/dossiers">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux dossiers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "initie": return "text-gray-600";
      case "processing": return "text-blue-600";
      case "completed": return "text-green-600";
      case "pending": return "text-yellow-600";
      case "cancelled": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "initie": return <FileText className="h-4 w-4" />;
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
      default: return "bg-blue-100 text-blue-800";
    }
  };



  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Non spécifié";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };

  const getNumberOfNights = (arrival?: string, departure?: string): number | null => {
    if (!arrival || !departure) return null;
    try {
      const arrivalDate = new Date(arrival);
      const departureDate = new Date(departure);
      const diffTime = departureDate.getTime() - arrivalDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch (e) {
      return null;
    }
  };

  // Get the primary request for single relocations
  const primaryRequest = currentCaseData.relocationRequests[0];

  // Check if this case needs relocation options
  const needsOptions = needsRelocationOptions(currentCaseData);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header with Navigation, Status, and Actions */}
      <div>
        <Link href="/platform/dashboard/assurance/dossiers">
          <Button variant="outline" size="sm" className="mb- text-black">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-primary">Dossier {currentCaseData.id}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentCaseData.status)} bg-muted`}>
                  {currentCaseData.status === "initie" ? "Initié" : 
                   currentCaseData.status === "processing" ? "En cours" : 
                   currentCaseData.status === "completed" ? "Terminé" : 
                   currentCaseData.status === "pending" ? "En attente" : "Annulé"}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(currentCaseData.priority)}`}>
                  {currentCaseData.priority === "high" ? "Haute" : "Normale"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center justify-center w-10 h-10 p-0 text-primary"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Modifier le dossier</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center justify-center w-10 h-10 p-0 text-primary"
                  >
                    <FileUp className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Exporter le dossier</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center justify-center w-10 h-10 p-0 text-primary"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Générer rapport</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`flex items-center justify-center w-10 h-10 p-0 ${
                      currentCaseData.insurance?.hasInsurance && currentCaseData.insurance?.claimDocument
                        ? "border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                        : "border-muted text-black cursor-not-allowed opacity-50"
                    }`}
                    disabled={
                      !(currentCaseData.insurance?.hasInsurance && currentCaseData.insurance?.claimDocument)
                    }
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Télécharger déclaration de sinistre</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
            </div>

      {/* Relocation Options Notification */}
      {needsOptions && (
        <RelocationWarningWrapper caseData={currentCaseData} />
      )}

      {/* Main Content - Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Row 1: Personal Information (2 cols) + Agent Information (1 col) */}
        <div className="md:col-span-2 lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm h-full">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
              {/* Contact Person Information */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg">
                    <User className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-black">Coordonnées de l'assuré</h3>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                    <span className="text-xs md:text-sm text-black">Nom complet</span>
                    <span className="text-xs md:text-sm font-medium text-black">
                      {currentCaseData.contactPerson.firstName} {currentCaseData.contactPerson.lastName}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                    <span className="text-xs md:text-sm text-black">Email</span>
                    <span className="text-xs md:text-sm font-medium text-black break-all">{currentCaseData.contactPerson.email}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                    <span className="text-xs md:text-sm text-black">Téléphone</span>
                    <span className="text-xs md:text-sm font-medium text-black">{currentCaseData.contactPerson.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-lg">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-black">Agent responsable</h3>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Nom</span>
                <span className="text-xs md:text-sm font-medium text-black">{currentCaseData.agent?.name || "Non assigné"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Canton</span>
                <span className="text-xs md:text-sm font-medium text-black">{currentCaseData.agent?.canton || "Non assigné"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">ID Agent</span>
                <span className="text-xs md:text-sm font-medium text-black">{currentCaseData.agent?.id || "Non assigné"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Insurance & Address (2 cols) + Performance (1 col) */}
        <div className="md:col-span-2 lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Disaster Address Section */}
              <div className="min-w-0 lg:border-r lg:border-border pr-4 md:pr-6 lg:pr-8">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-lg">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-black">Adresse du sinistre</h3>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                    <span className="text-xs md:text-sm text-black">Rue</span>
                    <span className="text-xs md:text-sm font-medium text-black">{currentCaseData.disasterAddress.street}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                    <span className="text-xs md:text-sm text-black">Ville</span>
                    <span className="text-xs md:text-sm font-medium text-black">{currentCaseData.disasterAddress.city}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                    <span className="text-xs md:text-sm text-black">Code postal</span>
                    <span className="text-xs md:text-sm font-medium text-black">{currentCaseData.disasterAddress.postalCode}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                    <span className="text-xs md:text-sm text-black">
                      {currentCaseData.disasterAddress.canton ? "Canton" : "Pays"}
                    </span>
                    <span className="text-xs md:text-sm font-medium text-black">
                      {currentCaseData.disasterAddress.canton || currentCaseData.disasterAddress.country}
                    </span>
                  </div>
                </div>
              </div>


              {/* Insurance Details Section */}
              <div className="min-w-0 pl-4 md:pl-6 lg:pl-8">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-purple-100 rounded-lg">
                    <FileText className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-black">Détails de l'assurance</h3>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                    <span className="text-xs md:text-sm text-black">Assurance</span>
                    <div className="flex items-center gap-2">
                      {currentCaseData.insurance?.hasInsurance ? (
                        <>
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                          <span className="text-xs md:text-sm text-black">Oui</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-orange-500" />
                          <span className="text-xs md:text-sm text-black">Non</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {currentCaseData.insurance?.hasInsurance && currentCaseData.insurance?.company && (
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Compagnie d'assurance</span>
                      <span className="text-xs md:text-sm font-medium text-black">{currentCaseData.insurance.company}</span>
                    </div>
                  )}
                  
                  {currentCaseData.insurance?.hasInsurance && currentCaseData.insurance?.policyNumber && (
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Numéro de police</span>
                      <span className="text-xs md:text-sm font-medium text-black">{currentCaseData.insurance.policyNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-purple-100 rounded-lg">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-black">Performance</h3>
            </div>
            <div className="space-y-2 md:space-y-3">
              {currentCaseData.responseTime && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                  <span className="text-xs md:text-sm text-black">Délai d'acceptation</span>
                  <span className="text-xs md:text-sm font-medium text-black">{currentCaseData.responseTime} jours</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Date de création</span>
                <span className="text-xs md:text-sm font-medium text-black">{formatDate(currentCaseData.createdAt)}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Dernière mise à jour</span>
                <span className="text-xs md:text-sm font-medium text-black">{formatDate(currentCaseData.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Relocation Preferences (2 cols) + Costs (1 col) */}
        <div className="md:col-span-2 lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Relocation Preferences Section */}
              <div className="min-w-0 lg:border-r lg:border-border pr-4 md:pr-6 lg:pr-8">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-indigo-100 rounded-lg">
                    <Home className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-black">
                    {currentCaseData.relocationType === "single" ? "Préférences" : "Demandes"}
                  </h3>
                </div>
                {currentCaseData.relocationType === "single" ? (
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Chambres</span>
                      <span className="text-xs md:text-sm font-medium text-black">{primaryRequest.bedrooms}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Adultes</span>
                      <span className="text-xs md:text-sm font-medium text-black">{primaryRequest.adults}</span>
                    </div>
                    {primaryRequest.children && primaryRequest.children > 0 && (
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                        <span className="text-xs md:text-sm text-black">Enfants</span>
                        <span className="text-xs md:text-sm font-medium text-black">{primaryRequest.children}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Nombre de demandes</span>
                      <span className="text-xs md:text-sm font-medium text-black">{currentCaseData.relocationRequests.length}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Total de personnes</span>
                      <span className="text-xs md:text-sm font-medium text-black">
                        {currentCaseData.relocationRequests.reduce((total, req) => total + req.adults + req.children, 0)}
                      </span>
                    </div>
                  </div>
                )}
              </div>


              {/* Special Requirements Section */}
              <div className="min-w-0 lg:border-r lg:border-border pl-4 md:pl-6 lg:pl-8 pr-4 md:pr-6 lg:pr-8">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-orange-100 rounded-lg">
                    <PawPrint className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-black">Besoins spécifiques</h3>
                </div>
                {currentCaseData.relocationType === "single" ? (
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Animaux</span>
                      <span className="text-xs md:text-sm text-black">
                        {primaryRequest.hasAnimals ? "Oui" : "Non"}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Accessibilité</span>
                      <span className="text-xs md:text-sm text-black">
                        {primaryRequest.hasAccessibilityNeeds ? "Oui" : "Non"}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Stationnement</span>
                      <span className="text-xs md:text-sm text-black">
                        {primaryRequest.needsParking ? "Oui" : "Non"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Avec animaux</span>
                      <span className="text-xs md:text-sm text-black">
                        {currentCaseData.relocationRequests.filter(r => r.hasAnimals).length} demandes
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Avec accessibilité</span>
                      <span className="text-xs md:text-sm text-black">
                        {currentCaseData.relocationRequests.filter(r => r.hasAccessibilityNeeds).length} demandes
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Avec stationnement</span>
                      <span className="text-xs md:text-sm text-black">
                        {currentCaseData.relocationRequests.filter(r => r.needsParking).length} demandes
                      </span>
                    </div>
                  </div>
                )}
              </div>

              
              {/* Arrival & Duration Section */}
              <div className="min-w-0 pl-4 md:pl-6 lg:pl-8">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-emerald-100 rounded-lg">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-black">Le séjour</h3>
                </div>
                {currentCaseData.relocationType === "single" ? (
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Date d'arrivée</span>
                      <span className="text-xs md:text-sm text-black">{formatDate(primaryRequest.arrivalDate)}</span>
                    </div>
                    {primaryRequest.departureDate && (
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                        <span className="text-xs md:text-sm text-black">Date de départ</span>
                        <span className="text-xs md:text-sm text-black">{formatDate(primaryRequest.departureDate)}</span>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">
                        {primaryRequest.useExactDates ? "Durée" : "Durée estimée"}
                      </span>
                      <span className="text-xs md:text-sm text-black">
                        {primaryRequest.useExactDates && primaryRequest.arrivalDate && primaryRequest.departureDate 
                          ? `${getNumberOfNights(primaryRequest.arrivalDate, primaryRequest.departureDate)} nuits`
                          : primaryRequest.estimatedDuration || "Non spécifié"
                        }
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Première arrivée</span>
                      <span className="text-xs md:text-sm text-black">
                        {currentCaseData.relocationRequests.length ? 
                          formatDate(currentCaseData.relocationRequests[0].arrivalDate) : "Non spécifié"
                        }
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Dernière arrivée</span>
                      <span className="text-xs md:text-sm text-black">
                        {currentCaseData.relocationRequests.length ? 
                          formatDate(currentCaseData.relocationRequests[currentCaseData.relocationRequests.length - 1].arrivalDate) : "Non spécifié"
                        }
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                      <span className="text-xs md:text-sm text-black">Nombre de demandes</span>
                      <span className="text-xs md:text-sm text-black">
                        {currentCaseData.relocationRequests.length} demandes
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          {currentCaseData.cost ? (
            <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-emerald-100 rounded-lg">
                  <Wallet className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-black">Coûts</h3>
              </div>
              <div className="space-y-2 md:space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                  <span className="text-xs md:text-sm text-black">Coût total</span>
                  <span className="text-xs md:text-sm font-bold text-green-600">CHF {currentCaseData.cost.totalCost}</span>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                    <span className="text-xs md:text-sm text-black">Assurance</span>
                    <span className="text-xs md:text-sm font-medium text-black">CHF {currentCaseData.cost.insuranceCost}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                    <span className="text-xs md:text-sm text-black">Assuré</span>
                    <span className="text-xs md:text-sm font-medium text-black">CHF {currentCaseData.cost.insuredCost}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-yellow-100 rounded-lg">
                  <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-600" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-black">Satisfaction client</h3>
              </div>
              <div className="space-y-2 md:space-y-3">
                {currentCaseData.status === "completed" && currentCaseData.satisfaction ? (
                  <>
                    <div className="flex items-center gap-2">
                      <StarRating rating={currentCaseData.satisfaction.rating} />
                      <span className="text-xs md:text-sm font-bold text-primary">{currentCaseData.satisfaction.rating}/5</span>
                    </div>
                    {currentCaseData.satisfaction.feedback && (
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-1 gap-1 sm:gap-0">
                        <span className="text-xs md:text-sm text-black">Commentaire</span>
                        <span className="text-xs md:text-sm text-black italic">"{currentCaseData.satisfaction.feedback}"</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Clock className="h-6 w-6 md:h-8 md:w-8 text-black mx-auto mb-2" />
                    <p className="text-xs md:text-sm text-black">En attente du retour client</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Row 4: Multiple Relocation Requests (2 cols) + Customer Satisfaction (1 col) */}
        {currentCaseData.relocationType === "multiple" && (
          <>
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-black">Détails des demandes</h3>
                </div>
                <div className="space-y-4">
                  {currentCaseData.relocationRequests.map((request, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-black">
                          {request.firstName} {request.lastName}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          Demande {index + 1}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-black">Email</span>
                            <span className="text-xs text-black">{request.email}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-black">Téléphone</span>
                            <span className="text-xs text-black">{request.phone}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-black">Chambres</span>
                            <span className="text-xs font-medium">{request.bedrooms}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-black">Personnes</span>
                            <span className="text-xs font-medium">{request.adults + request.children}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-black">Arrivée</span>
                            <span className="text-xs text-black">{formatDate(request.arrivalDate)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-black">
                              {request.useExactDates ? "Départ" : "Durée"}
                            </span>
                            <span className="text-xs text-black">
                              {request.useExactDates && request.departureDate
                                ? formatDate(request.departureDate)
                                : request.estimatedDuration || "Non spécifié"
                              }
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-black">Assurance</span>
                            <span className="text-xs font-medium">
                              {request.hasInsurance ? "Oui" : "Non"}
                            </span>
                          </div>
                          {request.specialNeeds && (
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-black">Besoins spéciaux</span>
                              <span className="text-xs text-black">{request.specialNeeds}</span>
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
                          <span className="text-xs text-black">Aucun besoin spécifique</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-black">Satisfaction client</h3>
                </div>
                <div className="space-y-3">
                  {currentCaseData.status === "completed" && currentCaseData.satisfaction ? (
                    <>
                      <div className="flex items-center gap-2">
                        <StarRating rating={currentCaseData.satisfaction.rating} />
                        <span className="text-sm font-bold text-primary">{currentCaseData.satisfaction.rating}/5</span>
                      </div>
                      {currentCaseData.satisfaction.feedback && (
                        <div className="flex justify-between items-start py-1">
                          <span className="text-sm text-black">Commentaire</span>
                          <span className="text-sm text-black italic">"{currentCaseData.satisfaction.feedback}"</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <Clock className="h-8 w-8 text-black mx-auto mb-2" />
                      <p className="text-sm text-black">En attente du retour client</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Selected Relocation Section - Only show if there are relocation options */}
        {((currentCaseData as any).relocationOption || ((currentCaseData as any).relocationOptions && (currentCaseData as any).relocationOptions.length > 0)) && (
          <div className="md:col-span-2 lg:col-span-3">
            <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm">
              <SelectedRelocationDetail caseData={currentCaseData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 