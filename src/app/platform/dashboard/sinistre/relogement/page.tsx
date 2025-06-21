"use client";

import { 
  Home, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  User,
  Building2,
  Car,
  Wifi,
  Utensils
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function SinistreRelogement() {
  // Mock data - in real app this would come from API
  const relocation = {
    id: "REL-2024-001",
    status: "en_cours",
    progress: 75,
    address: "Rue du Relogement 123, 1201 Genève",
    startDate: "15 janvier 2024",
    endDate: "15 février 2024",
    contactPerson: "Marie Dupont",
    phone: "+41 22 123 45 67",
    email: "marie.dupont@pharewest.ch",
    propertyType: "Appartement 2 pièces",
    amenities: ["WiFi", "Cuisine équipée", "Parking", "Ascenseur"],
    insurance: "Assurance Genève",
    caseNumber: "CASE-2024-001"
  };

  const timeline = [
    {
      step: "Demande de relogement",
      date: "10 janvier 2024",
      status: "terminé",
      description: "Demande transmise à l'assurance"
    },
    {
      step: "Validation assurance",
      date: "12 janvier 2024",
      status: "terminé",
      description: "Relogement approuvé par l'assurance"
    },
    {
      step: "Recherche logement",
      date: "13 janvier 2024",
      status: "terminé",
      description: "Logement trouvé et réservé"
    },
    {
      step: "Installation",
      date: "15 janvier 2024",
      status: "en_cours",
      description: "Installation en cours dans le nouveau logement"
    },
    {
      step: "Finalisation",
      date: "16 janvier 2024",
      status: "en_attente",
      description: "Vérification finale et remise des clés"
    }
  ];

  const documents = [
    { name: "Contrat de relogement", status: "signé", date: "14/01/2024", required: true },
    { name: "Inventaire des biens", status: "en_attente", date: "15/01/2024", required: true },
    { name: "Attestation d'assurance", status: "validé", date: "13/01/2024", required: true },
    { name: "Plan d'évacuation", status: "disponible", date: "15/01/2024", required: false }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "terminé": return "text-green-600";
      case "en_cours": return "text-blue-600";
      case "en_attente": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "terminé": return <CheckCircle2 className="h-4 w-4" />;
      case "en_cours": return <Clock className="h-4 w-4" />;
      case "en_attente": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Mon relogement</h1>
        <p className="text-muted-foreground mt-2">
          Détails de votre relogement temporaire
        </p>
      </div>

      {/* Status Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">État du relogement</h2>
            <p className="text-sm text-muted-foreground">ID: {relocation.id}</p>
          </div>
          <div className={`flex items-center gap-2 ${getStatusColor(relocation.status)}`}>
            {getStatusIcon(relocation.status)}
            <span className="font-medium capitalize">
              {relocation.status.replace('_', ' ')}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progression</span>
              <span>{relocation.progress}%</span>
            </div>
            <Progress value={relocation.progress} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Property Details */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Détails du logement</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Home className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Adresse</p>
                <p className="text-muted-foreground">{relocation.address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Type de logement</p>
                <p className="text-muted-foreground">{relocation.propertyType}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Période</p>
                <p className="text-muted-foreground">
                  Du {relocation.startDate} au {relocation.endDate}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Contact principal</p>
                <p className="text-muted-foreground">{relocation.contactPerson}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{relocation.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{relocation.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Équipements inclus</h3>
          <div className="flex flex-wrap gap-2">
            {relocation.amenities.map((amenity) => (
              <span key={amenity} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                {amenity === "WiFi" && <Wifi className="h-3 w-3" />}
                {amenity === "Cuisine équipée" && <Utensils className="h-3 w-3" />}
                {amenity === "Parking" && <Car className="h-3 w-3" />}
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Suivi du relogement</h2>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getStatusColor(item.status)} bg-opacity-10`}>
                {getStatusIcon(item.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{item.step}</h3>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Documents */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Documents</h2>
          <Button variant="outline" size="sm">
            Télécharger tout
          </Button>
        </div>
        
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {doc.required ? "Document requis" : "Document informatif"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
                <Button variant="outline" size="sm">
                  Télécharger
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Insurance Info */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Informations assurance</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Assurance</p>
            <p className="font-medium">{relocation.insurance}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Numéro de dossier</p>
            <p className="font-medium">{relocation.caseNumber}</p>
          </div>
        </div>
      </Card>
    </div>
  );
} 