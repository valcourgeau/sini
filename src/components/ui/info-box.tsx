'use client';

import { cn } from '@/lib/utils';

interface InfoBoxProps {
  children: React.ReactNode;
  className?: string;
}

export function InfoBox({ children, className }: InfoBoxProps) {
  return (
    <div className={cn(
      "p-4 bg-primary/5 rounded-md border border-primary/10",
      className
    )}>
      <div className="text-sm text-primary/80">
        {children}
      </div>
    </div>
  );
} 