'use client';

import { AlertTriangle, Shield, Siren, Building2, UserRound, Landmark, LucideIcon } from "lucide-react";

interface ScrollButtonProps {
  iconName: 'alert-triangle' | 'shield' | 'siren' | 'building2' | 'userround' | 'landmark';
  title: string;
  description: string;
  sectionId: string;
}

const iconMap: Record<ScrollButtonProps['iconName'], LucideIcon> = {
  'alert-triangle': AlertTriangle,
  'shield': Shield,
  'siren': Siren,
  'building2': Building2,
  'userround': UserRound,
  'landmark': Landmark,
};

export function ScrollButton({ iconName, title, description, sectionId }: ScrollButtonProps) {
  const scrollToSection = () => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const Icon = iconMap[iconName];

  return (
    <button
      onClick={scrollToSection}
      className="group relative overflow-hidden rounded-2xl bg-secondary p-12 text-primary transition-all duration-300 hover:bg-secondary/90 hover:scale-105 shadow-xl hover:shadow-2xl backdrop-blur-sm border-2 border-white/30"
    >
      <div className="relative z-10">
        <Icon className="h-16 w-16 mb-6 mx-auto" />
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-1xl text-primary/80 whitespace-nowrap">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
} 