# Generali Brand Partnership Landing Page

## Overview
This is a themed landing page for the Generali partnership, featuring Generali's official red color scheme and branding.

## Features
- **Official Colors**: Uses Generali's official red color (#c11a16)
- **Logo Integration**: Official Generali logo
- **Partnership Display**: "Pharewest × Generali" collaboration
- **Responsive Design**: Mobile-first approach with modern UI

## Access Points
- **Main URL**: `/generali`
- **Redirect URL**: `/generali/redirect`

## Color System
```css
--primary: 2 78% 42%;           /* Official Generali red #c11a16 */
--foreground: 2 78% 25%;        /* Dark red text for readability */
--secondary: 2 50% 95%;         /* Very light red for backgrounds */
--accent: 2 78% 48%;            /* Slightly lighter red */
--muted-foreground: 2 78% 30%;  /* Darker red for muted text */
--generali-red-bg: 2 78% 32%;   /* Darker red for full background sections */
```

## Brand Assets
- **Logo**: `/public/brands/generali/generali-logo.png`
- **Colors**: Red (#c11a16) with white backgrounds
- **Typography**: Inter font family

## Implementation Details

### CSS Classes
- `hero-background-generali`: Main hero section background
- `hero-accent-generali`: Animated accent elements
- `hero-overlay-generali`: Gradient overlay effects
- `bg-generali-red`: Darker red background for full sections
- `glass-card-generali`: Glass morphism effects

### Components
- `GeneraliLogo`: Brand logo component
- `CollaborationLogo`: Partnership branding component
- `GeneraliHomePage`: Main landing page component

### Animations
- Gentle pulse animations for accent elements
- Corporate shift animations for background patterns
- Smooth transitions for interactive elements

## Brand Guidelines
- **Primary Color**: Red (#c11a16) for accents and highlights
- **Background**: White for broader areas
- **Typography**: Clean, professional Inter font
- **Layout**: Modern, responsive design with Generali branding

## Technical Notes
- Uses Next.js App Router
- Implements brand-specific CSS variables
- Follows the same structure as Vaudoise partnership
- Maintains full functionality of the main platform

## Maintenance
- Logo updates: Replace `/public/brands/generali/generali-logo.png`
- Color changes: Update CSS variables in `globals.css`
- Content updates: Modify `page.tsx` component
- Partnership text: Update in collaboration components
