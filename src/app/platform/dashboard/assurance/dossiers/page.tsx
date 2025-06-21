"use client";

import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Download,
  Calendar,
  MapPin,
  User,
  Building2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function AssuranceDossiers() {
  // Mock data - in real app this would come from API
  const cases = [
    {
      id: "CASE-001",
      policyholder: "Jean Dupont",
      email: "jean.dupont@email.com",
      phone: "+41 22 123 45 67",
      type: "Incendie",
      status: "en_cours",
      priority: "haute",
      startDate: "15/01/2024",
      address: "Rue de la Paix 10, 1201 Genève",
      relocation: {
        status: "en_cours",
        address: "Rue du Relogement 123, 1201 Genève",
        startDate: "15/01/2024",
        endDate: "15/02/2024",
        cost: "CHF 3,200"
      },
      documents: 5,
      lastUpdate: "Il y a 2 heures"
    },
    {
      id: "CASE-002",
      policyholder: "Marie Martin",
      email: "marie.martin@email.com",
      phone: "+41 22 234 56 78",
      type: "Inondation",
      status: "en_attente",
      priority: "normale",
      startDate: "14/01/2024",
      address: "Avenue des Alpes 25, 1201 Genève",
      relocation: null,
      documents: 3,
      lastUpdate: "Hier"
    },
    {
      id: "CASE-003",
      policyholder: "Pierre Durand",
      email: "pierre.durand@email.com",
      phone: "+41 22 345 67 89",
      type: "Dégât des eaux",
      status: "terminé",
      priority: "normale",
      startDate: "10/01/2024",
      address: "Rue du Rhône 45, 1204 Genève",
      relocation: {
        status: "terminé",
        address: "Avenue de Champel 78, 1206 Genève",
        startDate: "10/01/2024",
        endDate: "10/02/2024",
        cost: "CHF 2,800"
      },
      documents: 8,
      lastUpdate: "Il y a 3 jours"
    },
    {
      id: "CASE-004",
      policyholder: "Sophie Bernard",
      email: "sophie.bernard@email.com",
      phone: "+41 22 456 78 90",
      type: "Vol",
      status: "en_cours",
      priority: "basse",
      startDate: "16/01/2024",
      address: "Rue de Lausanne 90, 1202 Genève",
      relocation: {
        status: "en_cours",
        address: "Rue de la Corraterie 12, 1204 Genève",
        startDate: "16/01/2024",
        endDate: "16/02/2024",
        cost: "CHF 2,500"
      },
      documents: 4,
      lastUpdate: "Il y a 1 heure"
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dossiers</h1>
          <p className="text-muted-foreground mt-2">
            Gérez tous vos dossiers de sinistres
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau dossier
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un dossier..."
              className="pl-10"
            />
          </div>
          
          <Select>
            <option value="">Tous les statuts</option>
            <option value="en_cours">En cours</option>
            <option value="en_attente">En attente</option>
            <option value="terminé">Terminé</option>
          </Select>
          
          <Select>
            <option value="">Tous les types</option>
            <option value="incendie">Incendie</option>
            <option value="inondation">Inondation</option>
            <option value="degat_eaux">Dégât des eaux</option>
            <option value="vol">Vol</option>
          </Select>
          
          <Select>
            <option value="">Toutes les priorités</option>
            <option value="haute">Haute</option>
            <option value="normale">Normale</option>
            <option value="basse">Basse</option>
          </Select>
        </div>
      </Card>

      {/* Cases List */}
      <div className="space-y-4">
        {cases.map((case_) => (
          <Card key={case_.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(case_.status)}
                    <span className={`font-medium ${getStatusColor(case_.status)}`}>
                      {case_.status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(case_.priority)}`}>
                    {case_.priority}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {case_.lastUpdate}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{case_.id}</h3>
                      <p className="text-muted-foreground">{case_.type}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{case_.policyholder}</p>
                        <p className="text-sm text-muted-foreground">{case_.email}</p>
                        <p className="text-sm text-muted-foreground">{case_.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Adresse du sinistre</p>
                        <p className="text-sm text-muted-foreground">{case_.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {case_.relocation ? (
                      <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Relogement en cours</p>
                          <p className="text-sm text-muted-foreground">{case_.relocation.address}</p>
                          <p className="text-sm text-muted-foreground">
                            {case_.relocation.startDate} - {case_.relocation.endDate}
                          </p>
                          <p className="text-sm font-medium text-green-600">{case_.relocation.cost}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <div>
                          <p className="text-sm font-medium text-yellow-600">Relogement nécessaire</p>
                          <p className="text-sm text-muted-foreground">Aucun relogement en cours</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{case_.documents} documents</p>
                        <p className="text-sm text-muted-foreground">Début: {case_.startDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-6">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Affichage de 1 à {cases.length} sur {cases.length} dossiers
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Précédent
          </Button>
          <Button variant="outline" size="sm">
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
} 