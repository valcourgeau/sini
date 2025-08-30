'use client';

import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import { VaudoiseLogo } from './vaudoise-logo';

interface CollaborationLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const sizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl'
};

export function CollaborationLogo({ className, size = 'lg' }: CollaborationLogoProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      {/* Pharewest Logo */}
      <div className="text-accent drop-shadow-lg [text-shadow:_0_0_8px_rgba(255,255,255,0.3)]">
        <Logo size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : size === 'lg' ? 'lg' : 'xl'} />
      </div>
      
      {/* Spacing after Pharewest logo (accounting for flag) */}
      <div className="w-6"></div>
      
      {/* Stylized × */}
      <div className={cn(
        'flex items-center justify-center font-bold text-primary drop-shadow-lg [text-shadow:_0_0_8px_rgba(255,255,255,0.3)]',
        {
          'text-2xl': size === 'sm',
          'text-3xl': size === 'md',
          'text-4xl': size === 'lg',
          'text-5xl': size === 'xl',
          'text-6xl': size === '2xl',
        }
      )}>
        <span>×</span>
      </div>
      
      {/* Spacing before Vaudoise logo */}
      <div className="w-4"></div>
      
      {/* Vaudoise Logo */}
      <div className="drop-shadow-lg [filter:_drop-shadow(0_0_8px_rgba(255,255,255,0.3))]">
        <VaudoiseLogo size={size} />
      </div>
    </div>
  );
} 