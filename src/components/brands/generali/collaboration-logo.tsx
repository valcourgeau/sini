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
      <div className="text-primary drop-shadow-lg [text-shadow:_0_0_8px_rgba(255,255,255,0.3)]">
        <Logo size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : size === 'lg' ? 'lg' : 'xl'} />
      </div>
      
      {/* Stylized × */}
      <div className={cn(
        'flex items-center justify-center font-bold text-primary drop-shadow-lg [text-shadow:_0_0_8px_rgba(255,255,255,0.3)]',
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
      <div className="drop-shadow-lg [filter:_drop-shadow(0_0_8px_rgba(255,255,255,0.3))]">
        <GeneraliLogo size={size} />
      </div>
    </div>
  );
}
