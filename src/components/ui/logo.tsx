'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
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
      
      {/* Swiss Flag image in top right corner */}
      <Image
        src={getImagePath('/ch-rounded-flag.png')}
        alt="Swiss flag"
        width={16}
        height={16}
        className={cn('absolute flex-shrink-0', {
          'h-2 w-2 top-1.5 -right-2.5': size === 'sm',
          'h-2.5 w-2.5 top-1.5 -right-3': size === 'md',
          'h-3 w-3 top-1 -right-3': size === 'lg',
          'h-4 w-4 top-0.5 -right-4': size === 'xl',
        })}
        unoptimized
      />
    </div>
  );
} 