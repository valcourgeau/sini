'use client';

import { cn } from '@/lib/utils';
import { getImagePath } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-10',
  xl: 'h-12'
};

const flagSizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6'
};

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <div className={cn('relative inline-flex items-center', className)}>
      {/* Pharewest Text */}
      <span className={cn(
        'font-sans font-bold tracking-tight',
        {
          'text-lg': size === 'sm',
          'text-xl': size === 'md',
          'text-2xl': size === 'lg',
          'text-3xl': size === 'xl',
        }
      )}>
        Pharewest
      </span>
      
      {/* Swiss Flag image in top right corner of the text */}
      <img
        src={getImagePath("/ch-round-flag.png")}
        alt="Swiss Flag"
        className={cn('absolute flex-shrink-0 object-contain', {
          'h-3.5 w-3.5 top-0.5 -right-4': size === 'sm',
          'h-4 w-4 top-0.5 -right-4.5': size === 'md',
          'h-5 w-5 -top-0.5 -right-6': size === 'lg',
          'h-6 w-6 -top-1 -right-7': size === 'xl',
        })}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />
    </div>
  );
} 