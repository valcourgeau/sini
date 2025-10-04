"use client";

import { 
  Home, 
  Plus, 
  Edit, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Star, 
  Users, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Eye,
  Settings,
  Image,
  Search
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function HostBiens() {
  // Mock data - in real app this would come from API
  const properties = [
    {
      id: "PROP-001",
      name: "Appartement Centre-ville",
      address: "Rue du Commerce 15, 1201 Genève",
      type: "2 pièces",
      status: "occupé",
      price: "CHF 2,100",
      rating: 4.8,
      totalBookings: 12,
      currentBooking: {
        guest: "Jean Dupont",
        startDate: "15/01/2024",
        endDate: "15/02/2024",
        revenue: "CHF 2,100"
      },
      amenities: ["WiFi", "Cuisine équipée", "Parking", "Ascenseur"],
      photos: 8,
      lastUpdate: "Il y a 2 heures"
    },
    {
      id: "PROP-002",
      name: "Studio Carouge",
      address: "Avenue de Carouge 45, 1227 Carouge",
      type: "Studio",
      status: "disponible",
      price: "CHF 1,800",
      rating: 4.6,
      totalBookings: 8,
      currentBooking: null,
      amenities: ["WiFi", "Cuisine équipée", "Balcon"],
      photos: 6,
      lastUpdate: "Hier"
    },
    {
      id: "PROP-003",
      name: "Maison Eaux-Vives",
      address: "Rue des Eaux-Vives 78, 1207 Genève",
      type: "3 pièces",
      status: "occupé",
      price: "CHF 2,100",
      rating: 4.9,
      totalBookings: 15,
      currentBooking: {
        guest: "Marie Martin",
        startDate: "10/01/2024",
        endDate: "10/02/2024",
        revenue: "CHF 2,100"
      },
      amenities: ["WiFi", "Cuisine équipée", "Jardin", "Parking", "Terrasse"],
      photos: 12,
      lastUpdate: "Il y a 1 heure"
    },
    {
      id: "PROP-004",
      name: "Loft Plainpalais",
      address: "Boulevard du Pont-d'Arve 23, 1205 Genève",
      type: "Loft",
      status: "maintenance",
      price: "CHF 2,500",
      rating: 4.7,
      totalBookings: 6,
      currentBooking: null,
      amenities: ["WiFi", "Cuisine équipée", "Espace de travail", "Vue"],
      photos: 10,
      lastUpdate: "Il y a 3 jours"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupé": return "text-red-600";
      case "disponible": return "text-green-600";
      case "maintenance": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "occupé": return <Users className="h-4 w-4" />;
      case "disponible": return <CheckCircle2 className="h-4 w-4" />;
      case "maintenance": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mes biens</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos propriétés et leurs disponibilités
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un bien
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un bien..."
              className="pl-10"
            />
          </div>
          
          <Select>
            <option value="">Tous les statuts</option>
            <option value="disponible">Disponible</option>
            <option value="occupé">Occupé</option>
            <option value="maintenance">Maintenance</option>
          </Select>
          
          <Select>
            <option value="">Tous les types</option>
            <option value="studio">Studio</option>
            <option value="2_pieces">2 pièces</option>
            <option value="3_pieces">3 pièces</option>
            <option value="loft">Loft</option>
          </Select>
          
          <Select>
            <option value="">Trier par</option>
            <option value="recent">Plus récent</option>
            <option value="rating">Note</option>
            <option value="revenue">Revenus</option>
          </Select>
        </div>
      </Card>

      {/* Properties Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            {/* Property Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <div className="text-center">
                <Image className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">{property.photos} photos</p>
              </div>
            </div>

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{property.name}</h3>
                  <p className="text-muted-foreground">{property.type}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{property.address}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-semibold">{property.rating}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <p className="text-xs text-muted-foreground">Note</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">{property.totalBookings}</p>
                  <p className="text-xs text-muted-foreground">Réservations</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">{property.price}</p>
                  <p className="text-xs text-muted-foreground">Prix/nuit</p>
                </div>
              </div>

              {/* Current Booking */}
              {property.currentBooking && (
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Réservation en cours</p>
                      <p className="text-xs text-blue-700">{property.currentBooking.guest}</p>
                      <p className="text-xs text-blue-700">
                        {property.currentBooking.startDate} - {property.currentBooking.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Amenities */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Équipements</p>
                <div className="flex flex-wrap gap-1">
                  {property.amenities.slice(0, 3).map((amenity) => (
                    <span key={amenity} className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      +{property.amenities.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Voir
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              {/* Last Update */}
              <p className="text-xs text-muted-foreground mt-3">
                Mis à jour {property.lastUpdate}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total des biens</p>
              <p className="text-2xl font-bold">{properties.length}</p>
            </div>
            <Home className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Disponibles</p>
              <p className="text-2xl font-bold">
                {properties.filter(p => p.status === "disponible").length}
              </p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Occupés</p>
              <p className="text-2xl font-bold">
                {properties.filter(p => p.status === "occupé").length}
              </p>
            </div>
            <Users className="h-8 w-8 text-red-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">En maintenance</p>
              <p className="text-2xl font-bold">
                {properties.filter(p => p.status === "maintenance").length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
      </div>
    </div>
  );
} 