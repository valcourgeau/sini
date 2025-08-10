'use client';

import { cn } from '@/lib/utils';
import { getImagePath } from '@/lib/utils';

interface GeneraliLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const sizes = {
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-16',
  xl: 'h-20',
  '2xl': 'h-24'
};

export function GeneraliLogo({ className, size = 'md' }: GeneraliLogoProps) {
  return (
    <div className={cn('relative inline-flex items-center', className)}>
      {/* Generali Logo */}
      <div className={cn('relative', sizes[size])}>
        <img
          src={getImagePath("/brands/generali/generali-logo.png")}
          alt="Generali Logo"
          className="object-contain h-full w-auto"
        />
      </div>
    </div>
  );
}
