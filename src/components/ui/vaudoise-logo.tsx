'use client';

import { cn } from '@/lib/utils';
import { getImagePath } from '@/lib/utils';
import Image from 'next/image';

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
        <Image
          src={getImagePath("/vaudoise-logo.svg")}
          alt="Vaudoise Assurances Logo"
          width={64}
          height={64}
          quality={100}
          className="object-contain h-full w-auto"
        />
      </div>
    </div>
  );
} 