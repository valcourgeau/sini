# Brand Partnership System

## Overview
This system enables scalable brand partnerships by organizing brand-specific files in a structured, maintainable way. Each brand gets its own themed landing page while maintaining full functionality.

## File Structure

```
src/
├── app/(brands)/                    # Route group for brand pages
│   └── [brand-name]/               # Individual brand directories
│       ├── page.tsx                # Brand landing page
│       ├── layout.tsx              # Brand-specific layout
│       ├── globals.css             # Brand color scheme
│       ├── redirect/page.tsx       # Redirect helper
│       └── README.md               # Brand documentation
├── components/brands/               # Brand-specific components
│   └── [brand-name]/               # Individual brand components
│       ├── [brand-name]-logo.tsx   # Brand logo component
│       └── collaboration-logo.tsx  # Partnership branding
└── public/brands/                  # Brand assets
    └── [brand-name]/               # Individual brand assets
        └── [brand-name]-logo.svg   # Official brand logo
```

## Current Partnerships

### Vaudoise Assurances
- **URL**: `/vaudoise`
- **Colors**: Green `#009640` (HSL: 146, 100%, 29%)
- **Logo**: Official Vaudoise Assurances SVG
- **Partnership**: "Pharewest × Vaudoise Assurances"

## Adding New Brand Partnerships

### Step 1: Create Directory Structure
```bash
# Replace [brand-name] with actual brand name (lowercase, no spaces)
mkdir -p src/app/\(brands\)/[brand-name]
mkdir -p src/components/brands/[brand-name]
mkdir -p public/brands/[brand-name]
```

### Step 2: Copy Template Files
```bash
# Copy Vaudoise files as template
cp -r src/app/\(brands\)/vaudoise/* src/app/\(brands\)/[brand-name]/
cp -r src/components/brands/vaudoise/* src/components/brands/[brand-name]/
```

### Step 3: Update Brand-Specific Content

#### A. Update Component Names
```bash
# Rename components to match brand
mv src/components/brands/[brand-name]/vaudoise-logo.tsx src/components/brands/[brand-name]/[brand-name]-logo.tsx
```

#### B. Update File Contents
1. **Logo Component**: Update class names, image paths, and alt text
2. **Collaboration Component**: Update import paths and brand references
3. **Page Component**: Update imports and partnership text
4. **CSS**: Update color scheme and class names

#### C. Update Brand Assets
1. **Logo**: Place official logo in `public/brands/[brand-name]/[brand-name]-logo.svg`
2. **Colors**: Extract brand colors and convert to HSL
3. **Partnership Text**: Update collaboration branding

### Step 4: Update Import Paths

#### In `src/components/brands/[brand-name]/[brand-name]-logo.tsx`:
```tsx
// Update image path
src={getImagePath("/brands/[brand-name]/[brand-name]-logo.svg")}
// Update alt text
alt="[Brand Name] Logo"
```

#### In `src/components/brands/[brand-name]/collaboration-logo.tsx`:
```tsx
// Update import
import { [BrandName]Logo } from './[brand-name]-logo';
// Update component usage
<[BrandName]Logo size={size} />
```

#### In `src/app/(brands)/[brand-name]/page.tsx`:
```tsx
// Update import
import { CollaborationLogo } from "@/components/brands/[brand-name]/collaboration-logo";
// Update partnership text
<span className="text-xl font-bold text-primary">[Brand Name]</span>
```

### Step 5: Update Color Scheme

#### In `src/app/(brands)/[brand-name]/globals.css`:
```css
:root {
  /* [Brand Name] Color Scheme */
  --primary: [H] [S]% [L]%;           /* Main brand color */
  --foreground: [H] [S]% [L]%;        /* Dark text for readability */
  --accent: [H] [S]% [L]%;            /* Slightly lighter */
  --muted-foreground: [H] [S]% [L]%;  /* Darker for muted text */
  --secondary: [H] [S]% [L]%;         /* Very light for backgrounds */
}
```

