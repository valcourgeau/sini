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
    <div className={cn('flex items-center gap-3', className)}>
      {/* Lighthouse Icon */}
      <svg
        className={cn(sizes[size], 'w-auto')}
        viewBox="0 0 800 800"
        fill="currentColor"
      >
        {/* Light beams - simplified */}
        <path
          d="M250,300 L100,150 M400,250 L400,100 M550,300 L700,150"
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          strokeLinecap="round"
        />
        
        {/* Lighthouse silhouette */}
        <path d="M400,150 L350,200 L350,250 L300,600 L500,600 L450,250 L450,200 L400,150 Z" />
        
        {/* Lighthouse top */}
        <path d="M350,250 C350,200 450,200 450,250 L450,300 L350,300 Z" />
        
        {/* Top dome */}
        <path d="M375,200 L400,150 L425,200 C425,225 375,225 375,200 Z" />
        
        {/* Ground/rocks */}
        <path d="M100,600 C200,550 250,575 300,600 L500,600 C550,575 600,550 700,600 L100,600 Z" />
      </svg>
      
      {/* Pharewest Text */}
      <span className={cn(
        'font-sans font-bold tracking-tight',
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