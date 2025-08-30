'use client';

import { AlertTriangle, Shield, Siren, Building2, UserRound, Landmark, LucideIcon } from "lucide-react";

interface ScrollButtonProps {
  iconName: 'alert-triangle' | 'shield' | 'siren' | 'building2' | 'userround' | 'landmark';
  title: string;
  description: string;
  sectionId: string;
  opacity?: '60' | '70' | '80' | '90' | '100';
}

const iconMap: Record<ScrollButtonProps['iconName'], LucideIcon> = {
  'alert-triangle': AlertTriangle,
  'shield': Shield,
  'siren': Siren,
  'building2': Building2,
  'userround': UserRound,
  'landmark': Landmark,
};

export function ScrollButton({ iconName, title, description, sectionId, opacity = '60' }: ScrollButtonProps) {
  const scrollToSection = () => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const Icon = iconMap[iconName];

  // Map opacity values to Tailwind classes to ensure they're recognized
  const opacityClasses = {
    '60': 'bg-primary/60',
    '70': 'bg-primary/70',
    '80': 'bg-primary/80',
    '90': 'bg-primary/90',
    '100': 'bg-primary'
  };

  return (
    <button
      onClick={scrollToSection}
      className={`group relative overflow-hidden rounded-2xl ${opacityClasses[opacity as keyof typeof opacityClasses]} p-6 sm:p-8 lg:p-10 text-secondary transition-all duration-300 hover:bg-primary/90 hover:scale-105 shadow-2xl hover:shadow-3xl backdrop-blur-sm h-full flex flex-col justify-center`}
    >
      <div className="relative z-10">
        <Icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mb-4 sm:mb-6 mx-auto text-secondary" />
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-4 text-secondary">{title}</h2>
        <p className="text-xs sm:text-sm lg:text-base text-secondary/80 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
} 