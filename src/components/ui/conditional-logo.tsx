'use client';

import { Logo } from './logo';
import { CollaborationLogo as GeneraliCollaborationLogo } from '@/components/brands/generali/collaboration-logo';
import { CollaborationLogo as VaudoiseCollaborationLogo } from '@/components/brands/vaudoise/collaboration-logo';

interface ConditionalLogoProps {
  brandContext: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function ConditionalLogo({ brandContext, size = 'lg', className }: ConditionalLogoProps) {
  // Show collaboration logo for branded pages
  if (brandContext === 'generali') {
    return (
      <GeneraliCollaborationLogo 
        size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'} 
        className={className}
      />
    );
  }
  
  if (brandContext === 'vaudoise') {
    return (
      <VaudoiseCollaborationLogo 
        size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'} 
        className={className}
      />
    );
  }
  
  // Default to standard Pharewest logo
  return (
    <Logo 
      size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : size === 'lg' ? 'lg' : 'xl'} 
      className={className}
    />
  );
}
