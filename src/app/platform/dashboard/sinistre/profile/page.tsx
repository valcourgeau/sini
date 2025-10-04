"use client";

import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  Edit, 
  Save,
  X
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SinistreProfile() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock data - in real app this would come from API
  const [profile, setProfile] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+41 22 123 45 67",
    address: "Rue de la Paix 10, 1201 Genève",
    birthDate: "15/03/1985",
    insurance: "Assurance Genève",
    policyNumber: "POL-2024-001",
    emergencyContact: {
      name: "Marie Dupont",
      phone: "+41 22 123 45 68",
      relationship: "Épouse"
    }
  });

  const handleSave = () => {
    // In real app, this would save to API
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mon profil</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos informations personnelles
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Prénom</label>
              <Input
                value={profile.firstName}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nom</label>
              <Input
                value={profile.lastName}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Téléphone</label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Adresse</label>
              <Input
                value={profile.address}
                onChange={(e) => setProfile({...profile, address: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date de naissance</label>
              <Input
                value={profile.birthDate}
                onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Insurance Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Informations assurance</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Assurance</label>
            <Input
              value={profile.insurance}
              onChange={(e) => setProfile({...profile, insurance: e.target.value})}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Numéro de police</label>
            <Input
              value={profile.policyNumber}
              onChange={(e) => setProfile({...profile, policyNumber: e.target.value})}
              disabled={!isEditing}
            />
          </div>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Contact d'urgence</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nom</label>
            <Input
              value={profile.emergencyContact.name}
              onChange={(e) => setProfile({
                ...profile, 
                emergencyContact: {...profile.emergencyContact, name: e.target.value}
              })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Téléphone</label>
            <Input
              value={profile.emergencyContact.phone}
              onChange={(e) => setProfile({
                ...profile, 
                emergencyContact: {...profile.emergencyContact, phone: e.target.value}
              })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Relation</label>
            <Input
              value={profile.emergencyContact.relationship}
              onChange={(e) => setProfile({
                ...profile, 
                emergencyContact: {...profile.emergencyContact, relationship: e.target.value}
              })}
              disabled={!isEditing}
            />
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Paramètres du compte</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Notifications par email</p>
              <p className="text-sm text-muted-foreground">Recevoir les mises à jour par email</p>
            </div>
            <Button variant="outline" size="sm">
              Configurer
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Notifications SMS</p>
              <p className="text-sm text-muted-foreground">Recevoir les alertes importantes par SMS</p>
            </div>
            <Button variant="outline" size="sm">
              Configurer
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Changer le mot de passe</p>
              <p className="text-sm text-muted-foreground">Mettre à jour votre mot de passe</p>
            </div>
            <Button variant="outline" size="sm">
              Modifier
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 