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
      const headerHeight = 64; // h-16 = 64px to account for scroll-mt-16
      const targetPosition = element.offsetTop - headerHeight;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 300; // Faster scroll - reduced from default smooth scroll
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth but fast animation
        const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

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