"use client";

import { 
  Users, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  FileText,
  Calendar,
  DollarSign,
  BarChart3
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AssuranceDashboard() {
  // Mock data - in real app this would come from API
  const stats = {
    totalCases: 156,
    activeRelocations: 23,
    pendingCases: 8,
    completedThisMonth: 45
  };

  const recentCases = [
    {
      id: "CASE-001",
      policyholder: "Jean Dupont",
      type: "Incendie",
      status: "en_cours",
      startDate: "15/01/2024",
      priority: "haute"
    },
    {
      id: "CASE-002",
      policyholder: "Marie Martin",
      type: "Inondation",
      status: "en_attente",
      startDate: "14/01/2024",
      priority: "normale"
    },
    {
      id: "CASE-003",
      policyholder: "Pierre Durand",
      type: "Dégât des eaux",
      status: "terminé",
      startDate: "10/01/2024",
      priority: "normale"
    }
  ];

  const activeRelocations = [
    {
      id: "REL-001",
      address: "Rue du Relogement 123, Genève",
      policyholder: "Jean Dupont",
      startDate: "15/01/2024",
      endDate: "15/02/2024",
      cost: "CHF 3,200"
    },
    {
      id: "REL-002",
      address: "Avenue des Sinistrés 45, Genève",
      policyholder: "Sophie Bernard",
      startDate: "12/01/2024",
      endDate: "12/02/2024",
      cost: "CHF 2,800"
    }
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "haute": return "bg-red-100 text-red-800";
      case "normale": return "bg-blue-100 text-blue-800";
      case "basse": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
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

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total des dossiers</p>
              <p className="text-2xl font-bold text-primary">{stats.totalCases}</p>
            </div>
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Relogements actifs</p>
              <p className="text-2xl font-bold text-primary">{stats.activeRelocations}</p>
            </div>
            <Building2 className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">En attente</p>
              <p className="text-2xl font-bold text-primary">{stats.pendingCases}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Terminés ce mois</p>
              <p className="text-2xl font-bold text-primary">{stats.completedThisMonth}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Recent Cases */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary">Dossiers récents</h2>
          <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Voir tous les dossiers
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentCases.map((case_) => (
            <div key={case_.id} className="flex items-center justify-between p-4 border border-primary/20 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(case_.status)}
                  <span className={`font-medium ${getStatusColor(case_.status)}`}>
                    {case_.status.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-primary">{case_.id}</p>
                  <p className="text-sm text-muted-foreground">{case_.policyholder}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">{case_.type}</p>
                  <p className="text-xs text-muted-foreground">Début: {case_.startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(case_.priority)}`}>
                  {case_.priority}
                </span>
                <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                  Voir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Relocations */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary">Relogements actifs</h2>
          <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Voir tous les relogements
          </Button>
        </div>
        
        <div className="space-y-4">
          {activeRelocations.map((relocation) => (
            <div key={relocation.id} className="flex items-center justify-between p-4 border border-primary/20 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-4">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-primary">{relocation.id}</p>
                  <p className="text-sm text-muted-foreground">{relocation.address}</p>
                  <p className="text-xs text-muted-foreground">
                    {relocation.startDate} - {relocation.endDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">{relocation.policyholder}</p>
                  <p className="text-sm text-muted-foreground">{relocation.cost}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                  Suivre
                </Button>
                <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                  Documents
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 bg-background border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-primary">Nouveau dossier</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Créer un nouveau dossier de sinistre
          </p>
          <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Créer un dossier
          </Button>
        </Card>

        <Card className="p-4 bg-background border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-primary">Recherche logement</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Trouver un logement pour un assuré
          </p>
          <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Rechercher
          </Button>
        </Card>

        <Card className="p-4 bg-background border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-primary">Rapports</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Consulter les statistiques et rapports
          </p>
          <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Voir les rapports
          </Button>
        </Card>
      </div>
    </div>
  );
} 