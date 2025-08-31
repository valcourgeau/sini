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
        width={24}
        height={24}
        quality={100}
        className={cn('absolute flex-shrink-0', {
          'h-3 w-3 top-1 left-full ml-1': size === 'sm',
          'h-4 w-4 top-0.5 left-full ml-1.5': size === 'md',
          'h-5 w-5 top-0 left-full ml-1': size === 'lg',
          'h-6 w-6 -top-0.5 left-full ml-2.5': size === 'xl',
        })}
      />
    </div>
  );
} 