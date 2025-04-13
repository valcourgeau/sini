'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-10'
};

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Lighthouse Icon in Lucide style */}
      <svg
        className={cn(sizes[size], 'w-auto')}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Base */}
        <path d="M6 20h12" />
        {/* Main tower */}
        <path d="M12 3L12 20" />
        {/* Top */}
        <path d="M9 3h6l-3-2z" />
        {/* Light chamber */}
        <path d="M8 8h8" />
        {/* Windows/details */}
        <path d="M10 12h4" />
        <path d="M9 16h6" />
        {/* Light beams */}
        <path d="M6 8 L2 6" strokeDasharray="1 2" />
        <path d="M18 8 L22 6" strokeDasharray="1 2" />
      </svg>
      
      {/* Pharewest Text */}
      <span className={cn(
        'font-semibold tracking-tight',
        {
          'text-lg': size === 'sm',
          'text-xl': size === 'md',
          'text-2xl': size === 'lg',
        }
      )}>
        PHAREWEST
      </span>
    </div>
  );
} 