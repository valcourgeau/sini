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
    <div className={cn('relative inline-flex items-center', className)}>
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
      
      {/* Swiss Flag as asterisk in top right corner */}
      <svg
        className={cn('absolute flex-shrink-0', {
          'h-2 w-2 top-1.5 -right-2.5': size === 'sm',
          'h-2.5 w-2.5 top-1.5 -right-3': size === 'md',
          'h-3 w-3 top-1 -right-3': size === 'lg',
        })}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Red background */}
        <rect width="16" height="16" fill="#FF0000" rx="1"/>
        {/* White cross - horizontal arm */}
        <rect x="3" y="7" width="10" height="2" fill="white"/>
        {/* White cross - vertical arm */}
        <rect x="7" y="3" width="2" height="10" fill="white"/>
      </svg>
    </div>
  );
} 