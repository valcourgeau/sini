'use client';

import { cn } from '@/lib/utils';
import { getImagePath } from '@/lib/utils';

interface VaudoiseLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-16'
};

export function VaudoiseLogo({ className, size = 'md' }: VaudoiseLogoProps) {
  return (
    <div className={cn('relative inline-flex items-center', className)}>
      {/* Vaudoise Logo */}
      <div className={cn('relative', sizes[size])}>
        <img
          src={getImagePath("/vaudoise-logo.svg")}
          alt="Vaudoise Assurances Logo"
          className="object-contain h-full w-auto"
          style={{
            imageRendering: 'crisp-edges',
            imageRendering: '-webkit-optimize-contrast',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>
    </div>
  );
} 