#### Update CSS Class Names:
```css
/* Replace all instances of 'vaudoise' with '[brand-name]' */
.hero-background-[brand-name]
.hero-accent-[brand-name]
.glass-card-[brand-name]
```

### Step 6: Update Documentation

#### Create `src/app/(brands)/[brand-name]/README.md`:
```markdown
# [Brand Name] Brand Partnership Landing Page

## Overview
This is a themed landing page for the [Brand Name] partnership.

## Features
- **Official Colors**: Uses [Brand Name]'s official colors
- **Logo Integration**: Official [Brand Name] logo
- **Partnership Display**: "Pharewest × [Brand Name]" collaboration

## Access Points
- **Main URL**: `/[brand-name]`
- **Redirect URL**: `/[brand-name]/redirect`

## Color System
```css
--primary: [H] [S]% [L]%;           /* Official [Brand Name] color */
--foreground: [H] [S]% [L]%;        /* Dark text for readability */
```
```

## Brand Partnership Checklist

### Required Files
- [ ] `src/app/(brands)/[brand-name]/page.tsx`
- [ ] `src/app/(brands)/[brand-name]/layout.tsx`
- [ ] `src/app/(brands)/[brand-name]/globals.css`
- [ ] `src/components/brands/[brand-name]/[brand-name]-logo.tsx`
- [ ] `src/components/brands/[brand-name]/collaboration-logo.tsx`
- [ ] `public/brands/[brand-name]/[brand-name]-logo.svg`
- [ ] `src/app/(brands)/[brand-name]/README.md`

### Required Updates
- [ ] Brand colors (HSL values)
- [ ] Logo file and path
- [ ] Partnership text
- [ ] Component imports
- [ ] Image paths
- [ ] Brand-specific CSS classes
- [ ] Documentation

### Quality Assurance
- [ ] `/[brand-name]` route accessible
- [ ] Logo displays correctly
- [ ] Colors match brand guidelines
- [ ] All functionality preserved
- [ ] Responsive design works
- [ ] No console errors
- [ ] Partnership branding clear

## Technical Implementation

### Route Groups
The `(brands)` route group provides:
- Clean URLs: `/[brand-name]` instead of `/brands/[brand-name]`
- SEO-friendly structure
- Organized file management

### Component Isolation
Brand-specific components are isolated:
- Prevents naming conflicts
- Enables parallel development
- Makes brand removal easy

### Asset Management
Brand assets are organized:
- Clear separation of brand assets
- Easy to manage multiple partnerships
- Prevents asset conflicts

## Maintenance

### Adding New Brands
1. Follow the file structure template
2. Update this documentation
3. Test thoroughly before deployment
4. Document brand-specific requirements

### Updating Existing Brands
1. Update assets in brand-specific directories
2. Test color scheme changes
3. Verify logo updates
4. Ensure all functionality preserved

### Removing Brands
1. Delete brand-specific directories
2. Remove any cross-references
3. Update documentation
4. Test main site functionality

## Example: Adding "Example Brand"

### Step 1: Create Structure
```bash
mkdir -p src/app/\(brands\)/example-brand
mkdir -p src/components/brands/example-brand
mkdir -p public/brands/example-brand
```

### Step 2: Copy and Customize
```bash
cp -r src/app/\(brands\)/vaudoise/* src/app/\(brands\)/example-brand/
cp -r src/components/brands/vaudoise/* src/components/brands/example-brand/
```

### Step 3: Update Files
- Rename `vaudoise-logo.tsx` to `example-brand-logo.tsx`
- Update all references from "vaudoise" to "example-brand"
- Replace logo file and colors
- Update partnership text

### Step 4: Test
- Verify `/example-brand` route works
- Test all functionality
- Validate brand colors and logo

This system enables scalable brand partnerships while maintaining code organization and deployment efficiency. 