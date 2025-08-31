'use client';

import { cn } from '@/lib/utils';
import { getImagePath } from '@/lib/utils';
import Image from 'next/image';

interface VaudoiseLogoProps {
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

export function VaudoiseLogo({ className, size = 'md' }: VaudoiseLogoProps) {
  return (
    <div className={cn('relative inline-flex items-center', className)}>
      {/* Vaudoise Logo */}
      <div className={cn('relative', sizes[size])}>
        <Image
          src={getImagePath("/brands/vaudoise/vaudoise-logo.svg")}
          alt="Vaudoise Assurances Logo"
          width={96}
          height={96}
          quality={100}
          className="object-contain h-full w-auto"
        />
      </div>
    </div>
  );
} 