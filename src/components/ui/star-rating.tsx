import React from "react";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export function StarRating({ rating, className = "h-4 w-4" }: StarRatingProps) {
  // Ensure rating is a number and handle edge cases
  const numericRating = Number(rating) || 0;
  
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => {
        const fillPercentage = Math.max(0, Math.min(1, numericRating - i));
        
        return (
          <div key={i} className="relative inline-block">
            {/* Background star (empty) */}
            <svg
              className={`${className} text-muted`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            
            {/* Foreground star (filled) - only show if there's a fill */}
            {fillPercentage > 0 && (
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ 
                  width: `${fillPercentage * 100}%`,
                  left: 0,
                  top: 0,
                  zIndex: 1
                }}
              >
                <svg
                  className={`${className} text-primary`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
