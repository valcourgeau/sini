"use client";

import { 
  Home, 
  MapPin, 
  Users, 
  Bed, 
  Car, 
  PawPrint, 
  Accessibility, 
  Star,
  Calendar,
  Wallet,
  Building2,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StarRating } from "@/components/ui/star-rating";
import { RelocationData } from "@/types/relocation";

interface SelectedRelocationDetailProps {
  caseData: RelocationData;
}

export function SelectedRelocationDetail({ caseData }: SelectedRelocationDetailProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Non spécifié";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case 'apartment': return 'Appartement';
      case 'house': return 'Maison';
      case 'studio': return 'Studio';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "text-blue-600";
      case "completed": return "text-green-600";
      case "pending": return "text-yellow-600";
      case "cancelled": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <Clock className="h-4 w-4" />;
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      case "pending": return <AlertTriangle className="h-4 w-4" />;
      case "cancelled": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmé";
      case "completed": return "Terminé";
      case "pending": return "En attente";
      case "cancelled": return "Annulé";
      default: return status;
    }
  };

  // Check if there are any relocation options
  const hasRelocationOption = caseData.relocationOption;
  const hasRelocationOptions = caseData.relocationOptions && caseData.relocationOptions.length > 0;

  if (!hasRelocationOption && !hasRelocationOptions) {
    return null;
  }

  // Early return if no single relocation option
  if (!caseData.relocationOption) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
          <Home className="h-5 w-5 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-black">
          {hasRelocationOptions ? "Options de relogement sélectionnées" : "Option de relogement sélectionnée"}
        </h3>
      </div>

      {/* Single Relocation Option */}
      {hasRelocationOption && (
        <Card className="p-6 border-2 border-primary/20 text-black">
          {/* Status and Property Type */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {getStatusIcon(caseData.relocationOption.status)}
              <span className={`text-sm font-medium ${getStatusColor(caseData.relocationOption.status)}`}>
                {getStatusLabel(caseData.relocationOption.status)}
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              {getPropertyTypeLabel(caseData.relocationOption.propertyType)}
            </Badge>
          </div>

          {/* Property Title */}
          <h4 className="font-semibold text-lg mb-2 line-clamp-2">
            {caseData.relocationOption.propertyDetails.title}
          </h4>

          {/* Location */}
          <div className="flex items-center gap-2 text-black mb-3">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              {caseData.relocationOption.propertyLocation.street}, {caseData.relocationOption.propertyLocation.city}
            </span>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-black" />
              <span className="text-sm">{caseData.relocationOption.propertyDetails.bedrooms} chambre{caseData.relocationOption.propertyDetails.bedrooms > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-black" />
              <span className="text-sm">Max {caseData.relocationOption.propertyDetails.maxGuests} pers.</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-black" />
              <span className="text-sm">Sélectionné le {formatDate(caseData.relocationOption.selectedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-black" />
              <span className="text-sm font-medium">CHF {caseData.relocationOption.propertyPricing.prices.month}/mois</span>
            </div>
          </div>

          {/* Special Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {caseData.relocationOption.propertyAmenities.hasAccessibility && (
              <Badge variant="outline" className="text-xs text-primary">
                <Accessibility className="h-3 w-3 mr-1" />
                PMR
              </Badge>
            )}
            {caseData.relocationOption.propertyAmenities.hasParking && (
              <Badge variant="outline" className="text-xs text-primary">
                <Car className="h-3 w-3 mr-1" />
                Parking
              </Badge>
            )}
            {caseData.relocationOption.propertyAmenities.hasGarden && (
              <Badge variant="outline" className="text-xs text-primary">
                <Home className="h-3 w-3 mr-1" />
                Jardin
              </Badge>
            )}
            {caseData.relocationOption.propertyAmenities.hasBalcony && (
              <Badge variant="outline" className="text-xs text-primary">
                <Home className="h-3 w-3 mr-1" />
                Balcon
              </Badge>
            )}
          </div>

          {/* Insurance Pricing */}
          <div className="mt-4 p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">Prix assurance</span>
              <span className="text-lg font-bold text-primary">
                CHF {caseData.relocationOption.propertyPricing.prices.month}
              </span>
            </div>
            <p className="text-xs text-black mt-1">
              Factures incluses • Caution: CHF {caseData.relocationOption.propertyPricing.securityDeposit}
            </p>
          </div>
        </Card>
      )}

      {/* Multiple Relocation Options */}
      {hasRelocationOptions && caseData.relocationOptions && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseData.relocationOptions.map((option, index) => (
            <Card key={option.propertyId} className="p-6 border-2 border-primary/20">
              {/* Option Number and Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    Option {index + 1}
                  </Badge>
                  {getStatusIcon(option.status)}
                  <span className={`text-xs font-medium ${getStatusColor(option.status)}`}>
                    {getStatusLabel(option.status)}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {getPropertyTypeLabel(option.propertyType)}
                </Badge>
              </div>

              {/* Property Title */}
              <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                {option.propertyDetails.title}
              </h4>

              {/* Location */}
              <div className="flex items-center gap-2 text-black mb-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  {option.propertyLocation.street}, {option.propertyLocation.city}
                </span>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-black" />
                  <span className="text-sm">{option.propertyDetails.bedrooms} chambre{option.propertyDetails.bedrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-black" />
                  <span className="text-sm">Max {option.propertyDetails.maxGuests} pers.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-black" />
                  <span className="text-sm">Sélectionné le {formatDate(option.selectedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-black" />
                  <span className="text-sm font-medium">CHF {option.propertyPricing.prices.month}/mois</span>
                </div>
              </div>

              {/* Special Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {option.propertyAmenities.hasAccessibility && (
                  <Badge variant="outline" className="text-xs">
                    <Accessibility className="h-3 w-3 mr-1" />
                    PMR
                  </Badge>
                )}
                {option.propertyAmenities.hasParking && (
                  <Badge variant="outline" className="text-xs">
                    <Car className="h-3 w-3 mr-1" />
                    Parking
                  </Badge>
                )}
                {option.propertyAmenities.hasGarden && (
                  <Badge variant="outline" className="text-xs">
                    <Home className="h-3 w-3 mr-1" />
                    Jardin
                  </Badge>
                )}
                {option.propertyAmenities.hasBalcony && (
                  <Badge variant="outline" className="text-xs">
                    <Home className="h-3 w-3 mr-1" />
                    Balcon
                  </Badge>
                )}
              </div>

              {/* Insurance Pricing */}
              <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">Prix assurance</span>
                  <span className="text-lg font-bold text-primary">
                    CHF {option.propertyPricing.prices.month}
                  </span>
                </div>
                <p className="text-xs text-black mt-1">
                  Factures incluses • Caution: CHF {option.propertyPricing.securityDeposit}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Summary for multiple options */}
      {hasRelocationOptions && caseData.relocationOptions && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Résumé des options</p>
              <p className="text-xs text-black">
                {caseData.relocationOptions.length} option{caseData.relocationOptions.length > 1 ? 's' : ''} sélectionnée{caseData.relocationOptions.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-primary">Prix moyen</p>
              <p className="text-lg font-bold text-primary">
                CHF {(() => {
                  const total = caseData.relocationOptions.reduce((sum, option) => {
                    return sum + option.propertyPricing.prices.month;
                  }, 0);
                  return Math.round(total / caseData.relocationOptions.length);
                })()}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

