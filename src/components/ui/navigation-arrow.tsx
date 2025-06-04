"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback } from "react";

interface NavigationArrowProps {
  direction: "up" | "down";
  targetId: string;
  position: "top" | "bottom";
}

export function NavigationArrow({ direction, targetId, position }: NavigationArrowProps) {
  const scrollToTarget = useCallback(() => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [targetId]);

  return (
    <button
      onClick={scrollToTarget}
      className={`absolute ${position}-8 right-8 p-3 rounded-full bg-primary/90 hover:bg-primary transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 backdrop-blur-sm border-2 border-white/30`}
      aria-label={`Aller à la section ${targetId}`}
    >
      {direction === "up" ? (
        <ChevronUp className="h-6 w-6 text-white drop-shadow-lg" />
      ) : (
        <ChevronDown className="h-6 w-6 text-white drop-shadow-lg" />
      )}
    </button>
  );
} 