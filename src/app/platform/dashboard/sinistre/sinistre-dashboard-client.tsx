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
  User
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function SinistreDashboardClient() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("ref");

  // Mock data - in real app this would come from API
  const relocationStatus = {
    status: "en_cours",
    progress: 75,
    estimatedCompletion: "2 jours",
    currentStep: "Installation en cours"
  };

  const currentRelocation = {
    address: "Rue du Relogement 123, 1201 Genève",
    startDate: "15 janvier 2024",
    endDate: "15 février 2024",
    contactPerson: "Marie Dupont",
    phone: "+41 22 123 45 67",
    email: "marie.dupont@pharewest.ch"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en_cours": return "text-blue-600";
      case "terminé": return "text-green-600";
      case "en_attente": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "en_cours": return <Clock className="h-4 w-4" />;
      case "terminé": return <CheckCircle2 className="h-4 w-4" />;
      case "en_attente": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Tableau de bord</h1>
          <p className="text-muted-foreground mt-2">
            Suivez l'avancement de votre relogement et accédez à vos informations.
          </p>
        </div>
        {caseId && (
          <div className="text-right">
            <span className="text-sm text-muted-foreground">Dossier N°</span>
            <p className="font-mono text-lg text-primary">{caseId}</p>
          </div>
        )}
      </div>

      {/* Status Overview */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary">État de votre relogement</h2>
          <div className={`flex items-center gap-2 ${getStatusColor(relocationStatus.status)}`}>
            {getStatusIcon(relocationStatus.status)}
            <span className="font-medium capitalize">
              {relocationStatus.status.replace('_', ' ')}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progression</span>
              <span>{relocationStatus.progress}%</span>
            </div>
            <Progress value={relocationStatus.progress} className="h-2" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Étape actuelle</p>
              <p className="font-medium text-primary">{relocationStatus.currentStep}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Temps estimé</p>
              <p className="font-medium text-primary">{relocationStatus.estimatedCompletion}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Current Relocation Details */}
      <Card className="p-6 bg-background border-primary/20">
        <h2 className="text-xl font-semibold mb-4 text-primary">Détails du relogement actuel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Home className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-primary">Adresse</p>
                <p className="text-muted-foreground">{currentRelocation.address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-primary">Période</p>
                <p className="text-muted-foreground">
                  Du {currentRelocation.startDate} au {currentRelocation.endDate}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-primary">Contact principal</p>
                <p className="text-muted-foreground">{currentRelocation.contactPerson}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{currentRelocation.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{currentRelocation.email}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 bg-background border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-primary">Messages</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {recentMessages.filter(m => m.unread).length} nouveau(x) message(s)
          </p>
          <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Voir les messages
          </Button>
        </Card>

        <Card className="p-4 bg-background border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-primary">Documents</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {documents.filter(d => d.status === "en_attente").length} document(s) en attente
          </p>
          <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Voir les documents
          </Button>
        </Card>

        <Card className="p-4 bg-background border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <Phone className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-primary">Support</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Besoin d'aide ? Contactez notre équipe
          </p>
          <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Contacter le support
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
          {recentMessages.map((message) => (
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