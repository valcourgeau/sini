'use client';

import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { VaudoiseLogo } from './vaudoise-logo';

interface CollaborationLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
};

export function CollaborationLogo({ className, size = 'lg' }: CollaborationLogoProps) {
  return (
    <div className={cn('flex items-center justify-center gap-8', className)}>
      {/* Pharewest Logo */}
      <Logo size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : size === 'lg' ? 'lg' : 'lg'} />
      
      {/* Stylized × */}
      <div className={cn(
        'flex items-center justify-center font-bold text-primary',
        {
          'text-xl': size === 'sm',
          'text-2xl': size === 'md',
          'text-3xl': size === 'lg',
          'text-4xl': size === 'xl',
        }
      )}>
        <span>×</span>
      </div>
      
      {/* Vaudoise Logo */}
      <VaudoiseLogo size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : size === 'lg' ? 'lg' : 'lg'} />
    </div>
  );
} 