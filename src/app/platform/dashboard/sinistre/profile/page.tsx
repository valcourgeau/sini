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
    firstName: "Jean", // From REL-001 contactPerson.firstName
    lastName: "Dupont", // From REL-001 contactPerson.lastName
    email: "jean.dupont@email.com", // From REL-001 contactPerson.email
    phone: "+41 22 123 45 67", // From REL-001 contactPerson.phone
    address: "Rue de la Paix 10, 1201 Genève", // From REL-001 disasterAddress
    birthDate: "15/03/1985",
    insurance: "Assurance Genève", // From REL-001 insurance.company
    policyNumber: "POL-123456", // From REL-001 insurance.policyNumber
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
    <div className="space-y-4 md:space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Mon profil</h1>
          <p className="text-black mt-2">
            Gérez vos informations personnelles
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel} className="text-black">
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
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg">
            <User className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-black">Informations personnelles</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="min-w-0 lg:border-r lg:border-border pr-4 md:pr-6 lg:pr-8">
            <div className="space-y-2 md:space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
          <span className="text-xs md:text-sm text-black">Prénom</span>
          <Input
            value={profile.firstName}
            onChange={(e) => setProfile({...profile, firstName: e.target.value})}
            disabled={!isEditing}
            className="text-xs md:text-sm font-medium text-black w-full sm:w-72"
          />
        </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Nom</span>
                <Input
                  value={profile.lastName}
                  onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                  disabled={!isEditing}
                  className="text-xs md:text-sm font-medium text-black w-full sm:w-72"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Email</span>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  disabled={!isEditing}
                  className="text-xs md:text-sm font-medium text-black w-full sm:w-72"
                />
              </div>
            </div>
          </div>
          
          <div className="min-w-0 pl-4 md:pl-6 lg:pl-8">
            <div className="space-y-2 md:space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Téléphone</span>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  disabled={!isEditing}
                  className="text-xs md:text-sm font-medium text-black w-full sm:w-72"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Adresse</span>
                <Input
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  disabled={!isEditing}
                  className="text-xs md:text-sm font-medium text-black w-full sm:w-72"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
                <span className="text-xs md:text-sm text-black">Date de naissance</span>
                <Input
                  value={profile.birthDate}
                  onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                  disabled={!isEditing}
                  className="text-xs md:text-sm font-medium text-black w-full sm:w-72"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Information */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-purple-100 rounded-lg">
            <FileText className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-black">Informations assurance</h2>
        </div>
        <div className="space-y-2 md:space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
          <span className="text-xs md:text-sm text-black">Assurance</span>
          <Input
            value={profile.insurance}
            onChange={(e) => setProfile({...profile, insurance: e.target.value})}
            disabled={!isEditing}
            className="text-xs md:text-sm font-medium text-black w-full sm:w-72"
          />
        </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
            <span className="text-xs md:text-sm text-black">Numéro de police</span>
            <Input
              value={profile.policyNumber}
              onChange={(e) => setProfile({...profile, policyNumber: e.target.value})}
              disabled={!isEditing}
              className="text-xs md:text-sm font-medium text-black w-full sm:w-72"
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-orange-100 rounded-lg">
            <Phone className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-black">Contact d'urgence</h2>
        </div>
        <div className="space-y-2 md:space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
            <span className="text-xs md:text-sm text-black">Nom</span>
            <Input
              value={profile.emergencyContact.name}
              onChange={(e) => setProfile({
                ...profile, 
                emergencyContact: {...profile.emergencyContact, name: e.target.value}
              })}
              disabled={!isEditing}
              className="text-xs md:text-sm font-medium text-black w-full sm:w-72"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
            <span className="text-xs md:text-sm text-black">Téléphone</span>
            <Input
              value={profile.emergencyContact.phone}
              onChange={(e) => setProfile({
                ...profile, 
                emergencyContact: {...profile.emergencyContact, phone: e.target.value}
              })}
              disabled={!isEditing}
              className="text-xs md:text-sm font-medium text-black w-full sm:w-72"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1 sm:gap-0">
            <span className="text-xs md:text-sm text-black">Relation</span>
            <Input
              value={profile.emergencyContact.relationship}
              onChange={(e) => setProfile({
                ...profile, 
                emergencyContact: {...profile.emergencyContact, relationship: e.target.value}
              })}
              disabled={!isEditing}
              className="text-xs md:text-sm font-medium text-black w-full sm:w-72"
            />
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-emerald-100 rounded-lg">
            <Calendar className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-black">Paramètres du compte</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm md:text-base font-medium text-black">Notifications par email</p>
              <p className="text-xs md:text-sm text-black">Recevoir les mises à jour par email</p>
            </div>
            <Button variant="outline" size="sm" className="text-black">
              Configurer
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm md:text-base font-medium text-black">Notifications SMS</p>
              <p className="text-xs md:text-sm text-black">Recevoir les alertes importantes par SMS</p>
            </div>
            <Button variant="outline" size="sm" className="text-black">
              Configurer
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm md:text-base font-medium text-black">Changer le mot de passe</p>
              <p className="text-xs md:text-sm text-black">Mettre à jour votre mot de passe</p>
            </div>
            <Button variant="outline" size="sm" className="text-black">
              Modifier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 