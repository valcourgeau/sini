'use client';

import { AlertTriangle, Shield, LucideIcon } from "lucide-react";

interface ScrollButtonProps {
  iconName: 'alert-triangle' | 'shield';
  title: string;
  description: string;
  sectionId: string;
}

const iconMap: Record<ScrollButtonProps['iconName'], LucideIcon> = {
  'alert-triangle': AlertTriangle,
  'shield': Shield,
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
      className="group relative overflow-hidden rounded-2xl bg-primary p-12 text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02]"
    >
      <div className="relative z-10">
        <Icon className="h-16 w-16 mb-6 mx-auto" />
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-primary-foreground/80">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
} 