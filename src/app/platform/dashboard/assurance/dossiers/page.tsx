"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  X,
  RotateCcw
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { StarRating } from "@/components/ui/star-rating";
import Link from "next/link";

import { RelocationData } from '@/types/relocation';
import { relocationCases, getPrimaryRequest, getTotalPeople, hasSpecialNeeds, getTotalBedrooms, hasInsuranceCoverage, getArrivalDateRange, needsRelocationOptions } from '@/lib/data-loader';

// Separate component that uses useSearchParams
function AssuranceDossiersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  // Initialize filters from URL parameters on component mount
  useEffect(() => {
    const statusFromUrl = searchParams.get("status");
    const typeFromUrl = searchParams.get("type");
    const priorityFromUrl = searchParams.get("priority");
    const searchFromUrl = searchParams.get("search");

    if (statusFromUrl) setStatusFilter(statusFromUrl);
    if (typeFromUrl) setTypeFilter(typeFromUrl);
    if (priorityFromUrl) setPriorityFilter(priorityFromUrl);
    if (searchFromUrl) setSearchTerm(searchFromUrl);
  }, [searchParams]);

  // Update URL when filters change
  const updateUrl = (newStatus?: string, newType?: string, newPriority?: string, newSearch?: string) => {
    const params = new URLSearchParams();
    
    if (newStatus && newStatus !== "all") params.set("status", newStatus);
    if (newType && newType !== "all") params.set("type", newType);
    if (newPriority && newPriority !== "all") params.set("priority", newPriority);
    if (newSearch && newSearch !== "") params.set("search", newSearch);
    
    const newUrl = params.toString() ? `/platform/dashboard/assurance/dossiers?${params.toString()}` : "/platform/dashboard/assurance/dossiers";
    router.replace(newUrl);
  };

  // Use centralized mock data
  const mockRelocations = relocationCases;

  // Filter cases based on search and filters
  const filteredCases = mockRelocations.filter((case_) => {
    const matchesSearch = searchTerm === "" || 
      case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${case_.contactPerson.firstName} ${case_.contactPerson.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.disasterAddress.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    const matchesType = typeFilter === "all" || case_.relocationType === typeFilter;
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

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

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setPriorityFilter("all");
    updateUrl("all", "all", "all", "");
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

      {/* Filters - Responsive layout that wraps to two lines */}
      <div className="flex flex-wrap justify-end items-center gap-3 mb-2">
        {/* Search Input */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Par ID, nom ou ville..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                updateUrl(statusFilter, typeFilter, priorityFilter, e.target.value);
              }}
              className="pl-10 w-64 bg-background border-0 shadow-none focus-visible:ring-0 flex items-center text-sm"
            />
          </div>
        </div>
        
        <div className="w-px h-4 bg-muted-foreground/30 mx-0 hidden sm:block"></div>
        
        {/* Status Filter */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="flex gap-0.5">
            {[
              { key: "all", label: "Tous" },
              { key: "initie", label: "Initié" },
              { key: "pending", label: "En attente" },
              { key: "processing", label: "En cours" },
              { key: "completed", label: "Terminé" },
              { key: "cancelled", label: "Annulé" }
            ].map((status) => (
              <button
                key={status.key}
                onClick={() => {
                  setStatusFilter(status.key);
                  updateUrl(status.key, typeFilter, priorityFilter, searchTerm);
                }}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-medium transition-colors",
                  statusFilter === status.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="w-px h-4 bg-muted-foreground/30 mx-0 hidden sm:block"></div>
        
        {/* Type Filter */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="flex gap-0.5">
            {[
              { key: "all", label: "Tous" },
              { key: "single", label: "Simple" },
              { key: "multiple", label: "Multiple" }
            ].map((type) => (
              <button
                key={type.key}
                onClick={() => {
                  setTypeFilter(type.key);
                  updateUrl(statusFilter, type.key, priorityFilter, searchTerm);
                }}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-medium transition-colors",
                  typeFilter === type.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="w-px h-4 bg-muted-foreground/30 mx-0 hidden sm:block"></div>
        
        {/* Priority Filter */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="flex gap-0.5">
            {[
              { key: "all", label: "Toutes" },
              { key: "high", label: "Haute" },
              { key: "normal", label: "Normale" }
            ].map((priority) => (
              <button
                key={priority.key}
                onClick={() => {
                  setPriorityFilter(priority.key);
                  updateUrl(statusFilter, typeFilter, priority.key, searchTerm);
                }}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-medium transition-colors",
                  priorityFilter === priority.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                {priority.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-4 bg-muted-foreground/30 mx-0 hidden sm:block"></div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-secondary/80 transition-colors whitespace-nowrap"
          title="Réinitialiser les filtres"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Réinitialiser</span>
        </button>
      </div>

      {/* Results Summary */}
      <div>
        <span className="text-sm font-medium text-muted-foreground">
          {filteredCases.length} dossier{filteredCases.length > 1 ? 's' : ''} affiché{filteredCases.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((case_) => {
          const needsOptions = needsRelocationOptions(case_);
          
          return (
            <Card key={case_.id} className="p-6">
              {/* Header with Reference Number, Status and Priority */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-primary">
                    {case_.id}
                  </span>
                  <div className="w-px h-4 bg-muted-foreground/30"></div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(case_.status)}
                    <span className={`font-medium ${getStatusColor(case_.status)}`}>
                      {case_.status === "initie" ? "Initié" : 
                       case_.status === "processing" ? "En cours" : 
                       case_.status === "completed" ? "Terminé" : 
                       case_.status === "pending" ? "En attente" : "Annulé"}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(case_.priority)}`}>
                    {case_.priority === "high" ? "Haute" : "Normale"}
                  </span>
                  {needsOptions && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
                      Action requise
                    </span>
                  )}
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
              
              {/* Main Content with Two-Column Layout */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Personal Information - First Column */}
                <div className="flex-1">
                  <div className="space-y-4 ml-10">
                    {/* Name Section */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-lg">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">
                          {case_.contactPerson.firstName} {case_.contactPerson.lastName}
                        </p>
                      </div>
                    </div>

                    {/* Email Section */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-purple-100 rounded-lg">
                        <Mail className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">
                          {case_.contactPerson.email}
                        </p>
                      </div>
                    </div>

                    {/* Phone Section */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-lg">
                        <Phone className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">
                          {case_.contactPerson.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Separator */}
                <div className="hidden lg:block w-px bg-border"></div>

                {/* Second Column - Address and Relocation Details */}
                <div className="flex-1 flex flex-col gap-8">
                  {/* Formatted Address Line */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-red-100 rounded-lg">
                      <MapPin className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        {case_.disasterAddress?.street}, {case_.disasterAddress?.postalCode} {case_.disasterAddress?.city}, {case_.disasterAddress?.canton}
                      </p>
                    </div>
                  </div>

                  {/* Formatted Relocation Details Line */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-lg">
                      <Home className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      {case_.relocationRequests && case_.relocationRequests.length > 0 ? (
                        <p className="text-sm text-foreground">
                          {case_.relocationType === "single" ? "Simple" : "Multiple"} • {case_.relocationRequests[0]?.bedrooms || 0} chambres • {(case_.relocationRequests[0]?.adults || 0) + (case_.relocationRequests[0]?.children || 0)} personnes • {case_.relocationRequests[0]?.useExactDates && case_.relocationRequests[0]?.departureDate
                            ? `${formatDate(case_.relocationRequests[0].arrivalDate)} - ${formatDate(case_.relocationRequests[0].departureDate)} (${getNumberOfNights(case_.relocationRequests[0].arrivalDate, case_.relocationRequests[0].departureDate)} nuits)`
                            : `${formatDate(case_.relocationRequests[0]?.arrivalDate)} (${case_.relocationRequests[0]?.estimatedDuration || "Non spécifié"})`
                          }
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground"><span className="font-bold">Détails:</span> Aucune demande de relogement</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Row with Performance Metrics */}
              <div className="grid gap-4 mt-6 pt-4 border-t" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', justifyItems: 'center' }}>
                {/* Agent Responsible */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-lg">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Agent responsable</p>
                    <p className="text-xs font-medium">{case_.agent?.name || "Non assigné"}</p>
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
                
                {/* Declaration de sinistre */}
                {case_.insurance && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded-lg">
                      <File className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">Déclaration</p>
                        {case_.insurance.hasInsurance ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-3 w-3 text-orange-500" />
                        )}
                      </div>
                      {case_.insurance.hasInsurance && (
                        <div className="mt-1">
                          <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                            <Download className="h-3 w-3 mr-1" />
                            Télécharger
                          </Button>
                        </div>
                      )}
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
                        <StarRating rating={case_.satisfaction.rating} className="h-3 w-3" />
                        <span className="text-xs font-medium ml-1">{case_.satisfaction.rating}/5</span>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">En attente du retour client</p>
                    )}
                  </div>
                </div>
              </div>

            </Card>
          );
        })}
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

// Loading component for Suspense fallback
function LoadingFallback() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dossiers de relogement</h1>
        <p className="text-muted-foreground mt-2">
          Gérez et suivez tous vos dossiers de relogement
        </p>
      </div>
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function AssuranceDossiers() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AssuranceDossiersContent />
    </Suspense>
  );
} 