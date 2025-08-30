# Brand Theme System

This document describes the brand theme system that allows the application to display different visual themes based on the current brand context (Generali, Vaudoise, or default).

## Overview

The brand theme system provides:
- **Path-based brand detection**: Brand themes are detected from the URL path
- **Synthetic routes**: Brand-specific platform access via `/generali/platform` and `/vaudoise/platform`
- **Theme persistence**: Brand context is maintained through navigation
- **No session storage**: All brand information is contained in the URL path

## Brand Detection Priority

The system detects the brand theme in the following order:

1. **Root path (`/`)**: Always uses default theme
2. **Synthetic routes**: `/generali/*` → Generali theme, `/vaudoise/*` → Vaudoise theme
3. **Branded landing pages**: `/generali` → Generali theme, `/vaudoise` → Vaudoise theme

## How It Works

### Path-Based Detection
The brand theme is determined entirely from the URL path:

```typescript
function detectBrandFromPath(pathname: string): BrandTheme {
  // Root path should always use default theme
  if (pathname === '/') {
    return 'default';
  }
  
  // Check for synthetic brand routes
  if (pathname.startsWith('/generali')) {
    return 'generali';
  }
  if (pathname.startsWith('/vaudoise')) {
    return 'vaudoise';
  }
  
  return 'default';
}
```

### Theme Application
The theme is applied by adding CSS classes to the document root:

```typescript
function applyBrandTheme(theme: BrandTheme): void {
  // Remove all existing theme classes
  document.documentElement.classList.remove(
    'theme-default',
    'theme-generali', 
    'theme-vaudoise'
  );
  
  // Add the new theme class
  document.documentElement.classList.add(`theme-${theme}`);
}
```

## Synthetic Routes

### Platform Access
- `/generali/platform` → Generali-themed platform access
- `/vaudoise/platform` → Vaudoise-themed platform access

### Deep Navigation
- `/generali/platform/dashboard/assurance` → Generali-themed assurance dashboard
- `/vaudoise/platform/dashboard/host` → Vaudoise-themed host dashboard
- `/generali/platform/dashboard/assurance/dossiers/REL-001` → Generali-themed dossier detail

### Route Structure
The synthetic routes use Next.js catch-all routes (`[...path]`) to handle all platform sub-paths:
- `src/app/(brands)/generali/platform/page.tsx` - Handles `/generali/platform`
- `src/app/(brands)/generali/platform/[...path]/page.tsx` - Handles `/generali/platform/*`
- `src/app/(brands)/vaudoise/platform/page.tsx` - Handles `/vaudoise/platform`
- `src/app/(brands)/vaudoise/platform/[...path]/page.tsx` - Handles `/vaudoise/platform/*`

## Platform Integration

### Platform Layout
The platform layout (`/platform/layout.tsx`) automatically initializes the brand theme:

```typescript
"use client";

import { useBrandTheme } from "@/hooks/use-brand-theme";

export default function PlatformLayout({ children }) {
  useBrandTheme(); // Initialize theme for all platform pages
  
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
```

### Platform Header
The platform header automatically adapts to the current brand theme:

```typescript
const { currentTheme } = useBrandTheme();

const getBrandLogo = () => {
  switch (currentTheme) {
    case 'vaudoise': return <VaudoiseLogo size="lg" />;
    case 'generali': return <GeneraliLogo size="lg" />;
    default: return <Logo size="lg" />;
  }
};
```

## Navigation Utilities

### getNavigationPath()
Converts platform routes to branded routes:

```typescript
getNavigationPath('generali', '/platform/dashboard/assurance')
// Returns: '/generali/platform/dashboard/assurance'
```

### preserveBrandInNavigation()
Ensures brand context is maintained in navigation:

```typescript
preserveBrandInNavigation('generali', '/platform/dashboard/host')
// Returns: '/generali/platform/dashboard/host'
```

## Adding a New Brand

To add a new brand (e.g., "SwissLife"), follow these steps:

1. **Add brand configuration**:
```typescript
export const BRAND_CONFIGS: Record<BrandTheme, BrandConfig> = {
  // ... existing brands
  swisslife: {
    name: 'swisslife',
    path: '/swisslife',
    cssClass: 'theme-swisslife',
    platformPath: '/swisslife/platform'
  }
};
```

2. **Create brand directory structure**:
```
src/app/(brands)/swisslife/
├── globals.css
├── layout.tsx
├── page.tsx
└── platform/
    ├── layout.tsx
    ├── page.tsx
    └── [...path]/
        └── page.tsx
```

3. **Add brand detection**:
```typescript
function detectBrandFromPath(pathname: string): BrandTheme {
  if (pathname.startsWith('/swisslife')) {
    return 'swisslife';
  }
  // ... existing logic
}
```

4. **Create brand-specific components**:
- `src/components/brands/swisslife/swisslife-logo.tsx`
- `src/components/brands/swisslife/collaboration-logo.tsx`

## Benefits of Path-Based Detection

- **No session storage dependency**: Brand context is always visible in the URL
- **Bookmarkable URLs**: Users can bookmark branded pages directly
- **SEO friendly**: Search engines can index branded content separately
- **Simpler debugging**: Brand context is always clear from the URL
- **No state management**: No need to manage brand theme in application state

