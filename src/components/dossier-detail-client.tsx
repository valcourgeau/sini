"use client";

import { useState } from "react";
import { RelocationData } from '@/types/relocation';
import { RelocationOptionsSelector } from '@/components/relocation-options-selector';
import { SelectedRelocationOptions } from '@/components/selected-relocation-options';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface DossierDetailClientProps {
  caseData: RelocationData;
}

// Client component that wraps the warning section and controls its background
export function RelocationWarningWrapper({ caseData }: { caseData: RelocationData }) {
  const [isSelectingOptions, setIsSelectingOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    caseData.selectedRelocationOptions || []
  );

  const handleOptionsSelected = (options: string[]) => {
    setSelectedOptions(options);
    setIsSelectingOptions(false);
    
    // In a real application, you would save this to the backend
    
    // Update the case data locally
    caseData.selectedRelocationOptions = options;
    
    // Force a re-render by updating the state
    setSelectedOptions([...options]);
  };

  const handleCancelSelection = () => {
    setIsSelectingOptions(false);
  };

  const handleSelectOptions = () => {
    setIsSelectingOptions(true);
  };

  if (isSelectingOptions) {
    return (
      <div className="space-y-6">
        <RelocationOptionsSelector
          caseData={caseData}
          onOptionsSelected={handleOptionsSelected}
          onCancel={handleCancelSelection}
        />
      </div>
    );
  }

  // If options are selected, show them instead of the warning
  if (selectedOptions.length > 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <SelectedRelocationOptions 
          selectedOptions={selectedOptions}
          onEdit={handleSelectOptions}
        />
      </div>
    );
  }

  return (
    <Card className={`p-6 border ${isSelectingOptions ? 'bg-background border-border' : 'bg-yellow-50 border-yellow-200'}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Action requise</h3>
      </div>
      <p className="text-muted-foreground mb-4">
        Ce dossier est en attente de sélection d'options de relogement. Veuillez en sélectionner 3 qui correspondent aux besoins du client pour pouvoir traiter ce dossier.
      </p>
      <Button onClick={handleSelectOptions} className="bg-primary hover:bg-primary/90">
        <Home className="h-4 w-4 mr-2" />
        Sélectionner les options
      </Button>
    </Card>
  );
}

// Client component for the selection button that can be used in server components
export function RelocationSelectionButton({ caseData }: { caseData: RelocationData }) {
  const [isSelectingOptions, setIsSelectingOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    caseData.selectedRelocationOptions || []
  );

  const handleOptionsSelected = (options: string[]) => {
    setSelectedOptions(options);
    setIsSelectingOptions(false);
    
    // In a real application, you would save this to the backend
    
    // Update the case data locally
    caseData.selectedRelocationOptions = options;
    
    // Refresh the page to show updated state
    window.location.reload();
  };

  const handleCancelSelection = () => {
    setIsSelectingOptions(false);
  };

  const handleSelectOptions = () => {
    setIsSelectingOptions(true);
  };

  if (isSelectingOptions) {
    return (
      <div className="space-y-6">
        <RelocationOptionsSelector
          caseData={caseData}
          onOptionsSelected={handleOptionsSelected}
          onCancel={handleCancelSelection}
        />
      </div>
    );
  }

  return (
    <Button onClick={handleSelectOptions} className="bg-primary hover:bg-primary/90">
      <Home className="h-4 w-4 mr-2" />
      Sélectionner les options
    </Button>
  );
}

export function DossierDetailClient({ caseData }: DossierDetailClientProps) {
  const [isSelectingOptions, setIsSelectingOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    caseData.selectedRelocationOptions || []
  );

  const handleOptionsSelected = (options: string[]) => {
    setSelectedOptions(options);
    setIsSelectingOptions(false);
    
    // In a real application, you would save this to the backend
    console.log("Selected relocation options:", options);
    
    // Update the case data locally
    caseData.selectedRelocationOptions = options;
  };

  const handleCancelSelection = () => {
    setIsSelectingOptions(false);
  };

  const handleEditOptions = () => {
    setIsSelectingOptions(true);
  };

  if (isSelectingOptions) {
    return (
      <div className="space-y-6">
        <RelocationOptionsSelector
          caseData={caseData}
          onOptionsSelected={handleOptionsSelected}
          onCancel={handleCancelSelection}
        />
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <SelectedRelocationOptions 
        selectedOptions={selectedOptions}
        onEdit={handleEditOptions}
      />
    </div>
  );
}
