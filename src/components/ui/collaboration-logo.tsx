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
    <div className={cn('flex items-center justify-center', className)}>
      {/* Pharewest Logo */}
      <Logo size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : size === 'lg' ? 'lg' : 'lg'} />
      
      {/* Spacing after Pharewest logo (accounting for flag) */}
      <div className="w-8"></div>
      
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
      
      {/* Spacing before Vaudoise logo */}
      <div className="w-4"></div>
      
      {/* Vaudoise Logo */}
      <VaudoiseLogo size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : size === 'lg' ? 'lg' : 'lg'} />
    </div>
  );
} 