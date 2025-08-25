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
  AlertTriangle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StarRating } from "@/components/ui/star-rating";
import { getRelocationOptionById } from "@/lib/data-loader";

interface SelectedRelocationOptionsProps {
  selectedOptions: string[];
  onEdit?: () => void;
}

export function SelectedRelocationOptions({ selectedOptions, onEdit }: SelectedRelocationOptionsProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };



  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case 'apartment': return 'Appartement';
      case 'house': return 'Maison';
      case 'studio': return 'Studio';
      default: return type;
    }
  };

  if (selectedOptions.length === 0) {
    return null; // No longer needed since the button is now in the warning section at the top
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Options de relogement sélectionnées</h3>
        </div>
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Home className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedOptions.map((optionId, index) => {
          const option = getRelocationOptionById(optionId);
          if (!option) return null;

          return (
            <Card key={optionId} className="p-6 border-2 border-primary/20">
              {/* Option Number */}
              <div className="flex items-center justify-between mb-4">
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  Option {index + 1}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {getPropertyTypeLabel(option.propertyType)}
                </Badge>
              </div>

              {/* Property Title */}
              <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                {option.propertyDetails.title}
              </h4>

              {/* Location */}
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  {option.propertyLocation.neighborhood}, {option.propertyLocation.city}
                </span>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{option.propertyDetails.bedrooms} chambre{option.propertyDetails.bedrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Max {option.propertyDetails.maxGuests} pers.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formatDate(option.propertyAvailability.availableFrom)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
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
                {option.propertyRules.petsAllowed && (
                  <Badge variant="outline" className="text-xs">
                    <PawPrint className="h-3 w-3 mr-1" />
                    Animaux
                  </Badge>
                )}
              </div>

              {/* Rating */}
              {option.rating && (
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={option.rating.average} />
                  <span className="text-sm text-muted-foreground">
                    {option.rating.average}/5 ({option.rating.count} avis)
                  </span>
                </div>
              )}

              {/* Owner Contact */}
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {option.ownerDetails.firstName} {option.ownerDetails.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {option.ownerDetails.preferredContactMethod === 'email' ? 'Email' : 'Téléphone'}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Insurance Pricing */}
              <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">Prix assurance</span>
                  <span className="text-lg font-bold text-primary">
                    CHF {option.propertyPricing.prices.month}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Factures incluses • Caution: CHF {option.propertyPricing.securityDeposit}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Summary */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Résumé des options</p>
            <p className="text-xs text-muted-foreground">
              {selectedOptions.length} option{selectedOptions.length > 1 ? 's' : ''} sélectionnée{selectedOptions.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-primary">Prix moyen</p>
            <p className="text-lg font-bold text-primary">
              CHF {(() => {
                const total = selectedOptions.reduce((sum, optionId) => {
                  const option = getRelocationOptionById(optionId);
                  return sum + (option?.propertyPricing.prices.month || 0);
                }, 0);
                return Math.round(total / selectedOptions.length);
              })()}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
