"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Building2, Mail, Phone, MapPin, Shield } from "lucide-react";

export default function AssuranceProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "Assurance Suisse SA",
    contactPerson: "Marie Dupont",
    email: "marie.dupont@assurance-suisse.ch",
    phone: "+41 22 123 45 67",
    address: "Rue de la Corraterie 15",
    city: "Genève",
    postalCode: "1204",
    canton: "Genève",
    licenseNumber: "CH-123456789",
    specialties: ["Habitation", "Responsabilité civile", "Assurance vie"],
    memberSince: "2020-03-15"
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
      companyName: "Assurance Suisse SA",
      contactPerson: "Marie Dupont",
      email: "marie.dupont@assurance-suisse.ch",
      phone: "+41 22 123 45 67",
      address: "Rue de la Corraterie 15",
      city: "Genève",
      postalCode: "1204",
      canton: "Genève",
      licenseNumber: "CH-123456789",
      specialties: ["Habitation", "Responsabilité civile", "Assurance vie"],
      memberSince: "2020-03-15"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Profil Assurance</h1>
          <p className="text-muted-foreground">Gérez vos informations de contact et préférences</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
        >
          {isEditing ? "Annuler" : "Modifier"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Informations de l'entreprise
            </CardTitle>
            <CardDescription>
              Détails de votre compagnie d'assurance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nom de l'entreprise</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Personne de contact</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">Numéro de licence</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations de contact
            </CardTitle>
            <CardDescription>
              Vos coordonnées principales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        {/* Specialties */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Spécialités
            </CardTitle>
            <CardDescription>
              Types d'assurance que vous proposez
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                >
                  {specialty}
                </span>
              ))}
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
              <span className="text-sm font-medium">Assurance</span>
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