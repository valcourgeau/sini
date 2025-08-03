"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Building2, Mail, Phone, MapPin, Star, Calendar } from "lucide-react";

export default function HostProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Jean",
    lastName: "Martin",
    email: "jean.martin@email.com",
    phone: "+41 79 123 45 67",
    address: "Rue du Lac 25",
    city: "Lausanne",
    postalCode: "1006",
    canton: "Vaud",
    memberSince: "2021-06-10",
    totalProperties: 3,
    averageRating: 4.8,
    totalBookings: 47,
    verificationStatus: "verified"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData({
      firstName: "Jean",
      lastName: "Martin",
      email: "jean.martin@email.com",
      phone: "+41 79 123 45 67",
      address: "Rue du Lac 25",
      city: "Lausanne",
      postalCode: "1006",
      canton: "Vaud",
      memberSince: "2021-06-10",
      totalProperties: 3,
      averageRating: 4.8,
      totalBookings: 47,
      verificationStatus: "verified"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Profil Hôte</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles et préférences</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
        >
          {isEditing ? "Annuler" : "Modifier"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations personnelles
            </CardTitle>
            <CardDescription>
              Vos coordonnées principales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Adresse
            </CardTitle>
            <CardDescription>
              Votre adresse principale
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="canton">Canton</Label>
              <Input
                id="canton"
                value={formData.canton}
                onChange={(e) => handleInputChange("canton", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Host Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Statistiques d'hôte
            </CardTitle>
            <CardDescription>
              Vos performances en tant qu'hôte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Biens disponibles</span>
              <span className="text-sm font-medium">{formData.totalProperties}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Note moyenne</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{formData.averageRating}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Réservations totales</span>
              <span className="text-sm font-medium">{formData.totalBookings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Statut de vérification</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Vérifié
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations du compte</CardTitle>
            <CardDescription>
              Détails de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Membre depuis</span>
              <span className="text-sm font-medium">
                {new Date(formData.memberSince).toLocaleDateString('fr-FR')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Type de compte</span>
              <span className="text-sm font-medium">Hôte</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Statut</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Actif
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {isEditing && (
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={handleCancel}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Enregistrer
          </Button>
        </div>
      )}
    </div>
  );
} 