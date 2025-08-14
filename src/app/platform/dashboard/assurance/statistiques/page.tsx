"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import AssuranceStatistics from "./assurance-statistics";

import { RelocationData } from '@/types/relocation';
import { relocationCases } from '@/lib/data-loader';

export default function AssuranceStatistiquesPage() {
  const [selectedFilter, setSelectedFilter] = useState<"agent" | "canton" | "group">("agent");
  const [selectedAgent, setSelectedAgent] = useState<string>("all");
  const [selectedCanton, setSelectedCanton] = useState<string>("all");
  const [selectedDateFilter, setSelectedDateFilter] = useState<"month" | "year" | "all">("all");

  // Helper function to check if a date is within the selected filter range
  const isDateInRange = (dateString: string, filter: "month" | "year" | "all"): boolean => {
    const date = new Date(dateString);
    const now = new Date();
    
    switch (filter) {
      case "month":
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      case "year":
        return date.getFullYear() === now.getFullYear();
      case "all":
        return true;
      default:
        return true;
    }
  };

  // Use centralized mock data
  const mockRelocations = relocationCases;

  // Calculate filtered data based on current filters
  const filteredData = mockRelocations.filter(relocation => {
    // Date filter
    if (!isDateInRange(relocation.createdAt, selectedDateFilter)) {
      return false;
    }
    
    // Agent filter
    if (selectedFilter === "agent" && selectedAgent !== "all") {
      return relocation.agent?.id === selectedAgent;
    }
    
    // Canton filter
    if (selectedFilter === "canton" && selectedCanton !== "all") {
      return relocation.agent?.canton === selectedCanton;
    }
    
    return true; // Show all data for group filter
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/platform/dashboard/assurance">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au tableau de bord
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-primary">Statistiques et analyses</h1>
          <p className="text-muted-foreground mt-2">
            Visualisez les performances, coûts et tendances de vos dossiers
          </p>
        </div>
      </div>

      {/* Statistics Component */}
      <Card className="p-6 bg-background border-primary/20">
        <AssuranceStatistics
          data={filteredData}
          selectedFilter={selectedFilter}
          selectedAgent={selectedAgent}
          selectedCanton={selectedCanton}
          selectedDateFilter={selectedDateFilter}
        />
      </Card>
    </div>
  );
} 