'use client';

import { cn } from '@/lib/utils';

interface IconBoxProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-20 w-20'
};

const iconSizes = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10'
};

export function IconBox({ children, className, size = 'md' }: IconBoxProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-primary/5",
      sizes[size],
      className
    )}>
      <div className={cn("text-primary", iconSizes[size])}>
        {children}
      </div>
    </div>
  );
} 