'use client';

import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import { GeneraliLogo } from './generali-logo';

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
    <div className={cn('flex items-center justify-center gap-6', className)}>
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
          'text-5xl': size === '2xl',
        }
      )}>
        <span>×</span>
      </div>
      
      {/* Generali Logo */}
      <GeneraliLogo size={size} />
    </div>
  );
}
