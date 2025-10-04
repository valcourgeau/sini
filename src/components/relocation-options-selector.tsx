"use client";

import { useState, useEffect } from "react";
import { 
  Home, 
  MapPin, 
  Users, 
  Bed, 
  Car, 
  PawPrint, 
  Accessibility, 
  Wifi, 
  Tv, 
  WashingMachine,
  CheckCircle2,
  X,
  Star,
  Calendar,
  Wallet,
  Building2,
  Phone,
  Mail,
  ArrowLeft,
  ArrowRight,
  Search,
  Filter,
  Check,
  ChevronLeft,
  ChevronRight,
  X as CloseIcon,
  AlertTriangle,
  ArrowUp
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { StarRating } from "@/components/ui/star-rating";
import { RelocationData } from "@/types/relocation";
import { getMatchingRelocationOptions, getRelocationOptionById } from "@/lib/data-loader";

interface RelocationOptionsSelectorProps {
  caseData: RelocationData;
  onOptionsSelected: (selectedOptions: string[]) => void;
  onCancel: () => void;
}

const ITEMS_PER_PAGE = 3;

export function RelocationOptionsSelector({ 
  caseData, 
  onOptionsSelected, 
  onCancel 
}: RelocationOptionsSelectorProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [matchingOptions, setMatchingOptions] = useState<any[]>([]);

  useEffect(() => {
    const options = getMatchingRelocationOptions(caseData);
    setMatchingOptions(options);
  }, [caseData]);

  const filteredOptions = matchingOptions.filter(option => {
    const matchesSearch = option.propertyDetails.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         option.propertyLocation.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || option.propertyType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredOptions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOptions = filteredOptions.slice(startIndex, endIndex);

  const getCompatibilityColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-300';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'poor': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCompatibilityText = (level: string) => {
    switch (level) {
      case 'excellent': return 'Excellent';
      case 'good': return 'Bon';
      case 'fair': return 'Correct';
      case 'poor': return 'Limité';
      default: return 'Inconnu';
    }
  };

  const handleOptionSelect = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    } else if (selectedOptions.length < 3) {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const handleConfirm = () => {
    onOptionsSelected(selectedOptions);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };



  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      case 'kitchen': return <Building2 className="h-4 w-4" />;
      case 'washing_machine': return <WashingMachine className="h-4 w-4" />;
      case 'tv': return <Tv className="h-4 w-4" />;
      case 'accessibility': return <Accessibility className="h-4 w-4" />;
      default: return <Home className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-black">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <ArrowUp className="h-4 w-4 mr-2" />
              Fermer
            </Button>
            <div className="w-px h-6 bg-border"></div>
            <div>
              <h2 className="text-xl font-semibold">Options de relogement</h2>
              <p className="text-sm text-black">
                Sélectionnez au moins 3 options qui correspondent aux besoins du client
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-black">
              {selectedOptions.length}/3 sélectionné{selectedOptions.length > 1 ? 's' : ''}
            </div>
            <Button 
              onClick={handleConfirm} 
              disabled={selectedOptions.length !== 3}
              className="min-w-[120px]"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Confirmer
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-muted/30 p-4 ">
        <div className="flex items-center gap-4 text-black">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
              <Input
                placeholder="Rechercher par nom ou quartier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm bg-background min-w-[140px]"
          >
            <option value="all">Tous les types</option>
            <option value="apartment">Appartements</option>
            <option value="house">Maisons</option>
            <option value="studio">Studios</option>
          </select>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between text-sm text-black">
        <span>
          {filteredOptions.length} option{filteredOptions.length > 1 ? 's' : ''} trouvée{filteredOptions.length > 1 ? 's' : ''}
          {searchTerm && ` pour "${searchTerm}"`}
        </span>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
      </div>

      {/* Options Grid - Horizontal Cards */}
      <div className="space-y-4">
        {currentOptions.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          const isDisabled = selectedOptions.length >= 3 && !isSelected;
          
                      return (
              <Card 
                key={option.id} 
                className={cn(
                  "p-6 cursor-pointer transition-all duration-200 hover:shadow-lg border-2",
                  isSelected && "ring-2 ring-primary border-primary bg-primary/5",
                  isDisabled && "opacity-50 cursor-not-allowed",
                  !isSelected && !isDisabled && "hover:border-primary/50"
                )}
                onClick={() => !isDisabled && handleOptionSelect(option.id)}
              >
              <div className="flex gap-6">
                {/* Left Section - Image Placeholder */}
                <div className="w-48 h-32 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="h-8 w-8 text-black" />
                </div>

                {/* Center Section - Main Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                        {option.propertyDetails.title}
                      </h3>
                      <div className="flex items-center gap-2 text-black mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">
                          {option.propertyLocation.neighborhood}, {option.propertyLocation.city}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", getCompatibilityColor(option.compatibilityLevel))}
                      >
                        {getCompatibilityText(option.compatibilityLevel)} ({option.compatibilityPercentage}%)
                      </Badge>
                      {isSelected && (
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Key Details Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
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
                      <span className="text-sm">{formatDate(option.propertyAvailability.availableFrom)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-black" />
                      <span className="text-sm font-medium">CHF {option.propertyPricing.prices.month}/mois</span>
                    </div>
                  </div>

                  {/* Special Features */}
                  <div className="flex flex-wrap gap-2 mb-3">
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
                      <span className="text-sm text-black">
                        {option.rating.average}/5 ({option.rating.count} avis)
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-black line-clamp-2">
                    {option.propertyDetails.description}
                  </p>
                </div>

                {/* Right Section - Compatibility Issues */}
                {option.compatibilityIssues && option.compatibilityIssues.length > 0 && (
                  <div className="w-64 p-4 bg-amber-50 border border-amber-200 rounded-lg flex-shrink-0">
                    <h4 className="text-sm font-semibold text-amber-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Incompatibilités détectées
                    </h4>
                    <ul className="text-xs text-amber-700 space-y-2">
                      {option.compatibilityIssues.slice(0, 3).map((issue: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-amber-600 mt-0.5 font-bold">•</span>
                          <span className="leading-relaxed">{issue}</span>
                        </li>
                      ))}
                      {option.compatibilityIssues.length > 3 && (
                        <li className="text-amber-600 text-xs font-medium pt-1 border-t border-amber-200">
                          +{option.compatibilityIssues.length - 3} autre(s) problème(s)
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredOptions.length === 0 && (
        <div className="text-center py-12">
          <Home className="h-16 w-16 text-black mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Aucune option trouvée</h3>
          <p className="text-black">
            Aucune option de relogement ne correspond à vos critères de recherche.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Précédent
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
