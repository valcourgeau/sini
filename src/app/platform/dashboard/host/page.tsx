"use client";

import { 
  Home, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Users,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function HostDashboard() {
  // Mock data - in real app this would come from API
  const stats = {
    totalProperties: 3,
    activeBookings: 2,
    monthlyRevenue: "CHF 4,200",
    occupancyRate: 78,
    totalEarnings: "CHF 12,450"
  };

  const properties = [
    {
      id: "PROP-001",
      name: "Appartement Centre-ville",
      address: "Rue du Commerce 15, 1201 Genève",
      type: "2 pièces",
      status: "occupé",
      currentBooking: {
        guest: "Jean Dupont",
        startDate: "15/01/2024",
        endDate: "15/02/2024",
        revenue: "CHF 2,100"
      },
      rating: 4.8,
      totalBookings: 12
    },
    {
      id: "PROP-002",
      name: "Studio Carouge",
      address: "Avenue de Carouge 45, 1227 Carouge",
      type: "Studio",
      status: "disponible",
      currentBooking: null,
      rating: 4.6,
      totalBookings: 8
    },
    {
      id: "PROP-003",
      name: "Maison Eaux-Vives",
      address: "Rue des Eaux-Vives 78, 1207 Genève",
      type: "3 pièces",
      status: "occupé",
      currentBooking: {
        guest: "Marie Martin",
        startDate: "10/01/2024",
        endDate: "10/02/2024",
        revenue: "CHF 2,100"
      },
      rating: 4.9,
      totalBookings: 15
    }
  ];

  const upcomingBookings = [
    {
      id: "BOOK-001",
      property: "Studio Carouge",
      guest: "Pierre Durand",
      startDate: "20/01/2024",
      endDate: "20/02/2024",
      revenue: "CHF 1,800",
      status: "confirmé"
    },
    {
      id: "BOOK-002",
      property: "Appartement Centre-ville",
      guest: "Sophie Bernard",
      startDate: "25/01/2024",
      endDate: "25/02/2024",
      revenue: "CHF 2,100",
      status: "en_attente"
    }
  ];

  const recentEarnings = [
    { month: "Janvier 2024", amount: "CHF 4,200" },
    { month: "Décembre 2023", amount: "CHF 3,800" },
    { month: "Novembre 2023", amount: "CHF 4,450" }
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

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case "confirmé": return "bg-green-100 text-green-800";
      case "en_attente": return "bg-yellow-100 text-yellow-800";
      case "annulé": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Tableau de bord Hôte</h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos biens et suivez vos revenus
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total des biens</p>
              <p className="text-2xl font-bold text-primary">{stats.totalProperties}</p>
            </div>
            <Home className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Réservations actives</p>
              <p className="text-2xl font-bold text-primary">{stats.activeBookings}</p>
            </div>
            <Calendar className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Revenus du mois</p>
              <p className="text-2xl font-bold text-primary">{stats.monthlyRevenue}</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Taux d'occupation</p>
              <p className="text-2xl font-bold text-primary">{stats.occupancyRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-background border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Gains totaux</p>
              <p className="text-2xl font-bold text-primary">{stats.totalEarnings}</p>
            </div>
            <Star className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Properties Overview */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary">Mes biens</h2>
          <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Ajouter un bien
          </Button>
        </div>
        
        <div className="space-y-4">
          {properties.map((property) => (
            <div key={property.id} className="flex items-center justify-between p-4 border border-primary/20 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-4">
                <Home className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-primary">{property.name}</p>
                  <p className="text-sm text-muted-foreground">{property.address}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{property.type}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-primary fill-current" />
                      <span className="text-xs text-primary">{property.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {property.totalBookings} réservations
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className={`flex items-center gap-2 ${getStatusColor(property.status)}`}>
                    {getStatusIcon(property.status)}
                    <span className="font-medium capitalize">{property.status}</span>
                  </div>
                  {property.currentBooking && (
                    <p className="text-sm text-muted-foreground">
                      {property.currentBooking.revenue}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                    Gérer
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                    Calendrier
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Bookings */}
      <Card className="p-6 bg-background border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary">Réservations à venir</h2>
          <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
            Voir toutes les réservations
          </Button>
        </div>
        
        <div className="space-y-3">
          {upcomingBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 border border-primary/20 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-4">
                <Calendar className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-primary">{booking.property}</p>
                  <p className="text-sm text-muted-foreground">{booking.guest}</p>
                  <p className="text-xs text-muted-foreground">
                    {booking.startDate} - {booking.endDate}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium text-primary">{booking.revenue}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
                    {booking.status.replace('_', ' ')}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                  Détails
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Revenue Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-background border-primary/20">
          <h3 className="text-lg font-semibold mb-4 text-primary">Revenus récents</h3>
          <div className="space-y-3">
            {recentEarnings.map((earning, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-primary/20 rounded-lg bg-secondary/50">
                <span className="font-medium text-primary">{earning.month}</span>
                <span className="text-primary font-semibold">{earning.amount}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-background border-primary/20">
          <h3 className="text-lg font-semibold mb-4 text-primary">Actions rapides</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              Gérer les disponibilités
            </Button>
            <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
              <DollarSign className="h-4 w-4 mr-2" />
              Voir les rapports financiers
            </Button>
            <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
              <Home className="h-4 w-4 mr-2" />
              Ajouter un nouveau bien
            </Button>
            <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
              <Users className="h-4 w-4 mr-2" />
              Contacter le support
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 