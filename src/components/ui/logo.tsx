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
        <path d="M12 4v16" />
        
        {/* Tower structure - simple trapezoid */}
        <path d="M9 20l3-16l3 16" />
        
        {/* Light chamber at top */}
        <path d="M8 7h8" />
        
        {/* Top */}
        <path d="M10 4h4" />
        
        {/* Windows */}
        <path d="M10 12h4" />
        <path d="M10 16h4" />
        
        {/* Light beams - simplified */}
        <path d="M6 7L3 5" strokeDasharray="1 1" />
        <path d="M18 7L21 5" strokeDasharray="1 1" />
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