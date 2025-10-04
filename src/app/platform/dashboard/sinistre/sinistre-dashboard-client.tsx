"use client";

import { useSearchParams } from "next/navigation";
import { 
  Home, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  MessageSquare,
  User,
  Banknote,
  Shield,
  TrendingUp
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function SinistreDashboardClient() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("ref");

  // Mock data - in real app this would come from API
  const relocationStatus = {
    status: "processing",
    progress: 75,
    estimatedCompletion: "2 jours",
    currentStep: "Installation en cours"
  };

  const currentRelocation = {
    address: "Rue de la Corraterie 15, 1204 Genève",
    startDate: "15 janvier 2024",
    endDate: "15 février 2024",
    contactPerson: "Jean Dupont",
    phone: "+41 22 123 45 67",
    email: "jean.dupont@email.com"
  };

  const recentMessages = [
    {
      id: 1,
      from: "Assurance Genève",
      subject: "Confirmation de relogement",
      date: "Il y a 2 heures",
      unread: true
    },
    {
      id: 2,
      from: "Marie Dupont",
      subject: "Visite de l'appartement",
      date: "Hier",
      unread: false
    }
  ];

  const documents = [
    { name: "Contrat de relogement", status: "signé", date: "14/01/2024" },
    { name: "Inventaire des biens", status: "en_attente", date: "15/01/2024" },
    { name: "Attestation d'assurance", status: "validé", date: "13/01/2024" }
  ];

  // Insurance coverage data - relocation portion only (temporary accommodation)
  const insuranceCoverage = {
    policyNumber: "POL-123456",
    company: "Assurance Genève",
    dailyRate: 180, // Based on PROP-GVA-001 pricing
    maxCoverage: 5000, // Relocation coverage limit (temporary accommodation only)
    spentAmount: 2800, // From REL-001 cost.insuranceCost
    remainingCoverage: 2200,
    coveragePercentage: 56.0,
    remainingDays: 12, // Calculated from remainingCoverage / dailyRate
    status: "active",
    coverageStartDate: "15 janvier 2024",
    estimatedEndDate: "15 février 2024",
    deductible: 400, // From REL-001 cost.insuredCost
    totalClaimAmount: 3200 // From REL-001 cost.totalCost
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case "initie": return "bg-grey-100 text-gray-600";
      case "processing": return "bg-blue-100 text-blue-600";
      case "completed": return "bg-green-100 text-green-600";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-600";
      default: return "bg-grey-100 text-gray-600";
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

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Tableau de bord</h1>
          <p className="text-black mt-2">
            Suivez l'avancement de votre relogement et accédez à vos informations.
          </p>
        </div>
        {caseId && (
          <div className="text-right">
            <span className="text-sm text-black">Dossier N°</span>
            <p className="font-mono text-lg text-primary">{caseId}</p>
          </div>
        )}
      </div>

      {/* Status Overview */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-black">État de votre relogement</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(relocationStatus.status)}`}>
            {relocationStatus.status === "initie" ? "Initié" : 
             relocationStatus.status === "processing" ? "En cours" : 
             relocationStatus.status === "completed" ? "Terminé" : 
             relocationStatus.status === "pending" ? "En attente" : "Annulé"}
          </span>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2 text-black">
              <span>Progression</span>
              <span>{relocationStatus.progress}%</span>
            </div>
            <Progress value={relocationStatus.progress} className="h-2" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-black">Étape actuelle</p>
              <p className="font-medium text-primary">{relocationStatus.currentStep}</p>
            </div>
            <div>
              <p className="text-sm text-black">Temps estimé</p>
              <p className="font-medium text-primary">{relocationStatus.estimatedCompletion}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Current Relocation Details */}
      <Card className="p-6 bg-background border-primary/20">
        <h2 className="text-xl font-semibold mb-6 text-black">Détails du relogement</h2>
        
        {/* Main Content - Responsive Wrapping Layout */}
        <div className="flex flex-wrap items-center justify-between w-full gap-2 sm:gap-3 md:gap-4">
          {/* Name */}
          <div className="flex items-center gap-2 min-w-0 flex-shrink-0" style={{ minWidth: '140px' }}>
            <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-lg flex-shrink-0">
              <User className="h-4 w-4 sm:h-4 sm:w-4 text-blue-600" />
            </div>
            <p className="text-xs sm:text-sm text-black leading-none whitespace-nowrap">
              {currentRelocation.contactPerson}
            </p>
          </div>

          {/* Separator */}
          <div className="w-px h-4 bg-border flex-shrink-0 hidden sm:block"></div>

          {/* Phone */}
          <div className="flex items-center gap-2 min-w-0 flex-shrink-0" style={{ minWidth: '120px' }}>
            <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-lg flex-shrink-0">
              <Phone className="h-4 w-4 sm:h-4 sm:w-4 text-green-600" />
            </div>
            <p className="text-xs sm:text-sm text-black leading-none whitespace-nowrap">
              {currentRelocation.phone}
            </p>
          </div>

          {/* Separator */}
          <div className="w-px h-4 bg-border flex-shrink-0 hidden md:block"></div>

          {/* Address */}
          <div className="flex items-center gap-2 min-w-0 flex-shrink-0" style={{ minWidth: '160px' }}>
            <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-red-100 rounded-lg flex-shrink-0">
              <MapPin className="h-4 w-4 sm:h-4 sm:w-4 text-red-600" />
            </div>
            <p className="text-xs sm:text-sm text-black leading-none whitespace-nowrap">
              {currentRelocation.address}
            </p>
          </div>

          {/* Separator */}
          <div className="w-px h-4 bg-border flex-shrink-0 hidden lg:block"></div>

          {/* Dates */}
          <div className="flex items-center gap-2 min-w-0 flex-shrink-0" style={{ minWidth: '180px' }}>
            <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-emerald-100 rounded-lg flex-shrink-0">
              <Calendar className="h-4 w-4 sm:h-4 sm:w-4 text-emerald-600" />
            </div>
            <p className="text-xs sm:text-sm text-black leading-none whitespace-nowrap">
              Du {currentRelocation.startDate} au {currentRelocation.endDate}
            </p>
          </div>

          {/* Separator */}
          <div className="w-px h-4 bg-border flex-shrink-0 hidden xl:block"></div>

          {/* Email */}
          <div className="flex items-center gap-2 min-w-0 flex-shrink-0" style={{ minWidth: '180px' }}>
            <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded-lg flex-shrink-0">
              <Mail className="h-4 w-4 sm:h-4 sm:w-4 text-purple-600" />
            </div>
            <p className="text-xs sm:text-sm text-black leading-none whitespace-nowrap">
              {currentRelocation.email}
            </p>
          </div>
        </div>
      </Card>

      {/* Insurance Coverage Summary */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-semibold text-black">Couverture d'assurance</h2>
        </div>
        
        {/* Policy Information */}
        <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-medium text-black">{insuranceCoverage.company}</div>
              <div className="text-sm text-gray-600">Police {insuranceCoverage.policyNumber}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Montant total du sinistre</div>
              <div className="font-bold text-primary">{insuranceCoverage.totalClaimAmount.toLocaleString()} CHF</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Franchise: {insuranceCoverage.deductible} CHF • Taux journalier: {insuranceCoverage.dailyRate} CHF/jour
          </div>
        </div>
        
        {/* Main Coverage Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-1">
              {insuranceCoverage.spentAmount.toLocaleString()}
            </div>
            <div className="text-sm text-black">CHF remboursés</div>
          </div>
          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-1">
              {insuranceCoverage.remainingCoverage.toLocaleString()}
            </div>
            <div className="text-sm text-black">CHF disponibles</div>
          </div>
          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-1">
              {insuranceCoverage.remainingDays}
            </div>
            <div className="text-sm text-black">jours couverts</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-black">Utilisation de la couverture</span>
            <span className="font-medium text-primary">{insuranceCoverage.coveragePercentage}%</span>
          </div>
          <Progress value={insuranceCoverage.coveragePercentage} className="h-3" />
        </div>
        
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 bg-background border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-black">Messages</h3>
          </div>
          <p className="text-sm text-black mb-3">
            {recentMessages.filter(m => m.unread).length} nouveau(x) message(s)
          </p>
          <Button variant="outline" size="sm" className="w-full border-primary/20 text-black hover:bg-primary hover:text-primary-foreground">
            Voir les messages
          </Button>
        </Card>

        <Card className="p-4 bg-background border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-black">Documents</h3>
          </div>
          <p className="text-sm text-black mb-3">
            {documents.filter(d => d.status === "en_attente").length} document(s) en attente
          </p>
          <Button variant="outline" size="sm" className="w-full border-primary/20 text-black hover:bg-primary hover:text-primary-foreground">
            Voir les documents
          </Button>
        </Card>

        <Card className="p-4 bg-background border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <Phone className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-black">Support</h3>
          </div>
          <p className="text-sm text-black mb-3">
            Besoin d'aide ? Contactez notre équipe
          </p>
          <Button variant="outline" size="sm" className="w-full border-primary/20 text-black hover:bg-primary hover:text-primary-foreground">
            Contacter le support
          </Button>
        </Card>
      </div>

      {/* Recent Messages */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-black">Messages récents</h2>
          <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Voir tout
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentMessages.map((message) => (
            <div key={message.id} className="flex items-center justify-between p-3 border border-primary/20 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${message.unread ? 'bg-primary' : 'bg-muted-foreground'}`} />
                <div>
                  <p className="font-medium text-black">{message.from}</p>
                  <p className="text-sm text-black">{message.subject}</p>
                </div>
              </div>
              <span className="text-sm text-black">{message.date}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 