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
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { StarRating } from "@/components/ui/star-rating";
import Link from "next/link";

import { RelocationData } from '@/types/relocation';
import { relocationCases, getDashboardStats, getCurrentMonthCases, getCurrentYearCases, getNotifications, getRecentMessages, getRecentDocuments, getUnreadNotificationsCount, getUnreadMessagesCount, getPendingDocumentsCount, getRecentConversations, getUnreadConversationsCount } from '@/lib/data-loader';

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
  const getDateRangeDisplay = (case_: RelocationData): string => {
    if (!case_.relocationRequests || case_.relocationRequests.length === 0) return "Dates non définies";
    
    const primaryRequest = case_.relocationRequests[0];
    const startDate = formatDate(primaryRequest.arrivalDate);
    
    if (primaryRequest.useExactDates && primaryRequest.departureDate) {
      const endDate = formatDate(primaryRequest.departureDate);
      return `${startDate} - ${endDate}`;
    } else if (primaryRequest.estimatedDuration) {
      return `${startDate} (${primaryRequest.estimatedDuration})`;
    } else {
      return startDate;
    }
  };



export default function AssuranceDashboard() {
  const [selectedFilter, setSelectedFilter] = useState<"agent" | "canton" | "group">("agent");
  const [selectedAgent, setSelectedAgent] = useState<string>("all");
  const [selectedCanton, setSelectedCanton] = useState<string>("all");
  const [selectedDateFilter, setSelectedDateFilter] = useState<"month" | "year" | "all">("all");

  // Load notification data
  const notifications = getNotifications('assurance');
  const recentMessages = getRecentMessages('assurance');
  const recentDocuments = getRecentDocuments('assurance');
  const recentConversations = getRecentConversations('assurance');
  const unreadNotificationsCount = getUnreadNotificationsCount('assurance');
  const unreadMessagesCount = getUnreadMessagesCount('assurance');
  const unreadConversationsCount = getUnreadConversationsCount('assurance');
  const pendingDocumentsCount = getPendingDocumentsCount('assurance');

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

  const mockRelocations = relocationCases;

  // Calculate KPIs based on filtered data
  const filteredData = mockRelocations.filter(relocation => {
    // Date filter
    if (!isDateInRange(relocation.createdAt, selectedDateFilter)) {
      return false;
    }
    
    // Agent filter
    if (selectedFilter === "agent" && selectedAgent !== "all") {
      return relocation.agent?.id === selectedAgent;
    }
    
    // Canton filter
    if (selectedFilter === "canton" && selectedCanton !== "all") {
      return relocation.agent?.canton === selectedCanton;
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
    initiatedFiles: filteredData.filter(item => item.status === "initie").length,
    pendingFiles: filteredData.filter(item => item.status === "pending").length,
    processingFiles: filteredData.filter(item => item.status === "processing").length,
    completedFiles: filteredData.filter(item => item.status === "completed").length,
    
    // Financial statistics
    costPerDay: (() => {
      const availableData = filteredData.filter(item => item.cost?.totalCost !== null && item.cost?.totalCost !== undefined);
      if (availableData.length === 0) return "N/A";
      
      const totalCost = availableData.reduce((sum, item) => sum + item.cost!.totalCost, 0);
      const totalDays = availableData.reduce((sum, item) => {
        if (item.relocationRequests && item.relocationRequests.length > 0) {
          const primaryRequest = item.relocationRequests[0];
          if (primaryRequest.useExactDates && primaryRequest.departureDate) {
            const arrival = new Date(primaryRequest.arrivalDate);
            const departure = new Date(primaryRequest.departureDate);
            const days = Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24));
            return sum + days;
          }
        }
        return sum + 30; // Default 30 days for estimated durations
      }, 0);
      
      return totalDays > 0 ? (totalCost / totalDays).toFixed(0) : "N/A";
    })(),
    
    insuranceCoveragePercentage: (() => {
      const totalFiles = filteredData.length;
      if (totalFiles === 0) return "N/A";
      
      const insuredFiles = filteredData.filter(item => item.insurance?.hasInsurance === true).length;
      return ((insuredFiles / totalFiles) * 100).toFixed(0);
    })(),
    
    averageRelocationLength: (() => {
      const availableData = filteredData.filter(item => item.relocationRequests && item.relocationRequests.length > 0);
      if (availableData.length === 0) return "N/A";
      
      const totalDays = availableData.reduce((sum, item) => {
        const primaryRequest = item.relocationRequests[0];
        if (primaryRequest.useExactDates && primaryRequest.departureDate) {
          const arrival = new Date(primaryRequest.arrivalDate);
          const departure = new Date(primaryRequest.departureDate);
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-base font-semibold text-muted-foreground cursor-help">Opérations</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Répartition des dossiers par statut de traitement</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-3xl font-bold text-primary">{kpis.totalFiles}</p>
              <p className="text-sm text-muted-foreground">Dossiers enregistrés</p>
            </div>
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center pt-3 border-t border-primary/20">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs font-medium text-gray-600 cursor-help whitespace-nowrap">Initiés</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Dossiers créés nécessitant l'initialisation de la part de notre équipe</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-medium text-primary">{kpis.initiatedFiles}</span>
                <Link 
                  href="/platform/dashboard/assurance/dossiers?status=initie"
                  className="text-xs text-primary hover:text-primary/80 transition-colors underline whitespace-nowrap"
                >
                  Voir
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs font-medium text-yellow-600 cursor-help whitespace-nowrap">En attente</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Dossiers en attente d'informations complémentaires de votre part</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-medium text-primary">{kpis.pendingFiles}</span>
                <Link 
                  href="/platform/dashboard/assurance/dossiers?status=pending"
                  className="text-xs text-primary hover:text-primary/80 transition-colors underline whitespace-nowrap"
                >
                  Voir
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs font-medium text-blue-600 cursor-help whitespace-nowrap">En cours</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Dossiers validés avec un relogement prêt ou en cours</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-medium text-primary">{kpis.processingFiles}</span>
                <Link 
                  href="/platform/dashboard/assurance/dossiers?status=processing"
                  className="text-xs text-primary hover:text-primary/80 transition-colors underline whitespace-nowrap"
                >
                  Voir
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs font-medium text-green-600 cursor-help whitespace-nowrap">Terminés</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Dossiers complètement finalisés avec relogement effectué</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-medium text-primary">{kpis.completedFiles}</span>
                <Link 
                  href="/platform/dashboard/assurance/dossiers?status=completed"
                  className="text-xs text-primary hover:text-primary/80 transition-colors underline whitespace-nowrap"
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
              <p className="text-sm text-muted-foreground">Coût moyen remboursé par séjour</p>
            </div>
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center pt-3 border-t border-primary/20">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Coût moyen par jour</span>
              <span className="text-sm font-medium text-primary flex-shrink-0">CHF {kpis.costPerDay}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Taux moyen de couverture</span>
              <span className="text-sm font-medium text-primary flex-shrink-0">{kpis.insuranceCoveragePercentage}%</span>
            </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Durée moyenne du séjour</span>
            <span className="text-sm font-medium text-primary flex-shrink-0">{kpis.averageRelocationLength} jours</span>
          </div>
          </div>
        </Card>

        {/* Client Feedback KPI */}
        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-base font-semibold text-muted-foreground">Satisfaction client</p>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <StarRating rating={parseFloat(kpis.averageSatisfaction)} className="h-6 w-6" />
                  <span className="text-2xl font-bold text-primary">{kpis.averageSatisfaction}/5</span>
                </div>
                <span className="text-sm text-muted-foreground">Sur cette période</span>
              </div>
            </div>
            <Star className="h-12 w-12 text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center pt-3 border-t border-primary/20">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-muted-foreground cursor-help whitespace-nowrap">Avis assurés</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Note moyenne de satisfaction des clients assurés sur cette période</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-sm font-medium text-primary flex-shrink-0">{kpis.averageSatisfaction}/5</span>
            </div>
            <div className="flex justify-between items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-muted-foreground cursor-help whitespace-nowrap">Délai moyen de traitement</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Temps moyen entre la soumission du dossier et l'acceptation du relogement</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-sm font-medium text-primary flex-shrink-0">{kpis.averageWaitingTime} jours</span>
            </div>
          </div>
        </Card>


      </div>



      {/* Quick Actions - Messages and Notifications */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-primary">Messages</h3>
            </div>
            <Badge variant="outline" className="text-xs">
              {unreadConversationsCount} non lu(s)
            </Badge>
          </div>
          
          <div className="space-y-3 mb-4">
            {recentConversations.slice(0, 2).map((conversation) => (
              <Link 
                key={conversation.id} 
                href={`/platform/dashboard/assurance/messages${conversation.caseId ? `?case=${conversation.caseId}` : ''}`}
                className="block"
              >
                <div className="flex items-center justify-between p-2 border border-primary/20 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${conversation.unreadCount > 0 ? 'bg-primary' : 'bg-muted-foreground'}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-primary truncate">
                        {conversation.participantName}
                        {conversation.caseId && (
                          <span className="text-muted-foreground ml-1">({conversation.caseId})</span>
                        )}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2 whitespace-nowrap">
                    {new Date(conversation.lastMessageTime).toLocaleDateString('fr-FR', { 
                      day: '2-digit', 
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <Link href="/platform/dashboard/assurance/messages">
            <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
              Voir tous les messages
            </Button>
          </Link>
        </Card>

        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-primary">Notifications</h3>
            </div>
            <Badge variant="outline" className="text-xs">
              {unreadNotificationsCount} non lu(s)
            </Badge>
          </div>
          
          <div className="space-y-3 mb-4">
            {recentMessages.slice(0, 3).map((message) => (
              <div key={message.id} className="flex items-center justify-between p-2 border border-primary/20 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${message.unread ? 'bg-primary' : 'bg-muted-foreground'}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-primary truncate">{message.from}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{message.subject}</p>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2 whitespace-nowrap">{message.date}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-primary">Documents</h3>
            </div>
            <Badge variant="outline" className="text-xs">
              {pendingDocumentsCount} en attente
            </Badge>
          </div>
          
          <div className="space-y-3 mb-4">
            {recentDocuments.slice(0, 3).map((document) => (
              <Link 
                key={document.id} 
                href={`/platform/dashboard/assurance/dossiers/${document.caseId}`}
                className="block"
              >
                <div className="flex items-center justify-between p-2 border border-primary/20 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      document.status === 'pending' ? 'bg-yellow-500' : 
                      document.status === 'uploaded' ? 'bg-blue-500' : 
                      document.status === 'signed' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-primary truncate">{document.fileName}</p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {document.clientName}
                        {document.caseId && (
                          <span className="text-muted-foreground ml-1">({document.caseId})</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2 whitespace-nowrap">{document.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>





    </div>
  );
} 