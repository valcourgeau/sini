"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

interface NavigationArrowProps {
  direction: "up" | "down";
  targetId: string;
  position: "top" | "bottom";
}

export function NavigationArrow({ direction, targetId, position }: NavigationArrowProps) {
  const scrollToTarget = () => {
    const element = document.getElementById(targetId);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 500; // 500ms instead of the default smooth scroll
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smoother animation
        const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <button
      onClick={scrollToTarget}
      className="p-3 rounded-full bg-primary/90 hover:bg-primary transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 backdrop-blur-sm border-2 border-white/30"
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