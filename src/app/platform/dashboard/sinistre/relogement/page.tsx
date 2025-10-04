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
  Utensils,
  Shield
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function SinistreRelogement() {
  // Mock data from REL-001 - in real app this would come from API
  const relocation = {
    id: "REL-001", // From REL-001 id
    status: "en_cours",
    progress: 75,
    address: "Rue de la Corraterie 15, 1204 Genève", // From REL-001 relocationOption propertyLocation
    startDate: "15 janvier 2024",
    endDate: "15 février 2024",
    contactPerson: "Jean Dupont", // From REL-001 contactPerson
    phone: "+41 22 123 45 67", // From REL-001 contactPerson
    email: "jean.dupont@email.com", // From REL-001 contactPerson
    propertyType: "Appartement 2 pièces", // From REL-001 relocationOption propertyDetails
    amenities: ["WiFi", "Cuisine équipée", "Parking", "Ascenseur"], // From REL-001 relocationOption propertyAmenities
    insurance: "Assurance Genève", // From REL-001 insurance.company
    caseNumber: "REL-001" // From REL-001 id
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
      case "terminé": return "bg-green-100 text-green-600";
      case "en_cours": return "bg-blue-100 text-blue-600";
      case "en_attente": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "terminé": return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "en_cours": return <Clock className="h-4 w-4 text-blue-600" />;
      case "en_attente": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Mon relogement</h1>
        <p className="text-black mt-2">
          Détails de votre relogement temporaire
        </p>
      </div>

      {/* Status Overview */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-black">État du relogement</h2>
            <p className="text-xs md:text-sm text-black">ID: {relocation.id}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(relocation.status)}`}>
            {relocation.status.replace('_', ' ')}
          </span>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-2">
              <span className="text-black">Progression</span>
              <span className="text-black">{relocation.progress}%</span>
            </div>
            <Progress value={relocation.progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-indigo-100 rounded-lg">
            <Home className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-black">Détails du logement</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="min-w-0 lg:border-r lg:border-border pr-4 md:pr-6 lg:pr-8">
            <div className="space-y-2 md:space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Adresse</span>
                <span className="text-xs md:text-sm font-medium text-black">{relocation.address}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Type de logement</span>
                <span className="text-xs md:text-sm font-medium text-black">{relocation.propertyType}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Période</span>
                <span className="text-xs md:text-sm font-medium text-black">
                  Du {relocation.startDate} au {relocation.endDate}
                </span>
              </div>
            </div>
          </div>
          
          <div className="min-w-0 pl-4 md:pl-6 lg:pl-8">
            <div className="space-y-2 md:space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Contact principal</span>
                <span className="text-xs md:text-sm font-medium text-black">{relocation.contactPerson}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Téléphone</span>
                <span className="text-xs md:text-sm font-medium text-black">{relocation.phone}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Email</span>
                <span className="text-xs md:text-sm font-medium text-black break-all">{relocation.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-6">
          <h3 className="text-sm md:text-base font-semibold text-black mb-3">Équipements inclus</h3>
          <div className="flex flex-wrap gap-2">
            {relocation.amenities.map((amenity) => (
              <span key={amenity} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm text-black">
                {amenity === "WiFi" && <Wifi className="h-3 w-3" />}
                {amenity === "Cuisine équipée" && <Utensils className="h-3 w-3" />}
                {amenity === "Parking" && <Car className="h-3 w-3" />}
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-emerald-100 rounded-lg">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-black">Suivi du relogement</h2>
        </div>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8">
                {getStatusIcon(item.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm md:text-base font-medium text-black">{item.step}</h3>
                  <span className="text-xs md:text-sm text-black">{item.date}</span>
                </div>
                <p className="text-xs md:text-sm text-black mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-purple-100 rounded-lg">
              <FileText className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
            </div>
            <h2 className="text-base md:text-lg font-semibold text-black">Documents</h2>
          </div>
          <Button variant="outline" size="sm" className="text-black">
            Télécharger tout
          </Button>
        </div>
        
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm md:text-base font-medium text-black">{doc.name}</p>
                  <p className="text-xs md:text-sm text-black">
                    {doc.required ? "Document requis" : "Document informatif"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                  {doc.status === "signé" ? "Signé" : 
                   doc.status === "en_attente" ? "En attente" : 
                   doc.status === "validé" ? "Validé" : 
                   doc.status === "disponible" ? "Disponible" : doc.status}
                </span>
                <Button variant="outline" size="sm" className="text-black">
                  Télécharger
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insurance Info */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg">
            <Shield className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-black">Informations assurance</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
            <span className="text-xs md:text-sm text-black">Assurance</span>
            <span className="text-xs md:text-sm font-medium text-black">{relocation.insurance}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
            <span className="text-xs md:text-sm text-black">Numéro de dossier</span>
            <span className="text-xs md:text-sm font-medium text-black">{relocation.caseNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 